import { beforeEach, describe, expect, it } from 'vitest'
import {
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  CONSENT_TTL_MS,
  clearConsentRecord,
  consentAllows,
  cookieDomainCandidates,
  createConsentRecord,
  purgeOptionalCookies,
  readConsentRecord,
  writeConsentRecord,
} from '@/lib/consent'

const NOW = 1_760_000_000_000

beforeEach(() => {
  window.localStorage.clear()
  clearConsentRecord()
  // Clear any cookies left by another test.
  for (const part of document.cookie.split(';')) {
    const name = part.trim().split('=')[0]
    if (name) document.cookie = `${name}=; Path=/; Max-Age=0`
  }
})

describe('readConsentRecord', () => {
  it('returns null when the visitor has made no choice', () => {
    expect(readConsentRecord(NOW)).toBeNull()
  })

  it('returns a valid accepted record', () => {
    writeConsentRecord(createConsentRecord({ analytics: true, marketing: true }, NOW))
    expect(readConsentRecord(NOW + 1000)).toMatchObject({
      choice: { analytics: true, marketing: true },
      timestamp: NOW,
      policyVersion: CONSENT_POLICY_VERSION,
      expiresAt: NOW + CONSENT_TTL_MS,
    })
  })

  it('keeps partial states', () => {
    writeConsentRecord(createConsentRecord({ analytics: true, marketing: false }, NOW))
    const record = readConsentRecord(NOW)
    expect(consentAllows(record, 'analytics')).toBe(true)
    expect(consentAllows(record, 'marketing')).toBe(false)
  })

  it('expires the record after the TTL', () => {
    writeConsentRecord(createConsentRecord({ analytics: true, marketing: true }, NOW))
    expect(readConsentRecord(NOW + CONSENT_TTL_MS + 1)).toBeNull()
  })

  it('re-prompts after a policy version bump', () => {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        choice: { analytics: true, marketing: true },
        timestamp: NOW,
        policyVersion: CONSENT_POLICY_VERSION + 1,
        expiresAt: NOW + CONSENT_TTL_MS,
      })
    )
    expect(readConsentRecord(NOW)).toBeNull()
  })

  it('rejects malformed or non-boolean choices', () => {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        choice: { analytics: 'yes', marketing: false },
        timestamp: NOW,
        policyVersion: CONSENT_POLICY_VERSION,
        expiresAt: NOW + CONSENT_TTL_MS,
      })
    )
    expect(readConsentRecord(NOW)).toBeNull()
  })

  it('treats a record without a decision as no consent', () => {
    expect(consentAllows(null, 'analytics')).toBe(false)
    expect(consentAllows(null, 'marketing')).toBe(false)
  })
})

describe('cookieDomainCandidates', () => {
  it('tries the host and parent domains without a public suffix', () => {
    expect(cookieDomainCandidates('www.tigre-tigre.com')).toEqual([
      'www.tigre-tigre.com',
      'tigre-tigre.com',
    ])
    expect(cookieDomainCandidates('tigre-tigre.com')).toEqual(['tigre-tigre.com'])
    expect(cookieDomainCandidates('localhost')).toEqual(['localhost'])
  })
})

describe('purgeOptionalCookies', () => {
  it('expires analytics and marketing cookies visible to the document', () => {
    document.cookie = '_ga=GA1.1.123'
    document.cookie = '_gid=GA1.1.456'
    document.cookie = '_fbp=fb.1.789'
    document.cookie = 'cart_currency=EUR'

    const result = purgeOptionalCookies('www.tigre-tigre.com')

    expect(result.matched.sort()).toEqual(['_fbp', '_ga', '_gid'])
    expect(document.cookie).not.toContain('_ga=')
    expect(document.cookie).not.toContain('_gid=')
    expect(document.cookie).not.toContain('_fbp=')
    expect(document.cookie).toContain('cart_currency=EUR')
  })

  it('keeps granted analytics cookies when only marketing is denied', () => {
    document.cookie = '_ga=GA1.1.123'
    document.cookie = '_fbp=fb.1.789'

    const result = purgeOptionalCookies('www.tigre-tigre.com', ['marketing'])

    expect(result.matched).toEqual(['_fbp'])
    expect(document.cookie).toContain('_ga=')
    expect(document.cookie).not.toContain('_fbp=')
  })

  it('keeps marketing cookies when analytics is denied but marketing is granted', () => {
    document.cookie = '_ga=GA1.1.123'
    document.cookie = '_fbp=fb.1.789'

    const result = purgeOptionalCookies('www.tigre-tigre.com', ['analytics'])

    expect(result.matched).toEqual(['_ga'])
    expect(document.cookie).toContain('_fbp=')
    expect(document.cookie).not.toContain('_ga=')
  })
})
