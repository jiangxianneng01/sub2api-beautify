<template>
  <div class="hs">
    <article v-for="card in cards" :key="card.id" class="hs-card reveal" :style="{ '--d': card.delay }">
      <!-- the workspace itself, as it looks after a run -->
      <div class="hs-window">
        <div class="hs-window-bar" aria-hidden="true">
          <span class="hs-window-dots"><i></i><i></i><i></i></span>
          <span class="hs-window-path">{{ card.path }}</span>
        </div>
        <div class="hs-window-body">
          <img
            :src="card.src"
            :alt="card.alt"
            width="1600"
            height="1268"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <footer class="hs-foot">
        <div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.desc }}</p>
        </div>
        <router-link :to="card.to" class="hs-link">
          {{ card.cta }}
          <Icon name="arrowRight" size="sm" :stroke-width="2" />
        </router-link>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'

/**
 * Screenshots of the two workspaces live in public/showcase/, one per language:
 * image-studio.{en,zh}.jpg and video-studio.{en,zh}.jpg (1600 × 1268). Replace
 * the files to refresh the pictures; the names are fixed.
 */
const { t, locale } = useI18n()
const lang = computed(() => (locale.value.toLowerCase().startsWith('zh') ? 'zh' : 'en'))

const cards = computed(() => [
  {
    id: 'image',
    path: '/studio/image',
    src: `/showcase/image-studio.${lang.value}.jpg`,
    alt: t('home.studios.imageAlt'),
    title: t('home.studios.imageTitle'),
    desc: t('home.studios.imageDesc'),
    cta: t('home.studios.openImage'),
    to: '/studio/image',
    delay: '0s'
  },
  {
    id: 'video',
    path: '/studio/video',
    src: `/showcase/video-studio.${lang.value}.jpg`,
    alt: t('home.studios.videoAlt'),
    title: t('home.studios.videoTitle'),
    desc: t('home.studios.videoDesc'),
    cta: t('home.studios.openVideo'),
    to: '/studio/video',
    delay: '0.12s'
  }
])
</script>

<style scoped>
.hs {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 1024px) {
  .hs {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

.hs-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hs-window {
  overflow: hidden;
  border-radius: 1rem;
  background: #0d0a08;
  box-shadow:
    inset 0 0 0 1px rgb(240 210 185 / 0.12),
    0 50px 100px -40px rgb(0 0 0 / 0.95);
  transition:
    transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1),
    box-shadow 0.4s;
}

.hs-card:hover .hs-window {
  transform: translateY(-3px);
  box-shadow:
    inset 0 0 0 1px rgb(240 210 185 / 0.2),
    0 60px 110px -40px rgb(var(--signal-b) / 0.35);
}

.hs-window-bar {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.9rem;
  background: rgb(255 240 225 / 0.04);
  box-shadow: inset 0 -1px 0 rgb(240 210 185 / 0.08);
}

.hs-window-dots {
  display: inline-flex;
  gap: 0.3rem;
}

.hs-window-dots i {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 9999px;
  background: rgb(255 244 236 / 0.18);
}

.hs-window-path {
  font-family: theme('fontFamily.mono');
  font-size: 0.7rem;
  color: rgb(255 244 236 / 0.45);
}

.hs-window-body {
  aspect-ratio: 1600 / 1268;
  background: #090705;
}

.hs-window-body img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hs-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding: 0 0.25rem;
}

.hs-foot h3 {
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: -0.015em;
  font-stretch: 108%;
  color: #fff4ec;
}

.hs-foot p {
  margin-top: 0.3rem;
  max-width: 46ch;
  font-size: 0.86rem;
  line-height: 1.5;
  color: rgb(255 244 236 / 0.58);
}

.hs-link {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.95rem;
  border-radius: 9999px;
  background: rgb(255 240 225 / 0.08);
  box-shadow: inset 0 0 0 1px rgb(255 240 225 / 0.14);
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff4ec;
  transition:
    background-color 0.2s,
    transform 0.2s;
}

.hs-link:hover {
  background: rgb(255 240 225 / 0.16);
  transform: translateY(-1px);
}

html[data-motion='reduced'] .hs-window,
html[data-motion='reduced'] .hs-card:hover .hs-window,
html[data-motion='reduced'] .hs-link:hover {
    transform: none;
    transition: none;
  }

</style>
