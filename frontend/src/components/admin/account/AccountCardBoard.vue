<template>
  <!--
    Accounts as cards, organised by group: every group down the side (all accounts first),
    a running total for what is on screen, then the cards.
  -->
  <div class="aboard">
    <nav class="aboard-rail" :aria-label="t('admin.accounts.board.groups')">
      <p class="aboard-rail-title">{{ t('admin.accounts.board.groups') }}</p>
      <div class="aboard-rail-list">
        <button
          type="button"
          class="aboard-rail-item"
          :class="{ 'is-on': !groupFilter }"
          :aria-current="!groupFilter ? 'true' : undefined"
          @click="emit('update:groupFilter', '')"
        >
          <span class="aboard-rail-dot is-all" aria-hidden="true">
            <Icon name="grid" size="xs" />
          </span>
          <span class="aboard-rail-name">{{ t('admin.accounts.board.allAccounts') }}</span>
          <span v-if="!groupFilter" class="aboard-rail-count">{{ totalCount }}</span>
        </button>
        <button
          v-for="g in sortedGroups"
          :key="g.id"
          type="button"
          class="aboard-rail-item"
          :class="{ 'is-on': groupFilter === String(g.id) }"
          :aria-current="groupFilter === String(g.id) ? 'true' : undefined"
          :title="g.name"
          @click="emit('update:groupFilter', String(g.id))"
        >
          <span class="aboard-rail-dot" aria-hidden="true">
            <PlatformIcon :platform="g.platform" size="xs" />
          </span>
          <span class="aboard-rail-name">
            {{ g.name }}
            <small v-if="groupTodayById.get(g.id)" class="aboard-rail-today" :title="t('admin.accounts.board.railTodayHint')">
              {{ formatCurrency(groupTodayById.get(g.id)!.actual_cost) }}
            </small>
          </span>
          <span v-if="g.account_count != null" class="aboard-rail-count">
            {{ g.account_count }}
          </span>
        </button>
        <button
          type="button"
          class="aboard-rail-item"
          :class="{ 'is-on': groupFilter === 'ungrouped' }"
          :aria-current="groupFilter === 'ungrouped' ? 'true' : undefined"
          @click="emit('update:groupFilter', 'ungrouped')"
        >
          <span class="aboard-rail-dot is-none" aria-hidden="true"></span>
          <span class="aboard-rail-name">{{ t('admin.accounts.ungroupedGroup') }}</span>
        </button>
      </div>
    </nav>

    <section class="aboard-main">
      <div class="aboard-bar">
        <div class="aboard-bar-title">
          <h2>{{ currentGroupName }}</h2>
          <span>{{ t('admin.accounts.board.accountCount', { n: totalCount }) }}</span>
        </div>
        <div class="aboard-totals-wrap">
        <p class="aboard-totals-scope" :title="scopeTotals && groupFilter ? t('admin.accounts.board.groupScopeHint') : undefined">
          {{ totalsLabel }}
        </p>
        <dl class="aboard-totals" :aria-label="totalsLabel">
          <div>
            <dt>{{ t('admin.accounts.board.accountCost') }}</dt>
            <dd>{{ formatCurrency(money.cost) }}</dd>
          </div>
          <div class="is-charge">
            <dt>{{ t('admin.accounts.board.userCharge') }}</dt>
            <dd>{{ formatCurrency(money.userCost) }}</dd>
          </div>
          <div :title="t('admin.accounts.board.marginHint')">
            <dt>{{ t('admin.accounts.board.margin') }}</dt>
            <dd :class="{ 'is-neg': money.userCost - money.cost < 0 }">
              {{ formatCurrency(money.userCost - money.cost) }}
              <small v-if="marginRate != null" class="aboard-totals-rate">{{ marginRate }}%</small>
            </dd>
          </div>
          <div>
            <dt>{{ t('admin.accounts.board.pageConcurrency') }}</dt>
            <dd>{{ totals.current }} / {{ totals.max }}</dd>
          </div>
        </dl>
        </div>
        <div class="aboard-tools">
          <label class="aboard-sort">
            <span>{{ t('admin.accounts.board.sortBy') }}</span>
            <select :value="sortBy" @change="emit('sort', ($event.target as HTMLSelectElement).value, sortOrder)">
              <option v-for="o in sortOptions" :key="o.key" :value="o.key">{{ o.label }}</option>
            </select>
            <button
              type="button"
              class="aboard-sort-dir"
              :title="sortOrder === 'asc' ? t('admin.accounts.board.ascending') : t('admin.accounts.board.descending')"
              :aria-label="sortOrder === 'asc' ? t('admin.accounts.board.ascending') : t('admin.accounts.board.descending')"
              @click="emit('sort', sortBy, sortOrder === 'asc' ? 'desc' : 'asc')"
            >
              <Icon :name="sortOrder === 'asc' ? 'arrowUp' : 'arrowDown'" size="xs" :stroke-width="2.2" />
            </button>
          </label>
          <slot name="view-toggle"></slot>
        </div>
      </div>

      <div v-if="loading && !accounts.length" class="aboard-grid">
        <div v-for="i in 6" :key="i" class="aboard-ghost"></div>
      </div>
      <div v-else-if="!accounts.length" class="aboard-empty">
        <p class="aboard-empty-title">{{ t('admin.accounts.board.empty') }}</p>
        <p>{{ t('admin.accounts.board.emptyHint') }}</p>
      </div>
      <div v-else class="aboard-grid" :class="{ 'is-loading': loading }">
        <AccountCard
          v-for="a in accounts"
          :key="a.id"
          :account="a"
          :stats="todayStats[String(a.id)] ?? null"
          :stats-loading="todayStatsLoading"
          :groups="groupsFor(a)"
          :selected="isSelected(a.id)"
          :toggling="togglingId === a.id"
          @toggle-select="(id) => emit('toggle-select', id)"
          @toggle-schedulable="(acc) => emit('toggle-schedulable', acc)"
          @edit="(acc) => emit('edit', acc)"
          @delete="(acc) => emit('delete', acc)"
          @test="(acc) => emit('test', acc)"
          @stats="(acc) => emit('stats', acc)"
          @menu="(acc, ev) => emit('menu', acc, ev)"
          @show-temp-unsched="(acc) => emit('show-temp-unsched', acc)"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import PlatformIcon from '@/components/common/PlatformIcon.vue'
