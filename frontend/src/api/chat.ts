/**
 * Chat API — the AI chat page talks to the gateway's public endpoints with the API key the
 * person picked, exactly like any external client. Billing, rate limits and usage records are
 * therefore the gateway's own (token billing for the key's group); nothing is priced here.
 *
 * Which wire format a key speaks follows its group's platform, the same rules as the
 * "Use key" dialog and the platform catalog:
 *   anthropic          POST /v1/messages                                 (Anthropic Messages)
 *   gemini             POST /v1beta/models/{model}:streamGenerateContent (Gemini)
 *   antigravity        POST /antigravity/v1/messages for Claude models, /antigravity/v1beta/… for Gemini
 *   openai, grok       POST /v1/responses                                (what Codex / Grok Build use)
 *   multi-protocol providers (DeepSeek, Kimi, Zhipu, MiniMax…) pass the inbound format through,
 *                      so the first native format of their default mode is used (Anthropic first)
 *   anything else      Anthropic Messages, then Responses, then Chat Completions
 * When the gateway answers 404 / 405 for a format before any text arrives, the next candidate is
 * tried (no reply was produced, so nothing is billed twice). The page also lets the person force
 * a single format.
 */
import { buildGatewayUrl } from './url'
import { getPlatformSpec, getProviderMode } from '@/constants/platformCatalog'

export type ChatProtocol = 'openai' | 'anthropic' | 'gemini' | 'responses'

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatUsage {
  inputTokens: number
  outputTokens: number
  cacheReadTokens?: number
}

export interface ChatRequest {
  apiKey: string
  protocol: ChatProtocol
  /** path prefix in front of /v1…, e.g. "/antigravity" */
  prefix?: string
  model: string
  messages: ChatTurn[]
  system?: string
  temperature?: number | null
  maxTokens?: number | null
  signal?: AbortSignal
}

export interface ChatStreamHandlers {
  onText?: (delta: string) => void
  onReasoning?: (delta: string) => void
  onUsage?: (usage: ChatUsage) => void
}

export interface ChatResult {
  text: string
  reasoning: string
  usage: ChatUsage | null
  finishReason: string | null
}

export class ChatError extends Error {
  status: number
  /** the gateway's error code when it sent one (INSUFFICIENT_BALANCE, rate_limit_exceeded…) */
  code: string
  constructor(message: string, status = 0, code = '') {
    super(message)
    this.name = 'ChatError'
    this.status = status
    this.code = code
  }
}

export interface ChatRoute {
  protocol: ChatProtocol
  prefix: string
}

/** Platforms whose groups are not chat models at all (TypeSafe's System One is an evaluator) */
export function isChatPlatform(platform: string | null | undefined): boolean {
  return (platform || '').toLowerCase() !== 'typesafe'
}

const NATIVE_TO_PROTOCOL: Record<string, ChatProtocol> = {
  anthropic: 'anthropic',
  responses: 'responses',
  chat_completions: 'openai'
}

/**
 * The formats to try for a key's group, best first, before any manual override. The first entry
 * is what the "Use key" dialog would configure for that platform.
 */
export function protocolCandidates(platform: string | null | undefined, model: string): ChatRoute[] {
  const p = (platform || '').toLowerCase()
  const routes = (protocols: ChatProtocol[], prefix = '') => protocols.map((protocol) => ({ protocol, prefix }))
  if (p === 'anthropic') return routes(['anthropic'])
  if (p === 'gemini') return routes(['gemini'])
  if (p === 'antigravity') return routes(/^gemini/i.test(model) ? ['gemini'] : ['anthropic'], '/antigravity')
  if (p === 'openai') return routes(['responses', 'openai'])
  if (p === 'grok') return routes(['responses', 'openai'])
  // multi-protocol providers relay the inbound format when their upstream speaks it
  const mode = getProviderMode(p, null)
  if (mode) {
    const native = Object.keys(mode.base_urls)
      .map((k) => NATIVE_TO_PROTOCOL[k])
      .filter((x): x is ChatProtocol => !!x)
    const ordered = (['anthropic', 'responses', 'openai'] as ChatProtocol[]).filter((x) => native.includes(x))
    if (ordered.length) return routes(ordered)
  }
  const gateway = getPlatformSpec(p)?.gateway
  if (gateway === 'anthropic') return routes(['anthropic'])
  // composite groups and platforms this build does not know yet
  return routes(['anthropic', 'responses', 'openai'])
}

/** The wire format and path prefix for a key's group, before any manual override */
export function protocolFor(platform: string | null | undefined, model: string): ChatRoute {
  return protocolCandidates(platform, model)[0]
}

/** An answer meaning "this endpoint does not exist here", so another format may work */
export function isUnsupportedRoute(e: unknown): boolean {
  return e instanceof ChatError && (e.status === 404 || e.status === 405 || e.status === 501)
}

