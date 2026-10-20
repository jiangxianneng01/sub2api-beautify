/**
 * Every page the sidebar currently offers, flattened for the "跳转到…" (⌘K) palette.
 * The sidebar is the single source of truth — feature flags, simple mode, admin vs user and
 * custom menu items are already applied there — so it publishes its list here.
 */
import { shallowRef } from 'vue'

export interface NavEntry {
  path: string
  label: string
  /** the sidebar section it sits in, shown as a hint */
  group: string
}

export const navIndex = shallowRef<NavEntry[]>([])

export function publishNavIndex(entries: NavEntry[]) {
  const seen = new Set<string>()
  navIndex.value = entries.filter((e) => {
    if (!e.path || seen.has(e.path)) return false
    seen.add(e.path)
    return true
  })
}
