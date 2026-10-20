<template>
  <!-- A logo the admin uploaded wins; otherwise the theme-coloured JLAi mark -->
  <img v-if="customSrc" :src="customSrc" :alt="alt" class="object-contain" />
  <BrandMark v-else :decorative="!alt" :label="alt || 'JLAi'" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BrandMark from './BrandMark.vue'
import { sanitizeUrl } from '@/utils/url'

const props = withDefaults(defineProps<{ src?: string; alt?: string }>(), { src: '', alt: '' })

// the old bundled /logo.svg counts as "no custom logo", so the live mark is used instead
const customSrc = computed(() => {
  const raw = (props.src || '').trim()
  if (!raw || raw === '/logo.svg') return ''
  return sanitizeUrl(raw, { allowRelative: true, allowDataUrl: true })
})
</script>