async function readError(res: Response): Promise<ChatError> {
  let message = `${res.status} ${res.statusText}`.trim()
  let code = ''
  try {
    const text = await res.text()
    try {
      // the gateway answers in the format of the endpoint: { code, message } from its own checks,
      // { error: { type, code, message } } (Anthropic / OpenAI) or { error: { status, message } } (Gemini)
      const body = JSON.parse(text) as {
        error?: { message?: string; code?: string | number; type?: string; status?: string } | string
        message?: string
        code?: string | number
      }
      const err = body.error
      message = (typeof err === 'string' ? err : err?.message) || body.message || text || message
      const rawCode = body.code ?? (typeof err === 'object' ? err?.code ?? err?.status ?? err?.type : undefined)
      code = rawCode == null ? '' : String(rawCode)
    } catch {
      if (text) message = text.slice(0, 300)
    }
  } catch {
    // keep the status line
  }
  return new ChatError(message, res.status, code)
}

/** Reads a text/event-stream body and hands each event's data (and event name) to `onEvent` */
async function readSSE(res: Response, onEvent: (data: string, event: string) => void) {
  if (!res.body) throw new ChatError('The gateway returned an empty response')
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let finished = false
  const flush = (block: string) => {
    let event = 'message'
    const data: string[] = []
    for (const raw of block.split('\n')) {
      const line = raw.replace(/\r$/, '')
      if (line.startsWith('event:')) event = line.slice(6).trim()
      else if (line.startsWith('data:')) data.push(line.slice(5).replace(/^ /, ''))
    }
    if (data.length) onEvent(data.join('\n'), event)
  }
  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) {
        finished = true
        break
      }
      buffer += decoder.decode(value, { stream: true })
      // events end with a blank line; \n and \r\n line endings may even be mixed
      let sep: RegExpExecArray | null
      while ((sep = /\r?\n\r?\n/.exec(buffer))) {
        const block = buffer.slice(0, sep.index)
        buffer = buffer.slice(sep.index + sep[0].length)
        flush(block)
      }
    }
    buffer += decoder.decode()
    if (buffer.trim()) flush(buffer)
  } finally {
    // an error event thrown from a handler must not leave the response streaming in the background
    if (!finished) void reader.cancel().catch(() => undefined)
  }
}

function parseJSON<T>(data: string): T | null {
  try {
    return JSON.parse(data) as T
  } catch {
    return null
  }
}

/* ------------------------------------------------------------------ OpenAI-compatible */

