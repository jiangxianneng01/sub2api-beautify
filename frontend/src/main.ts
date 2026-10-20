import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n, { initI18n } from './i18n'
import { useAppStore } from '@/stores/app'
import { updateFavicon } from '@/utils/branding'
import { isIOSDevice } from '@/utils/device'
import { initAppearance } from '@/composables/useAppearance'
import { isChunkLoadError, reloadForStaleChunk } from '@/utils/staleChunk'
import './styles/palettes.css'
import './style.css'

function initIOSViewportZoomFix() {
  // iOS Safari 在输入框字号小于 16px 时聚焦会自动放大页面，且失焦后不会恢复。
  // 限制 maximum-scale 可阻止该行为；iOS 10+ 用户仍可双指手动缩放，不影响可访问性。
  // 仅在 iOS 设备上注入，避免影响 Android Chrome 的手动缩放能力。
  if (!isIOSDevice()) return

  const viewport = document.querySelector('meta[name="viewport"]')
  if (!viewport) return

  const content = viewport.getAttribute('content') || ''
  if (/maximum-scale/i.test(content)) return
  viewport.setAttribute('content', `${content}, maximum-scale=1.0`)
}

// Vite reports a chunk or stylesheet of an old deployment that failed to preload
window.addEventListener('vite:preloadError', (event) => {
  if (reloadForStaleChunk()) event.preventDefault()
})

/** Tell the loading screen in index.html that the app is up */
function markMounted() {
  ;(window as Window & { __APP_MOUNTED__?: boolean }).__APP_MOUNTED__ = true
  document.documentElement.classList.add('app-mounted')
}

async function bootstrap() {
  // Apply dark/light, palette and motion level to <html> before mount so no route flashes.
  initAppearance()
  initIOSViewportZoomFix()

  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)

  // Initialize settings from injected config BEFORE mounting (prevents flash)
  // This must happen after pinia is installed but before router and i18n
  const appStore = useAppStore()
  appStore.initFromInjectedConfig()

  // Set document title immediately after config is loaded
  if (appStore.siteName && appStore.siteName !== 'JLAi') {
    document.title = `${appStore.siteName} - AI API Gateway`
  }
  updateFavicon(appStore.siteLogo)

  await initI18n()

  app.use(router)
  app.use(i18n)

  // 等待路由器完成初始导航后再挂载，避免竞态条件导致的空白渲染
  try {
    await router.isReady()
  } catch (error) {
    // the first route's chunk belongs to an old deployment: reload once instead of hanging
    if (isChunkLoadError(error) && reloadForStaleChunk()) return
    console.error('Initial navigation failed:', error)
  }
  app.mount('#app')
  markMounted()
}

bootstrap().catch((error) => {
  console.error('App failed to start:', error)
  if (isChunkLoadError(error)) reloadForStaleChunk()
})
