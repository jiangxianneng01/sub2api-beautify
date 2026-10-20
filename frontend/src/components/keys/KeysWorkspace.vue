<template>
  <!-- The list could not be loaded: say so, rather than inviting a first key -->
  <section v-if="!loading && !keys.length && loadFailed" class="card kw-failed" role="alert">
    <span class="kw-failed-icon"><Icon name="exclamationTriangle" size="lg" /></span>
    <p>{{ t('keys.failedToLoad') }}</p>
    <button type="button" class="btn btn-secondary" @click="emit('refresh')">
      <Icon name="refresh" size="sm" />
      {{ t('common.refresh') }}
    </button>
  </section>

  <!-- No keys yet: walk through making the first one -->
  <section v-else-if="!loading && !keys.length" class="card kw-empty" data-test="keys-onboarding">
    <div class="kw-empty-copy">
      <ol class="kw-steps" aria-hidden="true">
        <li class="is-now"><i>1</i>{{ t('keys.workspace.empty.step1') }}</li>
        <li class="kw-steps-bar"></li>
        <li><i>2</i>{{ t('keys.workspace.empty.step2') }}</li>
        <li class="kw-steps-bar"></li>
        <li><i>3</i>{{ t('keys.workspace.empty.step3') }}</li>
      </ol>
      <h2 class="kw-empty-title">{{ t('keys.workspace.empty.title') }}</h2>
      <p class="kw-empty-lead">{{ t('keys.workspace.empty.lead') }}</p>
      <div class="kw-empty-actions">
        <button type="button" class="btn btn-primary btn-lg" data-tour="keys-create-btn" @click="emit('create')">
          <Icon name="plus" size="md" />
          {{ t('keys.workspace.empty.cta') }}
        </button>
        <button type="button" class="btn btn-secondary btn-lg" @click="emit('table')">
          {{ t('keys.workspace.tableView') }}
        </button>
      </div>
    </div>
    <ul class="kw-empty-cards">
      <li>
        <span class="kw-empty-num">1</span>
        <b>{{ t('keys.workspace.empty.step1') }}</b>
        <p>{{ t('keys.workspace.empty.step1Desc') }}</p>
      </li>
      <li>
        <span class="kw-empty-num">2</span>
        <b>{{ t('keys.workspace.empty.step2') }}</b>
        <p>{{ t('keys.workspace.empty.step2Desc') }}</p>
      </li>
      <li>
        <span class="kw-empty-num">3</span>
        <b>{{ t('keys.workspace.empty.step3') }}</b>
        <p>{{ t('keys.workspace.empty.step3Desc') }}</p>
        <code v-if="apiBaseUrl" class="kw-empty-url">{{ apiBaseUrl }}</code>
      </li>
    </ul>
  </section>

  <div v-else class="kw">
    <!-- ------------------------------------------------ keys, grouped -->
    <aside class="card kw-rail" :aria-label="t('keys.workspace.title')">
      <div class="kw-rail-head">
        <div>
          <h2 class="kw-rail-title">{{ t('keys.workspace.title') }}</h2>
          <p class="kw-rail-sub">{{ t('keys.workspace.count', { n: keys.length }) }}</p>
        </div>
        <div class="kw-rail-tools">
          <button type="button" class="kw-icon-btn" :title="t('common.refresh')" :aria-label="t('common.refresh')" :disabled="loading" @click="emit('refresh')">
            <Icon name="refresh" size="sm" :class="loading ? 'animate-spin' : ''" />
          </button>
          <button type="button" class="kw-icon-btn" :title="t('keys.workspace.tableView')" :aria-label="t('keys.workspace.tableView')" @click="emit('table')">
            <Icon name="grid" size="sm" />
          </button>
          <button type="button" class="kw-new" data-tour="keys-create-btn" @click="emit('create')">
            <Icon name="plus" size="sm" :stroke-width="2.2" />
            {{ t('keys.workspace.newKey') }}
          </button>
        </div>
      </div>

      <label class="kw-search">
        <Icon name="search" size="sm" />
        <input v-model="query" type="search" :placeholder="t('keys.workspace.search')" :aria-label="t('keys.workspace.search')" />
      </label>

      <div class="kw-rail-scroll">
        <template v-if="loading && !keys.length">
          <div v-for="i in 5" :key="i" class="kw-skel skeleton"></div>
        </template>
        <section v-for="bucket in buckets" :key="bucket.id" class="kw-bucket">
          <header class="kw-bucket-head">
            <span class="kw-bucket-icon" :style="{ color: platformColor(bucket.platform) }">
              <PlatformIcon v-if="bucket.platform" :platform="bucket.platform" size="sm" />
              <Icon v-else name="key" size="sm" />
            </span>
            <span class="kw-bucket-name">{{ bucket.name }}</span>
            <span v-if="bucket.rate != null" class="kw-bucket-rate">×{{ formatRate(bucket.rate) }}</span>
            <span class="kw-bucket-count">{{ bucket.keys.length }}</span>
          </header>
          <button
            v-for="k in bucket.keys"
            :key="k.id"
            type="button"
            class="kw-item"
            :class="{ 'is-on': k.id === selected?.id }"
            :aria-current="k.id === selected?.id ? 'true' : undefined"
            @click="selectedId = k.id"
          >
            <i class="kw-dot" :class="`is-${k.status}`" aria-hidden="true"></i>
            <span class="kw-item-main">
              <b>{{ k.name }}</b>
              <code>{{ maskApiKey(k.key) }}</code>
            </span>
            <span class="kw-item-cost">${{ money(usageStats[k.id]?.today_actual_cost, 2) }}</span>
          </button>
        </section>
        <p v-if="!loading && keys.length && !buckets.length" class="kw-none">{{ t('keys.workspace.noMatch') }}</p>
        <p v-if="total > keys.length" class="kw-more">
          {{ t('keys.workspace.showingRecent', { shown: keys.length, total }) }}
          <button type="button" class="kw-link" @click="emit('table')">{{ t('keys.workspace.tableView') }}</button>
        </p>
      </div>
    </aside>

    <!-- ------------------------------------------------ the chosen key -->
    <section v-if="selected" :key="selected.id" class="card kw-detail">
      <header class="kw-hero">
        <div class="kw-hero-id">
          <span class="kw-hero-icon" :style="{ color: platformColor(selected.group?.platform) }">
            <PlatformIcon v-if="selected.group?.platform" :platform="selected.group.platform" size="lg" />
            <Icon v-else name="key" size="lg" />
          </span>
          <div class="min-w-0">
            <div class="kw-hero-row">
              <h2 class="kw-hero-name">{{ selected.name }}</h2>
              <span class="kw-status" :class="`is-${selected.status}`">
                <i></i>{{ t('keys.status.' + selected.status) }}
              </span>
              <Icon
                v-if="selected.ip_whitelist?.length || selected.ip_blacklist?.length"
                name="shield"
                size="sm"
                class="text-blue-500"
                :title="t('keys.ipRestrictionEnabled')"
              />
            </div>
            <p class="kw-hero-sub">
              {{ selected.group?.name || t('keys.noGroup') }}
              <template v-if="selected.group">
                <span class="kw-sep">/</span>{{ platformDisplayName(selected.group.platform) }}
                <span class="kw-sep">/</span>{{ t('keys.workspace.multiplier', { rate: formatRate(userGroupRates[selected.group.id] ?? selected.group.rate_multiplier) }) }}
              </template>
            </p>
          </div>
        </div>
        <div class="kw-hero-actions">
          <button type="button" class="btn btn-primary btn-sm" @click="emit('use', selected)">
            <Icon name="terminal" size="sm" />
            {{ t('keys.useKey') }}
          </button>
          <button type="button" class="btn btn-secondary btn-sm" @click="emit('edit', selected)">
            <Icon name="edit" size="sm" />
            {{ t('common.edit') }}
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            :class="selected.status === 'active' ? 'kw-warn' : ''"
            @click="emit('toggle', selected)"
          >
            <Icon :name="selected.status === 'active' ? 'ban' : 'checkCircle'" size="sm" />
            {{ selected.status === 'active' ? t('keys.disable') : t('keys.enable') }}
          </button>
        </div>
      </header>

      <!-- the key itself -->
      <div class="kw-keybox">
        <div class="kw-keybox-main">
          <span class="kw-label">{{ t('keys.apiKey') }}</span>
          <code class="kw-key" data-test="workspace-key">{{ revealed ? selected.key : maskApiKey(selected.key) }}</code>
        </div>
        <div class="kw-keybox-tools">
          <button type="button" class="kw-icon-btn" :title="revealed ? t('keys.workspace.hide') : t('keys.workspace.reveal')" :aria-label="revealed ? t('keys.workspace.hide') : t('keys.workspace.reveal')" @click="revealed = !revealed">
            <Icon :name="revealed ? 'eyeOff' : 'eye'" size="sm" />
          </button>
          <button
            type="button"
            class="kw-copy"
            :class="{ 'is-done': copiedKeyId === selected.id }"
            @click="emit('copy', selected)"
          >
            <Icon :name="copiedKeyId === selected.id ? 'check' : 'clipboard'" size="sm" :stroke-width="2" />
            {{ copiedKeyId === selected.id ? t('keys.copied') : t('keys.copyToClipboard') }}
          </button>
        </div>
        <div v-if="apiBaseUrl" class="kw-keybox-url">
          <span class="kw-label">{{ t('keys.workspace.baseUrl') }}</span>
          <code>{{ apiBaseUrl }}</code>
          <button type="button" class="kw-link" @click="copyText(apiBaseUrl)">{{ t('keys.workspace.copyUrl') }}</button>
        </div>
      </div>

      <!-- the figures -->
      <dl class="kw-stats">
        <div>
          <dt>{{ t('keys.workspace.todayCost') }}</dt>
          <dd class="is-money">${{ money(usageStats[selected.id]?.today_actual_cost, 4) }}</dd>
        </div>
        <div>
          <dt>{{ t('keys.workspace.totalCost') }}</dt>
          <dd>${{ money(usageStats[selected.id]?.total_actual_cost, 4) }}</dd>
        </div>
        <div>
          <dt>{{ t('keys.currentConcurrency') }}</dt>
          <dd :class="{ 'is-live': (selected.current_concurrency ?? 0) > 0 }">{{ selected.current_concurrency ?? 0 }}</dd>
        </div>
        <div>
          <dt>{{ t('keys.lastUsedAt') }}</dt>
          <dd class="is-small">
            {{ selected.last_used_at ? formatDateTime(selected.last_used_at) : t('keys.workspace.neverUsed') }}
            <small v-if="selected.last_used_ip">{{ selected.last_used_ip }}</small>
          </dd>
        </div>
      </dl>

      <div class="kw-panels">
        <!-- spending limits -->
        <section class="kw-panel">
          <h3 class="kw-panel-title">{{ t('keys.workspace.limits') }}</h3>
          <div class="kw-meter">
            <div class="kw-meter-row">
              <span>{{ t('keys.quota') }}</span>
              <b v-if="selected.quota > 0" :class="levelClass(selected.quota_used, selected.quota)">
                ${{ money(selected.quota_used, 2) }} / ${{ money(selected.quota, 2) }}
              </b>
              <b v-else>{{ t('keys.workspace.unlimited') }}</b>
            </div>
            <div v-if="selected.quota > 0" class="kw-bar">
              <i :class="levelClass(selected.quota_used, selected.quota)" :style="{ width: pct(selected.quota_used, selected.quota) }"></i>
            </div>
          </div>
          <template v-for="w in windows" :key="w.id">
            <div v-if="w.limit > 0" class="kw-meter">
              <div class="kw-meter-row">
                <span>{{ w.label }}</span>
                <b :class="levelClass(w.used, w.limit)">${{ money(w.used, 2) }} / ${{ money(w.limit, 2) }}</b>
              </div>
              <div class="kw-bar">
                <i :class="levelClass(w.used, w.limit)" :style="{ width: pct(w.used, w.limit) }"></i>
              </div>
              <small v-if="w.reset && formatReset(w.reset)" class="kw-reset">⟳ {{ formatReset(w.reset) }}</small>
            </div>
          </template>
          <p v-if="!hasWindows" class="kw-muted">{{ t('keys.workspace.noRateLimits') }}</p>
        </section>

        <!-- facts -->
        <section class="kw-panel">
          <h3 class="kw-panel-title">{{ t('keys.workspace.details') }}</h3>
          <dl class="kw-facts">
            <div>
              <dt>{{ t('keys.created') }}</dt>
              <dd>{{ formatDateTime(selected.created_at) }}</dd>
            </div>
            <div>
              <dt>{{ t('keys.expiresAt') }}</dt>
              <dd>{{ selected.expires_at ? formatDateTime(selected.expires_at) : t('keys.workspace.neverExpires') }}</dd>
            </div>
            <div>
              <dt>{{ t('keys.workspace.ipRules') }}</dt>
              <dd>
                <template v-if="selected.ip_whitelist?.length || selected.ip_blacklist?.length">
                  {{ t('keys.workspace.ipRulesValue', { allow: selected.ip_whitelist?.length || 0, deny: selected.ip_blacklist?.length || 0 }) }}
                </template>
                <template v-else>{{ t('keys.workspace.noIpRules') }}</template>
              </dd>
            </div>
          </dl>
          <div class="kw-panel-actions">
            <button type="button" class="btn btn-secondary btn-sm" @click="emit('ccswitch', selected)">
              <Icon name="upload" size="sm" />
              {{ t('keys.importToCcSwitch') }}
            </button>
            <button type="button" class="btn btn-ghost btn-sm kw-danger" @click="emit('delete', selected)">
              <Icon name="trash" size="sm" />
              {{ t('common.delete') }}
            </button>
          </div>
        </section>
      </div>
    </section>

    <section v-else class="card kw-detail kw-detail--blank">
      <p class="kw-muted">{{ loading ? t('common.loading') : t('keys.workspace.selectHint') }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import PlatformIcon from '@/components/common/PlatformIcon.vue'
import { platformColor } from '@/composables/useStudioSources'
import { platformDisplayName } from '@/constants/platformCatalog'
import { maskApiKey } from '@/utils/maskApiKey'
import { formatDateTime } from '@/utils/format'
import type { BatchApiKeyUsageStats } from '@/api/usage'
import type { ApiKey, GroupPlatform } from '@/types'

const props = withDefaults(
  defineProps<{
    keys: ApiKey[]
    loading: boolean
    usageStats: Record<string, BatchApiKeyUsageStats>
    userGroupRates: Record<number, number>
    apiBaseUrl?: string
    /** the last load failed (the list may be empty only because of that) */
    loadFailed?: boolean
    /** keys on the server; more than are shown when it exceeds the page the workspace loads */
    total?: number
    copiedKeyId?: number | null
    formatReset?: (at: string | null) => string
  }>(),
  { apiBaseUrl: '', loadFailed: false, total: 0, copiedKeyId: null, formatReset: () => '' }
)

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'refresh'): void
  (e: 'table'): void
  (e: 'use', key: ApiKey): void
  (e: 'edit', key: ApiKey): void
  (e: 'toggle', key: ApiKey): void
  (e: 'delete', key: ApiKey): void
  (e: 'copy', key: ApiKey): void
  (e: 'ccswitch', key: ApiKey): void
  (e: 'copy-text', text: string): void
}>()

