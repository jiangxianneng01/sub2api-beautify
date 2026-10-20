<template>
  <!--
    One upstream account as a card. What an operator checks most sits in the middle, large:
    today's account cost, what users were charged for it, and how full its concurrency is.
    The scheduling switch is in the corner, always reachable.
  -->
  <article
    class="acard"
    :class="{
      'is-paused': !account.schedulable,
      'is-error': account.status === 'error',
      'is-inactive': account.status === 'inactive',
      'is-selected': selected
    }"
    :style="{ '--brand': brand }"
  >
    <header class="acard-head">
      <label class="acard-check" :title="t('admin.accounts.board.select')">
        <input type="checkbox" :checked="selected" :aria-label="t('admin.accounts.board.select')" @change="emit('toggle-select', account.id)" />
      </label>
      <span class="acard-logo" aria-hidden="true">
        <PlatformIcon :platform="account.platform" size="lg" />
      </span>
      <div class="acard-id">
        <p class="acard-name" :title="account.name">{{ account.name }}</p>
        <p class="acard-sub">
          <span>{{ platformName }}</span>
          <i aria-hidden="true">·</i>
          <span>{{ typeLabel }}</span>
          <template v-if="email">
            <i aria-hidden="true">·</i>
            <span class="acard-email" :title="email">{{ email }}</span>
          </template>
        </p>
      </div>
      <button
        type="button"
        class="acard-switch"
        :class="{ 'is-on': account.schedulable }"
        role="switch"
        :aria-checked="account.schedulable"
        :disabled="toggling"
        :title="account.schedulable ? t('admin.accounts.board.pause') : t('admin.accounts.board.resume')"
        @click="emit('toggle-schedulable', account)"
      >
        <span class="acard-switch-label">{{ account.schedulable ? t('admin.accounts.board.scheduling') : t('admin.accounts.board.paused') }}</span>
        <span class="acard-switch-track" aria-hidden="true"><span class="acard-switch-thumb"></span></span>
      </button>
    </header>

    <div class="acard-status">
      <AccountStatusIndicator :account="account as Account" @show-temp-unsched="(a) => emit('show-temp-unsched', a)" />
      <span class="acard-fact" :title="t('admin.accounts.columns.priority')">P{{ account.priority }}</span>
      <span v-if="account.rate_multiplier != null && account.rate_multiplier !== 1" class="acard-fact" :title="t('admin.accounts.columns.billingRateMultiplier')">×{{ account.rate_multiplier }}</span>
    </div>

    <!-- the three numbers that matter -->
    <div class="acard-money">
      <div class="acard-metric">
        <span class="acard-metric-label">{{ t('admin.accounts.board.accountCost') }}</span>
        <span v-if="statsLoading && !stats" class="acard-skel"></span>
        <span v-else class="acard-metric-value">{{ money(stats?.cost) }}</span>
      </div>
      <div class="acard-metric is-charge">
        <span class="acard-metric-label">{{ t('admin.accounts.board.userCharge') }}</span>
        <span v-if="statsLoading && !stats" class="acard-skel"></span>
        <span v-else class="acard-metric-value">{{ money(stats?.user_cost) }}</span>
        <span v-if="marginValue != null" class="acard-margin" :class="{ 'is-neg': marginValue < 0 }" :title="t('admin.accounts.board.marginHint')">
          {{ t('admin.accounts.board.margin') }} {{ marginValue >= 0 ? '+' : '−' }}{{ money(Math.abs(marginValue)) }}<template v-if="marginPct != null"> · {{ marginPct }}%</template>
        </span>
      </div>
    </div>

    <div class="acard-conc" :class="concClass">
      <div class="acard-conc-row">
        <span class="acard-metric-label">{{ t('admin.accounts.board.concurrency') }}</span>
        <span class="acard-conc-num"><b>{{ current }}</b> / {{ account.concurrency }}</span>
      </div>
      <div class="acard-conc-bar" role="meter" :aria-valuenow="current" aria-valuemin="0" :aria-valuemax="account.concurrency" :aria-label="t('admin.accounts.board.concurrency')">
        <span class="acard-conc-fill" :style="{ width: `${concPct}%` }"></span>
      </div>
    </div>

    <p class="acard-usage">
      <span>{{ t('admin.accounts.board.requests', { n: formatNumber(stats?.requests ?? 0) }) }}</span>
      <i aria-hidden="true">·</i>
      <span>{{ t('admin.accounts.board.tokens', { n: compactTokens(stats?.tokens ?? 0) }) }}</span>
      <i aria-hidden="true">·</i>
      <span>{{ account.last_used_at ? t('admin.accounts.board.lastUsed', { time: formatRelativeTime(account.last_used_at) }) : t('admin.accounts.board.neverUsed') }}</span>
    </p>

    <div class="acard-groups">
      <span v-for="g in shownGroups" :key="g.id" class="acard-group" :title="g.name">{{ g.name }}</span>
      <span v-if="moreGroups > 0" class="acard-group is-more">+{{ moreGroups }}</span>
      <span v-if="!groups.length" class="acard-group is-none">{{ t('admin.accounts.board.noGroups') }}</span>
    </div>

    <footer class="acard-actions">
      <button type="button" class="acard-btn" @click="emit('edit', account)">
        <Icon name="edit" size="sm" />
        {{ t('common.edit') }}
      </button>
      <button type="button" class="acard-btn" @click="emit('test', account)">
        <Icon name="bolt" size="sm" />
        {{ t('admin.accounts.testConnection') }}
      </button>
      <button type="button" class="acard-btn" @click="emit('stats', account)">
        <Icon name="chartBar" size="sm" />
        {{ t('admin.accounts.viewStats') }}
      </button>
      <span class="acard-actions-spacer"></span>
      <button type="button" class="acard-icon" :title="t('common.more')" :aria-label="t('common.more')" @click="emit('menu', account, $event)">
        <Icon name="more" size="sm" />
      </button>
      <button type="button" class="acard-icon is-danger" :title="t('common.delete')" :aria-label="t('common.delete')" @click="emit('delete', account)">
        <Icon name="trash" size="sm" />
      </button>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import PlatformIcon from '@/components/common/PlatformIcon.vue'
