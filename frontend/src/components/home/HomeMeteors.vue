<template>
  <!--
    Meteors over the solar system. A few cross the sky on their own; sweeping the pointer fast
    throws meteors along the sweep, and a click calls one down onto that spot, where it flares.
    Drawn on a 2D canvas above the planets and below the title; it never takes pointer events.
  -->
  <canvas ref="canvasRef" class="home-meteors" aria-hidden="true"></canvas>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAppearance } from '@/composables/useAppearance'

const props = defineProps<{
  /** where pointer events are read from */
  hero: HTMLElement | null
  /** false while the page covers the hero: nothing is drawn */
  active?: boolean
}>()

const { paletteMeta, reducedMotion } = useAppearance()
const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  /** seconds lived / seconds to live */
  age: number
  life: number
  width: number
  tail: number
  color: string
  /** a called-down meteor flares where it lands */
  impact?: { x: number; y: number }
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  age: number
  life: number
  size: number
  color: string
}

interface Flare {
  x: number
  y: number
  age: number
  color: string
}

const MAX_METEORS = 28
const MAX_SPARKS = 260
let ctx: CanvasRenderingContext2D | null = null
let W = 0
let H = 0
let dpr = 1
let raf = 0
let last = 0
let nextAmbient = 0
let meteors: Meteor[] = []
let sparks: Spark[] = []
let flares: Flare[] = []
let pointer: { x: number; y: number; t: number } | null = null
let lastThrow = 0
let onScreen = true
let resizeObserver: ResizeObserver | null = null
let visibility: IntersectionObserver | null = null

function colors(): string[] {
  const s = paletteMeta.value.signal
  return [s[0], s[1], s[2], '#ffffff']
}

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

function rgba(hex: string, a: number) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}

function spawn(m: Omit<Meteor, 'age'>) {
  if (meteors.length >= MAX_METEORS) meteors.shift()
  meteors.push({ ...m, age: 0 })
}

/** One crossing the sky from the upper edge, down and to one side */
function ambient() {
  const fromLeft = Math.random() < 0.5
  const speed = 520 + Math.random() * 420
  const angle = (fromLeft ? 0.42 : Math.PI - 0.42) + (Math.random() - 0.5) * 0.3
  spawn({
    x: fromLeft ? Math.random() * W * 0.6 : W * 0.4 + Math.random() * W * 0.6,
    y: -20 + Math.random() * H * 0.25,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1.1 + Math.random() * 0.8,
    width: 1.2 + Math.random() * 1.2,
    tail: 120 + Math.random() * 120,
    color: pick(colors())
  })
}

/** A fast sweep throws meteors along it */
function throwAlong(x: number, y: number, dx: number, dy: number, speed: number) {
  const now = performance.now()
  if (now - lastThrow < 70) return
  lastThrow = now
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const count = speed > 3.2 ? 2 : 1
  for (let i = 0; i < count; i++) {
    const v = Math.min(1500, 480 + speed * 260) * (0.85 + Math.random() * 0.3)
    const spread = (Math.random() - 0.5) * 0.35
    const cs = Math.cos(spread)
    const sn = Math.sin(spread)
    spawn({
      x: x + (Math.random() - 0.5) * 24,
      y: y + (Math.random() - 0.5) * 24,
      vx: (ux * cs - uy * sn) * v,
      vy: (ux * sn + uy * cs) * v,
      life: 0.7 + Math.random() * 0.5,
      width: 1.8 + Math.min(2.6, speed * 0.4),
      tail: Math.min(260, 80 + speed * 40),
      color: pick(colors())
    })
  }
}

/** Call one down onto a point: it arrives from the upper sky and flares on impact */
function callDown(x: number, y: number) {
  const angle = (x < W / 2 ? 0.55 : Math.PI - 0.55) + (Math.random() - 0.5) * 0.25
  const dist = Math.max(W, H) * 0.55
  const time = 0.55
  const sx = x - Math.cos(angle) * dist
  const sy = y - Math.sin(angle) * dist
  spawn({
    x: sx,
    y: sy,
    vx: (x - sx) / time,
    vy: (y - sy) / time,
    life: time,
    width: 2.6,
    tail: 240,
    color: colors()[0],
    impact: { x, y }
  })
}