const { t } = useI18n()

const query = ref('')
const selectedId = ref<number | null>(null)
const revealed = ref(false)

interface Bucket {
  id: string
  name: string
  platform: GroupPlatform | null
  rate: number | null
  keys: ApiKey[]
}

/** Keys gathered under their group; keys without one come last */
const buckets = computed<Bucket[]>(() => {
  const q = query.value.trim().toLowerCase()
  const map = new Map<string, Bucket>()
  for (const k of props.keys) {
    if (q && !k.name.toLowerCase().includes(q) && !k.key.toLowerCase().includes(q) && !(k.group?.name || '').toLowerCase().includes(q)) continue
    const id = k.group ? `g${k.group.id}` : 'none'
    let b = map.get(id)
    if (!b) {
      b = {
        id,
        name: k.group?.name || t('keys.workspace.ungrouped'),
        platform: k.group?.platform ?? null,
        rate: k.group ? props.userGroupRates[k.group.id] ?? k.group.rate_multiplier ?? null : null,
        keys: []
      }
      map.set(id, b)
    }
    b.keys.push(k)
  }
  return [...map.values()].sort((a, b) => (a.id === 'none' ? 1 : b.id === 'none' ? -1 : a.name.localeCompare(b.name)))
})

const selected = computed<ApiKey | null>(() => {
  const all = buckets.value.flatMap((b) => b.keys)
  return all.find((k) => k.id === selectedId.value) ?? all[0] ?? null
})

