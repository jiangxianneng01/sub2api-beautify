<template>
  <figure ref="rootRef" class="yard" :class="{ 'is-static': isStatic, 'is-running': running }">
    <div class="yard-board" aria-hidden="true"></div>

    <figcaption class="yard-bar">
      <span class="yard-live">
        <span class="yard-live-dot" :class="{ 'is-paused': isStatic }"></span>
        {{ t('home.flow.illustrative') }}
      </span>
      <button
        v-if="!prefersReducedMotion"
        type="button"
        class="yard-toggle"
        :aria-pressed="paused ? 'true' : 'false'"
        @click="paused = !paused"
      >
        <svg v-if="paused" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7-4.5-7-4.5Z" fill="currentColor" /></svg>
        <svg v-else viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor" /></svg>
        <span>{{ paused ? t('home.flow.play') : t('home.flow.pause') }}</span>
      </button>
      <span class="sr-only">{{ t('home.flow.description') }}</span>
    </figcaption>

    <!-- Wide layout: one frame. Wires and the travelling request are drawn in SVG under the
         cards (so the gateway hides the request while it decides); the connector ports are
         drawn in a second SVG above them. -->
    <div class="yard-wide" aria-hidden="true">
      <svg class="yard-svg" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
        <path class="yard-wire" :class="{ 'is-hot': wireHot(-1) }" :d="geometry.inPath" />
        <path
          v-for="(lane, i) in lanes"
          :key="lane.id"
          class="yard-wire"
          :class="{ 'is-hot': wireHot(i), 'is-hover': hoverLane === i, 'is-scan': phase === 'decide' && !isStatic }"
          :style="{ '--i': i }"
          :d="geometry.lanePaths[i]"
        />
        <!-- ambient particles drifting toward the upstreams -->
        <path class="yard-flow" :class="{ 'is-hot': wireHot(-1) }" :d="geometry.inPath" />
        <path
          v-for="(lane, i) in lanes"
          :key="`flow-${lane.id}`"
          class="yard-flow"
          :class="{ 'is-hot': wireHot(i) }"
          :style="{ '--i': i }"
          :d="geometry.lanePaths[i]"
        />

        <!-- the request on its way out: a head and a trail, moved every frame -->
        <g v-show="running" ref="requestRef" class="yard-packet">
          <circle
            v-for="n in TRAIL"
            :key="`r-${n}`"
            :class="trailClass(n - 1)"
            :r="trailRadius(n - 1)"
            :opacity="trailOpacity(n - 1)"
            cx="-20"
            cy="-20"
          />
        </g>
        <!-- the answer streaming back as tokens -->
        <g v-show="running" ref="responseRef" class="yard-tokens">
          <circle v-for="n in TOKENS * TOKEN_TRAIL" :key="`t-${n}`" :r="(n - 1) % TOKEN_TRAIL === 0 ? 2.6 : 1.7" :opacity="(n - 1) % TOKEN_TRAIL === 0 ? 1 : 0.45" cx="-20" cy="-20" />
        </g>
      </svg>

      <span class="yard-zone" :style="at(40, 30)">{{ t('home.flow.client') }}</span>
      <span class="yard-zone yard-zone--center" :style="at(600, 30)">{{ t('home.flow.gateway') }}</span>
      <span class="yard-zone" :style="at(880, 30)">{{ t('home.flow.upstream') }}</span>

      <div
        class="yard-client"
        :class="{ 'is-sending': phase === 'request', 'is-receiving': phase === 'respond', 'is-done': phase === 'rest' }"
        :style="box(40, 200, 270)"
      >
        <div class="yard-code"><span class="yard-verb">POST</span> /v1/messages</div>
        <div class="yard-code">
          <span class="yard-key">model</span>
          <Transition name="yard-swap" mode="out-in">
            <span :key="current.model" class="yard-model">{{ current.model }}</span>
          </Transition>
        </div>
        <div class="yard-code">
          <span class="yard-key">session</span>
          <span class="yard-session" :style="{ color: sessionColor(current.session) }">{{ current.session }}</span>
        </div>
        <div class="yard-code yard-reply" :class="{ 'is-on': replyVisible }">
          <span class="yard-key">reply</span>
          <span v-if="replyVisible" class="yard-ok">200</span>
          <span v-if="replyVisible" class="yard-count">{{ formatTokens(shownTokens) }} tokens</span>
          <span v-else class="yard-wait"><i></i><i></i><i></i></span>
        </div>
      </div>

      <div
        class="yard-gate"
        :class="{ 'is-deciding': phase === 'decide', 'is-emit': phase === 'route' && !isStatic, 'is-relay': phase === 'respond' }"
        :style="box(548, 200, 104, true)"
      >
        <svg class="yard-ring" viewBox="0 0 100 100">
          <circle class="yard-ring-track" cx="50" cy="50" r="47" />
          <circle class="yard-ring-arc" cx="50" cy="50" r="47" pathLength="100" />
        </svg>
        <img :src="logo" alt="" class="yard-logo" />
      </div>

      <div class="yard-tags" :style="box(480, 318, 240)">
        <span class="yard-tag">{{ t('home.tags.subscriptionToApi') }}</span>
        <span class="yard-tag">{{ t('home.tags.stickySession') }}</span>
        <span class="yard-tag">{{ t('home.tags.realtimeBilling') }}</span>
      </div>

      <div
        v-for="(lane, i) in lanes"
        :key="lane.id"
        class="yard-lane"
        :class="{ 'is-target': targetLane === i, 'is-hit': targetLane === i && phase === 'arrive', 'is-queued': queuedLane === i }"
        :style="box(880, laneY[i], 280)"
        @mouseenter="hoverLane = i"
        @mouseleave="hoverLane = null"
        @click="queueLane(i)"
      >
        <PlatformIcon :platform="lane.platform" size="lg" class="yard-lane-icon" />
        <span class="yard-lane-name">{{ lane.name }}</span>
        <span class="yard-pips">
          <i
            v-for="n in lane.accounts"
            :key="n"
            :class="{ 'is-on': targetLane === i && current.account === n }"
          ></i>
        </span>
      </div>

      <svg class="yard-svg yard-svg--top" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
        <circle
          v-for="port in ports"
          :key="port.id"
          class="yard-port"
          :class="{ 'is-lit': port.lit }"
          :cx="port.x"
          :cy="port.y"
          r="3.6"
        />
      </svg>
    </div>

    <!-- Stacked layout for narrow screens -->
    <div class="yard-stack" aria-hidden="true">
      <span class="yard-zone">{{ t('home.flow.client') }}</span>
      <div class="yard-client" :class="{ 'is-sending': phase === 'request', 'is-receiving': phase === 'respond', 'is-done': phase === 'rest' }">
        <div class="yard-code"><span class="yard-verb">POST</span> /v1/messages</div>
        <div class="yard-code">
          <span class="yard-key">model</span>
          <Transition name="yard-swap" mode="out-in">
            <span :key="current.model" class="yard-model">{{ current.model }}</span>
          </Transition>
        </div>
        <div class="yard-code yard-reply" :class="{ 'is-on': replyVisible }">
          <span class="yard-key">reply</span>
          <span v-if="replyVisible" class="yard-ok">200</span>
          <span v-if="replyVisible" class="yard-count">{{ formatTokens(shownTokens) }} tokens</span>
          <span v-else class="yard-wait"><i></i><i></i><i></i></span>
        </div>
      </div>
      <div class="yard-drop" :class="{ 'is-live': phase === 'request', 'is-back': phase === 'respond' }"></div>
      <div class="yard-stack-gate">
        <div class="yard-gate" :class="{ 'is-deciding': phase === 'decide', 'is-emit': phase === 'route' && !isStatic, 'is-relay': phase === 'respond' }">
          <svg class="yard-ring" viewBox="0 0 100 100">
            <circle class="yard-ring-track" cx="50" cy="50" r="47" />
            <circle class="yard-ring-arc" cx="50" cy="50" r="47" pathLength="100" />
          </svg>
          <img :src="logo" alt="" class="yard-logo" />
        </div>
        <div class="yard-tags">
          <span class="yard-tag">{{ t('home.tags.stickySession') }}</span>
          <span class="yard-tag">{{ t('home.tags.realtimeBilling') }}</span>
        </div>
      </div>
      <div class="yard-drop" :class="{ 'is-live': phase === 'route', 'is-back': phase === 'respond' }"></div>
      <span class="yard-zone">{{ t('home.flow.upstream') }}</span>
      <div class="yard-stack-lanes">
        <div
          v-for="(lane, i) in lanes"
          :key="lane.id"
          class="yard-lane"
          :class="{ 'is-target': targetLane === i, 'is-hit': targetLane === i && phase === 'arrive' }"
        >
          <PlatformIcon :platform="lane.platform" size="md" class="yard-lane-icon" />
          <span class="yard-lane-name">{{ lane.name }}</span>
          <span class="yard-pips">
            <i
              v-for="n in lane.accounts"
              :key="n"
              :class="{ 'is-on': targetLane === i && current.account === n }"
            ></i>
          </span>
        </div>
      </div>
    </div>

    <!-- Metered log: what each routed request cost -->
    <div class="yard-ledger" aria-hidden="true">
      <div class="yard-ledger-row yard-ledger-head">
        <span class="col-session">{{ t('home.flow.ledger.session') }}</span>
        <span class="col-model">{{ t('home.flow.ledger.model') }}</span>
        <span class="col-route">{{ t('home.flow.ledger.route') }}</span>
        <span class="col-num col-tokens">{{ t('home.flow.ledger.tokens') }}</span>
        <span class="col-num">{{ t('home.flow.ledger.cost') }}</span>
      </div>
      <TransitionGroup name="yard-row" tag="ol" class="yard-ledger-list">
        <li v-for="row in ledger" :key="row.key" class="yard-ledger-row">
          <span class="col-session" :style="{ color: sessionColor(row.session) }">{{ row.session }}</span>
          <span class="col-model">{{ row.model }}</span>
          <span class="col-route">{{ lanes[row.lane].name }} <em>#{{ row.account }}</em></span>
          <span class="col-num col-tokens">{{ formatTokens(row.tokens) }}</span>
          <span class="col-num col-cost">${{ row.cost.toFixed(4) }}</span>
        </li>
      </TransitionGroup>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import PlatformIcon from '@/components/common/PlatformIcon.vue'
