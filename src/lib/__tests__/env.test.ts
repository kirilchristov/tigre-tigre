import { describe, it, expect } from 'vitest'
import { env } from '@/lib/env'

describe('env', () => {
  it('has the expected shape', () => {
    expect(env).toHaveProperty('analytics')
  })

  it('exposes google analytics id as optional string', () => {
    expect(env.analytics.gaId === undefined || typeof env.analytics.gaId === 'string').toBe(true)
  })

  it('exposes the production meta pixel id by default', () => {
    expect(env.analytics.metaPixelId).toBe('2187360742019843')
  })
})

