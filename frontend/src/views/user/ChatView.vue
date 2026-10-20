<template>
  <AppLayout>
    <div class="chat">
      <!-- phones: the conversation list slides in over the page -->
      <Transition name="chat-scrim">
        <div v-if="sessionsOpen" class="chat-sessions-scrim" aria-hidden="true" @click="sessionsOpen = false"></div>
      </Transition>
      <!-- ------------------------------------------------------------ conversations -->
      <aside class="card chat-sessions" :class="{ 'is-open': sessionsOpen }" :aria-label="t('chat.title')" data-no-reveal>
        <button type="button" class="chat-new" @click="startNew">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke-linecap="round" />
          </svg>
          {{ t('chat.newChat') }}
        </button>

        <div class="chat-s-scroll">
          <template v-for="bucket in buckets" :key="bucket.key">
            <p class="chat-s-label">{{ t(`chat.${bucket.key}`) }}</p>
            <div v-for="s in bucket.items" :key="s.id" class="chat-s-row">
              <button
                type="button"
                class="chat-s-item"
                :class="{ 'is-on': s.id === activeId }"
                :aria-current="s.id === activeId ? 'true' : undefined"
                @click="openSession(s.id)"
              >
                <b>{{ s.title || t('chat.untitled') }}</b>
                <span>
                  <i class="chat-dot" :style="{ background: platformColor(s.platform) }"></i>
                  {{ s.model || '—' }} · {{ formatTime(s.updatedAt) }}
                </span>
              </button>
              <button
                type="button"
                class="chat-s-del"
                :class="{ 'is-armed': armedDelete === s.id }"
                :aria-label="armedDelete === s.id ? t('chat.deleteConfirm') : t('chat.deleteSession')"
                :title="armedDelete === s.id ? t('chat.deleteConfirm') : t('chat.deleteSession')"
                @click="removeSession(s.id)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M5 7h14M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </template>
          <p v-if="!sessions.length" class="chat-s-empty">{{ t('chat.noSessions') }}</p>
        </div>
      </aside>

      <!-- ------------------------------------------------------------ conversation -->
      <section class="card chat-conv">
        <header class="chat-hud">
          <!-- phones only: open the conversation list -->
          <button
            type="button"
            class="chat-icon-btn chat-sessions-toggle"
            :aria-label="t('chat.title')"
            :title="t('chat.title')"
            :aria-expanded="sessionsOpen"
            @click.stop="sessionsOpen = !sessionsOpen"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10" stroke-linecap="round" /></svg>
          </button>
          <!-- key picker -->
          <div class="chat-pop-anchor">
            <button type="button" class="chat-picker" :aria-expanded="pop === 'key'" @click.stop="togglePop('key')">
              <span class="chat-picker-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="15" r="4.5" /><path d="M11.2 11.8L20 3m-3 3l2.5 2.5" stroke-linecap="round" /></svg>
              </span>
              <span class="chat-picker-text">{{ activeKey?.name || t('chat.pickKey') }}</span>
              <small v-if="activeKey" class="chat-picker-sub">{{ activeKey.group?.name || t('chat.noGroup') }}</small>
              <svg class="chat-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke-linecap="round" /></svg>
            </button>
            <Transition name="chat-pop">
              <div v-if="pop === 'key'" class="chat-pop" @click.stop>
                <button
                  v-for="k in keys"
                  :key="k.id"
                  type="button"
                  class="chat-pop-item"
                  :class="{ 'is-on': k.id === active?.keyId }"
                  @click="chooseKey(k)"
                >
                  <i class="chat-dot" :style="{ background: platformColor(k.group?.platform) }"></i>
                  <span class="chat-pop-main">
                    <b>{{ k.name }}</b>
                    <small>{{ k.group?.name || t('chat.noGroup') }} · {{ platformLabel(k.group?.platform) }}</small>
                    <small v-if="keyNote(k)" class="chat-knote">{{ keyNote(k) }}</small>
                  </span>
                  <code>{{ maskKey(k.key) }}</code>
                </button>
                <p v-if="!keys.length" class="chat-pop-empty">
                  {{ t('chat.noKeys') }} <router-link to="/keys">{{ t('chat.createKey') }}</router-link>
                </p>
              </div>
            </Transition>
          </div>

          <span class="chat-sep" aria-hidden="true">/</span>

          <!-- model picker -->
          <div class="chat-pop-anchor">
            <button type="button" class="chat-picker" :disabled="!activeKey" :aria-expanded="pop === 'model'" @click.stop="togglePop('model')">
              <i v-if="active?.model" class="chat-dot" :style="{ background: platformColor(active?.platform) }"></i>
              <span class="chat-picker-text chat-mono">{{ active?.model || t('chat.pickModel') }}</span>
              <svg class="chat-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke-linecap="round" /></svg>
            </button>
            <Transition name="chat-pop">
              <div v-if="pop === 'model'" class="chat-pop chat-pop-models" @click.stop>
                <input
                  v-model="modelQuery"
                  class="chat-pop-search"
                  type="search"
                  :placeholder="t('chat.searchModels')"
                  :aria-label="t('chat.searchModels')"
                  @keydown.enter="useTypedModel"
                />
                <div class="chat-pop-list">
                  <button
                    v-for="m in filteredModels"
                    :key="m.id"
                    type="button"
                    class="chat-pop-item"
                    :class="{ 'is-on': m.id === active?.model }"
                    @click="chooseModel(m.id)"
                  >
                    <i class="chat-dot" :style="{ background: platformColor(m.platform) }"></i>
                    <span class="chat-pop-main chat-mono"><b>{{ m.id }}</b></span>
                    <small v-if="m.inputPrice != null">{{ priceLabel(m) }}</small>
                  </button>
                  <button v-if="typedModel" type="button" class="chat-pop-item" @click="useTypedModel">
                    <span class="chat-pop-main">{{ t('chat.useTyped', { name: typedModel }) }}</span>
                  </button>
                  <p v-if="modelsLoading" class="chat-pop-empty">{{ t('chat.modelsLoading') }}</p>
                </div>
              </div>
            </Transition>
          </div>

          <div class="chat-meta">
            <span v-if="sessionTokens">{{ t('chat.tokensThisChat', { n: sessionTokens.toLocaleString() }) }}</span>
            <span v-if="sessionCost != null" :title="t('chat.estimateHint')">{{ t('chat.estimate', { cost: formatUsd(sessionCost) }) }}</span>
            <div class="chat-pop-anchor">
              <button
                type="button"
                class="chat-icon-btn"
                :class="{ 'is-on': pop === 'settings' || hasCustomSettings }"
                :aria-label="t('chat.settings')"
                :title="t('chat.settings')"
                :aria-expanded="pop === 'settings'"
                @click.stop="togglePop('settings')"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" stroke-linecap="round" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
              </button>
              <Transition name="chat-pop">
                <div v-if="pop === 'settings' && active" class="chat-pop chat-pop-right chat-settings" @click.stop>
                  <label class="chat-field">
                    <span>{{ t('chat.systemPrompt') }}</span>
                    <textarea v-model="active.settings.system" rows="3" :placeholder="t('chat.systemPlaceholder')" @change="touch(active)"></textarea>
                  </label>
                  <div class="chat-field">
                    <span class="chat-field-row">
                      {{ t('chat.temperature') }}
                      <b class="chat-mono">{{ active.settings.temperature == null ? t('chat.temperatureDefault') : active.settings.temperature.toFixed(1) }}</b>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      :value="active.settings.temperature ?? 1"
                      :aria-label="t('chat.temperature')"
                      @input="setTemperature(($event.target as HTMLInputElement).value)"
                    />
                  </div>
                  <label class="chat-field">
                    <span>{{ t('chat.maxTokens') }}</span>
                    <input
                      type="number"
                      min="1"
                      step="256"
                      :value="active.settings.maxTokens ?? ''"
                      :placeholder="t('chat.maxTokensPlaceholder')"
                      @change="setMaxTokens(($event.target as HTMLInputElement).value)"
                    />
                  </label>
                  <label class="chat-field">
                    <span>{{ t('chat.protocol') }}</span>
                    <select v-model="active.settings.protocol" @change="touch(active)">
                      <option value="auto">{{ t('chat.protocolAuto') }}</option>
                      <option value="openai">OpenAI Chat Completions</option>
                      <option value="responses">OpenAI Responses</option>
                      <option value="anthropic">Anthropic Messages</option>
                      <option value="gemini">Gemini</option>
                    </select>
                    <small>{{ t('chat.protocolHint') }}</small>
                  </label>
                  <button type="button" class="btn btn-ghost btn-sm" @click="resetSettings">{{ t('chat.resetSettings') }}</button>
                </div>
              </Transition>
            </div>
          </div>
        </header>

        <!-- ---------------- first run: key → model → chat ---------------- -->
        <div v-if="showSetup" class="chat-setup">
          <ol class="chat-steps">
            <li :class="stepClass(1)"><i>{{ activeKey ? '✓' : 1 }}</i>{{ t('chat.stepKey') }}</li>
            <li class="chat-steps-bar" aria-hidden="true"></li>
            <li :class="stepClass(2)"><i>{{ active?.model && activeKey ? '✓' : 2 }}</i>{{ t('chat.stepModel') }}</li>
            <li class="chat-steps-bar" aria-hidden="true"></li>
            <li :class="stepClass(3)"><i>3</i>{{ t('chat.stepChat') }}</li>
          </ol>

          <p v-if="keyMissing" class="chat-notice">{{ t('chat.keyMissing') }}</p>

          <h2 class="chat-h2">{{ t('chat.whichKey') }}</h2>
          <p class="chat-lead">{{ t('chat.whichKeyHint') }}</p>
          <div v-if="sourcesLoading" class="chat-keys">
            <div v-for="i in 3" :key="i" class="chat-kcard skeleton h-[92px]"></div>
          </div>
          <div v-else-if="keys.length" class="chat-keys" role="radiogroup" :aria-label="t('chat.whichKey')">
            <button
              v-for="k in keys"
              :key="k.id"
              type="button"
              role="radio"
              class="chat-kcard"
              :class="{ 'is-on': k.id === active?.keyId }"
              :aria-checked="k.id === active?.keyId"
              @click="chooseKey(k)"
            >
              <span v-if="k.id === active?.keyId" class="chat-tick" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2"><path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
              <b>{{ k.name }}</b>
              <code>{{ maskKey(k.key) }}</code>
              <span class="chat-kgroup">
                <i class="chat-dot" :style="{ background: platformColor(k.group?.platform) }"></i>
                {{ k.group?.name || t('chat.noGroup') }}
                <em>· {{ platformLabel(k.group?.platform) }}</em>
              </span>
              <small v-if="keyNote(k)" class="chat-knote">{{ keyNote(k) }}</small>
            </button>
          </div>
          <p v-else-if="sourcesError" class="chat-notice" role="alert">
            {{ t('chat.keysLoadFailed') }}
            <button type="button" class="chat-link" @click="loadSources">{{ t('chat.retry') }}</button>
          </p>
          <p v-else class="chat-lead">
            {{ t('chat.noKeys') }} <router-link to="/keys" class="chat-link">{{ t('chat.createKey') }}</router-link>
          </p>

          <template v-if="activeKey">
            <div class="chat-mhead">
              <h2 class="chat-h2">{{ t('chat.stepModel') }}</h2>
              <label class="chat-msearch">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" stroke-linecap="round" /></svg>
                <input v-model="modelQuery" type="search" :placeholder="t('chat.searchModels')" :aria-label="t('chat.searchModels')" @keydown.enter="useTypedModel" />
              </label>
            </div>
            <p class="chat-lead">
              <template v-if="modelsLoading">{{ t('chat.modelsLoading') }}</template>
              <template v-else-if="modelsAssumed">{{ t('chat.modelsAssumed') }}</template>
              <template v-else-if="models.length">{{ t('chat.modelsFor', { group: activeKey.group?.name || t('chat.noGroup'), count: models.length }) }}</template>
              <template v-else>{{ t('chat.noModels') }}</template>
            </p>
            <div class="chat-mgrid" role="radiogroup" :aria-label="t('chat.stepModel')">
              <button
                v-for="(m, i) in filteredModels"
                :key="m.id"
                type="button"
                role="radio"
                class="chat-mchip"
                :class="{ 'is-on': m.id === active?.model }"
                :aria-checked="m.id === active?.model"
                @click="chooseModel(m.id)"
              >
                <i class="chat-dot" :style="{ background: platformColor(m.platform) }"></i>
                {{ m.id }}
                <small v-if="i === 0 && !modelQuery">{{ t('chat.recommended') }}</small>
              </button>
              <button v-if="typedModel" type="button" class="chat-mchip" @click="useTypedModel">{{ t('chat.useTyped', { name: typedModel }) }}</button>
            </div>
            <button type="button" class="chat-start" :disabled="!active?.model" @click="beginChat">
              {{ t('chat.start') }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </button>
          </template>
        </div>

        <!-- ---------------- the conversation ---------------- -->
        <div v-else ref="scrollRef" class="chat-msgs" @click="onMessagesClick" @scroll.passive="onScroll">
          <div v-if="!messages.length" class="chat-ready">
            <BrandMark :size="56" :decorative="true" />
            <h2 class="chat-h2">{{ t('chat.readyTitle') }}</h2>
            <p class="chat-lead">{{ t('chat.readyHint', { model: active?.model }) }}</p>
            <div class="chat-suggest">
              <button v-for="s in suggestionKeys" :key="s" type="button" class="chat-suggest-item" @click="useSuggestion(s)">
                {{ t(`chat.suggestions.${s}`) }}
              </button>
            </div>
          </div>

          <article v-for="(m, i) in messages" :key="m.id" class="chat-m" :class="`is-${m.role}`">
            <BrandMark v-if="m.role === 'assistant'" class="chat-avatar" :size="30" :decorative="true" />
            <div class="chat-m-body">
              <p v-if="m.role === 'user'" class="chat-bubble">{{ m.content }}</p>
              <template v-else>
                <details v-if="m.reasoning" class="chat-think" :open="m.pending && !m.content">
                  <summary>{{ t('chat.thinking') }}</summary>
                  <div class="chat-think-body">{{ m.reasoning }}</div>
                </details>
                <!-- markdown, sanitised with DOMPurify -->
                <div v-if="m.content" class="chat-md" v-html="m.pending ? withCaret(renderMarkdown(m.content)) : renderMarkdown(m.content)"></div>
                <span v-else-if="m.pending" class="chat-caret" aria-hidden="true"></span>
                <p v-if="m.error" class="chat-error" role="alert">
                  {{ m.error }}
                  <button v-if="i === messages.length - 1" type="button" @click="regenerate">{{ t('chat.retry') }}</button>
                </p>
                <div v-if="!m.pending" class="chat-m-foot">
                  <button v-if="m.content" type="button" :aria-label="t('chat.copy')" :title="t('chat.copy')" @click="copyText(m.content)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V5.5A1.5 1.5 0 0014.5 4h-9A1.5 1.5 0 004 5.5v9A1.5 1.5 0 005.5 16H8" /></svg>
                  </button>
                  <button v-if="i === messages.length - 1 && !streaming" type="button" :aria-label="t('chat.regenerate')" :title="t('chat.regenerate')" @click="regenerate">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 12a8 8 0 11-2.3-5.7M20 4v5h-5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  </button>
                  <span v-if="m.usage">{{ t('chat.replyTokens', { input: m.usage.inputTokens.toLocaleString(), output: m.usage.outputTokens.toLocaleString() }) }}</span>
                  <span v-if="m.cost != null" :title="t('chat.estimateHint')">· {{ formatUsd(m.cost) }}</span>
                  <span v-if="m.model">· {{ m.model }}</span>
                </div>
                <div v-else class="chat-m-foot">
                  <span>{{ t('chat.generating') }} · {{ m.content.length }}</span>
                </div>
              </template>
            </div>
          </article>
        </div>

        <!-- ---------------- composer ---------------- -->
        <div v-if="!showSetup" class="chat-composer">
          <div class="chat-cbox" :class="{ 'is-focus': composerFocused }">
            <textarea
              ref="inputRef"
              v-model="draft"
              rows="1"
              :placeholder="ready ? t('chat.placeholder', { model: active?.model }) : t('chat.placeholderDisabled')"
              :disabled="!ready"
              :aria-label="t('chat.composerLabel')"
              @keydown="onComposerKey"
              @input="autosize"
              @focus="composerFocused = true"
              @blur="composerFocused = false"
            ></textarea>
            <div class="chat-c-row">
              <button type="button" class="chat-c-chip" @click.stop="togglePop('settings')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h7" stroke-linecap="round" /></svg>
                {{ t('chat.systemPrompt') }}<b v-if="active?.settings.system" class="chat-c-on" aria-hidden="true"></b>
              </button>
              <span class="chat-c-hint">{{ t('chat.composerHint') }}</span>
              <button v-if="streaming" type="button" class="chat-send is-stop" :aria-label="t('chat.stop')" :title="t('chat.stop')" @click="stop">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" /></svg>
              </button>
              <button v-else type="button" class="chat-send" :disabled="!canSend" :aria-label="t('chat.send')" :title="t('chat.send')" @click="send">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Marked } from 'marked'
