import { describe, expect, it } from 'vitest'
import {
  buildShopifyCartPermalink,
  formatConvertedEstimatedTotal,
  formatEstimatedTotal,
  normalizeShopifyStorefrontUrl,
} from '@/lib/shopify'

describe('normalizeShopifyStorefrontUrl', () => {
  it('adds https when only a domain is provided', () => {
    expect(normalizeShopifyStorefrontUrl('shop.tigre-tigre.com')).toBe(
      'https://shop.tigre-tigre.com'
    )
  })

  it('removes trailing slashes from a full URL', () => {
    expect(normalizeShopifyStorefrontUrl('https://shop.tigre-tigre.com///')).toBe(
      'https://shop.tigre-tigre.com'
    )
  })
})

describe('buildShopifyCartPermalink', () => {
  it('builds a Shopify cart permalink from variant and quantity', () => {
    expect(
      buildShopifyCartPermalink({
        storefrontDomain: 'shop.tigre-tigre.com',
        variantId: '56986218955100',
        quantity: 3,
      })
    ).toBe('https://shop.tigre-tigre.com/cart/56986218955100:3')
  })

  it('falls back when the variant is missing', () => {
    expect(
      buildShopifyCartPermalink({
        storefrontDomain: 'shop.tigre-tigre.com',
        variantId: '',
        quantity: 2,
      })
    ).toBe('#')
  })

  it('normalizes invalid quantities to one', () => {
    expect(
      buildShopifyCartPermalink({
        storefrontDomain: 'shop.tigre-tigre.com',
        variantId: '56986218955100',
        quantity: 0,
      })
    ).toBe('https://shop.tigre-tigre.com/cart/56986218955100:1')
  })
})

describe('formatEstimatedTotal', () => {
  it('formats a two-decimal total from quantity and price', () => {
    expect(formatEstimatedTotal(6.99, 3)).toBe('20.97')
  })
})

describe('formatConvertedEstimatedTotal', () => {
  it('formats a two-decimal converted total from quantity, price, and exchange rate', () => {
    expect(formatConvertedEstimatedTotal(7.99, 3, 1.95583)).toBe('46.88')
  })
})