import AccountCard from './AccountCard.vue'
import { formatCurrency } from '@/utils/format'
import type { Account, AccountListItem, AdminGroup, GroupStat, WindowStats } from '@/types'

type SortOrder = 'asc' | 'desc'

const props = defineProps<{
  accounts: AccountListItem[]
  groups: AdminGroup[]
  /** the account list's group filter: '' = all, a group id, or 'ungrouped' */
  groupFilter: string
  totalCount: number
  loading: boolean
  todayStats: Record<string, WindowStats>
  todayStatsLoading: boolean
  /** today's totals per group across all accounts (null while unknown) */
  groupToday?: GroupStat[] | null
  /** a filter other than the group (platform, type, status, search…) narrows the list */
  filtered?: boolean
  isSelected: (id: number) => boolean
  togglingId: number | null
  sortBy: string
  sortOrder: SortOrder
}>()

const emit = defineEmits<{
  (e: 'update:groupFilter', value: string): void
  (e: 'toggle-select', id: number): void
  (e: 'toggle-schedulable', account: AccountListItem): void
  (e: 'edit', account: AccountListItem): void
  (e: 'delete', account: AccountListItem): void
  (e: 'test', account: AccountListItem): void
  (e: 'stats', account: AccountListItem): void
  (e: 'menu', account: AccountListItem, event: MouseEvent): void
  (e: 'show-temp-unsched', account: Account): void
  (e: 'sort', key: string, order: SortOrder): void
}>()

const { t } = useI18n()

const groupsById = computed(() => new Map(props.groups.map((g) => [g.id, g])))

// groups by platform, then name, so each vendor's groups sit together
const sortedGroups = computed(() =>
  [...props.groups].sort((a, b) => String(a.platform).localeCompare(String(b.platform)) || a.name.localeCompare(b.name))
)

const currentGroupName = computed(() => {
  if (!props.groupFilter) return t('admin.accounts.board.allAccounts')
  if (props.groupFilter === 'ungrouped') return t('admin.accounts.ungroupedGroup')
  return groupsById.value.get(Number(props.groupFilter))?.name ?? t('admin.accounts.board.allAccounts')
})

function groupsFor(a: AccountListItem): AdminGroup[] {
  return (a.group_ids ?? []).map((id) => groupsById.value.get(id)).filter((g): g is AdminGroup => !!g)
}

// totals for what is on screen: cost, charge, margin and concurrency in use
const totals = computed(() => {
  let cost = 0
  let userCost = 0
  let current = 0
  let max = 0
  for (const a of props.accounts) {
    const s = props.todayStats[String(a.id)]
    cost += s?.cost ?? 0
    userCost += s?.user_cost ?? 0
    current += a.current_concurrency || 0
    max += a.concurrency || 0
  }
  return { cost, userCost, current, max }
})

const groupTodayById = computed(() => new Map((props.groupToday ?? []).map((g) => [g.group_id, g])))

