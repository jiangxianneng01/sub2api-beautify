/**
 * The sign-in page's "AI core": a structured sphere of quantum particles that turns slowly,
 * breathes, leans toward the pointer like a gravity well, can be dragged round, folds into the
 * site's wordmark when clicked and pulses with every keystroke typed into the form.
 *
 * Wide screens put the core on the left with the sign-in card on the right; narrow ones put it
 * behind the card, quieter.
 */
import { QuantumField, coreSphere, pairShapes, sampleText, setCanvasText } from './quantumField'

export interface CoreLayout {
  /** core centre in canvas px (origin top-left) */
  x: number
  y: number
  radius: number
  /** whether the core has its own side of the screen */
  wide: boolean
}

export interface AuthCoreOptions {
  canvas: HTMLCanvasElement
  /** where pointer events are read (the whole page) */
  host: HTMLElement
  /** clicks and drags that start inside this element are the form's, not the core's */
  shield: () => HTMLElement | null
  colors: [string, string, string]
  reducedMotion: boolean
  word: string
  fontFamily: string
  onLayout?: (layout: CoreLayout) => void
}

const WIDE_BREAKPOINT = 1080

export class AuthCore {
  readonly field: QuantumField
  private layout: CoreLayout = { x: 0, y: 0, radius: 100, wide: false }
  private drag: { x: number; y: number; moved: boolean; id: number } | null = null
  private foldTimer = 0
  private lastKeyPulse = 0
  private word: string

  constructor(private opts: AuthCoreOptions) {
    this.word = opts.word
    this.field = new QuantumField({
      canvas: opts.canvas,
      colors: opts.colors,
      reducedMotion: opts.reducedMotion,
      pointerMode: 'attract',
      pointerRadius: 170,
      intensity: 1.15,
      whiteMix: 0.32
    })
    this.field.setAutoSpin(0.16)
    this.field.setBreath(0.035)
    opts.host.addEventListener('pointermove', this.onMove, { passive: true })
    opts.host.addEventListener('pointerleave', this.onLeave)
    opts.host.addEventListener('pointerdown', this.onDown)
    window.addEventListener('pointerup', this.onUp)
    opts.host.addEventListener('input', this.onType, true)
  }

  /** Lay out for the host's current size and (re)build the particles */
  build(intro: boolean) {
    const rect = this.opts.host.getBoundingClientRect()
    const W = Math.max(1, Math.round(rect.width))
    const H = Math.max(1, Math.round(window.innerHeight))
    this.field.resize(W, H)
    const wide = W >= WIDE_BREAKPOINT
    const radius = wide ? Math.min(H * 0.27, W * 0.17) : Math.min(W, H) * 0.36
    const x = wide ? W * 0.3 : W / 2
    // on a phone the card fills the middle, so the core rises to show above it
    const y = wide ? H * 0.44 : H * 0.2
    this.layout = { x, y, radius, wide }
    this.opts.onLayout?.(this.layout)

    const count = Math.round(wide ? 12000 : 7000)
    const parts = coreSphere(Math.round(count * 0.86), radius)
    const sphere = parts.points
    // a thin field of stars around the core: part of both shapes, so it stays put while the core folds
    const starCount = count - sphere.length / 3
    const stars: number[] = []
    for (let i = 0; i < starCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = radius * (1.6 + Math.pow(Math.random(), 0.7) * 3.2)
      stars.push(Math.cos(a) * r, Math.sin(a) * r * 0.62, (Math.random() - 0.5) * radius * 2)
    }
    const a = sphere.concat(stars)

    // shape B: the word, centred on the core, with the stars where they were
    const fontSize = Math.round(radius * (this.word.length > 6 ? 0.42 : 0.62))
    const font = `800 ${fontSize}px ${this.opts.fontFamily}`
    const probe = document.createElement('canvas').getContext('2d')
    let textWidth = fontSize * this.word.length * 0.6
    if (probe) {
      probe.font = font
      setCanvasText(probe, 'expanded', -fontSize * 0.03)
      textWidth = probe.measureText(this.word).width
    }
    const glyphs = sampleText(
      [{ text: this.word, font, stretch: 'expanded', x: x - textWidth / 2, y: y + fontSize * 0.36, letterSpacing: -fontSize * 0.03, step: Math.max(1.3, fontSize / 70), size: 2 }],
      W,
      H
    )
    const sphereCount = sphere.length / 3
    const b: number[] = []
    const glyphCount = glyphs.xyz.length / 3
    for (let i = 0; i < sphereCount; i++) {
      const k = glyphCount ? (i < glyphCount ? i : Math.floor(Math.random() * glyphCount)) : 0
      b.push(
        (glyphs.xyz[k * 3] ?? 0) + (i >= glyphCount ? (Math.random() - 0.5) * 2.5 : 0),
        (glyphs.xyz[k * 3 + 1] ?? 0) + (i >= glyphCount ? (Math.random() - 0.5) * 2.5 : 0),
        (glyphs.xyz[k * 3 + 2] ?? 0) * 3
      )
    }
    // stars: shape B in absolute coordinates, at the same place shape A puts them
    const cx = x - W / 2
    const cy = H / 2 - y
    for (let i = 0; i < starCount; i++) b.push(stars[i * 3] + cx, stars[i * 3 + 1] + cy, stars[i * 3 + 2])

    const shellEnd = parts.shell
    const innerEnd = shellEnd + parts.inner
    const nucleusEnd = innerEnd + parts.nucleus
    this.field.setShapes(
      pairShapes(count, a, b, {
        size: (i) => {
          if (i < shellEnd) return 1.7 + Math.random() * 1.9
          if (i < innerEnd) return 1.2 + Math.random() * 1.2
          if (i < nucleusEnd) return 2.4 + Math.random() * 3.2
          if (i < sphereCount) return 1.3 + Math.random() * 1.6
          return 0.8 + Math.random() * 1.3
        },
        // gold at the top shading to ember at the bottom; a near-white nucleus; rings run the gradient
        tone: (i) => {
          if (i >= innerEnd && i < nucleusEnd) return Math.random() * 0.12
          if (i >= nucleusEnd && i < sphereCount) return Math.random()
          if (i < sphereCount) return Math.min(1, Math.max(0, 0.5 - a[i * 3 + 1] / (radius * 2.2) + (Math.random() - 0.5) * 0.2))
          return Math.random()
        }
      })
    )
    this.field.setOffsetA(cx, cy, 0)
    this.field.setFocal(radius * 4.2)
    this.field.setDepthFade(0.75 / radius)
    this.field.setIntensity(wide ? 1.35 : 0.9)
    this.field.setPointerRadius(wide ? 170 : 120)
    if (intro && !this.opts.reducedMotion) {
      // fold in from the word: the page opens on the name, which then becomes the core
      this.field.setMorph(1)
      window.setTimeout(() => this.field.morphTo(0, 0.42), 900)
    } else {
      this.field.setMorph(0)
    }
  }

