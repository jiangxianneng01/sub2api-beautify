import { afterEach, describe, expect, it, vi } from 'vitest'

import { dataUrlToBlob, toOpenableUrl } from '../objectUrl'

// 1×1 transparent PNG
const PNG_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

describe('dataUrlToBlob', () => {
  it('decodes a base64 image data URL with its MIME type', () => {
    const blob = dataUrlToBlob(`data:image/png;base64,${PNG_B64}`)
    expect(blob).not.toBeNull()
    expect(blob!.type).toBe('image/png')
    expect(blob!.size).toBe(atob(PNG_B64).length)
  })

  it('decodes a percent-encoded data URL', async () => {
    const blob = dataUrlToBlob('data:image/svg+xml,%3Csvg%2F%3E')
    expect(blob!.type).toBe('image/svg+xml')
    expect(await blob!.text()).toBe('<svg/>')
  })

  it('rejects strings that are not data URLs or are malformed', () => {
    expect(dataUrlToBlob('https://example.com/a.png')).toBeNull()
    expect(dataUrlToBlob('data:image/png;base64')).toBeNull()
    expect(dataUrlToBlob('data:image/png;base64,@@not-base64@@')).toBeNull()
  })
})

describe('toOpenableUrl', () => {
  const originalCreate = URL.createObjectURL

  afterEach(() => {
    URL.createObjectURL = originalCreate
  })

  it('turns a data URL into an owned blob URL', () => {
    const createObjectURL = vi.fn(() => 'blob:http://localhost/abc')
    URL.createObjectURL = createObjectURL
    expect(toOpenableUrl(`data:image/png;base64,${PNG_B64}`)).toEqual({ url: 'blob:http://localhost/abc', owned: true })
    expect(createObjectURL).toHaveBeenCalledTimes(1)
  })

  it('leaves remote and blob URLs alone', () => {
    expect(toOpenableUrl('https://cdn.example.com/a.png')).toEqual({ url: 'https://cdn.example.com/a.png', owned: false })
    expect(toOpenableUrl('blob:http://localhost/xyz')).toEqual({ url: 'blob:http://localhost/xyz', owned: false })
  })
})
