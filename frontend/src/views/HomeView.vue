<template>
  <!-- Custom Home Content: Full Page Mode -->
  <div v-if="hasHomeContent" class="min-h-screen">
    <!-- iframe mode -->
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <!-- HTML mode - SECURITY: homeContent is admin-only setting, XSS risk is acceptable -->
    <div v-else v-html="homeContent"></div>
  </div>

  <!-- Compact Home Page -->
  <div
    v-else-if="compactHomeEnabled"
    data-testid="compact-home"
    class="flex min-h-screen flex-col bg-paper text-gray-900 dark:bg-dark-950 dark:text-white"
  >
    <header class="px-4 py-4 sm:px-6">
      <nav class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <BrandLogo :src="siteLogo" alt="Logo" class="h-9 w-9 shrink-0 rounded-[10px]" />
          <BrandWordmark v-if="usesBrandWordmark" class="home-wordmark" :decorative="true" />
          <span v-else class="min-w-0 truncate text-[15px] font-semibold tracking-title">{{ siteName }}</span>
        </div>
        <div class="flex max-w-full shrink-0 flex-wrap items-center justify-end gap-1">
          <LocaleSwitcher />
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="home-icon-btn"
            :title="t('home.viewDocs')"
            :aria-label="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>
          <router-link
            v-if="showModelPlazaEntry"
            to="/model-plaza"
            class="home-nav-link"
            :title="t('nav.modelPlaza')"
          >
            <Icon name="grid" size="md" />
            <span class="hidden sm:inline">{{ t('nav.modelPlaza') }}</span>
          </router-link>
          <button
            type="button"
            class="home-icon-btn"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
            :aria-label="isDark ? t('home.switchToLight') : t('home.switchToDark')"
            @click="toggleTheme"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>
          <router-link
            :to="isAuthenticated ? dashboardPath : '/login'"
            class="btn btn-primary btn-sm ml-1 min-h-9 px-4"
          >
            {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="flex min-w-0 flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div class="min-w-0 max-w-2xl text-center">
        <BrandLogo :src="siteLogo" alt="Logo" class="mx-auto mb-8 h-20 w-20 rounded-[22px] shadow-glass" />
        <h1 class="home-compact-title [overflow-wrap:anywhere]">{{ siteName }}</h1>
        <p class="mx-auto mt-4 max-w-[46ch] whitespace-pre-wrap text-base text-gray-600 [overflow-wrap:anywhere] dark:text-dark-300 sm:text-lg">{{ siteSubtitle }}</p>
        <router-link
          :to="isAuthenticated ? dashboardPath : '/login'"
          class="btn btn-primary btn-lg mt-9"
        >
          {{ isAuthenticated ? t('home.goToDashboard') : t('home.login') }}
        </router-link>
      </div>
    </main>

    <footer class="min-w-0 px-4 py-6 text-center text-[13px] text-gray-500 [overflow-wrap:anywhere] sm:px-6 dark:text-dark-400">
      &copy; {{ currentYear }} {{ siteName }}
    </footer>
  </div>

  <!-- Default Home Page -->
  <div
    v-else
    data-testid="default-home"
    class="home dark relative flex min-h-screen flex-col bg-black text-[#fff4ec]"
  >
    <!-- Header: floats over the solar system, gains a black glass once the page scrolls past it -->
    <header class="home-header" :class="{ 'is-scrolled': scrolled }">
      <nav class="home-container flex h-16 items-center justify-between gap-3">
        <router-link to="/home" class="home-brand flex min-w-0 items-center gap-2.5" :aria-label="siteName">
          <BrandLogo :src="siteLogo" class="h-8 w-8 shrink-0 rounded-[9px]" />
          <BrandWordmark v-if="usesBrandWordmark" class="home-wordmark hidden sm:block" :decorative="true" />
          <span v-else class="hidden min-w-0 truncate text-[15px] font-semibold tracking-title sm:block">{{ siteName }}</span>
        </router-link>

        <div class="flex shrink-0 items-center gap-1">
          <router-link
            v-if="showModelPlazaEntry"
            to="/model-plaza"
            class="home-nav-link"
            :title="t('nav.modelPlaza')"
          >
            <Icon name="grid" size="sm" class="sm:hidden" />
            <span class="hidden sm:inline">{{ t('nav.modelPlaza') }}</span>
          </router-link>
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="home-nav-link"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="sm" class="sm:hidden" />
            <span class="hidden sm:inline">{{ t('home.docs') }}</span>
          </a>

          <span class="home-nav-rule mx-1 hidden h-5 w-px sm:block" aria-hidden="true"></span>

          <div class="home-locale">
            <LocaleSwitcher />
          </div>

          <router-link
            v-if="isAuthenticated"
            :to="dashboardPath"
            class="home-account"
          >
            <span class="home-account-avatar">{{ userInitial }}</span>
            <span>{{ t('home.dashboard') }}</span>
          </router-link>
          <router-link v-else to="/login" class="btn btn-glass btn-sm ml-1 px-4">
            {{ t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="home-main">
      <!-- The stage: a live solar system that stays put while the page scrolls over it -->
      <section
        ref="heroRef"
        class="home-hero"
        :class="{ 'is-covered': cover >= 1 }"
        :style="{ '--cover': cover }"
      >
        <SolarSystem ref="solarRef" />
        <!-- meteors: a few on their own, more when the pointer sweeps, one called down on a click -->
        <HomeMeteors :hero="heroRef" :active="cover < 0.98" />
        <!-- the site name in quantum particles; the <h1> below keeps its place, transparent -->
        <HeroQuantumTitle
          v-if="quantumTitle"
          :hero="heroRef"
          :title-el="titleRef"
          :title="siteName"
          :active="cover < 0.98"
          :go="titleGo"
          @ready="onQuantumReady"
        />

        <div class="home-hero-content">
          <h1
            ref="titleRef"
            class="home-title"
            :class="[titleSizeClass, { 'home-title--quantum is-particles': quantumTitle }]"
          >
            {{ siteName }}
          </h1>
          <p class="home-lede home-lede--signal">
            <svg class="home-lede-mark" viewBox="0 0 30 14" aria-hidden="true">
              <ellipse cx="14" cy="7.5" rx="12.5" ry="4.2" transform="rotate(-14 14 7.5)" fill="none" stroke="currentColor" stroke-width="1.3" />
              <circle cx="25.2" cy="4.4" r="2.1" fill="#fff" />
            </svg>
            <span>{{ siteSubtitle }}</span>
          </p>
        </div>

        <a href="#home-story" class="home-scroll-cue" @click.prevent="scrollToStory">
          <span>{{ t('home.scrollCue') }}</span>
          <span class="home-scroll-line" aria-hidden="true"></span>
        </a>
      </section>

      <!-- Everything below slides up over the stage -->
      <div id="home-story" class="home-story">
        <!-- 1. What this is -->
        <section ref="secIntro" class="home-sec home-intro" :aria-label="t('home.heroSubtitle')">
          <div class="home-container">
            <p class="home-intro-title reveal">{{ t('home.heroSubtitle') }}</p>
            <p class="home-intro-text reveal" style="--d: 0.08s">{{ t('home.heroDescription') }}</p>

            <div class="home-intro-actions reveal" style="--d: 0.16s">
              <router-link
                :to="isAuthenticated ? dashboardPath : '/login'"
                class="btn btn-primary btn-lg home-cta"
              >
                {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
                <Icon name="arrowRight" size="sm" :stroke-width="2" class="home-cta-arrow" />
              </router-link>
              <a
                v-if="docUrl"
                :href="docUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-lg home-ghost"
              >
                {{ t('home.viewDocs') }}
              </a>
            </div>

            <div class="home-intro-meta reveal" style="--d: 0.24s">
              <div class="home-endpoint">
                <span class="home-endpoint-label">{{ t('home.baseUrl') }}</span>
                <code class="home-endpoint-url">{{ apiBaseUrl }}</code>
                <button
                  type="button"
                  class="home-endpoint-copy"
                  :class="{ 'is-copied': baseUrlCopied }"
                  :aria-label="t('home.copyBaseUrl')"
                  :title="t('home.copyBaseUrl')"
                  @click="copyBaseUrl"
                >
                  <Transition name="home-swap" mode="out-in">
                    <span v-if="baseUrlCopied" key="done" class="inline-flex items-center gap-1">
                      <Icon name="check" size="xs" :stroke-width="2.5" />
                      {{ t('home.copied') }}
                    </span>
                    <span v-else key="copy" class="inline-flex items-center">
                      <Icon name="copy" size="sm" />
                    </span>
                  </Transition>
                </button>
              </div>

              <div class="home-hero-providers">
                <span class="home-hero-providers-label">{{ t('home.providers.title') }}</span>
                <span v-for="p in heroProviders" :key="p.platform" class="home-hero-provider">
                  <PlatformIcon :platform="p.platform" size="md" />
                  {{ p.name }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. How a request moves -->
        <section ref="secFlow" class="home-sec home-container" :aria-label="t('home.flow.title')">
          <div class="home-section-lead reveal">
            <h2>{{ t('home.flow.title') }}</h2>
            <p>{{ t('home.flow.lead') }}</p>
          </div>
          <div class="reveal reveal--rise" style="--d: 0.1s">
            <HomeSwitchyard :logo="siteLogo || '/logo.svg'" />
          </div>
        </section>

        <!-- 3. Integrate: code that writes itself -->
        <section ref="secCode" class="home-sec home-container" :aria-label="t('home.integrate.title')">
          <div class="home-integrate">
            <div class="home-integrate-copy">
              <h2 class="reveal">{{ t('home.integrate.title') }}</h2>
              <p class="home-integrate-lead reveal" style="--d: 0.08s">{{ t('home.integrate.lead') }}</p>
              <ol class="home-steps">
                <li class="reveal" style="--d: 0.16s">
                  <span class="home-step-mark" style="--mark: rgb(var(--signal-a))"></span>
                  <span>{{ t('home.integrate.steps.key') }}</span>
                </li>
                <li class="reveal" style="--d: 0.24s">
                  <span class="home-step-mark" style="--mark: rgb(var(--signal-b))"></span>
                  <span>{{ t('home.integrate.steps.base') }}</span>
                </li>
                <li class="reveal" style="--d: 0.32s">
                  <span class="home-step-mark" style="--mark: rgb(var(--signal-c))"></span>
                  <span>{{ t('home.integrate.steps.call') }}</span>
                </li>
              </ol>
              <p class="home-integrate-note reveal" style="--d: 0.4s">{{ t('home.integrate.note') }}</p>
            </div>
            <div class="home-integrate-code reveal reveal--rise" style="--d: 0.12s">
              <HomeCodeTyper :base-url="apiBaseUrl" />
            </div>
          </div>
        </section>

        <!-- 4. Pictures and video on the same key -->
        <section ref="secStudios" class="home-sec home-container" :aria-label="t('home.studios.title')">
          <div class="home-section-lead reveal">
            <h2>{{ t('home.studios.title') }}</h2>
            <p>{{ t('home.studios.lead') }}</p>
          </div>
          <HomeStudios />
        </section>

        <!-- 5. What you get -->
        <section ref="secWhy" class="home-sec home-container" :aria-label="t('home.features.unifiedGateway')">
          <div class="home-zones">
            <div class="home-zone reveal">
              <span class="home-zone-mark" style="--mark: rgb(var(--signal-a))"></span>
              <h3>{{ t('home.features.unifiedGateway') }}</h3>
              <p>{{ t('home.features.unifiedGatewayDesc') }}</p>
            </div>
            <div class="home-zone reveal" style="--d: 0.12s">
              <span class="home-zone-mark" style="--mark: rgb(var(--signal-b))"></span>
              <h3>{{ t('home.features.balanceQuota') }}</h3>
              <p>{{ t('home.features.balanceQuotaDesc') }}</p>
            </div>
            <div class="home-zone reveal" style="--d: 0.24s">
              <span class="home-zone-mark" style="--mark: rgb(var(--signal-c))"></span>
              <h3>{{ t('home.features.multiAccount') }}</h3>
              <p>{{ t('home.features.multiAccountDesc') }}</p>
            </div>
          </div>
        </section>

        <!-- 6. Contact & support -->
        <section ref="secSupport" class="home-sec home-container" :aria-label="t('home.support.title')">
          <div class="home-support">
            <div class="home-support-head reveal">
              <h2>{{ t('home.support.title') }}</h2>
              <p>{{ t('home.support.lead') }}</p>
            </div>
            <ul class="home-channels">
              <li v-for="(ch, i) in supportChannels" :key="ch.id" class="reveal" :style="{ '--d': `${0.08 + i * 0.08}s` }">
                <component
                  :is="ch.external ? 'a' : 'router-link'"
                  v-bind="ch.external ? { href: ch.href, target: ch.newTab ? '_blank' : undefined, rel: ch.newTab ? 'noopener noreferrer' : undefined } : { to: ch.href }"
                  class="home-channel"
                >
                  <span class="home-channel-name">{{ ch.name }}</span>
                  <span class="home-channel-desc">{{ ch.desc }}</span>
                  <span v-if="ch.value" class="home-channel-value">{{ ch.value }}</span>
                  <Icon name="arrowRight" size="sm" :stroke-width="2" class="home-channel-arrow" />
                </component>
              </li>
            </ul>
          </div>
        </section>

        <!-- 7. Closing -->
        <section ref="secClose" class="home-sec home-container">
          <div class="home-closing reveal">
            <h2 class="home-closing-title">{{ t('home.heroSubtitle') }}</h2>
            <div class="home-closing-body">
              <p>{{ t('home.heroDescription') }}</p>
              <router-link
                :to="isAuthenticated ? dashboardPath : '/login'"
                class="btn btn-primary btn-lg home-cta mt-7"
              >
                {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
                <Icon name="arrowRight" size="sm" :stroke-width="2" class="home-cta-arrow" />
              </router-link>
            </div>
          </div>
        </section>
      </div>

      <!-- Section rail: where you are in the story -->
      <nav class="home-rail" :class="{ 'is-visible': cover > 0.6 }" :aria-label="t('home.scrollCue')">
        <button
          v-for="(sec, i) in railSections"
          :key="sec.id"
          type="button"
          class="home-rail-dot"
          :class="{ 'is-active': activeSection === i }"
          :aria-label="sec.label"
          :title="sec.label"
          @click="scrollToSection(i)"
        >
          <span class="home-rail-label">{{ sec.label }}</span>
        </button>
      </nav>
    </main>

    <!-- Footer -->
    <footer class="home-footer">
      <div class="home-container flex flex-col gap-4 py-8 text-[13px] text-[#fff4ec]/45 sm:flex-row sm:items-start sm:justify-between">
        <p>
          &copy; {{ currentYear }} {{ siteName }}. {{ t('home.footer.allRightsReserved') }}
          <span class="home-footer-credit">{{ t('home.solar.credit') }}</span>
        </p>
        <div class="flex items-center gap-5">
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="home-footer-link"
          >
            {{ t('home.docs') }}
          </a>
          <router-link :to="isAuthenticated ? dashboardPath : '/login'" class="home-footer-link">
            {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
          </router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import BrandWordmark from '@/components/brand/BrandWordmark.vue'
import BrandLogo from '@/components/brand/BrandLogo.vue'
import HomeMeteors from '@/components/home/HomeMeteors.vue'
import HeroQuantumTitle from '@/components/home/HeroQuantumTitle.vue'
import { quantumSupported } from '@/lib/quantum/quantumField'
import { useAppearance } from '@/composables/useAppearance'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import HomeSwitchyard from '@/components/home/HomeSwitchyard.vue'
import HomeCodeTyper from '@/components/home/HomeCodeTyper.vue'
import HomeStudios from '@/components/home/HomeStudios.vue'
import SolarSystem from '@/components/home/SolarSystem.vue'
import PlatformIcon from '@/components/common/PlatformIcon.vue'
import type { GroupPlatform } from '@/types'
import { sanitizeUrl } from '@/utils/url'
import { FeatureFlags, isFeatureFlagEnabled } from '@/utils/featureFlags'

const { t } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

// Site settings - directly from appStore (already initialized from injected config)
const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'JLAi')
const usesBrandWordmark = computed(() => siteName.value.trim().toLowerCase() === 'jlai')

// The hero title is drawn in particles where WebGL 2 runs; the text shows if it cannot start
const titleRef = ref<HTMLElement | null>(null)
const quantumTitle = ref(quantumSupported())
function onQuantumReady(on: boolean) {
  if (!on) quantumTitle.value = false
}

/*
 * The opening. The whole solar system shows at once; once the page has finished loading (and the
 * planet textures are in) it holds a second, then the name gathers out of particles, and once it
 * has formed the camera moves to Earth's night side, facing the Sun. Nothing is seen half-built.
 */
const titleGo = ref(false)
let openingTimers: number[] = []
let openingCancelled = false
function openingWait(ms: number) {
  return new Promise<void>((resolve) => openingTimers.push(window.setTimeout(resolve, ms)))
}
function pageLoaded() {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise<void>((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true })
    openingTimers.push(window.setTimeout(resolve, 8000))
  })
}
async function runOpening() {
  await pageLoaded()
  await (solarRef.value?.whenReady() ?? Promise.resolve())
  await openingWait(1000)
  if (openingCancelled) return
  titleGo.value = true
  await openingWait(quantumTitle.value ? 1300 : 200)
  if (openingCancelled) return
  solarRef.value?.flyToEarth()
}
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'AI API Gateway Platform')
const docUrl = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.doc_url || appStore.docUrl || ''))
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')
const hasHomeContent = computed(() => homeContent.value.trim().length > 0)
const compactHomeEnabled = computed(() => appStore.cachedPublicSettings?.compact_home_enabled === true)
const modelPlazaEnabled = computed(() => isFeatureFlagEnabled(FeatureFlags.modelPlaza))

// Check if homeContent is a URL (for iframe display)
const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

// Upstreams shown along the bottom edge of the hero
const heroProviders = computed<Array<{ platform: GroupPlatform; name: string }>>(() => [
  { platform: 'anthropic' as GroupPlatform, name: t('home.providers.claude') },
  { platform: 'openai' as GroupPlatform, name: 'GPT' },
  { platform: 'gemini' as GroupPlatform, name: t('home.providers.gemini') },
  { platform: 'antigravity' as GroupPlatform, name: t('home.providers.antigravity') }
])

// The API base URL developers paste into their clients
const apiBaseUrl = computed(() => {
  const configured = String(appStore.cachedPublicSettings?.api_base_url || '').trim()
  if (configured) return configured.replace(/\/+$/, '')
  return typeof window !== 'undefined' ? window.location.origin : ''
})

// Theme
const { isDark, toggleDark } = useAppearance()

// Auth state
const isAuthenticated = computed(() => authStore.isAuthenticated)
const modelPlazaRequiresAuth = computed(
  () => appStore.cachedPublicSettings?.model_plaza_require_auth === true,
)
const showModelPlazaEntry = computed(
  () => modelPlazaEnabled.value && (isAuthenticated.value || !modelPlazaRequiresAuth.value),
)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const userInitial = computed(() => {
  const user = authStore.user
  if (!user || !user.email) return ''
  return user.email.charAt(0).toUpperCase()
})

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Headline size follows the configured name's length so long or CJK names still fit
const titleSizeClass = computed(() => {
  const name = siteName.value
  let weight = 0
  for (const ch of name) {
    weight += /[\u2E80-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF\uFF00-\uFFEF]/.test(ch) ? 1.7 : 1
  }
  if (weight <= 8) return 'home-title--xl'
  if (weight <= 13) return 'home-title--lg'
  if (weight <= 20) return 'home-title--md'
  return 'home-title--sm'
})

// Contact & support channels: only what this deployment actually offers
const contactInfo = computed(() => String(appStore.cachedPublicSettings?.contact_info || appStore.contactInfo || '').trim())
const supportChannels = computed(() => {
  const list: Array<{ id: string; name: string; desc: string; href: string; external: boolean; newTab?: boolean; value?: string }> = []
  if (docUrl.value) {
    list.push({ id: 'docs', name: t('home.support.docs'), desc: t('home.support.docsDesc'), href: docUrl.value, external: true, newTab: true })
  }
  const contact = contactInfo.value
  if (contact) {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
    const isUrl = /^https?:\/\//i.test(contact)
    list.push({
      id: 'contact',
      name: t('home.support.contact'),
      desc: t('home.support.contactDesc'),
      href: isEmail ? `mailto:${contact}` : isUrl ? sanitizeUrl(contact) : '#',
      external: true,
      newTab: isUrl,
      value: contact
    })
  }
  list.push({
    id: 'dashboard',
    name: t('home.support.dashboard'),
    desc: t('home.support.dashboardDesc'),
    href: isAuthenticated.value ? dashboardPath.value : '/login',
    external: false
  })
  return list
})

// The stage stays put while the story scrolls over it; `cover` is how far it has been hidden
const heroRef = ref<HTMLElement | null>(null)
const solarRef = ref<InstanceType<typeof SolarSystem> | null>(null)
const scrolled = ref(false)
const cover = ref(0)
let scrollTicking = false
function onScroll() {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    scrollTicking = false
    const h = heroRef.value ? heroRef.value.offsetHeight : window.innerHeight
    const c = Math.min(1, Math.max(0, window.scrollY / Math.max(1, h)))
    cover.value = c
    scrolled.value = window.scrollY > 24
    solarRef.value?.setCovered(c >= 1)
    updateActiveSection()
  })
}

