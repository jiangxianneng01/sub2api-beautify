<template>
  <Teleport to="body">
    <!-- the panel's slide and the content's cascade outlast the scrim's fade, so the timing is explicit -->
    <Transition name="modal" :duration="{ enter: 760, leave: 300 }" @after-enter="onAfterEnter">
      <div
        v-if="show"
        :class="['modal-overlay', { 'is-sheet': isSheet }]"
        :style="zIndexStyle"
        :aria-labelledby="dialogId"
        role="dialog"
        aria-modal="true"
        @pointerdown.self="pressedOnOverlay = true"
        @click.self="handleOverlayClick"
      >
        <!--
          Forms (a footer with actions, normal or wide) open as a sheet from the right edge —
          full height, scrolling body, actions pinned at the bottom. Confirmations and large
          data views stay centred.
        -->
        <div
          ref="dialogRef"
          :class="['modal-content', isSheet ? ['modal-sheet', sheetClass] : widthClasses, { 'is-nudge': nudging }]"
          @click.stop
          @pointerup="pressedOnOverlay = false"
          @pointermove="onPanelPointer"
          @pointerleave="onPanelLeave"
        >
          <span v-if="isSheet" class="modal-grabber" aria-hidden="true"></span>

          <!-- Header (on a phone, drag it down to close the sheet) -->
          <div class="modal-header" @pointerdown="onHeaderPointerDown">
            <div class="modal-heading">
              <span v-if="headerIcon" class="modal-icon" :class="`is-${action}`" aria-hidden="true">
                <Icon :name="headerIcon" size="sm" :stroke-width="2" />
              </span>
              <div class="modal-heading-text">
                <h3 :id="dialogId" class="modal-title">
                  {{ title }}
                </h3>
                <p v-if="description" class="modal-description">{{ description }}</p>
              </div>
            </div>
            <button
              v-if="showCloseButton"
              @click="emit('close')"
              class="modal-close"
              aria-label="Close modal"
            >
              <Icon name="x" size="md" />
            </button>
          </div>

          <!-- Body -->
          <div
            ref="modalBodyRef"
            class="modal-body"
            @focusin="onBodyFocus"
            @focusout="onBodyBlur"
            @input="onBodyEdited"
            @change="onBodyEdited"
          >
            <span v-if="isSheet" ref="railRef" class="modal-focus-rail" aria-hidden="true"></span>
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="modal-footer">
            <span v-if="isSheet && closeOnEscape" class="modal-footer-hint" aria-hidden="true"><kbd>Esc</kbd></span>
            <div class="modal-footer-actions">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
let dialogIdCounter = 0
const openDialogs = new Set<string>()
// side sheets currently open: while any is, the page behind recedes (scales back and dims)
const openSheets = new Set<string>()
</script>

<script setup lang="ts">
import { computed, getCurrentInstance, watch, onMounted, onUnmounted, ref, nextTick, useSlots } from 'vue'
import Icon from '@/components/icons/Icon.vue'

const slots = useSlots()

// 生成唯一ID以避免多个对话框时ID冲突
const dialogId = `modal-title-${++dialogIdCounter}`

// 焦点管理
const dialogRef = ref<HTMLElement | null>(null)
const modalBodyRef = ref<HTMLElement | null>(null)
const railRef = ref<HTMLElement | null>(null)
let previousActiveElement: HTMLElement | null = null

type DialogWidth = 'narrow' | 'normal' | 'wide' | 'extra-wide' | 'full'
type DialogLayout = 'auto' | 'sheet' | 'center'

interface Props {
  show: boolean
  title: string
  /** one line under the title */
  description?: string
  width?: DialogWidth
  /** 'auto': forms (footer + normal/wide) open as a side sheet, everything else centred */
  layout?: DialogLayout
  closeOnEscape?: boolean
  /** clicking the dimmed area closes the dialog; sheets do unless this is set to false */
  closeOnClickOutside?: boolean
  showCloseButton?: boolean
  zIndex?: number
}

interface Emits {
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  width: 'normal',
  layout: 'auto',
  closeOnEscape: true,
  closeOnClickOutside: false,
  showCloseButton: true,
  zIndex: 50
})

const emit = defineEmits<Emits>()

// Whether the caller set close-on-click-outside at all (a Boolean prop that is absent reads false)
const rawProps = (getCurrentInstance()?.vnode.props ?? {}) as Record<string, unknown>
const clickOutsideExplicit = 'closeOnClickOutside' in rawProps || 'close-on-click-outside' in rawProps

// Custom z-index style (overrides the default z-50 from CSS)
const zIndexStyle = computed(() => {
  return props.zIndex !== 50 ? { zIndex: props.zIndex } : undefined
})