import DOMPurify from 'dompurify'
import AppLayout from '@/components/layout/AppLayout.vue'
import BrandMark from '@/components/brand/BrandMark.vue'
import { useAuthStore } from '@/stores/auth'
import { useClipboard } from '@/composables/useClipboard'
import { platformColor } from '@/composables/useStudioSources'
import {
  DEFAULT_SETTINGS,
  estimateCost,
  sessionBucket,
  sessionRoutes,
  useChatSessions,
  useChatSources,
  type ChatModel,
  type ChatSession
} from '@/composables/useChat'
import { ChatError, isUnsupportedRoute, streamChat, type ChatResult, type ChatTurn } from '@/api/chat'
import type { ApiKey } from '@/types'

const { t, locale } = useI18n()
const authStore = useAuthStore()
const { copyToClipboard } = useClipboard()

const { keys, loading: sourcesLoading, error: sourcesError, load: loadSources, modelsForKey } = useChatSources()
const { sessions, activeId, active, create, remove, touch, newMessage, flush } = useChatSessions(() => authStore.user?.id)

/* ---------------------------------------------------------------- pickers */
type Pop = 'key' | 'model' | 'settings' | null
const pop = ref<Pop>(null)
/** phones: whether the conversation list drawer is showing (always visible on wide screens) */
const sessionsOpen = ref(false)
function togglePop(which: Exclude<Pop, null>) {
  pop.value = pop.value === which ? null : which
  if (which === 'model') modelQuery.value = ''
}
function closePops() {
  pop.value = null
}