// Section rail
const secIntro = ref<HTMLElement | null>(null)
const secFlow = ref<HTMLElement | null>(null)
const secCode = ref<HTMLElement | null>(null)
const secStudios = ref<HTMLElement | null>(null)
const secWhy = ref<HTMLElement | null>(null)
const secSupport = ref<HTMLElement | null>(null)
const secClose = ref<HTMLElement | null>(null)
const railSections = computed(() => [
  { id: 'intro', label: t('home.heroSubtitle'), el: secIntro },
  { id: 'flow', label: t('home.flow.title'), el: secFlow },
  { id: 'code', label: t('home.integrate.title'), el: secCode },
  { id: 'studios', label: t('home.studios.title'), el: secStudios },
  { id: 'why', label: t('home.features.unifiedGateway'), el: secWhy },
  { id: 'support', label: t('home.support.title'), el: secSupport },
  { id: 'close', label: t('home.getStarted'), el: secClose }
])
const activeSection = ref(0)
function updateActiveSection() {
  const probe = window.scrollY + window.innerHeight * 0.45
  let idx = 0
  railSections.value.forEach((sec, i) => {
    const el = sec.el.value
    if (el && el.offsetTop <= probe) idx = i
  })
  activeSection.value = idx
}
function scrollToSection(i: number) {
  const el = railSections.value[i]?.el.value
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function scrollToStory() {
  secIntro.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Reveal-on-scroll for everything in the story
let revealObserver: IntersectionObserver | null = null
function setupReveal() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('.home-story .reveal'))
  if (typeof IntersectionObserver === 'undefined') {
    nodes.forEach((n) => n.classList.add('is-in'))
    return
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in')
          revealObserver?.unobserve(en.target)
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
  )
  nodes.forEach((n) => revealObserver?.observe(n))
}

