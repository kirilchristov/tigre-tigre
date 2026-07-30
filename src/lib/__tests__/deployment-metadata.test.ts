import { describe, expect, it } from 'vitest'
import vercelConfig from '../../../vercel.json'

describe('metadata deployment routing', () => {
  it('serves prerendered Bulgarian and English metadata before the SPA fallback', () => {
    expect(vercelConfig.rewrites).toEqual([
      {
        source: '/',
        has: [{ type: 'query', key: 'lang', value: 'en' }],
        destination: '/en/index.html',
      },
      {
        source: '/promo',
        has: [{ type: 'query', key: 'lang', value: 'en' }],
        destination: '/en/promo/index.html',
      },
      {
        source: '/promo',
        destination: '/promo/index.html',
      },
      {
        source: '/promo/',
        destination: '/promo/index.html',
      },
      {
        source: '/(.*)',
        destination: '/index.html',
      },
    ])
  })
})
