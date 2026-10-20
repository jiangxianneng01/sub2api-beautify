/**
 * The home page's particle title: lays the site name out exactly where the (now transparent)
 * <h1> sits, samples its glyphs into particles, and adds the logo's orbit with its electrons and
 * a little dust. Shape A is a nebula the letters assemble from. The subtitle stays real text —
 * at its size particles would not read.
 */
import { nebula, pairShapes, sampleText, setCanvasText, type QuantumField, type TextLine } from './quantumField'

interface ElementFont {
  size: number
  lineHeight: number
  letterSpacing: number
  font: string
  stretch: string
}

export function elementFont(el: HTMLElement): ElementFont {
  const cs = getComputedStyle(el)
  const size = parseFloat(cs.fontSize) || 16
  const lineHeight = parseFloat(cs.lineHeight) || size * 1.2
  const letterSpacing = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing) || 0
  // canvas takes no percentage stretch in the shorthand; the closest keyword is set separately
  const font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`
  const pct = parseFloat(cs.fontStretch)
  const stretch = !Number.isFinite(pct) ? 'normal' : pct >= 118 ? 'expanded' : pct >= 108 ? 'semi-expanded' : 'normal'
  return { size, lineHeight, letterSpacing, font, stretch }
}

/** The lines an element shows its text in, by measuring words into its width */
function layoutLines(el: HTMLElement, text: string, origin: DOMRect, step: number, size: number, tone: number): TextLine[] {
  const rect = el.getBoundingClientRect()
  const f = elementFont(el)
  const measure = document.createElement('canvas').getContext('2d')
  if (!measure) return []
  measure.font = f.font
  setCanvasText(measure, f.stretch, f.letterSpacing)
  const lines: string[] = []
  let current = ''
  for (const w of text.split(/(\s+)/)) {
    const next = current + w
    if (current.trim() && measure.measureText(next.trimEnd()).width > rect.width + 2) {
      lines.push(current.trimEnd())
      current = w.trimStart()
    } else {
      current = next
    }
  }
  if (current.trim()) lines.push(current.trimEnd())
  const m = measure.measureText('Hg')
  const ascent = m.fontBoundingBoxAscent || f.size * 0.8
  const descent = m.fontBoundingBoxDescent || f.size * 0.2
  const top = rect.top - origin.top
  const left = rect.left - origin.left
  return lines.map((line, i) => ({
    text: line,
    font: f.font,
    stretch: f.stretch,
    x: left,
    // CSS centres the font's content box inside each line box
    y: top + i * f.lineHeight + (f.lineHeight - (ascent + descent)) / 2 + ascent,
    letterSpacing: f.letterSpacing,
    step,
    size,
    tone
  }))
}

export interface HeroTitleTarget {
  hero: HTMLElement
  titleEl: HTMLElement
  title: string
}

/** Wait (briefly) for the title's face so the glyphs are sampled in it */
export async function waitForTitleFont(target: HeroTitleTarget): Promise<void> {
  try {
    const f = elementFont(target.titleEl)
    await Promise.race([document.fonts?.load(f.font, target.title), new Promise((r) => setTimeout(r, 500))])
  } catch {
    // sample with whatever face is there
  }
}

/** Where the particle canvas sits inside the hero, in px */
export interface HeroTitleRegion {
  left: number
  top: number
  width: number
  height: number
}

/**
 * Build the particles for the current layout. `intro` assembles them from the nebula.
 * The canvas only needs to cover the title and the room its orbit, dust and the assembling
 * nebula take — not the whole hero — which keeps the per-frame fill cost small. Returns that
 * region so the caller can place the canvas.
 */
export function buildHeroTitle(field: QuantumField, target: HeroTitleTarget, opts: { intro: boolean; reducedMotion: boolean }): HeroTitleRegion {
  const hero = target.hero.getBoundingClientRect()
  const tr = target.titleEl.getBoundingClientRect()
  const tf = elementFont(target.titleEl)
  // the title box relative to the hero, padded for the orbit, the dust and the nebula
  const padX = Math.max(240, tr.width * 0.7)
  const padTop = Math.max(220, tr.height * 1.9)
  const padBottom = Math.max(90, tr.height * 0.8)
  const left = Math.max(0, Math.floor(tr.left - hero.left - padX * 0.6))
  const top = Math.max(0, Math.floor(tr.top - hero.top - padTop))
  const right = Math.min(hero.width, Math.ceil(tr.right - hero.left + padX))
  const bottom = Math.min(hero.height, Math.ceil(tr.bottom - hero.top + padBottom))
  const region: HeroTitleRegion = { left, top, width: Math.max(1, right - left), height: Math.max(1, bottom - top) }
  const W = region.width
  const H = region.height
  field.resize(W, H)
  // a rect in viewport coordinates for the region, so text is laid out relative to it
  const box = new DOMRect(hero.left + left, hero.top + top, W, H)

  const lines: TextLine[] = layoutLines(target.titleEl, target.title, box, Math.max(1.2, tf.size / 85), Math.min(4.6, Math.max(2.2, tf.size / 30)), 0)
  const glyph = { xyz: [] as number[], size: [] as number[], tone: [] as number[] }
  for (const line of lines) {
    const s = sampleText([line], W, H)
    for (let i = 0; i < s.xyz.length; i++) glyph.xyz.push(s.xyz[i])
    for (let i = 0; i < s.size.length; i++) {
      glyph.size.push(s.size[i])
      glyph.tone.push(s.tone[i])
    }
  }

  const t = target.titleEl.getBoundingClientRect()
  const cx = t.left - box.left + t.width / 2 - W / 2
  const cy = H / 2 - (t.top - box.top + t.height / 2)
  const glyphCount = glyph.xyz.length / 3
  const orbitCount = Math.round(Math.min(1600, Math.max(600, t.width * 2.2)))
  const electrons = 3
  const dustCount = Math.round(Math.min(450, W * 0.4))
  const count = glyphCount + orbitCount + electrons + dustCount
  const orbitEnd = glyphCount + orbitCount

  // shape B: glyphs, then orbit slots (base angle, radial wobble, z), then dust
  const b: number[] = glyph.xyz.slice()
  for (let i = 0; i < orbitCount + electrons; i++) {
    const electron = i >= orbitCount
    b.push(electron ? (i - orbitCount) * 2.1 : Math.random() * Math.PI * 2, electron ? 0 : (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 8)
  }
  b.push(...nebula(dustCount, cx, cy, t.width * 0.75 + 80, t.height * 1.4 + 60, 160))

  // shape A: the nebula everything gathers out of, filling the region
  const a = nebula(count, 0, 0, W * 0.4, H * 0.38, 280)

  field.setShapes(
    pairShapes(count, a, b, {
      size: (i) => {
        if (i < glyphCount) return glyph.size[i]
        if (i < orbitEnd) return 1.4 + Math.random() * 2.2
        if (i < orbitEnd + electrons) return i === orbitEnd ? 14 : 7
        return 0.9 + Math.random() * 1.6
      },
      tone: (i) => (i < glyphCount ? glyph.tone[i] : i >= orbitEnd && i < orbitEnd + electrons ? 0.05 : Math.random()),
      kind: (i) => (i >= glyphCount && i < orbitEnd + electrons ? 1 : 0)
    })
  )
  field.setOrbit({
    x: cx,
    y: cy - t.height * 0.04,
    rx: t.width * 0.6 + 26,
    ry: Math.max(18, tf.size * 0.34),
    tilt: -0.1,
    depth: 90,
    speed: 0.32
  })
  if (opts.intro && !opts.reducedMotion) {
    field.setMorph(0)
    field.morphTo(1, 1.05)
  } else {
    field.setMorph(1)
  }
  return region
}
