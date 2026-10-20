<template>
  <AppLayout>
    <div class="rd">
      <div class="rd-top">
        <!-- ---------------------------------------------------- the voucher -->
        <section class="card rd-ticket" :aria-label="t('redeem.title')">
          <div class="rd-stub" aria-hidden="true">
            <span class="rd-stub-icon"><Icon name="gift" size="lg" /></span>
          </div>
          <div class="rd-body">
            <div class="rd-head">
              <h2 class="rd-title">{{ t('redeem.title') }}</h2>
              <p class="rd-lead">{{ t('redeem.description') }}</p>
            </div>

            <form class="rd-form" @submit.prevent="handleRedeem">
              <label for="code" class="sr-only">{{ t('redeem.redeemCodeLabel') }}</label>
              <div class="rd-field" :class="{ 'is-busy': submitting }">
                <input
                  id="code"
                  v-model="redeemCode"
                  type="text"
                  required
                  autocomplete="off"
                  spellcheck="false"
                  :placeholder="t('redeem.redeemCodePlaceholder')"
                  :disabled="submitting"
                  class="rd-input"
                />
                <button type="submit" :disabled="!redeemCode || submitting" class="btn btn-primary rd-submit">
                  <svg v-if="submitting" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <Icon v-else name="checkCircle" size="sm" />
                  {{ submitting ? t('redeem.redeeming') : t('redeem.redeemButton') }}
                </button>
              </div>
              <p class="rd-hint">{{ t('redeem.redeemCodeHint') }}</p>
            </form>

            <!-- the outcome, right under the field it came from -->
            <Transition name="rd-pop" mode="out-in">
              <div v-if="redeemResult" key="ok" class="rd-result is-ok" role="status">
                <span class="rd-result-icon"><Icon name="checkCircle" size="md" /></span>
                <div class="min-w-0">
                  <p class="rd-result-title">{{ t('redeem.redeemSuccess') }}</p>
                  <p class="rd-result-text">{{ redeemResult.message }}</p>
                  <div class="rd-result-facts">
                    <span v-if="redeemResult.type === 'balance'">{{ t('redeem.added') }} <b>${{ redeemResult.value.toFixed(2) }}</b></span>
                    <span v-else-if="redeemResult.type === 'concurrency'">{{ t('redeem.added') }} <b>{{ redeemResult.value }} {{ t('redeem.concurrentRequests') }}</b></span>
                    <span v-else-if="redeemResult.type === 'subscription'">
                      {{ t('redeem.subscriptionAssigned') }}
                      <b v-if="redeemResult.group_name">{{ redeemResult.group_name }}</b>
                      <template v-if="redeemResult.validity_days">（{{ t('redeem.subscriptionDays', { days: redeemResult.validity_days }) }}）</template>
                    </span>
                    <span v-if="redeemResult.new_balance !== undefined">{{ t('redeem.newBalance') }} <b>${{ redeemResult.new_balance.toFixed(2) }}</b></span>
                    <span v-if="redeemResult.new_concurrency !== undefined">{{ t('redeem.newConcurrency') }} <b>{{ redeemResult.new_concurrency }} {{ t('redeem.requests') }}</b></span>
                  </div>
                </div>
              </div>
              <div v-else-if="errorMessage" key="err" class="rd-result is-err" role="alert">
                <span class="rd-result-icon"><Icon name="exclamationCircle" size="md" /></span>
                <div class="min-w-0">
                  <p class="rd-result-title">{{ t('redeem.redeemFailed') }}</p>
                  <p class="rd-result-text">{{ errorMessage }}</p>
                </div>
              </div>
            </Transition>

            <div class="rd-rules">
              <h3 class="rd-rules-title">{{ t('redeem.aboutCodes') }}</h3>
              <ul>
                <li><Icon name="check" size="xs" :stroke-width="2.5" />{{ t('redeem.codeRule1') }}</li>
                <li><Icon name="check" size="xs" :stroke-width="2.5" />{{ t('redeem.codeRule2') }}</li>
                <li><Icon name="check" size="xs" :stroke-width="2.5" />{{ t('redeem.codeRule4') }}</li>
                <li>
                  <Icon name="check" size="xs" :stroke-width="2.5" />
                  <span>
                    {{ t('redeem.codeRule3') }}
                    <span v-if="contactInfo" class="rd-contact">{{ contactInfo }}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ---------------------------------------------------- the wallet -->
        <aside class="rd-wallet" :aria-label="t('redeem.currentBalance')">
          <div class="rd-wallet-glow" aria-hidden="true"></div>
          <p class="rd-wallet-label">{{ t('redeem.currentBalance') }}</p>
          <p class="rd-wallet-amount">
            <!-- the balance can go below zero (usage is billed after the request) -->
            <template v-if="(user?.balance ?? 0) < 0">−</template><span class="rd-wallet-currency">$</span>{{ Math.abs(user?.balance ?? 0).toFixed(2) }}
            <Transition name="rd-pop">
              <span v-if="redeemResult?.type === 'balance'" class="rd-wallet-delta">+${{ redeemResult.value.toFixed(2) }}</span>
            </Transition>
          </p>
          <div class="rd-wallet-row">
            <span class="rd-wallet-k"><Icon name="bolt" size="sm" />{{ t('redeem.concurrency') }}</span>
            <span class="rd-wallet-v">{{ user?.concurrency || 0 }} {{ t('redeem.requests') }}</span>
          </div>
          <!-- the newest entry only sits first on the first page of the history -->
          <div v-if="history.length && historyPage === 1" class="rd-wallet-row">
            <span class="rd-wallet-k"><Icon name="clock" size="sm" />{{ t('redeem.recentActivity') }}</span>
            <span class="rd-wallet-v">{{ formatHistoryValue(history[0]) }}</span>
          </div>
          <svg class="rd-wallet-orbit" viewBox="0 0 200 120" aria-hidden="true">
            <ellipse cx="100" cy="60" rx="92" ry="30" transform="rotate(-14 100 60)" />
            <circle cx="182" cy="40" r="4" />
          </svg>
        </aside>
      </div>

      <!-- ---------------------------------------------------- what has been redeemed -->
      <section class="card rd-history">
        <header class="rd-history-head">
          <h2 class="rd-history-title">{{ t('redeem.recentActivity') }}</h2>
        </header>

        <div v-if="loadingHistory" class="rd-history-loading">
          <svg class="h-6 w-6 animate-spin text-primary-500" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>

        <ol v-else-if="history.length > 0" class="rd-list">
          <li v-for="item in history" :key="item.id" class="rd-row" :class="historyTone(item)">
            <span class="rd-row-icon"><Icon :name="historyIcon(item)" size="sm" /></span>
            <div class="rd-row-main">
              <p class="rd-row-title">{{ getHistoryItemTitle(item) }}</p>
              <p class="rd-row-time">{{ formatDateTime(item.used_at) }}</p>
              <p v-if="item.notes" class="rd-row-notes" :title="item.notes">{{ item.notes }}</p>
            </div>
            <div class="rd-row-side">
              <p class="rd-row-value">{{ formatHistoryValue(item) }}</p>
              <p v-if="!isAdminAdjustment(item.type)" class="rd-row-code">{{ item.code.slice(0, 8) }}...</p>
              <p v-else class="rd-row-code">{{ t('redeem.adminAdjustment') }}</p>
            </div>
          </li>
        </ol>

        <div v-else class="rd-empty">
          <span class="rd-empty-icon"><Icon name="clock" size="lg" /></span>
          <p>{{ t('redeem.historyWillAppear') }}</p>
        </div>

        <footer class="rd-pager">
          <span class="rd-pager-total">{{ t('common.total') }}: {{ historyTotal }} {{ t('pagination.results') }}</span>
          <div class="rd-pager-tools">
            <label class="rd-pager-size">
              {{ t('pagination.perPage') }}
              <select
                v-model="historyPageSize"
                class="input w-24"
                :disabled="loadingHistory || submitting"
                @change="fetchHistory(1)"
              >
                <option v-for="size in [20, 50, 100]" :key="size" :value="size">{{ size }}</option>
              </select>
            </label>
            <button
              class="btn btn-secondary btn-sm"
              :disabled="loadingHistory || submitting || historyPage <= 1"
              @click="fetchHistory(historyPage - 1)"
            >{{ t('pagination.previous') }}</button>
            <button
              class="btn btn-secondary btn-sm"
              :disabled="loadingHistory || submitting || historyPage * historyPageSize >= historyTotal"
              @click="fetchHistory(historyPage + 1)"
            >{{ t('pagination.next') }}</button>
          </div>
        </footer>
      </section>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { useSubscriptionStore } from '@/stores/subscriptions'
