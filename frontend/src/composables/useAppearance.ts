/**
 * Appearance: colour palette, light/dark mode and motion level.
 *
 * State lives at module level (not in a Pinia store) because it has to be applied
 * to <html> before the app mounts. Everything is persisted in localStorage:
 *   theme   'dark' | 'light' | 'system' (absent = dark)      — legacy key, dark by default
 *   palette one of PALETTE_IDS                                — `data-palette` on <html>
 *   motion  'full' | 'reduced'                                — `data-motion` on <html>
 */
import { computed, readonly, ref } from 'vue'

export const PALETTE_IDS = ['noir', 'ember', 'aurora', 'nebula', 'quantum', 'matrix', 'crimson'] as const
export type PaletteId = (typeof PALETTE_IDS)[number]
/** 黑金 — warm near-black with amber gold — is what every new visitor sees */
export const DEFAULT_PALETTE: PaletteId = 'noir'
export type ColorMode = 'dark' | 'light' | 'system'
export type MotionLevel = 'full' | 'reduced'

export interface PaletteMeta {
  id: PaletteId
  /** primary-500, accent-400, dark-900 — what the picker swatch shows */
  swatch: [string, string, string]
  /** the three signal stops (gradient) */
  signal: [string, string, string]
  /** categorical chart series, palette colour first */
  series: string[]
  /** token trend chart lines */
  trend: { input: string; output: string; cacheCreation: string; cacheRead: string; cacheHitRate: string }
}

// Series keep the palette's own colours up front and fill in with the softened
// status hues from tailwind.palette.js, skipping any that would read as the same hue.
export const PALETTES: Record<PaletteId, PaletteMeta> = {
  noir: {
    id: 'noir',
    swatch: ['#E39B16', '#FFD978', '#0E0C09'],
    signal: ['#FFD978', '#F2A93B', '#EA7A33'],
    series: ['#F0B53A', '#63B17F', '#EA7A33', '#5BB2BE', '#8D68D7', '#DE5D94', '#5FB19E', '#E84F45', '#6172D2', '#9BC455', '#4C88D7', '#A864D6'],
    trend: { input: '#F0B53A', output: '#63B17F', cacheCreation: '#EA7A33', cacheRead: '#5BB2BE', cacheHitRate: '#8D68D7' }
  },
  ember: {
    id: 'ember',
    swatch: ['#E85A2C', '#FFB547', '#1B1714'],
    signal: ['#FFB547', '#FF6A3D', '#E5487F'],
    series: ['#E85A2C', '#63B17F', '#F2A026', '#D53629', '#8D68D7', '#DE5D94', '#5FB19E', '#E5487F', '#6172D2', '#9BC455', '#5BB2BE', '#A864D6'],
    trend: { input: '#E85A2C', output: '#63B17F', cacheCreation: '#F2A026', cacheRead: '#5BB2BE', cacheHitRate: '#8D68D7' }
  },
  aurora: {
    id: 'aurora',
    swatch: ['#00A2A9', '#5DE2AF', '#14191B'],
    signal: ['#7CF5D6', '#22D3EE', '#7C9CFF'],
    series: ['#00A2A9', '#5DE2AF', '#8193DF', '#F2A026', '#DE5D94', '#A864D6', '#9BC455', '#E84F45', '#4C88D7', '#F89445', '#C08CE1', '#5BB2BE'],
    trend: { input: '#1ABAC1', output: '#5DE2AF', cacheCreation: '#F2A026', cacheRead: '#8193DF', cacheHitRate: '#DE5D94' }
  },
  nebula: {
    id: 'nebula',
    swatch: ['#966FFA', '#FFA4D8', '#18171C'],
    signal: ['#F5A3FF', '#A98BFF', '#6AA8FF'],
    series: ['#966FFA', '#FFA4D8', '#5BB2BE', '#F2A026', '#63B17F', '#4C88D7', '#E84F45', '#9BC455', '#DF88E1', '#6172D2', '#F89445', '#5FB19E'],
    trend: { input: '#A98EFF', output: '#FFA4D8', cacheCreation: '#F2A026', cacheRead: '#5BB2BE', cacheHitRate: '#63B17F' }
  },
  quantum: {
    id: 'quantum',
    swatch: ['#3E8AFF', '#49D9FD', '#15181C'],
    signal: ['#6EE7FF', '#4D8DFF', '#7C6CFF'],
    series: ['#3E8AFF', '#49D9FD', '#F2A026', '#8D68D7', '#63B17F', '#DE5D94', '#E84F45', '#9BC455', '#5FB19E', '#A864D6', '#F89445', '#6172D2'],
    trend: { input: '#69A4FF', output: '#49D9FD', cacheCreation: '#F2A026', cacheRead: '#8D68D7', cacheHitRate: '#63B17F' }
  },
  matrix: {
    id: 'matrix',
    swatch: ['#16AA59', '#B5D557', '#151917'],
    signal: ['#D4FF6E', '#3DEB9A', '#26D7C4'],
    series: ['#16AA59', '#B5D557', '#4C88D7', '#F2A026', '#8D68D7', '#DE5D94', '#5BB2BE', '#E84F45', '#6172D2', '#F89445', '#A864D6', '#5FB19E'],
    trend: { input: '#51BD76', output: '#B5D557', cacheCreation: '#F2A026', cacheRead: '#5BB2BE', cacheHitRate: '#8D68D7' }
  },
  crimson: {
    id: 'crimson',
    swatch: ['#EE4A68', '#FFB17C', '#1A1717'],
    signal: ['#FFC27A', '#FF5C7A', '#E46BFF'],
    series: ['#EE4A68', '#FFB17C', '#5BB2BE', '#8D68D7', '#63B17F', '#4C88D7', '#F2A026', '#DF88E1', '#9BC455', '#6172D2', '#5FB19E', '#A864D6'],
    trend: { input: '#FE6E82', output: '#5BB2BE', cacheCreation: '#FFB17C', cacheRead: '#8D68D7', cacheHitRate: '#63B17F' }
  }
}