const activeKey = computed<ApiKey | null>(() => (active.value?.keyId != null ? keys.value.find((k) => k.id === active.value?.keyId) || null : null))
const keyMissing = computed(() => !!active.value?.keyId && !sourcesLoading.value && keys.value.length > 0 && !activeKey.value)

const models = ref<ChatModel[]>([])
const modelsLoading = ref(false)
const modelsAssumed = computed(() => models.value.length > 0 && models.value.every((m) => m.source === 'default'))
const modelQuery = ref('')
const filteredModels = computed(() => {
  const q = modelQuery.value.trim().toLowerCase()
  return q ? models.value.filter((m) => m.id.toLowerCase().includes(q)) : models.value
})
/** a name typed into the search that is not in the list can still be used */
const typedModel = computed(() => {
  const q = modelQuery.value.trim()
  return q && !models.value.some((m) => m.id === q) ? q : ''
})

let modelsRequest = 0
watch(
  activeKey,
  async (key) => {
    const req = ++modelsRequest
    models.value = []
    if (!key) return
    modelsLoading.value = true
    try {
      const list = await modelsForKey(key)
      if (req === modelsRequest) models.value = list
    } finally {
      if (req === modelsRequest) modelsLoading.value = false
    }
  },
  { immediate: true }
)

function chooseKey(k: ApiKey) {
  if (!active.value) create()
  const s = active.value as ChatSession
  const platformChanged = s.platform !== (k.group?.platform || '')
  s.keyId = k.id
  s.platform = k.group?.platform || ''
  s.routeHint = null
  if (platformChanged) s.model = ''
  touch(s)
  pop.value = null
}

function chooseModel(id: string) {
  if (!active.value) return
  if (active.value.model !== id) active.value.routeHint = null
  active.value.model = id
  touch(active.value)
  pop.value = null
  modelQuery.value = ''
}

/** Enter in a model search: an exact name, the only match, or the name as typed */
function useTypedModel(e?: Event) {
  if (e instanceof KeyboardEvent) {
    // Enter that commits input-method text is not a choice
    if (e.isComposing || e.keyCode === 229) return
    e.preventDefault()
  }
  const q = modelQuery.value.trim()
  if (!q) return
  const exact = models.value.find((m) => m.id === q)
  if (exact) chooseModel(exact.id)
  else if (filteredModels.value.length === 1) chooseModel(filteredModels.value[0].id)
  else chooseModel(q)
}

/* ---------------------------------------------------------------- setup flow */
const setupOpen = ref(true)
const showSetup = computed(() => !active.value || !activeKey.value || !active.value.model || (setupOpen.value && !active.value.messages.length))
const ready = computed(() => !!activeKey.value && !!active.value?.model)

function stepClass(step: 1 | 2 | 3) {
  const keyDone = !!activeKey.value
  const modelDone = keyDone && !!active.value?.model
  if (step === 1) return keyDone ? 'is-done' : 'is-now'
  if (step === 2) return modelDone ? 'is-done' : keyDone ? 'is-now' : ''
  return modelDone ? 'is-now' : ''
}

function beginChat() {
  if (!ready.value) return
  setupOpen.value = false
  void nextTick(() => inputRef.value?.focus())
}

/* ---------------------------------------------------------------- sessions */
function startNew() {
  stop()
  const prev = active.value
  // a new chat keeps the key and model you were using, so it is one click to continue
  create(prev ? { keyId: prev.keyId, model: prev.model, platform: prev.platform, settings: { ...prev.settings } } : undefined)
  setupOpen.value = !(prev?.keyId && prev?.model)
  sessionsOpen.value = false
  draft.value = ''
  void nextTick(() => inputRef.value?.focus())
}

function openSession(id: string) {
  sessionsOpen.value = false
  if (id === activeId.value) return
  stop()
  activeId.value = id
  setupOpen.value = false
  pop.value = null
  void nextTick(() => scrollToBottom(true))
}

// A conversation with messages takes a second click to delete (it only lives in this browser)
const armedDelete = ref<string | null>(null)
let armTimer = 0
function removeSession(id: string) {
  const s = sessions.value.find((x) => x.id === id)
  if (s?.messages.length && armedDelete.value !== id) {
    armedDelete.value = id
    window.clearTimeout(armTimer)
    armTimer = window.setTimeout(() => (armedDelete.value = null), 3000)
    return
  }
  armedDelete.value = null
  window.clearTimeout(armTimer)
  if (id === activeId.value) stop()
  remove(id)
}

const buckets = computed(() => {
  const groups: Record<'today' | 'yesterday' | 'earlier', ChatSession[]> = { today: [], yesterday: [], earlier: [] }
  for (const s of sessions.value) groups[sessionBucket(s.updatedAt)].push(s)
  return (['today', 'yesterday', 'earlier'] as const).filter((k) => groups[k].length).map((key) => ({ key, items: groups[key] }))
})

function formatTime(ts: number) {
  const d = new Date(ts)
  const pad = (n: number) => String(n).padStart(2, '0')
  return sessionBucket(ts) === 'earlier' ? `${pad(d.getMonth() + 1)}/${pad(d.getDate())}` : `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const messages = computed(() => active.value?.messages || [])
const sessionTokens = computed(() => messages.value.reduce((n, m) => n + (m.usage ? m.usage.inputTokens + m.usage.outputTokens : 0), 0))
const sessionCost = computed(() => {
  const costs = messages.value.map((m) => m.cost).filter((c): c is number => c != null)
  return costs.length ? costs.reduce((a, b) => a + b, 0) : null
})

const hasCustomSettings = computed(() => {
  const s = active.value?.settings
  return !!s && (!!s.system || s.temperature != null || !!s.maxTokens || s.protocol !== 'auto')
})

function setTemperature(v: string) {
  if (!active.value) return
  active.value.settings.temperature = Math.round(Number(v) * 10) / 10
  touch(active.value)
}

function setMaxTokens(v: string) {
  if (!active.value) return
  const n = Math.floor(Number(v))
  active.value.settings.maxTokens = Number.isFinite(n) && n > 0 ? n : null
  touch(active.value)
}

function resetSettings() {
  if (!active.value) return
  active.value.settings = { ...DEFAULT_SETTINGS }
  touch(active.value)
}

/* ---------------------------------------------------------------- sending */
const draft = ref('')
const inputRef = ref<HTMLTextAreaElement | null>(null)
const composerFocused = ref(false)
const streaming = ref(false)
let controller: AbortController | null = null

const canSend = computed(() => ready.value && !!draft.value.trim() && !streaming.value)
const suggestionKeys = ['explain', 'code', 'polish', 'plan'] as const

function useSuggestion(key: (typeof suggestionKeys)[number]) {
  draft.value = t(`chat.suggestions.${key}`)
  void nextTick(() => {
    autosize()
    inputRef.value?.focus()
  })
}

function autosize() {
  const el = inputRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 220)}px`
}

/** touch-first devices: the on-screen keyboard's return key adds a line; the send button sends */
const touchFirst = typeof window !== 'undefined' && !!window.matchMedia?.('(hover: none) and (pointer: coarse)').matches

function onComposerKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && !touchFirst) {
    e.preventDefault()
    send()
  }
}