import { redeemAPI, authAPI, type RedeemHistoryItem } from '@/api'
import AppLayout from '@/components/layout/AppLayout.vue'
import Icon from '@/components/icons/Icon.vue'
import { formatDateTime } from '@/utils/format'
import { extractApiErrorMessage } from '@/utils/apiError'

const { t } = useI18n()
const authStore = useAuthStore()
const appStore = useAppStore()
const subscriptionStore = useSubscriptionStore()

const user = computed(() => authStore.user)

const redeemCode = ref('')
const submitting = ref(false)
const redeemResult = ref<{
  message: string
  type: string
  value: number
  new_balance?: number
  new_concurrency?: number
  group_name?: string
  validity_days?: number
} | null>(null)
const errorMessage = ref('')

// History data
const history = ref<RedeemHistoryItem[]>([])
const loadingHistory = ref(false)
const historyPage = ref(1)
const historyPageSize = ref(20)
const historyTotal = ref(0)
let historyRequest = 0
let loadedHistoryPageSize = 20
const contactInfo = ref('')

// Helper functions for history display
const isBalanceType = (type: string) => {
  return type === 'balance' || type === 'admin_balance'
}

const isSubscriptionType = (type: string) => {
  return type === 'subscription'
}

const isAdminAdjustment = (type: string) => {
  return type === 'admin_balance' || type === 'admin_concurrency'
}