// a new key (or a refreshed list) keeps the choice; a different key starts masked
watch(
  () => selected.value?.id,
  () => (revealed.value = false)
)

const windows = computed(() => {
  const k = selected.value
  if (!k) return []
  return [
    { id: '5h', label: t('keys.workspace.window5h'), limit: k.rate_limit_5h, used: k.usage_5h, reset: k.reset_5h_at },
    { id: '1d', label: t('keys.workspace.window1d'), limit: k.rate_limit_1d, used: k.usage_1d, reset: k.reset_1d_at },
    { id: '7d', label: t('keys.workspace.window7d'), limit: k.rate_limit_7d, used: k.usage_7d, reset: k.reset_7d_at }
  ]
})
const hasWindows = computed(() => windows.value.some((w) => w.limit > 0))

function money(v: number | null | undefined, digits: number) {
  return (v ?? 0).toFixed(digits)
}

function formatRate(rate: number | null | undefined) {
  const r = rate ?? 1
  return Number.isInteger(r) ? r.toFixed(1) : String(Number(r.toFixed(3)))
}

// older servers may leave usage fields out: read a missing figure as 0 rather than drawing NaN%
function pct(used: number | null | undefined, limit: number | null | undefined) {
  const u = used || 0
  const l = limit || 0
  return `${Math.min(100, l > 0 ? (u / l) * 100 : 0)}%`
}