function history(): ChatTurn[] {
  return messages.value
    .filter((m) => !m.pending && !m.error && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content }))
}

/**
 * Turn the gateway's refusal into a sentence that says what to do. The gateway's own checks
 * answer 403 for balance and subscription limits and 429 for key quotas, the key's 5h / daily /
 * weekly limits and RPM, so the status alone is not enough: the code and the message decide.
 */
function friendlyError(e: unknown): string {
  if (e instanceof ChatError) {
    const code = e.code.toUpperCase()
    const msg = e.message || ''
    if (code === 'INSUFFICIENT_BALANCE' || /insufficient (account )?balance|余额不足/i.test(msg)) return t('chat.errors.balance')
    if (code === 'API_KEY_QUOTA_EXHAUSTED' || code === 'INSUFFICIENT_QUOTA' || /api key 额度已用完/i.test(msg)) return t('chat.errors.keyQuota')
    if (code === 'API_KEY_EXPIRED' || /api key 已过期/i.test(msg)) return t('chat.errors.keyExpired')
    if (/only allows claude code clients/i.test(msg)) return t('chat.errors.claudeCodeOnly')
    if (e.status === 401) return t('chat.errors.unauthorized')
    if (e.status === 402) return t('chat.errors.quota')
    if (e.status === 403) return t('chat.errors.forbidden', { msg })
    if (e.status === 429) return t('chat.errors.limited', { msg })
    return msg
  }
  if (e instanceof TypeError) return t('chat.errors.network')
  return e instanceof Error ? e.message : String(e)
}

async function run() {
  const session = active.value
  const key = activeKey.value
  if (!session || !key || !session.model) return
  const turns = history()
  const reply = newMessage('assistant', '', { pending: true, model: session.model })
  session.messages.push(reply)
  // keep a handle on the reactive copy so streamed text renders as it arrives
  const live = session.messages[session.messages.length - 1]
  touch(session)
  streaming.value = true
  controller = new AbortController()
  const modelInfo = models.value.find((m) => m.id === session.model)
  const routes = sessionRoutes(session)
  const signal = controller.signal
  void nextTick(() => scrollToBottom(true))
  try {
    let result: ChatResult | null = null
    // try the group's formats in order; a 404 / 405 before any text means "not this format here"
    for (let i = 0; i < routes.length && !result; i++) {
      const { protocol, prefix } = routes[i]
      try {
        result = await streamChat(
          {
            apiKey: key.key,
            protocol,
            prefix,
            model: session.model,
            messages: turns,
            system: session.settings.system,
            temperature: session.settings.temperature,
            maxTokens: session.settings.maxTokens,
            signal
          },
          {
            onText: (d) => {
              live.content += d
              scheduleScroll()
            },
            onReasoning: (d) => {
              live.reasoning = (live.reasoning || '') + d
              scheduleScroll()
            },
            onUsage: (u) => {
              live.usage = u
            }
          }
        )
        if (session.settings.protocol === 'auto') session.routeHint = protocol
      } catch (e) {
        const canFallBack = i < routes.length - 1 && isUnsupportedRoute(e) && !live.content && !live.reasoning
        if (!canFallBack) throw e
      }
    }
    if (!result) return
    live.usage = result.usage ?? live.usage ?? null
    live.cost = estimateCost(modelInfo, live.usage)
  } catch (e) {
    if ((e as Error)?.name === 'AbortError') {
      if (!live.content) live.error = t('chat.stopped')
    } else {
      live.error = friendlyError(e)
    }
  } finally {
    live.pending = false
    streaming.value = false
    controller = null
    touch(session)
  }
}

function send() {
  if (!canSend.value || !active.value) return
  const text = draft.value.trim()
  const session = active.value
  session.messages.push(newMessage('user', text))
  if (!session.title) session.title = text.replace(/\s+/g, ' ').slice(0, 40)
  draft.value = ''
  void nextTick(autosize)
  void run()
}

function regenerate() {
  const session = active.value
  if (!session || streaming.value) return
  const last = session.messages[session.messages.length - 1]
  if (last?.role === 'assistant') session.messages.pop()
  if (!session.messages.length || session.messages[session.messages.length - 1].role !== 'user') return
  void run()
}

function stop() {
  controller?.abort()
}

/* ---------------------------------------------------------------- rendering */
const marked = new Marked({
  gfm: true,
  breaks: true,
  renderer: {
    // code blocks get a header with the language and a copy button
    code({ text, lang }) {
      const language = (lang || '').trim().split(/\s+/)[0] || 'text'
      const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return `<div class="chat-code"><div class="chat-code-head"><span>${language.replace(/[^\w+#.-]/g, '')}</span><button type="button" data-copy-code>${t('chat.copyCode')}</button></div><pre><code>${escaped}</code></pre></div>`
    }
  }
})

// a purifier of this page's own: the hook below must not touch other pages' sanitising
const purifier = DOMPurify(window)
// links a model writes open in a new tab, so following one never leaves the conversation
purifier.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('href')) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

// keyed by locale too: the code blocks' copy button is translated
const renderCache = new Map<string, string>()
function renderMarkdown(src: string): string {
  if (!src) return ''
  const cacheKey = `${locale.value}\u0000${src}`
  const hit = renderCache.get(cacheKey)
  if (hit) return hit
  const html = purifier.sanitize(marked.parse(src, { async: false }) as string, { ADD_ATTR: ['data-copy-code', 'target'] })
  if (renderCache.size > 400) renderCache.clear()
  renderCache.set(cacheKey, html)
  return html
}

/** while streaming, the caret sits at the end of the last line of text instead of below it */
const CARET = '<span class="chat-caret" aria-hidden="true"></span>'
function withCaret(html: string): string {
  const tail = /(<\/(?:p|li|h[1-6]|td|th|blockquote)>(?:\s*<\/(?:ul|ol|tr|tbody|table|blockquote)>)*\s*)$/
  return tail.test(html) ? html.replace(tail, `${CARET}$1`) : html + CARET
}

function onMessagesClick(e: MouseEvent) {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copy-code]')
  if (!btn) return
  const code = btn.closest('.chat-code')?.querySelector('code')?.textContent || ''
  void copyText(code)
}

async function copyText(text: string) {
  await copyToClipboard(text, t('chat.copied'))
}

function priceLabel(m: ChatModel) {
  if (m.inputPrice == null || m.outputPrice == null) return ''
  const per = (v: number) => `$${(v * 1_000_000).toFixed(v * 1_000_000 < 1 ? 2 : 1)}`
  return `${per(m.inputPrice)} / ${per(m.outputPrice)} · 1M`
}

function formatUsd(v: number) {
  return `$${v < 0.01 ? v.toFixed(4) : v.toFixed(3)}`
}

function maskKey(key: string) {
  return key ? `${key.slice(0, 3)}••••••${key.slice(-4)}` : ''
}

const PLATFORM_NAMES: Record<string, string> = {
  anthropic: 'Anthropic',
  openai: 'OpenAI',
  gemini: 'Gemini',
  antigravity: 'Antigravity',
  grok: 'Grok',
  kimi: 'Kimi',
  zhipu: 'Zhipu',
  deepseek: 'DeepSeek',
  minimax: 'MiniMax',
  opencode_go: 'OpenCode',
  composite: 'Composite'
}
/**
 * Groups limited to Claude Code clients turn browser chats away, or hand them to their fallback
 * group's accounts. Say so on the key before the person picks it.
 */
function keyNote(k: ApiKey): string {
  const g = k.group
  if (!g?.claude_code_only) return ''
  return g.fallback_group_id ? t('chat.keyFallback') : t('chat.keyClaudeCodeOnly')
}

function platformLabel(p?: string | null) {
  return (p && (PLATFORM_NAMES[p] || p)) || '—'
}

/* ---------------------------------------------------------------- scrolling */
const scrollRef = ref<HTMLElement | null>(null)
let stickToBottom = true
let scrollQueued = false

function onScroll() {
  const el = scrollRef.value
  if (!el) return
  stickToBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
}

function scrollToBottom(force = false) {
  const el = scrollRef.value
  if (!el || (!force && !stickToBottom)) return
  el.scrollTop = el.scrollHeight
  if (force) stickToBottom = true
}

function scheduleScroll() {
  if (scrollQueued) return
  scrollQueued = true
  requestAnimationFrame(() => {
    scrollQueued = false
    scrollToBottom()
  })
}

/* ---------------------------------------------------------------- lifecycle */
function onDocumentKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && pop.value) {
    pop.value = null
    e.preventDefault()
  } else if (e.key === 'Escape' && sessionsOpen.value) {
    sessionsOpen.value = false
    e.preventDefault()
  }
}

let unmounted = false

