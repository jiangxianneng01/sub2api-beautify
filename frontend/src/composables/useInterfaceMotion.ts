/**
 * Console micro-motion, applied once in AppLayout so every page gets it
 * without per-view wiring:
 *
 *  - Scroll reveal: panels (.card, .table-container, [data-reveal]) rise in,
 *    staggered, the first time they enter the viewport — including panels that
 *    render later, after their data loads.
 *  - Counting numbers: when a revealed panel holds `.stat-value` figures, they
 *    count up from zero to their real value.
 *  - Spotlight: a soft light follows the mouse across small panels (see `.card`
 *    in style.css for --spot-x / --spot-y / .is-spotlit).
 *
 * All of it is skipped when motion is set to Reduced in Appearance (the OS
 * setting alone does not switch it off; see useAppearance). Nothing here changes
 * layout or leaves a transform behind, so fixed-position dialogs inside panels
 * are unaffected.
 */
import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { motionAllowed } from './useAppearance'

const REVEAL_SELECTOR = '.card, .table-container, .glass-card, .card-glass, [data-reveal]'
const SKIP_SELECTOR = '.modal-content, .dialog-container, [role="dialog"], [data-no-reveal]'
const STAGGER_MS = 55
const MAX_STAGGER_STEPS = 7
/** Panels taller than this don't get the spotlight (tables, long forms) */
const SPOTLIGHT_MAX_HEIGHT = 480

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

/* ------------------------------------------------------------ counting numbers */

const NUMBER_RE = /-?\d[\d,]*(?:\.\d+)?/g

/** Rewrites every number in `template` at fraction `p` of its value, keeping decimals and grouping */
function interpolateNumbers(template: string, p: number): string {
  return template.replace(NUMBER_RE, (token) => {
    const grouped = token.includes(',')
    const decimals = token.includes('.') ? token.split('.')[1].length : 0
    const value = Number(token.replace(/,/g, ''))
    if (!Number.isFinite(value)) return token
    const current = value * p
    const fixed = current.toFixed(decimals)
    if (!grouped) return fixed
    const [int, frac] = fixed.split('.')
    const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return frac !== undefined ? `${withCommas}.${frac}` : withCommas
  })
}

function countUp(scope: HTMLElement, delayMs: number) {
  const values = scope.querySelectorAll<HTMLElement>('.stat-value')
  if (!values.length) return

  const nodes: { node: Text; final: string; last: string }[] = []
  values.forEach((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    let n: Node | null
    while ((n = walker.nextNode())) {
      const text = n as Text
      const final = text.nodeValue ?? ''
      if (final.length > 40 || !/\d/.test(final)) continue
      nodes.push({ node: text, final, last: final })
    }
  })
  if (!nodes.length) return

  const duration = 900
  let start = 0
  const frame = (now: number) => {
    if (!start) start = now
    const p = easeOutExpo(Math.min(1, (now - start) / duration))
    let alive = false
    for (const item of nodes) {
      // Vue re-rendered this text meanwhile: its new value wins, stop touching it
      if (item.node.nodeValue !== item.last) continue
      const next = p >= 1 ? item.final : interpolateNumbers(item.final, p)
      item.node.nodeValue = next
      item.last = next
      if (p < 1) alive = true
    }
    if (alive) requestAnimationFrame(frame)
  }

  // start from zero right away so the real figure never flashes before counting
  for (const item of nodes) {
    const zero = interpolateNumbers(item.final, 0)
    item.node.nodeValue = zero
    item.last = zero
  }
  window.setTimeout(() => requestAnimationFrame(frame), delayMs)
}

/* ------------------------------------------------------------ composable */

