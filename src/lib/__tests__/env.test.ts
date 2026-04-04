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
})

describe('validateEnv()', () => {
  it('does not throw', () => {
    expect(() => validateEnv()).not.toThrow()
  })
})
