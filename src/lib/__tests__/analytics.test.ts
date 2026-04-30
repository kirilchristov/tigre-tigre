import { describe, expect, it } from 'vitest'
import { createDataLayerGtag } from '@/lib/analytics'

describe('createDataLayerGtag', () => {
  it('pushes an arguments object to the data layer', () => {
    const dataLayer: unknown[] = []
    const gtag = createDataLayerGtag(dataLayer)

    gtag('event', 'debug_test', { debug_mode: true })

    expect(dataLayer).toHaveLength(1)

    const queuedCommand = dataLayer[0] as IArguments

    expect(Array.isArray(queuedCommand)).toBe(false)
    expect(Array.from(queuedCommand)).toEqual(['event', 'debug_test', { debug_mode: true }])
  })
})
