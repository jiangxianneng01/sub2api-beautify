/**
 * AI chat state: which keys and models are available, and the person's conversations.
 *
 * Models for a key come from its group, in this order:
 *   1. the "available channels" the deployment publishes for that group (token / per-request
 *      models, with their prices, so the page can show a cost estimate),
 *   2. otherwise what the gateway itself lists for the key (GET /v1/models),
 *   3. otherwise one sensible default per platform, marked as assumed.
 *
 * Conversations live in this browser only (localStorage, per user). The API key itself is never
 * stored — a conversation remembers the key's id and looks the key up again when reopened.
 */
import { computed, ref, watch } from 'vue'
import { keysAPI } from '@/api/keys'
import { userChannelsAPI, type UserAvailableChannel } from '@/api/channels'
import { BILLING_MODE_IMAGE, BILLING_MODE_VIDEO } from '@/constants/channel'
import { isChatPlatform, listGatewayModels, protocolCandidates, type ChatProtocol, type ChatRoute, type ChatUsage } from '@/api/chat'
import type { ApiKey } from '@/types'

export interface ChatModel {
  id: string
  platform: string
  /** USD per token, when the deployment publishes it */
  inputPrice?: number | null
  outputPrice?: number | null
  cacheReadPrice?: number | null
  /** where the entry came from */
  source: 'channel' | 'gateway' | 'default'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  reasoning?: string
  model?: string
  usage?: ChatUsage | null
  /** estimated USD for this reply, before group rate */
  cost?: number | null
  error?: string
  /** true while the reply is still streaming */
  pending?: boolean
  createdAt: number
}

export interface ChatSettings {
  system: string
  temperature: number | null
  maxTokens: number | null
  /** 'auto' follows the key's platform */
  protocol: 'auto' | ChatProtocol
}