function levelClass(used: number | null | undefined, limit: number | null | undefined) {
  const u = used || 0
  const l = limit || 0
  if (l <= 0) return ''
  if (u >= l) return 'is-over'
  if (u >= l * 0.8) return 'is-near'
  return ''
}

function copyText(text: string) {
  emit('copy-text', text)
}

defineExpose({ select: (id: number) => (selectedId.value = id) })
</script>

<style scoped>
.kw {
  display: grid;
  grid-template-columns: 20rem minmax(0, 1fr);
  gap: 0.875rem;
  height: calc(100vh - 13rem);
  min-height: 36rem;
}

@media (max-width: 1023px) {
  .kw {
    grid-template-columns: minmax(0, 1fr);
    height: auto;
  }

  .kw-rail {
    max-height: 26rem;
  }
}

/* ---------------- rail ---------------- */
.kw-rail {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-height: 0;
  padding: 0.9rem 0.75rem 0.75rem;
}

.kw-rail-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0 0.25rem;
}

.kw-rail-title {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: rgb(var(--c-gray-950));
}

.dark .kw-rail-title {
  color: #fff;
}

.kw-rail-sub {
  margin-top: 1px;
  font-size: 0.72rem;
  color: rgb(var(--c-gray-500));
}

.dark .kw-rail-sub {
  color: rgb(var(--c-dark-400));
}

