import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { env } from '@/lib/env'

const META_PIXEL_SCRIPT_ID = 'meta-pixel-script'
const META_PIXEL_SCRIPT_SRC = 'https://connect.facebook.net/en_US/fbevents.js'

const initializedPixelIds = new Set<string>()
let lastTrackedPath: string | null = null

type FbqFunction = ((command: string, ...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue?: unknown[][]
  loaded?: boolean
  version?: string
}

declare global {
  interface Window {
    fbq?: FbqFunction
    _fbq?: FbqFunction
  }
}

function getOrCreateFbq(): FbqFunction {
  if (window.fbq) {
    return window.fbq
  }

  const fbq = ((command: string, ...args: unknown[]) => {
    if (typeof fbq.callMethod === 'function') {
      fbq.callMethod(command, ...args)
      return
    }

    fbq.queue?.push([command, ...args])
  }) as FbqFunction

  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'

  window.fbq = fbq
  window._fbq = fbq

  return fbq
}

function ensureMetaPixelLoaded(pixelId: string) {
  const fbq = getOrCreateFbq()

  if (!document.getElementById(META_PIXEL_SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = META_PIXEL_SCRIPT_ID
    script.async = true
    script.src = META_PIXEL_SCRIPT_SRC
    document.head.appendChild(script)
  }

  if (!initializedPixelIds.has(pixelId)) {
    fbq('init', pixelId)
    initializedPixelIds.add(pixelId)
  }

  return fbq
}

export function MetaPixelTracker() {
  const location = useLocation()
  const pixelId = env.analytics.metaPixelId?.trim()

  useEffect(() => {
    if (!pixelId) {
      return
    }

    const fbq = ensureMetaPixelLoaded(pixelId)
    const currentPath = `${location.pathname}${location.search}${location.hash}`

    if (currentPath === lastTrackedPath) {
      return
    }

    fbq('track', 'PageView')
    lastTrackedPath = currentPath
  }, [location.hash, location.pathname, location.search, pixelId])

  return null
}