import AccountStatusIndicator from '@/components/account/AccountStatusIndicator.vue'
import { platformDisplayName } from '@/constants/platformCatalog'
import { formatCurrency, formatNumber, formatRelativeTime } from '@/utils/format'
import type { Account, AccountListItem, AdminGroup, WindowStats } from '@/types'

const props = defineProps<{
  account: AccountListItem
  stats: WindowStats | null
  statsLoading: boolean
  groups: AdminGroup[]
  selected: boolean
  toggling: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-select', id: number): void
  (e: 'toggle-schedulable', account: AccountListItem): void
  (e: 'edit', account: AccountListItem): void
  (e: 'delete', account: AccountListItem): void
  (e: 'test', account: AccountListItem): void
  (e: 'stats', account: AccountListItem): void
  (e: 'menu', account: AccountListItem, event: MouseEvent): void
  (e: 'show-temp-unsched', account: Account): void
}>()

const { t } = useI18n()

/** each vendor's own hue, for the logo tile and the card's edge light */
const BRAND: Record<string, string> = {
  anthropic: '#E0825F',
  openai: '#5FB894',
  gemini: '#6E9CF0',
  antigravity: '#A8B7FF',
  grok: '#E5487F',
  kimi: '#8E7CF0',
  zhipu: '#4C88D7',
  deepseek: '#4D6BFE',
  minimax: '#F25A5A',
  opencode_go: '#B9B0A4',
  command_code: '#E9C46A',
  cline: '#7DD3FC',
  typesafe: '#9BC455'
}

const TYPE_LABEL: Record<string, string> = {
  oauth: 'OAuth',
  'setup-token': 'Setup Token',
  apikey: 'API Key',
  upstream: 'Upstream',
  bedrock: 'Bedrock',
  service_account: 'Service Account'
}

const brand = computed(() => BRAND[props.account.platform] || '#C9B8A0')
const platformName = computed(() => platformDisplayName(props.account.platform))
const typeLabel = computed(() => TYPE_LABEL[props.account.type] || props.account.type)

