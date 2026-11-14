import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import i18n from '@/lib/i18n'
import { ConsentProvider } from '@/context/ConsentContext'
import {
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  CONSENT_TTL_MS,
  readConsentRecord,
  writeConsentRecord,
  createConsentRecord,
} from '@/lib/consent'
import { CookieConsentBanner, CookieSettingsButton } from '../CookieConsentBanner'

const { syncMock } = vi.hoisted(() => ({ syncMock: vi.fn() }))

vi.mock('@/lib/shopify-consent', () => ({
  syncConsentToShopify: syncMock,
  consentNeedsCheckoutPreflight: () => false,
}))

function renderBanner() {
  return render(
    <ConsentProvider>
      <CookieConsentBanner />
      <CookieSettingsButton />
    </ConsentProvider>
  )
}

beforeEach(async () => {
  window.localStorage.clear()
  syncMock.mockReset()
  syncMock.mockResolvedValue({ ok: true, at: Date.now() })
  await i18n.changeLanguage('bg')
})

describe('CookieConsentBanner', () => {
  it('appears with no decision and keeps optional categories off', () => {
    renderBanner()

    expect(screen.getByTestId('cookie-consent-banner')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Ние използваме бисквитки' })).toBeVisible()

    fireEvent.click(screen.getByTestId('consent-customize'))
    expect(screen.getByRole('switch', { name: 'Необходими (винаги активни)' })).toBeChecked()
    expect(screen.getByRole('switch', { name: 'Необходими (винаги активни)' })).toBeDisabled()
    expect(screen.getByRole('switch', { name: 'Аналитични' })).not.toBeChecked()
    expect(screen.getByRole('switch', { name: 'Маркетингови' })).not.toBeChecked()
  })

  it('accept all stores both categories and hides the banner', async () => {
    renderBanner()
    fireEvent.click(screen.getByTestId('consent-accept'))

    await waitFor(() => expect(screen.queryByTestId('cookie-consent-banner')).toBeNull())

    const record = readConsentRecord()
    expect(record?.choice).toEqual({ analytics: true, marketing: true })
    expect(record?.timestamp).toBeTypeOf('number')
    expect(record?.policyVersion).toBe(CONSENT_POLICY_VERSION)
    expect(syncMock).toHaveBeenCalledWith({ analytics: true, marketing: true }, expect.anything())
  })

  it('reject non-essential stores both categories as false', async () => {
    renderBanner()
    fireEvent.click(screen.getByTestId('consent-reject'))

    await waitFor(() => expect(screen.queryByTestId('cookie-consent-banner')).toBeNull())
    expect(readConsentRecord()?.choice).toEqual({ analytics: false, marketing: false })
  })

  it('saves an analytics-only choice', async () => {
    renderBanner()
    fireEvent.click(screen.getByTestId('consent-customize'))
    fireEvent.click(screen.getByRole('switch', { name: 'Аналитични' }))
    fireEvent.click(screen.getByTestId('consent-save'))

    await waitFor(() => expect(screen.queryByTestId('cookie-consent-banner')).toBeNull())
    expect(readConsentRecord()?.choice).toEqual({ analytics: true, marketing: false })
  })

  it('saves a marketing-only choice', async () => {
    renderBanner()
    fireEvent.click(screen.getByTestId('consent-customize'))
    fireEvent.click(screen.getByRole('switch', { name: 'Маркетингови' }))
    fireEvent.click(screen.getByTestId('consent-save'))

    await waitFor(() => expect(screen.queryByTestId('cookie-consent-banner')).toBeNull())
    expect(readConsentRecord()?.choice).toEqual({ analytics: false, marketing: true })
  })

  it('reopens from the persistent footer control and supports withdrawal', async () => {
    renderBanner()
    fireEvent.click(screen.getByTestId('consent-accept'))
    await waitFor(() => expect(screen.queryByTestId('cookie-consent-banner')).toBeNull())

    fireEvent.click(screen.getByTestId('cookie-settings-button'))
    expect(screen.getByTestId('cookie-consent-banner')).toBeVisible()

    fireEvent.click(screen.getByTestId('consent-customize'))
    fireEvent.click(screen.getByRole('switch', { name: 'Маркетингови' }))
    fireEvent.click(screen.getByTestId('consent-save'))

    await waitFor(() => expect(screen.queryByTestId('cookie-consent-banner')).toBeNull())
    expect(readConsentRecord()?.choice.marketing).toBe(false)
  })

  it('re-prompts when the stored policy version is stale', () => {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        choice: { analytics: true, marketing: true },
        timestamp: Date.now(),
        policyVersion: CONSENT_POLICY_VERSION + 1,
        expiresAt: Date.now() + CONSENT_TTL_MS,
      })
    )

    renderBanner()
    expect(screen.getByTestId('cookie-consent-banner')).toBeVisible()
  })

  it('re-prompts when the stored record has expired', () => {
    const stale = createConsentRecord({ analytics: true, marketing: true }, Date.now() - CONSENT_TTL_MS - 10_000)
    writeConsentRecord(stale)

    renderBanner()
    expect(screen.getByTestId('cookie-consent-banner')).toBeVisible()
  })

  it('fails open when the Shopify sync fails: choice is kept, banner closes', async () => {
    syncMock.mockResolvedValue({ ok: false, reason: 'api-unavailable' })

    renderBanner()
    fireEvent.click(screen.getByTestId('consent-accept'))

    await waitFor(() => expect(screen.queryByTestId('cookie-consent-banner')).toBeNull())

    const record = readConsentRecord()
    expect(record?.choice).toEqual({ analytics: true, marketing: true })
    expect(record?.sync).toMatchObject({ ok: false, reason: 'api-unavailable' })
  })
})
