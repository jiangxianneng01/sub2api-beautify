<template>
  <!-- Appearance lives behind the small orb in the header: palettes shown as preview cards -->
  <div ref="rootRef" class="relative" @keydown.esc="open && close(true)">
    <button
      type="button"
      class="appearance-trigger"
      :class="{ 'is-open': open }"
      :title="t('appearance.open')"
      :aria-label="t('appearance.open')"
      :aria-expanded="open"
      aria-haspopup="dialog"
      @click="open = !open"
    >
      <span class="appearance-orb" aria-hidden="true"></span>
    </button>

    <Transition name="appearance-pop">
      <div
        v-if="open"
        class="appearance-panel"
        role="dialog"
        :aria-label="t('appearance.title')"
      >
        <div class="appearance-head">
          <p class="appearance-title">{{ t('appearance.title') }}</p>
          <span class="appearance-current">
            {{ t('appearance.current') }} · {{ t(`appearance.palettes.${palette}.name`) }}
          </span>
        </div>

        <div class="appearance-cards" role="radiogroup" :aria-label="t('appearance.palette')">
          <button
            v-for="(p, i) in palettes"
            :key="p.id"
            type="button"
            role="radio"
            class="appearance-card"
            :class="{ 'is-active': p.id === palette, 'is-wide': i === 0 }"
            :aria-checked="p.id === palette"
            :style="{ '--i': i }"
            @click="setPalette(p.id)"
          >
            <!-- a miniature console painted in that palette's own colours -->
            <span class="mini" :data-palette="p.id" aria-hidden="true">
              <span class="mini-side"><i></i><i class="on"></i><i></i><i></i><i></i></span>
              <span class="mini-main">
                <span class="mini-bar"></span>
                <span class="mini-hero"></span>
                <span class="mini-tiles"><i></i><i></i><i></i></span>
              </span>
            </span>
            <span class="appearance-card-text">
              <b>
                {{ t(`appearance.palettes.${p.id}.name`) }}
                <span v-if="p.id === DEFAULT_PALETTE" class="appearance-tag">{{ t('appearance.default') }}</span>
              </b>
              <span>{{ t(`appearance.palettes.${p.id}.desc`) }}</span>
            </span>
            <span v-if="p.id === palette" class="appearance-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2">
                <path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        <div class="appearance-row">
          <span>{{ t('appearance.mode') }}</span>
          <div class="appearance-segment" role="radiogroup" :aria-label="t('appearance.mode')">
            <span class="appearance-segment-thumb" :style="{ transform: `translateX(${modeIndex * 100}%)` }" aria-hidden="true"></span>
            <button
              v-for="m in modes"
              :key="m"
              type="button"
              role="radio"
              :aria-checked="mode === m"
              :class="{ 'is-active': mode === m }"
              @click="setColorMode(m)"
            >
              {{ t(`appearance.modes.${m}`) }}
            </button>
          </div>
        </div>

        <div class="appearance-row">
          <span :title="t('appearance.motionHint')">{{ t('appearance.motion') }}</span>
          <div class="appearance-segment" role="radiogroup" :aria-label="t('appearance.motion')">
            <span class="appearance-segment-thumb" :style="{ transform: `translateX(${motion === 'full' ? 0 : 100}%)` }" aria-hidden="true"></span>
            <button
              v-for="m in motions"
              :key="m"
              type="button"
              role="radio"
              :aria-checked="motion === m"
              :class="{ 'is-active': motion === m }"
              @click="setMotion(m)"
            >
              {{ t(`appearance.motions.${m}`) }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DEFAULT_PALETTE, useAppearance, type ColorMode, type MotionLevel } from '@/composables/useAppearance'

const { t } = useI18n()
const { palette, mode, motion, palettes, setPalette, setColorMode, setMotion } = useAppearance()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const modes: ColorMode[] = ['dark', 'light', 'system']
const motions: MotionLevel[] = ['full', 'reduced']
const modeIndex = computed(() => modes.indexOf(mode.value))

function close(returnFocus = false) {
  open.value = false
  if (returnFocus) rootRef.value?.querySelector<HTMLButtonElement>('.appearance-trigger')?.focus()
}

