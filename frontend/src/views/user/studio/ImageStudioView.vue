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

        <span v-if="selectedModel?.price != null" class="vf-estimate">
          {{ t('studio.image.estimate', { price: '$' + fmt(selectedModel.price * count) }) }}
        </span>
        <div class="vf-status" :class="`is-${phase}`">
          <span class="vf-status-dot"></span>
          <span>{{ statusText }}</span>
          <span v-if="busy || elapsed > 0" class="vf-status-time">{{ elapsedText }}</span>
        </div>

        <div v-if="panel === 'source'" class="vf-panel" @click.stop>
          <StudioSourcePicker
            kind="image"
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
        <!-- filmstrip of this session's takes -->
        <aside class="vf-strip" :aria-label="t('studio.takes')">
          <span class="vf-strip-title">{{ t('studio.takes') }}</span>
          <button
            v-for="(item, i) in gallery"
            :key="item.id"
            type="button"
            class="vf-thumb"
            :class="{ 'is-active': current?.id === item.id }"
            :title="item.prompt"
            @click="current = item"
          >
            <img :src="item.src" alt="" loading="lazy" />
            <span class="vf-thumb-n">{{ gallery.length - i }}</span>
          </button>
          <span v-for="n in Math.max(0, 3 - gallery.length)" :key="`slot-${n}`" class="vf-slot" aria-hidden="true"></span>
          <button v-if="gallery.length" type="button" class="vf-strip-clear" @click="clearGallery">{{ t('studio.clear') }}</button>
        </aside>

        <!-- the viewfinder -->
        <section class="vf-stage">
          <div class="vf-frame" :class="{ 'has-actions': showActions }" :style="frameStyle">
            <Transition name="vf-fade">
              <img v-if="current" :key="current.src" :src="current.src" class="vf-image" :class="{ 'is-partial': current.partial }" alt="" />
            </Transition>

            <div v-if="busy" class="vf-scan" aria-hidden="true"></div>
            <div v-if="busy && !current" class="vf-ring" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle class="vf-ring-track" cx="60" cy="60" r="52" />
                <circle class="vf-ring-bar" cx="60" cy="60" r="52" :style="{ strokeDashoffset: 327 * (1 - progress) }" />
              </svg>
              <span class="vf-ring-text">{{ Math.round(progress * 100) }}%</span>
            </div>

            <div v-if="!busy && !current" class="vf-idle" aria-hidden="true">
              <span class="vf-corner vf-corner--tl"></span>
              <span class="vf-corner vf-corner--tr"></span>
              <span class="vf-corner vf-corner--bl"></span>
              <span class="vf-corner vf-corner--br"></span>
              <span class="vf-thirds"></span>
              <p>{{ t('studio.image.idle') }}</p>
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
            <a :href="current.src" :download="downloadName(current)" class="vf-action">
              <Icon name="download" size="sm" />
              {{ t('studio.download') }}
            </a>
            <button type="button" class="vf-action" @click="prompt = current.prompt">
              <Icon name="refresh" size="sm" />
              {{ t('studio.reusePrompt') }}
            </button>
            <a :href="current.src" target="_blank" rel="noopener noreferrer" class="vf-action">
              <Icon name="externalLink" size="sm" />
              {{ t('studio.open') }}
            </a>
          </div>

          <div v-if="panel === 'skills'" class="vf-sheet" @click.stop>
            <StudioSkills kind="image" :prompt="prompt" @use="useTemplate" @append="appendToPrompt" @remove="removeFromPrompt" @close="panel = null" />
          </div>
        </section>
      </div>

      <!-- ---------------------------------------------------- command bar -->
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
        </div>

        <div class="vf-prompt-wrap">
          <textarea
            id="studio-prompt"
            ref="promptEl"
            v-model="prompt"
            class="vf-prompt"
            rows="1"
            :placeholder="t('studio.image.promptPlaceholder')"
            :aria-label="t('studio.prompt')"
            @keydown.enter.meta.prevent="generate"
            @keydown.enter.ctrl.prevent="generate"
          ></textarea>
          <kbd v-if="prompt.trim() && !busy" class="vf-prompt-kbd" aria-hidden="true">⌘↵</kbd>
        </div>

        <div class="vf-controls">
          <div class="vf-seg" role="radiogroup" :aria-label="t('studio.image.shape')">
            <button
              v-for="s in shapes"
              :key="s.id"
              type="button"
              role="radio"
              class="vf-seg-item"
              :class="{ 'is-active': size === s.id }"
              :aria-checked="size === s.id"
              :title="t(s.labelKey)"
              @click="size = s.id"
            >
              <span class="vf-shape-box" :style="{ '--w': (2 * s.w) / Math.max(s.w, s.h), '--h': (2 * s.h) / Math.max(s.w, s.h) }"></span>
            </button>
          </div>
          <div class="vf-seg" role="radiogroup" :aria-label="t('studio.image.quality')">
            <button
              v-for="q in qualities"
              :key="q"
              type="button"
              role="radio"
              class="vf-seg-item"
              :class="{ 'is-active': quality === q }"
              :aria-checked="quality === q"
              @click="quality = q"
            >
              {{ t(`studio.image.qualities.${q}`) }}
            </button>
          </div>
          <div class="vf-seg" role="radiogroup" :aria-label="t('studio.image.count')">
            <button
              v-for="n in [1, 2, 4]"
              :key="n"
              type="button"
              role="radio"
              class="vf-seg-item"
              :class="{ 'is-active': count === n }"
              :aria-checked="count === n"
              @click="count = n"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <div class="vf-go">
          <button
            type="button"
            class="vf-shutter"
            :class="{ 'is-busy': busy }"
            :style="{ '--p': progress }"
            :disabled="!canGenerate"
            :aria-label="busy ? t('studio.cancel') : t('studio.image.generate')"
            :title="busy ? t('studio.cancel') : t('studio.image.generate')"
            @click="busy ? cancel() : generate()"
          >
            <span class="vf-shutter-disc">
              <Icon :name="busy ? 'x' : 'photo'" size="sm" :stroke-width="2" />
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
import { generateImages, StudioError, type ImageResult } from '@/api/studio'
import { toOpenableUrl } from '@/utils/objectUrl'

