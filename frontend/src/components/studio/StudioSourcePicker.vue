<template>
  <div class="src">
    <!-- API key -->
    <div class="src-block">
      <div class="src-label">
        <span>{{ t('studio.picker.key') }}</span>
        <router-link to="/keys" class="src-link">{{ t('studio.picker.manageKeys') }}</router-link>
      </div>
      <div v-if="loading" class="src-skeleton"></div>
      <div v-else-if="!keys.length" class="src-empty">
        {{ t('studio.picker.noKeys') }}
        <router-link to="/keys" class="src-link">{{ t('studio.picker.createKey') }}</router-link>
      </div>
      <div v-else class="src-keys" role="listbox" :aria-label="t('studio.picker.key')">
        <button
          v-for="k in keys"
          :key="k.id"
          type="button"
          role="option"
          class="src-key"
          :class="{ 'is-active': k.id === keyId, 'is-unfit': !supports(k) }"
          :aria-selected="k.id === keyId"
          @click="$emit('update:keyId', k.id)"
        >
          <span class="src-key-dot" :style="{ '--mark': platformColor(k.group?.platform) }"></span>
          <span class="src-key-body">
            <span class="src-key-name">{{ k.name }}</span>
            <span class="src-key-meta">
              <span>{{ k.group?.name || t('studio.picker.noGroup') }}</span>
              <span class="src-key-platform">{{ platformLabel(k.group?.platform) }}</span>
            </span>
          </span>
          <code class="src-key-code">{{ maskKey(k.key) }}</code>
        </button>
      </div>
      <p v-if="selectedKey && !supports(selectedKey)" class="src-warn">
        {{ t(kind === 'image' ? 'studio.picker.keyCannotImage' : 'studio.picker.keyCannotVideo') }}
      </p>
    </div>

    <!-- Model -->
    <div class="src-block">
      <div class="src-label">
        <span>{{ t('studio.picker.model') }}</span>
        <span v-if="models.some((m) => m.assumed)" class="src-note">{{ t('studio.picker.assumed') }}</span>
      </div>
      <div v-if="models.length" class="src-models" role="listbox" :aria-label="t('studio.picker.model')">
        <button
          v-for="m in models"
          :key="m.id"
          type="button"
          role="option"
          class="src-model"
          :class="{ 'is-active': m.id === model }"
          :aria-selected="m.id === model"
          @click="$emit('update:model', m.id)"
        >
          <span class="src-model-name">{{ m.id }}</span>
          <span v-if="m.price != null" class="src-model-price">${{ formatPrice(m.price) }}</span>
        </button>
      </div>
      <p v-else class="src-empty">{{ t('studio.picker.noModels') }}</p>
      <label class="src-custom">
        <span>{{ t('studio.picker.customModel') }}</span>
        <input
          :value="customModel"
          type="text"
          class="src-custom-input"
          :placeholder="kind === 'image' ? 'gpt-image-2' : 'grok-imagine-video'"
          spellcheck="false"
          @input="onCustom(($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ApiKey } from '@/types'
import { platformColor, platformSupports, type StudioKind, type StudioModel } from '@/composables/useStudioSources'

const props = defineProps<{
  kind: StudioKind
  keys: ApiKey[]
  keyId: number | null
  model: string
  models: StudioModel[]
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:keyId': [id: number]
  'update:model': [model: string]
}>()

const { t } = useI18n()

const selectedKey = computed(() => props.keys.find((k) => k.id === props.keyId) || null)
const supports = (k: ApiKey) => platformSupports(props.kind, k.group?.platform)

// a model typed by hand lives beside the list; picking a listed model clears it
const customModel = ref('')
watch(
  () => props.model,
  (m) => {
    if (props.models.some((x) => x.id === m)) customModel.value = ''
  }
)
function onCustom(value: string) {
  customModel.value = value
  const trimmed = value.trim()
  if (trimmed) emit('update:model', trimmed)
}