function burst(x: number, y: number, color: string) {
  flares.push({ x, y, age: 0, color })
  for (let i = 0; i < 34; i++) {
    if (sparks.length >= MAX_SPARKS) sparks.shift()
    const a = Math.random() * Math.PI * 2
    const v = 60 + Math.random() * 260
    sparks.push({
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v - 40,
      age: 0,
      life: 0.5 + Math.random() * 0.7,
      size: 0.8 + Math.random() * 1.8,
      color: Math.random() < 0.5 ? color : pick(colors())
    })
  }
}

function step(dt: number) {
  // meteors fly, shed sparks, and leave the sky
  for (const m of meteors) {
    m.age += dt
    m.x += m.vx * dt
    m.y += m.vy * dt
    if (Math.random() < 0.55 && sparks.length < MAX_SPARKS) {
      sparks.push({
        x: m.x,
        y: m.y,
        vx: m.vx * 0.04 + (Math.random() - 0.5) * 30,
        vy: m.vy * 0.04 + (Math.random() - 0.5) * 30,
        age: 0,
        life: 0.35 + Math.random() * 0.4,
        size: 0.6 + Math.random() * 1.2,
        color: m.color
      })
    }
  }
  const landed = meteors.filter((m) => m.impact && m.age >= m.life)
  for (const m of landed) burst(m.impact!.x, m.impact!.y, m.color)
  meteors = meteors.filter((m) => m.age < m.life && m.x > -400 && m.x < W + 400 && m.y < H + 400)
  for (const s of sparks) {
    s.age += dt
    s.x += s.vx * dt
    s.y += s.vy * dt
    s.vx *= 0.96
    s.vy = s.vy * 0.96 + 30 * dt
  }
  sparks = sparks.filter((s) => s.age < s.life)
  for (const f of flares) f.age += dt
  flares = flares.filter((f) => f.age < 0.9)
}

function draw() {
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, W, H)
  ctx.globalCompositeOperation = 'lighter'
  ctx.lineCap = 'round'
  for (const m of meteors) {
    const fade = Math.min(1, m.age / 0.12) * (m.impact ? 1 : Math.min(1, (m.life - m.age) / 0.35))
    const speed = Math.hypot(m.vx, m.vy) || 1
    const tx = m.x - (m.vx / speed) * m.tail
    const ty = m.y - (m.vy / speed) * m.tail
    const g = ctx.createLinearGradient(m.x, m.y, tx, ty)
    g.addColorStop(0, rgba('#ffffff', 0.95 * fade))
    g.addColorStop(0.12, rgba(m.color, 0.8 * fade))
    g.addColorStop(1, rgba(m.color, 0))
    ctx.strokeStyle = g
    ctx.lineWidth = m.width
    ctx.beginPath()
    ctx.moveTo(m.x, m.y)
    ctx.lineTo(tx, ty)
    ctx.stroke()
    // the glowing head
    const r = m.width * 3.2
    const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, r)
    hg.addColorStop(0, rgba('#ffffff', fade))
    hg.addColorStop(0.4, rgba(m.color, 0.6 * fade))
    hg.addColorStop(1, rgba(m.color, 0))
    ctx.fillStyle = hg
    ctx.beginPath()
    ctx.arc(m.x, m.y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  for (const s of sparks) {
    const a = 1 - s.age / s.life
    ctx.fillStyle = rgba(s.color, a * 0.9)
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.size * (0.5 + a * 0.5), 0, Math.PI * 2)
    ctx.fill()
  }
  for (const f of flares) {
    const k = f.age / 0.9
    const r = 10 + k * 90
    const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r)
    fg.addColorStop(0, rgba('#ffffff', 0.85 * (1 - k)))
    fg.addColorStop(0.25, rgba(f.color, 0.5 * (1 - k)))
    fg.addColorStop(1, rgba(f.color, 0))
    ctx.fillStyle = fg
    ctx.beginPath()
    ctx.arc(f.x, f.y, r, 0, Math.PI * 2)
    ctx.fill()
    // the shock ring
    ctx.strokeStyle = rgba(f.color, 0.55 * (1 - k))
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(f.x, f.y, 6 + k * 120, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.globalCompositeOperation = 'source-over'
}

