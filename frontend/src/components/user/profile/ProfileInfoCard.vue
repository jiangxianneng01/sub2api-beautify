<template>
  <div class="pf-info">
    <!-- who you are: the one dark, brand-coloured panel on the page -->
    <section data-testid="profile-overview-hero" class="pf-hero">
      <svg class="pf-hero-art" viewBox="0 0 520 260" aria-hidden="true">
        <ellipse cx="380" cy="120" rx="240" ry="78" transform="rotate(-14 380 120)" />
        <ellipse cx="380" cy="120" rx="170" ry="54" transform="rotate(-14 380 120)" />
        <circle cx="283" cy="69" r="5" class="pf-hero-electron" />
      </svg>

      <div class="pf-id">
        <div class="pf-avatar">
          <img v-if="avatarUrl" :src="avatarUrl" :alt="displayName" class="pf-avatar-img">
          <span v-else class="pf-avatar-initial">{{ avatarInitial }}</span>
          <svg class="pf-avatar-orbit" viewBox="0 0 120 120" aria-hidden="true">
            <ellipse cx="60" cy="60" rx="56" ry="20" transform="rotate(-18 60 60)" />
            <circle cx="112" cy="42" r="3.2" />
          </svg>
        </div>

        <div class="pf-id-text">
          <div class="pf-name-row">
            <h2 class="pf-name">{{ displayName }}</h2>
            <span class="pf-chip" :class="user?.role === 'admin' ? 'is-gold' : ''">
              {{ user?.role === 'admin' ? t('profile.administrator') : t('profile.user') }}
            </span>
            <span class="pf-chip" :class="user?.status === 'active' ? 'is-ok' : 'is-off'">
              <i></i>{{ user?.status === 'active' ? t('common.active') : t('common.disabled') }}
            </span>
          </div>
          <p v-if="primaryEmailDisplay" class="pf-email">{{ primaryEmailDisplay }}</p>
          <div v-if="sourceHints.length" class="pf-hints">
            <span v-for="hint in sourceHints" :key="hint.key" class="pf-hint">
              <Icon name="link" size="xs" />
              {{ hint.text }}
            </span>
          </div>
        </div>
      </div>

      <dl class="pf-stats">
        <div data-testid="profile-overview-metric-balance">
          <dt>{{ t('profile.accountBalance') }}</dt>
          <dd class="is-money">{{ formatCurrency(user?.balance || 0) }}</dd>
        </div>
        <div data-testid="profile-overview-metric-concurrency">
          <dt>{{ t('profile.concurrencyLimit') }}</dt>
          <dd>{{ user?.concurrency || 0 }}</dd>
        </div>
        <div data-testid="profile-overview-metric-member-since">
          <dt>{{ t('profile.memberSince') }}</dt>
          <dd>{{ memberSinceLabel }}</dd>
        </div>
      </dl>
    </section>

    <div class="pf-info-body">
      <div data-testid="profile-main-column" class="pf-col">
        <section data-testid="profile-basics-panel" class="card pf-panel">
          <header class="pf-panel-head">
            <h3 class="pf-panel-title">{{ t('profile.basicsTitle') }}</h3>
            <p class="pf-panel-desc">{{ t('profile.basicsDescription') }}</p>
          </header>
          <div class="pf-basics">
            <div class="pf-basics-cell">
              <ProfileAvatarCard :user="user" embedded />
            </div>
            <div class="pf-basics-cell">
              <ProfileEditForm :initial-username="user?.username || ''" embedded />
            </div>
          </div>
        </section>

        <section data-testid="profile-auth-bindings-panel" class="card pf-panel">
          <ProfileIdentityBindingsSection
            :user="user"
            :linuxdo-enabled="linuxdoEnabled"
            :dingtalk-enabled="dingtalkEnabled"
            :oidc-enabled="oidcEnabled"
            :oidc-provider-name="oidcProviderName"
            :wechat-enabled="wechatEnabled"
            :wechat-open-enabled="wechatOpenEnabled"
            :wechat-mp-enabled="wechatMpEnabled"
            embedded
            compact
          />
        </section>
      </div>

      <div data-testid="profile-side-column" class="pf-col">
        <section v-if="sourceHints.length" class="card pf-panel">
          <header class="pf-panel-head">
            <h3 class="pf-panel-title">{{ t('profile.linkedProfileSources') }}</h3>
            <p class="pf-panel-desc">{{ t('profile.linkedProfileSourcesDescription') }}</p>
          </header>
          <div class="pf-source-list">
            <div v-for="hint in sourceHints" :key="hint.key" class="pf-source">
              <Icon name="link" size="sm" />
              <span>{{ hint.text }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import ProfileAvatarCard from '@/components/user/profile/ProfileAvatarCard.vue'
import ProfileEditForm from '@/components/user/profile/ProfileEditForm.vue'
import ProfileIdentityBindingsSection from '@/components/user/profile/ProfileIdentityBindingsSection.vue'
import type { User, UserAuthBindingStatus, UserAuthProvider, UserProfileSourceContext } from '@/types'

const props = withDefaults(defineProps<{
  user: User | null
  linuxdoEnabled?: boolean
  dingtalkEnabled?: boolean
  oidcEnabled?: boolean
  oidcProviderName?: string
  wechatEnabled?: boolean
  wechatOpenEnabled?: boolean
  wechatMpEnabled?: boolean
}>(), {
  linuxdoEnabled: false,
  dingtalkEnabled: false,
  oidcEnabled: false,
  oidcProviderName: 'OIDC',
  wechatEnabled: false,
  wechatOpenEnabled: undefined,
  wechatMpEnabled: undefined,
})

const { t } = useI18n()

function normalizeBindingStatus(binding: boolean | UserAuthBindingStatus | undefined): boolean | null {
  if (typeof binding === 'boolean') {
    return binding
  }
  if (!binding) {
    return null
  }
  if (typeof binding.bound === 'boolean') {
    return binding.bound
  }
  return Boolean(binding.provider_subject || binding.issuer || binding.provider_key)
}

function isEmailBound(user: User | null | undefined): boolean {
  if (typeof user?.email_bound === 'boolean') {
    return user.email_bound
  }

  const nested = user?.auth_bindings?.email ?? user?.identity_bindings?.email
  const normalized = normalizeBindingStatus(nested)
  return normalized ?? false
}

const avatarUrl = computed(() => props.user?.avatar_url?.trim() || '')
const displayName = computed(() => props.user?.username?.trim() || props.user?.email?.trim() || t('profile.user'))
const primaryEmailDisplay = computed(() => {
  const email = props.user?.email?.trim() || ''
  if (!email) {
    return ''
  }
  if (email.endsWith('.invalid') && !isEmailBound(props.user)) {
    return ''
  }
  return email
})
const avatarInitial = computed(() => displayName.value.charAt(0).toUpperCase() || 'U')
const memberSinceLabel = computed(() => {
  const raw = props.user?.created_at?.trim()
  if (!raw) {
    return '-'
  }

  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
  }).format(date)
})