const getHistoryItemTitle = (item: RedeemHistoryItem) => {
  if (item.type === 'balance') {
    return t('redeem.balanceAddedRedeem')
  } else if (item.type === 'admin_balance') {
    return item.value >= 0 ? t('redeem.balanceAddedAdmin') : t('redeem.balanceDeductedAdmin')
  } else if (item.type === 'concurrency') {
    return t('redeem.concurrencyAddedRedeem')
  } else if (item.type === 'admin_concurrency') {
    return item.value >= 0 ? t('redeem.concurrencyAddedAdmin') : t('redeem.concurrencyReducedAdmin')
  } else if (item.type === 'subscription') {
    return t('redeem.subscriptionAssigned')
  }
  return t('common.unknown')
}

/** colour family for a history row */
const historyTone = (item: RedeemHistoryItem) => {
  if (isSubscriptionType(item.type)) return 'is-sub'
  if (isBalanceType(item.type)) return item.value >= 0 ? 'is-plus' : 'is-minus'
  return item.value >= 0 ? 'is-conc' : 'is-minus'
}

const historyIcon = (item: RedeemHistoryItem) =>
  isBalanceType(item.type) ? 'dollar' : isSubscriptionType(item.type) ? 'badge' : 'bolt'

const formatHistoryValue = (item: RedeemHistoryItem) => {
  if (isBalanceType(item.type)) {
    const sign = item.value >= 0 ? '+' : ''
    return `${sign}$${item.value.toFixed(2)}`
  } else if (isSubscriptionType(item.type)) {
    // 订阅类型显示有效天数和分组名称
    const days = item.validity_days || Math.round(item.value)
    const groupName = item.group?.name || ''
    return groupName ? `${days}${t('redeem.days')} - ${groupName}` : `${days}${t('redeem.days')}`
  } else {
    const sign = item.value >= 0 ? '+' : ''
    return `${sign}${item.value} ${t('redeem.requests')}`
  }
}

