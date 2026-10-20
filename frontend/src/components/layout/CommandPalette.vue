<template>
  <!-- the header's "跳转到…" field: a button that opens the palette, with its shortcut -->
  <button type="button" class="jump-trigger" :aria-label="t('jump.open')" @click="openPalette">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" stroke-linecap="round" />
    </svg>
    <span class="jump-trigger-text">{{ t('jump.trigger') }}</span>
    <kbd>{{ shortcutLabel }}</kbd>
  </button>

  <Teleport to="body">
    <Transition name="jump">
      <div v-if="open" class="jump-scrim" @pointerdown.self="close()">
        <div class="jump-panel" role="dialog" aria-modal="true" :aria-label="t('jump.open')" @keydown="onKeydown">
          <div class="jump-input">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4 4" stroke-linecap="round" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              :placeholder="t('jump.placeholder')"
              :aria-label="t('jump.placeholder')"
              role="combobox"
              aria-expanded="true"
              aria-controls="jump-results"
              :aria-activedescendant="activeId"
              autocomplete="off"
              spellcheck="false"
            />
            <kbd>Esc</kbd>
          </div>

          <div id="jump-results" ref="listRef" class="jump-list" role="listbox">
            <template v-for="section in sections" :key="section.title">
              <p class="jump-section">{{ section.title }}</p>
              <button
                v-for="item in section.items"
                :id="`jump-${item.index}`"
                :key="item.id"
                type="button"
                role="option"
                class="jump-item"
                :class="{ 'is-active': item.index === active }"
                :aria-selected="item.index === active"
                @mousemove="active = item.index"
                @click="run(item)"
              >
                <span class="jump-item-icon" :style="item.swatch ? { background: item.swatch } : undefined">
                  <svg v-if="!item.swatch" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path v-if="item.kind === 'page'" d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                    <path v-else d="M12 3v2m0 14v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M3 12h2m14 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" stroke-linecap="round" />
                  </svg>
                </span>
                <span class="jump-item-label">{{ item.label }}</span>
                <span class="jump-item-hint">{{ item.hint }}</span>
              </button>
            </template>
            <p v-if="!flat.length" class="jump-empty">{{ t('jump.empty', { q: query.trim() }) }}</p>
          </div>

          <p class="jump-foot">{{ t('jump.hint') }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { navIndex } from '@/composables/useNavIndex'
import { useAppearance } from '@/composables/useAppearance'

interface JumpItem {
  id: string
  kind: 'page' | 'action'
  label: string
  hint: string
  swatch?: string
  run: () => void
  index: number
}

const { t } = useI18n()
const router = useRouter()
const { isDark, palette, palettes, setColorMode, setPalette } = useAppearance()

const open = ref(false)
const query = ref('')
const active = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
const shortcutLabel = isMac ? '⌘K' : 'Ctrl K'

function matches(text: string, q: string) {
  return text.toLowerCase().includes(q)
}

const sections = computed(() => {
  const q = query.value.trim().toLowerCase()
  let index = 0
  const pages: JumpItem[] = navIndex.value
    .filter((e) => !q || matches(e.label, q) || matches(e.path, q) || matches(e.group, q))
    .map((e) => ({
      id: `p:${e.path}`,
      kind: 'page' as const,
      label: e.label,
      hint: e.group,
      run: () => void router.push(e.path),
      index: 0
    }))

  const actions: JumpItem[] = [
    {
      id: 'a:mode',
      kind: 'action' as const,
      label: isDark.value ? t('jump.toLight') : t('jump.toDark'),
      hint: t('jump.appearance'),
      run: () => setColorMode(isDark.value ? 'light' : 'dark'),
      index: 0
    },
    ...palettes
      .filter((p) => p.id !== palette.value)
      .map((p) => ({
        id: `a:palette:${p.id}`,
        kind: 'action' as const,
        label: t('jump.usePalette', { name: t(`appearance.palettes.${p.id}.name`) }),
        hint: t('jump.appearance'),
        swatch: `linear-gradient(135deg, ${p.signal[0]}, ${p.signal[1]} 55%, ${p.signal[2]})`,
        run: () => setPalette(p.id),
        index: 0
      }))
  ].filter((a) => !q || matches(a.label, q) || matches(a.hint, q))

  const out: { title: string; items: JumpItem[] }[] = []
  if (pages.length) out.push({ title: t('jump.pages'), items: pages })
  if (actions.length) out.push({ title: t('jump.actions'), items: actions })
  for (const s of out) for (const item of s.items) item.index = index++
  return out
})

const flat = computed(() => sections.value.flatMap((s) => s.items))
const activeId = computed(() => (flat.value.length ? `jump-${active.value}` : undefined))

watch(query, () => {
  active.value = 0
})

let returnFocus: HTMLElement | null = null

function openPalette() {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  open.value = true
  query.value = ''
  active.value = 0
  void nextTick(() => inputRef.value?.focus())
}

function close(restoreFocus = true) {
  open.value = false
  if (restoreFocus) returnFocus?.focus({ preventScroll: true })
  returnFocus = null
}

function run(item: JumpItem) {
  // the destination page takes focus itself
  close(false)
  item.run()
}

function scrollActiveIntoView() {
  void nextTick(() => {
    listRef.value?.querySelector<HTMLElement>(`#jump-${active.value}`)?.scrollIntoView({ block: 'nearest' })
  })
}

function onKeydown(e: KeyboardEvent) {
  // keys pressed while a Chinese / Japanese input method is composing belong to the IME:
  // Enter there commits the pinyin, it must not open the first result
  if (e.isComposing || e.keyCode === 229) return
  const n = flat.value.length
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  } else if (e.key === 'ArrowDown' && n) {
    e.preventDefault()
    active.value = (active.value + 1) % n
    scrollActiveIntoView()
  } else if (e.key === 'ArrowUp' && n) {
    e.preventDefault()
    active.value = (active.value - 1 + n) % n
    scrollActiveIntoView()
  } else if (e.key === 'Enter' && n) {
    e.preventDefault()
    const item = flat.value[active.value]
    if (item) run(item)
  }
}