const providerLabels = computed<Record<UserAuthProvider, string>>(() => ({
  email: t('profile.authBindings.providers.email'),
  linuxdo: t('profile.authBindings.providers.linuxdo'),
  dingtalk: t('profile.authBindings.providers.dingtalk'),
  oidc: t('profile.authBindings.providers.oidc', { providerName: props.oidcProviderName }),
  wechat: t('profile.authBindings.providers.wechat'),
  github: 'GitHub',
  google: 'Google'
}))

// the balance can go below zero (usage is billed after the request): -$1.20, not $-1.20
function formatCurrency(value: number): string {
  return value < 0 ? `-$${Math.abs(value).toFixed(2)}` : `$${value.toFixed(2)}`
}

function normalizeProvider(value: string): UserAuthProvider | null {
  const normalized = value.trim().toLowerCase()
  if (
    normalized === 'email' ||
    normalized === 'linuxdo' ||
    normalized === 'dingtalk' ||
    normalized === 'wechat' ||
    normalized === 'github' ||
    normalized === 'google'
  ) {
    return normalized
  }
  if (normalized === 'oidc' || normalized.startsWith('oidc:') || normalized.startsWith('oidc/')) {
    return 'oidc'
  }
  return null
}

function readObjectString(source: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }
  return ''
}

