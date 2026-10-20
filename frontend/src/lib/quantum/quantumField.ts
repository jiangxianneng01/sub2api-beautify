/**
 * Quantum particle field — the particle system behind the home title and the sign-in backdrop.
 *
 * Every particle has two homes, shape A and shape B, and the field morphs between them. All motion
 * is computed on the GPU from a handful of uniforms, so a frame costs the CPU almost nothing:
 *   - morph       A → B with a per-particle stagger (the home title assembles from a nebula,
 *                 the sign-in core folds into the wordmark on click)
 *   - drift       a slow quantum jitter, larger while a particle is "free" (between shapes)
 *   - pointer     particles near the pointer are pushed away (or pulled in, `pointerMode: 'attract'`)
 *   - pulses      up to four shock rings expanding from where the visitor clicked
 *   - orbit       particles flagged as orbit circle a tilted ellipse, like the JLAi mark's orbit,
 *                 dimming as they pass behind the letters
 *   - rotation    shape A can be turned (dragging the sign-in core) about its own centre,
 *                 and breathes in and out a little
 *
 * Coordinates are CSS pixels, centred on the canvas, y up. A gentle perspective uses each
 * particle's z.
 */
import * as THREE from '@/lib/three/three-solar.js'

export type Rgb = [number, number, number]

export interface ParticleShapes {
  count: number
  /** shape A, xyz per particle */
  a: Float32Array
  /** shape B, xyz per particle (for orbit particles: base angle, radial offset, z jitter) */
  b: Float32Array
  /** per particle: x random, y size (px), z stagger 0..1, w colour position 0..1 */
  seed: Float32Array
  /** per particle: 0 = shape particle, 1 = orbit particle */
  kind: Float32Array
}

export interface OrbitSpec {
  /** centre, px */
  x: number
  y: number
  rx: number
  ry: number
  /** radians, counter-clockwise */
  tilt: number
  /** how far the orbit swings toward / away from the viewer, px */
  depth: number
  /** radians per second */
  speed: number
}

export interface QuantumFieldOptions {
  canvas: HTMLCanvasElement
  colors: [string, string, string]
  reducedMotion?: boolean
  /** 'repel' pushes particles out of the pointer's way, 'attract' draws them in like a well */
  pointerMode?: 'repel' | 'attract'
  /** pointer influence radius in px */
  pointerRadius?: number
  /** brightness multiplier */
  intensity?: number
  /** a warm white mixed into the gradient: 0 = pure palette, 1 = white */
  whiteMix?: number
  /** device pixel ratio cap; particles are soft light, so 1.5 looks the same as 2 at half the cost */
  maxPixelRatio?: number
}

const MAX_PULSES = 4

