import { afterEach, describe, expect, it } from 'vitest'
import {
  captureAttributionParams,
  captureAndStoreAttribution,
  getAttributionParams,
} from '@/lib/attribution'

describe('captureAttributionParams', () => {
  it('extracts utm and click-id params from a query string', () => {
    expect(
      captureAttributionParams('?utm_source=meta&utm_medium=cpc&utm_campaign=launch&gclid=abc&foo=bar')
    ).toEqual({
      utm_source: 'meta',
      utm_medium: 'cpc',
      utm_campaign: 'launch',
      gclid: 'abc',
    })
  })

  it('handles a query string without a leading question mark', () => {
    expect(captureAttributionParams('utm_source=google&fbclid=xyz')).toEqual({
      utm_source: 'google',
      fbclid: 'xyz',
    })
  })

  it('returns an empty object when nothing matches', () => {
    expect(captureAttributionParams('?foo=1&bar=2')).toEqual({})
  })

  it('keeps empty values out of the capture', () => {
    expect(captureAttributionParams('?utm_source=&utm_medium=cpc')).toEqual({
      utm_medium: 'cpc',
    })
  })
})

describe('session storage round-trip', () => {
  afterEach(() => {
    window.sessionStorage.clear()
  })

  it('stores and returns attribution params', () => {
    captureAndStoreAttribution('?utm_source=meta&utm_campaign=bg_launch&gclid=C1')
    expect(getAttributionParams()).toEqual({
      utm_source: 'meta',
      utm_campaign: 'bg_launch',
      gclid: 'C1',
    })
  })

  it('does not overwrite existing attribution with an empty capture', () => {
    captureAndStoreAttribution('?utm_source=meta')
    captureAndStoreAttribution('?foo=bar')
    expect(getAttributionParams()).toEqual({ utm_source: 'meta' })
  })

  it('returns {} when nothing was stored', () => {
    expect(getAttributionParams()).toEqual({})
  })

  it('expires entries older than the attribution window', () => {
    captureAndStoreAttribution('?utm_source=meta')
    const raw = window.sessionStorage.getItem('tt-attribution-params')!
    const parsed = JSON.parse(raw) as { capturedAt: number }
    parsed.capturedAt = Date.now() - 25 * 60 * 60 * 1000
    window.sessionStorage.setItem('tt-attribution-params', JSON.stringify(parsed))
    expect(getAttributionParams()).toEqual({})
  })

  it('ignores corrupted storage payloads', () => {
    window.sessionStorage.setItem('tt-attribution-params', '{not json')
    expect(getAttributionParams()).toEqual({})
  })
})