// Copy the API base URL with inline confirmation
const baseUrlCopied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | null = null
async function copyBaseUrl() {
  const text = apiBaseUrl.value
  if (!text) return
  let ok = false
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      ok = true
    }
  } catch {
    ok = false
  }
  if (!ok) {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', 'true')
    area.style.cssText = 'position:fixed;left:0;top:0;opacity:0;pointer-events:none'
    document.body.appendChild(area)
    area.select()
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    } finally {
      document.body.removeChild(area)
    }
  }
  if (ok) {
    baseUrlCopied.value = true
    if (copiedTimer) clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => (baseUrlCopied.value = false), 1800)
  }
}

// Toggle theme
function toggleTheme() {
  toggleDark()
}

onMounted(() => {
  // the theme is applied globally by initAppearance() before the app mounts
  // Check auth state
  authStore.checkAuth()

  // Ensure public settings are loaded (will use cache if already loaded from injected config)
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  setupReveal()
  void runOpening()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  revealObserver?.disconnect()
  revealObserver = null
  if (copiedTimer) clearTimeout(copiedTimer)
  openingCancelled = true
  openingTimers.forEach((id) => window.clearTimeout(id))
  openingTimers = []
})
</script>

<style scoped>
.home-wordmark {
  height: 15px;
  width: auto;
  color: #fff4ec;
}