function frame(now: number) {
  const dt = Math.min(0.05, (now - (last || now)) / 1000)
  last = now
  if (now > nextAmbient) {
    ambient()
    nextAmbient = now + 2600 + Math.random() * 3800
  }
  step(dt)
  draw()
  raf = requestAnimationFrame(frame)
}

function running() {
  return !!ctx && onScreen && props.active !== false && !reducedMotion.value && document.visibilityState === 'visible'
}

function sync() {
  if (running()) {
    if (!raf && typeof requestAnimationFrame === 'function') {
      last = 0
      nextAmbient = performance.now() + 900
      raf = requestAnimationFrame(frame)
    }
  } else if (raf) {
    cancelAnimationFrame(raf)
    raf = 0
    meteors = []
    sparks = []
    flares = []
    ctx?.clearRect(0, 0, W * dpr, H * dpr)
  }
}

function resize() {
  const canvas = canvasRef.value
  const hero = props.hero
  if (!canvas || !hero) return
  const rect = hero.getBoundingClientRect()
  W = Math.max(1, Math.round(rect.width))
  H = Math.max(1, Math.round(rect.height))
  dpr = Math.min(1.5, window.devicePixelRatio || 1)
  canvas.width = Math.round(W * dpr)
  canvas.height = Math.round(H * dpr)
}

function local(e: PointerEvent) {
  const rect = canvasRef.value?.getBoundingClientRect()
  return rect ? { x: e.clientX - rect.left, y: e.clientY - rect.top } : null
}

function onMove(e: PointerEvent) {
  if (!raf) return
  const p = local(e)
  if (!p) return
  const now = performance.now()
  if (pointer) {
    const dt = Math.max(1, now - pointer.t)
    const dx = p.x - pointer.x
    const dy = p.y - pointer.y
    // px per ms
    const speed = Math.hypot(dx, dy) / dt
    if (speed > 1.6) throwAlong(p.x, p.y, dx, dy, speed)
  }
  pointer = { x: p.x, y: p.y, t: now }
}

function onLeave() {
  pointer = null
}

let down: { x: number; y: number } | null = null
function onDown(e: PointerEvent) {
  if (e.button > 0) return
  down = local(e)
}

function onUp(e: PointerEvent) {
  const p = local(e)
  const d = down
  down = null
  if (!raf || !p || !d) return
  // a click, not the end of a drag that turned the planets
  if (Math.hypot(p.x - d.x, p.y - d.y) < 6) callDown(p.x, p.y)
}

let attached: HTMLElement | null = null
let disposed = false
function attach() {
  const canvas = canvasRef.value
  const hero = props.hero
  if (disposed || attached || !canvas || !hero) return
  attached = hero
  ctx = canvas.getContext('2d')
  if (!ctx) return
  resize()
  hero.addEventListener('pointermove', onMove, { passive: true })
  hero.addEventListener('pointerleave', onLeave)
  hero.addEventListener('pointerdown', onDown, { passive: true })
  hero.addEventListener('pointerup', onUp, { passive: true })
  document.addEventListener('visibilitychange', sync)
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(hero)
  }
  if (typeof IntersectionObserver !== 'undefined') {
    visibility = new IntersectionObserver((entries) => {
      onScreen = entries.some((en) => en.isIntersecting)
      sync()
    })
    visibility.observe(hero)
  }
  sync()
}

onMounted(async () => {
  // the parent's element refs arrive with its next render
  await nextTick()
  attach()
})

watch(() => props.hero, () => attach())
watch(() => props.active, sync)
watch(reducedMotion, sync)

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
  disposed = true
  const hero = attached
  hero?.removeEventListener('pointermove', onMove)
  hero?.removeEventListener('pointerleave', onLeave)
  hero?.removeEventListener('pointerdown', onDown)
  hero?.removeEventListener('pointerup', onUp)
  document.removeEventListener('visibilitychange', sync)
  resizeObserver?.disconnect()
  visibility?.disconnect()
  ctx = null
})
</script>

<style scoped>
.home-meteors {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
