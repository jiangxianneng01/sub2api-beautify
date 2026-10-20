/**
 * Studio API — the image and video studios talk to the gateway's own public endpoints with
 * the API key the person picked, exactly like any external client would:
 *
 *   POST /v1/images/generations        OpenAI (gpt-image-*) and Grok (grok-imagine) groups;
 *                                      OpenAI groups can stream partial images over SSE
 *   POST /v1/videos/generations        Grok / composite groups → { request_id }
 *   GET  /v1/videos/:id                → { status: "pending" | "done" | ..., video: { url, duration } }
 *   GET  /v1/videos/:id/content        the finished MP4, proxied by the gateway
 */
import { buildGatewayUrl } from './url'

export class StudioError extends Error {
  status: number
  constructor(message: string, status = 0) {
    super(message)
    this.name = 'StudioError'
    this.status = status
  }
}

function authHeaders(apiKey: string, json = true): Record<string, string> {
  const headers: Record<string, string> = { Authorization: `Bearer ${apiKey}` }
  if (json) headers['Content-Type'] = 'application/json'
  return headers
}

async function readError(res: Response): Promise<StudioError> {
  let message = `${res.status} ${res.statusText}`.trim()
  try {
    const text = await res.text()
    try {
      const body = JSON.parse(text) as { error?: { message?: string } | string; message?: string }
      const err = body.error
      message = (typeof err === 'string' ? err : err?.message) || body.message || text || message
    } catch {
      if (text) message = text.slice(0, 300)
    }
  } catch {
    // keep the status line
  }
  return new StudioError(message, res.status)
}

/* ------------------------------------------------------------------ images */

export interface ImageGenerationInput {
  apiKey: string
  model: string
  prompt: string
  n?: number
  /** "1024x1024" | "1536x1024" | "1024x1536" | "auto" (OpenAI); ignored by Grok */
  size?: string
  /** "low" | "medium" | "high" | "auto" (OpenAI) */
  quality?: string
  /** stream partial renders (OpenAI gpt-image models only) */
  stream?: boolean
  partialImages?: number
  signal?: AbortSignal
}

export interface ImageResult {
  /** a data: URL or a remote URL */
  src: string
  revisedPrompt?: string
  outputFormat?: string
}

export interface ImageStreamHandlers {
  onPartial?: (src: string, index: number) => void
  onCompleted?: (result: ImageResult) => void
}

function dataUrl(b64: string, format?: string): string {
  const mime = format === 'jpeg' || format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png'
  return `data:${mime};base64,${b64}`
}

function toImageResult(item: { b64_json?: string; url?: string; revised_prompt?: string; output_format?: string }): ImageResult | null {
  if (item.b64_json) return { src: dataUrl(item.b64_json, item.output_format), revisedPrompt: item.revised_prompt, outputFormat: item.output_format }
  if (item.url) return { src: item.url, revisedPrompt: item.revised_prompt, outputFormat: item.output_format }
  return null
}

/** Generate images. Resolves with every finished image; streams partials through `handlers`. */
export async function generateImages(input: ImageGenerationInput, handlers: ImageStreamHandlers = {}): Promise<ImageResult[]> {
  const body: Record<string, unknown> = {
    model: input.model,
    prompt: input.prompt,
    n: input.n && input.n > 0 ? input.n : 1
  }
  if (input.size && input.size !== 'auto') body.size = input.size
  if (input.quality && input.quality !== 'auto') body.quality = input.quality
  if (input.stream) {
    body.stream = true
    body.partial_images = input.partialImages ?? 2
  } else {
    body.response_format = 'b64_json'
  }

  const res = await fetch(buildGatewayUrl('/v1/images/generations'), {
    method: 'POST',
    headers: authHeaders(input.apiKey),
    body: JSON.stringify(body),
    signal: input.signal
  })
  if (!res.ok) throw await readError(res)

  const contentType = res.headers.get('content-type') || ''
  if (input.stream && contentType.includes('text/event-stream') && res.body) {
    return readImageStream(res.body, handlers)
  }

  const json = (await res.json()) as { data?: Array<{ b64_json?: string; url?: string; revised_prompt?: string; output_format?: string }> }
  const results = (json.data || []).map(toImageResult).filter((r): r is ImageResult => !!r)
  results.forEach((r) => handlers.onCompleted?.(r))
  return results
}