onMounted(async () => {
  document.addEventListener('click', closePops)
  document.addEventListener('keydown', onDocumentKeydown)
  // a reply that just finished is written before the tab closes
  window.addEventListener('pagehide', flush)
  await loadSources()
  // left the page while the keys were loading: do not start an empty conversation behind the user's back
  if (unmounted) return
  if (!active.value) {
    if (sessions.value.length) {
      activeId.value = sessions.value[0].id
      setupOpen.value = !sessions.value[0].messages.length
    } else {
      create(keys.value.length === 1 ? { keyId: keys.value[0].id, platform: keys.value[0].group?.platform || '' } : undefined)
    }
  }
  void nextTick(() => scrollToBottom(true))
})

onBeforeUnmount(() => {
  unmounted = true
  document.removeEventListener('click', closePops)
  document.removeEventListener('keydown', onDocumentKeydown)
  window.removeEventListener('pagehide', flush)
  window.clearTimeout(armTimer)
  stop()
  flush()
})
</script>

<style scoped>
.chat {
  display: grid;
  grid-template-columns: 15.5rem minmax(0, 1fr);
  gap: 0.75rem;
  /* fills the console column under the page heading */
  height: calc(100vh - 13rem);
  min-height: 34rem;
}

/* ---------------- conversations ---------------- */
.chat-sessions {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  min-height: 0;
  padding: 0.75rem;
}

.chat-new {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgb(var(--c-gray-900));
  background: linear-gradient(180deg, rgb(var(--c-gray-100)), rgb(var(--c-gray-50)));
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
  transition:
    transform 0.45s var(--ease-spring),
    box-shadow 0.2s var(--ease-out);
}

.dark .chat-new {
  color: #fff;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.09), rgb(255 255 255 / 0.03));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.14),
    inset 0 0 0 1px rgb(255 255 255 / 0.1);
}

.chat-new:hover {
  transform: translateY(-1px);
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.5);
}

.chat-new:active {
  transform: scale(0.98);
}

.chat-new svg {
  width: 1rem;
  height: 1rem;
  color: rgb(var(--c-primary-500));
}

.dark .chat-new svg {
  color: rgb(var(--signal-a));
}

.chat-s-scroll {
  display: grid;
  align-content: start;
  gap: 2px;
  min-height: 0;
  overflow-y: auto;
}

.chat-s-label {
  padding: 0.5rem 0.4rem 0.2rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgb(var(--c-gray-400));
}

.dark .chat-s-label {
  color: rgb(var(--c-dark-500));
}

.chat-s-row {
  position: relative;
}

.chat-s-item {
  display: grid;
  gap: 2px;
  width: 100%;
  padding: 0.55rem 2rem 0.55rem 0.65rem;
  border-radius: 0.7rem;
  text-align: left;
  transition: background-color 0.2s var(--ease-out);
}

.chat-s-item:hover {
  background: rgb(var(--c-gray-100) / 0.8);
}

.dark .chat-s-item:hover {
  background: rgb(255 255 255 / 0.04);
}

.chat-s-item.is-on {
  background: rgb(var(--c-gray-100));
  box-shadow: inset 0 0 0 1px var(--hairline);
}

.dark .chat-s-item.is-on {
  background: rgb(255 255 255 / 0.055);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.07);
}

.chat-s-item b {
  overflow: hidden;
  font-size: 0.8125rem;
  font-weight: 550;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(var(--c-gray-900));
}

.dark .chat-s-item b {
  color: rgb(var(--c-dark-50));
}

.chat-s-item span {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  overflow: hidden;
  font-size: 0.72rem;
  white-space: nowrap;
  color: rgb(var(--c-gray-500));
}

.dark .chat-s-item span {
  color: rgb(var(--c-dark-400));
}

.chat-s-del {
  position: absolute;
  right: 0.35rem;
  top: 50%;
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  margin-top: -0.8rem;
  border-radius: 0.5rem;
  color: rgb(var(--c-gray-400));
  opacity: 0;
  transition:
    opacity 0.15s,
    background-color 0.15s,
    color 0.15s;
}

.chat-s-row:hover .chat-s-del,
.chat-s-del:focus-visible {
  opacity: 1;
}

/* no hover on touch screens: keep delete reachable */
@media (hover: none) {
  .chat-s-del {
    opacity: 0.7;
  }
}

.chat-s-del:hover {
  color: rgb(239 68 68);
  background: rgb(239 68 68 / 0.1);
}

/* first click on a conversation with messages: stays visible and red until the second click */
.chat-s-del.is-armed {
  opacity: 1;
  color: #fff;
  background: rgb(239 68 68);
}

.chat-s-del svg {
  width: 0.95rem;
  height: 0.95rem;
}

.chat-s-empty {
  padding: 1rem 0.5rem;
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgb(var(--c-gray-500));
}

.chat-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 9999px;
}

/* ---------------- conversation frame ---------------- */
.chat-conv {
  display: grid;
  /*
   * an explicit shrinkable column: with the implicit `auto` column, the header's unbreakable
   * key / model names set the column's minimum and pushed the whole pane past a phone's edge
   */
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr) auto;
  min-height: 0;
  min-width: 0;
}

.chat-hud {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid var(--hairline);
}

.chat-pop-anchor {
  position: relative;
  min-width: 0;
}

.chat-picker {
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  gap: 0.5rem;
  height: 2.25rem;
  padding: 0 0.6rem 0 0.5rem;
  border-radius: 0.7rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgb(var(--c-gray-900));
  background: rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
  transition:
    box-shadow 0.2s var(--ease-out),
    background-color 0.2s var(--ease-out);
}

.dark .chat-picker {
  color: #fff;
  background: rgb(255 255 255 / 0.035);
}

.chat-picker:hover:not(:disabled),
.chat-picker[aria-expanded='true'] {
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.5);
}

.chat-picker:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.chat-picker-ico {
  display: grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
  border-radius: 0.45rem;
  color: rgb(var(--c-primary-600));
  background: rgb(var(--c-primary-500) / 0.12);
}

.dark .chat-picker-ico {
  color: rgb(var(--signal-a));
  background: rgb(var(--signal-a) / 0.14);
}

.chat-picker-ico svg {
  width: 0.8rem;
  height: 0.8rem;
}

.chat-picker-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-picker-sub {
  overflow: hidden;
  font-size: 0.72rem;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(var(--c-gray-500));
}

.dark .chat-picker-sub {
  color: rgb(var(--c-dark-400));
}

.chat-chev {
  width: 0.8rem;
  height: 0.8rem;
  flex-shrink: 0;
  color: rgb(var(--c-gray-400));
}

.chat-sep {
  color: rgb(var(--c-gray-300));
}

.dark .chat-sep {
  color: rgb(var(--c-dark-600));
}

.chat-mono {
  font-family: theme('fontFamily.mono');
  font-weight: 550;
}

.chat-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
  font-size: 0.75rem;
  white-space: nowrap;
  color: rgb(var(--c-gray-500));
  font-variant-numeric: tabular-nums;
}

.dark .chat-meta {
  color: rgb(var(--c-dark-400));
}

.chat-icon-btn {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 0.6rem;
  color: rgb(var(--c-gray-500));
  transition:
    background-color 0.2s,
    color 0.2s;
}

.chat-icon-btn:hover,
.chat-icon-btn.is-on {
  color: rgb(var(--c-gray-900));
  background: rgb(var(--c-gray-100));
}

.dark .chat-icon-btn:hover,
.dark .chat-icon-btn.is-on {
  color: #fff;
  background: rgb(255 255 255 / 0.06);
}

.chat-icon-btn svg {
  width: 1.1rem;
  height: 1.1rem;
}

/* popovers */
.chat-pop {
  position: absolute;
  left: 0;
  top: calc(100% + 0.5rem);
  z-index: 30;
  display: grid;
  gap: 2px;
  width: min(22rem, calc(100vw - 2rem));
  max-height: 22rem;
  overflow-y: auto;
  padding: 0.375rem;
  border-radius: 0.875rem;
  background: rgb(255 255 255 / 0.98);
  border: 1px solid rgb(var(--c-gray-200));
  box-shadow: var(--shadow-pop);
}

.dark .chat-pop {
  background: rgb(var(--c-dark-850) / 0.98);
  border-color: rgb(255 255 255 / 0.09);
}

.chat-pop-right {
  left: auto;
  right: 0;
}

.chat-pop-models {
  display: flex;
  flex-direction: column;
  max-height: 24rem;
  overflow: hidden;
}

.chat-pop-list {
  display: grid;
  gap: 2px;
  overflow-y: auto;
}

.chat-pop-search {
  width: 100%;
  margin-bottom: 0.375rem;
  padding: 0.5rem 0.65rem;
  border-radius: 0.6rem;
  border: 0;
  outline: 0;
  font-size: 0.8125rem;
  color: inherit;
  background: rgb(var(--c-gray-100));
}

