import { useCallback } from 'react'
import type { MouseEvent } from 'react'
import { useConsent } from '@/context/ConsentContext'
import { consentNeedsCheckoutPreflight, syncConsentToShopify } from '@/lib/shopify-consent'
import { env } from '@/lib/env'

/**
 * Cart permalinks open in a new tab. When a stored decision has never been
 * registered with Shopify, we pre-open the tab synchronously (avoids popup
 * blockers), await a bounded consent sync, then navigate the waiting tab.
 *
 * No stored decision means the visitor clicked buy before answering: we never
 * assume consent and never block the purchase. The checkout falls back to
 * Shopify's own banner.
 */
export function useConsentCheckout() {
  const { record } = useConsent()

  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>, url: string) => {
      if (url === '#' || typeof window === 'undefined') return
      if (!consentNeedsCheckoutPreflight(record) || !record) return

      event.preventDefault()

      const preopened = window.open('', '_blank')
      const navigate = () => {
        if (preopened) {
          preopened.opener = null
          preopened.location.href = url
        } else {
          window.location.assign(url)
        }
      }

      void syncConsentToShopify(record.choice, { timeoutMs: env.consent.syncTimeoutMs }).then(
        navigate,
        navigate
      )
    },
    [record]
  )
}
