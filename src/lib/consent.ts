/**
 * Cookie consent state for the React marketing site.
 *
 * The banner collects an explicit choice and persists it locally. Shopify is
 * the system of record for checkout consent; see src/lib/shopify-consent.ts for
 * the supported Customer Privacy API handoff.
 *
 * Design rules:
 * - Necessary storage is always on (theme, language, cart attribution).
 * - Optional categories (analytics, marketing) default to false and are never
 *   preselected.
 * - A stored record expires and is invalidated when the policy version changes,
 *   which re-prompts the visitor.
 */

export type ConsentCategory = 'analytics' | 'marketing'

export interface ConsentChoice {
  analytics: boolean
  marketing: boolean
}

export interface ShopifySyncStatus {
  ok: boolean
  at: number
  reason?: string
}

export interface ConsentRecord {
  choice: ConsentChoice
  /** Epoch ms when the visitor made this choice. */
  timestamp: number
  policyVersion: number
  /** Epoch ms after which the record is stale and the banner is shown again. */
  expiresAt: number
  /** Result of the last attempted Shopify consent sync. */
  sync?: ShopifySyncStatus
}

export const CONSENT_STORAGE_KEY = 'tt-consent-v1'
export const CONSENT_CHANGE_EVENT = 'tt-consent-changed'

/** Bump when the categories or the policy text change materially. */
export const CONSENT_POLICY_VERSION = 1

/** 180 days, the common EU re-consent interval. */
export const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000

export const DENIED_CHOICE: ConsentChoice = Object.freeze({
  analytics: false,
  marketing: false,
})

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function isChoice(value: unknown): value is ConsentChoice {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return typeof candidate.analytics === 'boolean' && typeof candidate.marketing === 'boolean'
}

/** Read a still-valid consent record, or null when absent/stale/malformed. */
export function readConsentRecord(now: number = Date.now()): ConsentRecord | null {
  if (!isBrowser()) return null

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<ConsentRecord> | null
    if (!parsed || typeof parsed !== 'object') return null
    if (!isChoice(parsed.choice)) return null
    if (typeof parsed.timestamp !== 'number' || !Number.isFinite(parsed.timestamp)) return null
    if (typeof parsed.expiresAt !== 'number' || !Number.isFinite(parsed.expiresAt)) return null
    if (parsed.policyVersion !== CONSENT_POLICY_VERSION) return null
    if (parsed.expiresAt <= now) return null

    const record: ConsentRecord = {
      choice: { analytics: parsed.choice.analytics, marketing: parsed.choice.marketing },
      timestamp: parsed.timestamp,
      policyVersion: CONSENT_POLICY_VERSION,
      expiresAt: parsed.expiresAt,
    }

    if (parsed.sync && typeof parsed.sync.ok === 'boolean' && typeof parsed.sync.at === 'number') {
      record.sync = {
        ok: parsed.sync.ok,
        at: parsed.sync.at,
        ...(typeof parsed.sync.reason === 'string' ? { reason: parsed.sync.reason } : {}),
      }
    }

    return record
  } catch {
    return null
  }
}

export function createConsentRecord(
  choice: ConsentChoice,
  now: number = Date.now()
): ConsentRecord {
  return {
    choice: { analytics: choice.analytics === true, marketing: choice.marketing === true },
    timestamp: now,
    policyVersion: CONSENT_POLICY_VERSION,
    expiresAt: now + CONSENT_TTL_MS,
  }
}

export function writeConsentRecord(record: ConsentRecord): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Storage unavailable (quota/private mode): consent is re-asked next visit.
  }
}

export function clearConsentRecord(): void {
  if (!isBrowser()) return
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    // Ignore: nothing to clear.
  }
}

export function consentAllows(record: ConsentRecord | null, category: ConsentCategory): boolean {
  return record?.choice[category] === true
}

export function isAnalyticsConsentGranted(): boolean {
  return consentAllows(readConsentRecord(), 'analytics')
}

export function isMarketingConsentGranted(): boolean {
  return consentAllows(readConsentRecord(), 'marketing')
}

/** Notify same-page listeners (trackers, attribution) about a consent change. */
export function emitConsentChange(record: ConsentRecord | null): void {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { record } }))
  } catch {
    // CustomEvent unavailable: listeners fall back to context state.
  }
}

/**
 * Cookies that optional vendors may have written before consent was captured.
 * Only non-HttpOnly cookies can be expired from JavaScript; anything HttpOnly
 * must be documented as not removable client-side.
 */
const OPTIONAL_COOKIE_PATTERNS: Record<ConsentCategory, RegExp[]> = {
  analytics: [/^_ga$/, /^_ga_/, /^_gid$/, /^_gat/],
  marketing: [/^_gcl_(au|aw|dc)$/, /^_fbp$/, /^_fbc$/, /^_uetsid$/, /^_uetvid$/],
}

/** Domain scopes to try: exact host plus parent domains with at least two labels. */
export function cookieDomainCandidates(hostname: string): string[] {
  const host = hostname.trim().toLowerCase()
  if (!host) return []

  const labels = host.split('.').filter(Boolean)
  const candidates: string[] = []

  if (labels.length < 2) {
    return [host]
  }

  for (let start = 0; start <= labels.length - 2; start += 1) {
    candidates.push(labels.slice(start).join('.'))
  }

  return candidates
}

function readCookieNames(): string[] {
  if (typeof document === 'undefined' || typeof document.cookie !== 'string') return []

  return document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => name.length > 0)
}

function expireCookie(name: string, domain?: string): void {
  if (typeof document === 'undefined') return

  const parts = [
    `${name}=`,
    'Path=/',
    'Max-Age=0',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'SameSite=Lax',
  ]
  if (domain) parts.push(`Domain=${domain}`)

  try {
    document.cookie = parts.join('; ')
  } catch {
    // Some environments reject cookie writes; keep going.
  }
}

export interface CookiePurgeResult {
  /** Cookie names that matched an optional vendor and were expired. */
  matched: string[]
  /** Domain scopes that were attempted. */
  domains: string[]
}

/**
 * Expire optional cookies for the denied categories only, so an analytics-only
 * grant does not delete analytics cookies.
 * HttpOnly cookies (e.g. Shopify's `_shopify_essential`) cannot be removed here.
 */
export function purgeOptionalCookies(
  hostname?: string,
  categories: ConsentCategory[] = ['analytics', 'marketing']
): CookiePurgeResult {
  const patterns = categories.flatMap((category) => OPTIONAL_COOKIE_PATTERNS[category])
  const names = readCookieNames().filter((name) =>
    patterns.some((pattern) => pattern.test(name))
  )

  const host =
    hostname ??
    (typeof window !== 'undefined' && window.location ? window.location.hostname : '')
  const domains = cookieDomainCandidates(host)

  for (const name of names) {
    // Host-only cookie (no Domain attribute).
    expireCookie(name)
    for (const domain of domains) {
      expireCookie(name, domain)
    }
  }

  return { matched: names, domains }
}

/** Apply the side effects of a denied category: stop delivery and clear cookies. */
export function applyConsentSideEffects(record: ConsentRecord | null): CookiePurgeResult | null {
  if (!record) return null

  const denied: ConsentCategory[] = []
  if (!record.choice.analytics) denied.push('analytics')
  if (!record.choice.marketing) denied.push('marketing')

  return denied.length > 0 ? purgeOptionalCookies(undefined, denied) : null
}