function platformLabel(platform?: string) {
  if (!platform) return '—'
  const labels: Record<string, string> = {
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    gemini: 'Gemini',
    grok: 'Grok',
    antigravity: 'Antigravity',
    composite: 'Composite',
    deepseek: 'DeepSeek',
    minimax: 'MiniMax',
    kimi: 'Kimi',
    zhipu: 'Zhipu'
  }
  return labels[platform] || platform
}
function maskKey(key: string) {
  if (!key) return ''
  return key.length > 12 ? `${key.slice(0, 6)}…${key.slice(-4)}` : key
}
function formatPrice(p: number) {
  return p >= 1 ? p.toFixed(2) : p.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')
}
</script>

<style scoped>
.src {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.src-block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.src-label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: rgb(var(--c-dark-50) / 0.55);
}

.src-link {
  font-size: 0.74rem;
  font-weight: 500;
  color: rgb(var(--signal-a));
}

.src-link:hover {
  text-decoration: underline;
}

.src-note {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgb(var(--c-dark-50) / 0.4);
}

.src-skeleton {
  height: 3.2rem;
  border-radius: 0.75rem;
  background: linear-gradient(90deg, rgb(var(--c-dark-50) / 0.04), rgb(var(--c-dark-50) / 0.09), rgb(var(--c-dark-50) / 0.04));
  background-size: 200% 100%;
  animation: src-shimmer 1.4s linear infinite;
}

.src-empty {
  font-size: 0.85rem;
  color: rgb(var(--c-dark-50) / 0.55);
}

.src-keys {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-height: 15rem;
  overflow-y: auto;
  padding-right: 0.15rem;
}

.src-key {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  min-width: 0;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 0.75rem;
  text-align: left;
  background: rgb(var(--c-dark-50) / 0.035);
  box-shadow: inset 0 0 0 1px rgb(var(--c-dark-50) / 0.07);
  color: rgb(var(--c-dark-50));
  transition:
    background-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
}

.src-key:hover {
  background: rgb(var(--c-dark-50) / 0.07);
}

.src-key.is-active {
  background: rgb(var(--signal-a) / 0.1);
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.55);
}

.src-key.is-unfit {
  opacity: 0.55;
}

.src-key-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: var(--mark);
  box-shadow: 0 0 8px var(--mark);
}

.src-key-body {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.1rem;
}

.src-key-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.86rem;
  font-weight: 600;
}

.src-key-meta {
  display: flex;
  gap: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.72rem;
  color: rgb(var(--c-dark-50) / 0.5);
}

.src-key-platform {
  color: rgb(var(--c-dark-50) / 0.7);
}

.src-key-code {
  font-family: theme('fontFamily.mono');
  font-size: 0.68rem;
  color: rgb(var(--c-dark-50) / 0.45);
}

@media (max-width: 479px) {
  .src-key-code {
    display: none;
  }
}

/* 16px keeps iOS Safari from zooming the page when the field gets focus */
@media (max-width: 767px) {
  .src-custom-input {
    font-size: 16px;
  }
}

.src-warn {
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgb(var(--signal-a));
}

.src-models {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.src-model {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.75rem;
  border-radius: 9999px;
  background: rgb(var(--c-dark-50) / 0.05);
  box-shadow: inset 0 0 0 1px rgb(var(--c-dark-50) / 0.09);
  font-family: theme('fontFamily.mono');
  font-size: 0.76rem;
  color: rgb(var(--c-dark-50));
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
}

.src-model:hover {
  background: rgb(var(--c-dark-50) / 0.1);
}

.src-model.is-active {
  background: linear-gradient(135deg, rgb(var(--signal-a) / 0.22), rgb(var(--signal-c) / 0.2));
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.6);
}

.src-model-price {
  font-size: 0.68rem;
  color: rgb(var(--signal-a));
}

.src-custom {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.25rem;
  font-size: 0.72rem;
  color: rgb(var(--c-dark-50) / 0.4);
}

.src-custom-input {
  width: 100%;
  border-radius: 0.6rem;
  padding: 0.5rem 0.7rem;
  background: rgb(0 0 0 / 0.35);
  box-shadow: inset 0 0 0 1px rgb(var(--c-dark-50) / 0.09);
  font-family: theme('fontFamily.mono');
  font-size: 0.78rem;
  color: rgb(var(--c-dark-50));
  outline: none;
  transition: box-shadow 0.2s;
}

.src-custom-input:focus {
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.6);
}

@keyframes src-shimmer {
  to {
    background-position: -200% 0;
  }
}
</style>
