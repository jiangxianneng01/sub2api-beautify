/**
 * Sign-in as a real popup.
 *
 * When a visitor on a public page (home, model plaza, a legal page…) is sent to
 * /login, /register or one of their siblings — by clicking a link or by the auth
 * guard bouncing them off a protected page — the page they were on stays rendered
 * underneath and the auth route is drawn on top of it as a dialog. Closing the
 * dialog goes back to that page without reloading it.
 *
 * Opening /login directly (a fresh load, a bookmark, after logging out of the
 * console) has nothing to sit on, so AuthLayout falls back to the full-screen
 * night-sky version.
 */
import { computed, inject, shallowRef } from 'vue'
import {
  routerViewLocationKey,
  useRoute,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  type Router
} from 'vue-router'

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
 * Only public, ordinary pages can sit under the dialog. Protected pages are
 * excluded (after logout their data is gone), as are setup and OAuth callbacks,
 * which are one-shot flows rather than pages.
 */
function canUnderlay(route: RouteLocationNormalized): boolean {
  if (!route.matched.length) return false
  if (route.meta.requiresAuth !== false) return false
  if (isAuthDialogPath(route.path)) return false
  if (route.path === '/setup' || route.path.startsWith('/auth/')) return false
  return true
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
 * The route a component is actually displaying. Inside the page kept under the
 * auth popup this is that page's route, while `useRoute()` already points at
 * /login. Use it in public pages that read params or query.
 */
export function useDisplayedRoute() {
  const viewRoute = inject(routerViewLocationKey, null)
  const currentRoute = useRoute()
  return computed<RouteLocationNormalizedLoaded>(() => viewRoute?.value ?? currentRoute)
}
