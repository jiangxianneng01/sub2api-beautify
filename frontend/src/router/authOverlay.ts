/**
 * Sign-in page vs sign-in popup.
 *
 * Every way into /login, /register and their siblings — a "登录" link on any page,
 * or the auth guard bouncing a visitor off a protected page — now opens the
 * full-screen sign-in page (the quantum one, night sky without WebGL 2). The ×
 * and Esc on that page go back to the public page the visitor came from, or to
 * the landing page.
 *
 * The popup mode (the auth route drawn as a dialog over the page it was opened
 * from, which stays rendered underneath) is kept behind AUTH_POPUP_ENABLED; set
 * it to true to bring it back.
 */
import { computed, inject, shallowRef } from 'vue'
import {
  routerViewLocationKey,
  useRoute,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  type Router
} from 'vue-router'

/** false: sign-in always navigates to the full sign-in page instead of popping up over the current page */
const AUTH_POPUP_ENABLED = false

/** Routes that render as the auth dialog */
const AUTH_DIALOG_PATHS = new Set([
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/email-verify'
])

export function isAuthDialogPath(path: string): boolean {
  return AUTH_DIALOG_PATHS.has(path)
}

/**
 * Public, ordinary pages: the ones a visitor can be sent back to from sign-in
 * (and, in popup mode, the ones that can sit under the dialog). Protected pages
 * are excluded (after logout their data is gone), as are setup and OAuth
 * callbacks, which are one-shot flows rather than pages.
 */
function isPlainPublicPage(route: Pick<RouteLocationNormalized, 'matched' | 'meta' | 'path'>): boolean {
  if (!route.matched.length) return false
  if (route.meta.requiresAuth !== false) return false
  if (isAuthDialogPath(route.path)) return false
  if (route.path === '/setup' || route.path.startsWith('/auth/')) return false
  return true
}

function canUnderlay(route: RouteLocationNormalized): boolean {
  return AUTH_POPUP_ENABLED && isPlainPublicPage(route)
}

/** The page currently rendered underneath the auth dialog, if any */
export const authBackdrop = shallowRef<RouteLocationNormalizedLoaded | null>(null)

/** Whether the auth routes are being shown as a popup over another page */
export const isAuthOverlay = computed(() => authBackdrop.value !== null)

let lastBackdropPath: string | null = null

export function installAuthOverlay(router: Router) {
  router.afterEach((to, from, failure) => {
    if (failure) return
    if (!isAuthDialogPath(to.path)) {
      authBackdrop.value = null
      return
    }
    // Moving between login ⇄ register ⇄ forgot password keeps the same page underneath
    if (authBackdrop.value) return
    if (canUnderlay(from)) {
      authBackdrop.value = from as RouteLocationNormalizedLoaded
      lastBackdropPath = from.fullPath
    }
  })
}

/**
 * Scroll handling for the popup: opening it, switching between auth dialogs and
 * closing it back to the same page must not move the page underneath.
 * Returns `undefined` when the popup is not involved, so the caller decides.
 */
export function authOverlayScroll(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
): false | undefined {
  const toDialog = isAuthDialogPath(to.path)
  const fromDialog = isAuthDialogPath(from.path)
  if (toDialog && (canUnderlay(from) || (fromDialog && authBackdrop.value))) return false
  if (fromDialog && !toDialog && lastBackdropPath && to.fullPath === lastBackdropPath) return false
  return undefined
}

/** Leave the popup and return to the page underneath */
export function closeAuthOverlay(router: Router) {
  const target = authBackdrop.value?.fullPath ?? lastBackdropPath ?? '/home'
  return router.push(target)
}

/**
 * Leave the full-screen sign-in page: step back to the public page it was opened
 * from (keeping that page's scroll position), otherwise go to the landing page.
 * A fresh load or a bookmark has no in-app page behind it.
 */
export function leaveAuthPage(router: Router): Promise<unknown> {
  const back = router.options.history.state.back
  if (typeof back === 'string' && back) {
    try {
      if (isPlainPublicPage(router.resolve(back))) {
        router.back()
        return Promise.resolve()
      }
    } catch {
      // an entry this app can no longer resolve: fall through to the landing page
    }
  }
  return router.push('/home')
}

/**
 * The route a component is actually displaying. Inside the page kept under the
 * auth popup this is that page's route, while `useRoute()` already points at
 * /login. Use it in public pages that read params or query.
 */
export function useDisplayedRoute() {
  const viewRoute = inject(routerViewLocationKey, null)
  const currentRoute = useRoute()
  return computed<RouteLocationNormalizedLoaded>(() => viewRoute?.value ?? currentRoute)
}