.home-container {
  width: 100%;
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

@media (min-width: 640px) {
  .home-container {
    padding-inline: 2rem;
  }
}

/* ---------- header ---------- */
.home-header {
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid transparent;
  transition:
    background-color 0.3s var(--ease-out),
    border-color 0.3s var(--ease-out),
    backdrop-filter 0.3s;
}

.home-header.is-scrolled {
  border-bottom-color: rgb(255 240 225 / 0.08);
  background: rgb(0 0 0 / 0.72);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}

.home-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 2.25rem;
  padding-inline: 0.7rem;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(255 244 236 / 0.72);
  transition:
    background-color 0.2s,
    color 0.2s;
}

.home-nav-link:hover {
  background: rgb(255 240 225 / 0.1);
  color: #fff;
}

.home-icon-btn {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.625rem;
  color: rgb(255 244 236 / 0.72);
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.2s;
}

.home-icon-btn:hover {
  background: rgb(255 240 225 / 0.1);
  color: #fff;
}

.home-icon-btn:active {
  transform: scale(0.94);
}

.home-account {
  margin-left: 0.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.25rem;
  padding: 0 0.85rem 0 0.3rem;
  border-radius: 9999px;
  background: #fff4ec;
  color: rgb(var(--c-ink));
  font-size: 0.8125rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.home-account:hover {
  background: #fff;
}

.home-account-avatar {
  display: grid;
  place-items: center;
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, rgb(var(--signal-a)), rgb(var(--signal-b)) 50%, rgb(var(--signal-c)));
  color: rgb(var(--c-ink));
  font-size: 0.72rem;
  font-weight: 700;
}

