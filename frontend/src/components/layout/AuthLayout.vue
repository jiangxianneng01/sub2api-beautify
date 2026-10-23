<template>
  <!--
    Sign-in and its siblings are a full-screen page: the dialog card floats beside the
    quantum core (night sky without WebGL 2). The popup variant, drawn over the page it
    was opened from, only appears when AUTH_POPUP_ENABLED is on in router/authOverlay.ts.
  -->
  <div
    ref="rootRef"
    class="auth dark"
    :class="{ 'auth--overlay': overlay, 'auth--quantum': !overlay && quantumOk, 'auth--swap': swapped, 'is-closing': closing }"
    role="presentation"
  >
    <!-- the full page: an AI core of quantum particles beside the card (night sky without WebGL) -->
    <AuthQuantumBackdrop
      v-if="!overlay && quantumOk"
      :host="rootRef"
      :shield="dialogRef"
      :word="siteName"
      @ready="onQuantumReady"
    />
    <div v-else-if="!overlay" class="auth-sky" aria-hidden="true"></div>

    <div class="auth-stage" @click.self="onScrimClick">
      <section
        ref="dialogRef"
        class="auth-dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="siteName"
        tabindex="-1"
      >
        <header class="auth-dialog-head">
          <router-link
            v-if="settingsLoaded"
            to="/home"
            class="auth-brand"
            :aria-label="siteName"
          >
            <BrandLogo :src="siteLogo" class="h-8 w-8 shrink-0 rounded-[9px]" />
            <BrandWordmark v-if="usesBrandWordmark" class="auth-wordmark" :decorative="true" />
            <span v-else class="min-w-0 truncate">{{ siteName }}</span>
          </router-link>
          <button type="button" class="auth-close" :aria-label="t('common.close')" :title="t('common.close')" @click="close">
            <Icon name="x" size="sm" :stroke-width="2" />
          </button>
        </header>

        <!-- sign in ⇄ create account, without leaving the dialog -->
        <nav v-if="showTabs" class="auth-tabs" :aria-label="t('auth.switchForm')">
          <span class="auth-tabs-thumb" :class="{ 'is-right': onRegister }" aria-hidden="true"></span>
          <router-link :to="{ path: '/login', query: route.query }" replace class="auth-tab" :class="{ 'is-on': !onRegister }" :aria-current="!onRegister ? 'page' : undefined">
            {{ t('home.login') }}
          </router-link>
          <router-link :to="{ path: '/register', query: route.query }" replace class="auth-tab" :class="{ 'is-on': onRegister }" :aria-current="onRegister ? 'page' : undefined">
            {{ t('auth.createAccount') }}
          </router-link>
        </nav>

        <div class="auth-form">
          <slot />

          <div class="auth-form-footer">
            <slot name="footer" />
          </div>
        </div>
      </section>

      <p v-if="!overlay" class="auth-stage-foot">&copy; {{ currentYear }} {{ siteName }}. All rights reserved.</p>
    </div>
  </div>
</template>

<script lang="ts">
// Set when a dialog closes; a dialog mounting right after is a switch (login ⇄ register),
// so the scrim and the pop-in are not replayed.
let lastUnmountAt = 0
</script>

<script setup lang="ts">
import BrandWordmark from '@/components/brand/BrandWordmark.vue'
import BrandLogo from '@/components/brand/BrandLogo.vue'
import AuthQuantumBackdrop from '@/components/auth/AuthQuantumBackdrop.vue'
import { quantumSupported } from '@/lib/quantum/quantumField'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'
import { closeAuthOverlay, isAuthOverlay, leaveAuthPage } from '@/router/authOverlay'
import { motionAllowed } from '@/composables/useAppearance'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const appStore = useAppStore()

// the tabs only make sense on the two forms; flows like reset password keep the dialog quiet
const showTabs = computed(() => (route.path === '/login' || route.path === '/register') && appStore.cachedPublicSettings?.registration_enabled !== false)
const onRegister = computed(() => route.path === '/register')

const siteName = computed(() => appStore.siteName || 'JLAi')
const usesBrandWordmark = computed(() => siteName.value.trim().toLowerCase() === 'jlai')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const settingsLoaded = computed(() => appStore.publicSettingsLoaded)
const currentYear = computed(() => new Date().getFullYear())

