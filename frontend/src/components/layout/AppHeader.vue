<template>
  <!-- A floating bar: jump-to search on the left, account tools on the right. The page title lives in the page. -->
  <header class="app-header-wrap sticky top-0 z-30">
    <div class="app-header flex h-[58px] items-center justify-between gap-2 px-2 sm:px-3">
      <!-- Left: Mobile Menu Toggle + jump-to -->
      <div class="flex min-w-0 shrink items-center gap-2">
        <button
          @click="toggleMobileSidebar"
          class="btn-ghost btn-icon lg:hidden"
          :aria-label="t('common.toggleMenu')"
        >
          <Icon name="menu" size="md" />
        </button>

        <CommandPalette />
      </div>

      <!-- Right: Announcements + Docs + Language + Subscriptions + Balance + User Dropdown -->
      <div class="flex min-w-0 items-center gap-1 sm:gap-3">
        <!-- Announcement Bell -->
        <AnnouncementBell v-if="user" />

        <!-- Docs Link -->
        <a
          v-if="docUrl"
          :href="docUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-control px-2.5 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-950 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-white sm:flex"
        >
          <Icon name="book" size="sm" />
          <span class="hidden sm:inline">{{ t('nav.docs') }}</span>
        </a>

        <!-- Model Plaza Entry (icon only below sm) -->
        <router-link
          v-if="user && modelPlazaEnabled"
          :to="{ path: '/model-plaza', query: { embedded: '1' } }"
          :title="t('nav.modelPlaza')"
          :aria-label="t('nav.modelPlaza')"
          class="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-control px-2.5 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-950 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-white"
        >
          <Icon name="grid" size="sm" />
          <span class="hidden sm:inline">{{ t('nav.modelPlaza') }}</span>
        </router-link>

        <!-- Appearance: palette, light/dark, motion -->
        <AppearanceMenu />

        <!-- Language Switcher -->
        <LocaleSwitcher />

        <!-- Subscription Progress (for users with active subscriptions; not mounted at all when the feature is off) -->
        <SubscriptionProgressMini v-if="user && subscriptionFeatureEnabled" />

        <!-- Balance Display -->
        <div
          v-if="user"
          class="group relative hidden h-9 items-center gap-2 rounded-full border border-gray-200 bg-white pl-2.5 pr-3.5 shadow-card dark:border-dark-700 dark:bg-dark-900 sm:flex"
        >
          <svg
            class="h-4 w-4 text-primary-600 dark:text-primary-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
          <span class="tabular text-sm font-semibold text-gray-950 dark:text-white">
            {{ formatHeaderMoney(availableBalance) }}
          </span>
          <span
            v-if="frozenBalance > 0"
            class="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
          >
            {{ balanceFrozenLabel }}
          </span>
          <div
            class="pointer-events-none absolute right-0 top-full mt-2 hidden w-56 animate-scale-in rounded-xl border border-gray-200 bg-white p-3 text-xs shadow-pop group-hover:block dark:border-dark-700 dark:bg-dark-850"
          >
            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-dark-400">{{ balanceAvailableText }}</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ formatHeaderMoney(availableBalance) }}</span>
            </div>
            <div class="mt-2 flex items-center justify-between">
              <span class="text-gray-500 dark:text-dark-400">{{ balanceFrozenText }}</span>
              <span class="font-medium text-amber-700 dark:text-amber-200">{{ formatHeaderMoney(frozenBalance) }}</span>
            </div>
            <div class="mt-2 border-t border-gray-100 pt-2 dark:border-dark-700">
              <div class="flex items-center justify-between">
                <span class="text-gray-500 dark:text-dark-400">{{ balanceTotalText }}</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatHeaderMoney(totalBalance) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- User Dropdown -->
        <div v-if="user" class="relative" ref="dropdownRef">
          <button
            @click="toggleDropdown"
            class="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-dark-800 md:pr-2.5"
            :aria-label="t('common.userMenu')"
          >
            <div class="app-avatar flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-xs font-bold text-ink">
              <img
                v-if="avatarUrl"
                :src="avatarUrl"
                :alt="displayName"
                class="h-full w-full object-cover"
              >
              <span v-else>{{ userInitials }}</span>
            </div>
            <div class="hidden text-left md:block">
              <div class="max-w-[9rem] truncate text-[13px] font-semibold leading-tight text-gray-950 dark:text-white">
                {{ displayName }}
              </div>
              <div class="text-xs leading-tight text-gray-500 dark:text-dark-400">
                {{ t('admin.users.roles.' + user.role) }}
              </div>
            </div>
            <Icon name="chevronDown" size="sm" class="hidden text-gray-400 md:block" />
          </button>

          <!-- Dropdown Menu -->
          <transition name="dropdown">
            <div v-if="dropdownOpen" class="dropdown right-0 mt-2 w-56">
              <!-- User Info -->
              <div class="mb-1 border-b border-gray-100 px-3 pb-3 pt-2 dark:border-dark-700">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ displayName }}
                </div>
                <div class="text-xs text-gray-500 dark:text-dark-400">{{ user.email }}</div>
              </div>

              <!-- Balance (mobile only) -->
              <div class="mb-1 border-b border-gray-100 px-3 py-2 dark:border-dark-700 sm:hidden">
                <div class="text-xs text-gray-500 dark:text-dark-400">
                  {{ t('common.balance') }}
                </div>
                <div class="tabular text-sm font-semibold text-gray-950 dark:text-white">
                  {{ formatHeaderMoney(availableBalance) }}
                </div>
                <div v-if="frozenBalance > 0" class="mt-1 text-xs text-amber-600 dark:text-amber-300">
                  {{ balanceFrozenText }} {{ formatHeaderMoney(frozenBalance) }}
                </div>
              </div>

              <div class="py-1">
                <router-link to="/profile" @click="closeDropdown" class="dropdown-item">
                  <Icon name="user" size="sm" />
                  {{ t('nav.profile') }}
                </router-link>

                <router-link to="/keys" @click="closeDropdown" class="dropdown-item">
                  <Icon name="key" size="sm" />
                  {{ t('nav.apiKeys') }}
                </router-link>


              </div>

              <!-- Contact Support (only show if configured) -->
              <div
                v-if="contactInfo"
                class="mt-1 border-t border-gray-100 px-3 py-2.5 dark:border-dark-700"
              >
                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <svg
                    class="h-3.5 w-3.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                  </svg>
                  <span>{{ t('common.contactSupport') }}:</span>
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{
                    contactInfo
                  }}</span>
                </div>
              </div>

              <div v-if="showOnboardingButton" class="mt-1 border-t border-gray-100 pt-1 dark:border-dark-700">
                <button @click="handleReplayGuide" class="dropdown-item w-full">
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 14a1 1 0 110 2 1 1 0 010-2zm1.07-7.75c0-.6-.49-1.25-1.32-1.25-.7 0-1.22.4-1.43 1.02a1 1 0 11-1.9-.62A3.41 3.41 0 0111.8 5c2.02 0 3.25 1.4 3.25 2.9 0 2-1.83 2.55-2.43 3.12-.43.4-.47.75-.47 1.23a1 1 0 01-2 0c0-1 .16-1.82 1.1-2.7.69-.64 1.82-1.05 1.82-2.06z"
                    />
                  </svg>
                  {{ $t('onboarding.restartTour') }}
                </button>
              </div>

              <div class="mt-1 border-t border-gray-100 pt-1 dark:border-dark-700">
                <button
                  @click="handleLogout"
                  class="dropdown-item w-full text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  {{ t('nav.logout') }}
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore, useAuthStore, useOnboardingStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import AppearanceMenu from './AppearanceMenu.vue'
import CommandPalette from './CommandPalette.vue'
import SubscriptionProgressMini from '@/components/common/SubscriptionProgressMini.vue'
import AnnouncementBell from '@/components/common/AnnouncementBell.vue'
import Icon from '@/components/icons/Icon.vue'
import { sanitizeUrl } from '@/utils/url'
import { FeatureFlags, isFeatureFlagEnabled } from '@/utils/featureFlags'