const STORAGE = { mode: 'theme', palette: 'palette', motion: 'motion' } as const

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {
    // storage unavailable (private mode): the choice simply lasts for this visit
  }
}

function isPaletteId(value: unknown): value is PaletteId {
  return typeof value === 'string' && (PALETTE_IDS as readonly string[]).includes(value)
}

const systemDarkQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null
const systemReducedQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null

const paletteRef = ref<PaletteId>(DEFAULT_PALETTE)
const modeRef = ref<ColorMode>('dark')
const motionRef = ref<MotionLevel>('full')
const systemDark = ref(systemDarkQuery?.matches ?? false)
const systemReduced = ref(systemReducedQuery?.matches ?? false)

const isDark = computed(() => (modeRef.value === 'system' ? systemDark.value : modeRef.value === 'dark'))
// Only the in-app setting reduces motion. The OS switch (Windows "animation effects") is off on
// many machines and used to silently strip every effect, which looked like a broken UI.
const reducedMotion = computed(() => motionRef.value === 'reduced')
const paletteMeta = computed(() => PALETTES[paletteRef.value])

function applyToDocument() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', isDark.value)
  root.dataset.palette = paletteRef.value
  root.dataset.motion = reducedMotion.value ? 'reduced' : 'full'
  // keep the browser chrome (mobile address bar) in step with the page
  const color = getComputedStyle(root).getPropertyValue(isDark.value ? '--c-dark-950' : '--c-paper').trim()
  if (color) {
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = `rgb(${color.split(/\s+/).join(',')})`
    })
  }
}

/**
 * Cross-fade the whole page between two appearances instead of letting every
 * surface snap on its own. Uses View Transitions where available.
 */
