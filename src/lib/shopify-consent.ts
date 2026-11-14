/**
 * Shopify Customer Privacy API bridge.
 *
 * Supported surface (https://shopify.dev/docs/api/customer-privacy):
 *   window.Shopify.customerPrivacy.setTrackingConsent(consent, callback)
 *   consent = { analytics, marketing, preferences?, sale_of_data? }
 *
 * For custom storefronts Shopify additionally documents passing
 * `headlessStorefront`, `checkoutRootDomain`, `storefrontRootDomain` and a
 * public `storefrontAccessToken` in the same consent object.
 *
 * Reality on this site: the React app is served from the Vercel origin
 * (www.tigre-tigre.com), where Shopify's Customer Privacy API is NOT present.
 * A permalink checkout opens shop.tigre-tigre.com, which is a different origin
 * and does not inherit this page's JavaScript context. Therefore:
 *
 * - When the API exists (Shopify-served page / future same-origin surface) we
 *   always call it, including false and partial states.
 * - When it does not exist, or the callback times out, we fail open: the
 *   visitor proceeds to checkout and Shopify's own checkout banner must be
 *   enabled as the enforcement fallback.
 *
 * We never read or write Shopify consent cookies directly.
 */

import { env } from '@/lib/env'
import type { ConsentChoice } from '@/lib/consent'

export type ShopifyConsentSyncReason = 'api-unavailable' | 'timeout' | 'error'

export type ShopifyConsentSyncResult =
  | { ok: true; at: number }
  | { ok: false; reason: ShopifyConsentSyncReason; message?: string }

interface ShopifyCustomerPrivacy {
  setTrackingConsent?: (
    consent: Record<string, unknown>,
    callback?: (error?: unknown, result?: unknown) => void
  ) => unknown
}

interface ShopifyGlobal {
  customerPrivacy?: ShopifyCustomerPrivacy
  trackingConsent?: ShopifyCustomerPrivacy
}

declare global {
  interface Window {
    Shopify?: ShopifyGlobal
  }
}

const CONSENT_API_SCRIPT_ID = 'shopify-consent-tracking-api'
const DEFAULT_CONCERN_TIMEOUT_MS = 1500

let apiLoadPromise: Promise<boolean> | null = null

function getCustomerPrivacy(): ShopifyCustomerPrivacy | undefined {
  if (typeof window === 'undefined') return undefined
  return window.Shopify?.customerPrivacy ?? window.Shopify?.trackingConsent
}

export function isShopifyConsentApiAvailable(): boolean {
  return typeof getCustomerPrivacy()?.setTrackingConsent === 'function'
}

/** Merge consent booleans with the documented headless parameters when configured. */
export function buildShopifyConsentPayload(choice: ConsentChoice): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    analytics: choice.analytics === true,
    marketing: choice.marketing === true,
  }

  const token = env.consent.storefrontAccessToken?.trim()
  if (!token) return payload

  payload.headlessStorefront = true
  payload.storefrontAccessToken = token
  if (env.consent.checkoutRootDomain?.trim()) {
    payload.checkoutRootDomain = env.consent.checkoutRootDomain.trim()
  }
  if (env.consent.storefrontRootDomain?.trim()) {
    payload.storefrontRootDomain = env.consent.storefrontRootDomain.trim()
  }

  return payload
}

/**
 * Optionally load Shopify's published consent bundle. Disabled by default:
 * Shopify documents Hydrogen analytics as the supported custom-storefront
 * installation, so the operator must explicitly opt in with
 * VITE_SHOPIFY_CONSENT_API_URL after validating the origin.
 */
export async function ensureShopifyConsentApi(timeoutMs = DEFAULT_CONCERN_TIMEOUT_MS): Promise<boolean> {
  if (isShopifyConsentApiAvailable()) return true
  if (typeof document === 'undefined') return false

  const scriptUrl = env.consent.apiScriptUrl?.trim()
  if (!scriptUrl) return false
  if (apiLoadPromise) return apiLoadPromise

  apiLoadPromise = new Promise<boolean>((resolve) => {
    const existing = document.getElementById(CONSENT_API_SCRIPT_ID) as HTMLScriptElement | null
    const script = existing ?? document.createElement('script')

    let settled = false
    const finish = (loaded: boolean) => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      resolve(loaded && isShopifyConsentApiAvailable())
    }

    const timer = window.setTimeout(() => finish(false), timeoutMs)

    script.addEventListener('load', () => finish(true), { once: true })
    script.addEventListener('error', () => finish(false), { once: true })

    if (!existing) {
      script.id = CONSENT_API_SCRIPT_ID
      script.async = true
      script.src = scriptUrl
      document.head.appendChild(script)
    }
  })

  return apiLoadPromise
}

function normalizeError(error: unknown): string | undefined {
  if (!error) return undefined
  if (error instanceof Error) return error.message.slice(0, 200)
  if (typeof error === 'string') return error.slice(0, 200)
  return 'consent-callback-error'
}

/**
 * Register a consent decision with Shopify.
 *
 * Resolves — never rejects — within `timeoutMs`. A timeout or missing API is a
 * documented fail-open: the caller must proceed with the purchase and rely on
 * Shopify's checkout banner.
 */
export async function syncConsentToShopify(
  choice: ConsentChoice,
  options: { timeoutMs?: number } = {}
): Promise<ShopifyConsentSyncResult> {
  const api = getCustomerPrivacy()

  const setTrackingConsent = api?.setTrackingConsent
  if (typeof setTrackingConsent !== 'function') {
    return { ok: false, reason: 'api-unavailable' }
  }

  const timeoutMs =
    Number.isFinite(options.timeoutMs) && (options.timeoutMs ?? 0) > 0
      ? (options.timeoutMs as number)
      : env.consent.syncTimeoutMs

  const payload = buildShopifyConsentPayload(choice)

  return new Promise<ShopifyConsentSyncResult>((resolve) => {
    let settled = false

    const finish = (result: ShopifyConsentSyncResult) => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      resolve(result)
    }

    const timer = window.setTimeout(
      () => finish({ ok: false, reason: 'timeout' }),
      timeoutMs
    )

    const callback = (error?: unknown) => {
      if (error) {
        finish({ ok: false, reason: 'error', message: normalizeError(error) })
        return
      }
      finish({ ok: true, at: Date.now() })
    }

    try {
      const returned = setTrackingConsent.call(api, payload, callback)
      // Some builds return a promise instead of invoking the callback.
      if (returned && typeof (returned as Promise<unknown>).then === 'function') {
        ;(returned as Promise<unknown>).then(
          () => callback(),
          (error) => callback(error ?? new Error('consent-sync-rejected'))
        )
      }
    } catch (error) {
      finish({ ok: false, reason: 'error', message: normalizeError(error) })
    }
  })
}

/** True when a stored decision was never successfully registered with Shopify. */
export function consentNeedsCheckoutPreflight(
  record: { sync?: { ok: boolean } } | null
): boolean {
  return Boolean(record) && record?.sync?.ok !== true
}