const router = useRouter()
const { t } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()
const onboardingStore = useOnboardingStore()

const user = computed(() => authStore.user)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const contactInfo = computed(() => appStore.contactInfo)
const docUrl = computed(() => sanitizeUrl(appStore.docUrl))
const modelPlazaEnabled = computed(() => isFeatureFlagEnabled(FeatureFlags.modelPlaza))
const avatarUrl = computed(() => user.value?.avatar_url?.trim() || '')
const availableBalance = computed(() => Number(user.value?.balance || 0))
const frozenBalance = computed(() => Number(user.value?.frozen_balance || 0))
const totalBalance = computed(() => availableBalance.value + frozenBalance.value)
const balanceAvailableText = computed(() => t('common.availableBalance') === 'common.availableBalance' ? '可用余额' : t('common.availableBalance'))
const balanceFrozenText = computed(() => t('common.frozenBalance') === 'common.frozenBalance' ? '冻结金额' : t('common.frozenBalance'))
const balanceTotalText = computed(() => t('common.totalBalance') === 'common.totalBalance' ? '总余额' : t('common.totalBalance'))
const balanceFrozenLabel = computed(() => `${balanceFrozenText.value} ${formatHeaderMoney(frozenBalance.value)}`)

// 只在标准模式的管理员下显示新手引导按钮
const showOnboardingButton = computed(() => {
  return !authStore.isSimpleMode && user.value?.role === 'admin'
})