/**
 * Today's totals for the whole scope — every account of the chosen group, or all accounts —
 * from the group statistics. The ungrouped view has no group to total by, so it (like a failed
 * request, or a list narrowed by another filter) falls back to what is on this page.
 */
const scopeTotals = computed<{ cost: number; userCost: number } | null>(() => {
  const list = props.groupToday
  // group totals cannot honour the other filters: with one set, total what the filtered page shows
  if (!list || props.groupFilter === 'ungrouped' || props.filtered) return null
  if (!props.groupFilter) {
    return list.reduce(
      (acc, g) => ({ cost: acc.cost + (g.account_cost ?? 0), userCost: acc.userCost + (g.actual_cost ?? 0) }),
      { cost: 0, userCost: 0 }
    )
  }
  const g = groupTodayById.value.get(Number(props.groupFilter))
  return { cost: g?.account_cost ?? 0, userCost: g?.actual_cost ?? 0 }
})

const money = computed(() => scopeTotals.value ?? { cost: totals.value.cost, userCost: totals.value.userCost })

/**
 * What the totals cover. A group's figures count the requests made with that group's keys, so an
 * account that also serves other groups contributes only its share here (the hint says so).
 */
const totalsLabel = computed(() => {
  if (!scopeTotals.value) return t('admin.accounts.board.pageTotals')
  return props.groupFilter ? t('admin.accounts.board.groupScopeTotals') : t('admin.accounts.board.scopeTotals')
})

/** gross margin rate: margin as a share of what users were charged */
const marginRate = computed(() => {
  const { cost, userCost } = money.value
  if (userCost <= 0) return null
  return Math.round(((userCost - cost) / userCost) * 100)
})

const sortOptions = computed(() => [
  { key: 'name', label: t('admin.accounts.columns.name') },
  { key: 'priority', label: t('admin.accounts.columns.priority') },
  { key: 'last_used_at', label: t('admin.accounts.columns.lastUsed') },
  { key: 'created_at', label: t('admin.accounts.columns.createdAt') },
  { key: 'status', label: t('admin.accounts.columns.status') },
  { key: 'schedulable', label: t('admin.accounts.columns.schedulable') }
])
</script>

<style scoped>
.aboard {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  gap: 1rem;
  min-height: 0;
  flex: 1 1 auto;
}

/* ---------- group rail ---------- */
.aboard-rail {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-height: 0;
  max-height: calc(100vh - 16rem);
  position: sticky;
  top: 0;
  align-self: start;
  padding: 0.75rem 0.5rem;
  border-radius: 1rem;
  background: rgb(255 255 255);
  border: 1px solid var(--hairline);
}

.dark .aboard-rail {
  background: rgb(var(--c-dark-900));
  border-color: rgb(255 255 255 / 0.07);
}

.aboard-rail-title {
  padding: 0 0.6rem 0.2rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgb(var(--c-gray-400));
}

.dark .aboard-rail-title {
  color: rgb(var(--c-dark-500));
}

.aboard-rail-list {
  display: grid;
  gap: 2px;
  min-height: 0;
  overflow-y: auto;
}

.aboard-rail-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.5rem 0.6rem;
  border-radius: 0.65rem;
  text-align: left;
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-700));
  transition:
    background-color 0.15s,
    color 0.15s;
}

.dark .aboard-rail-item {
  color: rgb(var(--c-dark-200));
}

.aboard-rail-item:hover {
  background: rgb(var(--c-gray-100));
}

.dark .aboard-rail-item:hover {
  background: rgb(255 255 255 / 0.04);
}

.aboard-rail-item.is-on {
  font-weight: 600;
  color: rgb(var(--c-gray-950));
  background: rgb(var(--c-primary-500) / 0.1);
}

.dark .aboard-rail-item.is-on {
  color: #fff;
  background: rgb(var(--signal-a) / 0.08);
}

.aboard-rail-item.is-on::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 22%;
  bottom: 22%;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: rgb(var(--signal-a));
  box-shadow: 0 0 10px rgb(var(--signal-a) / 0.7);
}

.aboard-rail-dot {
  display: grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
  border-radius: 0.45rem;
  color: rgb(var(--c-gray-600));
  background: rgb(var(--c-gray-100));
}

.dark .aboard-rail-dot {
  color: rgb(var(--c-dark-200));
  background: rgb(255 255 255 / 0.06);
}

.aboard-rail-dot.is-all {
  color: rgb(var(--c-primary-600));
}

.dark .aboard-rail-dot.is-all {
  color: rgb(var(--signal-a));
}

.aboard-rail-dot.is-none {
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
  background: transparent;
}

.aboard-rail-name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.aboard-rail-count {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--c-gray-400));
}