async function readImageStream(stream: ReadableStream<Uint8Array>, handlers: ImageStreamHandlers): Promise<ImageResult[]> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  const results: ImageResult[] = []
  let buffer = ''
  let streamError: StudioError | null = null

  const handleEvent = (event: string, data: string) => {
    if (!data || data === '[DONE]') return
    let payload: Record<string, unknown>
    try {
      payload = JSON.parse(data) as Record<string, unknown>
    } catch {
      return
    }
    const type = String(payload.type || event || '')
    if (type === 'error' || event === 'error') {
      const err = payload.error as { message?: string } | undefined
      streamError = new StudioError(err?.message || String(payload.message || 'stream error'))
      return
    }
    const b64 = typeof payload.b64_json === 'string' ? payload.b64_json : ''
    const url = typeof payload.url === 'string' ? payload.url : ''
    const format = typeof payload.output_format === 'string' ? payload.output_format : undefined
    const src = b64 ? dataUrl(b64, format) : url
    if (!src) return
    if (type.endsWith('.partial_image')) {
      handlers.onPartial?.(src, Number(payload.partial_image_index || 0))
    } else if (type.endsWith('.completed')) {
      const result: ImageResult = { src, outputFormat: format, revisedPrompt: typeof payload.revised_prompt === 'string' ? payload.revised_prompt : undefined }
      results.push(result)
      handlers.onCompleted?.(result)
    }
  }

  const flushBlock = (block: string) => {
    let event = ''
    const dataLines: string[] = []
    for (const line of block.split('\n')) {
      if (line.startsWith('event:')) event = line.slice(6).trim()
      else if (line.startsWith('data:')) dataLines.push(line.slice(5).trimStart())
    }
    if (dataLines.length) handleEvent(event, dataLines.join('\n'))
  }

  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    let idx: number
    while ((idx = buffer.indexOf('\n\n')) !== -1) {
      const block = buffer.slice(0, idx).replace(/\r/g, '')
      buffer = buffer.slice(idx + 2)
      flushBlock(block)
    }
  }
  if (buffer.trim()) flushBlock(buffer.replace(/\r/g, ''))
  if (streamError) throw streamError
  return results
}

/* ------------------------------------------------------------------ videos */

export interface VideoGenerationInput {
  apiKey: string
  model: string
  prompt: string
  /** seconds */
  duration?: number
  /** "16:9" | "9:16" | "1:1" | "4:3" | "3:4" */
  aspectRatio?: string
  /** "480p" | "720p" | "1080p" */
  resolution?: string
  /** reference image for image-to-video */
  imageUrl?: string
  signal?: AbortSignal
}

export interface VideoJob {
  requestId: string
  status: string
}

export interface VideoStatus {
  status: string
  videoUrl?: string
  duration?: number
  raw: Record<string, unknown>
}

export async function createVideo(input: VideoGenerationInput): Promise<VideoJob> {
  const body: Record<string, unknown> = { model: input.model, prompt: input.prompt }
  if (input.duration) body.duration = input.duration
  if (input.aspectRatio) body.aspect_ratio = input.aspectRatio
  if (input.resolution) body.resolution = input.resolution
  if (input.imageUrl) body.image = { url: input.imageUrl }
  const res = await fetch(buildGatewayUrl('/v1/videos/generations'), {
    method: 'POST',
    headers: authHeaders(input.apiKey),
    body: JSON.stringify(body),
    signal: input.signal
  })
  if (!res.ok) throw await readError(res)
  const json = (await res.json()) as { request_id?: string; id?: string; status?: string }
  const requestId = json.request_id || json.id
  if (!requestId) throw new StudioError('The gateway did not return a request id')
  return { requestId, status: json.status || 'pending' }
}

export async function getVideoStatus(apiKey: string, requestId: string, signal?: AbortSignal): Promise<VideoStatus> {
  const res = await fetch(buildGatewayUrl(`/v1/videos/${encodeURIComponent(requestId)}`), {
    headers: authHeaders(apiKey, false),
    signal
  })
  if (!res.ok) throw await readError(res)
  const raw = (await res.json()) as Record<string, unknown>
  const video = (raw.video || {}) as { url?: string; duration?: number }
  return {
    status: String(raw.status || 'pending'),
    videoUrl: typeof video.url === 'string' ? video.url : undefined,
    duration: typeof video.duration === 'number' ? video.duration : undefined,
    raw
  }
}

/** Download the finished video through the gateway and hand back an object URL. */
export async function fetchVideoObjectUrl(apiKey: string, requestId: string, signal?: AbortSignal): Promise<string> {
  const res = await fetch(buildGatewayUrl(`/v1/videos/${encodeURIComponent(requestId)}/content`), {
    headers: authHeaders(apiKey, false),
    signal
  })
  if (!res.ok) throw await readError(res)
  const blob = await res.blob()
  return URL.createObjectURL(blob)
}

export const studioAPI = { generateImages, createVideo, getVideoStatus, fetchVideoObjectUrl }
export default studioAPI