import { useAppearance } from '@/composables/useAppearance'
import type { GroupPlatform } from '@/types'

const props = withDefaults(defineProps<{ logo?: string }>(), { logo: '/logo.svg' })
const logo = computed(() => props.logo || '/logo.svg')

const { t } = useI18n()

interface Lane {
  id: string
  platform: GroupPlatform
  name: string
  accounts: number
}

interface RouteSample {
  session: string
  model: string
  lane: number
  account: number
  tokens: number
  cost: number
}

const lanes = computed<Lane[]>(() => [
  { id: 'claude', platform: 'anthropic' as GroupPlatform, name: t('home.providers.claude'), accounts: 6 },
  { id: 'gpt', platform: 'openai' as GroupPlatform, name: 'GPT', accounts: 5 },
  { id: 'gemini', platform: 'gemini' as GroupPlatform, name: t('home.providers.gemini'), accounts: 4 },
  { id: 'antigravity', platform: 'antigravity' as GroupPlatform, name: t('home.providers.antigravity'), accounts: 3 }
])

// A deterministic loop of traffic. Session "a1f3" returns to the same account to show
// sticky sessions; the rest spreads across pools.
const samples: RouteSample[] = [
  { session: 'a1f3', model: 'claude-sonnet-4-6', lane: 0, account: 2, tokens: 3214, cost: 0.0186 },
  { session: '7c20', model: 'gpt-5.5', lane: 1, account: 4, tokens: 5902, cost: 0.0241 },
  { session: 'a1f3', model: 'claude-sonnet-4-6', lane: 0, account: 2, tokens: 1148, cost: 0.0071 },
  { session: 'e94b', model: 'gemini-2.5-pro', lane: 2, account: 3, tokens: 2560, cost: 0.0094 },
  { session: '51d8', model: 'gemini-3.8-flash', lane: 3, account: 1, tokens: 7340, cost: 0.0052 },
  { session: '7c20', model: 'gpt-5.3-codex', lane: 1, account: 4, tokens: 12880, cost: 0.0517 },
  { session: 'b02e', model: 'claude-opus-4-6', lane: 0, account: 5, tokens: 4032, cost: 0.0605 },
  { session: 'a1f3', model: 'claude-sonnet-4-6', lane: 0, account: 2, tokens: 2210, cost: 0.0129 }
]