const widthClasses = computed(() => {
  // Width guidance: narrow=confirm/short prompts, normal=standard forms,
  // wide=multi-section forms or rich content, extra-wide=analytics/tables,
  // full=full-screen or very dense layouts.
  const widths: Record<DialogWidth, string> = {
    narrow: 'max-w-md',
    normal: 'max-w-lg',
    wide: 'w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl',
    'extra-wide': 'w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl',
    full: 'w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl'
  }
  return widths[props.width]
})

const isSheet = computed(() => {
  if (props.layout === 'sheet') return true
  if (props.layout === 'center') return false
  return !!slots.footer && (props.width === 'normal' || props.width === 'wide')
})

const sheetClass = computed(() => (props.width === 'wide' || props.width === 'extra-wide' || props.width === 'full' ? 'sheet-lg' : 'sheet-md'))

// The header says what the dialog does: a plus for creating, a pencil for editing
const action = computed<'create' | 'edit' | null>(() => {
  const text = props.title || ''
  if (/创建|新增|添加|新建|生成|导入|\b(create|add|new|generate|import)\b/i.test(text)) return 'create'
  if (/编辑|修改|更新|设置|配置|\b(edit|update|modify|configure)\b/i.test(text)) return 'edit'
  return null
})
const headerIcon = computed(() => (action.value === 'create' ? 'plus' : action.value === 'edit' ? 'edit' : null))

const closesOnOutside = computed(() => (clickOutsideExplicit ? props.closeOnClickOutside : isSheet.value || props.closeOnClickOutside))

/* ---------------------------------------------------------------- click outside */
// A press that starts and ends on the dimmed area closes; a text selection dragged out of the form
// does not, and neither does a press that starts on the dimmed area and is released on the panel
// (the click then lands on the overlay, the closest element both share)
const pressedOnOverlay = ref(false)
const nudging = ref(false)
let nudgeTimer = 0

// Something has been typed or picked in the form since it opened
let edited = false
function onBodyEdited(e: Event) {
  if (e.isTrusted) edited = true
}

const handleOverlayClick = () => {
  const pressed = pressedOnOverlay.value
  pressedOnOverlay.value = false
  if (!pressed) return
  // a sheet closes on an outside click by default, but not once the form holds the person's input:
  // a stray click would throw it away. Cancel, the close button and Esc still close it.
  const keepsInput = isSheet.value && !clickOutsideExplicit && edited
  if (closesOnOutside.value && !keepsInput) {
    emit('close')
    return
  }
  // not dismissible this way: a short shake says "finish here first"
  nudging.value = false
  window.clearTimeout(nudgeTimer)
  requestAnimationFrame(() => {
    nudging.value = true
    nudgeTimer = window.setTimeout(() => (nudging.value = false), 420)
  })
}

const handleEscape = (event: KeyboardEvent) => {
  // an Esc already handled inside the dialog (closing a dropdown, ending IME input) is not for us
  if (event.defaultPrevented || event.isComposing) return
  if (props.show && props.closeOnEscape && event.key === 'Escape' && [...openDialogs].pop() === dialogId) {
    emit('close')
  }
}

const updateScrollLock = (isOpen: boolean) => {
  if (isOpen) openDialogs.add(dialogId)
  else openDialogs.delete(dialogId)
  document.body.classList.toggle('modal-open', openDialogs.size > 0)
  updateRecede(isOpen && isSheet.value)
}

/** The page behind a side sheet steps back, the way native sheets and Vaul-style drawers do */
const updateRecede = (sheetOpen: boolean) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (sheetOpen) {
    if (!openSheets.size) root.style.setProperty('--recede-y', `${Math.round(window.scrollY + window.innerHeight / 2)}px`)
    openSheets.add(dialogId)
  } else {
    openSheets.delete(dialogId)
  }
  root.classList.toggle('sheet-recede', openSheets.size > 0)
}

/* ---------------------------------------------------------------- the cascade */
// The fields of the form arrive one after another: find the level of the body that holds them
let cascadeItems: HTMLElement[] = []

function cascadeContainer(body: HTMLElement): HTMLElement {
  let el: HTMLElement = body
  for (let depth = 0; depth < 4; depth++) {
    const kids = Array.from(el.children).filter((c) => !(c as HTMLElement).classList.contains('modal-focus-rail')) as HTMLElement[]
    if (kids.length !== 1) break
    const only = kids[0]
    if (/^(INPUT|SELECT|TEXTAREA|BUTTON|TABLE)$/.test(only.tagName) || only.children.length === 0) break
    el = only
  }
  return el
}

function startCascade() {
  const body = modalBodyRef.value
  if (!body) return
  const container = cascadeContainer(body)
  cascadeItems = (Array.from(container.children) as HTMLElement[]).filter((c) => !c.classList.contains('modal-focus-rail'))
  cascadeItems.slice(0, 18).forEach((el, i) => {
    el.style.setProperty('--i', String(i))
    el.classList.add('modal-cascade')
  })
}

