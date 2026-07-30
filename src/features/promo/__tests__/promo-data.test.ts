import { describe, expect, it } from 'vitest'
import { PROMO_BUNDLES } from '../promo-data'

describe('PROMO_BUNDLES', () => {
  it('keeps the approved brochure tiers in display order', () => {
    expect(PROMO_BUNDLES.map(({ id, quantity }) => ({ id, quantity }))).toEqual([
      { id: 'single', quantity: 1 },
      { id: 'duo', quantity: 2 },
      { id: 'trio', quantity: 3 },
      { id: 'six', quantity: 6 },
    ])
  })

  it('derives payable totals and savings with per-item discount flooring', () => {
    expect(
      PROMO_BUNDLES.map(
        ({ originalTotalCents, totalCents, savingsCents, discountPercent, freeShipping }) => ({
          originalTotalCents,
          totalCents,
          savingsCents,
          discountPercent,
          freeShipping,
        })
      )
    ).toEqual([
      {
        originalTotalCents: 799,
        totalCents: 799,
        savingsCents: undefined,
        discountPercent: 0,
        freeShipping: false,
      },
      {
        originalTotalCents: 1598,
        totalCents: 1598,
        savingsCents: 174,
        discountPercent: 0,
        freeShipping: true,
      },
      {
        originalTotalCents: 2397,
        totalCents: 2160,
        savingsCents: 411,
        discountPercent: 10,
        freeShipping: true,
      },
      {
        originalTotalCents: 4794,
        totalCents: 4080,
        savingsCents: 888,
        discountPercent: 15,
        freeShipping: true,
      },
    ])
  })

  it('keeps checkout destinations derived instead of storing duplicated URLs', () => {
    expect(PROMO_BUNDLES.every((bundle) => !('shopUrl' in bundle))).toBe(true)
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