/* ---------- geometry (SVG units, 1200 × 400) ---------- */
const CLIENT_X = 310
const GATE_L = 548
const GATE_R = 652
const LANE_X = 880
const MID_Y = 200
const laneY = [92, 164, 236, 308]
const geometry = {
  inPath: `M${CLIENT_X} ${MID_Y} L${GATE_L} ${MID_Y}`,
  lanePaths: laneY.map((y) => `M${GATE_R} ${MID_Y} C760 ${MID_Y} 772 ${y} ${LANE_X} ${y}`)
}

/** One request's whole way: client → (under the gateway) → an upstream lane, as a polyline */
interface RoutePath {
  xs: number[]
  ys: number[]
  cum: number[]
  len: number
  gateIn: number
  gateOut: number
}

function sampleRoute(y: number): RoutePath {
  const xs: number[] = []
  const ys: number[] = []
  const cum: number[] = []
  let len = 0
  const push = (x: number, py: number) => {
    if (xs.length) len += Math.hypot(x - xs[xs.length - 1], py - ys[ys.length - 1])
    xs.push(x)
    ys.push(py)
    cum.push(len)
  }
  push(CLIENT_X, MID_Y)
  push(GATE_L, MID_Y)
  const gateIn = len
  push(GATE_R, MID_Y)
  const gateOut = len
  const steps = 64
  for (let i = 1; i <= steps; i++) {
    const s = i / steps
    const u = 1 - s
    push(
      u * u * u * GATE_R + 3 * u * u * s * 760 + 3 * u * s * s * 772 + s * s * s * LANE_X,
      u * u * u * MID_Y + 3 * u * u * s * MID_Y + 3 * u * s * s * y + s * s * s * y
    )
  }
  return { xs, ys, cum, len, gateIn, gateOut }
}

function pointAt(r: RoutePath, distance: number): [number, number] {
  const d = Math.min(r.len, Math.max(0, distance))
  let lo = 0
  let hi = r.cum.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (r.cum[mid] <= d) lo = mid
    else hi = mid
  }
  const span = r.cum[hi] - r.cum[lo] || 1
  const f = Math.min(1, Math.max(0, (d - r.cum[lo]) / span))
  return [r.xs[lo] + (r.xs[hi] - r.xs[lo]) * f, r.ys[lo] + (r.ys[hi] - r.ys[lo]) * f]
}

const routes = laneY.map(sampleRoute)

const W = 1200
const H = 400
function at(x: number, y: number) {
  return { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }
}
function box(x: number, yCenter: number, w: number, square = false) {
  return {
    left: `${(x / W) * 100}%`,
    top: `${(yCenter / H) * 100}%`,
    width: `${(w / W) * 100}%`,
    ...(square ? { aspectRatio: '1 / 1' } : {})
  }
}