.dark .chat-pop-search {
  background: rgb(0 0 0 / 0.3);
}

.chat-pop-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.5rem 0.6rem;
  border-radius: 0.6rem;
  text-align: left;
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-800));
  transition: background-color 0.15s;
}

.dark .chat-pop-item {
  color: rgb(var(--c-dark-100));
}

.chat-pop-item:hover {
  background: rgb(var(--c-gray-100));
}

.dark .chat-pop-item:hover {
  background: rgb(255 255 255 / 0.06);
}

.chat-pop-item.is-on {
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.55);
}

.chat-pop-main {
  display: grid;
  min-width: 0;
  flex: 1 1 auto;
}

.chat-pop-main b {
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-pop-item small,
.chat-pop-main small {
  font-size: 0.7rem;
  color: rgb(var(--c-gray-500));
}

.chat-pop-item code {
  font-family: theme('fontFamily.mono');
  font-size: 0.7rem;
  color: rgb(var(--c-gray-400));
}

.chat-pop-empty {
  padding: 0.75rem;
  font-size: 0.78rem;
  color: rgb(var(--c-gray-500));
}

.chat-pop-empty a {
  color: rgb(var(--c-primary-500));
}

.chat-settings {
  gap: 0.75rem;
  padding: 0.875rem;
  width: min(22rem, calc(100vw - 2rem));
}

.chat-field {
  display: grid;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: rgb(var(--c-gray-600));
}

.dark .chat-field {
  color: rgb(var(--c-dark-300));
}

.chat-field-row {
  display: flex;
  justify-content: space-between;
}

.chat-field b {
  font-weight: 600;
  color: rgb(var(--c-gray-900));
}

.dark .chat-field b {
  color: #fff;
}

.chat-field textarea,
.chat-field input[type='number'],
.chat-field select {
  width: 100%;
  padding: 0.5rem 0.6rem;
  border-radius: 0.6rem;
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-900));
  background: rgb(var(--c-gray-50));
  border: 1px solid rgb(var(--c-gray-200));
  outline: 0;
  resize: vertical;
}

.dark .chat-field textarea,
.dark .chat-field input[type='number'],
.dark .chat-field select {
  color: #fff;
  background: rgb(0 0 0 / 0.25);
  border-color: rgb(255 255 255 / 0.1);
}

.chat-field select {
  -webkit-appearance: none;
  appearance: none;
  padding-right: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23857f77' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  background-size: 0.9rem 0.9rem;
  cursor: pointer;
}

.dark .chat-field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23b4aea6' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
  /* the dark field rule above uses the background shorthand, which resets these */
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  background-size: 0.9rem 0.9rem;
}

.chat-field textarea:focus,
.chat-field input:focus,
.chat-field select:focus {
  border-color: rgb(var(--signal-a) / 0.7);
}

.chat-field input[type='range'] {
  accent-color: rgb(var(--signal-a));
}

.chat-field small {
  font-size: 0.7rem;
  line-height: 1.45;
  color: rgb(var(--c-gray-500));
}

.chat-pop-enter-active {
  transition:
    opacity 0.18s var(--ease-out),
    transform 0.36s var(--ease-spring-soft);
}

.chat-pop-leave-active {
  transition:
    opacity 0.12s ease-in,
    transform 0.12s ease-in;
}

.chat-pop-enter-from,
.chat-pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}

/* ---------------- setup ---------------- */
.chat-setup {
  display: grid;
  align-content: start;
  gap: 1.1rem;
  min-height: 0;
  overflow-y: auto;
  padding: 1.6rem max(1.5rem, 6%);
}

.chat-steps {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-400));
}

.chat-steps li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.chat-steps i {
  display: grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
}

.chat-steps .is-now {
  font-weight: 600;
  color: rgb(var(--c-gray-950));
}

.dark .chat-steps .is-now {
  color: #fff;
}

.chat-steps .is-now i {
  color: rgb(var(--c-primary-500));
  box-shadow: inset 0 0 0 1.5px rgb(var(--c-primary-500));
}

.dark .chat-steps .is-now i {
  color: rgb(var(--signal-a));
  box-shadow: inset 0 0 0 1.5px rgb(var(--signal-a));
}

.chat-steps .is-done {
  color: rgb(var(--c-gray-600));
}

.dark .chat-steps .is-done {
  color: rgb(var(--c-dark-300));
}

.chat-steps .is-done i {
  color: rgb(28 18 6);
  background: rgb(var(--signal-a));
  box-shadow: none;
}

.chat-steps-bar {
  flex: 0 0 2.6rem;
  height: 1px;
  background: var(--hairline-strong);
}

.chat-h2 {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: rgb(var(--c-gray-950));
}

.dark .chat-h2 {
  color: #fff;
}

.chat-lead {
  margin-top: -0.6rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: rgb(var(--c-gray-500));
}

.dark .chat-lead {
  color: rgb(var(--c-dark-400));
}

.chat-link {
  color: rgb(var(--c-primary-500));
  font-weight: 600;
}

.chat-knote {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.72rem;
  line-height: 1.35;
  color: rgb(180 83 9);
}

.dark .chat-knote {
  color: rgb(252 211 77);
}

.chat-notice {
  padding: 0.6rem 0.8rem;
  border-radius: 0.7rem;
  font-size: 0.8rem;
  color: rgb(180 83 9);
  background: rgb(245 158 11 / 0.1);
  box-shadow: inset 0 0 0 1px rgb(245 158 11 / 0.25);
}

.dark .chat-notice {
  color: rgb(252 211 77);
}

.chat-keys {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13.5rem, 1fr));
  gap: 0.625rem;
}

.chat-kcard {
  position: relative;
  display: grid;
  gap: 0.45rem;
  padding: 0.8rem 0.9rem;
  border-radius: 0.9rem;
  text-align: left;
  border: 1px solid var(--hairline);
  background: rgb(var(--c-gray-50) / 0.7);
  transition:
    border-color 0.25s var(--ease-out),
    box-shadow 0.3s var(--ease-out),
    transform 0.45s var(--ease-spring);
}

.dark .chat-kcard {
  background: rgb(255 255 255 / 0.02);
}

.chat-kcard:hover {
  transform: translateY(-1px);
  border-color: var(--hairline-strong);
}

.chat-kcard:active {
  transform: scale(0.985);
}

.chat-kcard.is-on {
  border-color: rgb(var(--signal-a) / 0.65);
  box-shadow:
    0 0 0 3px rgb(var(--signal-a) / 0.12),
    0 16px 30px -18px rgb(var(--signal-a) / 0.45);
}

.chat-kcard b {
  padding-right: 1.5rem;
  overflow: hidden;
  font-size: 0.875rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(var(--c-gray-950));
}

.dark .chat-kcard b {
  color: #fff;
}

.chat-kcard code {
  font-family: theme('fontFamily.mono');
  font-size: 0.75rem;
  color: rgb(var(--c-gray-500));
}

.chat-kgroup {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  overflow: hidden;
  font-size: 0.75rem;
  white-space: nowrap;
  color: rgb(var(--c-gray-700));
}

.dark .chat-kgroup {
  color: rgb(var(--c-dark-200));
}

.chat-kgroup em {
  font-style: normal;
  color: rgb(var(--c-gray-400));
}

.chat-tick {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: grid;
  place-items: center;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 9999px;
  color: rgb(28 18 6);
  background: rgb(var(--signal-a));
  animation: chat-tick-in 0.4s var(--ease-spring) backwards;
}

.chat-tick svg {
  width: 0.7rem;
  height: 0.7rem;
}

@keyframes chat-tick-in {
  from {
    transform: scale(0.2);
    opacity: 0;
  }
}

.chat-mhead {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.chat-msearch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  height: 2.2rem;
  width: min(16rem, 100%);
  padding: 0 0.75rem;
  border-radius: 0.65rem;
  color: rgb(var(--c-gray-400));
  background: rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px var(--hairline);
}

.dark .chat-msearch {
  background: rgb(255 255 255 / 0.035);
}

.chat-msearch svg {
  width: 0.9rem;
  height: 0.9rem;
  flex-shrink: 0;
}

.chat-msearch input {
  flex: 1 1 auto;
  min-width: 0;
  border: 0;
  outline: 0;
  background: none;
  font-size: 0.8rem;
  color: rgb(var(--c-gray-900));
}

.dark .chat-msearch input {
  color: #fff;
}

.chat-mgrid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chat-mchip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.25rem;
  padding: 0 0.8rem;
  border-radius: 0.65rem;
  font-family: theme('fontFamily.mono');
  font-size: 0.8125rem;
  color: rgb(var(--c-gray-700));
  background: rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px var(--hairline);
  transition:
    box-shadow 0.2s,
    color 0.2s,
    transform 0.4s var(--ease-spring);
}