const email = computed(() => {
  const a = props.account as AccountListItem & { parent_email?: string }
  const extra = (a.extra || {}) as Record<string, unknown>
  const creds = (a.credentials || {}) as Record<string, unknown>
  const v = extra.email_address || extra.email || creds.email || a.parent_email || ''
  return typeof v === 'string' ? v : ''
})

const current = computed(() => props.account.current_concurrency || 0)
const concPct = computed(() => {
  const max = props.account.concurrency || 0
  return max > 0 ? Math.min(100, Math.round((current.value / max) * 100)) : 0
})
const concClass = computed(() => {
  const max = props.account.concurrency || 0
  if (max > 0 && current.value >= max) return 'is-full'
  if (concPct.value >= 70) return 'is-high'
  if (current.value > 0) return 'is-busy'
  return ''
})

const marginValue = computed(() => {
  const s = props.stats
  if (!s || s.user_cost == null) return null
  return s.user_cost - (s.cost || 0)
})
// gross margin rate: the margin as a share of what users were charged (not a markup over cost)
const marginPct = computed(() => {
  const s = props.stats
  if (!s || s.user_cost == null || s.user_cost <= 0) return null
  return Math.round(((s.user_cost - (s.cost || 0)) / s.user_cost) * 100)
})

const shownGroups = computed(() => props.groups.slice(0, 3))
const moreGroups = computed(() => Math.max(0, props.groups.length - 3))

function money(v: number | null | undefined) {
  return formatCurrency(v ?? 0)
}