export function useInterfaceMotion(rootRef: Ref<HTMLElement | null>) {
  let io: IntersectionObserver | null = null
  let mo: MutationObserver | null = null
  let scanQueued = false
  let fallbackTimer = 0
  const seen = new WeakSet<Element>()
  const waiting = new Set<HTMLElement>()

  let spotCard: HTMLElement | null = null
  let spotFrame = 0
  let lastPointer: PointerEvent | null = null

  function reveal(batch: HTMLElement[]) {
    batch
      .sort((a, b) => {
        const ra = a.getBoundingClientRect()
        const rb = b.getBoundingClientRect()
        return Math.round(ra.top - rb.top) || ra.left - rb.left
      })
      .forEach((el, i) => {
        const delay = Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS
        waiting.delete(el)
        io?.unobserve(el)
        el.style.setProperty('--reveal-delay', `${delay}ms`)
        el.classList.remove('reveal-wait')
        el.classList.add('reveal-in')
        // children's animations bubble up too; only the panel's own ending cleans up
        const done = (e: AnimationEvent) => {
          if (e.target !== el) return
          el.removeEventListener('animationend', done)
          el.classList.remove('reveal-in')
          el.style.removeProperty('--reveal-delay')
        }
        el.addEventListener('animationend', done)
        countUp(el, delay + 120)
      })
  }

  function scan() {
    scanQueued = false
    const root = rootRef.value
    if (!root || !io) return
    const fresh: HTMLElement[] = []
    root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
      if (seen.has(el)) return
      seen.add(el)
      if (el.closest(SKIP_SELECTOR)) return
      // nested panels ride along with their outer panel
      const outer = el.parentElement?.closest(REVEAL_SELECTOR)
      if (outer && root.contains(outer)) return
      fresh.push(el)
    })
    for (const el of fresh) {
      el.classList.add('reveal-wait')
      waiting.add(el)
      io.observe(el)
    }
    if (fresh.length) armFallback()
  }

  function queueScan() {
    if (scanQueued) return
    scanQueued = true
    requestAnimationFrame(scan)
  }

  // Safety net: anything on screen that the observer somehow missed is shown anyway
  function armFallback() {
    window.clearTimeout(fallbackTimer)
    fallbackTimer = window.setTimeout(() => {
      const visible = [...waiting].filter((el) => {
        if (!el.isConnected) {
          waiting.delete(el)
          return false
        }
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight
      })
      if (visible.length) reveal(visible)
    }, 2500)
  }

  /* ---- spotlight ---- */
  function setSpot(card: HTMLElement | null) {
    if (spotCard && spotCard !== card) spotCard.classList.remove('is-spotlit')
    spotCard = card
    card?.classList.add('is-spotlit')
  }

  function paintSpot() {
    spotFrame = 0
    const e = lastPointer
    if (!e) return
    const target = e.target instanceof Element ? e.target : null
    const card = target?.closest<HTMLElement>('.card') ?? null
    if (!card || card.offsetHeight > SPOTLIGHT_MAX_HEIGHT || card.closest(SKIP_SELECTOR)) {
      setSpot(null)
      return
    }
    const r = card.getBoundingClientRect()
    card.style.setProperty('--spot-x', `${Math.round(e.clientX - r.left)}px`)
    card.style.setProperty('--spot-y', `${Math.round(e.clientY - r.top)}px`)
    setSpot(card)
  }

  function onPointerMove(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || !motionAllowed()) return
    lastPointer = e
    if (!spotFrame) spotFrame = requestAnimationFrame(paintSpot)
  }

  function onPointerLeave() {
    lastPointer = null
    setSpot(null)
  }

  onMounted(() => {
    const root = rootRef.value
    if (!root || !motionAllowed()) return

    root.addEventListener('pointermove', onPointerMove, { passive: true })
    root.addEventListener('pointerleave', onPointerLeave)

    if (typeof IntersectionObserver === 'undefined' || typeof MutationObserver === 'undefined') return
    io = new IntersectionObserver(
      (entries) => {
        const batch = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement)
        if (batch.length) reveal(batch)
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    )
    mo = new MutationObserver(queueScan)
    mo.observe(root, { childList: true, subtree: true })
    scan()
  })

  onBeforeUnmount(() => {
    const root = rootRef.value
    root?.removeEventListener('pointermove', onPointerMove)
    root?.removeEventListener('pointerleave', onPointerLeave)
    if (spotFrame) cancelAnimationFrame(spotFrame)
    window.clearTimeout(fallbackTimer)
    io?.disconnect()
    mo?.disconnect()
    io = null
    mo = null
    waiting.clear()
  })
}
