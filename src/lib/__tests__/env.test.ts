import { describe, it, expect } from 'vitest'
import { env, validateEnv } from '@/lib/env'

describe('env', () => {
  it('has the expected shape', () => {
    expect(env).toHaveProperty('analytics')
    expect(env).toHaveProperty('soldOut')
    expect(env).toHaveProperty('isDev')
    expect(env).toHaveProperty('isProd')
    expect(env).toHaveProperty('mode')
  })

  it('exposes sold out mode as a boolean', () => {
    expect(typeof env.soldOut.enabled).toBe('boolean')
  })

  it('exposes google analytics id as optional string', () => {
    expect(env.analytics.gaId === undefined || typeof env.analytics.gaId === 'string').toBe(true)
  })

  it('exposes the production meta pixel id by default', () => {
    expect(env.analytics.metaPixelId).toBe('2187360742019843')
  })
})

describe('validateEnv()', () => {
  it('does not throw', () => {
    expect(() => validateEnv()).not.toThrow()
  })
})