// the first three sessions take the theme's signal colours
const sessionPalette: Record<string, string> = {
  a1f3: 'rgb(var(--signal-a))',
  '7c20': 'rgb(var(--signal-b))',
  e94b: 'rgb(var(--signal-c))',
  '51d8': '#C9B6FF',
  b02e: '#9EE6C5'
}
function sessionColor(session: string) {
  return sessionPalette[session] || 'rgb(244 241 236 / 0.7)'
}

function formatTokens(n: number) {
  return n.toLocaleString('en-US')
}

/* ---------- the timeline of one request ---------- */
type Phase = 'request' | 'decide' | 'route' | 'arrive' | 'respond' | 'rest'
const TIMELINE: Array<[Phase, number]> = [
  ['request', 620],
  ['decide', 460],
  ['route', 640],
  ['arrive', 240],
  ['respond', 1120],
  ['rest', 720]
]
const STARTS: Record<Phase, number> = { request: 0, decide: 0, route: 0, arrive: 0, respond: 0, rest: 0 }
const LENGTHS: Record<Phase, number> = { request: 0, decide: 0, route: 0, arrive: 0, respond: 0, rest: 0 }
let CYCLE = 0
for (const [name, ms] of TIMELINE) {
  STARTS[name] = CYCLE
  LENGTHS[name] = ms
  CYCLE += ms
}

const TRAIL = 12
const TRAIL_DT = 26
const TOKENS = 6
const TOKEN_TRAIL = 3
const TOKEN_GAP = 92
const TOKEN_TRAVEL = TIMELINE.find(([n]) => n === 'respond')![1] - (TOKENS - 1) * TOKEN_GAP

function trailClass(k: number) {
  if (k === 0) return 'yard-dot yard-dot--head'
  return k < TRAIL / 3 ? 'yard-dot yard-dot--a' : k < (TRAIL * 2) / 3 ? 'yard-dot yard-dot--b' : 'yard-dot yard-dot--c'
}
function trailRadius(k: number) {
  return k === 0 ? 4.2 : Math.max(1, 3.3 * (1 - k / (TRAIL + 2)))
}
function trailOpacity(k: number) {
  return k === 0 ? 1 : Math.pow(1 - k / TRAIL, 1.4) * 0.85
}

const easeInSine = (p: number) => 1 - Math.cos((p * Math.PI) / 2)
const easeOutSine = (p: number) => Math.sin((p * Math.PI) / 2)
const easeInOutSine = (p: number) => -(Math.cos(Math.PI * p) - 1) / 2
const clamp01 = (p: number) => Math.min(1, Math.max(0, p))

/**
 * How far along its route the request is at cycle time T: it leaves the client gathering
 * speed, slows right down under the gateway while a lane is picked, then shoots out and
 * settles into the upstream. Speeds meet where the gateway hides the head, so it reads as
 * one continuous journey.
 */
function headDistance(r: RoutePath, T: number): number {
  if (T < STARTS.decide) return r.gateIn * easeInSine(T / LENGTHS.request)
  if (T < STARTS.route) return r.gateIn + (r.gateOut - r.gateIn) * ((T - STARTS.decide) / LENGTHS.decide)
  if (T < STARTS.arrive) return r.gateOut + (r.len - r.gateOut) * easeOutSine((T - STARTS.route) / LENGTHS.route)
  return r.len
}

const phase = ref<Phase>('rest')
const index = ref(0)
const current = computed(() => samples[index.value % samples.length])
const hoverLane = ref<number | null>(null)
const queuedLane = ref<number | null>(null)
const tokensIn = ref(0)

const paused = ref(false)
const { reducedMotion: prefersReducedMotion } = useAppearance()
const inView = ref(true)
const pageVisible = ref(true)
const isStatic = computed(() => paused.value || prefersReducedMotion.value)
const running = computed(() => !isStatic.value && inView.value && pageVisible.value)

const targetLane = computed<number | null>(() =>
  !isStatic.value && (phase.value === 'request' || phase.value === 'decide') ? null : current.value.lane
)
// the reply shows once its first token reaches the client
const replyVisible = computed(() => isStatic.value || phase.value === 'rest' || (phase.value === 'respond' && tokensIn.value > 0))
const shownTokens = computed(() =>
  isStatic.value || phase.value === 'rest' ? current.value.tokens : Math.round((current.value.tokens * tokensIn.value) / TOKENS)
)

/** a wire is lit while the request or its answer is on it (-1 is the client's wire) */
function wireHot(lane: number) {
  if (isStatic.value) return lane === -1 || lane === current.value.lane
  const p = phase.value
  if (lane === -1) return p === 'request' || p === 'decide' || p === 'respond'
  return lane === current.value.lane && (p === 'route' || p === 'arrive' || p === 'respond')
}

const ports = computed(() => {
  const p = phase.value
  const lane = current.value.lane
  const live = !isStatic.value
  return [
    { id: 'client', x: CLIENT_X, y: MID_Y, lit: !live || p === 'request' || p === 'rest' },
    { id: 'gate-in', x: GATE_L, y: MID_Y, lit: !live || p === 'decide' || p === 'respond' },
    { id: 'gate-out', x: GATE_R, y: MID_Y, lit: !live || p === 'route' || p === 'respond' },
    ...laneY.map((y, i) => ({
      id: `lane-${i}`,
      x: LANE_X,
      y,
      lit: i === lane && (!live || p === 'arrive' || p === 'respond')
    }))
  ]
})