.home-nav-rule {
  background: rgb(255 240 225 / 0.16);
}

/* language switcher on the night sky: a quiet trigger and a dark glass menu (never white) */
.home-locale :deep(.relative > button) {
  color: rgb(255 244 236 / 0.72);
}

.home-locale :deep(.relative > button:hover) {
  background: rgb(255 240 225 / 0.1);
  color: #fff;
}

.home-locale :deep(.relative > div) {
  border-color: rgb(255 255 255 / 0.1);
  background: rgb(14 12 10 / 0.88);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  backdrop-filter: blur(18px) saturate(160%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.06),
    0 20px 50px -18px rgb(0 0 0 / 0.9);
}

.home-locale :deep(.relative > div button) {
  color: rgb(255 244 236 / 0.82);
}

.home-locale :deep(.relative > div button:hover) {
  background: rgb(255 255 255 / 0.08);
  color: #fff;
}

.home-locale :deep(.relative > div button.bg-primary-50) {
  background: rgb(var(--signal-a) / 0.14);
  color: rgb(var(--signal-a));
}

/* ---------- section lead above the routing diagram ---------- */
.home-section-lead {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2.25rem;
}

.home-section-lead h2 {
  font-family: theme('fontFamily.display');
  font-size: clamp(1.75rem, 3.2vw, 2.6rem);
  font-weight: 720;
  font-stretch: 110%;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #fff4ec;
  text-wrap: balance;
}

.home-section-lead p {
  max-width: 58ch;
  font-size: 1rem;
  line-height: 1.6;
  color: rgb(255 244 236 / 0.6);
}