function withTransition(change: () => void) {
  const doc = typeof document !== 'undefined' ? (document as Document & { startViewTransition?: (cb: () => void) => unknown }) : null
  if (!doc || reducedMotion.value) {
    change()
    return
  }
  if (typeof doc.startViewTransition === 'function') {
    doc.startViewTransition(change)
    return
  }
  const root = doc.documentElement
  root.classList.add('appearance-switching')
  change()
  window.setTimeout(() => root.classList.remove('appearance-switching'), 360)
}

let initialized = false

/** Read the saved appearance and apply it to <html>. Call once before mounting. */
export function initAppearance() {
  if (initialized) return
  initialized = true

  // The console is dark-first: without a saved choice it opens dark, whatever the OS says
  const savedMode = read(STORAGE.mode)
  modeRef.value = savedMode === 'light' || savedMode === 'system' ? savedMode : 'dark'
  const savedPalette = read(STORAGE.palette)
  paletteRef.value = isPaletteId(savedPalette) ? savedPalette : DEFAULT_PALETTE
  motionRef.value = read(STORAGE.motion) === 'reduced' ? 'reduced' : 'full'

  systemDarkQuery?.addEventListener?.('change', (e) => {
    systemDark.value = e.matches
    if (modeRef.value === 'system') withTransition(applyToDocument)
  })
  systemReducedQuery?.addEventListener?.('change', (e) => {
    systemReduced.value = e.matches
    applyToDocument()
  })

  applyToDocument()
}

export function setPalette(id: PaletteId) {
  if (!isPaletteId(id) || id === paletteRef.value) return
  withTransition(() => {
    paletteRef.value = id
    write(STORAGE.palette, id === DEFAULT_PALETTE ? null : id)
    applyToDocument()
  })
}

export function setColorMode(mode: ColorMode) {
  if (mode === modeRef.value) return
  withTransition(() => {
    modeRef.value = mode
    write(STORAGE.mode, mode === 'dark' ? null : mode)
    applyToDocument()
  })
}

export function toggleDark() {
  setColorMode(isDark.value ? 'light' : 'dark')
}

export function setMotion(level: MotionLevel) {
  motionRef.value = level
  write(STORAGE.motion, level === 'full' ? null : level)
  applyToDocument()
}

/** Reactive appearance state and setters for components */
export function useAppearance() {
  return {
    palette: readonly(paletteRef),
    mode: readonly(modeRef),
    motion: readonly(motionRef),
    isDark,
    reducedMotion,
    paletteMeta,
    palettes: PALETTE_IDS.map((id) => PALETTES[id]),
    setPalette,
    setColorMode,
    toggleDark,
    setMotion
  }
}

/**
 * A palette colour as a canvas-friendly `rgb(r, g, b)` string, e.g. paletteColor('dark-700').
 * Falls back to `fallback` when the variable is not available (tests, SSR).
 */
export function paletteColor(token: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(`--c-${token}`).trim()
  const parts = raw.split(/\s+/)
  return parts.length === 3 && parts.every((p) => p !== '') ? `rgb(${parts.join(', ')})` : fallback
}

/** Chart colours for the active palette and mode (reactive — read inside computed) */
export function useChartPalette() {
  return computed(() => {
    const dark = isDark.value
    void paletteRef.value // re-read the CSS variables when the palette changes
    return {
      series: paletteMeta.value.series,
      trend: paletteMeta.value.trend,
      isDark: dark,
      text: dark ? paletteColor('dark-200', '#E9E4DE') : paletteColor('gray-700', '#473F39'),
      grid: dark ? paletteColor('dark-700', '#473F39') : paletteColor('gray-200', '#E9E4DE')
    }
  })
}

/** Whether the operating system asks for reduced motion (shown as a hint; it does not switch motion off) */
export function systemAsksReducedMotion(): boolean {
  return systemReduced.value
}

/** Whether decorative motion (reveals, counting numbers, spotlights) should run */
export function motionAllowed(): boolean {
  return !reducedMotion.value
}