const overlay = isAuthOverlay
const swapped = performance.now() - lastUnmountAt < 120
const dialogRef = ref<HTMLElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)

// the particle core runs where WebGL 2 does; otherwise the static night sky
const quantumOk = ref(quantumSupported())
function onQuantumReady(on: boolean) {
  if (!on) quantumOk.value = false
}

// The page underneath stays rendered but must be out of reach: no Tab into it, no screen reader
let inerted: Element[] = []
function setUnderlayInert(on: boolean) {
  if (!on) {
    for (const el of inerted) el.removeAttribute('inert')
    inerted = []
    return
  }
  let sib = rootRef.value?.previousElementSibling ?? null
  while (sib) {
    if (!sib.hasAttribute('inert')) {
      sib.setAttribute('inert', '')
      inerted.push(sib)
    }
    sib = sib.previousElementSibling
  }
}

// Closing returns to the page underneath (popup, after a short exit); the full page steps
// back to the public page it was opened from, or goes to the landing page
const closing = ref(false)
function close() {
  if (closing.value) return
  if (!overlay.value) {
    void leaveAuthPage(router)
    return
  }
  if (!motionAllowed()) {
    void closeAuthOverlay(router)
    return
  }
  closing.value = true
  window.setTimeout(() => {
    void closeAuthOverlay(router).finally(() => {
      closing.value = false
    })
  }, 170)
}

// A press that starts and ends on the dim backdrop closes the popup;
// a text selection dragged out of the form does not.
let pressedOnScrim = false
function onScrimPointerDown(e: PointerEvent) {
  pressedOnScrim = (e.target as HTMLElement).classList.contains('auth-stage')
}
function onScrimClick() {
  if (overlay.value && pressedOnScrim) close()
  pressedOnScrim = false
}

function onKeydown(e: KeyboardEvent) {
  // an Esc that closed a dropdown, or that ended input-method composition, is not for the dialog
  if (e.key === 'Escape' && !e.defaultPrevented && !e.isComposing) close()
}

// The page underneath must not scroll while the popup is open
function lockScroll(lock: boolean) {
  const root = document.documentElement
  if (lock) {
    const gap = window.innerWidth - root.clientWidth
    root.style.setProperty('--auth-scrollbar-gap', `${Math.max(0, gap)}px`)
    root.classList.add('auth-overlay-open')
  } else {
    root.classList.remove('auth-overlay-open')
    root.style.removeProperty('--auth-scrollbar-gap')
  }
}

onMounted(() => {
  appStore.fetchPublicSettings()
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onScrimPointerDown, true)
  if (overlay.value) {
    lockScroll(true)
    setUnderlayInert(true)
    // Move focus into the dialog unless a field already autofocused itself
    void nextTick(() => {
      if (!dialogRef.value?.contains(document.activeElement)) dialogRef.value?.focus({ preventScroll: true })
    })
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onScrimPointerDown, true)
  lockScroll(false)
  setUnderlayInert(false)
  lastUnmountAt = performance.now()
})
</script>

<style scoped>
.auth-wordmark {
  height: 15px;
  width: auto;
  color: #fff;
}

.auth {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  background: #000;
  color: #fff4ec;
  isolation: isolate;
}

