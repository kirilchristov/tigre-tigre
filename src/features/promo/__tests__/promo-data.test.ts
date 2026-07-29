import { describe, expect, it } from 'vitest'
import { PROMO_BUNDLES, PROMO_STORE_URL } from '../promo-data'

describe('PROMO_BUNDLES', () => {
  it('keeps the approved brochure tiers in display order', () => {
    expect(PROMO_BUNDLES.map(({ id, quantity }) => ({ id, quantity }))).toEqual([
      { id: 'single', quantity: 1 },
      { id: 'duo', quantity: 2 },
      { id: 'trio', quantity: 3 },
      { id: 'six', quantity: 6 },
    ])
  })

  it('uses the approved brochure totals and savings copy', () => {
    expect(
      PROMO_BUNDLES.map(
        ({ totalCents, savingsCents, discountPercent, freeShipping }) => ({
          totalCents,
          savingsCents,
          discountPercent,
          freeShipping,
        })
      )
    ).toEqual([
      { totalCents: 799, savingsCents: undefined, discountPercent: 0, freeShipping: false },
      { totalCents: 1598, savingsCents: 170, discountPercent: 0, freeShipping: true },
      { totalCents: 2160, savingsCents: 240, discountPercent: 10, freeShipping: true },
      { totalCents: 4080, savingsCents: 790, discountPercent: 15, freeShipping: true },
    ])
  })

  it('uses the generic storefront until direct bundle carts are approved', () => {
    expect(PROMO_STORE_URL).toBe('https://shop.tigre-tigre.com/')
    expect(PROMO_BUNDLES.every((bundle) => bundle.shopUrl === PROMO_STORE_URL)).toBe(true)
  })

  it('uses the optimized supplied bundle compositions', () => {
    expect(PROMO_BUNDLES.map(({ imageSrc }) => imageSrc)).toEqual([
      '/images/promo/one.webp',
      '/images/promo/duo.webp',
      '/images/promo/three.webp',
      '/images/promo/six.webp',
    ])
  })

  it('is immutable at the collection and item levels', () => {
    expect(Object.isFrozen(PROMO_BUNDLES)).toBe(true)
    expect(PROMO_BUNDLES.every(Object.isFrozen)).toBe(true)
  })
})