const fetchHistory = async (page = 1) => {
  const request = ++historyRequest
  const pageSize = historyPageSize.value
  loadingHistory.value = true
  try {
    const result = await redeemAPI.getHistory(page, pageSize)
    if (request !== historyRequest) return
    history.value = result.items
    historyTotal.value = result.total
    historyPage.value = page
    historyPageSize.value = pageSize
    loadedHistoryPageSize = pageSize
  } catch (error) {
    if (request !== historyRequest) return
    historyPageSize.value = loadedHistoryPageSize
    appStore.showError(t('redeem.historyLoadFailed'))
    console.error('Failed to fetch history:', error)
  } finally {
    if (request === historyRequest) loadingHistory.value = false
  }
}

const handleRedeem = async () => {
  if (!redeemCode.value.trim()) {
    appStore.showError(t('redeem.pleaseEnterCode'))
    return
  }

  submitting.value = true
  errorMessage.value = ''
  redeemResult.value = null

  try {
    const result = await redeemAPI.redeem(redeemCode.value.trim())

    redeemResult.value = result

    // Refresh user data to get updated balance/concurrency
    try {
      await authStore.refreshUser()
    } catch (error) {
      console.error('Failed to refresh user after redeem:', error)
      appStore.showWarning(t('redeem.userRefreshFailed'))
    }

    // If subscription type, immediately refresh subscription status
    if (result.type === 'subscription') {
      try {
        await subscriptionStore.fetchActiveSubscriptions(true) // force refresh
      } catch (error) {
        console.error('Failed to refresh subscriptions after redeem:', error)
        appStore.showWarning(t('redeem.subscriptionRefreshFailed'))
      }
    }

    // Clear the input
    redeemCode.value = ''

    // Refresh history
    await fetchHistory()

    // Show success toast
    appStore.showSuccess(t('redeem.codeRedeemSuccess'))
  } catch (error: any) {
    // the API client rejects with { status, message }: show the server's reason (used, expired, unknown code…)
    errorMessage.value = extractApiErrorMessage(error, t('redeem.failedToRedeem'))

    appStore.showError(t('redeem.redeemFailed'))
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  fetchHistory()
  try {
    const settings = await authAPI.getPublicSettings()
    contactInfo.value = settings.contact_info || ''
  } catch (error) {
    console.error('Failed to load contact info:', error)
  }
})
</script>

<style scoped>
.rd {
  display: grid;
  gap: 1rem;
  max-width: 76rem;
  margin-inline: auto;
}

.rd-top {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: stretch;
}

@media (max-width: 1023px) {
  .rd-top {
    grid-template-columns: minmax(0, 1fr);
  }

  .rd-wallet {
    order: -1;
  }
}

