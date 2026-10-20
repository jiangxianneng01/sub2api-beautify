<template>
  <!--
    JLAi mark — 星轨 (galaxy orbit).
    The white J is the single gateway; two tilted orbits are the model providers it connects;
    the particles on them are requests in flight, and the brightest one doubles as the dot of the i.
    The tile is a small nebula. Every colour reads the palette variables, so the mark follows the theme.
  -->
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :role="decorative ? undefined : 'img'"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="decorative ? undefined : label"
    style="flex-shrink: 0; overflow: visible"
  >
    <defs>
      <linearGradient :id="`${uid}-hl`" x1="0" y1="2" x2="0" y2="34" gradientUnits="userSpaceOnUse">
        <stop stop-color="#fff" stop-opacity=".12" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
      <linearGradient :id="`${uid}-orbit`" x1="7" y1="0" x2="57" y2="0" gradientUnits="userSpaceOnUse">
        <stop style="stop-color: rgb(var(--signal-a))" />
        <stop offset=".5" style="stop-color: rgb(var(--signal-b))" />
        <stop offset="1" style="stop-color: rgb(var(--signal-c))" />
      </linearGradient>
      <filter :id="`${uid}-blur`" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
      <filter :id="`${uid}-soft`" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="2.2" />
      </filter>
      <clipPath :id="`${uid}-clip`">
        <rect x="2" y="2" width="60" height="60" rx="15" />
      </clipPath>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="15" style="fill: rgb(var(--c-dark-950))"/>
    <g :clip-path="`url(#${uid}-clip)`">
    <circle cx="50" cy="12" r="20" style="fill: rgb(var(--signal-c)); fill-opacity: .28" :filter="`url(#${uid}-blur)`"/>
    <circle cx="18" cy="58" r="22" style="fill: rgb(var(--signal-b)); fill-opacity: .3" :filter="`url(#${uid}-blur)`"/>
    <circle cx="32" cy="34" r="13" style="fill: rgb(var(--signal-a)); fill-opacity: .16" :filter="`url(#${uid}-blur)`"/>
    <g fill="#fff"><circle cx="12" cy="13" r=".6" fill-opacity=".7"/><circle cx="20" cy="8" r=".4" fill-opacity=".5"/><circle cx="55" cy="44" r=".5" fill-opacity=".6"/><circle cx="9" cy="40" r=".45" fill-opacity=".45"/><circle cx="47" cy="56" r=".5" fill-opacity=".5"/><circle cx="57" cy="27" r=".35" fill-opacity=".5"/><circle cx="25" cy="54" r=".35" fill-opacity=".4"/></g>
    <rect x="2" y="2" width="60" height="32" :fill="`url(#${uid}-hl)`"/>
    </g>
    <rect x="2.5" y="2.5" width="59" height="59" rx="14.5" fill="none" stroke="#fff" stroke-opacity=".11"/>
    <g transform="rotate(38 32 34)"><path d="M12 34 A20 6 0 0 1 52 34" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="1"/></g>
    <g transform="rotate(-24 32 34)"><path d="M7 34 A25 9 0 0 1 57 34" fill="none" style="stroke: rgb(var(--signal-b)); stroke-opacity: .35" stroke-width="1.6"/></g>
    <path d="M27.5 15 H40.5 M37.5 15 V35.5 A9.5 9.5 0 0 1 21 42" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="rotate(38 32 34)"><path d="M52 34 A20 6 0 0 1 12 34" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1"/></g>
    <g transform="rotate(-24 32 34)"><path d="M57 34 A25 9 0 0 1 7 34" fill="none" :stroke="`url(#${uid}-orbit)`" stroke-width="2"/></g>
    <circle cx="9.29" cy="40.74" r="0.9" style="fill: rgb(var(--signal-a)); fill-opacity: 0.7"/><circle cx="14.00" cy="34.69" r="0.7" style="fill: rgb(var(--signal-b)); fill-opacity: 0.55"/><circle cx="22.55" cy="28.69" r="1.0" style="fill: rgb(var(--signal-c)); fill-opacity: 0.6"/><circle cx="40.25" cy="21.80" r="0.8" style="fill: rgb(var(--signal-a)); fill-opacity: 0.8"/><circle cx="54.71" cy="27.26" r="1.2" style="fill: rgb(var(--signal-b)); fill-opacity: 0.9"/><circle cx="46.59" cy="36.04" r="0.9" style="fill: rgb(var(--signal-c)); fill-opacity: 0.85"/><circle cx="29.62" cy="44.57" r="1.1" style="fill: rgb(var(--signal-a)); fill-opacity: 0.8"/><circle cx="16.86" cy="47.07" r="0.8" style="fill: rgb(var(--signal-b)); fill-opacity: 0.7"/><circle cx="10.89" cy="45.95" r="0.6" style="fill: rgb(var(--signal-c)); fill-opacity: 0.6"/><circle cx="43.80" cy="47.03" r="0.8" style="fill: rgb(var(--signal-c)); fill-opacity: 0.7"/><circle cx="20.92" cy="31.94" r="0.7" style="fill: rgb(var(--signal-a)); fill-opacity: 0.6"/><circle cx="20.20" cy="20.97" r="0.6" style="fill: rgb(var(--signal-b)); fill-opacity: 0.45"/><circle cx="40.86" cy="33.77" r="0.9" style="fill: rgb(var(--signal-c)); fill-opacity: 0.55"/>
    <circle cx="47.74" cy="20.93" r="7.5" style="fill: rgb(var(--signal-a)); fill-opacity: .28" :filter="`url(#${uid}-soft)`"/>
    <circle cx="47.74" cy="20.93" r="3.1" fill="#fff"/>
    <circle cx="47.74" cy="20.93" r="3.1" style="fill: rgb(var(--signal-a)); fill-opacity: .45"/>
  </svg>
</template>

<script setup lang="ts">
import { useId } from 'vue'

withDefaults(
  defineProps<{
    /** rendered size in px (square) */
    size?: number | string
    /** accessible name; ignored when decorative */
    label?: string
    /** true when a visible site name sits next to the mark */
    decorative?: boolean
  }>(),
  { size: 32, label: 'JLAi', decorative: false }
)

// gradients, filters and the clip need ids unique to each instance on the page
const uid = `jl${(useId() ?? '').replace(/[^a-zA-Z0-9_-]/g, '')}`
</script>