/* ---------- summary bar ---------- */
.aboard-main {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
}

.aboard-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.5rem;
  padding: 0.85rem 1rem;
  border-radius: 1rem;
  background: rgb(255 255 255);
  border: 1px solid var(--hairline);
}

.dark .aboard-bar {
  background:
    radial-gradient(80% 140% at 100% 0%, rgb(var(--signal-a) / 0.06), transparent 60%),
    rgb(var(--c-dark-900));
  border-color: rgb(255 255 255 / 0.07);
}

.aboard-bar-title h2 {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: rgb(var(--c-gray-950));
}

.dark .aboard-bar-title h2 {
  color: #fff;
}

.aboard-bar-title span {
  font-size: 0.75rem;
  color: rgb(var(--c-gray-500));
}

.aboard-totals {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.4rem;
}

.aboard-totals div {
  display: grid;
  gap: 0.1rem;
}

.aboard-totals dt {
  font-size: 0.68rem;
  color: rgb(var(--c-gray-500));
}

.dark .aboard-totals dt {
  color: rgb(var(--c-dark-400));
}

.aboard-totals dd {
  font-size: 1rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--c-gray-950));
}

.dark .aboard-totals dd {
  color: #fff;
}

.aboard-totals .is-charge dd {
  color: rgb(var(--c-primary-600));
}

.dark .aboard-totals .is-charge dd {
  color: rgb(var(--signal-a));
}

.aboard-totals dd.is-neg {
  color: rgb(220 38 38);
}

.aboard-tools {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: auto;
}

.aboard-sort {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: rgb(var(--c-gray-500));
}

.aboard-sort select {
  height: 2rem;
  padding: 0 1.8rem 0 0.6rem;
  border-radius: 0.6rem;
  font-size: 0.8rem;
  color: rgb(var(--c-gray-900));
  background-color: rgb(var(--c-gray-50));
  border: 1px solid var(--hairline-strong);
  /* the same chevron as every other select, instead of the platform's */
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23857f77' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 0.9rem 0.9rem;
  cursor: pointer;
}

.dark .aboard-sort select {
  color: #fff;
  background-color: rgb(255 255 255 / 0.04);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23b4aea6' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
}

.aboard-sort-dir {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.6rem;
  color: rgb(var(--c-gray-600));
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
}

.dark .aboard-sort-dir {
  color: rgb(var(--c-dark-200));
}

/* ---------- cards ---------- */
.aboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
  gap: 0.9rem;
  transition: opacity 0.2s;
}

.aboard-grid.is-loading {
  opacity: 0.6;
}

.aboard-ghost {
  height: 19rem;
  border-radius: 1.1rem;
  background: rgb(var(--c-gray-100));
  animation: aboard-pulse 1.3s ease-in-out infinite;
}

.dark .aboard-ghost {
  background: rgb(255 255 255 / 0.04);
}

@keyframes aboard-pulse {
  50% {
    opacity: 0.5;
  }
}

.aboard-empty {
  display: grid;
  place-items: center;
  gap: 0.3rem;
  padding: 4rem 1rem;
  border-radius: 1rem;
  text-align: center;
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-500));
  border: 1px dashed var(--hairline-strong);
}

.aboard-empty-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(var(--c-gray-800));
}

.dark .aboard-empty-title {
  color: #fff;
}

/* narrower screens: the groups become a scrolling strip above the cards */
@media (max-width: 1279px) {
  .aboard {
    grid-template-columns: minmax(0, 1fr);
  }

  .aboard-rail {
    position: static;
    max-height: none;
    padding: 0.4rem;
  }

  .aboard-rail-title {
    display: none;
  }

  .aboard-rail-list {
    display: flex;
    gap: 0.3rem;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }

  .aboard-rail-item {
    width: auto;
    flex-shrink: 0;
    max-width: 14rem;
  }

  .aboard-rail-item.is-on::before {
    display: none;
  }

  .aboard-tools {
    margin-left: 0;
  }
}
.aboard-rail-today {
  display: block;
  margin-top: 1px;
  font-size: 0.68rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--c-gray-500));
}

.dark .aboard-rail-today {
  color: rgb(var(--c-dark-400));
}

.aboard-totals-wrap {
  display: grid;
  gap: 0.3rem;
}

.aboard-totals-scope {
  font-size: 0.68rem;
  font-weight: 600;
  color: rgb(var(--c-gray-400));
}

.dark .aboard-totals-scope {
  color: rgb(var(--c-dark-500));
}

.aboard-totals-rate {
  margin-left: 0.3rem;
  font-size: 0.72em;
  font-weight: 600;
  opacity: 0.75;
}
</style>