async function streamOpenAI(req: ChatRequest, h: ChatStreamHandlers): Promise<ChatResult> {
  const messages: Array<{ role: string; content: string }> = []
  if (req.system?.trim()) messages.push({ role: 'system', content: req.system.trim() })
  messages.push(...req.messages)
  const body: Record<string, unknown> = { model: req.model, messages, stream: true, stream_options: { include_usage: true } }
  if (req.temperature != null) body.temperature = req.temperature
  if (req.maxTokens) body.max_tokens = req.maxTokens

  const res = await fetch(buildGatewayUrl(`${req.prefix || ''}/v1/chat/completions`), {
    method: 'POST',
    headers: { Authorization: `Bearer ${req.apiKey}`, 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify(body),
    signal: req.signal
  })
  if (!res.ok) throw await readError(res)

  const out: ChatResult = { text: '', reasoning: '', usage: null, finishReason: null }
  await readSSE(res, (data) => {
    if (data === '[DONE]') return
    const chunk = parseJSON<{
      choices?: Array<{ delta?: { content?: string; reasoning_content?: string; reasoning?: string }; finish_reason?: string | null }>
      usage?: { prompt_tokens?: number; completion_tokens?: number; prompt_tokens_details?: { cached_tokens?: number } } | null
      error?: { message?: string } | string
    }>(data)
    if (!chunk) return
    if (chunk.error) throw new ChatError(typeof chunk.error === 'string' ? chunk.error : chunk.error.message || 'The model returned an error')
    const choice = chunk.choices?.[0]
    const text = choice?.delta?.content
    if (text) {
      out.text += text
      h.onText?.(text)
    }
    const thinking = choice?.delta?.reasoning_content ?? choice?.delta?.reasoning
    if (thinking) {
      out.reasoning += thinking
      h.onReasoning?.(thinking)
    }
    if (choice?.finish_reason) out.finishReason = choice.finish_reason
    if (chunk.usage) {
      out.usage = {
        inputTokens: chunk.usage.prompt_tokens || 0,
        outputTokens: chunk.usage.completion_tokens || 0,
        cacheReadTokens: chunk.usage.prompt_tokens_details?.cached_tokens || 0
      }
      h.onUsage?.(out.usage)
    }
  })
  return out
}

/* ------------------------------------------------------------------ OpenAI Responses */

async function streamResponses(req: ChatRequest, h: ChatStreamHandlers): Promise<ChatResult> {
  const input = req.messages.map((m) => ({
    role: m.role,
    content: [{ type: m.role === 'user' ? 'input_text' : 'output_text', text: m.content }]
  }))
  const body: Record<string, unknown> = { model: req.model, input, stream: true, store: false }
  if (req.system?.trim()) body.instructions = req.system.trim()
  if (req.temperature != null) body.temperature = req.temperature
  if (req.maxTokens) body.max_output_tokens = req.maxTokens

  const res = await fetch(buildGatewayUrl(`${req.prefix || ''}/v1/responses`), {
    method: 'POST',
    headers: { Authorization: `Bearer ${req.apiKey}`, 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify(body),
    signal: req.signal
  })
  if (!res.ok) throw await readError(res)

  const out: ChatResult = { text: '', reasoning: '', usage: null, finishReason: null }
  await readSSE(res, (data, event) => {
    const ev = parseJSON<{
      type?: string
      delta?: string
      response?: { status?: string; usage?: { input_tokens?: number; output_tokens?: number; input_tokens_details?: { cached_tokens?: number } }; error?: { message?: string } }
      error?: { message?: string }
      message?: string
    }>(data)
    if (!ev) return
    const type = ev.type || event
    if (type === 'response.output_text.delta' && ev.delta) {
      out.text += ev.delta
      h.onText?.(ev.delta)
    } else if ((type === 'response.reasoning_summary_text.delta' || type === 'response.reasoning_text.delta') && ev.delta) {
      out.reasoning += ev.delta
      h.onReasoning?.(ev.delta)
    } else if (type === 'response.completed' || type === 'response.incomplete') {
      const u = ev.response?.usage
      if (u) {
        out.usage = { inputTokens: u.input_tokens || 0, outputTokens: u.output_tokens || 0, cacheReadTokens: u.input_tokens_details?.cached_tokens || 0 }
        h.onUsage?.(out.usage)
      }
      out.finishReason = ev.response?.status || type
    } else if (type === 'response.failed' || type === 'error') {
      throw new ChatError(ev.response?.error?.message || ev.error?.message || ev.message || 'The model returned an error')
    }
  })
  return out
}

/* ------------------------------------------------------------------ Anthropic Messages */

async function streamAnthropic(req: ChatRequest, h: ChatStreamHandlers): Promise<ChatResult> {
  const body: Record<string, unknown> = {
    model: req.model,
    max_tokens: req.maxTokens || 8192,
    messages: req.messages.map((m) => ({ role: m.role, content: m.content })),
    stream: true
  }
  if (req.system?.trim()) body.system = req.system.trim()
  // Anthropic accepts 0–1; the page's slider goes to 2 for the other formats
  if (req.temperature != null) body.temperature = Math.min(1, Math.max(0, req.temperature))

  const post = () =>
    fetch(buildGatewayUrl(`${req.prefix || ''}/v1/messages`), {
      method: 'POST',
      headers: {
        'x-api-key': req.apiKey,
        Authorization: `Bearer ${req.apiKey}`,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
        Accept: 'text/event-stream'
      },
      body: JSON.stringify(body),
      signal: req.signal
    })
  let res = await post()
  if (!res.ok) {
    const err = await readError(res)
    // Anthropic requires max_tokens. The default 8192 is above what some older models allow
    // (4096): when the person set no limit and the model refuses it, ask again with 4096.
    if (err.status === 400 && !req.maxTokens && /max_tokens/i.test(err.message)) {
      body.max_tokens = 4096
      res = await post()
      if (!res.ok) throw await readError(res)
    } else {
      throw err
    }
  }

  const out: ChatResult = { text: '', reasoning: '', usage: null, finishReason: null }
  // ChatUsage.inputTokens is the whole prompt, cache reads included (as OpenAI and Gemini report
  // it); Anthropic reports fresh, cache-write and cache-read input separately, so add them up.
  const usage: ChatUsage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0 }
  type AnthropicUsage = { input_tokens?: number; output_tokens?: number; cache_read_input_tokens?: number; cache_creation_input_tokens?: number }
  const takeInput = (u: AnthropicUsage) => {
    if (u.input_tokens == null && u.cache_read_input_tokens == null && u.cache_creation_input_tokens == null) return
    usage.cacheReadTokens = u.cache_read_input_tokens || 0
    usage.inputTokens = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + usage.cacheReadTokens
  }
  await readSSE(res, (data, event) => {
    const ev = parseJSON<{
      type?: string
      message?: { usage?: AnthropicUsage }
      delta?: { type?: string; text?: string; thinking?: string; stop_reason?: string }
      usage?: AnthropicUsage
      error?: { message?: string }
    }>(data)
    if (!ev) return
    const type = ev.type || event
    if (type === 'message_start' && ev.message?.usage) {
      takeInput(ev.message.usage)
      usage.outputTokens = ev.message.usage.output_tokens || 0
    } else if (type === 'content_block_delta') {
      if (ev.delta?.type === 'text_delta' && ev.delta.text) {
        out.text += ev.delta.text
        h.onText?.(ev.delta.text)
      } else if (ev.delta?.type === 'thinking_delta' && ev.delta.thinking) {
        out.reasoning += ev.delta.thinking
        h.onReasoning?.(ev.delta.thinking)
      }
    } else if (type === 'message_delta') {
      if (ev.usage?.output_tokens != null) usage.outputTokens = ev.usage.output_tokens
      // newer gateways repeat the final input counts here
      if (ev.usage?.input_tokens) takeInput(ev.usage)
      if (ev.delta?.stop_reason) out.finishReason = ev.delta.stop_reason
      out.usage = { ...usage }
      h.onUsage?.(out.usage)
    } else if (type === 'error') {
      throw new ChatError(ev.error?.message || 'The model returned an error')
    }
  })
  if (!out.usage && (usage.inputTokens || usage.outputTokens)) out.usage = usage
  return out
}

/* ------------------------------------------------------------------ Gemini */

async function streamGemini(req: ChatRequest, h: ChatStreamHandlers): Promise<ChatResult> {
  const body: Record<string, unknown> = {
    contents: req.messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }))
  }
  if (req.system?.trim()) body.systemInstruction = { parts: [{ text: req.system.trim() }] }
  const generationConfig: Record<string, unknown> = {}
  if (req.temperature != null) generationConfig.temperature = req.temperature
  if (req.maxTokens) generationConfig.maxOutputTokens = req.maxTokens
  if (Object.keys(generationConfig).length) body.generationConfig = generationConfig

  const path = `${req.prefix || ''}/v1beta/models/${encodeURIComponent(req.model)}:streamGenerateContent?alt=sse`
  const res = await fetch(buildGatewayUrl(path), {
    method: 'POST',
    headers: { 'x-goog-api-key': req.apiKey, Authorization: `Bearer ${req.apiKey}`, 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify(body),
    signal: req.signal
  })
  if (!res.ok) throw await readError(res)

  const out: ChatResult = { text: '', reasoning: '', usage: null, finishReason: null }
  await readSSE(res, (data) => {
    const chunk = parseJSON<{
      candidates?: Array<{ content?: { parts?: Array<{ text?: string; thought?: boolean }> }; finishReason?: string }>
      usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number; thoughtsTokenCount?: number; cachedContentTokenCount?: number }
      error?: { message?: string } | string
    }>(data)
    if (!chunk) return
    if (chunk.error) throw new ChatError(typeof chunk.error === 'string' ? chunk.error : chunk.error.message || 'The model returned an error')
    const cand = chunk.candidates?.[0]
    for (const part of cand?.content?.parts || []) {
      if (!part.text) continue
      if (part.thought) {
        out.reasoning += part.text
        h.onReasoning?.(part.text)
      } else {
        out.text += part.text
        h.onText?.(part.text)
      }
    }
    if (cand?.finishReason) out.finishReason = cand.finishReason
    if (chunk.usageMetadata) {
      const u = chunk.usageMetadata
      out.usage = {
        inputTokens: u.promptTokenCount || 0,
        outputTokens: (u.candidatesTokenCount || 0) + (u.thoughtsTokenCount || 0),
        cacheReadTokens: u.cachedContentTokenCount || 0
      }
      h.onUsage?.(out.usage)
    }
  })
  return out
}

/** Send the conversation and stream the reply */
export function streamChat(req: ChatRequest, handlers: ChatStreamHandlers = {}): Promise<ChatResult> {
  switch (req.protocol) {
    case 'anthropic':
      return streamAnthropic(req, handlers)
    case 'gemini':
      return streamGemini(req, handlers)
    case 'responses':
      return streamResponses(req, handlers)
    default:
      return streamOpenAI(req, handlers)
  }
}

/**
 * The models the gateway says this key can call (GET /v1/models). Used when the deployment
 * has not published per-group pricing; failures just mean "unknown".
 */
export async function listGatewayModels(apiKey: string, prefix = '', signal?: AbortSignal): Promise<string[]> {
  try {
    const res = await fetch(buildGatewayUrl(`${prefix}/v1/models`), {
      headers: { Authorization: `Bearer ${apiKey}`, 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      signal
    })
    if (!res.ok) return []
    const body = (await res.json()) as { data?: Array<{ id?: string; name?: string }>; models?: Array<{ name?: string }> }
    const ids = (body.data || []).map((m) => m.id || m.name || '').concat((body.models || []).map((m) => (m.name || '').replace(/^models\//, '')))
    return [...new Set(ids.filter(Boolean))]
  } catch {
    return []
  }
}
