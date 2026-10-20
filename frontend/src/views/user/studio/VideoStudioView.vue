<template>
  <AppLayout>
    <div class="vf" @keydown.esc="closePanels">
      <!-- ------------------------------------------------------------ HUD -->
      <header class="vf-hud">
        <button
          type="button"
          class="vf-chip"
          :aria-expanded="panel === 'source'"
          aria-haspopup="dialog"
          @click.stop="togglePanel('source')"
        >
          <span class="vf-chip-dot" :style="{ '--mark': platformColor(selectedKey?.group?.platform) }"></span>
          <span class="vf-chip-label">{{ selectedKey?.name || t('studio.picker.key') }}</span>
          <span v-if="selectedKey" class="vf-chip-sub">{{ selectedKey.group?.name || t('studio.picker.noGroup') }}</span>
          <Icon name="chevronDown" size="xs" class="vf-chip-caret" />
        </button>

        <button
          type="button"
          class="vf-chip"
          :aria-expanded="panel === 'source'"
          aria-haspopup="dialog"
          @click.stop="togglePanel('source')"
        >
          <code class="vf-chip-label">{{ model || t('studio.picker.model') }}</code>
          <span v-if="selectedModel?.price != null" class="vf-chip-price">${{ fmt(selectedModel.price) }}</span>
          <Icon name="chevronDown" size="xs" class="vf-chip-caret" />
        </button>

        <span class="vf-hud-spacer"></span>

        <span class="vf-estimate">{{ t('studio.video.billingNote') }}</span>
        <div class="vf-status" :class="`is-${phase}`">
          <span class="vf-status-dot"></span>
          <span>{{ statusText }}</span>
          <span v-if="busy || elapsed > 0" class="vf-status-time">{{ elapsedText }}</span>
        </div>

        <div v-if="panel === 'source'" class="vf-panel" @click.stop>
          <StudioSourcePicker
            kind="video"
            :keys="sources.usableKeys.value"
            :key-id="keyId"
            :model="model"
            :models="models"
            :loading="sources.loading.value"
            @update:key-id="(id) => (keyId = id)"
            @update:model="(m) => (model = m)"
          />
        </div>
      </header>

      <!-- ----------------------------------------------------------- body -->
      <div class="vf-body">
        <!-- clips from this session -->
        <aside class="vf-strip" :aria-label="t('studio.clips')">
          <span class="vf-strip-title">{{ t('studio.clips') }}</span>
          <button
            v-for="(item, i) in gallery"
            :key="item.id"
            type="button"
            class="vf-thumb"
            :class="{ 'is-active': current?.id === item.id }"
            :title="item.prompt"
            @click="current = item"
          >
            <video :src="item.objectUrl" muted playsinline preload="metadata"></video>
            <span class="vf-thumb-n">{{ gallery.length - i }}</span>
          </button>
          <span v-for="n in Math.max(0, 3 - gallery.length)" :key="`slot-${n}`" class="vf-slot" aria-hidden="true"></span>
          <button v-if="gallery.length" type="button" class="vf-strip-clear" @click="clearGallery">{{ t('studio.clear') }}</button>
        </aside>

        <!-- the monitor -->
        <section class="vf-stage">
          <ol class="vf-queue" aria-label="progress">
            <li
              v-for="(step, i) in steps"
              :key="step"
              :class="{ 'is-active': stepIndex === i && busy, 'is-done': stepIndex > i || phase === 'done' }"
            >
              {{ t(`studio.video.steps.${step}`) }}
            </li>
          </ol>

          <div class="vf-frame" :class="{ 'has-actions': showActions }" :style="frameStyle">
            <Transition name="vf-fade">
              <video
                v-if="current?.objectUrl"
                :key="current.id"
                :src="current.objectUrl"
                class="vf-video"
                controls
                autoplay
                loop
                playsinline
              ></video>
            </Transition>

            <div v-if="busy" class="vf-scan" aria-hidden="true"></div>
            <div v-if="busy" class="vf-ring" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle class="vf-ring-track" cx="60" cy="60" r="52" />
                <circle class="vf-ring-bar" cx="60" cy="60" r="52" :style="{ strokeDashoffset: 327 * (1 - progress) }" />
              </svg>
              <span class="vf-ring-text">{{ Math.round(progress * 100) }}%</span>
            </div>

            <div v-if="!busy && !current" class="vf-idle" aria-hidden="true">
              <span class="vf-sprockets vf-sprockets--top"></span>
              <span class="vf-sprockets vf-sprockets--bottom"></span>
              <span class="vf-play"></span>
              <p>{{ t('studio.video.idle') }}</p>
            </div>

            <div v-if="errorText" class="vf-error" role="alert">
              <Icon name="exclamationTriangle" size="md" />
              <span>{{ errorText }}</span>
            </div>
            <ol class="vf-telemetry" aria-live="polite">
              <li v-for="(line, i) in ticker" :key="i" :class="{ 'is-latest': i === ticker.length - 1 }">
                <span class="vf-telemetry-time">{{ line.at }}</span>
                <span>{{ line.text }}</span>
              </li>
            </ol>
          </div>

          <div v-if="showActions && current" class="vf-actions">
            <a :href="current.objectUrl" :download="`${current.model}-${current.id}.mp4`" class="vf-action">
              <Icon name="download" size="sm" />
              {{ t('studio.download') }}
            </a>
            <button type="button" class="vf-action" @click="prompt = current.prompt">
              <Icon name="refresh" size="sm" />
              {{ t('studio.reusePrompt') }}
            </button>
            <button type="button" class="vf-action" @click="copyId(current.requestId)">
              <Icon name="copy" size="sm" />
              {{ idCopied ? t('home.copied') : t('studio.video.copyId') }}
            </button>
          </div>

          <div v-if="panel === 'skills'" class="vf-sheet" @click.stop>
            <StudioSkills kind="video" :prompt="prompt" @use="useTemplate" @append="appendToPrompt" @remove="removeFromPrompt" @close="panel = null" />
          </div>
        </section>
      </div>

      <!-- ------------------------------------------------------ transport -->
      <div class="vf-bar">
        <div class="vf-tools">
          <button
            type="button"
            class="vf-tool"
            :aria-expanded="panel === 'skills'"
            aria-haspopup="dialog"
            :title="t('studio.skills.title')"
            @click.stop="togglePanel('skills')"
          >
            <Icon name="sparkles" size="sm" :stroke-width="1.8" />
          </button>
          <button type="button" class="vf-tool" :title="t('studio.random')" @click="randomPrompt">
            <Icon name="refresh" size="sm" :stroke-width="1.8" />
          </button>
          <div class="relative">
            <button
              type="button"
              class="vf-well"
              :class="{ 'is-open': panel === 'reference' }"
              :aria-expanded="panel === 'reference'"
              aria-haspopup="dialog"
              :title="t('studio.video.referenceImage')"
              @click.stop="togglePanel('reference')"
            >
              <img v-if="referencePreview" :src="referencePreview" alt="" @error="referenceBroken = true" />
              <Icon v-else name="photo" size="sm" :stroke-width="1.8" />
            </button>
            <div v-if="panel === 'reference'" class="vf-well-pop" @click.stop>
              <label for="studio-video-image">{{ t('studio.video.referenceImage') }} · {{ t('studio.optional') }}</label>
              <input
                id="studio-video-image"
                v-model="imageUrl"
                type="url"
                class="vf-input"
                :placeholder="t('studio.video.referenceImagePlaceholder')"
                spellcheck="false"
                @input="referenceBroken = false"
              />
            </div>
          </div>
        </div>

        <div class="vf-prompt-wrap">
          <textarea
            id="studio-video-prompt"
            ref="promptEl"
            v-model="prompt"
            class="vf-prompt"
            rows="1"
            :placeholder="t('studio.video.promptPlaceholder')"
            :aria-label="t('studio.prompt')"
            @keydown.enter.meta.prevent="generate"
            @keydown.enter.ctrl.prevent="generate"
          ></textarea>
          <kbd v-if="prompt.trim() && !busy" class="vf-prompt-kbd" aria-hidden="true">⌘↵</kbd>
        </div>

        <div class="vf-controls">
          <div class="vf-seg" role="radiogroup" :aria-label="t('studio.video.aspect')">
            <button
              v-for="s in aspects"
              :key="s.id"
              type="button"
              role="radio"
              class="vf-seg-item"
              :class="{ 'is-active': aspect === s.id }"
              :aria-checked="aspect === s.id"
              :title="s.id"
              @click="aspect = s.id"
            >
              <span class="vf-shape-box" :style="{ '--w': (2 * s.w) / Math.max(s.w, s.h), '--h': (2 * s.h) / Math.max(s.w, s.h) }"></span>
            </button>
          </div>
          <div class="vf-seg" role="radiogroup" :aria-label="t('studio.video.resolution')">
            <button
              v-for="r in resolutions"
              :key="r"
              type="button"
              role="radio"
              class="vf-seg-item"
              :class="{ 'is-active': resolution === r }"
              :aria-checked="resolution === r"
              @click="resolution = r"
            >
              {{ r }}
            </button>
          </div>
          <label class="vf-ruler">
            <span class="vf-ruler-label">{{ t('studio.video.duration') }}</span>
            <input v-model.number="duration" type="range" min="2" max="15" step="1" class="vf-range" />
            <span class="vf-ruler-value">{{ duration }}s</span>
          </label>
        </div>

        <div class="vf-go">
          <button
            type="button"
            class="vf-shutter"
            :class="{ 'is-busy': busy }"
            :style="{ '--p': progress }"
            :disabled="!canGenerate"
            :aria-label="busy ? t('studio.cancel') : t('studio.video.generate')"
            :title="busy ? t('studio.cancel') : t('studio.video.generate')"
            @click="busy ? cancel() : generate()"
          >
            <span class="vf-shutter-disc">
              <Icon :name="busy ? 'x' : 'film'" size="sm" :stroke-width="2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLayout from '@/components/layout/AppLayout.vue'