let rowKey = 0
const ledger = ref(
  [samples[samples.length - 1], samples[samples.length - 2], samples[samples.length - 3]].map((s) => ({
    ...s,
    key: rowKey++
  }))
)

/** Click a lane to send the next request there */
function queueLane(i: number) {
  queuedLane.value = queuedLane.value === i ? null : i
  if (isStatic.value) nextSample()
}

function nextSample() {
  let next = (index.value + 1) % samples.length
  const want = queuedLane.value
  if (want !== null) {
    for (let k = 0; k < samples.length; k++) {
      const j = (index.value + 1 + k) % samples.length
      if (samples[j].lane === want) {
        next = j
        break
      }
    }
    queuedLane.value = null
  }
  index.value = next
}

/* ---------- the frame loop (only while on screen and playing) ---------- */
const requestRef = ref<SVGGElement | null>(null)
const responseRef = ref<SVGGElement | null>(null)
let raf = 0
let cycleStart = 0
let committed = true

function commitLedger() {
  if (committed) return
  committed = true
  ledger.value = [{ ...current.value, key: rowKey++ }, ...ledger.value].slice(0, 3)
}

function beginCycle() {
  commitLedger()
  nextSample()
  tokensIn.value = 0
  committed = false
}

function phaseAt(T: number): Phase {
  for (let i = TIMELINE.length - 1; i >= 0; i--) {
    if (T >= STARTS[TIMELINE[i][0]]) return TIMELINE[i][0]
  }
  return 'request'
}

function hideAll(el: SVGGElement | null) {
  if (!el) return
  for (const c of Array.from(el.children)) c.setAttribute('cx', '-20')
}

function draw(T: number) {
  const route = routes[current.value.lane]
  const req = requestRef.value
  const res = responseRef.value
  if (req) {
    const end = STARTS.respond
    const dots = req.children
    if (T >= end) {
      hideAll(req)
    } else {
      // the head sinks into the upstream card as it arrives
      req.style.opacity = T > STARTS.arrive ? String(1 - clamp01((T - STARTS.arrive) / LENGTHS.arrive)) : '1'
      for (let k = 0; k < dots.length; k++) {
        const tk = T - k * TRAIL_DT
        const dot = dots[k]
        if (tk < 0) {
          dot.setAttribute('cx', '-20')
          continue
        }
        const [x, y] = pointAt(route, headDistance(route, tk))
        dot.setAttribute('cx', x.toFixed(1))
        dot.setAttribute('cy', y.toFixed(1))
      }
    }
  }
  if (res) {
    const dots = res.children
    const local = T - STARTS.respond
    if (local < 0 || T >= STARTS.rest) {
      hideAll(res)
    } else {
      let arrived = 0
      for (let j = 0; j < TOKENS; j++) {
        for (let k = 0; k < TOKEN_TRAIL; k++) {
          const dot = dots[j * TOKEN_TRAIL + k]
          const q = (local - j * TOKEN_GAP - k * 22) / TOKEN_TRAVEL
          if (q < 0 || q > 1) {
            dot.setAttribute('cx', '-20')
            continue
          }
          const [x, y] = pointAt(route, route.len * (1 - easeInOutSine(q)))
          dot.setAttribute('cx', x.toFixed(1))
          dot.setAttribute('cy', y.toFixed(1))
        }
        if ((local - j * TOKEN_GAP) / TOKEN_TRAVEL >= 1) arrived++
      }
      if (arrived !== tokensIn.value) tokensIn.value = arrived
    }
  }
}

function frame(now: number) {
  if (!cycleStart) {
    cycleStart = now
    beginCycle()
  }
  let T = now - cycleStart
  if (T >= CYCLE) {
    // a long stall (throttled tab) restarts the loop rather than fast-forwarding through it
    cycleStart = T >= CYCLE * 2 ? now : cycleStart + CYCLE
    T = now - cycleStart
    beginCycle()
  }
  const p = phaseAt(T)
  if (p !== phase.value) {
    if (p === 'rest') commitLedger()
    phase.value = p
  }
  draw(T)
  raf = requestAnimationFrame(frame)
}

function start() {
  if (raf || typeof requestAnimationFrame !== 'function') return
  cycleStart = 0
  raf = requestAnimationFrame(frame)
}

function stop() {
  if (raf) {
    cancelAnimationFrame(raf)
    raf = 0
  }
  commitLedger()
  hideAll(requestRef.value)
  hideAll(responseRef.value)
  phase.value = 'rest'
}

watch(running, (on) => (on ? start() : stop()))

let observer: IntersectionObserver | null = null
const onVisibility = () => {
  pageVisible.value = document.visibilityState !== 'hidden'
}

const rootRef = ref<HTMLElement | null>(null)