.dark .chat-mchip {
  color: rgb(var(--c-dark-200));
  background: rgb(255 255 255 / 0.03);
}

.chat-mchip:hover {
  transform: translateY(-1px);
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
}

.chat-mchip.is-on {
  color: rgb(var(--c-gray-950));
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.7);
}

.dark .chat-mchip.is-on {
  color: #fff;
  background: rgb(255 255 255 / 0.06);
}

.chat-mchip small {
  font-family: theme('fontFamily.sans');
  font-size: 0.68rem;
  color: rgb(var(--c-gray-400));
}

.chat-start {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.6rem;
  padding: 0 1.2rem;
  border-radius: 0.75rem;
  font-weight: 650;
  color: rgb(var(--c-gray-950));
  background: linear-gradient(180deg, rgb(var(--c-gray-100)), rgb(var(--c-gray-50)));
  box-shadow:
    inset 0 0 0 1px rgb(var(--signal-a) / 0.55),
    0 10px 26px -14px rgb(var(--signal-a) / 0.45);
  transition:
    transform 0.45s var(--ease-spring),
    box-shadow 0.25s,
    opacity 0.2s;
}

.dark .chat-start {
  color: #fff;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.03));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.16),
    inset 0 0 0 1px rgb(var(--signal-a) / 0.5),
    0 10px 26px -14px rgb(var(--signal-a) / 0.45);
}

.chat-start:hover:not(:disabled) {
  transform: translateY(-1px);
}

.chat-start:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.chat-start svg {
  width: 1rem;
  height: 1rem;
  color: rgb(var(--signal-a));
}

/* ---------------- messages ---------------- */
.chat-msgs {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  min-height: 0;
  overflow-y: auto;
  padding: 1.4rem max(1.25rem, 6%);
}

.chat-ready {
  display: grid;
  justify-items: center;
  gap: 0.9rem;
  margin: auto;
  max-width: 34rem;
  text-align: center;
}

.chat-ready .chat-lead {
  margin-top: -0.4rem;
}

.chat-suggest {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  width: 100%;
}

.chat-suggest-item {
  padding: 0.7rem 0.8rem;
  border-radius: 0.8rem;
  text-align: left;
  font-size: 0.8rem;
  line-height: 1.45;
  color: rgb(var(--c-gray-700));
  background: rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px var(--hairline);
  transition:
    transform 0.4s var(--ease-spring),
    box-shadow 0.2s;
}

.dark .chat-suggest-item {
  color: rgb(var(--c-dark-200));
  background: rgb(255 255 255 / 0.03);
}

.chat-suggest-item:hover {
  transform: translateY(-1px);
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.45);
}

.chat-m {
  display: grid;
  grid-template-columns: 1.9rem minmax(0, 1fr);
  gap: 0.75rem;
  width: 100%;
  max-width: 52rem;
  animation: chat-m-in 0.35s var(--ease-out) backwards;
}

.chat-m.is-user {
  grid-template-columns: minmax(0, 1fr);
  margin-left: auto;
  justify-items: end;
}

@keyframes chat-m-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

.chat-avatar {
  width: 1.9rem;
  height: 1.9rem;
}

.chat-m-body {
  min-width: 0;
}

.chat-bubble {
  max-width: 100%;
  padding: 0.65rem 0.95rem;
  border-radius: 1rem 1rem 0.3rem 1rem;
  font-size: 0.875rem;
  line-height: 1.7;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  color: rgb(var(--c-gray-950));
  background: rgb(var(--c-gray-100));
  box-shadow: inset 0 0 0 1px var(--hairline);
}

.dark .chat-bubble {
  color: #fff;
  background: linear-gradient(160deg, rgb(255 255 255 / 0.09), rgb(255 255 255 / 0.04));
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 0.09),
    inset 0 1px 0 rgb(255 255 255 / 0.08);
}

.chat-think {
  margin-bottom: 0.6rem;
  border-radius: 0.7rem;
  font-size: 0.78rem;
  color: rgb(var(--c-gray-500));
  background: rgb(var(--c-gray-50));
  box-shadow: inset 0 0 0 1px var(--hairline);
}

.dark .chat-think {
  color: rgb(var(--c-dark-400));
  background: rgb(255 255 255 / 0.025);
}

.chat-think summary {
  cursor: pointer;
  padding: 0.45rem 0.7rem;
  font-weight: 600;
}

.chat-think-body {
  max-height: 14rem;
  overflow-y: auto;
  padding: 0 0.7rem 0.6rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.chat-md {
  font-size: 0.875rem;
  line-height: 1.75;
  overflow-wrap: anywhere;
  color: rgb(var(--c-gray-800));
}

.dark .chat-md {
  color: rgb(var(--c-dark-100));
}

.chat-md :deep(p) {
  margin: 0 0 0.65rem;
}

.chat-md > :deep(:last-child) {
  margin-bottom: 0;
}

.chat-md :deep(ul),
.chat-md :deep(ol) {
  margin: 0 0 0.65rem;
  padding-left: 1.3rem;
}

.chat-md :deep(ul) {
  list-style: disc;
}

.chat-md :deep(ol) {
  list-style: decimal;
}

.chat-md :deep(h1),
.chat-md :deep(h2),
.chat-md :deep(h3) {
  margin: 0.9rem 0 0.45rem;
  font-size: 1rem;
  font-weight: 700;
  color: rgb(var(--c-gray-950));
}

.dark .chat-md :deep(h1),
.dark .chat-md :deep(h2),
.dark .chat-md :deep(h3) {
  color: #fff;
}

.chat-md :deep(a) {
  color: rgb(var(--c-primary-500));
  text-decoration: underline;
  text-underline-offset: 3px;
}

.chat-md :deep(blockquote) {
  margin: 0 0 0.65rem;
  padding-left: 0.8rem;
  border-left: 2px solid rgb(var(--signal-a) / 0.6);
  color: rgb(var(--c-gray-500));
}

.chat-md :deep(table) {
  display: block;
  margin: 0 0 0.65rem;
  overflow-x: auto;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.chat-md :deep(th),
.chat-md :deep(td) {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--hairline-strong);
}

.chat-md :deep(:not(pre) > code) {
  padding: 0.1rem 0.35rem;
  border-radius: 0.35rem;
  font-family: theme('fontFamily.mono');
  font-size: 0.8em;
  color: rgb(var(--c-primary-600));
  background: rgb(var(--c-gray-100));
}

.dark .chat-md :deep(:not(pre) > code) {
  color: rgb(var(--c-primary-300));
  background: rgb(255 255 255 / 0.06);
}

.chat-md :deep(.chat-code) {
  margin: 0.3rem 0 0.75rem;
  overflow: hidden;
  border-radius: 0.75rem;
  background: rgb(var(--c-ink));
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.06);
}

.dark .chat-md :deep(.chat-code) {
  background: rgb(0 0 0 / 0.35);
}

.chat-md :deep(.chat-code-head) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.75rem;
  font-size: 0.7rem;
  color: rgb(255 255 255 / 0.5);
  border-bottom: 1px solid rgb(255 255 255 / 0.07);
}

.chat-md :deep(.chat-code-head button) {
  padding: 0.1rem 0.45rem;
  border-radius: 0.4rem;
  color: rgb(255 255 255 / 0.6);
}

.chat-md :deep(.chat-code-head button:hover) {
  color: #fff;
  background: rgb(255 255 255 / 0.08);
}

.chat-md :deep(pre) {
  margin: 0;
  padding: 0.75rem 0.9rem;
  overflow-x: auto;
  font-family: theme('fontFamily.mono');
  font-size: 0.78rem;
  line-height: 1.65;
  color: #ece6de;
}

.chat-caret,
.chat-md :deep(.chat-caret) {
  display: inline-block;
  width: 0.45rem;
  height: 1rem;
  margin-left: 2px;
  vertical-align: -3px;
  border-radius: 2px;
  background: rgb(var(--signal-a));
  box-shadow: 0 0 10px rgb(var(--signal-a) / 0.8);
  animation: chat-blink 1s steps(2) infinite;
}

@keyframes chat-blink {
  50% {
    opacity: 0;
  }
}

.chat-error {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.4rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.65rem;
  font-size: 0.8rem;
  color: rgb(185 28 28);
  background: rgb(239 68 68 / 0.08);
  box-shadow: inset 0 0 0 1px rgb(239 68 68 / 0.22);
}

.dark .chat-error {
  color: rgb(252 165 165);
}

.chat-error button {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.chat-m-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.2rem;
  font-size: 0.72rem;
  color: rgb(var(--c-gray-400));
  font-variant-numeric: tabular-nums;
}