@media (min-width: 1024px) {
  .home-section-lead {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 3rem;
    margin-bottom: 2.75rem;
  }

  .home-section-lead h2 {
    max-width: 18ch;
  }

  .home-section-lead p {
    max-width: 44ch;
    padding-bottom: 0.3rem;
  }
}

/* ---------- the stage: a sticky, full-height solar system ---------- */
.home-main {
  position: relative;
  z-index: 10;
  flex: 1;
}

.home-hero {
  position: sticky;
  top: 0;
  z-index: 0;
  height: 100vh;
  height: 100svh;
  margin-top: -4rem;
  overflow: hidden;
  background: #000;
  color: #fff4ec;
  isolation: isolate;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  /* recedes as the story slides over it */
  opacity: calc(1 - var(--cover, 0) * 0.7);
  transform: scale(calc(1 - var(--cover, 0) * 0.06));
  transform-origin: 50% 40%;
}

.home-hero.is-covered {
  visibility: hidden;
}

.home-hero-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(100%, 80rem);
  margin-inline: auto;
  padding: 0 1.25rem 4.5rem;
  pointer-events: none;
}

.home-hero-content > * {
  pointer-events: auto;
}

/* a faint floor so the name reads against the outer planets */
.home-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(180deg, rgb(0 0 0 / 0.35) 0%, transparent 18%, transparent 62%, rgb(0 0 0 / 0.55) 100%);
}

@media (min-width: 640px) {
  .home-hero-content {
    padding-inline: 2rem;
  }
}

@media (min-width: 1024px) {
  .home-hero-content {
    padding: 0 2.5rem 4.5rem;
  }
}

