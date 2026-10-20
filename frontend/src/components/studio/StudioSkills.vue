<template>
  <div class="sk" role="dialog" :aria-label="t('studio.skills.title')">
    <header class="sk-head">
      <div class="sk-tabs" role="tablist">
        <button
          v-for="c in categories"
          :key="c.id"
          type="button"
          role="tab"
          class="sk-tab"
          :class="{ 'is-active': category === c.id }"
          :aria-selected="category === c.id"
          @click="category = c.id"
        >
          {{ c.label }}
        </button>
      </div>
      <button type="button" class="sk-close" :aria-label="t('studio.skills.close')" @click="$emit('close')">
        <Icon name="x" size="sm" :stroke-width="2" />
      </button>
    </header>

    <p class="sk-hint">{{ t('studio.skills.hint') }}</p>

    <div class="sk-grid">
      <article v-for="s in visibleSkills" :key="s.id" class="sk-card">
        <span class="sk-swatch" :style="{ '--a': s.tone[0], '--b': s.tone[1] }" aria-hidden="true"></span>
        <div class="sk-body">
          <h4>{{ l(s.name) }}</h4>
          <p>{{ l(s.desc) }}</p>
        </div>
        <div class="sk-actions">
          <button type="button" class="sk-use" @click="useTemplate(s)">{{ t('studio.skills.use') }}</button>
          <button type="button" class="sk-layer" :title="l(s.style)" @click="$emit('append', l(s.style))">
            {{ t('studio.skills.layer') }}
          </button>
        </div>
      </article>
    </div>

    <div class="sk-mods">
      <div v-for="g in modifiers" :key="g.id" class="sk-mod-group">
        <span class="sk-mod-label">{{ l(g.label) }}</span>
        <div class="sk-mod-chips">
          <button
            v-for="m in g.items"
            :key="m.id"
            type="button"
            class="sk-chip"
            :class="{ 'is-on': prompt.includes(l(m.text)) }"
            :aria-pressed="prompt.includes(l(m.text))"
            @click="toggle(l(m.text))"
          >
            {{ l(m.text) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import {
  SKILL_CATEGORIES,
  fillTemplate,
  modifiersFor,
  pickL10n,
  skillsFor,
  type L10n,
  type StudioSkill
} from '@/data/studioSkills'

const props = defineProps<{
  kind: 'image' | 'video'
  prompt: string
}>()

const emit = defineEmits<{
  use: [text: string, placeholder: string]
  append: [text: string]
  remove: [text: string]
  close: []
}>()

const { t, locale } = useI18n()
const l = (v: L10n) => pickL10n(v, locale.value)

const skills = computed(() => skillsFor(props.kind))
const modifiers = computed(() => modifiersFor(props.kind))
const categories = computed(() => {
  const seen: Array<{ id: StudioSkill['category']; label: string }> = []
  for (const s of skills.value) {
    if (!seen.some((c) => c.id === s.category)) seen.push({ id: s.category, label: l(SKILL_CATEGORIES[s.category]) })
  }
  return seen
})
const category = ref<StudioSkill['category']>(categories.value[0]?.id || 'photo')
const visibleSkills = computed(() => skills.value.filter((s) => s.category === category.value))

function useTemplate(s: StudioSkill) {
  const placeholder = t('studio.skills.subject')
  // a short prompt is treated as the subject; a long one is replaced by the template
  const subject = props.prompt.trim().length <= 80 ? props.prompt : ''
  emit('use', fillTemplate(l(s.template), subject, placeholder), placeholder)
}

function toggle(text: string) {
  if (props.prompt.includes(text)) emit('remove', text)
  else emit('append', text)
}
</script>

<style scoped>
.sk {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-height: 0;
  color: rgb(var(--c-dark-50));
}

.sk-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.sk-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.sk-tab {
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgb(var(--c-dark-50) / 0.6);
  transition:
    background-color 0.15s,
    color 0.15s;
}

.sk-tab:hover {
  color: rgb(var(--c-dark-50));
}

.sk-tab.is-active {
  background: rgb(var(--c-dark-50) / 0.1);
  color: rgb(var(--c-dark-50));
}

.sk-close {
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: rgb(var(--c-dark-50) / 0.6);
}

.sk-close:hover {
  background: rgb(var(--c-dark-50) / 0.1);
  color: rgb(var(--c-dark-50));
}

.sk-hint {
  font-size: 0.78rem;
  color: rgb(var(--c-dark-50) / 0.5);
}

.sk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 0.6rem;
}

.sk-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  gap: 0.2rem 0.7rem;
  padding: 0.7rem;
  border-radius: 0.9rem;
  background: rgb(var(--c-dark-50) / 0.04);
  box-shadow: inset 0 0 0 1px rgb(var(--c-dark-50) / 0.08);
  transition: background-color 0.15s;
}

.sk-card:hover {
  background: rgb(var(--c-dark-50) / 0.07);
}

.sk-swatch {
  grid-row: 1 / 3;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.6rem;
  background:
    radial-gradient(120% 90% at 20% 15%, var(--a), transparent 60%),
    linear-gradient(160deg, var(--a), var(--b));
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.12);
}

.sk-body h4 {
  font-size: 0.86rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.sk-body p {
  margin-top: 0.1rem;
  font-size: 0.72rem;
  line-height: 1.4;
  color: rgb(var(--c-dark-50) / 0.55);
}

.sk-actions {
  display: flex;
  gap: 0.35rem;
  margin-top: 0.3rem;
}

.sk-use,
.sk-layer {
  white-space: nowrap;
  padding: 0.3rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  transition:
    background-color 0.15s,
    color 0.15s;
}

.sk-use {
  background: linear-gradient(135deg, rgb(var(--signal-a)), rgb(var(--signal-b)));
  color: rgb(var(--c-ink));
}

.sk-use:hover {
  filter: brightness(1.08);
}

.sk-layer {
  background: rgb(var(--c-dark-50) / 0.08);
  color: rgb(var(--c-dark-50));
}

.sk-layer:hover {
  background: rgb(var(--c-dark-50) / 0.16);
}

.sk-mods {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding-top: 0.6rem;
  border-top: 1px solid rgb(var(--c-dark-50) / 0.08);
}

.sk-mod-group {
  display: grid;
  grid-template-columns: 4.2rem minmax(0, 1fr);
  align-items: baseline;
  gap: 0.5rem;
}

.sk-mod-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgb(var(--c-dark-50) / 0.5);
}

.sk-mod-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.sk-chip {
  padding: 0.28rem 0.6rem;
  border-radius: 9999px;
  background: rgb(var(--c-dark-50) / 0.05);
  box-shadow: inset 0 0 0 1px rgb(var(--c-dark-50) / 0.08);
  font-size: 0.72rem;
  color: rgb(var(--c-dark-50) / 0.8);
  transition:
    background-color 0.15s,
    box-shadow 0.15s,
    color 0.15s;
}

.sk-chip:hover {
  background: rgb(var(--c-dark-50) / 0.1);
}

.sk-chip.is-on {
  background: rgb(var(--signal-a) / 0.16);
  box-shadow: inset 0 0 0 1px rgb(var(--signal-a) / 0.6);
  color: rgb(var(--c-primary-200));
}

@media (max-width: 639px) {
  .sk-mod-group {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}
</style>
