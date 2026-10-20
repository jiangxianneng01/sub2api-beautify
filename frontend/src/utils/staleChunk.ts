/**
 * After a new deployment, a tab (or a browser holding an old copy of the page) still asks for the
 * previous build's chunk files, which no longer exist: the route never loads and the page looks
 * stuck. Recognise that failure and reload once to pick up the current build.
 */
const RELOAD_KEY = 'chunk_reload_attempted'

export function isChunkLoadError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const { message, name } = error as { message?: string; name?: string }
  const text = message || ''
  return (
    name === 'ChunkLoadError' ||
    text.includes('Failed to fetch dynamically imported module') || // Chrome, Edge
    text.includes('error loading dynamically imported module') || // Firefox
    text.includes('Importing a module script failed') || // Safari
    text.includes('Unable to preload CSS') || // Vite CSS preload
    text.includes('Loading chunk') ||
    text.includes('Loading CSS chunk')
  )
}

// a reload this page view has already started (the router and the startup code can both report the
// same failed first route; the second report must not mount the app while the page is going away)
let reloading = false

/** Reload (to `target` when given) unless that was already tried in the last 10 seconds */
export function reloadForStaleChunk(target?: string): boolean {
  if (reloading) return true
  let last = 0
  try {
    last = Number(sessionStorage.getItem(RELOAD_KEY) || 0)
  } catch {
    // no session storage: still reload once per page view
  }
  const now = Date.now()
  if (last && now - last < 10000) {
    console.error('Chunk load error persists after reload. Please clear the browser cache.')
    return false
  }
  try {
    sessionStorage.setItem(RELOAD_KEY, String(now))
  } catch {
    // ignore
  }
  console.warn('Chunk load error detected, reloading to fetch the latest version...')
  reloading = true
  if (target && target !== window.location.pathname + window.location.search + window.location.hash) {
    window.location.assign(target)
  } else {
    window.location.reload()
  }
  return true
}