// ⌘K / Ctrl+K from anywhere in the console
function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (open.value) close()
    else openPalette()
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<style scoped>
.jump-trigger {
  display: flex;
  align-items: center;
  gap: 9px;
  width: min(300px, 34vw);
  height: 38px;
  padding: 0 8px 0 12px;
  border-radius: 11px;
  font-size: 13px;
  color: rgb(var(--c-gray-500));
  background: rgb(var(--c-gray-100) / 0.7);
  box-shadow: inset 0 0 0 1px var(--hairline);
  transition:
    box-shadow 0.2s var(--ease-out),
    background-color 0.2s var(--ease-out),
    color 0.2s var(--ease-out);
}

.jump-trigger:hover {
  color: rgb(var(--c-gray-700));
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
}

.dark .jump-trigger {
  color: rgb(var(--c-dark-400));
  background: rgb(255 255 255 / 0.035);
}

.dark .jump-trigger:hover {
  color: rgb(var(--c-dark-200));
  background: rgb(255 255 255 / 0.055);
}

.jump-trigger svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.jump-trigger-text {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

kbd {
  flex-shrink: 0;
  padding: 2px 6px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 10.5px;
  font-weight: 600;
  line-height: 1.4;
  color: inherit;
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
}

/* ---------- palette ---------- */
.jump-scrim {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  justify-content: center;
  padding: 12vh 16px 16px;
  background: rgb(0 0 0 / 0.45);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

.jump-panel {
  display: flex;
  flex-direction: column;
  width: min(620px, 100%);
  max-height: min(560px, 76vh);
  overflow: hidden;
  border-radius: 18px;
  background: rgb(255 255 255 / 0.98);
  border: 1px solid rgb(var(--c-gray-200));
  box-shadow: var(--shadow-pop);
}

.dark .jump-panel {
  background: rgb(var(--c-dark-900) / 0.97);
  border-color: rgb(255 255 255 / 0.09);
}

.jump-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--hairline);
  color: rgb(var(--c-gray-400));
}

.jump-input svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.jump-input input {
  flex: 1 1 auto;
  min-width: 0;
  border: 0;
  outline: 0;
  background: none;
  font-size: 15px;
  color: rgb(var(--c-gray-950));
}

.dark .jump-input input {
  color: #fff;
}

.jump-input input:focus-visible {
  box-shadow: none;
}

.jump-list {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 6px 8px 8px;
}

.jump-section {
  margin: 10px 10px 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgb(var(--c-gray-400));
}

.dark .jump-section {
  color: rgb(var(--c-dark-500));
}

.jump-item {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 9px 10px;
  border-radius: 11px;
  text-align: left;
  font-size: 13.5px;
  color: rgb(var(--c-gray-700));
}

.dark .jump-item {
  color: rgb(var(--c-dark-200));
}

.jump-item.is-active {
  color: rgb(var(--c-gray-950));
  background: rgb(var(--c-primary-500) / 0.1);
  box-shadow: inset 0 0 0 1px rgb(var(--c-primary-500) / 0.18);
}

.dark .jump-item.is-active {
  color: #fff;
  background: rgb(var(--c-primary-500) / 0.14);
}

.jump-item-icon {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 8px;
  color: rgb(var(--c-primary-600));
  background: rgb(var(--c-primary-500) / 0.1);
}

.dark .jump-item-icon {
  color: rgb(var(--c-primary-300));
}

.jump-item-icon svg {
  width: 14px;
  height: 14px;
}

.jump-item-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.jump-item-hint {
  flex-shrink: 0;
  font-size: 12px;
  color: rgb(var(--c-gray-400));
}

.dark .jump-item-hint {
  color: rgb(var(--c-dark-500));
}

.jump-empty {
  padding: 28px 12px;
  text-align: center;
  font-size: 13px;
  color: rgb(var(--c-gray-500));
}

.jump-foot {
  padding: 9px 16px;
  border-top: 1px solid var(--hairline);
  font-size: 11.5px;
  color: rgb(var(--c-gray-400));
}

.dark .jump-foot {
  color: rgb(var(--c-dark-500));
}

.jump-enter-active {
  transition: opacity 0.2s var(--ease-out);
}

.jump-enter-active .jump-panel {
  transition:
    transform 0.42s var(--ease-spring-soft),
    opacity 0.2s var(--ease-out);
}

.jump-leave-active,
.jump-leave-active .jump-panel {
  transition:
    opacity 0.14s ease-in,
    transform 0.14s ease-in;
}

.jump-enter-from,
.jump-leave-to {
  opacity: 0;
}

.jump-enter-from .jump-panel,
.jump-leave-to .jump-panel {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

@media (max-width: 640px) {
  .jump-trigger {
    width: 38px;
    padding: 0;
    justify-content: center;
  }

  .jump-trigger-text,
  .jump-trigger kbd {
    display: none;
  }
}
</style>