/* ---------------- the voucher ---------------- */
.rd-ticket {
  --stub: 5.25rem;
  position: relative;
  display: grid;
  grid-template-columns: var(--stub) minmax(0, 1fr);
  overflow: hidden;
  /* the two notches of a tear-off ticket, cut where the stub meets the body */
  -webkit-mask:
    radial-gradient(circle at var(--stub) 0, transparent 0.8rem, #000 0.84rem) top / 100% 51% no-repeat,
    radial-gradient(circle at var(--stub) 100%, transparent 0.8rem, #000 0.84rem) bottom / 100% 51% no-repeat;
  mask:
    radial-gradient(circle at var(--stub) 0, transparent 0.8rem, #000 0.84rem) top / 100% 51% no-repeat,
    radial-gradient(circle at var(--stub) 100%, transparent 0.8rem, #000 0.84rem) bottom / 100% 51% no-repeat;
}

@media (max-width: 639px) {
  .rd-ticket {
    --stub: 0rem;
    -webkit-mask: none;
    mask: none;
  }

  .rd-stub {
    display: none;
  }
}

.rd-stub {
  position: relative;
  display: grid;
  place-items: start center;
  padding-top: 1.75rem;
  border-right: 2px dashed var(--hairline-strong);
  /* fine guilloché lines, the way printed vouchers are */
  background:
    repeating-linear-gradient(135deg, rgb(var(--signal-a) / 0.1) 0 1px, transparent 1px 7px),
    linear-gradient(180deg, rgb(var(--signal-a) / 0.12), rgb(var(--signal-c) / 0.06));
}

.rd-stub-icon {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.9rem;
  color: rgb(var(--c-on-primary));
  background: linear-gradient(135deg, rgb(var(--signal-a)), rgb(var(--signal-b)));
  box-shadow: 0 10px 22px -10px rgb(var(--signal-b) / 0.9);
}

.rd-body {
  display: grid;
  align-content: start;
  gap: 1.1rem;
  padding: 1.6rem clamp(1.25rem, 3vw, 2.1rem) 1.6rem clamp(1.25rem, 2.6vw, 1.9rem);
}

.rd-title {
  font-family: theme('fontFamily.display');
  font-size: 1.45rem;
  font-weight: 740;
  letter-spacing: -0.02em;
  color: rgb(var(--c-gray-950));
}

.dark .rd-title {
  color: #fff;
}

.rd-lead {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: rgb(var(--c-gray-500));
}

.dark .rd-lead {
  color: rgb(var(--c-dark-400));
}

.rd-form {
  display: grid;
  gap: 0.5rem;
}

.rd-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  border-radius: 1rem;
  background: rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
  transition: box-shadow 0.25s var(--ease-out);
}

.dark .rd-field {
  background: rgb(0 0 0 / 0.28);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1);
}

.rd-field:focus-within {
  box-shadow:
    inset 0 0 0 1.5px rgb(var(--c-primary-500)),
    0 0 0 4px rgb(var(--c-primary-500) / 0.14);
}

.dark .rd-field:focus-within {
  box-shadow:
    inset 0 0 0 1.5px rgb(var(--signal-a) / 0.9),
    0 0 0 4px rgb(var(--signal-a) / 0.12);
}

.rd-input {
  flex: 1;
  min-width: 0;
  height: 2.9rem;
  padding: 0 0.85rem;
  border: 0;
  background: transparent;
  font-family: theme('fontFamily.mono');
  font-size: 1.1rem;
  letter-spacing: 0.06em;
  color: rgb(var(--c-gray-950));
  outline: none;
}

.dark .rd-input {
  color: #fff;
}

.rd-input::placeholder {
  font-family: theme('fontFamily.sans');
  font-size: 0.9rem;
  letter-spacing: 0;
  color: rgb(var(--c-gray-400));
}

.dark .rd-input::placeholder {
  color: rgb(var(--c-dark-500));
}

.rd-submit {
  flex-shrink: 0;
  gap: 0.4rem;
  height: 2.9rem;
  padding-inline: 1.25rem;
  border-radius: 0.75rem;
}

.rd-hint {
  padding-left: 0.4rem;
  font-size: 0.75rem;
  color: rgb(var(--c-gray-500));
}

.dark .rd-hint {
  color: rgb(var(--c-dark-400));
}

.rd-result {
  display: flex;
  gap: 0.85rem;
  padding: 0.9rem 1rem;
  border-radius: 0.95rem;
}

.rd-result.is-ok {
  background: rgb(16 185 129 / 0.08);
  box-shadow: inset 0 0 0 1px rgb(16 185 129 / 0.28);
  color: rgb(4 120 87);
}

.rd-result.is-err {
  background: rgb(239 68 68 / 0.08);
  box-shadow: inset 0 0 0 1px rgb(239 68 68 / 0.28);
  color: rgb(185 28 28);
}

.dark .rd-result.is-ok {
  color: rgb(110 231 183);
}

.dark .rd-result.is-err {
  color: rgb(252 165 165);
}

.rd-result-icon {
  flex-shrink: 0;
  padding-top: 1px;
}

.rd-result-title {
  font-size: 0.875rem;
  font-weight: 700;
}

.rd-result-text {
  margin-top: 0.15rem;
  font-size: 0.8125rem;
  opacity: 0.9;
}

.rd-result-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.1rem;
  margin-top: 0.5rem;
  font-size: 0.8125rem;
}

.rd-result-facts b {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.rd-rules {
  padding-top: 1rem;
  border-top: 1px solid var(--hairline);
}

.rd-rules-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: rgb(var(--c-gray-700));
}

.dark .rd-rules-title {
  color: rgb(var(--c-dark-200));
}

.rd-rules ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem 1.25rem;
  margin-top: 0.6rem;
}

