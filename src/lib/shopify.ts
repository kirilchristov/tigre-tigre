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
  /**
   * Marketing params (utm_*, gclid, fbclid, …) appended to the cart URL so
   * Shopify journeys keep their source. See src/lib/attribution.ts.
   */
  attributionParams?: Record<string, string | undefined>
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
  attributionParams,
}: ShopifyCheckoutParams) {
  const normalizedVariantId = variantId?.trim()

  if (!normalizedVariantId) {
    return FALLBACK_CHECKOUT_URL
  }

  const normalizedQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1

  const attributionEntries = Object.entries(attributionParams ?? {}).filter(
    (entry): entry is [string, string] =>
      typeof entry[1] === 'string' && entry[1].trim() !== ''
  )
  const attributionQuery = new URLSearchParams(attributionEntries).toString()
  const attributionSuffix = attributionEntries.length > 0 ? `?${attributionQuery}` : ''

  return `${normalizeShopifyStorefrontUrl(storefrontDomain)}/cart/${normalizedVariantId}:${normalizedQuantity}${attributionSuffix}`
}

export function buildShopifyPolicyLinks(language: string, storefrontDomain?: string) {
  const storefrontUrl = normalizeShopifyStorefrontUrl(storefrontDomain)
  const localePrefix = language.toLowerCase().startsWith('en') ? '/en' : ''

  return SHOPIFY_POLICY_DEFINITIONS.map<ShopifyPolicyLink>((policy) => ({
    key: policy.key,
    href: `${storefrontUrl}${localePrefix}${policy.path}`,
  }))
}

