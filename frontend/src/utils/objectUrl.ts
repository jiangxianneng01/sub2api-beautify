/**
 * data: URLs → blob: URLs.
 *
 * Browsers refuse to open a data: URL as a page of its own: a link to one with
 * target="_blank" gives a blank tab in Chrome and Edge ("Not allowed to navigate
 * top frame to data URL"), Firefox blocks it too. A blob: URL made by this page is
 * same-origin and opens normally, downloads normally, and is much lighter than a
 * multi-megabyte base64 string kept in the DOM.
 */

/** Decode a data: URL into a Blob; null when the string is not a usable data: URL. */
export function dataUrlToBlob(dataUrl: string): Blob | null {
  if (!dataUrl.startsWith('data:')) return null
  const comma = dataUrl.indexOf(',')
  if (comma < 0) return null
  const meta = dataUrl.slice(5, comma)
  const payload = dataUrl.slice(comma + 1)
  const parts = meta.split(';')
  const base64 = parts.includes('base64')
  const type = parts[0] || 'text/plain'
  try {
    if (!base64) return new Blob([decodeURIComponent(payload)], { type })
    const binary = atob(payload.replace(/\s+/g, ''))
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return new Blob([bytes], { type })
  } catch {
    return null
  }
}

/**
 * A blob: URL for a data: URL, so it can be opened in a new tab. Any other URL
 * (http(s):, blob:) comes back unchanged. `owned` is true when a new object URL
 * was created and the caller must eventually release it with URL.revokeObjectURL.
 */
export function toOpenableUrl(src: string): { url: string; owned: boolean } {
  if (!src.startsWith('data:')) return { url: src, owned: false }
  const blob = dataUrlToBlob(src)
  if (!blob) return { url: src, owned: false }
  return { url: URL.createObjectURL(blob), owned: true }
}