.home-title {
  font-family: theme('fontFamily.display');
  font-weight: 790;
  font-stretch: 122%;
  line-height: 0.9;
  letter-spacing: -0.045em;
  color: #fff4ec;
  overflow-wrap: anywhere;
  text-wrap: balance;
  margin-left: -0.04em;
  user-select: text;
  animation: home-rise 1s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.home-title--xl {
  font-size: clamp(3.5rem, 7.5vw, 7rem);
}

.home-title--lg {
  font-size: clamp(2.75rem, 5.2vw, 4.8rem);
}

.home-title--md {
  font-size: clamp(2.25rem, 4vw, 3.6rem);
  line-height: 0.96;
}

.home-title--sm {
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  line-height: 1.02;
}

.home-title--quantum {
  /* never move: the particles are laid out from where the text sits */
  animation: none;
}

.home-title.is-particles {
  color: transparent;
  /* the text is there for layout and screen readers only: a double-click must not reveal it */
  user-select: none;
  -webkit-user-select: none;
}

.home-title.is-particles::selection {
  color: transparent;
  background: transparent;
}

/* particles want room: the short-name size grows when the title is drawn in them */
.home-title--xl.home-title--quantum {
  font-size: clamp(4.5rem, 10.5vw, 9.5rem);
}

.home-lede--signal {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 520;
  letter-spacing: 0.01em;
}

.home-lede--signal > span {
  background: linear-gradient(90deg, #fff4ec 0%, rgb(var(--signal-a)) 52%, rgb(var(--signal-c)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.home-lede-mark {
  width: 1.9em;
  height: auto;
  flex-shrink: 0;
  color: rgb(var(--signal-b));
  filter: drop-shadow(0 0 6px rgb(var(--signal-a) / 0.55));
}

.home-lede {
  margin-top: 1rem;
  max-width: 36ch;
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  line-height: 1.5;
  font-weight: 450;
  letter-spacing: -0.01em;
  color: rgb(255 244 236 / 0.72);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  user-select: text;
  animation: home-rise 0.9s 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* the invitation to scroll */
.home-scroll-cue {
  position: absolute;
  left: 50%;
  bottom: 1.6rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transform: translateX(-50%);
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  color: rgb(255 244 236 / 0.5);
  transition: color 0.2s;
  animation: home-rise 0.9s 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.home-scroll-cue:hover {
  color: #fff4ec;
}

.home-scroll-line {
  position: relative;
  width: 1px;
  height: 2.6rem;
  overflow: hidden;
  background: rgb(255 244 236 / 0.14);
}

.home-scroll-line::after {
  content: '';
  position: absolute;
  left: 0;
  top: -40%;
  width: 100%;
  height: 40%;
  background: linear-gradient(180deg, transparent, rgb(var(--signal-a)));
  animation: home-drip 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@media (max-width: 639px) {
  .home-scroll-cue {
    left: auto;
    right: 1.25rem;
    transform: none;
  }
}

/* ---------- the story ---------- */
.home-story {
  position: relative;
  z-index: 1;
  background: #000;
}

/* the leading edge: a thin plasma horizon where the story meets the stage */
.home-story::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgb(var(--signal-a)) 25%, rgb(var(--signal-b)) 50%, rgb(var(--signal-c)) 75%, transparent);
  opacity: 0.7;
}

.home-sec {
  padding-block: clamp(5rem, 11vh, 9rem);
}

.home-sec + .home-sec {
  padding-top: 0;
}

/* ---------- 1. what this is ---------- */
.home-intro {
  padding-top: clamp(6rem, 14vh, 11rem);
}

.home-intro-title {
  font-family: theme('fontFamily.display');
  font-size: clamp(2.4rem, 6vw, 6rem);
  font-weight: 760;
  font-stretch: 116%;
  line-height: 0.98;
  letter-spacing: -0.04em;
  color: #fff4ec;
  max-width: 16ch;
  text-wrap: balance;
}

.home-intro-text {
  margin-top: 1.5rem;
  max-width: 52ch;
  font-size: clamp(1.05rem, 1.5vw, 1.3rem);
  line-height: 1.55;
  color: rgb(255 244 236 / 0.66);
}

.home-intro-actions {
  margin-top: 2.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.home-intro-actions .btn-primary {
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.22),
    0 10px 30px -8px rgb(var(--signal-b) / 0.6);
}

.home-intro-meta {
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem 2.5rem;
}

.home-ghost {
  background: rgb(255 240 225 / 0.06);
  color: #fff4ec;
  box-shadow: inset 0 0 0 1px rgb(255 240 225 / 0.14);
  backdrop-filter: blur(8px);
}

.home-ghost:hover {
  background: rgb(255 240 225 / 0.12);
  box-shadow: inset 0 0 0 1px rgb(255 240 225 / 0.24);
}

.home-cta .home-cta-arrow {
  transition: transform 0.25s var(--ease-out);
}

.home-cta:hover .home-cta-arrow {
  transform: translateX(3px);
}

.home-endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 100%;
  padding: 0.45rem 0.45rem 0.45rem 1rem;
  border-radius: 9999px;
  background: rgb(255 240 225 / 0.05);
  box-shadow: inset 0 0 0 1px rgb(255 240 225 / 0.1);
}

.home-endpoint-label {
  flex: none;
  font-size: 0.72rem;
  color: rgb(255 244 236 / 0.5);
}

.home-endpoint-url {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: theme('fontFamily.mono');
  font-size: 0.8rem;
  color: #fff4ec;
  user-select: all;
}

.home-endpoint-copy {
  display: inline-grid;
  place-items: center;
  flex: none;
  height: 2rem;
  min-width: 2rem;
  padding-inline: 0.5rem;
  border-radius: 9999px;
  background: rgb(255 240 225 / 0.08);
  color: rgb(255 244 236 / 0.8);
  font-size: 0.72rem;
  font-weight: 600;
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.2s;
}

.home-endpoint-copy:hover {
  background: rgb(255 240 225 / 0.16);
  color: #fff;
}

.home-endpoint-copy:active {
  transform: scale(0.94);
}

.home-endpoint-copy.is-copied {
  background: rgb(var(--signal-a) / 0.2);
  color: rgb(var(--signal-a));
}

@media (max-width: 479px) {
  .home-endpoint-label {
    display: none;
  }
}

.home-hero-providers {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 1.15rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgb(255 244 236 / 0.62);
}

.home-hero-providers-label {
  color: rgb(255 244 236 / 0.4);
}

.home-hero-provider {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color 0.2s;
}

.home-hero-provider:hover {
  color: #fff4ec;
}

/* ---------- 3. integrate ---------- */
.home-integrate {
  display: grid;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .home-integrate {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: center;
    gap: 4rem;
  }
}

.home-integrate-copy h2 {
  font-family: theme('fontFamily.display');
  font-size: clamp(1.9rem, 3.4vw, 2.8rem);
  font-weight: 720;
  font-stretch: 110%;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #fff4ec;
  text-wrap: balance;
}

.home-integrate-lead {
  margin-top: 1rem;
  max-width: 44ch;
  font-size: 1.02rem;
  line-height: 1.6;
  color: rgb(255 244 236 / 0.62);
}

.home-steps {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin: 1.9rem 0 0;
  padding: 0;
  list-style: none;
}

.home-steps li {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-size: 0.98rem;
  color: #fff4ec;
}

.home-step-mark {
  flex: none;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 9999px;
  background: var(--mark);
  box-shadow: 0 0 12px var(--mark);
}

.home-integrate-note {
  margin-top: 1.9rem;
  max-width: 44ch;
  font-size: 0.85rem;
  line-height: 1.55;
  color: rgb(255 244 236 / 0.45);
}

/* ---------- 5. support ---------- */
.home-support {
  display: grid;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .home-support {
    grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
    gap: 4rem;
    align-items: start;
  }
}

.home-support-head h2 {
  font-family: theme('fontFamily.display');
  font-size: clamp(1.9rem, 3.4vw, 2.8rem);
  font-weight: 720;
  font-stretch: 110%;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #fff4ec;
  text-wrap: balance;
}

.home-support-head p {
  margin-top: 1rem;
  max-width: 34ch;
  font-size: 1.02rem;
  line-height: 1.6;
  color: rgb(255 244 236 / 0.62);
}

.home-channels {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid rgb(255 240 225 / 0.12);
}

.home-channel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    'name arrow'
    'desc arrow'
    'value arrow';
  align-items: center;
  column-gap: 1.5rem;
  padding: 1.35rem 0.25rem;
  border-bottom: 1px solid rgb(255 240 225 / 0.12);
  color: #fff4ec;
  transition: padding-left 0.3s var(--ease-out);
}

@media (min-width: 768px) {
  .home-channel {
    grid-template-columns: 11rem minmax(0, 1fr) auto;
    grid-template-areas:
      'name desc arrow'
      'name value arrow';
  }
}

.home-channel:hover {
  padding-left: 0.9rem;
}

.home-channel-name {
  grid-area: name;
  font-family: theme('fontFamily.display');
  font-size: 1.25rem;
  font-weight: 650;
  font-stretch: 108%;
  letter-spacing: -0.02em;
}

.home-channel-desc {
  grid-area: desc;
  margin-top: 0.2rem;
  font-size: 0.92rem;
  color: rgb(255 244 236 / 0.58);
}

@media (min-width: 768px) {
  .home-channel-desc {
    margin-top: 0;
  }
}

.home-channel-value {
  grid-area: value;
  margin-top: 0.3rem;
  font-family: theme('fontFamily.mono');
  font-size: 0.82rem;
  color: rgb(var(--signal-a));
  overflow-wrap: anywhere;
}

.home-channel-arrow {
  grid-area: arrow;
  color: rgb(255 244 236 / 0.45);
  transition:
    transform 0.3s var(--ease-out),
    color 0.2s;
}

.home-channel:hover .home-channel-arrow {
  transform: translateX(4px);
  color: rgb(var(--signal-a));
}

/* ---------- section rail ---------- */
.home-rail {
  position: fixed;
  right: 1.1rem;
  top: 50%;
  z-index: 20;
  display: none;
  flex-direction: column;
  gap: 0.8rem;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s;
}

.home-rail.is-visible {
  opacity: 1;
  pointer-events: auto;
}

@media (min-width: 1280px) {
  .home-rail {
    display: flex;
  }
}

.home-rail-dot {
  position: relative;
  width: 1.4rem;
  height: 1.4rem;
  display: grid;
  place-items: center;
}

.home-rail-dot::before {
  content: '';
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  background: rgb(255 244 236 / 0.28);
  transition:
    transform 0.3s var(--ease-out),
    background-color 0.3s,
    box-shadow 0.3s;
}

.home-rail-dot:hover::before {
  background: rgb(255 244 236 / 0.7);
}

.home-rail-dot.is-active::before {
  transform: scale(1.5);
  background: rgb(var(--signal-a));
  box-shadow: 0 0 12px rgb(var(--signal-a) / 0.8);
}

.home-rail-label {
  position: absolute;
  right: calc(100% + 0.5rem);
  top: 50%;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  background: rgb(20 15 12 / 0.9);
  color: #fff4ec;
  font-size: 0.72rem;
  white-space: nowrap;
  transform: translate(6px, -50%);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.home-rail-dot:hover .home-rail-label,
.home-rail-dot:focus-visible .home-rail-label {
  opacity: 1;
  transform: translate(0, -50%);
}

/* ---------- reveal on scroll ---------- */
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0s),
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0s);
  will-change: opacity, transform;
}