  setWord(word: string) {
    this.word = word
  }

  get currentLayout() {
    return this.layout
  }

  start() {
    this.field.start()
  }

  stop() {
    this.field.stop()
  }

  dispose() {
    window.clearTimeout(this.foldTimer)
    const h = this.opts.host
    h.removeEventListener('pointermove', this.onMove)
    h.removeEventListener('pointerleave', this.onLeave)
    h.removeEventListener('pointerdown', this.onDown)
    window.removeEventListener('pointerup', this.onUp)
    h.removeEventListener('input', this.onType, true)
    this.field.dispose()
  }

  /** Fold the core into the word for a moment, with a shock ring from the click */
  reshape(x: number, y: number) {
    this.field.pulse(x, y, 1.3)
    this.field.morphTo(1, 0.9)
    window.clearTimeout(this.foldTimer)
    this.foldTimer = window.setTimeout(() => this.field.morphTo(0, 0.5), 3200)
  }

  private local(e: PointerEvent) {
    const r = this.opts.canvas.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  private inShield(e: Event) {
    const shield = this.opts.shield()
    return !!shield && e.target instanceof Node && shield.contains(e.target)
  }

  private onMove = (e: PointerEvent) => {
    const p = this.local(e)
    this.field.pointerMove(p.x, p.y)
    if (this.drag && e.pointerId === this.drag.id) {
      const dx = p.x - this.drag.x
      const dy = p.y - this.drag.y
      if (Math.abs(dx) + Math.abs(dy) > 4) this.drag.moved = true
      if (this.drag.moved) this.field.spinBy(dx, dy)
      this.drag.x = p.x
      this.drag.y = p.y
    }
  }

  private onLeave = () => {
    this.field.pointerLeave()
  }

  private onDown = (e: PointerEvent) => {
    if (this.inShield(e) || e.button > 0) return
    const p = this.local(e)
    this.drag = { x: p.x, y: p.y, moved: false, id: e.pointerId }
  }

  private onUp = (e: PointerEvent) => {
    const d = this.drag
    this.drag = null
    if (!d || d.id !== e.pointerId || d.moved) return
    const p = this.local(e)
    this.reshape(p.x, p.y)
  }

  /** Every keystroke in the form sends a small pulse out of the core */
  private onType = (e: Event) => {
    if (!this.inShield(e)) return
    const now = performance.now()
    if (now - this.lastKeyPulse < 70) return
    this.lastKeyPulse = now
    this.field.pulse(this.layout.x, this.layout.y, 0.32)
  }
}
