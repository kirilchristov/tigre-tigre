import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ConsentProvider } from '@/context/ConsentContext'
import { createConsentRecord, writeConsentRecord } from '@/lib/consent'
import {
  MetaPixelTracker,
  __resetMetaPixelTrackerForTests,
} from '@/components/MetaPixelTracker'
import {
  GoogleAnalyticsTracker,
  __resetGoogleAnalyticsTrackerForTests,
} from '@/components/GoogleAnalyticsTracker'

const { mockEnv } = vi.hoisted(() => ({
  mockEnv: {
    analytics: { gaId: 'G-TEST123', metaPixelId: '1883344772853949' },
    consent: {
      storefrontAccessToken: undefined,
      checkoutRootDomain: undefined,
      storefrontRootDomain: undefined,
      apiScriptUrl: undefined,
      syncTimeoutMs: 1500,
    },
  },
}))

vi.mock('@/lib/env', () => ({ env: mockEnv }))

vi.mock('@/lib/shopify-consent', () => ({
  syncConsentToShopify: vi.fn().mockResolvedValue({ ok: true, at: Date.now() }),
  consentNeedsCheckoutPreflight: () => false,
  isShopifyConsentApiAvailable: () => false,
  ensureShopifyConsentApi: vi.fn().mockResolvedValue(false),
}))

function renderWithConsent(node: React.ReactNode) {
  return render(
    <ConsentProvider>
      <MemoryRouter initialEntries={['/']}>{node}</MemoryRouter>
    </ConsentProvider>
  )
}

function fbqQueue(): unknown[][] {
  return window.fbq?.queue ?? []
}

beforeEach(() => {
  window.localStorage.clear()
  document.head.innerHTML = ''
  delete (window as unknown as { fbq?: unknown }).fbq
  delete (window as unknown as { _fbq?: unknown })._fbq
  delete (window as unknown as { dataLayer?: unknown }).dataLayer
  delete (window as unknown as { gtag?: unknown }).gtag
  __resetMetaPixelTrackerForTests()
  __resetGoogleAnalyticsTrackerForTests()
})

describe('MetaPixelTracker consent gating', () => {
  it('loads nothing before a marketing decision', () => {
    renderWithConsent(<MetaPixelTracker />)

    expect(document.getElementById('meta-pixel-script')).toBeNull()
    expect(window.fbq).toBeUndefined()
  })

  it('does not load for analytics-only consent', () => {
    writeConsentRecord(createConsentRecord({ analytics: true, marketing: false }))
    renderWithConsent(<MetaPixelTracker />)

    expect(document.getElementById('meta-pixel-script')).toBeNull()
  })

  it('initializes and sends exactly one PageView with marketing consent', () => {
    writeConsentRecord(createConsentRecord({ analytics: true, marketing: true }))
    renderWithConsent(<MetaPixelTracker />)

    expect(document.getElementById('meta-pixel-script')).not.toBeNull()
    expect(fbqQueue()).toContainEqual(['init', '1883344772853949'])
    expect(fbqQueue().filter((entry) => entry[0] === 'track')).toHaveLength(1)
  })

  it('does not duplicate PageView when the tracker remounts on the same path', () => {
    writeConsentRecord(createConsentRecord({ analytics: true, marketing: true }))
    const first = renderWithConsent(<MetaPixelTracker />)
    expect(fbqQueue().filter((entry) => entry[0] === 'track')).toHaveLength(1)

    first.unmount()
    renderWithConsent(<MetaPixelTracker />)
    expect(fbqQueue().filter((entry) => entry[0] === 'track')).toHaveLength(1)
  })
})

describe('GoogleAnalyticsTracker consent gating', () => {
  it('pushes denied Consent Mode updates without loading gtag.js', () => {
    renderWithConsent(<GoogleAnalyticsTracker />)

    expect(document.getElementById('google-tag-script')).toBeNull()
    const consentUpdates = (window.dataLayer ?? []).filter(
      (entry) => (entry as unknown[])[0] === 'consent'
    )
    expect(consentUpdates.length).toBeGreaterThan(0)
  })

  it('loads gtag.js and sends one page_view with analytics consent', () => {
    writeConsentRecord(createConsentRecord({ analytics: true, marketing: false }))
    renderWithConsent(<GoogleAnalyticsTracker />)

    expect(document.getElementById('google-tag-script')).not.toBeNull()
    const pageViews = (window.dataLayer ?? []).filter(
      (entry) => (entry as unknown[])[0] === 'event' && (entry as unknown[])[1] === 'page_view'
    )
    expect(pageViews).toHaveLength(1)
  })

  it('does not send page_view without analytics consent', () => {
    writeConsentRecord(createConsentRecord({ analytics: false, marketing: true }))
    renderWithConsent(<GoogleAnalyticsTracker />)

    const pageViews = (window.dataLayer ?? []).filter(
      (entry) => (entry as unknown[])[0] === 'event' && (entry as unknown[])[1] === 'page_view'
    )
    expect(pageViews).toHaveLength(0)
    expect(document.getElementById('google-tag-script')).toBeNull()
  })
})
