<template>
  <div ref="rootRef" class="solar" :class="{ 'is-ready': ready, 'is-fallback': fallback, 'is-hover': hovering }">
    <canvas ref="canvasRef" class="solar-canvas" aria-hidden="true"></canvas>
    <p v-if="!fallback && !reducedMotion" class="solar-hint" aria-hidden="true">{{ t('home.solar.hint') }}</p>
    <span class="sr-only">{{ t('home.solar.description') }}</span>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import * as THREE from '@/lib/three/three-solar.js'

/**
 * SolarSystem — a real-time solar system rendered with three.js.
 *
 * Surfaces use NASA / Solar System Scope textures (see src/assets/solar/CREDITS.md) under custom
 * shaders: day/night terminators with soft fill, Earth with ocean specular, drifting clouds
 * that cast shadows, city lights on the night side and a scattering rim; Saturn's rings from
 * a radial alpha map with the planet's shadow across them and the rings' shadow on the
 * planet; Uranus tipped on its side; a boiling Sun with corona streamers, prominences, lens
 * flare and bloom; an asteroid belt of lit rocks, the Kuiper belt, a comet with an ion tail
 * and a curved dust tail that always point away from the Sun; and a parallax sky of stars
 * over the Milky Way. Drag to orbit, pinch or ctrl+wheel to zoom, click a planet to follow
 * it, click empty space to return to the overview.
 */
const { t } = useI18n()

const rootRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
const fallback = ref(false)
const reducedMotion = ref(false)
const hovering = ref(false)

/* ------------------------------------------------------------------ */
/* GLSL                                                                 */
/* ------------------------------------------------------------------ */
const NOISE = /* glsl */ `
float hash3(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise3(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x), mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x), mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
float fbm(vec3 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 6; i++) { s += a * noise3(p); p = p * 2.03 + vec3(13.1, 7.7, 3.3); a *= 0.5; }
  return s;
}
float fbm4(vec3 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++) { s += a * noise3(p); p = p * 2.07 + vec3(5.2, 1.3, 9.1); a *= 0.5; }
  return s;
}
`