@media (max-width: 639px) {
  .rd-rules ul {
    grid-template-columns: minmax(0, 1fr);
  }
}

.rd-rules li {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: rgb(var(--c-gray-600));
}

.dark .rd-rules li {
  color: rgb(var(--c-dark-300));
}

.rd-rules li > :first-child {
  flex-shrink: 0;
  margin-top: 0.2rem;
  color: rgb(var(--c-primary-500));
}

.dark .rd-rules li > :first-child {
  color: rgb(var(--signal-a));
}

.rd-contact {
  display: inline-block;
  margin-left: 0.35rem;
  padding: 0 0.45rem;
  border-radius: 0.4rem;
  font-weight: 600;
  color: rgb(var(--c-primary-800));
  background: rgb(var(--c-primary-500) / 0.12);
}

.dark .rd-contact {
  color: rgb(var(--signal-a));
  background: rgb(var(--signal-a) / 0.1);
}

/* ---------------- the wallet: always the brand's night side ---------------- */
.rd-wallet {
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.9rem;
  overflow: hidden;
  padding: 1.6rem 1.6rem 1.75rem;
  border-radius: 1rem;
  color: #f4f1ec;
  background:
    radial-gradient(90% 70% at 100% 0%, rgb(var(--signal-b) / 0.22), transparent 60%),
    radial-gradient(80% 60% at 0% 100%, rgb(var(--signal-a) / 0.14), transparent 60%),
    linear-gradient(160deg, #17161a, #0a0a0c);
  box-shadow:
    inset 0 0 0 1px rgb(var(--signal-a) / 0.2),
    0 24px 50px -28px rgb(0 0 0 / 0.7);
}

.rd-wallet-glow {
  position: absolute;
  right: -3rem;
  top: -3rem;
  width: 12rem;
  height: 12rem;
  border-radius: 9999px;
  background: radial-gradient(circle, rgb(var(--signal-a) / 0.35), transparent 65%);
  filter: blur(6px);
  pointer-events: none;
}

.rd-wallet-label {
  position: relative;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgb(244 241 236 / 0.65);
}

.rd-wallet-amount {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.35rem;
  font-family: theme('fontFamily.display');
  font-size: clamp(2.4rem, 4.2vw, 3.25rem);
  font-weight: 760;
  font-stretch: 112%;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--signal-a));
}

.rd-wallet-currency {
  font-size: 0.55em;
  color: rgb(var(--signal-a) / 0.7);
}

.rd-wallet-delta {
  align-self: center;
  margin-left: 0.5rem;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  font-family: theme('fontFamily.sans');
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0;
  color: rgb(110 231 183);
  background: rgb(16 185 129 / 0.16);
}

.rd-wallet-row {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgb(255 255 255 / 0.08);
  font-size: 0.8125rem;
}

