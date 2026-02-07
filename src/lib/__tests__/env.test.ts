import { describe, it, expect } from 'vitest'
import { env, validateEnv } from '@/lib/env'

describe('env', () => {
  it('exposes stripe payment link properties', () => {
    expect(env.stripe).toHaveProperty('paymentLinkSingle')
    expect(env.stripe).toHaveProperty('paymentLinkBundle')
  })

  it('exposes contact email', () => {
    expect(typeof env.contact.email).toBe('string')
    expect(env.contact.email.length).toBeGreaterThan(0)
  })

  it('has the expected shape', () => {
    expect(env).toHaveProperty('stripe')
    expect(env).toHaveProperty('analytics')
    expect(env).toHaveProperty('contact')
    expect(env).toHaveProperty('isDev')
    expect(env).toHaveProperty('isProd')
    expect(env).toHaveProperty('mode')
  })
})

describe('validateEnv()', () => {
  it('does not throw', () => {
    expect(() => validateEnv()).not.toThrow()
  })
})