import './studio.css'
import Icon from '@/components/icons/Icon.vue'
import StudioSourcePicker from '@/components/studio/StudioSourcePicker.vue'
import StudioSkills from '@/components/studio/StudioSkills.vue'
import { useStudioSources, platformColor } from '@/composables/useStudioSources'
import { appendPhrase, removePhrase } from '@/data/studioSkills'
import { createVideo, fetchVideoObjectUrl, getVideoStatus, StudioError } from '@/api/studio'

const { t } = useI18n()
const sources = useStudioSources('video')

/* ------------------------------------------------------------ selection */
const keyId = ref<number | null>(null)
const model = ref('')
const selectedKey = computed(() => sources.keys.value.find((k) => k.id === keyId.value) || null)
const models = computed(() => sources.modelsForKey(selectedKey.value))
const selectedModel = computed(() => models.value.find((m) => m.id === model.value) || null)
watch(models, (list) => {
  if (!list.some((m) => m.id === model.value)) model.value = list[0]?.id || ''
})

/* --------------------------------------------------------------- panels */
type Panel = 'source' | 'skills' | 'reference' | null
const panel = ref<Panel>(null)
function togglePanel(which: Exclude<Panel, null>) {
  panel.value = panel.value === which ? null : which
}
function closePanels() {
  panel.value = null
}
function onDocClick() {
  panel.value = null
}

