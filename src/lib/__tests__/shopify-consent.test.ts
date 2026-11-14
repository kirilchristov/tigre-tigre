import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  buildShopifyConsentPayload,
  consentNeedsCheckoutPreflight,
  isShopifyConsentApiAvailable,
  syncConsentToShopify,
} from '@/lib/shopify-consent'

const { mockEnv } = vi.hoisted(() => ({
  mockEnv: {
    analytics: { gaId: undefined, metaPixelId: '1883344772853949' },
    consent: {
      storefrontAccessToken: undefined as string | undefined,
      checkoutRootDomain: undefined as string | undefined,
      storefrontRootDomain: undefined as string | undefined,
      apiScriptUrl: undefined as string | undefined,
      syncTimeoutMs: 1500,
    },
  },
}))

vi.mock('@/lib/env', () => ({ env: mockEnv }))

type ConsentApi = {
  setTrackingConsent: (payload: Record<string, unknown>, callback?: (error?: unknown) => void) => unknown
}

function installApi(api: ConsentApi) {
  ;(window as unknown as { Shopify?: { customerPrivacy?: ConsentApi } }).Shopify = {
    customerPrivacy: api,
  }
}

beforeEach(() => {
  mockEnv.consent.storefrontAccessToken = undefined
  mockEnv.consent.checkoutRootDomain = undefined
  mockEnv.consent.storefrontRootDomain = undefined
  delete (window as unknown as { Shopify?: unknown }).Shopify
})

afterEach(() => {
  vi.useRealTimers()
  delete (window as unknown as { Shopify?: unknown }).Shopify
})

describe('buildShopifyConsentPayload', () => {
  it('always sends both booleans, including false', () => {
    expect(buildShopifyConsentPayload({ analytics: false, marketing: false })).toEqual({
      analytics: false,
      marketing: false,
    })
    expect(buildShopifyConsentPayload({ analytics: true, marketing: false })).toEqual({
      analytics: true,
      marketing: false,
    })
  })

  it('adds documented headless parameters only when a public token is configured', () => {
    mockEnv.consent.storefrontAccessToken = 'public-storefront-token'
    mockEnv.consent.checkoutRootDomain = 'tigre-tigre.com'
    mockEnv.consent.storefrontRootDomain = 'www.tigre-tigre.com'

    expect(buildShopifyConsentPayload({ analytics: true, marketing: true })).toEqual({
      analytics: true,
      marketing: true,
      headlessStorefront: true,
      storefrontAccessToken: 'public-storefront-token',
      checkoutRootDomain: 'tigre-tigre.com',
      storefrontRootDomain: 'www.tigre-tigre.com',
    })
  })
})

describe('syncConsentToShopify', () => {
  it('reports api-unavailable outside a Shopify page without throwing', async () => {
    expect(isShopifyConsentApiAvailable()).toBe(false)
    await expect(syncConsentToShopify({ analytics: true, marketing: true })).resolves.toEqual({
      ok: false,
      reason: 'api-unavailable',
    })
  })

  it('passes the real choice to the API and resolves on the callback', async () => {
    const calls: Record<string, unknown>[] = []
    installApi({
      setTrackingConsent: (payload, callback) => {
        calls.push(payload)
        callback?.()
      },
    })

    const result = await syncConsentToShopify({ analytics: true, marketing: false })

    expect(result.ok).toBe(true)
    expect(calls).toEqual([{ analytics: true, marketing: false }])
  })

  it('treats an error-first callback as a failure', async () => {
    installApi({
      setTrackingConsent: (_payload, callback) => {
        callback?.(new Error('consent endpoint rejected'))
      },
    })

    const result = await syncConsentToShopify({ analytics: true, marketing: true })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.reason).toBe('error')
      expect(result.message).toContain('consent endpoint rejected')
    }
  })

  it('times out without blocking the purchase', async () => {
    vi.useFakeTimers()
    installApi({ setTrackingConsent: () => undefined })

    const promise = syncConsentToShopify({ analytics: true, marketing: true }, { timeoutMs: 50 })
    await vi.advanceTimersByTimeAsync(51)

    await expect(promise).resolves.toEqual({ ok: false, reason: 'timeout' })
  })

  it('fails open when the API throws synchronously', async () => {
    installApi({
      setTrackingConsent: () => {
        throw new Error('boom')
      },
    })

    const result = await syncConsentToShopify({ analytics: false, marketing: false })

    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toBe('error')
  })
})

describe('consentNeedsCheckoutPreflight', () => {
  it('requires a preflight only for an unsynced stored decision', () => {
    expect(consentNeedsCheckoutPreflight(null)).toBe(false)
    expect(consentNeedsCheckoutPreflight({})).toBe(true)
    expect(consentNeedsCheckoutPreflight({ sync: { ok: false } })).toBe(true)
    expect(consentNeedsCheckoutPreflight({ sync: { ok: true } })).toBe(false)
  })
})
