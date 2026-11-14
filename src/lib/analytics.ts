export type GtagCommand = 'js' | 'config' | 'event' | 'set' | 'consent'
export type GtagFunction = (
  command: GtagCommand,
  target: string | Date,
  params?: Record<string, unknown>
) => void

export function createDataLayerGtag(dataLayer: unknown[]): GtagFunction {
  function gtag(
    _command: GtagCommand,
    _target: string | Date,
    _params?: Record<string, unknown>
  ) {
    // gtag.js expects queued commands to be the original arguments object.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments)
  }

  return gtag as GtagFunction
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFunction
  }
}

/**
 * Google Consent Mode v2 defaults. Must run before gtag.js is injected so no
 * storage is used until the visitor grants a category.
 */
export function installGoogleConsentDefault(): void {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag ?? createDataLayerGtag(window.dataLayer)

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  })
}

export function googleConsentUpdate(analytics: boolean, marketing: boolean): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  })
}
