<template>
  <AppLayout>
    <div data-testid="profile-shell" class="pf">
      <ProfileInfoCard
        :user="user"
        :linuxdo-enabled="linuxdoOAuthEnabled"
        :dingtalk-enabled="dingtalkOAuthEnabled"
        :oidc-enabled="oidcOAuthEnabled"
        :oidc-provider-name="oidcOAuthProviderName"
        :wechat-enabled="wechatOAuthEnabled"
        :wechat-open-enabled="wechatOAuthOpenEnabled"
        :wechat-mp-enabled="wechatOAuthMPEnabled"
      />

      <!-- security and notifications sit beside the profile on wide screens -->
      <div class="pf-side">
        <p class="pf-group">
          <Icon name="shield" size="sm" />
          {{ t('profile.securityTitle') }}
        </p>
        <ProfilePasswordForm />
        <ProfileTotpCard />
        <ProfilePasskeyCard :enabled="passkeyEnabled" />

        <template v-if="user && balanceLowNotifyEnabled">
          <p class="pf-group">
            <Icon name="bell" size="sm" />
            {{ t('profile.notifyTitle') }}
          </p>
          <ProfileBalanceNotifyCard
            :enabled="user.balance_notify_enabled ?? true"
            :threshold="user.balance_notify_threshold"
            :extra-emails="user.balance_notify_extra_emails ?? []"
            :system-default-threshold="systemDefaultThreshold"
            :user-email="user.email"
          />
        </template>

        <div v-if="contactInfo" class="card pf-contact">
          <span class="pf-contact-icon"><Icon name="chat" size="md" /></span>
          <div class="min-w-0">
            <h3 class="pf-contact-title">{{ t('common.contactSupport') }}</h3>
            <p class="pf-contact-value">{{ contactInfo }}</p>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@/components/icons'
import AppLayout from '@/components/layout/AppLayout.vue'
import ProfileBalanceNotifyCard from '@/components/user/profile/ProfileBalanceNotifyCard.vue'
import ProfileInfoCard from '@/components/user/profile/ProfileInfoCard.vue'
import ProfilePasswordForm from '@/components/user/profile/ProfilePasswordForm.vue'
import ProfileTotpCard from '@/components/user/profile/ProfileTotpCard.vue'
import ProfilePasskeyCard from '@/components/user/profile/ProfilePasskeyCard.vue'
import { isWeChatWebOAuthEnabled } from '@/api/auth'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const contactInfo = ref('')
const balanceLowNotifyEnabled = ref(false)
const systemDefaultThreshold = ref(0)
const linuxdoOAuthEnabled = ref(false)
const dingtalkOAuthEnabled = ref(false)
const wechatOAuthEnabled = ref(false)
const wechatOAuthOpenEnabled = ref<boolean | undefined>(undefined)
const wechatOAuthMPEnabled = ref<boolean | undefined>(undefined)
const oidcOAuthEnabled = ref(false)
const oidcOAuthProviderName = ref('OIDC')
const passkeyEnabled = ref(false)

onMounted(async () => {
  const profileRefresh = authStore.refreshUser().catch((error) => {
    console.error('Failed to refresh profile:', error)
  })

  const settingsLoad = appStore.fetchPublicSettings()
    .then((settings) => {
      if (!settings) {
        return
      }
      contactInfo.value = settings.contact_info || ''
      balanceLowNotifyEnabled.value = settings.balance_low_notify_enabled ?? false
      systemDefaultThreshold.value = settings.balance_low_notify_threshold ?? 0
      linuxdoOAuthEnabled.value = settings.linuxdo_oauth_enabled ?? false
      dingtalkOAuthEnabled.value = settings.dingtalk_oauth_enabled ?? false
      wechatOAuthEnabled.value = isWeChatWebOAuthEnabled(settings)
      wechatOAuthOpenEnabled.value = typeof settings.wechat_oauth_open_enabled === 'boolean'
        ? settings.wechat_oauth_open_enabled
        : undefined
      wechatOAuthMPEnabled.value = typeof settings.wechat_oauth_mp_enabled === 'boolean'
        ? settings.wechat_oauth_mp_enabled
        : undefined
      oidcOAuthEnabled.value = settings.oidc_oauth_enabled ?? false
      oidcOAuthProviderName.value = settings.oidc_oauth_provider_name || 'OIDC'
      passkeyEnabled.value = settings.passkey_enabled === true
    })
    .catch((error) => {
      console.error('Failed to load settings:', error)
    })

  await Promise.all([profileRefresh, settingsLoad])
})
</script>

<style scoped>
.pf {
  display: grid;
  gap: 1.25rem;
  max-width: 78rem;
  margin-inline: auto;
}

.pf-side {
  display: grid;
  align-content: start;
  gap: 1rem;
}

/* wide: the identity band across the top, the profile on the left, security on the right */
@media (min-width: 1200px) {
  .pf {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
    align-items: start;
  }

  .pf :deep(.pf-info) {
    display: contents;
  }

  .pf :deep(.pf-hero) {
    grid-column: 1 / -1;
  }

  .pf :deep(.pf-info-body) {
    grid-column: 1;
    grid-row: 2;
  }

  .pf-side {
    grid-column: 2;
    grid-row: 2;
  }
}

.pf-group {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.25rem;
  padding-left: 0.2rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: rgb(var(--c-gray-600));
}

.dark .pf-group {
  color: rgb(var(--c-dark-300));
}

.pf-group :deep(svg) {
  color: rgb(var(--c-primary-500));
}

.dark .pf-group :deep(svg) {
  color: rgb(var(--signal-a));
}

/* the setting cards share one header treatment */
.pf-side :deep(.card > .border-b:first-child) {
  padding: 1.05rem 1.35rem;
  border-color: var(--hairline);
}

.pf-side :deep(.card > .border-b:first-child h2) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
}

.pf-side :deep(.card > .border-b:first-child h2::before) {
  content: '';
  width: 3px;
  height: 0.95em;
  border-radius: 9999px;
  background: linear-gradient(180deg, rgb(var(--signal-a)), rgb(var(--signal-c)));
}

.pf-side :deep(.card > .border-b:first-child p) {
  font-size: 0.8rem;
}

.pf-side :deep(.card > .px-6.py-6) {
  padding: 1.2rem 1.35rem 1.35rem;
}

.pf-contact {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 1.2rem;
  background-image: radial-gradient(90% 140% at 0% 0%, rgb(var(--signal-a) / 0.1), transparent 60%);
}

.pf-contact-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.8rem;
  color: rgb(var(--c-on-primary));
  background: linear-gradient(135deg, rgb(var(--signal-a)), rgb(var(--signal-b)));
}

.pf-contact-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: rgb(var(--c-gray-950));
}

.dark .pf-contact-title {
  color: #fff;
}

.pf-contact-value {
  overflow-wrap: anywhere;
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-600));
}

.dark .pf-contact-value {
  color: rgb(var(--c-dark-300));
}
</style>
