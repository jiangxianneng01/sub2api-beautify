<template>
  <div class="card">
    <div class="border-b border-gray-100 px-6 py-4 dark:border-dark-700">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('dashboard.quickActions') }}</h2>
    </div>
    <div class="space-y-3 p-4">
      <button @click="router.push('/keys')" class="quick-action group">
        <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 quick-action-icon dark:bg-primary-900/30">
          <Icon name="key" size="lg" class="text-primary-600 dark:text-primary-400" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ t('dashboard.createApiKey') }}</p>
          <p class="text-xs text-gray-500 dark:text-dark-400">{{ t('dashboard.generateNewKey') }}</p>
        </div>
        <Icon
          name="chevronRight"
          size="md"
          class="quick-action-arrow text-gray-400 group-hover:text-primary-500 dark:text-dark-500"
        />
      </button>

      <button @click="router.push('/usage')" class="quick-action group">
        <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 quick-action-icon dark:bg-emerald-900/30">
          <Icon name="chart" size="lg" class="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ t('dashboard.viewUsage') }}</p>
          <p class="text-xs text-gray-500 dark:text-dark-400">{{ t('dashboard.checkDetailedLogs') }}</p>
        </div>
        <Icon
          name="chevronRight"
          size="md"
          class="quick-action-arrow text-gray-400 group-hover:text-emerald-500 dark:text-dark-500"
        />
      </button>

      <button v-if="canUseBatchImage" @click="router.push('/batch-image')" class="quick-action group">
        <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sky-100 quick-action-icon dark:bg-sky-900/30">
          <Icon name="sparkles" size="lg" class="text-sky-600 dark:text-sky-400" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ t('dashboard.batchImageAgent') }}</p>
          <p class="text-xs text-gray-500 dark:text-dark-400">{{ t('dashboard.batchImageAgentDesc') }}</p>
        </div>
        <Icon
          name="chevronRight"
          size="md"
          class="quick-action-arrow text-gray-400 group-hover:text-sky-500 dark:text-dark-500"
        />
      </button>

      <button @click="router.push('/redeem')" class="quick-action group">
        <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 quick-action-icon dark:bg-amber-900/30">
          <Icon name="gift" size="lg" class="text-amber-600 dark:text-amber-400" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ t('dashboard.redeemCode') }}</p>
          <p class="text-xs text-gray-500 dark:text-dark-400">{{ t('dashboard.addBalanceWithCode') }}</p>
        </div>
        <Icon
          name="chevronRight"
          size="md"
          class="quick-action-arrow text-gray-400 group-hover:text-amber-500 dark:text-dark-500"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import { useBatchImageAccess } from '@/composables/useBatchImageAccess'
const router = useRouter()
const { t } = useI18n()
const { canUseBatchImage, refreshBatchImageAccess } = useBatchImageAccess()

onMounted(() => {
  void refreshBatchImageAccess()
})
</script>

<style scoped>
/* each shortcut: rests flat, lifts toward the cursor, and its arrow leans the way it leads */
.quick-action {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.875rem;
  text-align: left;
  background: rgb(var(--c-gray-50));
  border: 1px solid transparent;
  transition:
    background-color 0.2s var(--ease-out),
    border-color 0.25s var(--ease-out),
    box-shadow 0.3s var(--ease-out),
    transform 0.45s var(--ease-spring);
}

.quick-action:hover {
  background: #fff;
  border-color: var(--hairline);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-1px);
}

.quick-action:active {
  transform: scale(0.985);
  transition-duration: 0.2s, 0.25s, 0.3s, 0.1s;
}

.dark .quick-action {
  background: rgb(255 255 255 / 0.025);
  border-color: rgb(255 255 255 / 0.04);
}

.dark .quick-action:hover {
  background: rgb(255 255 255 / 0.05);
  border-color: rgb(255 255 255 / 0.1);
}

.quick-action-icon {
  transition: transform 0.5s var(--ease-spring);
}

.quick-action:hover .quick-action-icon {
  transform: rotate(-6deg) scale(1.06);
}

.quick-action-arrow {
  transition:
    color 0.2s var(--ease-out),
    transform 0.45s var(--ease-spring);
}

.quick-action:hover .quick-action-arrow {
  transform: translateX(3px);
}
</style>