.kw-rail-tools {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.kw-icon-btn {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.6rem;
  color: rgb(var(--c-gray-500));
  transition:
    background-color 0.2s var(--ease-out),
    color 0.2s var(--ease-out);
}

.kw-icon-btn:hover {
  background: rgb(var(--c-gray-100));
  color: rgb(var(--c-gray-900));
}

.dark .kw-icon-btn {
  color: rgb(var(--c-dark-300));
}

.dark .kw-icon-btn:hover {
  background: rgb(255 255 255 / 0.06);
  color: #fff;
}

.kw-new {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  height: 2rem;
  padding: 0 0.7rem;
  border-radius: 0.6rem;
  font-size: 0.78rem;
  font-weight: 650;
  color: rgb(var(--c-on-primary));
  background: rgb(var(--c-primary-500));
  box-shadow: 0 6px 16px -8px rgb(var(--c-primary-500) / 0.8);
  transition:
    transform 0.4s var(--ease-spring),
    filter 0.2s;
}

.kw-new:hover {
  transform: translateY(-1px);
  filter: brightness(1.06);
}

.kw-search {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  height: 2.25rem;
  padding: 0 0.7rem;
  border-radius: 0.7rem;
  color: rgb(var(--c-gray-400));
  background: rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px var(--hairline);
}

.dark .kw-search {
  color: rgb(var(--c-dark-400));
  background: rgb(0 0 0 / 0.22);
}

.kw-search:focus-within {
  box-shadow: inset 0 0 0 1px rgb(var(--c-primary-500) / 0.7);
}

.kw-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-900));
  outline: none;
}

.dark .kw-search input {
  color: rgb(var(--c-dark-50));
}

.kw-rail-scroll {
  display: grid;
  align-content: start;
  gap: 0.6rem;
  min-height: 0;
  overflow-y: auto;
  padding-right: 2px;
}

.kw-skel {
  height: 3.1rem;
  border-radius: 0.7rem;
}

.kw-bucket {
  display: grid;
  gap: 2px;
}

.kw-bucket-head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.45rem 0.25rem;
  font-size: 0.72rem;
  font-weight: 650;
  color: rgb(var(--c-gray-600));
}

.dark .kw-bucket-head {
  color: rgb(var(--c-dark-300));
}

.kw-bucket-icon {
  display: grid;
  place-items: center;
  width: 1.2rem;
  height: 1.2rem;
}

.kw-bucket-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.kw-bucket-rate {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--c-primary-600));
}

.dark .kw-bucket-rate {
  color: rgb(var(--signal-a));
}

.kw-bucket-count {
  min-width: 1.3rem;
  padding: 0 0.35rem;
  border-radius: 9999px;
  text-align: center;
  font-size: 0.68rem;
  line-height: 1.15rem;
  background: rgb(var(--c-gray-100));
  color: rgb(var(--c-gray-500));
}

.dark .kw-bucket-count {
  background: rgb(255 255 255 / 0.06);
  color: rgb(var(--c-dark-300));
}

.kw-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.55rem 0.65rem 0.55rem 0.8rem;
  border-radius: 0.7rem;
  text-align: left;
  transition:
    background-color 0.2s var(--ease-out),
    box-shadow 0.2s var(--ease-out);
}

.kw-item:hover {
  background: rgb(var(--c-gray-100) / 0.8);
}

.dark .kw-item:hover {
  background: rgb(255 255 255 / 0.04);
}

.kw-item.is-on {
  background: rgb(var(--c-primary-500) / 0.1);
  box-shadow: inset 0 0 0 1px rgb(var(--c-primary-500) / 0.28);
}

.dark .kw-item.is-on {
  background: linear-gradient(90deg, rgb(var(--c-primary-500) / 0.16), rgb(var(--c-primary-500) / 0.04));
  box-shadow: inset 0 0 0 1px rgb(var(--c-primary-400) / 0.18);
}

.kw-item.is-on::before {
  content: '';
  position: absolute;
  left: 0.2rem;
  top: 0.55rem;
  bottom: 0.55rem;
  width: 3px;
  border-radius: 9999px;
  background: linear-gradient(180deg, rgb(var(--signal-a)), rgb(var(--signal-c)));
}