function compactTokens(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`
  return String(n)
}
</script>

<style scoped>
.acard {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
  padding: 1rem 1rem 0.8rem;
  border-radius: 1.1rem;
  background:
    radial-gradient(120% 70% at 0% 0%, color-mix(in srgb, var(--brand) 9%, transparent), transparent 55%),
    rgb(255 255 255);
  border: 1px solid var(--hairline);
  box-shadow: var(--shadow-card);
  transition:
    border-color 0.25s var(--ease-out),
    box-shadow 0.3s var(--ease-out),
    transform 0.45s var(--ease-spring);
}

.dark .acard {
  background:
    radial-gradient(120% 70% at 0% 0%, color-mix(in srgb, var(--brand) 11%, transparent), transparent 55%),
    rgb(var(--c-dark-900));
  border-color: rgb(255 255 255 / 0.07);
}

/* a short line of the vendor's colour along the top edge */
.acard::before {
  content: '';
  position: absolute;
  left: 1.1rem;
  top: -1px;
  width: 3.2rem;
  height: 2px;
  border-radius: 2px;
  background: var(--brand);
  box-shadow: 0 0 12px var(--brand);
  opacity: 0.85;
}

.acard:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--brand) 35%, transparent);
}

.acard.is-selected {
  border-color: rgb(var(--signal-a) / 0.7);
  box-shadow:
    0 0 0 3px rgb(var(--signal-a) / 0.15),
    var(--shadow-card);
}

.acard.is-error {
  border-color: rgb(239 68 68 / 0.45);
}

/* paused: the numbers step back, the switch stays bright */
.acard.is-paused .acard-money,
.acard.is-paused .acard-conc,
.acard.is-paused .acard-logo {
  opacity: 0.55;
  filter: saturate(0.4);
}

/* ---------- head ---------- */
.acard-head {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
}

.acard-check {
  position: absolute;
  left: 0.55rem;
  top: 0.55rem;
  z-index: 1;
  display: grid;
  place-items: center;
  opacity: 0;
  transition: opacity 0.15s;
}

.acard:hover .acard-check,
.acard.is-selected .acard-check,
.acard-check:focus-within {
  opacity: 1;
}

.acard-check input {
  width: 0.95rem;
  height: 0.95rem;
  border-radius: 0.3rem;
  accent-color: rgb(var(--signal-a));
  cursor: pointer;
}

.acard-logo {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  flex-shrink: 0;
  border-radius: 0.8rem;
  color: #fff;
  background:
    linear-gradient(150deg, color-mix(in srgb, var(--brand) 92%, #fff), color-mix(in srgb, var(--brand) 70%, #000));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.35),
    0 8px 18px -10px var(--brand);
}

.acard-logo :deep(svg) {
  width: 1.3rem;
  height: 1.3rem;
}

.acard-id {
  min-width: 0;
  flex: 1 1 auto;
}

.acard-name {
  overflow: hidden;
  font-size: 0.95rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(var(--c-gray-950));
}

.dark .acard-name {
  color: #fff;
}

.acard-sub {
  display: flex;
  gap: 0.3rem;
  min-width: 0;
  margin-top: 0.1rem;
  overflow: hidden;
  font-size: 0.72rem;
  white-space: nowrap;
  color: rgb(var(--c-gray-500));
}

.dark .acard-sub {
  color: rgb(var(--c-dark-400));
}

.acard-sub i {
  font-style: normal;
  opacity: 0.6;
}

.acard-email {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* the scheduling switch: labelled, larger than a table toggle */
.acard-switch {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.45rem;
  height: 1.9rem;
  padding: 0 0.3rem 0 0.6rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 650;
  color: rgb(var(--c-gray-500));
  background: rgb(var(--c-gray-100));
  box-shadow: inset 0 0 0 1px var(--hairline);
  transition:
    background-color 0.25s,
    color 0.25s,
    box-shadow 0.25s;
}

.dark .acard-switch {
  color: rgb(var(--c-dark-300));
  background: rgb(255 255 255 / 0.05);
}

.acard-switch.is-on {
  color: rgb(var(--c-primary-700));
  background: rgb(var(--c-primary-500) / 0.12);
  box-shadow: inset 0 0 0 1px rgb(var(--c-primary-500) / 0.35);
}

.dark .acard-switch.is-on {
  color: rgb(var(--signal-a));
  background: rgb(var(--signal-a) / 0.1);
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.32);
}

.acard-switch:disabled {
  cursor: progress;
  opacity: 0.6;
}

.acard-switch-track {
  position: relative;
  width: 2.1rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: rgb(var(--c-gray-300));
  transition: background-color 0.25s;
}

.dark .acard-switch-track {
  background: rgb(255 255 255 / 0.14);
}

.acard-switch.is-on .acard-switch-track {
  background: rgb(var(--signal-a));
  box-shadow: 0 0 12px -2px rgb(var(--signal-a) / 0.8);
}

.acard-switch-thumb {
  position: absolute;
  left: 2px;
  top: 2px;
  width: calc(1.25rem - 4px);
  height: calc(1.25rem - 4px);
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.35);
  transition: transform 0.4s var(--ease-spring);
}

.acard-switch.is-on .acard-switch-thumb {
  transform: translateX(0.85rem);
}

/* ---------- status ---------- */
.acard-status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  min-height: 1.4rem;
}

.acard-fact {
  padding: 0.1rem 0.45rem;
  border-radius: 0.4rem;
  font-family: theme('fontFamily.mono');
  font-size: 0.68rem;
  color: rgb(var(--c-gray-600));
  background: rgb(var(--c-gray-100));
}

.dark .acard-fact {
  color: rgb(var(--c-dark-300));
  background: rgb(255 255 255 / 0.05);
}

/* ---------- money ---------- */
.acard-money {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  padding: 0.75rem 0.8rem;
  border-radius: 0.85rem;
  background: rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px var(--hairline);
  transition:
    opacity 0.25s,
    filter 0.25s;
}

.dark .acard-money {
  background: rgb(0 0 0 / 0.28);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.05);
}

.acard-metric {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.acard-metric-label {
  font-size: 0.7rem;
  color: rgb(var(--c-gray-500));
}

.dark .acard-metric-label {
  color: rgb(var(--c-dark-400));
}

.acard-metric-value {
  overflow: hidden;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--c-gray-950));
}

.dark .acard-metric-value {
  color: #fff;
}

.acard-metric.is-charge .acard-metric-value {
  color: rgb(var(--c-primary-600));
}

.dark .acard-metric.is-charge .acard-metric-value {
  color: rgb(var(--signal-a));
}

.acard-margin {
  font-size: 0.68rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: rgb(22 163 74);
}

.dark .acard-margin {
  color: rgb(110 231 160);
}

.acard-margin.is-neg {
  color: rgb(220 38 38);
}

.dark .acard-margin.is-neg {
  color: rgb(252 165 165);
}

.acard-skel {
  width: 5rem;
  height: 1.35rem;
  border-radius: 0.4rem;
  background: rgb(var(--c-gray-200));
  animation: acard-pulse 1.2s ease-in-out infinite;
}

.dark .acard-skel {
  background: rgb(255 255 255 / 0.08);
}

@keyframes acard-pulse {
  50% {
    opacity: 0.45;
  }
}

/* ---------- concurrency ---------- */
.acard-conc {
  display: grid;
  gap: 0.4rem;
  transition:
    opacity 0.25s,
    filter 0.25s;
}

.acard-conc-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.acard-conc-num {
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--c-gray-500));
}

.acard-conc-num b {
  font-size: 1.05rem;
  font-weight: 700;
  color: rgb(var(--c-gray-950));
}

.dark .acard-conc-num b {
  color: #fff;
}

.acard-conc-bar {
  height: 6px;
  overflow: hidden;
  border-radius: 9999px;
  background: rgb(var(--c-gray-200));
}

.dark .acard-conc-bar {
  background: rgb(255 255 255 / 0.07);
}

.acard-conc-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, rgb(var(--signal-a)), rgb(var(--signal-b)));
  transition: width 0.6s var(--ease-out);
}

.acard-conc.is-high .acard-conc-fill {
  background: linear-gradient(90deg, rgb(var(--signal-b)), rgb(var(--signal-c)));
}

.acard-conc.is-full .acard-conc-fill {
  background: linear-gradient(90deg, rgb(248 113 113), rgb(220 38 38));
}

.acard-conc.is-full .acard-conc-num b {
  color: rgb(220 38 38);
}

.dark .acard-conc.is-full .acard-conc-num b {
  color: rgb(252 165 165);
}

/* ---------- usage, groups ---------- */
.acard-usage {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  font-size: 0.72rem;
  color: rgb(var(--c-gray-500));
  font-variant-numeric: tabular-nums;
}

.dark .acard-usage {
  color: rgb(var(--c-dark-400));
}

.acard-usage i {
  font-style: normal;
  opacity: 0.5;
}

.acard-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  min-height: 1.35rem;
}

.acard-group {
  max-width: 9rem;
  overflow: hidden;
  padding: 0.12rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(var(--c-gray-700));
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
}

.dark .acard-group {
  color: rgb(var(--c-dark-200));
}

.acard-group.is-more,
.acard-group.is-none {
  color: rgb(var(--c-gray-400));
}

/* ---------- actions ---------- */
.acard-actions {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  margin: 0 -0.35rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--hairline);
}

.dark .acard-actions {
  border-color: rgb(255 255 255 / 0.06);
}

.acard-btn,
.acard-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  height: 1.9rem;
  padding: 0 0.5rem;
  border-radius: 0.55rem;
  font-size: 0.75rem;
  font-weight: 550;
  color: rgb(var(--c-gray-600));
  transition:
    background-color 0.15s,
    color 0.15s;
}

.dark .acard-btn,
.dark .acard-icon {
  color: rgb(var(--c-dark-300));
}

.acard-btn:hover,
.acard-icon:hover {
  color: rgb(var(--c-gray-950));
  background: rgb(var(--c-gray-100));
}

.dark .acard-btn:hover,
.dark .acard-icon:hover {
  color: #fff;
  background: rgb(255 255 255 / 0.06);
}

.acard-icon {
  justify-content: center;
  width: 1.9rem;
  padding: 0;
}

.acard-icon.is-danger:hover {
  color: rgb(220 38 38);
  background: rgb(239 68 68 / 0.1);
}

.acard-actions-spacer {
  flex: 1 1 auto;
}

@media (hover: none) {
  .acard-check {
    opacity: 1;
  }
}
</style>