const userInitials = computed(() => {
  if (!user.value) return ''
  // Prefer username, fallback to email
  if (user.value.username) {
    return user.value.username.substring(0, 2).toUpperCase()
  }
  if (user.value.email) {
    // Get the part before @ and take first 2 chars
    const localPart = user.value.email.split('@')[0]
    return localPart.substring(0, 2).toUpperCase()
  }
  return ''
})

const displayName = computed(() => {
  if (!user.value) return ''
  return user.value.username || user.value.email?.split('@')[0] || ''
})

// 订阅功能关闭时不挂载顶栏订阅徽章（组件 onMounted 会拉取订阅接口）。
const subscriptionFeatureEnabled = computed(() => isFeatureFlagEnabled(FeatureFlags.subscription))

function toggleMobileSidebar() {
  appStore.toggleMobileSidebar()
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function closeDropdown() {
  dropdownOpen.value = false
}

async function handleLogout() {
  closeDropdown()
  try {
    await authStore.logout()
  } catch (error) {
    // Ignore logout errors - still leave the console
    console.error('Logout error:', error)
  }
  // Signing out lands on the home page; sites in backend mode have no public home, so sign-in it is
  await router.push(appStore.backendModeEnabled ? '/login' : '/home')
}

function handleReplayGuide() {
  closeDropdown()
  onboardingStore.replay()
}

function formatHeaderMoney(value: number) {
  if (!Number.isFinite(value)) return '$0.00'
  return `$${value.toFixed(2)}`
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* the bar floats: rounded, hairline-edged glass with a gap above it */
.app-header-wrap {
  padding-top: 12px;
}

.app-header {
  border-radius: 16px;
  border: 1px solid var(--hairline);
  background: rgb(var(--c-paper) / 0.82);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
  backdrop-filter: blur(18px) saturate(150%);
  box-shadow: var(--shadow-card);
}

.dark .app-header {
  background: rgb(var(--c-dark-950) / 0.72);
}

.app-avatar {
  background: linear-gradient(135deg, rgb(var(--signal-a)), rgb(var(--signal-b)) 50%, rgb(var(--signal-c)));
  box-shadow:
    inset 0 1px 1px rgb(255 255 255 / 0.35),
    0 0 0 2px rgb(var(--c-paper)),
    0 0 0 3px rgb(var(--signal-b) / 0.35);
  transition: box-shadow 0.25s var(--ease-out), transform 0.35s var(--ease-spring);
}

.dark .app-avatar {
  box-shadow:
    inset 0 1px 1px rgb(255 255 255 / 0.3),
    0 0 0 2px rgb(var(--c-dark-950)),
    0 0 0 3px rgb(var(--signal-b) / 0.4);
}

button:hover > .app-avatar {
  transform: scale(1.06);
}

.dropdown-enter-active {
  transition:
    opacity 0.18s var(--ease-out),
    transform 0.18s var(--ease-out);
}

.dropdown-leave-active {
  transition:
    opacity 0.12s ease-in,
    transform 0.12s ease-in;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.97) translateY(-4px);
}
</style>
