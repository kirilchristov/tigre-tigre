import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useGsap'

// Required by Bulgarian law until 2026-08-08. Set to false to disable BGN display.
const SHOW_BGN_PRICE = false

interface ProductCTAProps {
  className?: string
  compact?: boolean
}

const PRODUCTS = [
  {
    key: 'single',
    price: '€7.99',
    originalPrice: null,
    bgnPrice: '15.63 лв',
    bgnOriginalPrice: null,
    href: 'https://shop.tigre-tigre.com/cart/56986218955100:1',
    deliveryClassName: 'text-gold',
    image: '/images/product-shots/thumbnails/single.webp',
  },
  {
    key: 'threePack',
    price: '€21.57',
    originalPrice: '€23.97',
    bgnPrice: '42.18 лв',
    bgnOriginalPrice: '46.87 лв',
    href: 'https://shop.tigre-tigre.com/products/3-pack',
    deliveryClassName: 'text-green-600',
    image: '/images/product-shots/thumbnails/3pack.webp',
  },
  {
    key: 'sixPack',
    price: '€39.95',
    originalPrice: '€47.94',
    bgnPrice: '78.14 лв',
    bgnOriginalPrice: '93.74 лв',
    href: 'https://shop.tigre-tigre.com/products/6-pack-tigre-tigre-chili-crunch',
    deliveryClassName: 'text-green-600',
    image: '/images/product-shots/thumbnails/6pack.webp',
  },
]

export function ProductCTA({ className, compact = false }: ProductCTAProps) {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('w-full max-w-4xl mx-auto my-2 sm:my-4 px-2 sm:px-4 font-mono', className)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
        {PRODUCTS.map((product) => {
          const deal = t(`productCTA.${product.key}.deal`, { defaultValue: '' })
          return (
            <div
              key={product.key}
              className="flex flex-col justify-between border-t-2 border-foreground p-3 sm:p-6 transition-colors hover:bg-muted/60"
            >
              {/* Title — always on top */}
              <div>
                <h3
                  className={cn(
                    'font-black uppercase tracking-tight leading-none',
                    compact ? 'text-xl' : 'text-2xl sm:text-3xl'
                  )}
                >
                  {t(`productCTA.${product.key}.title`)}
                </h3>
                <span className="block text-sm font-bold text-red-600 uppercase tracking-wide min-h-[1.25rem]">
                  {deal || ''}
                </span>
              </div>

              {/* Middle — image left, details right on mobile; image full-width on desktop */}
              <div className="flex flex-row sm:flex-col gap-3 my-2 sm:my-0">
                <img
                  src={product.image}
                  alt={t(`productCTA.${product.key}.title`)}
                  className="w-1/3 sm:w-full aspect-square object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex flex-col justify-center gap-1 sm:gap-2 sm:mt-3">
                  <div className="flex items-baseline gap-2">
                    {product.originalPrice && (
                      <s className="text-muted-foreground text-sm">{product.originalPrice}</s>
                    )}
                    <span
                      className={cn(
                        'font-bold text-foreground',
                        compact ? 'text-lg' : 'text-xl sm:text-2xl'
                      )}
                    >
                      {product.price}
                    </span>
                  </div>
                  {SHOW_BGN_PRICE && (
                    <div className="flex items-baseline gap-2">
                      {product.bgnOriginalPrice && (
                        <s className="text-muted-foreground text-sm">{product.bgnOriginalPrice}</s>
                      )}
                      <span
                        className={cn(
                          'font-bold text-foreground',
                          compact ? 'text-lg' : 'text-xl sm:text-2xl'
                        )}
                      >
                        {product.bgnPrice}
                      </span>
                    </div>
                  )}
                  {/* Delivery — mobile only (shown next to image) */}
                  <p className={cn('text-sm font-medium sm:hidden', product.deliveryClassName)}>
                    {t(`productCTA.${product.key}.delivery`)}
                  </p>
                </div>
              </div>

              {/* Button — full width, always at bottom */}
              <div className="flex flex-col gap-2 sm:mt-4">
                {/* Delivery — desktop only (shown above button) */}
                <p className={cn('text-sm font-medium hidden sm:block', product.deliveryClassName)}>
                  {t(`productCTA.${product.key}.delivery`)}
                </p>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full border border-foreground bg-foreground text-background text-center py-2 px-4 text-sm font-bold uppercase tracking-wide hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
                >
                  {t(`productCTA.${product.key}.button`)}
                </a>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 text-center text-base font-bold text-gold">
        <span>{t('productCTA.customCombos.label')} </span>
        <a
          href="https://shop.tigre-tigre.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
        >
          {t('productCTA.customCombos.link')}
        </a>
      </div>
    </div>
  )
}
