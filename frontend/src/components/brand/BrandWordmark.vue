<template>
  <!-- JLAi wordmark: monoline letters cut from the same round stroke as the mark; the i's dot carries the theme colour -->
  <svg
    viewBox="0 0 98 44"
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="16"
    style="flex-shrink: 0; overflow: visible"
    :role="decorative ? undefined : 'img'"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="decorative ? undefined : 'JLAi'"
  >
    <g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 6 V27.5 A9.5 9.5 0 0 1 4 36.3" />
      <path d="M31 6 V38 H46.5" />
      <path d="M54 38 L65.5 7.5 Q66.5 5 67.5 7.5 L79 38" />
      <path d="M59 27 H74" />
      <path d="M89 19 V38" />
    </g>
    <circle cx="89" cy="7.5" r="3.8" style="fill: rgb(var(--signal-a))" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ decorative?: boolean }>(), { decorative: false })
</script>
