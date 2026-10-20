<template>
  <!--
    The site name drawn in quantum particles, in the logo's manner: glyphs of gold-white light,
    a tilted orbit with its electrons, a little drifting dust. The real <h1> stays in the page
    (transparent) for layout, selection and screen readers.
    Moving the pointer pushes the particles aside; a click sends a shock ring through them.
  -->
  <canvas ref="canvasRef" class="hero-quantum" :class="{ 'is-waiting': !assembling }" :style="regionStyle" aria-hidden="true"></canvas>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAppearance } from '@/composables/useAppearance'
import { QuantumField, quantumSupported } from '@/lib/quantum/quantumField'
import { buildHeroTitle, waitForTitleFont, type HeroTitleRegion, type HeroTitleTarget } from '@/lib/quantum/heroTitle'

const props = defineProps<{
  /** the hero section: the canvas covers it and pointer events are read from it */
  hero: HTMLElement | null
  titleEl: HTMLElement | null
  title: string
  /** false while the page content covers the hero: nothing is drawn then */
  active?: boolean
  /**
   * When the letters may start gathering. The particles are built ahead, hidden, so the page can
   * hold on the galaxy until everything has loaded and then show the whole assembly from the start.
   * Left out, they gather as soon as they are built.
   */
  go?: boolean
}>()

const emit = defineEmits<{ (e: 'ready', on: boolean): void }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { paletteMeta, reducedMotion } = useAppearance()

// the canvas covers only the title's neighbourhood, not the whole hero
const region = ref<HeroTitleRegion | null>(null)
const regionStyle = computed(() => {
  const r = region.value
  if (!r) return { visibility: 'hidden' as const }
  return { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` }
})

let field: QuantumField | null = null
let resizeObserver: ResizeObserver | null = null
let visibility: IntersectionObserver | null = null
let onScreen = true
let built = false
let rebuildTimer = 0
let dipUntil = 0
let disposed = false
const assembling = ref(false)

function target(): HeroTitleTarget | null {
  if (!props.hero || !props.titleEl) return null
  return { hero: props.hero, titleEl: props.titleEl, title: props.title }
}

async function build(intro: boolean) {
  const tgt = target()
  if (!tgt || !field) return
  await waitForTitleFont(tgt)
  if (!field) return
  region.value = buildHeroTitle(field, tgt, { intro, reducedMotion: reducedMotion.value })
  // until the page says go, the particles wait scattered (and unseen) in the nebula
  if (!assembling.value) field.setMorph(0)
  built = true
  emit('ready', true)
}

function localPoint(e: PointerEvent) {
  const rect = canvasRef.value?.getBoundingClientRect()
  return rect ? { x: e.clientX - rect.left, y: e.clientY - rect.top } : null
}

function onPointerMove(e: PointerEvent) {
  const p = localPoint(e)
  if (p) field?.pointerMove(p.x, p.y)
}

function onPointerLeave() {
  field?.pointerLeave()
}

function onPointerDown(e: PointerEvent) {
  const p = localPoint(e)
  if (!p || !field) return
  field.pulse(p.x, p.y, 1.15)
  // the letters loosen for a moment, then gather again
  if (!reducedMotion.value && field.morphValue > 0.95) {
    field.morphTo(0.86, 1.6)
    dipUntil = performance.now() + 260
  }
}

function syncRunning() {
  if (!field || !built) return
  if (assembling.value && onScreen && props.active !== false && document.visibilityState === 'visible') field.start()
  else field.stop()
}

/** The letters gather out of the nebula */
function assemble() {
  if (!field || !built || assembling.value) return
  assembling.value = true
  if (reducedMotion.value) {
    field.setMorph(1)
  } else {
    field.setMorph(0)
    field.morphTo(1, 1.05)
  }
  syncRunning()
}

/** Start right after the first painted frame — the text is on screen meanwhile, no blank wait */
function afterFirstFrame(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame !== 'function') return resolve()
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

function scheduleRebuild() {
  window.clearTimeout(rebuildTimer)
  rebuildTimer = window.setTimeout(() => void build(false), 180)
}

onMounted(async () => {
  // the parent's element refs arrive with its next render
  await nextTick()
  await afterFirstFrame()
  if (disposed) return
  const canvas = canvasRef.value
  if (!canvas || !quantumSupported()) {
    emit('ready', false)
    return
  }
  const sig = paletteMeta.value.signal
  try {
    field = new QuantumField({
      canvas,
      colors: [sig[0], sig[1], sig[2]],
      reducedMotion: reducedMotion.value,
      pointerMode: 'repel',
      pointerRadius: 96,
      intensity: 1.25,
      whiteMix: 0.5
    })
  } catch (err) {
    console.warn('[HeroQuantumTitle] WebGL unavailable', err)
    field = null
    emit('ready', false)
    return
  }
  field.onFrame = () => {
    if (dipUntil && performance.now() > dipUntil) {
      dipUntil = 0
      field?.morphTo(1, 0.9)
    }
  }
  await build(false)
  // left the page while the font loaded: attach nothing to a hero that is gone
  if (disposed || !field) return
  if (props.go !== false) assemble()
  syncRunning()

  const hero = props.hero
  hero?.addEventListener('pointermove', onPointerMove, { passive: true })
  hero?.addEventListener('pointerleave', onPointerLeave)
  hero?.addEventListener('pointerdown', onPointerDown, { passive: true })
  document.addEventListener('visibilitychange', syncRunning)
  if (hero && typeof ResizeObserver !== 'undefined') {
    let first = true
    resizeObserver = new ResizeObserver(() => {
      if (first) {
        first = false
        return
      }
      scheduleRebuild()
    })
    resizeObserver.observe(hero)
  }
  if (hero && typeof IntersectionObserver !== 'undefined') {
    visibility = new IntersectionObserver((entries) => {
      onScreen = entries.some((e) => e.isIntersecting)
      syncRunning()
    })
    visibility.observe(hero)
  }
})

watch(
  () => paletteMeta.value.id,
  () => {
    const sig = paletteMeta.value.signal
    field?.setColors([sig[0], sig[1], sig[2]])
  }
)

watch(reducedMotion, (r) => field?.setReducedMotion(r))

watch(
  () => props.active,
  () => syncRunning()
)

watch(
  () => props.go,
  (go) => {
    if (go !== false) assemble()
  }
)

watch(
  () => props.title,
  () => {
    if (built) scheduleRebuild()
  }
)

onBeforeUnmount(() => {
  disposed = true
  window.clearTimeout(rebuildTimer)
  const hero = props.hero
  hero?.removeEventListener('pointermove', onPointerMove)
  hero?.removeEventListener('pointerleave', onPointerLeave)
  hero?.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('visibilitychange', syncRunning)
  resizeObserver?.disconnect()
  visibility?.disconnect()
  field?.dispose()
  field = null
})
</script>

<style scoped>
.hero-quantum {
  position: absolute;
  z-index: 2;
  pointer-events: none;
}

.hero-quantum.is-waiting {
  visibility: hidden;
}
</style>