/* ------------------------------------------------------------- controls */
const prompt = ref('')
const promptEl = ref<HTMLTextAreaElement | null>(null)
const imageUrl = ref('')
const referenceBroken = ref(false)
const referencePreview = computed(() => {
  const url = imageUrl.value.trim()
  return !referenceBroken.value && /^https?:\/\//i.test(url) ? url : ''
})
const aspect = ref('16:9')
const duration = ref(6)
const resolution = ref('720p')
const resolutions = ['480p', '720p', '1080p']
const aspects = [
  { id: '16:9', w: 16, h: 9 },
  { id: '9:16', w: 9, h: 16 },
  { id: '1:1', w: 1, h: 1 }
]
const frameStyle = computed(() => {
  const a = aspects.find((x) => x.id === aspect.value) || aspects[0]
  return { '--rw': a.w, '--rh': a.h }
})
const starters = computed(() => [t('studio.video.starters.0'), t('studio.video.starters.1'), t('studio.video.starters.2')])

function randomPrompt() {
  const pool = starters.value.filter((s) => s !== prompt.value)
  prompt.value = pool[Math.floor(Math.random() * pool.length)] || starters.value[0]
  promptEl.value?.focus()
}
async function useTemplate(text: string, placeholder: string) {
  prompt.value = text
  panel.value = null
  await nextTick()
  const el = promptEl.value
  if (!el) return
  el.focus()
  const at = text.indexOf(placeholder)
  if (at >= 0) el.setSelectionRange(at, at + placeholder.length)
}
function appendToPrompt(text: string) {
  prompt.value = appendPhrase(prompt.value, text)
}
function removeFromPrompt(text: string) {
  prompt.value = removePhrase(prompt.value, text)
}
function fmt(p: number) {
  return p.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')
}

/* ------------------------------------------------------------- the run */
interface VideoItem {
  id: number
  requestId: string
  prompt: string
  model: string
  objectUrl: string
  at: number
}
type Phase = 'idle' | 'sending' | 'polling' | 'rendering' | 'done' | 'error'
const steps = ['submitted', 'queued', 'rendering', 'ready'] as const

const busy = ref(false)
const phase = ref<Phase>('idle')
const progress = ref(0)
const stepIndex = ref(-1)
const errorText = ref('')
const current = ref<VideoItem | null>(null)
const gallery = ref<VideoItem[]>([])
const ticker = ref<Array<{ at: string; text: string }>>([])
const elapsed = ref(0)
const idCopied = ref(false)
let seq = 0
let abort: AbortController | null = null
let timer: ReturnType<typeof setInterval> | null = null
let startedAt = 0

const canGenerate = computed(() => busy.value || (!!selectedKey.value && !!model.value && prompt.value.trim().length > 0))
const showActions = computed(() => !!current.value?.objectUrl && !busy.value)
const elapsedText = computed(() => `${Math.round(elapsed.value / 1000)}s`)
const statusText = computed(() => t(`studio.phases.${phase.value}`))