/* ---------------------------------------------------------------- focus rail */
// A gold bar in the gutter glides to the field being filled in
function fieldFor(target: HTMLElement): HTMLElement | null {
  const hit = cascadeItems.find((el) => el.contains(target))
  if (!hit) return null
  // inside a two-column row, point at the field itself rather than the whole row
  let el: HTMLElement = target
  while (el.parentElement && el.parentElement !== hit) {
    const parent: HTMLElement = el.parentElement
    if (parent.querySelector(':scope > .input-label, :scope > label')) return parent
    el = parent
  }
  return hit
}

function onBodyFocus(e: FocusEvent) {
  const rail = railRef.value
  const body = modalBodyRef.value
  if (!rail || !body || !(e.target instanceof HTMLElement)) return
  const field = fieldFor(e.target)
  if (!field) return
  const b = body.getBoundingClientRect()
  const f = field.getBoundingClientRect()
  rail.style.setProperty('--rail-y', `${f.top - b.top + body.scrollTop}px`)
  rail.style.setProperty('--rail-h', `${Math.max(24, f.height)}px`)
  rail.classList.add('is-on')
}

function onBodyBlur(e: FocusEvent) {
  const next = e.relatedTarget as Node | null
  if (next && modalBodyRef.value?.contains(next)) return
  railRef.value?.classList.remove('is-on')
}

/* ---------------------------------------------------------------- pointer light */
let lightFrame = 0
function onPanelPointer(e: PointerEvent) {
  if (!isSheet.value || e.pointerType !== 'mouse') return
  const el = dialogRef.value
  if (!el || lightFrame) return
  const x = e.clientX
  const y = e.clientY
  lightFrame = requestAnimationFrame(() => {
    lightFrame = 0
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${x - r.left}px`)
    el.style.setProperty('--my', `${y - r.top}px`)
    el.style.setProperty('--spot', '1')
  })
}

function onPanelLeave() {
  dialogRef.value?.style.setProperty('--spot', '0')
}

/* ---------------------------------------------------------------- swipe down (phones) */
let drag: { y: number; id: number } | null = null
const phoneQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(max-width: 639px)') : null

function onHeaderPointerDown(e: PointerEvent) {
  if (!isSheet.value || !phoneQuery?.matches || e.button > 0) return
  if ((e.target as HTMLElement).closest('button, a, input')) return
  drag = { y: e.clientY, id: e.pointerId }
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onDragEnd)
  window.addEventListener('pointercancel', onDragEnd)
}

function onDragMove(e: PointerEvent) {
  const el = dialogRef.value
  if (!drag || !el || e.pointerId !== drag.id) return
  const dy = Math.max(0, e.clientY - drag.y)
  el.style.transition = 'none'
  el.style.transform = `translateY(${dy}px)`
}

function onDragEnd(e: PointerEvent) {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onDragEnd)
  window.removeEventListener('pointercancel', onDragEnd)
  const el = dialogRef.value
  const start = drag
  drag = null
  if (!el || !start) return
  const dy = Math.max(0, e.clientY - start.y)
  el.style.transition = 'transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1)'
  if (dy > Math.min(140, el.offsetHeight * 0.22)) {
    el.style.transform = 'translateY(105%)'
    window.setTimeout(() => {
      el.style.transition = ''
      el.style.transform = ''
      emit('close')
    }, 240)
  } else {
    el.style.transform = ''
    window.setTimeout(() => (el.style.transition = ''), 280)
  }
}

/* ---------------------------------------------------------------- open / close */
function onAfterEnter() {
  // the cascade has played; later fields (shown by v-if) simply appear
  window.setTimeout(() => {
    for (const el of cascadeItems) el.classList.remove('modal-cascade')
  }, 900)
}

// Prevent body scroll when modal is open and manage focus
watch(
  () => props.show,
  async (isOpen) => {
    if (isOpen) {
      edited = false
      // 保存当前焦点元素
      previousActiveElement = document.activeElement as HTMLElement
      // 使用CSS类而不是直接操作style,更易于管理多个对话框
      updateScrollLock(true)

      // 等待DOM更新后设置焦点到对话框
      await nextTick()
      if (modalBodyRef.value) {
        modalBodyRef.value.scrollTop = 0
      }
      startCascade()
      if (dialogRef.value) {
        // with a mouse, start in the first field; on touch, do not pop the keyboard up
        const finePointer = typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: fine)').matches
        const firstField = finePointer && isSheet.value
          ? modalBodyRef.value?.querySelector<HTMLElement>('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])')
          : null
        const firstFocusable = firstField ?? dialogRef.value.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus({ preventScroll: true })
      }
    } else {
      updateScrollLock(false)
      cascadeItems = []
      // 恢复之前的焦点
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus()
      }
      previousActiveElement = null
    }
  },
  { immediate: true }
)

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onDragEnd)
  window.removeEventListener('pointercancel', onDragEnd)
  window.clearTimeout(nudgeTimer)
  if (lightFrame) cancelAnimationFrame(lightFrame)
  // 确保组件卸载时移除滚动锁定
  updateScrollLock(false)
})
</script>