function onPointerDown(e: PointerEvent) {
  if (open.value && rootRef.value && !rootRef.value.contains(e.target as Node)) close()
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>

<style scoped>
.appearance-trigger {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  transition: background-color 0.2s var(--ease-out);
}

.appearance-trigger:hover,
.appearance-trigger.is-open {
  background: rgb(var(--c-gray-100));
}

.dark .appearance-trigger:hover,
.dark .appearance-trigger.is-open {
  background: rgb(255 255 255 / 0.06);
}

/* the orb: a small lit sphere in the current palette */
.appearance-orb {
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background: radial-gradient(circle at 35% 30%, rgb(var(--signal-a)), rgb(var(--signal-b)) 60%, rgb(var(--signal-c)));
  box-shadow:
    inset 0 1px 1px rgb(255 255 255 / 0.45),
    0 0 12px -1px rgb(var(--signal-b) / 0.75);
  transition: transform 0.45s var(--ease-spring);
}

.appearance-trigger:hover .appearance-orb,
.appearance-trigger.is-open .appearance-orb {
  transform: scale(1.12);
}

.appearance-trigger:active .appearance-orb {
  transform: scale(0.9);
}

/* ---------- panel ---------- */
.appearance-panel {
  position: absolute;
  right: -0.5rem;
  top: calc(100% + 0.9rem);
  z-index: 50;
  width: min(28.5rem, calc(100vw - 1.5rem));
  padding: 1rem;
  border-radius: 1.25rem;
  transform-origin: top right;
  background: rgb(255 255 255 / 0.98);
  border: 1px solid rgb(var(--c-gray-200));
  box-shadow: var(--shadow-pop);
}

.dark .appearance-panel {
  background: rgb(var(--c-dark-900) / 0.985);
  border-color: rgb(255 255 255 / 0.1);
}

.appearance-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.appearance-title {
  font-size: 0.9375rem;
  font-weight: 650;
  color: rgb(var(--c-gray-950));
}

.dark .appearance-title {
  color: #fff;
}

.appearance-current {
  font-size: 0.75rem;
  color: rgb(var(--c-gray-500));
}

.dark .appearance-current {
  color: rgb(var(--c-dark-400));
}

/* ---------- palette cards ---------- */
.appearance-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.625rem;
}

.appearance-card {
  position: relative;
  display: grid;
  gap: 0.45rem;
  padding: 0.375rem 0.375rem 0.55rem;
  border-radius: 0.875rem;
  text-align: left;
  border: 1px solid var(--hairline);
  background: rgb(var(--c-gray-50) / 0.6);
  transition:
    border-color 0.25s var(--ease-out),
    box-shadow 0.3s var(--ease-out),
    transform 0.45s var(--ease-spring);
  animation: card-in 0.42s var(--ease-out) backwards;
  animation-delay: calc(var(--i) * 26ms);
}

.dark .appearance-card {
  background: rgb(255 255 255 / 0.02);
}

.appearance-card:hover {
  transform: translateY(-2px);
  border-color: var(--hairline-strong);
  box-shadow: 0 16px 30px -18px rgb(0 0 0 / 0.6);
}

.appearance-card:active {
  transform: scale(0.98);
}

.appearance-card.is-active {
  border-color: rgb(var(--signal-b) / 0.7);
  box-shadow:
    0 0 0 3px rgb(var(--signal-b) / 0.14),
    0 16px 34px -18px rgb(var(--signal-b) / 0.5);
}

.appearance-card.is-wide {
  grid-column: 1 / -1;
  grid-template-columns: 1.35fr 1fr;
  align-items: center;
  gap: 0.875rem;
  padding-right: 0.75rem;
}

.appearance-card-text b {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding-left: 0.2rem;
  font-size: 0.8125rem;
  font-weight: 650;
  color: rgb(var(--c-gray-900));
}

.dark .appearance-card-text b {
  color: rgb(var(--c-dark-50));
}

.appearance-card-text > span {
  display: block;
  margin-top: 0.125rem;
  padding-left: 0.2rem;
  font-size: 0.6875rem;
  line-height: 1.35;
  color: rgb(var(--c-gray-500));
}

.dark .appearance-card-text > span {
  color: rgb(var(--c-dark-400));
}

.appearance-tag {
  padding: 0 0.375rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 650;
  color: rgb(var(--c-primary-600));
  background: rgb(var(--c-primary-500) / 0.12);
  box-shadow: inset 0 0 0 1px rgb(var(--c-primary-500) / 0.25);
}

.dark .appearance-tag {
  color: rgb(var(--signal-a));
}