.kw-dot {
  flex-shrink: 0;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 9999px;
  background: rgb(var(--c-gray-300));
}

.kw-dot.is-active {
  background: rgb(16 185 129);
  box-shadow: 0 0 0 3px rgb(16 185 129 / 0.16);
}

.kw-dot.is-quota_exhausted,
.kw-dot.is-expired {
  background: rgb(239 68 68);
}

.kw-item-main {
  display: grid;
  flex: 1;
  min-width: 0;
  gap: 1px;
}

.kw-item-main b {
  overflow: hidden;
  font-size: 0.8125rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(var(--c-gray-900));
}

.dark .kw-item-main b {
  color: rgb(var(--c-dark-50));
}

.kw-item-main code {
  overflow: hidden;
  font-family: theme('fontFamily.mono');
  font-size: 0.68rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(var(--c-gray-500));
}

.dark .kw-item-main code {
  color: rgb(var(--c-dark-400));
}

.kw-item-cost {
  flex-shrink: 0;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--c-gray-500));
}

.dark .kw-item-cost {
  color: rgb(var(--c-dark-300));
}

.kw-none {
  padding: 1.5rem 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: rgb(var(--c-gray-500));
}

/* ---------------- detail ---------------- */
.kw-detail {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  min-height: 0;
  overflow-y: auto;
  padding: 1.4rem 1.6rem 1.6rem;
  animation: kw-in 0.42s cubic-bezier(0.2, 0.9, 0.25, 1);
}

.kw-detail--blank {
  display: grid;
  place-items: center;
}

@keyframes kw-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

.kw-hero {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.kw-hero-id {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  min-width: 0;
}

.kw-hero-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.95rem;
  background: rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px var(--hairline);
}

.dark .kw-hero-icon {
  background: rgb(255 255 255 / 0.04);
}

.kw-hero-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
}

.kw-hero-name {
  font-family: theme('fontFamily.display');
  font-size: 1.35rem;
  font-weight: 720;
  letter-spacing: -0.02em;
  color: rgb(var(--c-gray-950));
}

.dark .kw-hero-name {
  color: #fff;
}

.kw-hero-sub {
  margin-top: 0.15rem;
  font-size: 0.8rem;
  color: rgb(var(--c-gray-500));
}

.dark .kw-hero-sub {
  color: rgb(var(--c-dark-400));
}

.kw-sep {
  margin: 0 0.4rem;
  opacity: 0.5;
}

.kw-status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.12rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: rgb(var(--c-gray-600));
  background: rgb(var(--c-gray-100));
}

.kw-status i {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  background: currentColor;
}

.kw-status.is-active {
  color: rgb(5 150 105);
  background: rgb(16 185 129 / 0.12);
}

.kw-status.is-quota_exhausted,
.kw-status.is-expired {
  color: rgb(220 38 38);
  background: rgb(239 68 68 / 0.12);
}

.dark .kw-status {
  color: rgb(var(--c-dark-300));
  background: rgb(255 255 255 / 0.06);
}

.dark .kw-status.is-active {
  color: rgb(52 211 153);
  background: rgb(16 185 129 / 0.14);
}

.dark .kw-status.is-quota_exhausted,
.dark .kw-status.is-expired {
  color: rgb(248 113 113);
  background: rgb(239 68 68 / 0.14);
}

.kw-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.kw-hero-actions .btn {
  gap: 0.35rem;
}

.kw-warn:hover {
  color: rgb(217 119 6);
}

/* the key box: the one thing people come here for */
.kw-keybox {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.9rem 1rem;
  align-items: center;
  padding: 1rem 1.15rem;
  border-radius: 1rem;
  background:
    radial-gradient(120% 140% at 0% 0%, rgb(var(--signal-a) / 0.12), transparent 55%),
    rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px rgb(var(--c-primary-500) / 0.18);
}

.dark .kw-keybox {
  background:
    radial-gradient(120% 140% at 0% 0%, rgb(var(--signal-a) / 0.1), transparent 55%),
    rgb(0 0 0 / 0.25);
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.16);
}

.kw-keybox-main {
  display: grid;
  gap: 0.3rem;
  min-width: 0;
}

.kw-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgb(var(--c-gray-500));
}

.dark .kw-label {
  color: rgb(var(--c-dark-400));
}

.kw-key {
  overflow-wrap: anywhere;
  font-family: theme('fontFamily.mono');
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  color: rgb(var(--c-gray-950));
}

.dark .kw-key {
  color: #fff;
}