.rd-wallet-k {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: rgb(244 241 236 / 0.6);
}

.rd-wallet-v {
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.rd-wallet-orbit {
  position: absolute;
  right: -1.5rem;
  bottom: -1.25rem;
  width: 15rem;
  fill: none;
  stroke: rgb(var(--signal-a) / 0.28);
  stroke-width: 1.2;
  pointer-events: none;
}

.rd-wallet-orbit circle {
  fill: rgb(var(--signal-a));
  stroke: none;
  filter: drop-shadow(0 0 6px rgb(var(--signal-a)));
}

/* ---------------- history ---------------- */
.rd-history {
  display: grid;
  gap: 0.5rem;
  padding: 1.25rem 1.4rem 1rem;
}

.rd-history-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: rgb(var(--c-gray-950));
}

.dark .rd-history-title {
  color: #fff;
}

.rd-history-title::before {
  content: '';
  width: 3px;
  height: 0.95em;
  border-radius: 9999px;
  background: linear-gradient(180deg, rgb(var(--signal-a)), rgb(var(--signal-c)));
}

.rd-history-loading {
  display: grid;
  place-items: center;
  padding: 2.5rem 0;
}

.rd-list {
  display: grid;
}

.rd-row {
  --tone: 16 185 129;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.9rem;
  padding: 0.8rem 0.4rem;
  border-bottom: 1px solid var(--hairline);
  transition: background-color 0.2s var(--ease-out);
}

.rd-row:last-child {
  border-bottom: 0;
}

.rd-row:hover {
  background: rgb(var(--c-gray-50) / 0.8);
}

.dark .rd-row:hover {
  background: rgb(255 255 255 / 0.025);
}

.rd-row.is-minus {
  --tone: 239 68 68;
}

.rd-row.is-sub {
  --tone: 168 85 247;
}

.rd-row.is-conc {
  --tone: 59 130 246;
}

.rd-row-icon {
  display: grid;
  place-items: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.7rem;
  color: rgb(var(--tone));
  background: rgb(var(--tone) / 0.12);
}

.rd-row-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--c-gray-900));
}

.dark .rd-row-title {
  color: rgb(var(--c-dark-50));
}

.rd-row-time,
.rd-row-notes {
  font-size: 0.75rem;
  color: rgb(var(--c-gray-500));
}

.dark .rd-row-time,
.dark .rd-row-notes {
  color: rgb(var(--c-dark-400));
}

.rd-row-notes {
  max-width: 32rem;
  overflow: hidden;
  font-style: italic;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rd-row-side {
  text-align: right;
}

.rd-row-value {
  font-size: 0.9rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--tone));
}

.rd-row-code {
  margin-top: 1px;
  font-family: theme('fontFamily.mono');
  font-size: 0.72rem;
  color: rgb(var(--c-gray-400));
}

.dark .rd-row-code {
  color: rgb(var(--c-dark-500));
}

.rd-empty {
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  padding: 2.5rem 1rem;
  font-size: 0.875rem;
  color: rgb(var(--c-gray-500));
}

.rd-empty-icon {
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 1rem;
  color: rgb(var(--c-gray-400));
  background: rgb(var(--c-gray-100));
}

.dark .rd-empty-icon {
  color: rgb(var(--c-dark-400));
  background: rgb(255 255 255 / 0.05);
}

.rd-pager {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--hairline);
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-500));
}

.dark .rd-pager {
  color: rgb(var(--c-dark-400));
}

.rd-pager-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.rd-pager-size {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.rd-pager-size .input {
  padding-block: 0.35rem;
}

/* ---------------- motion ---------------- */
.rd-pop-enter-active {
  transition:
    opacity 0.35s var(--ease-out),
    transform 0.45s var(--ease-spring);
}

.rd-pop-leave-active {
  transition: opacity 0.18s ease;
}

.rd-pop-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.rd-pop-leave-to {
  opacity: 0;
}
</style>