function resolveThirdPartySource(
  rawSource: string | UserProfileSourceContext | null | undefined
): { provider: UserAuthProvider; label: string } | null {
  if (!rawSource) {
    return null
  }

  if (typeof rawSource === 'string') {
    const provider = normalizeProvider(rawSource)
    if (!provider || provider === 'email') {
      return null
    }
    return {
      provider,
      label: providerLabels.value[provider]
    }
  }

  const sourceRecord = rawSource as Record<string, unknown>
  const provider = normalizeProvider(
    readObjectString(sourceRecord, 'provider', 'source', 'provider_type', 'auth_provider')
  )
  if (!provider || provider === 'email') {
    return null
  }

  const explicitLabel = readObjectString(
    sourceRecord,
    'provider_label',
    'label',
    'provider_name',
    'providerName'
  )

  return {
    provider,
    label: explicitLabel || providerLabels.value[provider]
  }
}

const sourceHints = computed(() => {
  const currentUser = props.user
  if (!currentUser) {
    return []
  }

  const hints: Array<{ key: string; text: string }> = []
  const avatarSource = resolveThirdPartySource(
    currentUser.profile_sources?.avatar ?? currentUser.avatar_source
  )
  const usernameSource = resolveThirdPartySource(
    currentUser.profile_sources?.username ??
      currentUser.profile_sources?.display_name ??
      currentUser.profile_sources?.nickname ??
      currentUser.display_name_source ??
      currentUser.username_source ??
      currentUser.nickname_source
  )

  if (avatarSource) {
    hints.push({
      key: 'avatar',
      text: t('profile.authBindings.source.avatar', { providerName: avatarSource.label })
    })
  }

  if (usernameSource) {
    hints.push({
      key: 'username',
      text: t('profile.authBindings.source.username', { providerName: usernameSource.label })
    })
  }

  return hints
})
</script>

<style scoped>
.pf-info {
  display: grid;
  gap: 1.25rem;
}

.pf-info-body,
.pf-col {
  display: grid;
  gap: 1.25rem;
  align-content: start;
}

.pf-col:empty {
  display: none;
}

/* ---------------- hero ---------------- */
.pf-hero {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem 2.5rem;
  overflow: hidden;
  padding: clamp(1.4rem, 3vw, 2.1rem) clamp(1.4rem, 3.4vw, 2.5rem);
  border-radius: 1.25rem;
  color: #f4f1ec;
  background:
    radial-gradient(70% 120% at 100% 0%, rgb(var(--signal-b) / 0.2), transparent 60%),
    radial-gradient(50% 90% at 0% 100%, rgb(var(--signal-a) / 0.12), transparent 60%),
    linear-gradient(160deg, #18171b, #0a0a0c);
  box-shadow:
    inset 0 0 0 1px rgb(var(--signal-a) / 0.18),
    0 28px 60px -34px rgb(0 0 0 / 0.75);
}

.pf-hero-art {
  position: absolute;
  right: -6rem;
  top: -2.5rem;
  width: 36rem;
  fill: none;
  stroke: rgb(var(--signal-a) / 0.16);
  stroke-width: 1;
  pointer-events: none;
}

.pf-hero-electron {
  fill: rgb(var(--signal-a));
  stroke: none;
  filter: drop-shadow(0 0 8px rgb(var(--signal-a)));
}

.pf-id {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.35rem;
  min-width: 0;
}

/* the avatar sits inside the logo's orbit */
.pf-avatar {
  position: relative;
  flex-shrink: 0;
  width: 5.5rem;
  height: 5.5rem;
}

.pf-avatar-img,
.pf-avatar-initial {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 1.6rem;
  object-fit: cover;
  box-shadow:
    0 0 0 3px #0e0d10,
    0 0 0 4px rgb(var(--signal-a) / 0.45);
}

.pf-avatar-initial {
  font-family: theme('fontFamily.display');
  font-size: 2.2rem;
  font-weight: 760;
  color: rgb(var(--c-on-primary));
  background: linear-gradient(135deg, rgb(var(--signal-a)), rgb(var(--signal-b)) 55%, rgb(var(--signal-c)));
}

.pf-avatar-orbit {
  position: absolute;
  inset: -1.1rem;
  width: calc(100% + 2.2rem);
  height: calc(100% + 2.2rem);
  overflow: visible;
  fill: none;
  stroke: rgb(var(--signal-a) / 0.75);
  stroke-width: 1.3;
  pointer-events: none;
  animation: pf-orbit 18s linear infinite;
}

.pf-avatar-orbit circle {
  fill: #fff;
  stroke: none;
  filter: drop-shadow(0 0 5px rgb(var(--signal-a)));
}

@keyframes pf-orbit {
  to {
    transform: rotate(360deg);
  }
}

html[data-motion='reduced'] .pf-avatar-orbit {
  animation: none;
}

.pf-id-text {
  display: grid;
  gap: 0.45rem;
  min-width: 0;
}

.pf-name-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
}

