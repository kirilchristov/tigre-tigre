import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  createDataLayerGtag,
  googleConsentUpdate,
  type GtagFunction,
} from '@/lib/analytics'
import { env } from '@/lib/env'
import { useConsent } from '@/context/ConsentContext'

const GOOGLE_TAG_SCRIPT_ID = 'google-tag-script'
const GOOGLE_TAG_SCRIPT_SRC = 'https://www.googletagmanager.com/gtag/js'
const GOOGLE_LINKER_DOMAINS = ['tigre-tigre.com', 'shop.tigre-tigre.com'] as const

let initializedMeasurementId: string | null = null
let lastTrackedPath: string | null = null

function getOrCreateGtag(): GtagFunction {
  if (window.gtag) {
    return window.gtag
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = createDataLayerGtag(window.dataLayer)

  return window.gtag
}

function ensureGoogleAnalyticsLoaded(measurementId: string) {
  const gtag = getOrCreateGtag()

  if (!document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = GOOGLE_TAG_SCRIPT_ID
    script.async = true
    script.src = `${GOOGLE_TAG_SCRIPT_SRC}?id=${encodeURIComponent(measurementId)}`
    document.head.appendChild(script)
  }

  if (initializedMeasurementId !== measurementId) {
    gtag('js', new Date())
    gtag('set', 'linker', { domains: [...GOOGLE_LINKER_DOMAINS] })
    gtag('config', measurementId, { send_page_view: false })
    initializedMeasurementId = measurementId
  }

  return gtag
}

/** Test-only helper: reset module-level dedupe state between tests. */
export function __resetGoogleAnalyticsTrackerForTests(): void {
  initializedMeasurementId = null
  lastTrackedPath = null
}

export function GoogleAnalyticsTracker() {
  const location = useLocation()
  const measurementId = env.analytics.gaId?.trim()
  const { choice } = useConsent()
  const analyticsAllowed = choice.analytics === true
  const marketingAllowed = choice.marketing === true

  useEffect(() => {
    if (!measurementId) {
      return
    }

    // Always push the Consent Mode update (denied included) so a revoked
    // category stops storage even after gtag.js has loaded.
    const gtag = getOrCreateGtag()
    googleConsentUpdate(analyticsAllowed, marketingAllowed)

    if (!analyticsAllowed) {
      return
    }

    ensureGoogleAnalyticsLoaded(measurementId)

    const currentPath = `${location.pathname}${location.search}${location.hash}`

    // Consent toggles alone never re-send a PageView for the same path.
    if (currentPath === lastTrackedPath) {
      return
    }

    gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: currentPath,
      page_title: document.title,
    })
    lastTrackedPath = currentPath
  }, [
    location.hash,
    location.pathname,
    location.search,
    measurementId,
    analyticsAllowed,
    marketingAllowed,
  ])

  return null
}