.kw-keybox-tools {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.kw-copy {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  height: 2.1rem;
  padding: 0 0.85rem;
  border-radius: 0.65rem;
  font-size: 0.8rem;
  font-weight: 650;
  color: rgb(var(--c-on-primary));
  background: rgb(var(--c-primary-500));
  transition:
    transform 0.4s var(--ease-spring),
    background-color 0.2s;
}

.kw-copy:hover {
  transform: translateY(-1px);
}

.kw-copy.is-done {
  color: #fff;
  background: rgb(16 185 129);
}

.kw-keybox-url {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  padding-top: 0.8rem;
  border-top: 1px dashed var(--hairline-strong);
}

.kw-keybox-url code {
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: theme('fontFamily.mono');
  font-size: 0.8rem;
  color: rgb(var(--c-gray-800));
}

.dark .kw-keybox-url code {
  color: rgb(var(--c-dark-100));
}

.kw-link {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(var(--c-primary-600));
}

.dark .kw-link {
  color: rgb(var(--signal-a));
}

.kw-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-radius: 1rem;
  box-shadow: inset 0 0 0 1px var(--hairline);
}

@media (max-width: 767px) {
  .kw-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.kw-stats > div {
  display: grid;
  gap: 0.3rem;
  padding: 0.85rem 1rem;
}

.kw-stats > div + div {
  border-left: 1px solid var(--hairline);
}

.kw-stats dt {
  font-size: 0.72rem;
  color: rgb(var(--c-gray-500));
}

.dark .kw-stats dt {
  color: rgb(var(--c-dark-400));
}

.kw-stats dd {
  font-family: theme('fontFamily.display');
  font-size: 1.25rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
  color: rgb(var(--c-gray-950));
}

.dark .kw-stats dd {
  color: #fff;
}

.kw-stats dd.is-money {
  color: rgb(var(--c-primary-700));
}

.dark .kw-stats dd.is-money {
  color: rgb(var(--signal-a));
}

.kw-stats dd.is-live {
  color: rgb(5 150 105);
}

.dark .kw-stats dd.is-live {
  color: rgb(52 211 153);
}

.kw-stats dd.is-small {
  display: grid;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
}

.kw-stats dd small {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgb(var(--c-gray-500));
}

.kw-panels {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.875rem;
}

@media (max-width: 1279px) {
  .kw-panels {
    grid-template-columns: minmax(0, 1fr);
  }
}

.kw-panel {
  display: grid;
  align-content: start;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border-radius: 1rem;
  box-shadow: inset 0 0 0 1px var(--hairline);
}

.kw-panel-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: rgb(var(--c-gray-900));
}

.dark .kw-panel-title {
  color: #fff;
}

.kw-panel-title::before {
  content: '';
  width: 3px;
  height: 0.9em;
  border-radius: 9999px;
  background: linear-gradient(180deg, rgb(var(--signal-a)), rgb(var(--signal-c)));
}

.kw-meter {
  display: grid;
  gap: 0.35rem;
}

.kw-meter-row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.78rem;
  color: rgb(var(--c-gray-500));
}

.kw-meter-row b {
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--c-gray-900));
}

.dark .kw-meter-row b {
  color: rgb(var(--c-dark-50));
}

.kw-meter-row b.is-near {
  color: rgb(217 119 6);
}

.kw-meter-row b.is-over {
  color: rgb(220 38 38);
}

.kw-bar {
  height: 0.4rem;
  overflow: hidden;
  border-radius: 9999px;
  background: rgb(var(--c-gray-200));
}

.dark .kw-bar {
  background: rgb(255 255 255 / 0.07);
}

.kw-bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, rgb(var(--signal-a)), rgb(var(--signal-b)));
  transition: width 0.6s var(--ease-out);
}

.kw-bar i.is-near {
  background: rgb(245 158 11);
}

.kw-bar i.is-over {
  background: rgb(239 68 68);
}

.kw-reset {
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--c-gray-400));
}

.kw-muted {
  font-size: 0.8rem;
  color: rgb(var(--c-gray-500));
}

.dark .kw-muted {
  color: rgb(var(--c-dark-400));
}

.kw-facts {
  display: grid;
  gap: 0.55rem;
}

.kw-facts > div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.8rem;
}

.kw-facts dt {
  color: rgb(var(--c-gray-500));
}

.dark .kw-facts dt {
  color: rgb(var(--c-dark-400));
}

.kw-facts dd {
  text-align: right;
  font-weight: 550;
  color: rgb(var(--c-gray-900));
}

.dark .kw-facts dd {
  color: rgb(var(--c-dark-50));
}

.kw-panel-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--hairline);
}

.kw-panel-actions .btn {
  gap: 0.35rem;
}

.kw-danger {
  color: rgb(220 38 38);
}

.kw-danger:hover {
  background: rgb(239 68 68 / 0.1);
}

.dark .kw-danger {
  color: rgb(248 113 113);
}