.dark .chat-m-foot {
  color: rgb(var(--c-dark-500));
}

.chat-m-foot button {
  display: grid;
  place-items: center;
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 0.5rem;
  color: rgb(var(--c-gray-500));
  transition:
    background-color 0.15s,
    color 0.15s;
}

.chat-m-foot button:hover {
  color: rgb(var(--c-gray-950));
  background: rgb(var(--c-gray-100));
}

.dark .chat-m-foot button:hover {
  color: #fff;
  background: rgb(255 255 255 / 0.06);
}

.chat-m-foot svg {
  width: 0.9rem;
  height: 0.9rem;
}

.chat-m-foot span {
  margin-left: 0.25rem;
}

/* ---------------- composer ---------------- */
.chat-composer {
  padding: 0.75rem max(1.25rem, 6%) 1rem;
}

.chat-cbox {
  max-width: 52rem;
  margin: 0 auto;
  padding: 0.75rem 0.75rem 0.6rem 1rem;
  border-radius: 1.1rem;
  background: rgb(var(--c-gray-50));
  box-shadow:
    inset 0 0 0 1px var(--hairline-strong),
    0 20px 40px -28px rgb(var(--c-ink) / 0.4);
  transition: box-shadow 0.25s var(--ease-out);
}

.dark .chat-cbox {
  background: linear-gradient(160deg, rgb(255 255 255 / 0.07), rgb(255 255 255 / 0.025));
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 0.1),
    inset 0 1px 0 rgb(255 255 255 / 0.08),
    0 20px 40px -24px rgb(0 0 0 / 0.9);
}

.chat-cbox.is-focus {
  box-shadow:
    inset 0 0 0 1px rgb(var(--signal-a) / 0.55),
    0 0 0 4px rgb(var(--signal-a) / 0.1),
    0 20px 40px -24px rgb(0 0 0 / 0.6);
}

.chat-cbox textarea {
  display: block;
  width: 100%;
  min-height: 2.8rem;
  max-height: 13.75rem;
  resize: none;
  border: 0;
  outline: 0;
  background: none;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgb(var(--c-gray-950));
}

.dark .chat-cbox textarea {
  color: #fff;
}

.chat-cbox textarea:focus-visible {
  box-shadow: none;
}

.chat-cbox textarea::placeholder {
  color: rgb(var(--c-gray-400));
}

.dark .chat-cbox textarea::placeholder {
  color: rgb(var(--c-dark-500));
}

.chat-c-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chat-c-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  height: 1.75rem;
  padding: 0 0.65rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: rgb(var(--c-gray-500));
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
  transition: color 0.2s;
}

.chat-c-chip:hover {
  color: rgb(var(--c-gray-950));
}

.dark .chat-c-chip:hover {
  color: #fff;
}

.chat-c-chip svg {
  width: 0.8rem;
  height: 0.8rem;
}

.chat-c-on {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: rgb(var(--signal-a));
}

.chat-c-hint {
  margin-left: auto;
  font-size: 0.7rem;
  color: rgb(var(--c-gray-400));
}

.dark .chat-c-hint {
  color: rgb(var(--c-dark-500));
}

/* the send button is the one solid gold control on the page */
.chat-send {
  display: grid;
  place-items: center;
  width: 2.35rem;
  height: 2.35rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  color: rgb(28 18 6);
  background:
    linear-gradient(180deg, rgb(255 255 255 / 0.25), rgb(255 255 255 / 0) 60%),
    rgb(var(--signal-a));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.5),
    0 8px 22px -10px rgb(var(--signal-a) / 0.8);
  transition:
    transform 0.45s var(--ease-spring),
    opacity 0.2s;
}

.chat-send:hover:not(:disabled) {
  transform: translateY(-1px) scale(1.04);
}

.chat-send:active:not(:disabled) {
  transform: scale(0.94);
}

.chat-send:disabled {
  cursor: not-allowed;
  opacity: 0.35;
  box-shadow: none;
}

.chat-send.is-stop {
  color: rgb(var(--c-gray-900));
  background: rgb(var(--c-gray-100));
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
}

.dark .chat-send.is-stop {
  color: #fff;
  background: rgb(255 255 255 / 0.1);
}

.chat-send svg {
  width: 1.05rem;
  height: 1.05rem;
}

/* the drawer toggle and its scrim only exist on small screens */
.chat-sessions-toggle,
.chat-sessions-scrim {
  display: none;
}

.chat-scrim-enter-active,
.chat-scrim-leave-active {
  transition: opacity 0.25s var(--ease-out);
}

.chat-scrim-enter-from,
.chat-scrim-leave-to {
  opacity: 0;
}

/* ---------------- small screens ---------------- */
@media (max-width: 900px) {
  /*
   * One screen, no page scroll: the header (12px + 58px), the main padding and this pane add
   * up to the visible viewport. dvh follows the mobile browser bars; vh is the fallback.
   */
  .chat {
    grid-template-columns: minmax(0, 1fr);
    height: calc(100vh - 8rem);
    height: calc(100dvh - 8rem);
    min-height: 26rem;
  }

  /* the conversation list becomes a drawer instead of eating the top of the screen */
  .chat-sessions {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 60;
    width: min(19rem, 86vw);
    padding-top: calc(0.75rem + env(safe-area-inset-top, 0px));
    padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
    border-radius: 0 1.1rem 1.1rem 0;
    transform: translateX(-105%);
    visibility: hidden;
    transition:
      transform 0.32s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1)),
      visibility 0s linear 0.32s;
  }

  .chat-sessions.is-open {
    transform: none;
    visibility: visible;
    transition: transform 0.32s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
  }

  .chat-sessions-scrim {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 55;
    background: rgb(0 0 0 / 0.45);
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }

  .chat-sessions-toggle {
    display: grid;
    flex: none;
  }

  /* bigger touch targets in the list */
  .chat-s-item {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
  }

  .chat-s-del {
    opacity: 0.7;
  }

  .chat-conv {
    min-height: 0;
  }

  /* header: [list] [key] [model] [settings] in one row; popovers span the pane */
  .chat-hud {
    position: relative;
    gap: 0.35rem;
    padding: 0.5rem;
  }

  .chat-hud .chat-pop-anchor {
    position: static;
  }

  .chat-hud > .chat-pop-anchor {
    flex: 1 1 0;
    min-width: 0;
  }

  .chat-hud > .chat-pop-anchor > .chat-picker {
    width: 100%;
  }

  .chat-picker-text {
    min-width: 0;
    flex: 1 1 auto;
    text-align: left;
  }

  .chat-sep,
  .chat-picker-sub {
    display: none;
  }

  .chat-meta {
    gap: 0.25rem;
    margin-left: 0;
  }

  .chat-meta > span {
    display: none;
  }

  .chat-pop,
  .chat-pop-right,
  .chat-settings {
    left: 0.5rem;
    right: 0.5rem;
    width: auto;
    max-height: min(24rem, 60dvh);
  }

  .chat-pop-models {
    max-height: min(26rem, 65dvh);
  }

  /* 16px keeps iOS Safari from zooming the page when a field gets focus */
  .chat-cbox textarea,
  .chat-pop-search,
  .chat-msearch input,
  .chat-settings textarea,
  .chat-settings input,
  .chat-settings select {
    font-size: 16px;
  }

  .chat-setup {
    padding: 1.1rem 1rem 1.5rem;
  }

  .chat-steps {
    gap: 0.4rem;
    font-size: 0.75rem;
  }

  .chat-steps-bar {
    flex-basis: 0.9rem;
  }

  .chat-msearch {
    width: 100%;
    margin-left: 0;
  }

  .chat-keys {
    grid-template-columns: minmax(0, 1fr);
  }

  /* messages use the full width: no avatar column, tighter padding */
  .chat-msgs {
    gap: 1.1rem;
    padding: 1rem 0.875rem;
  }

  .chat-m {
    grid-template-columns: minmax(0, 1fr);
  }

  .chat-avatar {
    display: none;
  }

  .chat-m.is-user .chat-bubble {
    max-width: 88%;
    margin-left: auto;
  }

  .chat-m-foot button {
    width: 2rem;
    height: 2rem;
  }

  .chat-suggest {
    grid-template-columns: minmax(0, 1fr);
  }

  .chat-composer {
    padding: 0.5rem 0.625rem calc(0.625rem + env(safe-area-inset-bottom, 0px));
  }

  .chat-cbox {
    padding: 0.6rem 0.6rem 0.5rem 0.8rem;
  }

  .chat-cbox textarea {
    max-height: 9rem;
  }

  .chat-c-hint {
    display: none;
  }

  .chat-c-row {
    justify-content: space-between;
  }
}
</style>