onMounted(() => {
  document.addEventListener('visibilitychange', onVisibility)
  const el = rootRef.value
  if (el && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      inView.value = entries.some((entry) => entry.isIntersecting)
    })
    observer.observe(el)
  }
  if (running.value) start()
})

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<style scoped>
.yard {
  /* the theme's signal colours drive every accent in the diagram */
  --y-a: rgb(var(--signal-a));
  --y-b: rgb(var(--signal-b));
  --y-c: rgb(var(--signal-c));
  --y-bg: color-mix(in srgb, rgb(var(--signal-a)) 3%, #09090a);
  --y-line: rgb(var(--signal-a) / 0.13);
  --y-line-hot: rgb(var(--signal-a) / 0.5);
  --y-text: #f4f1ec;
  --y-muted: rgb(244 241 236 / 0.62);
  --y-faint: rgb(244 241 236 / 0.38);
  --y-card: rgb(255 255 255 / 0.028);
  --y-card-line: rgb(var(--signal-a) / 0.14);
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: 1.75rem;
  background:
    radial-gradient(60% 80% at 50% 50%, rgb(var(--signal-b) / 0.06), transparent 70%),
    var(--y-bg);
  color: var(--y-text);
  box-shadow:
    0 0 0 1px rgb(var(--signal-a) / 0.1) inset,
    0 1px 0 rgba(255, 255, 255, 0.05) inset,
    0 40px 80px -40px rgba(0, 0, 0, 0.7);
  isolation: isolate;
}

.yard-board {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: radial-gradient(rgb(var(--signal-a) / 0.1) 1px, transparent 1.2px);
  background-size: 22px 22px;
  mask-image: radial-gradient(120% 90% at 50% 40%, #000 30%, transparent 85%);
  -webkit-mask-image: radial-gradient(120% 90% at 50% 40%, #000 30%, transparent 85%);
}

/* ---------- top bar ---------- */
.yard-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.5rem 0;
  font-size: 0.75rem;
  color: var(--y-muted);
}

.yard-live {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.yard-live-dot {
  position: relative;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 9999px;
  background: var(--y-a);
  box-shadow: 0 0 0 0 rgb(var(--signal-a) / 0.6);
  animation: yard-beacon 2.4s ease-out infinite;
}

.yard-live-dot.is-paused {
  background: var(--y-faint);
  animation: none;
}

.yard-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border-radius: 9999px;
  padding: 0.3rem 0.7rem 0.3rem 0.55rem;
  color: var(--y-muted);
  font-weight: 500;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.yard-toggle:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--y-text);
}

.yard-toggle:focus-visible {
  outline: 2px solid var(--y-a);
  outline-offset: 2px;
}

.yard-toggle svg {
  width: 0.85rem;
  height: 0.85rem;
}

/* ---------- wide frame ---------- */
.yard-wide {
  position: relative;
  display: none;
  aspect-ratio: 1200 / 400;
  margin: 0 0.5rem;
}

@media (min-width: 1024px) {
  .yard-wide {
    display: block;
  }

  .yard-stack {
    display: none !important;
  }
}

.yard-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.yard-svg--top {
  pointer-events: none;
}

.yard-wire {
  fill: none;
  stroke: var(--y-line);
  stroke-width: 1.25;
  transition: stroke 0.35s ease;
}

.yard-wire.is-hover {
  stroke: rgb(var(--signal-a) / 0.3);
}

.yard-wire.is-hot {
  stroke: var(--y-line-hot);
}

/* while the gateway decides, it looks down every lane in turn */
.yard-wire.is-scan {
  animation: yard-scan 0.42s ease both;
  animation-delay: calc(var(--i, 0) * 80ms);
}

/* slow particles drifting along every wire */
.yard-flow {
  fill: none;
  stroke: rgb(var(--signal-a) / 0.32);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-dasharray: 0.01 15;
  animation: yard-flow 2.6s linear infinite;
  animation-delay: calc(var(--i, 0) * -0.55s);
  animation-play-state: paused;
}

.yard.is-running .yard-flow {
  animation-play-state: running;
}

.yard-flow.is-hot {
  stroke: rgb(var(--signal-a) / 0.75);
  animation-duration: 1.1s;
}

.yard-packet {
  filter: drop-shadow(0 0 5px rgb(var(--signal-b) / 0.85));
}

.yard-dot--head {
  fill: #fffaf2;
}

.yard-dot--a {
  fill: var(--y-a);
}

.yard-dot--b {
  fill: var(--y-b);
}

.yard-dot--c {
  fill: var(--y-c);
}

.yard-tokens {
  fill: color-mix(in srgb, var(--y-a) 55%, #ffffff);
  filter: drop-shadow(0 0 4px rgb(var(--signal-a) / 0.9));
}

.yard-port {
  fill: var(--y-bg);
  stroke: rgb(var(--signal-a) / 0.4);
  stroke-width: 1.2;
  transition:
    fill 0.25s ease,
    stroke 0.25s ease;
}

.yard-port.is-lit {
  fill: var(--y-a);
  stroke: rgb(var(--signal-a) / 0.9);
  filter: drop-shadow(0 0 4px rgb(var(--signal-a) / 0.9));
}

.yard-zone {
  position: absolute;
  transform: translateY(-50%);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--y-muted);
  white-space: nowrap;
}

.yard-zone--center {
  transform: translate(-50%, -50%);
}

.yard-wide .yard-client,
.yard-wide .yard-gate,
.yard-wide .yard-lane,
.yard-wide .yard-tags {
  position: absolute;
  transform: translateY(-50%);
}

/* ---------- client card ---------- */
.yard-client {
  display: grid;
  gap: 0.45rem;
  padding: 1rem 1.1rem;
  border-radius: 1rem;
  border: 1px solid var(--y-card-line);
  background: var(--y-card);
  font-family: theme('fontFamily.mono');
  font-size: 0.78rem;
  line-height: 1.35;
  color: var(--y-text);
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.yard-client.is-sending {
  border-color: rgb(var(--signal-a) / 0.55);
  box-shadow: 0 0 0 4px rgb(var(--signal-a) / 0.08);
}

.yard-client.is-receiving {
  border-color: rgb(var(--signal-a) / 0.35);
}

.yard-client.is-done {
  animation: yard-land 0.6s ease-out;
}

.yard-code {
  display: flex;
  gap: 0.6rem;
  min-width: 0;
  white-space: nowrap;
}

.yard-verb {
  color: var(--y-c);
  font-weight: 650;
}

.yard-key {
  color: var(--y-faint);
  min-width: 3.9rem;
}

.yard-model {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--y-a);
}

.yard-session {
  font-weight: 600;
}

.yard-reply {
  color: var(--y-faint);
}

.yard-ok {
  font-weight: 650;
  color: #9ee6c5;
}

.yard-count {
  color: var(--y-text);
  font-variant-numeric: tabular-nums;
}

.yard-wait {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.yard-wait i {
  display: block;
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 9999px;
  background: var(--y-faint);
  animation: yard-wait 1s ease-in-out infinite;
}

.yard-wait i:nth-child(2) {
  animation-delay: 0.15s;
}

.yard-wait i:nth-child(3) {
  animation-delay: 0.3s;
}

/* ---------- gateway ---------- */
.yard-gate {
  display: grid;
  place-items: center;
  border-radius: 28%;
  background: linear-gradient(160deg, color-mix(in srgb, var(--y-a) 12%, #1d1d20), #0d0d0f);
  box-shadow:
    0 0 0 1px rgb(var(--signal-a) / 0.2),
    0 24px 48px -18px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s ease;
}

.yard-gate.is-deciding {
  box-shadow:
    0 0 0 1px rgb(var(--signal-a) / 0.6),
    0 0 36px -4px rgb(var(--signal-b) / 0.55),
    0 24px 48px -18px rgba(0, 0, 0, 0.6);
}

.yard-gate.is-emit {
  animation: yard-emit 0.5s ease-out;
}

.yard-gate.is-relay {
  box-shadow:
    0 0 0 1px rgb(var(--signal-a) / 0.4),
    0 0 26px -8px rgb(var(--signal-a) / 0.5),
    0 24px 48px -18px rgba(0, 0, 0, 0.6);
}

.yard-logo {
  width: 74%;
  height: 74%;
  object-fit: contain;
  border-radius: 22%;
}

.yard-ring {
  position: absolute;
  inset: -16%;
  width: 132%;
  height: 132%;
  overflow: visible;
  animation: yard-spin 12s linear infinite;
}

.yard-ring-track {
  fill: none;
  stroke: rgb(var(--signal-a) / 0.12);
  stroke-width: 1;
}

.yard-ring-arc {
  fill: none;
  stroke: var(--y-b);
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-dasharray: 18 82;
  opacity: 0.55;
  transition: opacity 0.3s;
}

.yard-gate.is-deciding .yard-ring {
  animation-duration: 0.9s;
}

.yard-gate.is-deciding .yard-ring-arc {
  opacity: 1;
  stroke: var(--y-a);
  stroke-dasharray: 34 66;
}

.yard-tags {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.yard-tag {
  border-radius: 9999px;
  border: 1px solid var(--y-card-line);
  padding: 0.2rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--y-muted);
  background: rgb(10 10 12 / 0.7);
  white-space: nowrap;
}

/* ---------- lanes ---------- */
.yard-lane {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.75rem 0.95rem;
  border-radius: 0.9rem;
  border: 1px solid var(--y-card-line);
  background: var(--y-card);
  transition:
    border-color 0.35s,
    background-color 0.35s,
    box-shadow 0.35s;
}

.yard-wide .yard-lane {
  cursor: pointer;
}

.yard-wide .yard-lane:hover {
  border-color: rgb(var(--signal-a) / 0.32);
}

.yard-lane-icon {
  color: var(--y-muted);
  transition: color 0.35s;
}

.yard-lane-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.yard-lane.is-target {
  border-color: rgb(var(--signal-b) / 0.6);
  background: rgb(var(--signal-b) / 0.08);
  box-shadow: 0 0 0 4px rgb(var(--signal-b) / 0.07);
}

.yard-lane.is-hit {
  animation: yard-hit 0.5s ease-out;
}

.yard-lane.is-queued {
  border-style: dashed;
  border-color: rgb(var(--signal-a) / 0.6);
}

.yard-lane.is-target .yard-lane-icon {
  color: var(--y-text);
}

.yard-pips {
  display: inline-flex;
  gap: 0.3rem;
}

.yard-pips i {
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  background: rgb(var(--signal-a) / 0.2);
  transition:
    background-color 0.25s,
    box-shadow 0.25s,
    transform 0.25s;
}

.yard-pips i.is-on {
  background: var(--y-a);
  box-shadow: 0 0 8px rgb(var(--signal-a) / 0.95);
  transform: scale(1.25);
}

/* ---------- stacked (narrow) ---------- */
.yard-stack {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.6rem;
  padding: 1rem 1.25rem 0.5rem;
}

.yard-stack .yard-zone {
  position: static;
  transform: none;
}

.yard-drop {
  position: relative;
  align-self: center;
  width: 2px;
  height: 2rem;
  overflow: hidden;
  border-radius: 2px;
  background: var(--y-line);
}

.yard-drop.is-live::after,
.yard-drop.is-back::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(180deg, transparent, var(--y-b), var(--y-a));
  animation: yard-drop 0.6s cubic-bezier(0.45, 0, 0.25, 1) forwards;
}

.yard-drop.is-back::after {
  background: linear-gradient(0deg, transparent, var(--y-a), #fffaf2);
  animation-name: yard-rise;
  animation-duration: 0.9s;
}

.yard-stack-gate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.yard-stack-gate .yard-gate {
  position: relative;
  width: 4.25rem;
  height: 4.25rem;
  flex-shrink: 0;
}

.yard-stack-gate .yard-tags {
  align-items: flex-start;
}

.yard-stack-lanes {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: minmax(0, 1fr);
}

@media (min-width: 480px) {
  .yard-stack-lanes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ---------- ledger ---------- */
.yard-ledger {
  margin: 0.75rem 1.5rem 1.4rem;
  border-top: 1px solid var(--y-line);
  padding-top: 0.6rem;
  font-size: 0.8rem;
}

.yard-ledger-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.yard-ledger-row {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 15rem) minmax(0, 1fr) 6rem 6rem;
  align-items: center;
  gap: 1rem;
  padding: 0.42rem 0;
  font-variant-numeric: tabular-nums;
}

.yard-ledger-head {
  color: var(--y-faint);
  font-size: 0.72rem;
  font-weight: 500;
}

.yard-ledger-list .yard-ledger-row:first-child {
  color: var(--y-text);
}

.yard-ledger-list .yard-ledger-row:not(:first-child) {
  color: var(--y-muted);
}

.col-session,
.col-model {
  font-family: theme('fontFamily.mono');
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col-route em {
  font-style: normal;
  color: var(--y-faint);
}

.col-num {
  text-align: right;
}

.yard-ledger-list .yard-ledger-row:first-child .col-cost {
  color: var(--y-a);
}

@media (max-width: 639px) {
  .yard-ledger {
    margin: 0.5rem 1.25rem 1.1rem;
  }

  .yard-ledger-row {
    grid-template-columns: minmax(0, 1fr) auto 4.6rem;
    gap: 0.75rem;
  }

  .col-session,
  .col-tokens {
    display: none;
  }
}

/* ---------- transitions ---------- */
.yard-swap-enter-active,
.yard-swap-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.yard-swap-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.yard-swap-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.yard-row-enter-active {
  transition:
    opacity 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.yard-row-leave-active {
  display: none;
}

.yard-row-move {
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.yard-row-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes yard-flow {
  to {
    stroke-dashoffset: -30.02;
  }
}

@keyframes yard-scan {
  0%,
  100% {
    stroke: var(--y-line);
  }

  45% {
    stroke: rgb(var(--signal-a) / 0.55);
  }
}

@keyframes yard-emit {
  0% {
    box-shadow:
      0 0 0 1px rgb(var(--signal-a) / 0.9),
      0 0 0 0 rgb(var(--signal-a) / 0.55),
      0 24px 48px -18px rgba(0, 0, 0, 0.6);
  }

  100% {
    box-shadow:
      0 0 0 1px rgb(var(--signal-a) / 0.2),
      0 0 0 18px rgb(var(--signal-a) / 0),
      0 24px 48px -18px rgba(0, 0, 0, 0.6);
  }
}

@keyframes yard-hit {
  0% {
    box-shadow: 0 0 0 0 rgb(var(--signal-a) / 0.55);
  }

  100% {
    box-shadow: 0 0 0 12px rgb(var(--signal-a) / 0);
  }
}

@keyframes yard-land {
  0% {
    box-shadow: 0 0 0 0 rgb(158 230 197 / 0.45);
  }

  100% {
    box-shadow: 0 0 0 12px rgb(158 230 197 / 0);
  }
}

@keyframes yard-wait {
  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }
}

@keyframes yard-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes yard-drop {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(170%);
  }
}

@keyframes yard-rise {
  from {
    transform: translateY(170%);
  }

  to {
    transform: translateY(-100%);
  }
}

@keyframes yard-beacon {
  0% {
    box-shadow: 0 0 0 0 rgb(var(--signal-a) / 0.55);
  }

  70%,
  100% {
    box-shadow: 0 0 0 7px rgb(var(--signal-a) / 0);
  }
}

.is-static .yard-ring,
.is-static .yard-wait i {
  animation: none;
}

html[data-motion='reduced'] .yard-ring,
html[data-motion='reduced'] .yard-live-dot,
html[data-motion='reduced'] .yard-flow,
html[data-motion='reduced'] .yard-wait i,
html[data-motion='reduced'] .yard-lane.is-hit,
html[data-motion='reduced'] .yard-client.is-done,
html[data-motion='reduced'] .yard-gate.is-emit {
    animation: none;
  }

</style>
