<template>
  <!--
    The sign-in page's backdrop: an "AI core" of quantum particles (see lib/quantum/authCore).
    Wide screens give it the left half with a caption under it; on phones it glows behind the card.
  -->
  <div class="aq" aria-hidden="true">
    <canvas ref="canvasRef" class="aq-canvas"></canvas>
    <div class="aq-glow" :style="glowStyle"></div>
    <div v-if="layout?.wide" class="aq-caption" :style="captionStyle">
      <p class="aq-tagline">{{ t('auth.quantum.tagline') }}</p>
      <p class="aq-hint">{{ t('auth.quantum.hint') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppearance } from '@/composables/useAppearance'
import { quantumSupported } from '@/lib/quantum/quantumField'
import { AuthCore, type CoreLayout } from '@/lib/quantum/authCore'

const props = defineProps<{
  /** the page whose pointer events drive the core */
  host: HTMLElement | null
  /** the sign-in card: clicks and drags inside it belong to the form */
  shield: HTMLElement | null
  /** the word the core folds into */
  word: string
}>()

const emit = defineEmits<{ (e: 'ready', on: boolean): void }>()

const { t } = useI18n()
const { paletteMeta, reducedMotion } = useAppearance()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const layout = shallowRef<CoreLayout | null>(null)

let core: AuthCore | null = null
let resizeTimer = 0
// the dialog can close while fonts are still loading: nothing may start after that
let disposed = false

const captionStyle = computed(() => {
  const l = layout.value
  if (!l) return {}
  // below the orbit rings, which reach about 1.5 radii out
  return { left: `${l.x}px`, top: `${l.y + l.radius * 1.62}px` }
})

const glowStyle = computed(() => {
  const l = layout.value
  if (!l) return { opacity: '0' }
  const r = l.radius * 2.6
  return { left: `${l.x - r}px`, top: `${l.y - r}px`, width: `${r * 2}px`, height: `${r * 2}px` }
})

function syncRunning() {
  if (!core) return
  if (document.visibilityState === 'visible') core.start()
  else core.stop()
}

function onResize() {
  window.clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(() => core?.build(false), 160)
}

onMounted(async () => {
  await nextTick()
  if (disposed) return
  const canvas = canvasRef.value
  if (!canvas || !props.host || !quantumSupported()) {
    emit('ready', false)
    return
  }
  const sig = paletteMeta.value.signal
  try {
    core = new AuthCore({
      canvas,
      host: props.host,
      shield: () => props.shield,
      colors: [sig[0], sig[1], sig[2]],
      reducedMotion: reducedMotion.value,
      word: props.word,
      fontFamily: getComputedStyle(document.body).fontFamily || 'system-ui, sans-serif',
      onLayout: (l) => (layout.value = l)
    })
  } catch (err) {
    console.warn('[AuthQuantumBackdrop] WebGL unavailable', err)
    core = null
    emit('ready', false)
    return
  }
  try {
    await Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 1000))])
  } catch {
    // build with the fallback face
  }
  if (disposed || !core) return
  core.build(true)
  syncRunning()
  emit('ready', true)
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', syncRunning)
})

watch(
  () => paletteMeta.value.id,
  () => {
    const sig = paletteMeta.value.signal
    core?.field.setColors([sig[0], sig[1], sig[2]])
  }
)

watch(reducedMotion, (r) => core?.field.setReducedMotion(r))

watch(
  () => props.word,
  (w) => {
    if (!core) return
    core.setWord(w)
    core.build(false)
  }
)

onBeforeUnmount(() => {
  disposed = true
  window.clearTimeout(resizeTimer)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('visibilitychange', syncRunning)
  core?.dispose()
  core = null
})
</script>

<style scoped>
.aq {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background:
    radial-gradient(90% 60% at 30% 110%, rgb(var(--signal-c) / 0.12), transparent 70%),
    #000;
}

.aq-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* the core's light on the dark: a warm bloom under the particles */
.aq-glow {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  background: radial-gradient(closest-side, rgb(var(--signal-b) / 0.2), rgb(var(--signal-c) / 0.07) 45%, transparent 72%);
  filter: blur(8px);
  transition: opacity 1s;
}

.aq-caption {
  position: absolute;
  width: 26rem;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
  animation: aq-caption-in 1.2s 1.2s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.aq-tagline {
  font-size: 1.35rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  background: linear-gradient(90deg, #fff4ec, rgb(var(--signal-a)) 55%, rgb(var(--signal-c)));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.aq-hint {
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: rgb(255 244 236 / 0.45);
}

@keyframes aq-caption-in {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
}

html[data-motion='reduced'] .aq-caption {
    animation: none;
  }

</style>
