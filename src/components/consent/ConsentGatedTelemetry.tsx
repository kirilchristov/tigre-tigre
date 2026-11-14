import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useConsent } from '@/context/ConsentContext'

/**
 * Vercel Analytics/Speed Insights are optional analytics. Nothing is injected
 * (and no pageview is queued) until the visitor grants analytics consent.
 */
export function ConsentGatedTelemetry() {
  const { choice } = useConsent()

  if (!choice.analytics) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