/* the same night as the landing page: a scatter of stars and the Sun's glow below the horizon */
.auth-sky {
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image:
    radial-gradient(1px 1px at 8% 14%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 18% 36%, #ffe9d2 50%, transparent 51%),
    radial-gradient(1px 1px at 29% 9%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 37% 28%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 46% 52%, #dfe8ff 50%, transparent 51%),
    radial-gradient(1px 1px at 55% 17%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 63% 41%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 71% 7%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 78% 30%, #ffe9d2 50%, transparent 51%),
    radial-gradient(1px 1px at 86% 48%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 93% 21%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 24% 58%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 60% 60%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 12% 47%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 90% 64%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 41% 68%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 74% 55%, #ffe9d2 50%, transparent 51%),
    radial-gradient(1px 1px at 5% 70%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 52% 36%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 33% 44%, #dfe8ff 50%, transparent 51%),
    radial-gradient(1px 1px at 82% 14%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 20% 82%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 68% 78%, #fff 50%, transparent 51%),
    radial-gradient(120% 55% at 50% 118%, rgb(var(--signal-b) / 0.42) 0%, rgb(var(--c-primary-500) / 0.16) 35%, transparent 70%),
    #000;
  animation: auth-sky-in 1.4s ease-out both;
}

.auth-stage {
  display: flex;
  min-height: 100vh;
  min-height: 100svh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem 1.5rem;
}

@media (min-width: 640px) {
  .auth-stage {
    padding: 3rem 2rem 2rem;
  }
}

/* the full page with the particle core: on wide screens the core takes the left, the card the right */
@media (min-width: 1080px) {
  .auth--quantum .auth-stage {
    align-items: flex-end;
    padding-right: max(4rem, 9vw);
  }

  .auth--quantum .auth-stage-foot {
    align-self: flex-end;
    width: min(100%, 27rem);
    text-align: center;
  }
}

/* ---------- popup over the page it was opened from ---------- */
.auth--overlay {
  position: fixed;
  inset: 0;
  z-index: 70;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: rgb(0 0 0 / 0.32);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  animation: auth-scrim-in 0.32s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.auth--overlay .auth-stage {
  min-height: 100%;
  cursor: default;
}

.auth--overlay .auth-dialog {
  animation-duration: 0.5s;
}

/* closing: the dialog drops back and the scrim clears before the route changes */
.auth--overlay.is-closing {
  pointer-events: none;
  animation: auth-scrim-out 0.18s ease-in forwards;
}

.auth--overlay.is-closing .auth-dialog {
  animation: auth-dialog-out 0.18s ease-in forwards;
}

/* login ⇄ register inside the popup: keep the scrim, just let the new form settle in */
.auth--swap {
  animation: none;
}

.auth--swap .auth-dialog {
  animation: auth-dialog-swap 0.28s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

/* ---------- the dialog: clear glass over whatever is behind it ---------- */
.auth-dialog {
  position: relative;
  isolation: isolate;
  width: min(100%, 27rem);
  border-radius: 1.75rem;
  color: #fff;
  background: linear-gradient(160deg, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0.035) 45%, rgb(255 255 255 / 0.06));
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  backdrop-filter: blur(30px) saturate(180%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.28),
    inset 0 0 0 1px rgb(255 255 255 / 0.1),
    0 40px 120px -30px rgb(0 0 0 / 0.85),
    0 0 120px -50px rgb(var(--signal-a) / 0.5);
  animation: auth-dialog-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* light catching the rim: bright at the top left, warm at the bottom right */
.auth-dialog::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  padding: 1px;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(140deg, rgb(255 255 255 / 0.55), rgb(255 255 255 / 0.06) 35%, rgb(255 255 255 / 0.02) 60%, rgb(var(--signal-a) / 0.45));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .auth-dialog {
    background: rgb(var(--c-dark-900) / 0.96);
  }
}

/* ---------- login / register tabs ---------- */
.auth-tabs {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1.1rem 1.5rem 0;
  padding: 4px;
  border-radius: 14px;
  background: rgb(0 0 0 / 0.22);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.07);
}

.auth-tabs-thumb {
  position: absolute;
  left: 4px;
  top: 4px;
  bottom: 4px;
  width: calc(50% - 4px);
  border-radius: 10px;
  background: rgb(255 255 255 / 0.12);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.2),
    0 4px 12px rgb(0 0 0 / 0.3);
  transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.auth-tabs-thumb.is-right {
  transform: translateX(100%);
}

.auth-tab {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  height: 34px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(255 255 255 / 0.55);
  transition: color 0.2s;
}

.auth-tab:hover,
.auth-tab.is-on {
  color: #fff;
}

/* ---------- the form on glass: clear fields, glass secondary buttons, one solid sign-in button ---------- */
.auth-form :deep(.input) {
  color: #fff;
  background: rgb(255 255 255 / 0.05);
  border-color: transparent;
  border-radius: 13px;
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 0.12),
    inset 0 1px 2px rgb(0 0 0 / 0.2);
}

.auth-form :deep(.input:hover:not(:disabled):not(:focus)) {
  border-color: transparent;
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 0.2),
    inset 0 1px 2px rgb(0 0 0 / 0.2);
}

.auth-form :deep(.input:focus) {
  border-color: transparent;
  background: rgb(255 255 255 / 0.07);
  box-shadow:
    inset 0 0 0 1px rgb(var(--signal-a) / 0.75),
    0 0 0 4px rgb(var(--signal-a) / 0.14),
    0 0 24px -8px rgb(var(--signal-a) / 0.6);
}

.auth-form :deep(.input::placeholder) {
  color: rgb(255 255 255 / 0.35);
}

.auth-form :deep(.input-label) {
  color: rgb(255 255 255 / 0.78);
}

.auth-form :deep(.btn-primary) {
  color: rgb(28 18 6);
  border-radius: 14px;
  background:
    linear-gradient(110deg, transparent 38%, rgb(255 255 255 / 0.38) 50%, transparent 62%) 130% 0 / 260% 100% no-repeat,
    linear-gradient(180deg, rgb(255 255 255 / 0.22), rgb(255 255 255 / 0) 55%),
    rgb(var(--signal-a));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.55),
    inset 0 -2px 0 rgb(0 0 0 / 0.12),
    0 12px 32px -12px rgb(var(--signal-a) / 0.75),
    0 2px 6px rgb(0 0 0 / 0.3);
}

.auth-form :deep(.btn-primary:hover:not(:disabled)) {
  background-position: -30% 0, 0 0, 0 0;
  filter: brightness(1.05);
}

.auth-form :deep(.btn-primary .animate-spin) {
  color: rgb(28 18 6);
}

.auth-form :deep(.btn-secondary) {
  color: #fff;
  border-color: transparent;
  border-radius: 13px;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.04));
  -webkit-backdrop-filter: blur(16px) saturate(170%);
  backdrop-filter: blur(16px) saturate(170%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.3),
    inset 0 0 0 1px rgb(255 255 255 / 0.13),
    0 10px 28px -14px rgb(0 0 0 / 0.7);
}

.auth-form :deep(.btn-secondary:hover:not(:disabled)) {
  background: linear-gradient(180deg, rgb(255 255 255 / 0.2), rgb(255 255 255 / 0.07));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.38),
    inset 0 0 0 1px rgb(255 255 255 / 0.22),
    0 14px 32px -14px rgb(var(--signal-a) / 0.4);
}