const BODY_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vN;   // object-space normal
varying vec3 vWN;  // world-space normal
varying vec3 vWP;  // world position
varying vec3 vOP;  // object position
void main() {
  vUv = uv;
  vN = normalize(normal);
  vOP = position;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  vWN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`

/* The Sun: texture for structure, noise for motion, HDR output for bloom. */
const SUN_FRAG = /* glsl */ `
uniform sampler2D uMap;
uniform float uTime;
varying vec2 vUv; varying vec3 vN; varying vec3 vWN; varying vec3 vWP; varying vec3 vOP;
${NOISE}
void main() {
  vec3 n = normalize(vN);
  float t = uTime;
  float w1 = fbm4(n * 4.0 + vec3(t * 0.06, -t * 0.04, t * 0.02));
  float w2 = fbm4(n * 9.0 + vec3(-t * 0.08, t * 0.05, 0.0));
  vec2 uv = vUv + vec2(w1 - 0.5, w2 - 0.5) * 0.012 + vec2(t * 0.0025, 0.0);
  vec3 texel = texture2D(uMap, uv).rgb;
  float lum = dot(texel, vec3(0.3, 0.59, 0.11));
  float cells = fbm(n * 14.0 + vec3(t * 0.1, t * 0.07, -t * 0.05));
  float fine = noise3(n * 60.0 + vec3(t * 0.3));
  vec3 base = mix(vec3(0.95, 0.30, 0.04), vec3(1.0, 0.62, 0.16), smoothstep(0.25, 0.7, lum));
  base = mix(base, vec3(1.0, 0.9, 0.55), smoothstep(0.62, 0.92, lum + cells * 0.25));
  base += vec3(1.0, 0.95, 0.8) * smoothstep(0.7, 0.95, cells) * 0.35;
  base += fine * 0.05;
  base *= 1.0 - 0.6 * smoothstep(0.18, 0.05, lum);
  vec3 V = normalize(cameraPosition - vWP);
  float limb = 0.5 + 0.5 * max(dot(normalize(vWN), V), 0.0);
  base *= 0.45 + 0.55 * limb;
  gl_FragColor = vec4(base * 1.25, 1.0);
}
`

const SHELL_VERT = /* glsl */ `
varying vec3 vN; varying vec3 vWP; varying vec3 vWN;
void main() {
  vN = normalize(normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  vWN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`

const CORONA_FRAG = /* glsl */ `
uniform float uTime;
varying vec3 vN; varying vec3 vWP; varying vec3 vWN;
${NOISE}
void main() {
  vec3 V = normalize(cameraPosition - vWP);
  float facing = abs(dot(normalize(vWN), V));
  // How far the view ray passes from the Sun's centre, as a fraction of the shell's radius: a ray
  // that passes at distance p meets the shell's normal at sin = p / R, so this is exact in
  // perspective too. 0 = straight through the centre, 1 = grazing the shell's silhouette.
  float d = sqrt(max(0.0, 1.0 - facing * facing));
  const float LIMB = 1.0 / 2.1; // the Sun's own edge on that scale (shell radius = 2.1 Suns)
  // bright right at the Sun's edge, falling to nothing at the shell's silhouette. (Keyed on 1 - facing
  // it peaked near the silhouette instead, a detached ring at twice the Sun's radius.)
  float rim = smoothstep(LIMB * 0.92, LIMB * 1.04, d) * pow(clamp((1.0 - d) / (1.0 - LIMB), 0.0, 1.0), 2.2) * 0.6;
  vec3 n = normalize(vN);
  float streak = fbm4(n * vec3(3.2, 6.0, 3.2) + vec3(uTime * 0.05, uTime * 0.07, -uTime * 0.04));
  float flicker = noise3(n * 16.0 + vec3(0.0, uTime * 0.4, 0.0));
  float a = rim * (0.25 + 0.75 * streak) * (0.8 + 0.2 * flicker) * 0.7;
  vec3 colr = mix(vec3(1.0, 0.42, 0.1), vec3(1.0, 0.82, 0.5), streak);
  gl_FragColor = vec4(colr * a, a);
}
`

const PROM_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const PROM_FRAG = /* glsl */ `
uniform float uTime; uniform float uSeed;
varying vec2 vUv;
${NOISE}
void main() {
  float along = vUv.x;
  float across = vUv.y;
  float n = fbm4(vec3(along * 9.0 + uSeed, across * 4.0, uTime * 0.35 + uSeed));
  float body = smoothstep(0.0, 0.3, across) * smoothstep(1.0, 0.7, across);
  float ends = smoothstep(0.0, 0.12, along) * smoothstep(1.0, 0.88, along);
  float a = body * ends * (0.25 + 0.75 * n) * 0.85;
  vec3 colr = mix(vec3(1.0, 0.35, 0.08), vec3(1.0, 0.78, 0.35), n);
  gl_FragColor = vec4(colr * a * 1.6, a);
}
`

/* Textured planet with lighting, soft fill, optional ring shadow, atmosphere rim. */
const PLANET_FRAG = /* glsl */ `
uniform mat4 modelMatrix;
uniform sampler2D uMap;
uniform vec3 uSunPos;
uniform vec3 uRimColor; uniform float uRimStrength;
uniform float uFill;
uniform float uSpec;
uniform vec3 uRing;
uniform float uRadius;
uniform float uBump;
varying vec2 vUv; varying vec3 vN; varying vec3 vWN; varying vec3 vWP; varying vec3 vOP;
void main() {
  vec3 alb = texture2D(uMap, vUv).rgb;
  vec3 N = normalize(vWN);
  vec3 L = normalize(uSunPos - vWP);
  if (uBump > 0.0) {
    vec2 e = vec2(1.0 / 2048.0, 1.0 / 1024.0);
    float h0 = dot(alb, vec3(0.33));
    float hx = dot(texture2D(uMap, vUv + vec2(e.x, 0.0)).rgb, vec3(0.33));
    float hy = dot(texture2D(uMap, vUv + vec2(0.0, e.y)).rgb, vec3(0.33));
    vec3 n = normalize(vN);
    vec3 up = abs(n.y) > 0.95 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
    vec3 T = normalize(cross(up, n)); vec3 B = cross(n, T);
    vec3 delta = (-(hx - h0) * T + (hy - h0) * B) * uBump;
    N = normalize(vWN + mat3(modelMatrix) * delta);
  }
  float NL = dot(normalize(vWN), L);
  float diff = max(dot(N, L), 0.0);
  float day = smoothstep(-0.12, 0.22, NL);
  float shade = 1.0;
  if (uRing.z > 0.5) {
    vec3 lo = normalize(inverse(mat3(modelMatrix)) * L);
    vec3 po = vOP;
    if (abs(lo.y) > 1e-4) {
      float tt = -po.y / lo.y;
      if (tt > 0.0) {
        float r = length((po + lo * tt).xz) / uRadius;
        float inRing = step(uRing.x, r) * step(r, uRing.y);
        float gap = 1.0 - smoothstep(0.0, 0.03, abs(r - (uRing.x + (uRing.y - uRing.x) * 0.62)) - 0.03);
        shade = 1.0 - inRing * (0.7 - gap * 0.4);
      }
    }
  }
  vec3 V = normalize(cameraPosition - vWP);
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), 40.0) * uSpec;
  float rim = pow(1.0 - abs(dot(normalize(vWN), V)), 3.2);
  float limb = 0.6 + 0.4 * pow(max(dot(normalize(vWN), V), 0.0), 0.6);
  vec3 colr = alb * (uFill + diff * 1.35 * day * shade) * limb + vec3(1.0, 0.95, 0.85) * spec * day;
  colr += uRimColor * rim * uRimStrength * (0.2 + 0.8 * day);
  gl_FragColor = vec4(colr, 1.0);
}
`

/* Earth: day/night maps, bump+roughness+clouds packed map, cloud shadows, scattering rim. */
const EARTH_FRAG = /* glsl */ `
uniform mat4 modelMatrix;
uniform sampler2D uDay; uniform sampler2D uNight; uniform sampler2D uBRC;
uniform vec3 uSunPos; uniform float uCloudShift;
varying vec2 vUv; varying vec3 vN; varying vec3 vWN; varying vec3 vWP; varying vec3 vOP;
void main() {
  vec3 day = texture2D(uDay, vUv).rgb;
  vec3 night = texture2D(uNight, vUv).rgb;
  vec3 brc = texture2D(uBRC, vUv).rgb;
  vec2 e = vec2(1.0 / 4096.0, 1.0 / 2048.0);
  float h0 = brc.r;
  float hx = texture2D(uBRC, vUv + vec2(e.x, 0.0)).r;
  float hy = texture2D(uBRC, vUv + vec2(0.0, e.y)).r;
  vec3 n = normalize(vN);
  vec3 up = abs(n.y) > 0.95 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 T = normalize(cross(up, n)); vec3 B = cross(n, T);
  vec3 delta = (-(hx - h0) * T + (hy - h0) * B) * 14.0;
  vec3 N = normalize(vWN + mat3(modelMatrix) * delta);
  vec3 L = normalize(uSunPos - vWP);
  float NL = dot(normalize(vWN), L);
  float diff = max(dot(N, L), 0.0);
  float dayMask = smoothstep(-0.1, 0.2, NL);
  float cloudShadow = texture2D(uBRC, vUv + vec2(uCloudShift - 0.004, 0.0)).b;
  float ocean = 1.0 - smoothstep(0.35, 0.6, brc.g);
  vec3 V = normalize(cameraPosition - vWP);
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), 90.0) * ocean * 0.45;
  vec3 colr = day * (0.1 + diff * 1.4 * dayMask * (1.0 - cloudShadow * 0.55)) + vec3(1.0, 0.95, 0.85) * spec * dayMask;
  float nightMask = 1.0 - smoothstep(-0.2, 0.08, NL);
  colr += night * nightMask * 1.6 * (1.0 - cloudShadow * 0.6);
  float rim = pow(1.0 - abs(dot(normalize(vWN), V)), 3.0);
  colr += vec3(0.28, 0.55, 1.0) * rim * 0.65 * (0.15 + 0.85 * dayMask);
  gl_FragColor = vec4(colr, 1.0);
}
`

const CLOUD_FRAG = /* glsl */ `
uniform sampler2D uBRC; uniform vec3 uSunPos; uniform float uCloudShift;
varying vec2 vUv; varying vec3 vN; varying vec3 vWN; varying vec3 vWP; varying vec3 vOP;
void main() {
  float c = texture2D(uBRC, vUv + vec2(uCloudShift, 0.0)).b;
  float a = smoothstep(0.08, 0.7, c);
  vec3 N = normalize(vWN);
  vec3 L = normalize(uSunPos - vWP);
  float diff = max(dot(N, L), 0.0);
  float day = smoothstep(-0.1, 0.22, dot(N, L));
  vec3 colr = vec3(1.0) * (0.06 + diff * 1.25 * day);
  gl_FragColor = vec4(colr, a * 0.95);
}
`

const RING_VERT = /* glsl */ `
varying vec3 vWP; varying vec3 vOP; varying vec3 vWN;
void main() {
  vOP = position;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  vWN = normalize(mat3(modelMatrix) * vec3(0.0, 1.0, 0.0));
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`
const RING_FRAG = /* glsl */ `
uniform mat4 modelMatrix;
uniform sampler2D uMap; uniform float uHasMap;
uniform vec3 uSunPos; uniform float uInner; uniform float uOuter; uniform float uPlanetR; uniform vec3 uTint;
varying vec3 vWP; varying vec3 vOP; varying vec3 vWN;
${NOISE}
void main() {
  float r = length(vOP.xz);
  float u = (r - uInner) / (uOuter - uInner);
  if (u < 0.0 || u > 1.0) discard;
  vec4 s = uHasMap > 0.5 ? texture2D(uMap, vec2(u, 0.5)) : vec4(1.0);
  float density = uHasMap > 0.5 ? s.a : (0.08 + 0.22 * noise3(vec3(u * 40.0, 0.0, 0.0))) * smoothstep(0.0, 0.2, u) * smoothstep(1.0, 0.8, u);
  density *= smoothstep(0.0, 0.03, u) * smoothstep(1.0, 0.97, u);
  vec3 colr = (uHasMap > 0.5 ? s.rgb : vec3(1.0)) * uTint;
  vec3 L = normalize(uSunPos - vWP);
  vec3 N = normalize(vWN);
  float lit = abs(dot(N, L));
  vec3 lo = normalize(inverse(mat3(modelMatrix)) * L);
  vec3 po = vOP;
  float b = dot(po, lo);
  float c = dot(po, po) - uPlanetR * uPlanetR;
  float disc = b * b - c;
  float shadow = 1.0;
  if (disc > 0.0 && (-b - sqrt(disc)) > 0.0) shadow = 0.1;
  vec3 V = normalize(cameraPosition - vWP);
  float translucent = (dot(N, L) * dot(N, V)) < 0.0 ? 0.3 : 0.0;
  vec3 lighting = colr * (0.18 + lit * 1.15 * shadow + translucent);
  gl_FragColor = vec4(lighting, density);
}
`

const ATMO_FRAG = /* glsl */ `
uniform vec3 uSunPos; uniform vec3 uColor; uniform float uPower; uniform float uStrength;
varying vec3 vN; varying vec3 vWP; varying vec3 vWN;
void main() {
  vec3 V = normalize(cameraPosition - vWP);
  vec3 N = normalize(vWN);
  float edge = 1.0 - abs(dot(N, V));
  float rim = pow(edge, uPower) * (1.0 - smoothstep(0.7, 1.0, edge));
  vec3 L = normalize(uSunPos - vWP);
  float day = smoothstep(-0.45, 0.5, dot(N, L));
  float a = rim * uStrength * (0.12 + 0.88 * day);
  gl_FragColor = vec4(uColor * a * 1.25, a);
}
`

const STAR_VERT = /* glsl */ `
attribute float aSize; attribute vec3 aColor; attribute float aPhase;
uniform float uTime; uniform float uPixelRatio;
varying vec3 vColor; varying float vTwinkle;
void main() {
  vColor = aColor;
  vTwinkle = 0.78 + 0.22 * sin(uTime * (1.2 + aPhase) + aPhase * 10.0);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uPixelRatio;
  gl_Position = projectionMatrix * mv;
}
`
const STAR_FRAG = /* glsl */ `
varying vec3 vColor; varying float vTwinkle;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  float a = smoothstep(1.0, 0.0, d);
  a = a * a;
  gl_FragColor = vec4(vColor * vTwinkle * a, a);
}
`

const COMET_VERT = /* glsl */ `
attribute float aSeed; attribute float aKind;
uniform vec3 uNucleus; uniform vec3 uAway; uniform vec3 uVel; uniform float uTime; uniform float uLength; uniform float uPixelRatio; uniform float uBright;
varying float vAlpha; varying float vKind;
float h(float x) { return fract(sin(x * 127.1) * 43758.5453); }
void main() {
  vKind = aKind;
  float life = fract(aSeed + uTime * (aKind > 0.5 ? 0.2 : 0.08));
  float len = uLength * (aKind > 0.5 ? 2.4 : 1.0);
  vec3 side = normalize(cross(uAway, vec3(0.0, 1.0, 0.0)));
  vec3 upv = normalize(cross(side, uAway));
  float r1 = h(aSeed * 3.1) - 0.5, r2 = h(aSeed * 7.7) - 0.5;
  float spread = (aKind > 0.5 ? 0.06 : 0.26) * life * len;
  vec3 dir = aKind > 0.5 ? uAway : normalize(uAway - uVel * 0.6 * life);
  vec3 p = uNucleus + dir * life * len + side * r1 * spread + upv * r2 * spread;
  vAlpha = (1.0 - life) * (1.0 - life) * (aKind > 0.5 ? 0.5 : 0.55) * uBright;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float sz = (aKind > 0.5 ? 1.3 : 2.4) * (1.0 + h(aSeed) * 1.5);
  gl_PointSize = sz * uPixelRatio * 42.0 / max(-mv.z, 1.0);
  gl_Position = projectionMatrix * mv;
}
`
const COMET_FRAG = /* glsl */ `
varying float vAlpha; varying float vKind;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  float a = smoothstep(1.0, 0.0, d);
  a *= a * vAlpha;
  vec3 colr = vKind > 0.5 ? vec3(0.55, 0.75, 1.0) : vec3(1.0, 0.9, 0.72);
  gl_FragColor = vec4(colr * a, a);
}
`

/* ------------------------------------------------------------------ */
/* Scene description                                                    */
/* ------------------------------------------------------------------ */
interface PlanetSpec {
  id: string
  map: string
  radius: number
  orbit: number
  period: number
  spin: number
  tilt: number
  incl: number
  fill?: number
  spec?: number
  bump?: number
  rim?: { color: number; strength: number }
  atmosphere?: { color: number; power: number; strength: number; scale: number }
  ring?: { inner: number; outer: number; map?: string; tint: number }
  moons?: Array<{ radius: number; orbit: number; period: number; incl: number; map: string }>
  /** Opening position, in degrees around the camera: 0° screen-right, 90° nearest, 180° left, 270° farthest. */
  start: number
}

const EARTH_YEAR = 52
const PLANETS: PlanetSpec[] = [
  { id: 'mercury', map: 'mercury.jpg', radius: 0.11, orbit: 1.95, start: 220, period: EARTH_YEAR * 0.24, spin: 16, tilt: 0.001, incl: 0.12, bump: 10, fill: 0.14 },
  {
    id: 'venus', map: 'venus.jpg', radius: 0.2, orbit: 2.7, start: 330, period: EARTH_YEAR * 0.62, spin: -40, tilt: 3.09, incl: 0.06, fill: 0.16,
    rim: { color: 0xf5d9a0, strength: 0.25 }, atmosphere: { color: 0xf2d9a0, power: 3.4, strength: 0.8, scale: 1.05 }
  },
  {
    id: 'earth', map: 'earth-day.jpg', radius: 0.21, orbit: 3.55, start: 60, period: EARTH_YEAR, spin: 6, tilt: 0.41, incl: 0.0,
    atmosphere: { color: 0x5fa8ff, power: 3.4, strength: 1.0, scale: 1.065 },
    moons: [{ radius: 0.056, orbit: 0.5, period: 4.4, incl: 0.09, map: 'moon.jpg' }]
  },
  {
    id: 'mars', map: 'mars.jpg', radius: 0.145, orbit: 4.55, start: 150, period: EARTH_YEAR * 1.88, spin: 6.2, tilt: 0.44, incl: 0.03, bump: 8, fill: 0.14,
    rim: { color: 0xe8905a, strength: 0.18 }, atmosphere: { color: 0xe8905a, power: 4.5, strength: 0.3, scale: 1.045 }
  },
  {
    id: 'jupiter', map: 'jupiter.jpg', radius: 0.64, orbit: 7.5, start: 45, period: EARTH_YEAR * 11.9, spin: 2.6, tilt: 0.05, incl: 0.02, fill: 0.15,
    rim: { color: 0xf0d8b0, strength: 0.22 }, atmosphere: { color: 0xf0d8b0, power: 4.2, strength: 0.25, scale: 1.03 },
    moons: [
      { radius: 0.03, orbit: 0.98, period: 3.4, incl: 0.0, map: 'moon.jpg' },
      { radius: 0.028, orbit: 1.18, period: 5.4, incl: 0.02, map: 'moon.jpg' },
      { radius: 0.046, orbit: 1.44, period: 8.6, incl: 0.01, map: 'moon.jpg' },
      { radius: 0.042, orbit: 1.8, period: 13.4, incl: 0.03, map: 'moon.jpg' }
    ]
  },
  {
    id: 'saturn', map: 'saturn.jpg', radius: 0.54, orbit: 9.8, start: 92, period: EARTH_YEAR * 29.4, spin: 2.8, tilt: 0.47, incl: 0.04, fill: 0.15,
    rim: { color: 0xf3e4bf, strength: 0.2 }, atmosphere: { color: 0xf3e4bf, power: 4.2, strength: 0.22, scale: 1.03 },
    ring: { inner: 1.24, outer: 2.3, map: 'saturn-ring.png', tint: 0xf7e9cf },
    moons: [{ radius: 0.04, orbit: 2.95, period: 11.5, incl: 0.01, map: 'moon.jpg' }]
  },
  {
    id: 'uranus', map: 'uranus.jpg', radius: 0.33, orbit: 11.9, start: 250, period: EARTH_YEAR * 84, spin: -4.4, tilt: 1.71, incl: 0.01, fill: 0.16,
    rim: { color: 0xa9e6f2, strength: 0.3 }, atmosphere: { color: 0xa9e6f2, power: 3.6, strength: 0.42, scale: 1.045 },
    ring: { inner: 1.65, outer: 1.95, tint: 0x9fb4bd }
  },
  {
    id: 'neptune', map: 'neptune.jpg', radius: 0.32, orbit: 13.8, start: 300, period: EARTH_YEAR * 164, spin: 4, tilt: 0.49, incl: 0.03, fill: 0.17,
    rim: { color: 0x6f9cff, strength: 0.32 }, atmosphere: { color: 0x6f9cff, power: 3.6, strength: 0.48, scale: 1.045 }
  }
]

const SUN_RADIUS = 1.0
const OVERVIEW_DISTANCE = 23.5
const OVERVIEW_POLAR = 1.04

/* A portrait frame is narrow, so the overview pulls back to keep the gas giants in view. */
function overviewDistance() {
  const aspect = width / Math.max(1, height)
  return OVERVIEW_DISTANCE * (aspect < 0.7 ? 1.5 : aspect < 1.1 ? 1.25 : 1)
}

/* ------------------------------------------------------------------ */
/* Runtime                                                              */
/* ------------------------------------------------------------------ */
interface PlanetRuntime {
  spec: PlanetSpec
  holder: THREE.Group
  mesh: THREE.Mesh
  clouds: THREE.Mesh | null
  cloudShift: { value: number } | null
  angle: number
  spinAngle: number
  moons: Array<{ holder: THREE.Group; angle: number; period: number }>
}

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let composer: THREE.EffectComposer | null = null
let bloom: THREE.UnrealBloomPass | null = null
let controls: THREE.OrbitControls | null = null
let clock: THREE.Clock | null = null
let raf = 0
let width = 1
let height = 1
let visible = true
let covered = false // the page has scrolled over the hero: no need to keep rendering
let pageVisible = true
// opening: the whole system first; the page asks for the move to Earth once it has loaded
let flyRequestedAt = 0
// quality steps down when frames are slow (old browsers, no GPU acceleration)
let lowPower = false
let slowFrames: number[] = []
// textures still downloading; the page waits for them before the opening moves on
let pendingTextures = 0
let texturesSettled: Array<() => void> = []
let simTime = 0
let intro = 0
let introStart = 0
/** after the opening flight the camera rides along just behind Earth, looking at the Sun */
let earthView = false
/** once the visitor takes over from the Earth view, the camera keeps travelling with Earth */
let followEarth = false
let flyStarted = false
let lastInteraction = 0
let focus: PlanetRuntime | null = null
let focusT = 0
const planets: PlanetRuntime[] = []
const timeUniforms: Array<{ value: number }> = []
let sunGroup: THREE.Group | null = null
let belt: THREE.InstancedMesh | null = null
let beltData: Float32Array | null = null
let kuiper: THREE.Points | null = null
let starMat: THREE.ShaderMaterial | null = null
let cometMat: THREE.ShaderMaterial | null = null
let cometNucleus: THREE.Group | null = null
let cometAngle = 0.12 // just past perihelion at the opening, tail lit
let pickables: THREE.Object3D[] = []
let observer: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null
let pointerDownAt: { x: number; y: number; t: number } | null = null
let pinch: { d: number; dist: number } | null = null
const activePointers = new Map<number, { x: number; y: number }>()
const raycaster = new THREE.Raycaster()
const tmpV = new THREE.Vector3()
const tmpV2 = new THREE.Vector3()
const sunPos = new THREE.Vector3(0, 0, 0)
const loader = new THREE.TextureLoader()
// The textures go through Vite so they get content-hashed file names, which the backend serves
// with long-lived caching. From public/ (no hash, no cache headers) all 6.9 MB were downloaded
// again on every visit to the home page.
const TEXTURE_URLS = import.meta.glob('/src/assets/solar/*.{jpg,png}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>
function textureUrl(name: string) {
  return TEXTURE_URLS[`/src/assets/solar/${name}`] ?? `/solar/${name}`
}
const textures = new Map<string, THREE.Texture>()

function tex(name: string, srgb = true) {
  let tx = textures.get(name)
  if (!tx) {
    pendingTextures++
    tx = loader.load(textureUrl(name), textureDone, undefined, textureDone)
    tx.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.LinearSRGBColorSpace
    tx.anisotropy = renderer ? Math.min(8, renderer.capabilities.getMaxAnisotropy()) : 1
    tx.wrapS = THREE.RepeatWrapping
    textures.set(name, tx)
  }
  return tx
}

function textureDone() {
  pendingTextures = Math.max(0, pendingTextures - 1)
  if (pendingTextures) return
  const waiting = texturesSettled
  texturesSettled = []
  waiting.forEach((resolve) => resolve())
}

/** Resolves once the planet textures are in (or after a timeout, or at once without WebGL) */
function whenReady(timeoutMs = 6000): Promise<void> {
  return new Promise((resolve) => {
    if (fallback.value || !renderer || !pendingTextures) return resolve()
    texturesSettled.push(resolve)
    window.setTimeout(resolve, timeoutMs)
  })
}

/** Move from the overview to Earth's night side, facing the Sun (once; ignored after the user takes over) */
function flyToEarth() {
  if (intro >= 1 || flyRequestedAt) return
  flyRequestedAt = performance.now()
}

function col(hex: number) {
  return new THREE.Color(hex)
}

function makeAtmosphere(radius: number, a: NonNullable<PlanetSpec['atmosphere']>) {
  const geo = new THREE.SphereGeometry(radius * a.scale, 48, 32)
  const mat = new THREE.ShaderMaterial({
    vertexShader: SHELL_VERT,
    fragmentShader: ATMO_FRAG,
    uniforms: { uSunPos: { value: sunPos }, uColor: { value: col(a.color) }, uPower: { value: a.power }, uStrength: { value: a.strength } },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide
  })
  return new THREE.Mesh(geo, mat)
}

function radialTexture(size: number, stops: Array<[number, string]>) {
  const cv = document.createElement('canvas')
  cv.width = size
  cv.height = size
  const ctx = cv.getContext('2d')
  if (!ctx) return null
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  for (const [o, c] of stops) g.addColorStop(o, c)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const t2 = new THREE.CanvasTexture(cv)
  t2.colorSpace = THREE.SRGBColorSpace
  return t2
}

function ringTexture(size: number) {
  const cv = document.createElement('canvas')
  cv.width = size
  cv.height = size
  const ctx = cv.getContext('2d')
  if (!ctx) return null
  const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.3, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,0)')
  g.addColorStop(0.72, 'rgba(255,255,255,0)')
  g.addColorStop(0.86, 'rgba(255,255,255,0.45)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const t2 = new THREE.CanvasTexture(cv)
  t2.colorSpace = THREE.SRGBColorSpace
  return t2
}

function buildSky(parent: THREE.Scene) {
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(900, 48, 32),
    new THREE.MeshBasicMaterial({ map: tex('milky-way.jpg'), side: THREE.BackSide, color: new THREE.Color(0.66, 0.62, 0.64), depthWrite: false })
  )
  sky.rotation.set(0.55, 1.2, 0.35)
  parent.add(sky)

  const count = 7000
  const pos = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const phases = new Float32Array(count)
  const R = 600
  for (let i = 0; i < count; i++) {
    const u = Math.random() * 2 - 1
    const th = Math.random() * Math.PI * 2
    const s = Math.sqrt(1 - u * u)
    pos.set([s * Math.cos(th) * R, u * R, s * Math.sin(th) * R], i * 3)
    const tt = Math.random()
    const c: [number, number, number] = tt < 0.12 ? [0.75, 0.85, 1.0] : tt < 0.3 ? [1.0, 0.9, 0.78] : tt < 0.34 ? [1.0, 0.75, 0.6] : [1.0, 0.98, 0.95]
    const mag = Math.pow(Math.random(), 2.8)
    const b = 0.3 + mag * 0.7
    colors.set([c[0] * b, c[1] * b, c[2] * b], i * 3)
    sizes[i] = 1.0 + mag * 3.4
    phases[i] = Math.random() * 6.28
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
  starMat = new THREE.ShaderMaterial({
    vertexShader: STAR_VERT,
    fragmentShader: STAR_FRAG,
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
  parent.add(new THREE.Points(geo, starMat))
}

function buildSun(parent: THREE.Scene) {
  const group = new THREE.Group()
  const sunMat = new THREE.ShaderMaterial({ vertexShader: BODY_VERT, fragmentShader: SUN_FRAG, uniforms: { uMap: { value: tex('sun.jpg') }, uTime: { value: 0 } } })
  timeUniforms.push(sunMat.uniforms.uTime as { value: number })
  const sun = new THREE.Mesh(new THREE.SphereGeometry(SUN_RADIUS, 96, 64), sunMat)
  sun.name = 'sun'
  group.add(sun)
  pickables.push(sun)

  const coronaMat = new THREE.ShaderMaterial({
    vertexShader: SHELL_VERT,
    fragmentShader: CORONA_FRAG,
    uniforms: { uTime: { value: 0 } },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide
  })
  timeUniforms.push(coronaMat.uniforms.uTime as { value: number })
  group.add(new THREE.Mesh(new THREE.SphereGeometry(SUN_RADIUS * 2.1, 64, 48), coronaMat))

  for (let i = 0; i < 5; i++) {
    const arc = new THREE.TorusGeometry(SUN_RADIUS * (0.2 + i * 0.04), SUN_RADIUS * 0.04, 10, 48, Math.PI * (0.75 + i * 0.08))
    const mat = new THREE.ShaderMaterial({
      vertexShader: PROM_VERT,
      fragmentShader: PROM_FRAG,
      uniforms: { uTime: { value: 0 }, uSeed: { value: i * 7.3 } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
    timeUniforms.push(mat.uniforms.uTime as { value: number })
    const m = new THREE.Mesh(arc, mat)
    const holder = new THREE.Group()
    holder.rotation.set(i * 1.3, i * 2.1, i * 0.7)
    m.position.set(0, SUN_RADIUS * 0.985, 0)
    m.rotation.x = Math.PI / 2 + 0.25
    holder.add(m)
    group.add(holder)
  }

  const glowTex = radialTexture(256, [
    [0, 'rgba(255,214,150,0.32)'],
    [0.22, 'rgba(255,150,70,0.14)'],
    [0.5, 'rgba(255,100,50,0.04)'],
    [1, 'rgba(255,80,40,0)']
  ])
  if (glowTex) {
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }))
    glow.scale.set(SUN_RADIUS * 7, SUN_RADIUS * 7, 1)
    group.add(glow)
  }

  const flareTex = radialTexture(128, [
    [0, 'rgba(255,230,200,0.85)'],
    [0.3, 'rgba(255,170,110,0.3)'],
    [1, 'rgba(255,120,80,0)']
  ])
  const ring = ringTexture(128)
  if (flareTex && ring) {
    const flare = new THREE.Lensflare()
    flare.addElement(new THREE.LensflareElement(flareTex, 150, 0, new THREE.Color(0xa88860)))
    flare.addElement(new THREE.LensflareElement(ring, 80, 0.55, new THREE.Color(0x4a2618)))
    flare.addElement(new THREE.LensflareElement(flareTex, 26, 0.85, new THREE.Color(0x3a1c28)))
    group.add(flare)
  }

  group.add(new THREE.PointLight(0xfff0dc, 3.4, 0, 0))
  parent.add(group)
  sunGroup = group
}

const orbitMaterials: THREE.LineBasicMaterial[] = []
let orbitFade = 1

function buildOrbit(parent: THREE.Object3D, radius: number, opacity: number) {
  const pts: number[] = []
  const N = 360
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2
    pts.push(Math.cos(a) * radius, 0, Math.sin(a) * radius)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
  const mat = new THREE.LineBasicMaterial({ color: 0xffe3c8, transparent: true, opacity, depthWrite: false })
  mat.userData.base = opacity
  orbitMaterials.push(mat)
  parent.add(new THREE.Line(geo, mat))
}

function planetMaterial(map: string, opts: { rim?: PlanetSpec['rim']; fill?: number; spec?: number; ring?: PlanetSpec['ring']; radius: number; bump?: number }) {
  return new THREE.ShaderMaterial({
    vertexShader: BODY_VERT,
    fragmentShader: PLANET_FRAG,
    uniforms: {
      uMap: { value: tex(map) },
      uSunPos: { value: sunPos },
      uRimColor: { value: col(opts.rim?.color ?? 0xffffff) },
      uRimStrength: { value: opts.rim?.strength ?? 0 },
      uFill: { value: opts.fill ?? 0.14 },
      uSpec: { value: opts.spec ?? 0.05 },
      uRing: { value: new THREE.Vector3(opts.ring?.inner ?? 0, opts.ring?.outer ?? 0, opts.ring ? 1 : 0) },
      uRadius: { value: opts.radius },
      uBump: { value: opts.bump ?? 0 }
    }
  })
}

function buildPlanet(parent: THREE.Scene, spec: PlanetSpec, seed: number): PlanetRuntime {
  const pivot = new THREE.Group()
  pivot.rotation.x = spec.incl
  pivot.rotation.y = seed * 1.7
  parent.add(pivot)
  buildOrbit(pivot, spec.orbit, 0.12)

  const holder = new THREE.Group()
  pivot.add(holder)
  const body = new THREE.Group()
  body.rotation.z = spec.tilt
  holder.add(body)

  let mesh: THREE.Mesh
  let clouds: THREE.Mesh | null = null
  let cloudShift: { value: number } | null = null
  if (spec.id === 'earth') {
    cloudShift = { value: 0 }
    const earthMat = new THREE.ShaderMaterial({
      vertexShader: BODY_VERT,
      fragmentShader: EARTH_FRAG,
      uniforms: {
        uDay: { value: tex('earth-day.jpg') },
        uNight: { value: tex('earth-night.jpg') },
        uBRC: { value: tex('earth-bump-roughness-clouds.jpg', false) },
        uSunPos: { value: sunPos },
        uCloudShift: cloudShift
      }
    })
    mesh = new THREE.Mesh(new THREE.SphereGeometry(spec.radius, 128, 96), earthMat)
    const cloudMat = new THREE.ShaderMaterial({
      vertexShader: BODY_VERT,
      fragmentShader: CLOUD_FRAG,
      uniforms: { uBRC: { value: tex('earth-bump-roughness-clouds.jpg', false) }, uSunPos: { value: sunPos }, uCloudShift: cloudShift },
      transparent: true,
      depthWrite: false
    })
    clouds = new THREE.Mesh(new THREE.SphereGeometry(spec.radius * 1.012, 96, 64), cloudMat)
    body.add(clouds)
  } else {
    mesh = new THREE.Mesh(new THREE.SphereGeometry(spec.radius, 96, 64), planetMaterial(spec.map, spec))
  }
  mesh.name = spec.id
  body.add(mesh)
  pickables.push(mesh)
  if (spec.atmosphere) body.add(makeAtmosphere(spec.radius, spec.atmosphere))

  if (spec.ring) {
    const inner = spec.radius * spec.ring.inner
    const outer = spec.radius * spec.ring.outer
    const geo = new THREE.RingGeometry(inner, outer, 256, 8)
    geo.rotateX(-Math.PI / 2)
    const ringMat = new THREE.ShaderMaterial({
      vertexShader: RING_VERT,
      fragmentShader: RING_FRAG,
      uniforms: {
        uMap: { value: spec.ring.map ? tex(spec.ring.map) : null },
        uHasMap: { value: spec.ring.map ? 1 : 0 },
        uSunPos: { value: sunPos },
        uInner: { value: inner },
        uOuter: { value: outer },
        uPlanetR: { value: spec.radius },
        uTint: { value: col(spec.ring.tint) }
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    })
    const ring = new THREE.Mesh(geo, ringMat)
    ring.name = `${spec.id}-ring`
    body.add(ring)
  }

  const moons: PlanetRuntime['moons'] = []
  for (const m of spec.moons || []) {
    const mh = new THREE.Group()
    mh.rotation.x = m.incl
    holder.add(mh)
    const moon = new THREE.Mesh(new THREE.SphereGeometry(m.radius, 32, 24), planetMaterial(m.map, { radius: m.radius, fill: 0.12, spec: 0.02, bump: 6 }))
    moon.position.set(m.orbit, 0, 0)
    mh.add(moon)
    moons.push({ holder: mh, angle: seed * 2.3 + m.orbit, period: m.period })
  }

  // The opening composition is designed: convert the camera-relative start angle to the
  // pivot's local frame (world angle = local − pivot yaw, screen-right ≈ world +20°).
  const startAngle = THREE.MathUtils.degToRad(spec.start + 20) + pivot.rotation.y
  return { spec, holder, mesh, clouds, cloudShift, angle: startAngle, spinAngle: seed * 1.3, moons }
}

function buildBelt(parent: THREE.Scene, count: number, inner: number, outer: number, thickness: number, scale: number) {
  const geo = new THREE.DodecahedronGeometry(1, 0)
  const pos = geo.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const k = 0.7 + Math.random() * 0.6
    pos.setXYZ(i, pos.getX(i) * k, pos.getY(i) * k, pos.getZ(i) * k)
  }
  geo.computeVertexNormals()
  const mat = new THREE.MeshStandardMaterial({ color: 0x7a6b5c, roughness: 0.95, metalness: 0.05 })
  const mesh = new THREE.InstancedMesh(geo, mat, count)
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  const data = new Float32Array(count * 6)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const s = new THREE.Vector3()
  const p = new THREE.Vector3()
  for (let i = 0; i < count; i++) {
    const r = inner + Math.pow(Math.random(), 0.8) * (outer - inner)
    const a = Math.random() * Math.PI * 2
    const sp = (2 * Math.PI) / (EARTH_YEAR * Math.pow(r / 3.55, 1.5))
    const y = (Math.random() - 0.5) * thickness * (0.4 + Math.random())
    const sz = scale * (0.25 + Math.pow(Math.random(), 2.2) * 1.1)
    data.set([r, a, sp, y, sz, Math.random() * 6.28], i * 6)
    p.set(Math.cos(a) * r, y, Math.sin(a) * r)
    e.set(Math.random() * 6, Math.random() * 6, Math.random() * 6)
    q.setFromEuler(e)
    s.setScalar(sz)
    m.compose(p, q, s)
    mesh.setMatrixAt(i, m)
  }
  mesh.instanceMatrix.needsUpdate = true
  parent.add(mesh)
  return { mesh, data }
}

function buildKuiper(parent: THREE.Scene) {
  const count = 7000
  const pos = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const r = 15.6 + Math.pow(Math.random(), 1.4) * 6
    const a = Math.random() * Math.PI * 2
    const y = (Math.random() - 0.5) * (0.4 + (r - 15.6) * 0.4)
    pos.set([Math.cos(a) * r, y, Math.sin(a) * r], i * 3)
    const c = 0.45 + Math.random() * 0.4
    colors.set([c, c * 0.92, c * 0.82], i * 3)
    sizes[i] = 1.1 + Math.random() * 1.5
    phases[i] = Math.random() * 6.28
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
  const mat = new THREE.ShaderMaterial({
    vertexShader: STAR_VERT,
    fragmentShader: STAR_FRAG,
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
  const pts = new THREE.Points(geo, mat)
  parent.add(pts)
  return pts
}

function buildComet(parent: THREE.Scene) {
  const count = 5000
  const seeds = new Float32Array(count)
  const kinds = new Float32Array(count)
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    seeds[i] = Math.random()
    kinds[i] = i < count * 0.6 ? 0 : 1
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  geo.setAttribute('aKind', new THREE.BufferAttribute(kinds, 1))
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 80)
  cometMat = new THREE.ShaderMaterial({
    vertexShader: COMET_VERT,
    fragmentShader: COMET_FRAG,
    uniforms: {
      uNucleus: { value: new THREE.Vector3() },
      uAway: { value: new THREE.Vector3(1, 0, 0) },
      uVel: { value: new THREE.Vector3(0, 0, 1) },
      uTime: { value: 0 },
      uLength: { value: 2 },
      uBright: { value: 1 },
      uPixelRatio: { value: 1 }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
  const tail = new THREE.Points(geo, cometMat)
  tail.frustumCulled = false
  parent.add(tail)

  cometNucleus = new THREE.Group()
  const nucleus = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 24, 16),
    planetMaterial('moon.jpg', { radius: 0.05, fill: 0.1, spec: 0.02, bump: 6, rim: { color: 0xbfd6ff, strength: 0.5 } })
  )
  nucleus.scale.set(1.3, 0.85, 1)
  cometNucleus.add(nucleus)
  const comaTex = radialTexture(128, [
    [0, 'rgba(230,240,255,0.55)'],
    [0.3, 'rgba(180,210,255,0.22)'],
    [1, 'rgba(120,170,255,0)']
  ])
  if (comaTex) {
    const coma = new THREE.Sprite(new THREE.SpriteMaterial({ map: comaTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }))
    coma.scale.set(0.9, 0.9, 1)
    coma.name = 'coma'
    cometNucleus.add(coma)
  }
  parent.add(cometNucleus)
}

const COMET = { a: 9.8, e: 0.87, incl: 0.42, node: 0.9, period: EARTH_YEAR * 2.4 }
const axisX = new THREE.Vector3(1, 0, 0)
const axisY = new THREE.Vector3(0, 1, 0)
function cometPosition(meanAnomaly: number, out: THREE.Vector3) {
  let E = meanAnomaly
  for (let i = 0; i < 7; i++) E = E - (E - COMET.e * Math.sin(E) - meanAnomaly) / (1 - COMET.e * Math.cos(E))
  const x = COMET.a * (Math.cos(E) - COMET.e)
  const z = COMET.a * Math.sqrt(1 - COMET.e * COMET.e) * Math.sin(E)
  out.set(x, 0, z)
  out.applyAxisAngle(axisX, COMET.incl)
  out.applyAxisAngle(axisY, COMET.node)
  return out
}

/* ------------------------------------------------------------------ */
/* Lifecycle                                                            */
/* ------------------------------------------------------------------ */
function init(canvas: HTMLCanvasElement) {
  // software rendering (no GPU acceleration, common on old browsers) would freeze the page: fail
  // fast instead and show the still image
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: true
  })
  renderer.setClearColor(0x000000, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.outputColorSpace = THREE.SRGBColorSpace

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(42, 1, 0.05, 2000)
  camera.position.set(0, 9, 22)
  scene.add(new THREE.AmbientLight(0x6a5a50, 1.0))

  buildSky(scene)
  buildSun(scene)
  PLANETS.forEach((spec, i) => planets.push(buildPlanet(scene as THREE.Scene, spec, i + 1)))
  const b = buildBelt(scene, 3600, 5.3, 6.5, 0.5, 0.022)
  belt = b.mesh
  beltData = b.data
  kuiper = buildKuiper(scene)
  buildComet(scene)
  buildOrbit(scene, 15.4, 0.05)

  composer = new THREE.EffectComposer(renderer)
  composer.addPass(new THREE.RenderPass(scene, camera))
  bloom = new THREE.UnrealBloomPass(new THREE.Vector2(1, 1), 0.5, 0.45, 0.9)
  composer.addPass(bloom)
  composer.addPass(new THREE.OutputPass())

  controls = new THREE.OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.enablePan = false
  controls.enableZoom = false
  controls.rotateSpeed = 0.55
  controls.minDistance = 0.8
  controls.maxDistance = 70
  controls.minPolarAngle = 0.12
  controls.maxPolarAngle = 1.52
  controls.autoRotate = !reducedMotion.value
  controls.autoRotateSpeed = 0.16
  controls.target.set(0, 0, 0)

  clock = new THREE.Clock()
  simTime = 0
  // the opening holds on the whole system until the page asks for the move to Earth
  intro = reducedMotion.value ? 1 : 0
  earthView = reducedMotion.value
  resize()
  advance(0)
}

function resize() {
  const root = rootRef.value
  if (!root || !renderer || !camera || !composer || !bloom) return
  const rect = root.getBoundingClientRect()
  width = Math.max(1, rect.width)
  height = Math.max(1, rect.height)
  // bloom at 2× on a retina screen is the costliest thing on the page; 1.5× looks the same in space
  const dpr = lowPower ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
  renderer.setPixelRatio(dpr)
  renderer.setSize(width, height, false)
  composer.setPixelRatio(dpr)
  composer.setSize(width, height)
  bloom.enabled = !lowPower
  bloom.resolution.set(width, height)
  camera.aspect = width / height
  // The system fills the stage; the Sun sits a little below centre so the header stays clear.
  camera.setViewOffset(width, height, 0, -height * 0.04, width, height)
  camera.updateProjectionMatrix()
  if (starMat) starMat.uniforms.uPixelRatio.value = dpr
  if (cometMat) cometMat.uniforms.uPixelRatio.value = dpr
  if (kuiper) (kuiper.material as THREE.ShaderMaterial).uniforms.uPixelRatio.value = dpr
}

const beltM = new THREE.Matrix4()
const beltQ = new THREE.Quaternion()
const beltE = new THREE.Euler()
const beltS = new THREE.Vector3()
const beltP = new THREE.Vector3()

function advance(dt: number) {
  simTime += dt
  for (const u of timeUniforms) u.value = simTime
  if (starMat) starMat.uniforms.uTime.value = simTime
  if (kuiper) {
    (kuiper.material as THREE.ShaderMaterial).uniforms.uTime.value = simTime
    kuiper.rotation.y += dt * 0.0025
  }
  if (sunGroup) sunGroup.rotation.y += dt * 0.06

  for (const p of planets) {
    p.angle += (dt * Math.PI * 2) / p.spec.period
    p.holder.position.set(Math.cos(p.angle) * p.spec.orbit, 0, Math.sin(p.angle) * p.spec.orbit)
    p.spinAngle += (dt * Math.PI * 2) / p.spec.spin
    p.mesh.rotation.y = p.spinAngle
    if (p.clouds && p.cloudShift) {
      p.clouds.rotation.y = p.spinAngle
      p.cloudShift.value = (simTime * 0.0035) % 1
    }
    for (const m of p.moons) {
      m.angle += (dt * Math.PI * 2) / m.period
      m.holder.rotation.y = m.angle
    }
  }

  if (belt && beltData) {
    const n = belt.count
    for (let i = 0; i < n; i++) {
      const o = i * 6
      beltData[o + 1] += beltData[o + 2] * dt
      const a = beltData[o + 1]
      const r = beltData[o]
      beltP.set(Math.cos(a) * r, beltData[o + 3], Math.sin(a) * r)
      const tum = beltData[o + 5] + simTime * 0.3
      beltE.set(tum, tum * 1.3, tum * 0.7)
      beltQ.setFromEuler(beltE)
      beltS.setScalar(beltData[o + 4])
      beltM.compose(beltP, beltQ, beltS)
      belt.setMatrixAt(i, beltM)
    }
    belt.instanceMatrix.needsUpdate = true
  }

  if (cometMat && cometNucleus) {
    cometAngle += (dt * Math.PI * 2) / COMET.period
    const prev = cometPosition(cometAngle - 0.002, tmpV2)
    const pos = cometPosition(cometAngle, tmpV)
    cometNucleus.position.copy(pos)
    const dist = pos.length()
    ;(cometMat.uniforms.uNucleus.value as THREE.Vector3).copy(pos)
    ;(cometMat.uniforms.uAway.value as THREE.Vector3).copy(pos).normalize()
    ;(cometMat.uniforms.uVel.value as THREE.Vector3).copy(pos).sub(prev).normalize()
    cometMat.uniforms.uLength.value = THREE.MathUtils.clamp(10 / Math.max(dist, 1.5), 0.5, 6)
    // the tail and coma only wake up as the comet nears the Sun
    const activity = THREE.MathUtils.clamp(3.2 / Math.max(dist, 1.5), 0.08, 1)
    cometMat.uniforms.uBright.value = activity
    cometMat.uniforms.uTime.value = simTime
    const coma = cometNucleus.getObjectByName('coma') as THREE.Sprite | undefined
    if (coma) {
      const k = THREE.MathUtils.clamp(1.7 / Math.max(dist, 1.5), 0.25, 1.4)
      coma.scale.set(k, k, 1)
      coma.material.opacity = activity
    }
  }
}

/* ------------------------------------------------------------------ */
/* Opening: the whole system first, then a flight to Earth               */
/* ------------------------------------------------------------------ */
const INTRO_REVEAL = 1600 // ms easing into the overview
const INTRO_FLY = 2000 // ms moving to Earth once the page asks
const INTRO_AUTO_FLY = 12000 // ms: move on anyway if the page never asks
const UP = new THREE.Vector3(0, 1, 0)
const flyFromPos = new THREE.Vector3()
const flyFromTarget = new THREE.Vector3()
const evPos = new THREE.Vector3()
const evTarget = new THREE.Vector3()
const evEarth = new THREE.Vector3()
const evAway = new THREE.Vector3()
const evSide = new THREE.Vector3()
const blendA = new THREE.Vector3()
const blendB = new THREE.Vector3()
const lastEarth = new THREE.Vector3()

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** The overview, settling in from a little farther out and higher up */
function overviewPose(e: number, outPos: THREE.Vector3, outTarget: THREE.Vector3) {
  const k = 1 - Math.pow(1 - e, 3)
  const dist = THREE.MathUtils.lerp(overviewDistance() * 1.3, overviewDistance(), k)
  const polar = THREE.MathUtils.lerp(0.82, OVERVIEW_POLAR, k)
  const az = THREE.MathUtils.lerp(-0.8, -0.35, k)
  outPos.set(Math.sin(polar) * Math.sin(az) * dist, Math.cos(polar) * dist, Math.sin(polar) * Math.cos(az) * dist)
  outTarget.set(0, 0, 0)
}

/**
 * Just behind Earth on its night side, a little above and off to one side, looking toward the
 * Sun: Earth large in the foreground, the Sun beyond it. Follows Earth along its orbit.
 */
function earthPlanet(): PlanetRuntime | undefined {
  return planets.find((p) => p.spec.id === 'earth')
}

function earthPose(outPos: THREE.Vector3, outTarget: THREE.Vector3): boolean {
  const earth = earthPlanet()
  if (!earth) return false
  earth.mesh.getWorldPosition(evEarth)
  evAway.copy(evEarth).sub(sunPos).normalize() // Sun → Earth
  evSide.crossVectors(UP, evAway).normalize() // screen-right when facing the Sun
  const portrait = width / Math.max(1, height) < 0.9
  // framed so the Sun sits upper right and Earth lower right, clear of the headline on the left;
  // on a phone (text above, scene below) both sit in the middle
  const back = portrait ? 2.6 : 2.0
  const up = portrait ? 0.75 : 0.62
  const lateral = portrait ? -0.15 : -0.42
  outPos.copy(evEarth).addScaledVector(evAway, back).addScaledVector(UP, up).addScaledVector(evSide, lateral)
  outTarget.copy(evEarth).lerp(sunPos, 0.8).addScaledVector(evSide, portrait ? -0.1 : -1.45)
  return true
}

/** Swoop between two camera poses: target slides, distance changes on a log scale, with a gentle arc */
function blendPose(fromPos: THREE.Vector3, fromTarget: THREE.Vector3, toPos: THREE.Vector3, toTarget: THREE.Vector3, k: number, outPos: THREE.Vector3, outTarget: THREE.Vector3) {
  outTarget.lerpVectors(fromTarget, toTarget, k)
  blendA.copy(fromPos).sub(fromTarget)
  blendB.copy(toPos).sub(toTarget)
  const la = blendA.length()
  const lb = blendB.length()
  const len = Math.exp(THREE.MathUtils.lerp(Math.log(Math.max(la, 1e-3)), Math.log(Math.max(lb, 1e-3)), k))
  blendA.normalize().lerp(blendB.normalize(), k).normalize()
  outPos.copy(outTarget).addScaledVector(blendA, len).addScaledVector(UP, Math.sin(Math.PI * k) * 1.4)
}

/**
 * A drag, pinch or zoom ends the choreography and leaves the camera where it is. Taken over
 * during or after the flight to Earth, the camera keeps riding along with Earth so it does not
 * drift out of frame along its orbit; taken over during the overview, it stays on the overview.
 */
function releaseCamera() {
  if (intro >= 1 && !earthView) return
  followEarth = earthView || flyStarted
  const earth = followEarth ? earthPlanet() : undefined
  if (earth) earth.mesh.getWorldPosition(lastEarth)
  else followEarth = false
  intro = 1
  earthView = false
}

/** Clicking a planet hands the camera to the planet focus (and its return to the overview) */
function leaveEarthCamera() {
  intro = 1
  earthView = false
  followEarth = false
}

function updateCamera(dt: number) {
  if (!camera || !controls) return
  if (intro < 1) {
    const now = performance.now()
    if (!introStart) introStart = now
    const t = now - introStart
    if (!flyRequestedAt && t > INTRO_AUTO_FLY) flyRequestedAt = now
    if (!flyRequestedAt) {
      overviewPose(Math.min(1, t / INTRO_REVEAL), camera.position, controls.target)
    } else {
      if (!flyStarted) {
        flyFromPos.copy(camera.position)
        flyFromTarget.copy(controls.target)
        flyStarted = true
      }
      const p = Math.min(1, (now - flyRequestedAt) / INTRO_FLY)
      const k = easeInOutCubic(p)
      if (earthPose(evPos, evTarget)) blendPose(flyFromPos, flyFromTarget, evPos, evTarget, k, camera.position, controls.target)
      if (p >= 1) {
        intro = 1
        earthView = true
      }
    }
  } else if (earthView && !focus && earthPose(evPos, evTarget)) {
    camera.position.copy(evPos)
    controls.target.copy(evTarget)
  } else if (followEarth && !focus) {
    const earth = earthPlanet()
    if (earth) {
      earth.mesh.getWorldPosition(evEarth)
      evSide.copy(evEarth).sub(lastEarth)
      camera.position.add(evSide)
      controls.target.add(evSide)
      lastEarth.copy(evEarth)
    }
  }
  if (focus) {
    focusT = Math.min(1, focusT + dt * 1.2)
    focus.mesh.getWorldPosition(tmpV)
    tmpV2.copy(tmpV).sub(controls.target).multiplyScalar(Math.min(1, dt * 5))
    controls.target.add(tmpV2)
    camera.position.add(tmpV2)
    const want = focus.spec.radius * (focus.spec.ring ? 8.5 : 7)
    const offset = camera.position.clone().sub(controls.target)
    const cur = offset.length()
    const next = THREE.MathUtils.lerp(cur, want, Math.min(1, dt * 2.2))
    camera.position.copy(controls.target).add(offset.multiplyScalar(next / cur))
  } else if (intro >= 1 && focusT > 0) {
    focusT = Math.max(0, focusT - dt * 0.8)
    tmpV2.copy(controls.target).multiplyScalar(-Math.min(1, dt * 3))
    controls.target.add(tmpV2)
    camera.position.add(tmpV2)
    const offset = camera.position.clone().sub(controls.target)
    const cur = offset.length()
    const next = THREE.MathUtils.lerp(cur, overviewDistance(), Math.min(1, dt * 1.6))
    camera.position.copy(controls.target).add(offset.multiplyScalar(next / cur))
  }
  const fadeTo = focus ? 0.3 : 1
  if (Math.abs(orbitFade - fadeTo) > 0.002) {
    orbitFade = THREE.MathUtils.lerp(orbitFade, fadeTo, Math.min(1, dt * 3))
    for (const m of orbitMaterials) m.opacity = (m.userData.base as number) * orbitFade
  }
  controls.autoRotate = !reducedMotion.value && !focus && !earthView && !followEarth && performance.now() - lastInteraction > 5000
  controls.update()
}

function frame() {
  raf = 0
  if (!renderer || !composer || !clock) return
  const real = clock.getDelta()
  const dt = Math.min(0.05, real)
  if (!reducedMotion.value) advance(dt)
  updateCamera(Math.min(0.25, real))
  // low power still renders through the composer, only without the bloom pass: the output pass is
  // what applies tone mapping and sRGB to the custom shaders. Rendering straight to the canvas
  // skipped both, so after the step-down the Sun turned flat orange, lost its glow and the planets
  // went dark.
  composer.render()
  watchFrameTime(real)
  if (!ready.value) ready.value = true
  if (running()) raf = requestAnimationFrame(frame)
}

/**
 * Slow frames step quality down: first without bloom at 1× pixels, then the still image.
 * Keeps an old browser or a machine without GPU acceleration from freezing on the home page.
 */
function watchFrameTime(real: number) {
  if (fallback.value || pendingTextures || real > 0.5) return
  slowFrames.push(real)
  if (slowFrames.length < 45) return
  const sorted = slowFrames.slice().sort((a, b) => a - b)
  const median = sorted[Math.floor(sorted.length / 2)]
  slowFrames = []
  if (median < 0.055) return
  if (!lowPower) {
    lowPower = true
    resize()
    return
  }
  console.warn('[SolarSystem] frames too slow, showing the still image')
  stop()
  fallback.value = true
}

function running() {
  // once frames proved too slow and the still image took over, scrolling back or returning to the
  // tab must not start the render loop again
  return visible && pageVisible && !covered && !!renderer && !fallback.value
}

/** Called by the page as content scrolls over the hero; rendering pauses once it is hidden. */
function setCovered(value: boolean) {
  if (covered === value) return
  covered = value
  if (covered) stop()
  else start()
}

defineExpose({ setCovered, flyToEarth, whenReady })

function start() {
  if (!raf && running()) {
    clock?.getDelta()
    raf = requestAnimationFrame(frame)
  }
}

function stop() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

/* ------------------------------------------------------------------ */
/* Interaction                                                          */
/* ------------------------------------------------------------------ */
function pick(x: number, y: number): THREE.Object3D | null {
  if (!camera) return null
  const ndc = new THREE.Vector2((x / width) * 2 - 1, -(y / height) * 2 + 1)
  raycaster.setFromCamera(ndc, camera)
  const hits = raycaster.intersectObjects(pickables, false)
  if (hits.length) return hits[0].object
  let best: THREE.Object3D | null = null
  let bestD = 24
  for (const p of planets) {
    p.mesh.getWorldPosition(tmpV)
    tmpV.project(camera)
    if (tmpV.z >= 1) continue
    const d = Math.hypot((tmpV.x * 0.5 + 0.5) * width - x, (-tmpV.y * 0.5 + 0.5) * height - y)
    if (d < bestD) {
      bestD = d
      best = p.mesh
    }
  }
  return best
}

function localPoint(e: PointerEvent) {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return null
  return { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

function onPointerDown(e: PointerEvent) {
  lastInteraction = performance.now()
  const p = localPoint(e)
  if (!p) return
  activePointers.set(e.pointerId, p)
  if (activePointers.size === 2 && camera && controls) {
    releaseCamera()
    const [a, b] = [...activePointers.values()]
    pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), dist: camera.position.distanceTo(controls.target) }
    pointerDownAt = null
    return
  }
  pointerDownAt = { x: p.x, y: p.y, t: performance.now() }
}

function onPointerMove(e: PointerEvent) {
  const p = localPoint(e)
  if (!p) return
  if (activePointers.has(e.pointerId)) {
    activePointers.set(e.pointerId, p)
    lastInteraction = performance.now()
    // a real drag (not a tap) takes the camera over from the opening / Earth view
    if (pointerDownAt && Math.hypot(p.x - pointerDownAt.x, p.y - pointerDownAt.y) >= 6) releaseCamera()
    if (pinch && activePointers.size === 2 && camera && controls) {
      const [a, b] = [...activePointers.values()]
      setDistance(pinch.dist * (pinch.d / Math.max(Math.hypot(a.x - b.x, a.y - b.y), 1)))
      return
    }
  }
  if (e.pointerType === 'mouse' && !pointerDownAt) hovering.value = !!pick(p.x, p.y)
}

function onPointerUp(e: PointerEvent) {
  activePointers.delete(e.pointerId)
  if (activePointers.size < 2) pinch = null
  const p = localPoint(e)
  if (!p || !pointerDownAt) return
  const moved = Math.hypot(p.x - pointerDownAt.x, p.y - pointerDownAt.y)
  const quick = performance.now() - pointerDownAt.t < 600
  pointerDownAt = null
  if (moved < 6 && quick) {
    const hit = pick(p.x, p.y)
    const target = hit ? planets.find((pl) => pl.mesh === hit) || null : null
    if (target && target !== focus) {
      leaveEarthCamera()
      focus = target
      focusT = 0
    } else {
      focus = null
    }
  }
}

function onPointerCancel(e: PointerEvent) {
  activePointers.delete(e.pointerId)
  pinch = null
  pointerDownAt = null
}

function setDistance(d: number) {
  if (!camera || !controls) return
  const clamped = THREE.MathUtils.clamp(d, controls.minDistance, controls.maxDistance)
  const offset = camera.position.clone().sub(controls.target)
  camera.position.copy(controls.target).add(offset.multiplyScalar(clamped / offset.length()))
}

function onWheel(e: WheelEvent) {
  if (!e.ctrlKey && !e.metaKey) return
  if (!camera || !controls) return
  e.preventDefault()
  lastInteraction = performance.now()
  releaseCamera()
  setDistance(camera.position.distanceTo(controls.target) * Math.exp(e.deltaY * 0.0018))
}

function onVisibility() {
  pageVisible = document.visibilityState !== 'hidden'
  if (pageVisible) start()
  else stop()
}

onMounted(() => {
  const canvas = canvasRef.value
  const root = rootRef.value
  if (!canvas || !root || typeof window === 'undefined' || !('WebGL2RenderingContext' in window)) {
    fallback.value = true
    return
  }
  reducedMotion.value = document.documentElement.dataset.motion === 'reduced'
  try {
    init(canvas)
  } catch (err) {
    console.warn('[SolarSystem] WebGL unavailable, falling back', err)
    fallback.value = true
    return
  }
  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove, { passive: true })
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerCancel)
  canvas.addEventListener('pointerleave', onPointerCancel)
  canvas.addEventListener('wheel', onWheel, { passive: false })
  document.addEventListener('visibilitychange', onVisibility)
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(root)
  }
  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      visible = entries.some((en) => en.isIntersecting)
      if (visible) start()
      else stop()
    })
    observer.observe(root)
  }
  start()
  if (import.meta.env.DEV) {
    (window as unknown as { __solar?: unknown }).__solar = {
      focus(id: string) {
        focus = planets.find((p) => p.spec.id === id) || null
        focusT = 0
      },
      skipIntro() {
        intro = 1
        earthView = true
      },
      pos(id: string): [number, number, number] | null {
        const p = planets.find((pl) => pl.spec.id === id)
        if (!p) return null
        const v = new THREE.Vector3()
        p.mesh.getWorldPosition(v)
        return [v.x, v.y, v.z]
      },
      comet(angle: number, dir?: [number, number, number], dist = 2.4) {
        cometAngle = angle
        intro = 1
        if (!dir || !camera || !controls) return
        focus = null
        focusT = 0
        const pos = cometPosition(angle, new THREE.Vector3())
        controls.target.copy(pos)
        camera.position.copy(pos).add(new THREE.Vector3(...dir).normalize().multiplyScalar(dist))
      },
      snap(id: string, dir: [number, number, number] = [0.6, 0.35, 1]) {
        intro = 1
        const p = planets.find((pl) => pl.spec.id === id)
        if (!p || !camera || !controls) return
        focus = p
        focusT = 1
        p.mesh.getWorldPosition(controls.target)
        const d = p.spec.radius * (p.spec.ring ? 8.5 : 7)
        camera.position.copy(controls.target).add(new THREE.Vector3(...dir).normalize().multiplyScalar(d))
      }
    }
  }
})

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  resizeObserver?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
  const canvas = canvasRef.value
  canvas?.removeEventListener('pointerdown', onPointerDown)
  canvas?.removeEventListener('pointermove', onPointerMove)
  canvas?.removeEventListener('pointerup', onPointerUp)
  canvas?.removeEventListener('pointercancel', onPointerCancel)
  canvas?.removeEventListener('pointerleave', onPointerCancel)
  canvas?.removeEventListener('wheel', onWheel)
  controls?.dispose()
  composer?.dispose()
  scene?.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (mesh.geometry) mesh.geometry.dispose()
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
    else mat?.dispose()
  })
  textures.forEach((tx) => tx.dispose())
  orbitMaterials.length = 0
  orbitFade = 1
  textures.clear()
  renderer?.dispose()
  renderer = null
  scene = null
  camera = null
  composer = null
  controls = null
  planets.length = 0
  pickables = []
  timeUniforms.length = 0
})
</script>

<style scoped>
.solar {
  position: absolute;
  inset: 0;
  overflow: hidden;
  cursor: grab;
}

.solar:active {
  cursor: grabbing;
}

.solar.is-hover {
  cursor: pointer;
}

.solar-canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1.4s ease;
  touch-action: pan-y;
}

.solar.is-ready .solar-canvas {
  opacity: 1;
}

.solar.is-fallback .solar-canvas {
  display: none;
}

/* Without WebGL: a still Sun and a scatter of stars, so the page keeps its night sky */
.solar.is-fallback::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 68% 52%, rgb(255 214 150 / 0.95) 0, rgb(255 160 70 / 0.7) 2.2%, rgb(255 106 61 / 0.18) 7%, transparent 16%),
    radial-gradient(1px 1px at 12% 18%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 27% 64%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 41% 31%, #ffe9d2 50%, transparent 51%),
    radial-gradient(1px 1px at 55% 78%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 63% 12%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 78% 36%, #dfe8ff 50%, transparent 51%),
    radial-gradient(1px 1px at 86% 70%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 93% 22%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 34% 88%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 72% 90%, #fff 50%, transparent 51%),
    #000;
}

.solar-hint {
  position: absolute;
  left: 1.5rem;
  bottom: 1.5rem;
  z-index: 3;
  margin: 0;
  font-size: 0.72rem;
  color: rgb(255 244 236 / 0.3);
  pointer-events: none;
}

@media (max-width: 1023px) {
  .solar-hint {
    display: none;
  }
}
</style>