.pf-name {
  overflow: hidden;
  font-family: theme('fontFamily.display');
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 760;
  font-stretch: 110%;
  letter-spacing: -0.03em;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
}

.pf-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.15rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 650;
  color: rgb(244 241 236 / 0.75);
  background: rgb(255 255 255 / 0.07);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1);
}

.pf-chip i {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  background: currentColor;
}

.pf-chip.is-gold {
  color: rgb(var(--signal-a));
  background: rgb(var(--signal-a) / 0.1);
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.35);
}

.pf-chip.is-ok {
  color: rgb(110 231 183);
  background: rgb(16 185 129 / 0.12);
  box-shadow: inset 0 0 0 1px rgb(16 185 129 / 0.3);
}

.pf-chip.is-off {
  color: rgb(252 165 165);
  background: rgb(239 68 68 / 0.12);
}

.pf-email {
  overflow: hidden;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(244 241 236 / 0.66);
}

.pf-hints {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.pf-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.12rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  color: rgb(244 241 236 / 0.7);
  background: rgb(255 255 255 / 0.06);
}

.pf-stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, auto);
  border-radius: 1rem;
  background: rgb(255 255 255 / 0.035);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.08);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

@media (max-width: 639px) {
  .pf-stats {
    width: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.pf-stats > div {
  display: grid;
  gap: 0.3rem;
  padding: 0.85rem 1.35rem;
}

.pf-stats > div + div {
  border-left: 1px solid rgb(255 255 255 / 0.08);
}

.pf-stats dt {
  font-size: 0.72rem;
  white-space: nowrap;
  color: rgb(244 241 236 / 0.55);
}

.pf-stats dd {
  font-family: theme('fontFamily.display');
  font-size: 1.35rem;
  font-weight: 720;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.015em;
  white-space: nowrap;
  color: #fff;
}

.pf-stats dd.is-money {
  color: rgb(var(--signal-a));
}

/* ---------------- panels ---------------- */
.pf-panel {
  padding: 1.25rem 1.4rem 1.4rem;
}

.pf-panel-head {
  margin-bottom: 1.1rem;
}

.pf-panel-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: rgb(var(--c-gray-950));
}

.dark .pf-panel-title {
  color: #fff;
}

.pf-panel-title::before {
  content: '';
  width: 3px;
  height: 0.95em;
  border-radius: 9999px;
  background: linear-gradient(180deg, rgb(var(--signal-a)), rgb(var(--signal-c)));
}

.pf-panel-desc {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: rgb(var(--c-gray-500));
}

.dark .pf-panel-desc {
  color: rgb(var(--c-dark-400));
}

.pf-basics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-radius: 1rem;
  box-shadow: inset 0 0 0 1px var(--hairline);
}

@media (max-width: 767px) {
  .pf-basics {
    grid-template-columns: minmax(0, 1fr);
  }

  .pf-basics-cell + .pf-basics-cell {
    border-left: 0 !important;
    border-top: 1px solid var(--hairline);
  }
}

.pf-basics-cell {
  padding: 1.1rem 1.2rem;
}

.pf-basics-cell + .pf-basics-cell {
  border-left: 1px solid var(--hairline);
}

.pf-source-list {
  display: grid;
  gap: 0.5rem;
}

.pf-source {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.65rem 0.8rem;
  border-radius: 0.8rem;
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-600));
  background: rgb(var(--c-gray-50));
}

.dark .pf-source {
  color: rgb(var(--c-dark-300));
  background: rgb(255 255 255 / 0.03);
}
</style>