.auth-dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.1rem 0 1.5rem;
}

.auth-brand {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: rgb(var(--c-gray-950));
}

.dark .auth-brand {
  color: #fff;
}

.auth-close {
  display: inline-grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 9999px;
  color: rgb(var(--c-gray-500));
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.2s;
}

.auth-close:hover {
  background: rgb(var(--c-gray-100));
  color: rgb(var(--c-gray-950));
}

.auth-close:active {
  transform: scale(0.94);
}

.dark .auth-close {
  color: rgb(var(--c-dark-400));
}

.dark .auth-close:hover {
  background: rgb(var(--c-dark-800));
  color: #fff;
}

.auth-form {
  padding: 1.5rem 1.5rem 1.75rem;
}

@media (min-width: 640px) {
  .auth-form {
    padding: 1.75rem 2rem 2rem;
  }
}

.auth-form-footer {
  margin-top: 1.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgb(var(--c-gray-600));
}

.dark .auth-form-footer {
  color: rgb(var(--c-dark-300));
}

.auth-form-footer:empty {
  display: none;
}

.auth-stage-foot {
  margin-top: 1.5rem;
  font-size: 0.72rem;
  color: rgb(255 244 236 / 0.35);
}

/* Slot typography: headings inside auth forms share the display voice */
.auth-form :deep(h2) {
  font-family: theme('fontFamily.display');
  font-stretch: 112%;
  letter-spacing: -0.03em;
}

@keyframes auth-scrim-in {
  from {
    opacity: 0;
  }
}

@keyframes auth-scrim-out {
  to {
    opacity: 0;
  }
}

@keyframes auth-dialog-out {
  to {
    opacity: 0;
    transform: translateY(10px) scale(0.97);
  }
}

@keyframes auth-dialog-swap {
  from {
    opacity: 0.4;
    transform: scale(0.992);
  }
}

@keyframes auth-sky-in {
  from {
    opacity: 0;
  }
}

@keyframes auth-dialog-in {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }
}

html[data-motion='reduced'] .auth-sky,
html[data-motion='reduced'] .auth--overlay,
html[data-motion='reduced'] .auth-dialog {
    animation: none !important;
  }

</style>

<style>
/* page underneath the sign-in popup stays put */
html.auth-overlay-open,
html.auth-overlay-open body {
  overflow: hidden;
}

html.auth-overlay-open body {
  padding-right: var(--auth-scrollbar-gap, 0px);
}
</style>