.reveal--rise {
  transform: translateY(48px) scale(0.985);
}

.reveal.is-in {
  opacity: 1;
  transform: none;
}

/* ---------- zone captions ---------- */
.home-zones {
  display: grid;
  gap: 2rem;
  padding: 0 0.25rem;
}

@media (min-width: 768px) {
  .home-zones {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2.5rem;
  }
}

@media (min-width: 1024px) {
  /* Each caption starts where its zone starts in the diagram above (same 0.5rem inset as
     the diagram frame): client card 3.3%, gateway tile 45.7%, upstream lanes 73.3% */
  .home-zones {
    margin-inline: 0.5rem;
    padding-inline: 0 3.3%;
    grid-template-columns: 3.33% 22.5% 19.84% 22% 5.66% 1fr;
    column-gap: 0;
  }

  .home-zone:nth-child(1) {
    grid-column: 2;
  }

  .home-zone:nth-child(2) {
    grid-column: 4;
  }

  .home-zone:nth-child(3) {
    grid-column: 6;
  }
}

.home-zone h3 {
  margin-top: 0.85rem;
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: -0.015em;
  font-stretch: 108%;
  color: #fff4ec;
}

.home-zone p {
  margin-top: 0.4rem;
  max-width: 38ch;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgb(255 244 236 / 0.6);
}

.home-zone-mark {
  display: block;
  width: 1.75rem;
  height: 3px;
  border-radius: 9999px;
  background: var(--mark);
}

/* ---------- closing ---------- */
.home-closing {
  margin-top: 6rem;
  margin-bottom: 4rem;
  display: grid;
  gap: 1.5rem;
  border-top: 1px solid rgb(255 240 225 / 0.1);
  padding-top: 3rem;
}

@media (min-width: 1024px) {
  .home-closing {
    margin-top: 8rem;
    grid-template-columns: 7fr 5fr;
    gap: 4rem;
    align-items: start;
  }
}

.home-closing-title {
  font-family: theme('fontFamily.display');
  font-size: clamp(2.1rem, 4.6vw, 3.9rem);
  font-weight: 720;
  font-stretch: 116%;
  line-height: 1;
  letter-spacing: -0.04em;
  color: #fff4ec;
}

.home-closing-body p {
  max-width: 40ch;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgb(255 244 236 / 0.62);
}

.home-footer-link {
  transition: color 0.2s;
}

.home-footer-link:hover {
  color: #fff;
}

.home-footer-credit {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.72rem;
  color: rgb(255 244 236 / 0.3);
}

.home-footer {
  position: relative;
  z-index: 1;
  background: #000;
  border-top: 1px solid rgb(255 240 225 / 0.08);
}

/* ---------- compact mode ---------- */
.home-compact-title {
  font-family: theme('fontFamily.display');
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 750;
  font-stretch: 116%;
  line-height: 1;
  letter-spacing: -0.04em;
}

/* ---------- motion ---------- */
.home-swap-enter-active,
.home-swap-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.home-swap-enter-from,
.home-swap-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

@keyframes home-drip {
  from {
    top: -40%;
  }

  to {
    top: 100%;
  }
}

@keyframes home-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

html[data-motion='reduced'] .home-title,
html[data-motion='reduced'] .home-lede,
html[data-motion='reduced'] .home-scroll-cue,
html[data-motion='reduced'] .home-scroll-line::after {
    animation: none;
  }

html[data-motion='reduced'] .home-hero {
    opacity: 1;
    transform: none;
  }

html[data-motion='reduced'] .reveal,
html[data-motion='reduced'] .reveal--rise {
    opacity: 1;
    transform: none;
    transition: none;
  }

</style>