.kw-more {
  padding: 0.6rem 0.5rem 0.2rem;
  font-size: 0.72rem;
  line-height: 1.5;
  text-align: center;
  color: rgb(var(--c-gray-500));
}

.kw-more .kw-link {
  margin-left: 0.3rem;
}

.kw-failed {
  display: grid;
  justify-items: center;
  gap: 0.9rem;
  padding: 3rem 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: rgb(var(--c-gray-600));
}

.dark .kw-failed {
  color: rgb(var(--c-dark-300));
}

.kw-failed-icon {
  color: rgb(245 158 11);
}

.kw-failed .btn {
  gap: 0.4rem;
}

/* ---------------- first key ---------------- */
.kw-empty {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: center;
  padding: clamp(1.75rem, 4vw, 3.25rem);
  background-image:
    radial-gradient(70% 90% at 100% 0%, rgb(var(--signal-a) / 0.12), transparent 60%),
    radial-gradient(60% 80% at 0% 100%, rgb(var(--signal-c) / 0.07), transparent 60%);
}

@media (max-width: 1023px) {
  .kw-empty {
    grid-template-columns: minmax(0, 1fr);
  }
}

.kw-empty-copy {
  display: grid;
  gap: 1.1rem;
  justify-items: start;
}

.kw-steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.78rem;
  color: rgb(var(--c-gray-400));
}

.kw-steps li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.kw-steps i {
  display: grid;
  place-items: center;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-style: normal;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
}

.kw-steps .is-now {
  font-weight: 600;
  color: rgb(var(--c-gray-950));
}

.dark .kw-steps .is-now {
  color: #fff;
}

.kw-steps .is-now i {
  color: rgb(var(--c-primary-600));
  box-shadow: inset 0 0 0 1.5px rgb(var(--c-primary-500));
}

.dark .kw-steps .is-now i {
  color: rgb(var(--signal-a));
  box-shadow: inset 0 0 0 1.5px rgb(var(--signal-a));
}

.kw-steps-bar {
  width: 2.2rem;
  height: 1px;
  background: var(--hairline-strong);
}

.kw-empty-title {
  font-family: theme('fontFamily.display');
  font-size: clamp(1.6rem, 2.6vw, 2.25rem);
  font-weight: 760;
  font-stretch: 110%;
  line-height: 1.08;
  letter-spacing: -0.03em;
  text-wrap: balance;
  color: rgb(var(--c-gray-950));
}

.dark .kw-empty-title {
  color: #fff;
}

.kw-empty-lead {
  max-width: 46ch;
  font-size: 0.92rem;
  line-height: 1.65;
  color: rgb(var(--c-gray-600));
}

.dark .kw-empty-lead {
  color: rgb(var(--c-dark-300));
}

.kw-empty-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.4rem;
}

.kw-empty-actions .btn {
  gap: 0.4rem;
}

.kw-empty-cards {
  display: grid;
  gap: 0.75rem;
}

.kw-empty-cards li {
  position: relative;
  display: grid;
  gap: 0.25rem;
  padding: 1rem 1.15rem 1rem 3.4rem;
  border-radius: 1rem;
  background: rgb(var(--c-gray-50) / 0.8);
  box-shadow: inset 0 0 0 1px var(--hairline);
  animation: kw-in 0.5s cubic-bezier(0.2, 0.9, 0.25, 1) backwards;
}

.kw-empty-cards li:nth-child(2) {
  animation-delay: 0.08s;
}

.kw-empty-cards li:nth-child(3) {
  animation-delay: 0.16s;
}

.dark .kw-empty-cards li {
  background: rgb(255 255 255 / 0.03);
}

.kw-empty-num {
  position: absolute;
  left: 1.1rem;
  top: 1rem;
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.5rem;
  font-size: 0.78rem;
  font-weight: 750;
  color: rgb(var(--c-on-primary));
  background: linear-gradient(135deg, rgb(var(--signal-a)), rgb(var(--signal-b)));
}

.kw-empty-cards b {
  font-size: 0.9rem;
  color: rgb(var(--c-gray-950));
}

.dark .kw-empty-cards b {
  color: #fff;
}

.kw-empty-cards p {
  font-size: 0.8rem;
  line-height: 1.5;
  color: rgb(var(--c-gray-500));
}

.dark .kw-empty-cards p {
  color: rgb(var(--c-dark-400));
}

.kw-empty-url {
  justify-self: start;
  margin-top: 0.3rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.45rem;
  font-family: theme('fontFamily.mono');
  font-size: 0.75rem;
  color: rgb(var(--c-gray-800));
  background: rgb(var(--c-gray-100));
}

.dark .kw-empty-url {
  color: rgb(var(--c-dark-100));
  background: rgb(0 0 0 / 0.3);
}
</style>