const { t } = useI18n()
const sources = useStudioSources('image')

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
type Panel = 'source' | 'skills' | null
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
const size = ref('1024x1024')
const quality = ref('auto')
const count = ref(1)
const qualities = ['auto', 'low', 'medium', 'high']
const shapes = [
  { id: '1024x1024', labelKey: 'studio.image.shapes.square', w: 1, h: 1 },
  { id: '1536x1024', labelKey: 'studio.image.shapes.landscape', w: 1.5, h: 1 },
  { id: '1024x1536', labelKey: 'studio.image.shapes.portrait', w: 1, h: 1.5 }
]
const frameStyle = computed(() => {
  const s = shapes.find((x) => x.id === size.value) || shapes[0]
  return { '--rw': s.w, '--rh': s.h }
})
const starters = computed(() => [t('studio.image.starters.0'), t('studio.image.starters.1'), t('studio.image.starters.2')])

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
interface GalleryItem extends ImageResult {
  id: number
  prompt: string
  model: string
  partial?: boolean
  at: number
}
type Phase = 'idle' | 'sending' | 'rendering' | 'done' | 'error'

const busy = ref(false)
const phase = ref<Phase>('idle')
const progress = ref(0)
const errorText = ref('')
const current = ref<GalleryItem | null>(null)
const gallery = ref<GalleryItem[]>([])
const ticker = ref<Array<{ at: string; text: string }>>([])
const elapsed = ref(0)
let seq = 0
let abort: AbortController | null = null
let timer: ReturnType<typeof setInterval> | null = null
let startedAt = 0

// Finished images are kept as blob: URLs, not the data: URLs the gateway sends back:
// browsers refuse to open a data: URL in a new tab, so "Open" showed a blank page.
const ownedUrls = new Set<string>()
function keepImage(src: string): string {
  const { url, owned } = toOpenableUrl(src)
  if (owned) ownedUrls.add(url)
  return url
}
function releaseImage(src: string) {
  if (ownedUrls.delete(src)) URL.revokeObjectURL(src)
}

const canGenerate = computed(() => busy.value || (!!selectedKey.value && !!model.value && prompt.value.trim().length > 0))
const showActions = computed(() => !!current.value && !current.value.partial && !busy.value)
const elapsedText = computed(() => `${(elapsed.value / 1000).toFixed(1)}s`)
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
    // without partials we can only guess: approach 90% over ~25s, never claim done
    if (phase.value === 'rendering' && progress.value < 0.9) {
      progress.value = Math.max(progress.value, 0.9 * (1 - Math.exp(-elapsed.value / 12000)))
    }
  }, 100)
}
function stopClock() {
  if (timer) clearInterval(timer)
  timer = null
  elapsed.value = performance.now() - startedAt
}

async function generate() {
  if (!canGenerate.value || busy.value || !selectedKey.value) return
  const key = selectedKey.value
  const useStream = key.group?.platform === 'openai'
  busy.value = true
  panel.value = null
  errorText.value = ''
  progress.value = 0.04
  phase.value = 'sending'
  current.value = null
  abort = new AbortController()
  startClock()
  log(t('studio.log.sent', { model: model.value }))
  const runPrompt = prompt.value.trim()
  const runModel = model.value
  let finished = 0
  try {
    const results = await generateImages(
      {
        apiKey: key.key,
        model: runModel,
        prompt: runPrompt,
        n: count.value,
        size: size.value,
        quality: quality.value,
        stream: useStream,
        partialImages: 2,
        signal: abort.signal
      },
      {
        onPartial: (src, index) => {
          phase.value = 'rendering'
          progress.value = Math.max(progress.value, 0.35 + index * 0.25)
          current.value = { id: -1, src, prompt: runPrompt, model: runModel, partial: true, at: Date.now() }
          log(t('studio.log.partial', { index: index + 1 }))
        },
        onCompleted: (result) => {
          finished += 1
          const item: GalleryItem = { ...result, src: keepImage(result.src), id: ++seq, prompt: runPrompt, model: runModel, at: Date.now() }
          const takes = [item, ...gallery.value]
          takes.slice(24).forEach((dropped) => releaseImage(dropped.src))
          gallery.value = takes.slice(0, 24)
          current.value = item
          progress.value = Math.max(progress.value, finished / count.value)
          log(t('studio.log.done', { index: finished, total: count.value }))
        }
      }
    )
    if (phase.value === 'sending') phase.value = 'rendering'
    if (!results.length) throw new StudioError(t('studio.log.empty'))
    phase.value = 'done'
    progress.value = 1
    log(t('studio.log.finished', { seconds: (elapsed.value / 1000).toFixed(1) }))
  } catch (e) {
    if (abort?.signal.aborted) {
      phase.value = 'idle'
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
  gallery.value.forEach((item) => releaseImage(item.src))
  gallery.value = []
  current.value = null
}

function downloadName(item: GalleryItem) {
  const ext = item.outputFormat === 'jpeg' ? 'jpg' : item.outputFormat || 'png'
  return `${item.model}-${item.id}.${ext}`
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
  ownedUrls.forEach((url) => URL.revokeObjectURL(url))
  ownedUrls.clear()
})
</script>