.appearance-check {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  display: grid;
  place-items: center;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 9999px;
  color: rgb(28 18 6);
  background: rgb(var(--signal-a));
  box-shadow: 0 0 0 2px rgb(var(--c-dark-950));
  animation: check-in 0.4s var(--ease-spring) backwards;
}

.appearance-card.is-wide .appearance-check {
  right: auto;
  left: calc(57% - 1.9rem);
}

.appearance-check svg {
  width: 0.7rem;
  height: 0.7rem;
}

/* the miniature console */
.mini {
  position: relative;
  display: grid;
  grid-template-columns: 26% 1fr;
  gap: 4px;
  height: 74px;
  padding: 5px;
  overflow: hidden;
  border-radius: 10px;
  background:
    radial-gradient(90% 60% at 0% 0%, rgb(var(--signal-a) / 0.14), transparent 60%),
    rgb(var(--c-dark-950));
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.06);
}

.is-wide .mini {
  height: 92px;
}

.mini-side {
  display: grid;
  align-content: start;
  gap: 4px;
  padding: 5px 4px;
  border-radius: 6px;
  background: rgb(var(--c-dark-900));
}

.mini-side i {
  height: 4px;
  border-radius: 3px;
  background: rgb(255 255 255 / 0.12);
}

.mini-side i.on {
  background: rgb(var(--c-primary-500) / 0.5);
  box-shadow: -3px 0 0 rgb(var(--signal-a));
}

.mini-main {
  display: grid;
  grid-template-rows: 8px 1fr 14px;
  gap: 4px;
  min-width: 0;
}

.mini-bar,
.mini-hero,
.mini-tiles i {
  border-radius: 5px;
  background: rgb(var(--c-dark-900));
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.05);
}

.mini-hero {
  position: relative;
  overflow: hidden;
}

.mini-hero::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 50%;
  width: 46%;
  height: 7px;
  margin-top: -3px;
  border-radius: 4px;
  background: linear-gradient(90deg, rgb(var(--signal-a)), rgb(var(--signal-b)), rgb(var(--signal-c)));
}

.mini-hero::after {
  content: '';
  position: absolute;
  right: -14px;
  bottom: -18px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(var(--signal-b) / 0.45), transparent 70%);
}

.mini-tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.mini-tiles i {
  position: relative;
}

.mini-tiles i::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 4px;
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: rgb(var(--c-primary-500) / 0.7);
}

/* ---------- mode / motion rows ---------- */
.appearance-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--hairline);
}

.appearance-row > span {
  font-size: 0.78rem;
  color: rgb(var(--c-gray-500));
}

.dark .appearance-row > span {
  color: rgb(var(--c-dark-400));
}

.appearance-segment {
  position: relative;
  display: flex;
  padding: 3px;
  border-radius: 10px;
  background: rgb(var(--c-gray-100));
  box-shadow: inset 0 0 0 1px var(--hairline);
}

.dark .appearance-segment {
  background: rgb(0 0 0 / 0.3);
}

.appearance-segment-thumb {
  position: absolute;
  left: 3px;
  top: 3px;
  bottom: 3px;
  width: 4.5rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 2px rgb(var(--c-ink) / 0.12);
  transition: transform 0.45s var(--ease-spring);
}

.dark .appearance-segment-thumb {
  background: rgb(255 255 255 / 0.09);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.08),
    0 2px 6px rgb(0 0 0 / 0.35);
}

.appearance-segment button {
  position: relative;
  z-index: 1;
  width: 4.5rem;
  padding: 0.3rem 0;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 550;
  color: rgb(var(--c-gray-500));
  transition: color 0.2s var(--ease-out);
}

.appearance-segment button:hover,
.appearance-segment button.is-active {
  color: rgb(var(--c-gray-950));
}

.dark .appearance-segment button {
  color: rgb(var(--c-dark-400));
}

.dark .appearance-segment button:hover,
.dark .appearance-segment button.is-active {
  color: #fff;
}

/* ---------- motion ---------- */
.appearance-pop-enter-active {
  transition:
    opacity 0.2s var(--ease-out),
    transform 0.42s var(--ease-spring-soft);
}

.appearance-pop-leave-active {
  transition:
    opacity 0.14s ease-in,
    transform 0.14s ease-in;
}

.appearance-pop-enter-from,
.appearance-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

@keyframes check-in {
  from {
    transform: scale(0.2);
    opacity: 0;
  }
}

@media (max-width: 480px) {
  .appearance-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