function stamp() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}
function log(text: string) {
  ticker.value = [...ticker.value.slice(-2), { at: stamp(), text }]
}
function startClock() {
  startedAt = performance.now()
  elapsed.value = 0
  timer = setInterval(() => {
    elapsed.value = performance.now() - startedAt
    // a video usually lands within a couple of minutes; creep towards 90% until it does
    if (busy.value && progress.value < 0.9) {
      progress.value = Math.max(progress.value, 0.9 * (1 - Math.exp(-elapsed.value / 70000)))
    }
  }, 250)
}
function stopClock() {
  if (timer) clearInterval(timer)
  timer = null
  elapsed.value = performance.now() - startedAt
}
const sleep = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms)
    signal.addEventListener('abort', () => {
      clearTimeout(id)
      reject(new DOMException('aborted', 'AbortError'))
    })
  })

async function generate() {
  if (!canGenerate.value || busy.value || !selectedKey.value) return
  const key = selectedKey.value
  busy.value = true
  panel.value = null
  errorText.value = ''
  progress.value = 0.03
  phase.value = 'sending'
  stepIndex.value = 0
  current.value = null
  abort = new AbortController()
  const signal = abort.signal
  startClock()
  const runPrompt = prompt.value.trim()
  const runModel = model.value
  log(t('studio.log.sent', { model: runModel }))
  try {
    const job = await createVideo({
      apiKey: key.key,
      model: runModel,
      prompt: runPrompt,
      duration: duration.value,
      aspectRatio: aspect.value,
      resolution: resolution.value,
      imageUrl: imageUrl.value.trim() || undefined,
      signal
    })
    phase.value = 'polling'
    stepIndex.value = 1
    progress.value = 0.12
    log(t('studio.log.accepted', { id: job.requestId }))

    // poll until the gateway reports the video as done
    let status = job.status
    let polls = 0
    for (;;) {
      await sleep(polls < 6 ? 3000 : 5000, signal)
      polls += 1
      const s = await getVideoStatus(key.key, job.requestId, signal)
      status = (s.status || '').toLowerCase()
      if (status === 'done' || status === 'completed' || status === 'succeeded') {
        if (!s.videoUrl) {
          // done but no url yet: give it one more round
          if (polls > 60) throw new StudioError(t('studio.log.noVideo'))
          continue
        }
        break
      }
      if (status === 'failed' || status === 'error' || status === 'expired' || status === 'cancelled') {
        const reason = (s.raw.error as { message?: string } | undefined)?.message || (s.raw.failure_reason as string) || status
        throw new StudioError(String(reason))
      }
      if (phase.value !== 'rendering' && polls >= 2) {
        phase.value = 'rendering'
        stepIndex.value = 2
      }
      if (polls % 4 === 0) log(t('studio.log.stillRendering', { seconds: Math.round(elapsed.value / 1000) }))
      if (polls > 240) throw new StudioError(t('studio.log.timeout'))
    }

    stepIndex.value = 3
    progress.value = 0.95
    log(t('studio.log.downloading'))
    const objectUrl = await fetchVideoObjectUrl(key.key, job.requestId, signal)
    const item: VideoItem = { id: ++seq, requestId: job.requestId, prompt: runPrompt, model: runModel, objectUrl, at: Date.now() }
    gallery.value = [item, ...gallery.value].slice(0, 12)
    current.value = item
    phase.value = 'done'
    progress.value = 1
    log(t('studio.log.finished', { seconds: (elapsed.value / 1000).toFixed(1) }))
  } catch (e) {
    if (signal.aborted) {
      phase.value = 'idle'
      stepIndex.value = -1
      log(t('studio.log.cancelled'))
    } else {
      phase.value = 'error'
      errorText.value = e instanceof Error ? e.message : String(e)
      log(t('studio.log.failed', { message: errorText.value }))
    }
  } finally {
    stopClock()
    busy.value = false
    abort = null
  }
}

function cancel() {
  abort?.abort()
}

function clearGallery() {
  for (const item of gallery.value) URL.revokeObjectURL(item.objectUrl)
  gallery.value = []
  current.value = null
}

async function copyId(id: string) {
  try {
    await navigator.clipboard.writeText(id)
    idCopied.value = true
    setTimeout(() => (idCopied.value = false), 1500)
  } catch {
    idCopied.value = false
  }
}

onMounted(async () => {
  document.addEventListener('click', onDocClick)
  await sources.load()
  const first = sources.usableKeys.value[0]
  if (first) keyId.value = first.id
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  abort?.abort()
  if (timer) clearInterval(timer)
  for (const item of gallery.value) URL.revokeObjectURL(item.objectUrl)
})
</script>
