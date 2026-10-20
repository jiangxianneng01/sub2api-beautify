<template>
  <!-- Floating sidebar and floating header on a plain console background; the page title sits in the page -->
  <div class="app-shell min-h-screen bg-gray-50 dark:bg-dark-950">
    <AppSidebar />

    <div
      class="app-stage relative min-h-screen px-3 lg:pl-0"
      :class="[sidebarCollapsed ? 'lg:ml-[96px]' : 'lg:ml-[280px]']"
    >
      <AppHeader />

      <main ref="mainRef" class="page-enter pb-8 pt-6">
        <header
          v-if="heading.visible.value"
          class="page-heading"
          :class="{ 'page-heading--desktop-only': heading.hiddenOnMobile.value }"
        >
          <h1 class="page-heading-title">{{ heading.title.value }}</h1>
          <p v-if="heading.description.value" class="page-heading-desc">{{ heading.description.value }}</p>
        </header>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/styles/onboarding.css'
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { useOnboardingTour } from '@/composables/useOnboardingTour'
import { useOnboardingStore } from '@/stores/onboarding'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import { useInterfaceMotion } from '@/composables/useInterfaceMotion'
import { usePageHeading } from '@/composables/usePageHeading'

const appStore = useAppStore()
const authStore = useAuthStore()
const sidebarCollapsed = computed(() => appStore.sidebarCollapsed)
const isAdmin = computed(() => authStore.user?.role === 'admin')

const { replayTour } = useOnboardingTour({
  storageKey: isAdmin.value ? 'admin_guide' : 'user_guide',
  autoStart: true
})

const onboardingStore = useOnboardingStore()

// scroll reveal, counting figures and the panel spotlight for every console page
const mainRef = ref<HTMLElement | null>(null)
useInterfaceMotion(mainRef)

const heading = usePageHeading()

onMounted(() => {
  onboardingStore.setReplayCallback(replayTour)
})

defineExpose({ replayTour })
</script>
