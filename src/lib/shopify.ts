const DEFAULT_STOREFRONT_DOMAIN = 'shop.tigre-tigre.com'
const FALLBACK_CHECKOUT_URL = '#'

export type PurchaseOptionKey = 'single' | 'bundle'
export type ShopifyPolicyKey =
  | 'privacyPolicy'
  | 'refundPolicy'
  | 'contactInformation'
  | 'termsOfService'
  | 'shippingPolicy'
  | 'legalNotice'
  | 'cookiePreferences'

interface ShopifyPolicyDefinition {
  key: ShopifyPolicyKey
  path: string
}

export interface ShopifyPolicyLink {
  key: ShopifyPolicyKey
  href: string
}

interface ShopifyCheckoutParams {
  storefrontDomain?: string
  variantId?: string
  quantity: number
}

const SHOPIFY_POLICY_DEFINITIONS: ShopifyPolicyDefinition[] = [
  { key: 'privacyPolicy', path: '/policies/privacy-policy' },
  { key: 'refundPolicy', path: '/policies/refund-policy' },
  { key: 'contactInformation', path: '/policies/contact-information' },
  { key: 'termsOfService', path: '/policies/terms-of-service' },
  { key: 'shippingPolicy', path: '/policies/shipping-policy' },
  { key: 'legalNotice', path: '/policies/legal-notice' },
  { key: 'cookiePreferences', path: '/policies/#shopifyReshowConsentBanner' },
]

export function normalizeShopifyStorefrontUrl(storefrontDomain?: string) {
  const trimmedDomain = storefrontDomain?.trim() || DEFAULT_STOREFRONT_DOMAIN

  if (trimmedDomain.startsWith('http://') || trimmedDomain.startsWith('https://')) {
    return trimmedDomain.replace(/\/+$/, '')
  }

  return `https://${trimmedDomain.replace(/\/+$/, '')}`
}

export function buildShopifyCartPermalink({
  storefrontDomain,
  variantId,
  quantity,
}: ShopifyCheckoutParams) {
  const normalizedVariantId = variantId?.trim()

  if (!normalizedVariantId) {
    return FALLBACK_CHECKOUT_URL
  }

  const normalizedQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1

  return `${normalizeShopifyStorefrontUrl(storefrontDomain)}/cart/${normalizedVariantId}:${normalizedQuantity}`
}

export function buildShopifyPolicyLinks(language: string, storefrontDomain?: string) {
  const storefrontUrl = normalizeShopifyStorefrontUrl(storefrontDomain)
  const localePrefix = language.toLowerCase().startsWith('en') ? '/en' : ''

  return SHOPIFY_POLICY_DEFINITIONS.map<ShopifyPolicyLink>((policy) => ({
    key: policy.key,
    href: `${storefrontUrl}${localePrefix}${policy.path}`,
  }))
}

export function formatEstimatedTotal(price: number, quantity: number) {
  const normalizedQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1
  const total = price * normalizedQuantity

  return total.toFixed(2)
}

export function formatConvertedEstimatedTotal(
  price: number,
  quantity: number,
  exchangeRate: number
) {
  const normalizedExchangeRate = Number.isFinite(exchangeRate) ? exchangeRate : 1
  const total = Number(formatEstimatedTotal(price, quantity)) * normalizedExchangeRate

  return total.toFixed(2)
}
