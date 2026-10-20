import { sanitizeUrl } from '@/utils/url'

export function updateFavicon(logoUrl: string): void {
  const sanitizedLogoUrl = sanitizeUrl(logoUrl, {
    allowRelative: true,
    allowDataUrl: true,
  })
  if (!sanitizedLogoUrl) {
    return
  }

  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }

  link.type = sanitizedLogoUrl.endsWith('.svg') ? 'image/svg+xml' : 'image/x-icon'
  link.href = sanitizedLogoUrl
}

/**
 * The JLAi mark as a standalone SVG in a given palette's colours — used for the favicon
 * (a favicon cannot read the page's CSS variables) and as the default /logo.svg.
 * Details too fine for 16 px (most particles, the back orbit) are left out.
 */
export function brandMarkSvg(colors: { dark: string; signal: readonly [string, string, string] | readonly string[] }): string {
  const [a, b, c] = colors.signal
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="o" x1="7" y1="0" x2="57" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient><radialGradient id="n" cx="18" cy="58" r="40" gradientUnits="userSpaceOnUse"><stop stop-color="${b}" stop-opacity=".45"/><stop offset="1" stop-color="${b}" stop-opacity="0"/></radialGradient><radialGradient id="m" cx="50" cy="10" r="30" gradientUnits="userSpaceOnUse"><stop stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><rect x="2" y="2" width="60" height="60" rx="15" fill="${colors.dark}"/><rect x="2" y="2" width="60" height="60" rx="15" fill="url(#n)"/><rect x="2" y="2" width="60" height="60" rx="15" fill="url(#m)"/><rect x="2.5" y="2.5" width="59" height="59" rx="14.5" fill="none" stroke="#fff" stroke-opacity=".12"/><g transform="rotate(-24 32 34)"><path d="M7 34 A25 9 0 0 1 57 34" fill="none" stroke="${b}" stroke-opacity=".35" stroke-width="1.8"/></g><path d="M27.5 15 H40.5 M37.5 15 V35.5 A9.5 9.5 0 0 1 21 42" fill="none" stroke="#fff" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round"/><g transform="rotate(-24 32 34)"><path d="M57 34 A25 9 0 0 1 7 34" fill="none" stroke="url(#o)" stroke-width="2.4"/></g><circle cx="47.7" cy="20.9" r="6.5" fill="${a}" fill-opacity=".3"/><circle cx="47.7" cy="20.9" r="3.3" fill="#fff"/></svg>`
}

/** Point the favicon at the JLAi mark drawn in the given palette colours. */
export function updateBrandFavicon(colors: { dark: string; signal: readonly string[] }): void {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = 'image/svg+xml'
  link.href = `data:image/svg+xml,${encodeURIComponent(brandMarkSvg(colors))}`
}
