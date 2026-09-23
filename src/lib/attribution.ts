/**
 * First-touch attribution capture for marketing params.
 *
 * Visitors land on www pages with params like ?utm_source=meta&utm_campaign=...
 * (Google Ads gclid, Meta fbclid, TikTok ttclid, Microsoft msclkid). The www
 * site is a Vite SPA and the buy CTAs jump to the Shopify storefront via cart
 * permalinks — without persistence those params never reach Shopify, so orders
 * land as "direct" and ad platforms lose the order signal.
 *
 * Strategy: on app boot, capture attribution params from the query string into
 * sessionStorage (per-tab, survives internal navigation), then re-attach them
 * to cart permalink URLs at click time (see src/lib/shopify.ts).
 */

const STORAGE_KEY = 'tt-attribution-params'

/** Attribution window: 24h from first-touch capture. */
const TTL_MS = 24 * 60 * 60 * 1000

const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'ttclid',
  'msclkid',
] as const

export type AttributionParams = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'
}

/** Pick attribution params out of a query string (leading '?' optional). */
export function captureAttributionParams(search: string): AttributionParams {
  const searchParams = new URLSearchParams(search)
  const captured: AttributionParams = {}
  for (const key of ATTRIBUTION_KEYS) {
    const value = searchParams.get(key)
    if (value) captured[key] = value
  }
  return captured
}

/** Persist a non-empty attribution record. Empty captures never overwrite existing state. */
export function storeAttributionParams(params: AttributionParams): void {
  if (!isBrowser() || Object.keys(params).length === 0) return
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ params, capturedAt: Date.now() })
    )
  } catch {
    // Storage unavailable (quota/privacy mode): attribution is best-effort.
  }
}

/** Capture from the current location's query string and store when non-empty. */
export function captureAndStoreAttribution(search: string): void {
  storeAttributionParams(captureAttributionParams(search))
}

/** Read stored attribution params; returns {} when absent or expired. */
export function getAttributionParams(): AttributionParams {
  if (!isBrowser()) return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as { params?: AttributionParams; capturedAt?: number }
    if (!parsed || typeof parsed.capturedAt !== 'number' || !parsed.params) return {}
    if (Date.now() - parsed.capturedAt > TTL_MS) return {}
    return parsed.params
  } catch {
    return {}
  }
}