export interface ChatSession {
  id: string
  title: string
  keyId: number | null
  model: string
  platform: string
  settings: ChatSettings
  /** the format that last worked for this key and model in 'auto' mode, tried first next time */
  routeHint?: ChatProtocol | null
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export const DEFAULT_SETTINGS: ChatSettings = { system: '', temperature: null, maxTokens: null, protocol: 'auto' }

/**
 * A starting model per platform for deployments that publish no channel list and whose gateway
 * does not list models either. Kept in step with the model ids the "Use key" dialog configures.
 */
const DEFAULT_MODELS: Record<string, string[]> = {
  anthropic: ['claude-sonnet-5-5', 'claude-opus-5-5'],
  openai: ['gpt-6', 'gpt-5.6', 'gpt-5.5'],
  gemini: ['gemini-3.1-pro-preview', 'gemini-3.5-flash', 'gemini-2.5-pro'],
  antigravity: ['claude-sonnet-4-6', 'gemini-3.1-pro-high', 'gemini-3-flash'],
  grok: ['grok-4.5', 'grok-4.3'],
  kimi: ['kimi-k2.5'],
  zhipu: ['glm-4.7'],
  deepseek: ['deepseek-v4-pro'],
  minimax: ['MiniMax-M3'],
  opencode_go: ['glm-5.3'],
  composite: ['gpt-5.5', 'claude-sonnet-4-6']
}

/** names that are clearly image / video models, kept out of a chat model list */
const NON_CHAT = /(image|imagine|dall-?e|video|sora|veo|kling|embedding|tts|whisper|moderation)/i

const MAX_SESSIONS = 60

function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

export function useChatSources() {
  const keys = ref<ApiKey[]>([])
  const channels = ref<UserAvailableChannel[]>([])
  const loading = ref(false)
  const error = ref('')
  const gatewayModels = new Map<number, Promise<string[]>>()

  async function load() {
    loading.value = true
    error.value = ''
    try {
      const [keyPage, channelList] = await Promise.all([
        keysAPI.list(1, 100, { status: 'active', sort_by: 'created_at', sort_order: 'desc' }),
        userChannelsAPI.getAvailable().catch(() => [] as UserAvailableChannel[])
      ])
      // TypeSafe groups evaluate text rather than chat, so their keys are not offered here
      keys.value = (keyPage.items || []).filter((k) => isChatPlatform(k.group?.platform))
      channels.value = channelList
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      loading.value = false
    }
  }

  function channelModels(key: ApiKey): ChatModel[] {
    const found = new Map<string, ChatModel>()
    for (const channel of channels.value) {
      for (const section of channel.platforms) {
        if (!section.groups.some((g) => g.id === key.group_id)) continue
        for (const model of section.supported_models) {
          const mode = model.pricing?.billing_mode
          if (mode === BILLING_MODE_IMAGE || mode === BILLING_MODE_VIDEO) continue
          // image / embedding / speech models can be token-billed too; they still are not chat models
          if (NON_CHAT.test(model.name)) continue
          if (!found.has(model.name)) {
            found.set(model.name, {
              id: model.name,
              platform: model.platform || section.platform,
              inputPrice: model.pricing?.input_price ?? null,
              outputPrice: model.pricing?.output_price ?? null,
              cacheReadPrice: model.pricing?.cache_read_price ?? null,
              source: 'channel'
            })
          }
        }
      }
    }
    return [...found.values()]
  }

  /** Models for a key, resolved once per key */
  async function modelsForKey(key: ApiKey | null | undefined): Promise<ChatModel[]> {
    if (!key) return []
    const platform = key.group?.platform || ''
    const fromChannels = channelModels(key)
    if (fromChannels.length) return fromChannels
    let pending = gatewayModels.get(key.id)
    if (!pending) {
      const prefix = platform === 'antigravity' ? '/antigravity' : ''
      pending = listGatewayModels(key.key, prefix)
      gatewayModels.set(key.id, pending)
    }
    const listed = (await pending).filter((id) => !NON_CHAT.test(id))
    if (listed.length) return listed.map((id) => ({ id, platform, source: 'gateway' as const }))
    return (DEFAULT_MODELS[platform] || []).map((id) => ({ id, platform, source: 'default' as const }))
  }

  return { keys, channels, loading, error, load, modelsForKey }
}

/** Estimated USD for one reply from published per-token prices (before the group's rate) */
export function estimateCost(model: ChatModel | undefined, usage: ChatUsage | null | undefined): number | null {
  if (!model || !usage || model.inputPrice == null || model.outputPrice == null) return null
  const cached = usage.cacheReadTokens || 0
  const fresh = Math.max(0, usage.inputTokens - cached)
  return fresh * model.inputPrice + cached * (model.cacheReadPrice ?? model.inputPrice) + usage.outputTokens * model.outputPrice
}

/**
 * The formats to try for a session, best first: a forced format alone, otherwise the platform's
 * candidates with the one that worked last time moved to the front.
 */
export function sessionRoutes(session: ChatSession): ChatRoute[] {
  const candidates = protocolCandidates(session.platform, session.model)
  if (session.settings.protocol !== 'auto') return [{ protocol: session.settings.protocol, prefix: candidates[0].prefix }]
  const hint = session.routeHint
  if (!hint) return candidates
  const hinted = candidates.find((c) => c.protocol === hint)
  return hinted ? [hinted, ...candidates.filter((c) => c !== hinted)] : candidates
}

/** Resolved wire format for a session (the first one it will try) */
export function sessionProtocol(session: ChatSession): ChatRoute {
  return sessionRoutes(session)[0]
}

/* ------------------------------------------------------------------ sessions */

export function useChatSessions(userId: () => number | string | null | undefined) {
  // deep on purpose: replies stream into the message objects in place
  const sessions = ref<ChatSession[]>([])
  const activeId = ref<string | null>(null)

  const storageKey = computed(() => `jlai.chat.${userId() ?? 'anon'}`)

  function read() {
    try {
      const raw = localStorage.getItem(storageKey.value)
      const parsed = raw ? (JSON.parse(raw) as unknown) : []
      const list = Array.isArray(parsed) ? (parsed as ChatSession[]).filter((s) => s && Array.isArray(s.messages)) : []
      for (const s of list) {
        // a reply cut off by a reload is no longer streaming; one that had not produced text is dropped
        s.messages = s.messages.filter((m) => !(m.pending && !m.content && !m.reasoning))
        for (const m of s.messages) if (m.pending) m.pending = false
        s.settings = { ...DEFAULT_SETTINGS, ...(s.settings || {}) }
      }
      sessions.value = list
    } catch {
      sessions.value = []
    }
  }

  let saveTimer = 0
  let pendingSave: (() => void) | null = null
  function persist() {
    window.clearTimeout(saveTimer)
    // bind the key now: if the account changes within the delay, these sessions still go to their owner
    const key = storageKey.value
    const snapshot = sessions.value
    pendingSave = () => {
      pendingSave = null
      // Browser storage holds about 5 MB per site. When long conversations fill it, keep saving the
      // newest ones and leave out the oldest, instead of silently saving nothing from then on.
      let count = Math.min(snapshot.length, MAX_SESSIONS)
      for (;;) {
        try {
          localStorage.setItem(key, JSON.stringify(snapshot.slice(0, count)))
          return
        } catch {
          // full (or storage blocked altogether): try again with fewer conversations
          if (count <= 1) return
          count = Math.max(1, Math.floor(count / 2))
        }
      }
    }
    saveTimer = window.setTimeout(() => pendingSave?.(), 250)
  }

  /** Write a save that is still waiting (leaving the page, closing the tab) */
  function flush() {
    window.clearTimeout(saveTimer)
    pendingSave?.()
  }

  /** Call after mutating a session in place */
  function touch(session?: ChatSession) {
    if (session) session.updatedAt = Date.now()
    sessions.value = [...sessions.value].sort((a, b) => b.updatedAt - a.updatedAt)
    persist()
  }

  const active = computed(() => sessions.value.find((s) => s.id === activeId.value) || null)

  function create(seed?: Partial<Pick<ChatSession, 'keyId' | 'model' | 'platform' | 'settings'>>): ChatSession {
    const now = Date.now()
    const session: ChatSession = {
      id: uid('chat'),
      title: '',
      keyId: seed?.keyId ?? null,
      model: seed?.model ?? '',
      platform: seed?.platform ?? '',
      settings: { ...DEFAULT_SETTINGS, ...(seed?.settings || {}) },
      messages: [],
      createdAt: now,
      updatedAt: now
    }
    sessions.value = [session, ...sessions.value]
    activeId.value = session.id
    persist()
    return session
  }

  function remove(id: string) {
    sessions.value = sessions.value.filter((s) => s.id !== id)
    if (activeId.value === id) activeId.value = sessions.value[0]?.id ?? null
    persist()
  }

  function newMessage(role: ChatMessage['role'], content: string, extra: Partial<ChatMessage> = {}): ChatMessage {
    return { id: uid('m'), role, content, createdAt: Date.now(), ...extra }
  }

  watch(storageKey, read, { immediate: true })

  return { sessions, activeId, active, create, remove, touch, newMessage, persist, flush }
}

/** Group sessions by day for the sidebar: today / yesterday / earlier */
export function sessionBucket(ts: number): 'today' | 'yesterday' | 'earlier' {
  const d = new Date(ts)
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (d.getTime() >= start) return 'today'
  if (d.getTime() >= start - 86400000) return 'yesterday'
  return 'earlier'
}