const VERTEX = /* glsl */ `
  attribute vec3 aA;
  attribute vec3 aB;
  attribute vec4 aSeed;
  attribute float aKind;

  uniform float uTime;
  uniform float uMorph;
  uniform float uDrift;
  uniform float uPixelRatio;
  uniform float uFocal;
  uniform vec2 uViewport;
  uniform mat3 uRotA;
  uniform vec3 uOffsetA;      // where shape A's centre sits (A is defined around the origin)
  uniform float uBreath;
  uniform float uDepthFade;    // > 0 dims what is behind and brightens what is in front
  uniform vec4 uPointer;      // x, y, strength, mode (1 repel, -1 attract)
  uniform float uPointerRadius;
  uniform vec4 uPulses[${MAX_PULSES}]; // x, y, start time, amplitude
  uniform vec4 uOrbit;        // x, y, rx, ry
  uniform vec3 uOrbitShape;   // tilt, depth, speed
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uColC;
  uniform float uWhite;
  uniform float uIntensity;

  varying vec3 vColor;
  varying float vAlpha;

  vec3 gradient(float t, float white) {
    vec3 c = t < 0.5 ? mix(uColA, uColB, t * 2.0) : mix(uColB, uColC, (t - 0.5) * 2.0);
    return mix(c, vec3(1.0, 0.97, 0.93), clamp(white, 0.0, 1.0));
  }

  void main() {
    float rnd = aSeed.x;
    float boost = 0.0;
    float behind = 0.0;
    vec3 p;

    if (aKind > 0.5) {
      // an orbit particle: travel the tilted ellipse
      float ang = aB.x + uTime * uOrbitShape.z * (0.75 + rnd * 0.5);
      float r = 1.0 + aB.y;
      vec2 e = vec2(cos(ang) * uOrbit.z * r, sin(ang) * uOrbit.w * r);
      float ct = cos(uOrbitShape.x);
      float st = sin(uOrbitShape.x);
      vec3 onOrbit = vec3(uOrbit.x + e.x * ct - e.y * st, uOrbit.y + e.x * st + e.y * ct, sin(ang) * uOrbitShape.y + aB.z);
      behind = smoothstep(0.0, 1.0, sin(ang)) * 0.75;
      float m = clamp(uMorph * 1.6 - aSeed.z * 0.6, 0.0, 1.0);
      m = m * m * (3.0 - 2.0 * m);
      p = mix(uRotA * aA + uOffsetA, onOrbit, m);
    } else {
      float m = clamp(uMorph * 1.6 - aSeed.z * 0.6, 0.0, 1.0);
      m = m * m * (3.0 - 2.0 * m);
      vec3 ra = uRotA * aA;
      ra *= 1.0 + uBreath * sin(uTime * 1.3 + rnd * 6.2831);
      p = mix(ra + uOffsetA, aB, m);
      // a particle in flight between its homes drifts more
      float free = 1.0 - abs(m * 2.0 - 1.0);
      float amp = uDrift * (0.9 + free * 14.0);
      p += vec3(
        sin(uTime * 0.9 + rnd * 61.0),
        cos(uTime * 0.8 + rnd * 47.0),
        sin(uTime * 0.6 + rnd * 29.0)
      ) * amp;
    }

    // perspective
    float s = uFocal / max(uFocal - p.z, 40.0);
    vec2 xy = p.xy * s;

    // the pointer
    vec2 d = xy - uPointer.xy;
    float dist = length(d);
    float fall = exp(-(dist * dist) / (uPointerRadius * uPointerRadius));
    float push = uPointer.z * fall;
    vec2 dir = d / max(dist, 0.001);
    if (uPointer.w > 0.0) {
      xy += dir * push * uPointerRadius * 0.55;
    } else {
      // a well: drawn in, swirling a little
      xy -= dir * push * min(dist, uPointerRadius * 0.6) * 0.8;
      xy += vec2(-dir.y, dir.x) * push * 18.0;
    }
    boost += push * 0.9;

    // shock rings
    for (int i = 0; i < ${MAX_PULSES}; i++) {
      vec4 pu = uPulses[i];
      float age = uTime - pu.z;
      if (pu.w > 0.0 && age > 0.0 && age < 3.2) {
        vec2 dw = xy - pu.xy;
        float dd = length(dw);
        float ring = age * 520.0;
        float q = (dd - ring) / 70.0;
        float w = exp(-q * q) * exp(-age * 1.25) * pu.w;
        xy += (dw / max(dd, 0.001)) * w * 46.0;
        boost += w * 1.6;
      }
    }

    vec2 ndc = xy / (uViewport * 0.5);
    gl_Position = vec4(ndc, 0.0, 1.0);
    // fade out toward the canvas edges so the field never shows a hard rectangle
    float edge = max(abs(ndc.x), abs(ndc.y));
    float size = aSeed.y * s * (1.0 + boost * 0.7);
    gl_PointSize = max(size * uPixelRatio, 1.0);

    float twinkle = 0.78 + 0.22 * sin(uTime * (1.5 + rnd * 2.5) + rnd * 90.0);
    // glyph particles mix gold and white light like the mark; orbit particles keep their colour
    float white = aKind > 0.5 ? uWhite * 0.25 : uWhite * (0.35 + fract(rnd * 7.31) * 1.3);
    vColor = gradient(aSeed.w, white) * uIntensity * (1.0 + boost * 0.9);
    vAlpha = twinkle * (1.0 - behind) * clamp(s, 0.4, 1.4) * clamp(1.0 + p.z * uDepthFade, 0.22, 1.45);
    vAlpha *= 1.0 - smoothstep(0.78, 1.0, edge);
  }
`

const FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    // a hot centre inside a soft halo: reads as light, not as dots
    float core = 1.0 - smoothstep(0.0, 0.5, r);
    float hot = core * core * core;
    float a = (core * 0.5 + hot * 0.95) * vAlpha;
    gl_FragColor = vec4(vColor * a, a);
  }
`

/** '#RRGGBB' → 0..1 sRGB, kept in sRGB on purpose: the shader writes colours straight to the screen */
function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full.slice(0, 6), 16)
  if (Number.isNaN(n)) return [1, 0.85, 0.5]
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export class QuantumField {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(30, 1, 1, 10)
  private material: THREE.ShaderMaterial
  private points: THREE.Points | null = null
  private geometry: THREE.BufferGeometry | null = null
  private raf = 0
  private running = false
  private clockStart = performance.now()
  private lastFrame = 0
  private width = 1
  private height = 1
  private reducedMotion: boolean
  private pointerTarget = { x: 0, y: 0, strength: 0 }
  private pointer = { x: 0, y: 0, strength: 0 }
  private morphTarget = 1
  private morph = 1
  private morphSpeed = 0.55
  private pulseIndex = 0
  private yaw = 0
  private pitch = 0
  private yawVel = 0
  private autoSpin = 0
  private focalOverride = 0
  /** called every frame with the elapsed seconds, for callers that animate their own state */
  onFrame: ((t: number, dt: number) => void) | null = null

  constructor(options: QuantumFieldOptions) {
    this.reducedMotion = !!options.reducedMotion
    // without GPU acceleration the field would freeze the page: refuse, and the page shows plain text
    this.renderer = new THREE.WebGLRenderer({
      canvas: options.canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true
    })
    this.renderer.setClearColor(0x000000, 0)
    const pixelRatio = Math.min(window.devicePixelRatio || 1, options.maxPixelRatio ?? 1.5)
    this.renderer.setPixelRatio(pixelRatio)

    // four rings, flattened: x, y, start time, amplitude
    const pulses: number[] = []
    for (let i = 0; i < MAX_PULSES; i++) pulses.push(0, 0, -10, 0)
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 1 },
        uDrift: { value: this.reducedMotion ? 0 : 1 },
        uPixelRatio: { value: pixelRatio },
        uFocal: { value: 900 },
        uViewport: { value: new THREE.Vector2(1, 1) },
        uRotA: { value: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
        uOffsetA: { value: [0, 0, 0] },
        uBreath: { value: 0 },
        uDepthFade: { value: 0 },
        uPointer: { value: [0, 0, 0, options.pointerMode === 'attract' ? -1 : 1] },
        uPointerRadius: { value: options.pointerRadius ?? 120 },
        uPulses: { value: pulses },
        uOrbit: { value: [0, 0, 0, 0] },
        uOrbitShape: { value: [0, 0, 0] },
        uColA: { value: [1, 0.85, 0.47] },
        uColB: { value: [0.95, 0.66, 0.23] },
        uColC: { value: [0.92, 0.48, 0.2] },
        uWhite: { value: options.whiteMix ?? 0.35 },
        uIntensity: { value: options.intensity ?? 1 }
      }
    })
    this.setColors(options.colors)
  }

  /** Replace every particle (keeps colours, pointer and pulses) */
  setShapes(shapes: ParticleShapes) {
    this.geometry?.dispose()
    if (this.points) this.scene.remove(this.points)
    const g = new THREE.BufferGeometry()
    // `position` is required by three.js; the shader reads aA / aB instead
    g.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(shapes.count * 3), 3))
    g.setAttribute('aA', new THREE.Float32BufferAttribute(shapes.a, 3))
    g.setAttribute('aB', new THREE.Float32BufferAttribute(shapes.b, 3))
    g.setAttribute('aSeed', new THREE.Float32BufferAttribute(shapes.seed, 4))
    g.setAttribute('aKind', new THREE.Float32BufferAttribute(shapes.kind, 1))
    const pts = new THREE.Points(g, this.material)
    pts.frustumCulled = false
    this.scene.add(pts)
    this.geometry = g
    this.points = pts
    this.renderOnce()
  }

  setOrbit(o: OrbitSpec | null) {
    const u = this.material.uniforms
    if (!o) {
      u.uOrbit.value = [0, 0, 0, 0]
      return
    }
    u.uOrbit.value = [o.x, o.y, o.rx, o.ry]
    u.uOrbitShape.value = [o.tilt, o.depth, this.reducedMotion ? 0 : o.speed]
  }

  setColors(colors: [string, string, string]) {
    const u = this.material.uniforms
    u.uColA.value = hexToRgb(colors[0])
    u.uColB.value = hexToRgb(colors[1])
    u.uColC.value = hexToRgb(colors[2])
    this.renderOnce()
  }

  /** Where shape A's centre sits, in centred px (A is defined around the origin) */
  setOffsetA(x: number, y: number, z = 0) {
    this.material.uniforms.uOffsetA.value = [x, y, z]
  }

  /** How much shape A swells and settles, as a fraction of its size */
  setBreath(amount: number) {
    this.material.uniforms.uBreath.value = this.reducedMotion ? 0 : amount
  }

  /** Depth cue: dims particles behind the centre plane (per px of depth) */
  setDepthFade(perPx: number) {
    this.material.uniforms.uDepthFade.value = perPx
  }

  /** Perspective strength: a shorter focal length exaggerates depth */
  setFocal(px: number) {
    this.focalOverride = px
    this.material.uniforms.uFocal.value = px
  }

  /** Brightness multiplier */
  setIntensity(value: number) {
    this.material.uniforms.uIntensity.value = value
  }

  /** Pointer influence radius in px */
  setPointerRadius(px: number) {
    this.material.uniforms.uPointerRadius.value = px
  }

  setReducedMotion(reduced: boolean) {
    this.reducedMotion = reduced
    this.material.uniforms.uDrift.value = reduced ? 0 : 1
  }

  resize(width: number, height: number) {
    this.width = Math.max(1, width)
    this.height = Math.max(1, height)
    this.renderer.setSize(this.width, this.height, false)
    this.material.uniforms.uViewport.value = new THREE.Vector2(this.width, this.height)
    this.material.uniforms.uFocal.value = this.focalOverride || Math.max(this.width, this.height) * 1.1
    this.renderOnce()
  }

  /** Pointer in canvas-local CSS px (origin top-left) */
  pointerMove(x: number, y: number) {
    this.pointerTarget.x = x - this.width / 2
    this.pointerTarget.y = this.height / 2 - y
    this.pointerTarget.strength = 1
    if (this.pointer.strength < 0.01) {
      this.pointer.x = this.pointerTarget.x
      this.pointer.y = this.pointerTarget.y
    }
  }

  pointerLeave() {
    this.pointerTarget.strength = 0
  }

  /** A shock ring from canvas-local CSS px */
  pulse(x: number, y: number, amplitude = 1) {
    const u = this.material.uniforms
    const arr = u.uPulses.value as number[]
    const i = this.pulseIndex++ % MAX_PULSES
    arr[i * 4] = x - this.width / 2
    arr[i * 4 + 1] = this.height / 2 - y
    arr[i * 4 + 2] = this.elapsed()
    arr[i * 4 + 3] = this.reducedMotion ? amplitude * 0.35 : amplitude
  }

  /** Morph toward shape B (1) or shape A (0) */
  morphTo(target: number, speed = 0.55) {
    this.morphTarget = Math.min(1, Math.max(0, target))
    this.morphSpeed = speed
    if (this.reducedMotion) this.morph = this.morphTarget
  }

  setMorph(value: number) {
    this.morph = this.morphTarget = Math.min(1, Math.max(0, value))
    this.material.uniforms.uMorph.value = this.morph
  }

  get morphValue() {
    return this.morph
  }

  /** Turn shape A by a drag delta (px) */
  spinBy(dx: number, dy: number) {
    this.yaw += dx * 0.006
    this.pitch = Math.max(-1.1, Math.min(1.1, this.pitch + dy * 0.006))
    this.yawVel = dx * 0.006
  }

  /** Slow idle rotation of shape A, radians per second */
  setAutoSpin(radPerSec: number) {
    this.autoSpin = radPerSec
  }

  start() {
    if (this.running) return
    this.running = true
    this.lastFrame = performance.now()
    const loop = () => {
      if (!this.running) return
      this.frame()
      this.raf = requestAnimationFrame(loop)
    }
    this.raf = requestAnimationFrame(loop)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  dispose() {
    this.stop()
    this.geometry?.dispose()
    this.material.dispose()
    this.renderer.dispose()
  }

  private elapsed() {
    return (performance.now() - this.clockStart) / 1000
  }

  private renderOnce() {
    if (!this.points) return
    this.renderer.render(this.scene, this.camera)
  }

  private frame() {
    const now = performance.now()
    const dt = Math.min(0.05, (now - this.lastFrame) / 1000)
    this.lastFrame = now
    const t = this.elapsed()
    const u = this.material.uniforms

    // the pointer eases in and out so the field never jumps
    const k = 1 - Math.exp(-dt * 10)
    this.pointer.x += (this.pointerTarget.x - this.pointer.x) * k
    this.pointer.y += (this.pointerTarget.y - this.pointer.y) * k
    this.pointer.strength += (this.pointerTarget.strength - this.pointer.strength) * (1 - Math.exp(-dt * 5))
    const pv = u.uPointer.value as number[]
    pv[0] = this.pointer.x
    pv[1] = this.pointer.y
    pv[2] = this.pointer.strength

    // morph
    if (this.morph !== this.morphTarget) {
      const step = dt * this.morphSpeed
      this.morph = this.morph < this.morphTarget ? Math.min(this.morphTarget, this.morph + step) : Math.max(this.morphTarget, this.morph - step)
    }
    u.uMorph.value = this.morph

    // shape A rotation: drag momentum, then the idle spin
    if (!this.reducedMotion) this.yaw += this.autoSpin * dt
    this.yaw += this.yawVel
    this.yawVel *= Math.exp(-dt * 3)
    const cy = Math.cos(this.yaw)
    const sy = Math.sin(this.yaw)
    const cp = Math.cos(this.pitch)
    const sp = Math.sin(this.pitch)
    // R = Rx(pitch) * Ry(yaw), column-major for GLSL
    u.uRotA.value = [cy, sp * sy, -cp * sy, 0, cp, sp, sy, -sp * cy, cp * cy]

    u.uTime.value = t
    this.onFrame?.(t, dt)
    this.renderer.render(this.scene, this.camera)
  }
}

/* ------------------------------------------------------------------ shapes */

export interface TextLine {
  text: string
  /** canvas font shorthand, e.g. `800 96px "S2A Sans", system-ui` */
  font: string
  /** canvas fontStretch keyword ('normal', 'semi-expanded', 'expanded'…) */
  stretch?: string
  /** left edge and baseline in canvas-local px */
  x: number
  y: number
  letterSpacing?: number
  /** sampling grid in px: smaller = denser */
  step: number
  /** particle size in px */
  size: number
  /** colour position offset, so lines can sit on different parts of the gradient */
  tone?: number
}

/**
 * Points on the filled glyphs of some lines of text, in centred px (y up). Points are spread
 * evenly over a jittered grid so letters read as solid light rather than as a lattice.
 */
export function sampleText(lines: TextLine[], width: number, height: number): { xyz: number[]; size: number[]; tone: number[] } {
  const xyz: number[] = []
  const size: number[] = []
  const tone: number[] = []
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.ceil(width))
  canvas.height = Math.max(1, Math.ceil(height))
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return { xyz, size, tone }
  for (const line of lines) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = line.font
    setCanvasText(ctx, line.stretch ?? 'normal', line.letterSpacing ?? 0)
    ctx.fillStyle = '#fff'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(line.text, line.x, line.y)
    // read back only the box the line occupies, not the whole canvas
    const m = ctx.measureText(line.text)
    const ascent = m.actualBoundingBoxAscent || parseFloat(line.font.match(/(\d+(?:\.\d+)?)px/)?.[1] || '16')
    const descent = m.actualBoundingBoxDescent || ascent * 0.3
    const bx = Math.max(0, Math.floor(line.x - (m.actualBoundingBoxLeft || 0) - 4))
    const by = Math.max(0, Math.floor(line.y - ascent - 4))
    const bw = Math.max(1, Math.min(canvas.width - bx, Math.ceil(m.width + (m.actualBoundingBoxLeft || 0) + 12)))
    const bh = Math.max(1, Math.min(canvas.height - by, Math.ceil(ascent + descent + 8)))
    const img = ctx.getImageData(bx, by, bw, bh).data
    let minX = Infinity
    let maxX = -Infinity
    const local: number[] = []
    for (let y = 0; y < bh; y += line.step) {
      for (let x = 0; x < bw; x += line.step) {
        const jx = x + Math.random() * line.step
        const jy = y + Math.random() * line.step
        const ix = Math.min(bw - 1, Math.floor(jx))
        const iy = Math.min(bh - 1, Math.floor(jy))
        if (img[(iy * bw + ix) * 4 + 3] > 110) {
          local.push(jx + bx, jy + by)
          if (jx + bx < minX) minX = jx + bx
          if (jx + bx > maxX) maxX = jx + bx
        }
      }
    }
    const span = Math.max(1, maxX - minX)
    for (let i = 0; i < local.length; i += 2) {
      const x = local[i]
      const y = local[i + 1]
      xyz.push(x - width / 2, height / 2 - y, (Math.random() - 0.5) * 10)
      size.push(line.size * (0.75 + Math.random() * 0.6))
      // colour runs left → right across the line, like the mark's gradient orbit
      tone.push(Math.min(1, Math.max(0, (x - minX) / span * 0.85 + (line.tone ?? 0) + (Math.random() - 0.5) * 0.12)))
    }
  }
  return { xyz, size, tone }
}

/**
 * Canvas text width and tracking. Set by name: older DOM typings lack these properties and newer
 * ones type them as keyword unions, and browsers without them simply ignore the assignment.
 */
export function setCanvasText(ctx: CanvasRenderingContext2D, stretch: string, letterSpacingPx: number) {
  Reflect.set(ctx, 'fontStretch', stretch)
  Reflect.set(ctx, 'letterSpacing', `${letterSpacingPx}px`)
}

/** A soft nebula: a flattened, slowly thinning cloud around a centre */
export function nebula(count: number, cx: number, cy: number, rx: number, ry: number, depth: number): number[] {
  const out: number[] = []
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2
    const r = Math.pow(Math.random(), 0.6)
    out.push(cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r, (Math.random() - 0.5) * depth)
  }
  return out
}

export interface CoreParts {
  points: number[]
  /** index ranges, in particle order */
  shell: number
  inner: number
  nucleus: number
  rings: number
}

/**
 * A layered sphere — the "core": a dense Fibonacci shell, a fainter inner cloud, a bright
 * nucleus and three tilted orbit rings (the mark's orbit, three times over), so it reads as a
 * structured, computing object rather than a ball of dust.
 */
export function coreSphere(count: number, radius: number): CoreParts {
  const out: number[] = []
  const shell = Math.floor(count * 0.56)
  const inner = Math.floor(count * 0.14)
  const nucleus = Math.floor(count * 0.06)
  const rings = count - shell - inner - nucleus
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < shell; i++) {
    const y = 1 - (i / (shell - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    const jitter = 1 + (Math.random() - 0.5) * 0.04
    out.push(Math.cos(th) * r * radius * jitter, y * radius * jitter, Math.sin(th) * r * radius * jitter)
  }
  for (let i = 0; i < inner; i++) {
    const u = Math.random() * 2 - 1
    const th = Math.random() * Math.PI * 2
    const rr = radius * (0.35 + Math.random() * 0.4)
    const s = Math.sqrt(1 - u * u)
    out.push(Math.cos(th) * s * rr, u * rr, Math.sin(th) * s * rr)
  }
  // the nucleus: a tight, bright cluster
  for (let i = 0; i < nucleus; i++) {
    const u = Math.random() * 2 - 1
    const th = Math.random() * Math.PI * 2
    const rr = radius * 0.17 * Math.pow(Math.random(), 1.6)
    const s = Math.sqrt(1 - u * u)
    out.push(Math.cos(th) * s * rr, u * rr, Math.sin(th) * s * rr)
  }
  // three orbit rings on tilted planes
  const tilts: Array<[number, number]> = [
    [1.18, 0.42],
    [1.05, -0.62],
    [0.32, 1.35]
  ]
  for (let i = 0; i < rings; i++) {
    const [ax, az] = tilts[i % tilts.length]
    const th = Math.random() * Math.PI * 2
    const rr = radius * (1.3 + (i % tilts.length) * 0.08) * (1 + (Math.random() - 0.5) * 0.025)
    // circle in the xz plane, tilted about x, then about z
    const x0 = Math.cos(th) * rr
    const z0 = Math.sin(th) * rr
    const y1 = -z0 * Math.sin(ax)
    const z1 = z0 * Math.cos(ax)
    out.push(x0 * Math.cos(az) - y1 * Math.sin(az), x0 * Math.sin(az) + y1 * Math.cos(az), z1)
  }
  return { points: out, shell, inner, nucleus, rings }
}

/**
 * Pair two point lists into a ParticleShapes of exactly `count` particles. The shorter list is
 * reused (with a little jitter) so every particle has both homes.
 */
export function pairShapes(
  count: number,
  a: number[],
  b: number[],
  opts: { size: (i: number) => number; tone: (i: number) => number; kind?: (i: number) => number }
): ParticleShapes {
  const A = new Float32Array(count * 3)
  const B = new Float32Array(count * 3)
  const seed = new Float32Array(count * 4)
  const kind = new Float32Array(count)
  const na = a.length / 3
  const nb = b.length / 3
  for (let i = 0; i < count; i++) {
    const ia = na ? (i < na ? i : Math.floor(Math.random() * na)) : 0
    const ib = nb ? (i < nb ? i : Math.floor(Math.random() * nb)) : 0
    const reuseA = i >= na ? 1 : 0
    const reuseB = i >= nb ? 1 : 0
    A[i * 3] = (a[ia * 3] ?? 0) + reuseA * (Math.random() - 0.5) * 3
    A[i * 3 + 1] = (a[ia * 3 + 1] ?? 0) + reuseA * (Math.random() - 0.5) * 3
    A[i * 3 + 2] = a[ia * 3 + 2] ?? 0
    B[i * 3] = (b[ib * 3] ?? 0) + reuseB * (Math.random() - 0.5) * 2
    B[i * 3 + 1] = (b[ib * 3 + 1] ?? 0) + reuseB * (Math.random() - 0.5) * 2
    B[i * 3 + 2] = b[ib * 3 + 2] ?? 0
    seed[i * 4] = Math.random()
    seed[i * 4 + 1] = opts.size(i)
    seed[i * 4 + 2] = Math.random()
    seed[i * 4 + 3] = opts.tone(i)
    kind[i] = opts.kind ? opts.kind(i) : 0
  }
  return { count, a: A, b: B, seed, kind }
}

/** Whether this browser can run the field at all */
let supportedCache: boolean | null = null
export function quantumSupported(): boolean {
  if (supportedCache !== null) return supportedCache
  if (typeof window === 'undefined' || !('WebGL2RenderingContext' in window)) return (supportedCache = false)
  try {
    const c = document.createElement('canvas')
    // a context that would only run in software (no GPU acceleration) counts as unsupported
    const gl = c.getContext('webgl2', { failIfMajorPerformanceCaveat: true })
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    supportedCache = !!gl
  } catch {
    supportedCache = false
  }
  return supportedCache
}
