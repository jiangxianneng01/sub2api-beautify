import { computed, ref } from 'vue'
import { keysAPI } from '@/api/keys'
import { userChannelsAPI, type UserAvailableChannel, type UserSupportedModel } from '@/api/channels'
import { BILLING_MODE_IMAGE, BILLING_MODE_VIDEO } from '@/constants/channel'
import type { ApiKey } from '@/types'

/**
 * What the studios can work with: the person's API keys, and for each key the models of the
 * right kind (image or video) that its group offers, with the gateway's platform rules applied:
 *   images → OpenAI and Grok groups     videos → Grok and composite groups
 * When pricing has not been configured for a model the group's platform defaults are offered,
 * so a fresh deployment still has something to pick.
 */

export type StudioKind = 'image' | 'video'

export interface StudioModel {
  id: string
  platform: string
  /** USD per image when the deployment publishes it */
  price?: number | null
  /** true when the model comes from platform defaults rather than the channel list */
  assumed?: boolean
}

const IMAGE_PLATFORMS = new Set(['openai', 'grok'])
const VIDEO_PLATFORMS = new Set(['grok', 'composite'])

const DEFAULT_MODELS: Record<StudioKind, Record<string, string[]>> = {
  image: {
    openai: ['gpt-image-2', 'gpt-image-1', 'gpt-image-1-mini'],
    grok: ['grok-imagine']
  },
  video: {
    grok: ['grok-imagine-video', 'grok-imagine-video-1.5'],
    composite: ['grok-imagine-video', 'grok-imagine-video-1.5']
  }
}

const PLATFORM_COLORS: Record<string, string> = {
  openai: '#63b17f',
  anthropic: '#ff8a5c',
  gemini: '#5bb2be',
  grok: '#e5487f',
  antigravity: '#a8b7ff',
  composite: '#ffb547'
}

/** A dot colour per upstream platform, used by the studios' HUD and picker. */
export function platformColor(platform?: string | null): string {
  return (platform && PLATFORM_COLORS[platform]) || '#ada49a'
}

export function platformSupports(kind: StudioKind, platform: string | undefined | null): boolean {
  if (!platform) return false
  return kind === 'image' ? IMAGE_PLATFORMS.has(platform) : VIDEO_PLATFORMS.has(platform)
}

export function useStudioSources(kind: StudioKind) {
  const keys = ref<ApiKey[]>([])
  const channels = ref<UserAvailableChannel[]>([])
  const loading = ref(false)
  const error = ref('')

  async function load() {
    loading.value = true
    error.value = ''
    try {
      const [keyPage, channelList] = await Promise.all([
        keysAPI.list(1, 100, { status: 'active', sort_by: 'created_at', sort_order: 'desc' }),
        userChannelsAPI.getAvailable().catch(() => [] as UserAvailableChannel[])
      ])
      keys.value = keyPage.items || []
      channels.value = channelList
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      loading.value = false
    }
  }

  /** Keys whose group can do this kind of work, first; the rest follow so nothing is hidden. */
  const usableKeys = computed(() =>
    [...keys.value].sort((a, b) => Number(platformSupports(kind, b.group?.platform)) - Number(platformSupports(kind, a.group?.platform)))
  )

  function modelsForKey(key: ApiKey | null | undefined): StudioModel[] {
    if (!key) return []
    const platform = key.group?.platform || ''
    if (!platformSupports(kind, platform)) return []
    const wanted = kind === 'image' ? BILLING_MODE_IMAGE : BILLING_MODE_VIDEO
    const found = new Map<string, StudioModel>()
    for (const channel of channels.value) {
      for (const section of channel.platforms) {
        if (!section.groups.some((g) => g.id === key.group_id)) continue
        for (const model of section.supported_models as UserSupportedModel[]) {
          if (model.pricing?.billing_mode !== wanted) continue
          if (!found.has(model.name)) {
            found.set(model.name, {
              id: model.name,
              platform: section.platform,
              price: model.pricing?.per_request_price ?? model.pricing?.image_output_price ?? null
            })
          }
        }
      }
    }
    if (found.size) return [...found.values()]
    return (DEFAULT_MODELS[kind][platform] || []).map((id) => ({ id, platform, assumed: true }))
  }

  return { keys, usableKeys, channels, loading, error, load, modelsForKey }
}
