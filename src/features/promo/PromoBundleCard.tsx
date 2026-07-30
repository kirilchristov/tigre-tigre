import { ArrowRight, Check, Info, Truck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { SINGLE_JAR_PRODUCT } from '@/lib/product-config'
import { buildShopifyCartPermalink } from '@/lib/shopify'
import { cn } from '@/lib/utils'
import { formatEuro, type PromoBundle } from './promo-data'

interface PromoBundleCardProps {
  readonly bundle: Readonly<PromoBundle>
}

function BundleImage({ bundle, alt }: { bundle: Readonly<PromoBundle>; alt: string }) {
  return (
    <img
      src={bundle.imageSrc}
      alt={alt}
      width={1024}
      height={1024}
      loading="lazy"
      className="relative z-20 h-full w-full object-contain"
    />
  )
}

function DiscountBurst({ bundle }: PromoBundleCardProps) {
  return (
    <span
      data-testid="promo-discount-burst"
      className="promo-discount-burst absolute right-0 top-0 z-10 inline-grid h-40 w-48 shrink-0 place-items-center bg-black p-[4px]"
    >
      <span
        className={cn(
          'promo-discount-burst grid h-full w-full place-items-center px-4 font-mono text-4xl font-black leading-none',
          bundle.emphasis === 'best' ? 'bg-brand-700 text-white' : 'bg-gold text-white'
        )}
      >
        -{bundle.discountPercent}%
      </span>
    </span>
  )
}

function SavingsTooltip({ bundle }: PromoBundleCardProps) {
  const { t } = useTranslation()
  const savingsLabel = t('promo.labels.savings', {
    amount: formatEuro(bundle.savingsCents ?? 0),
  })
  const tooltipId = `promo-savings-tooltip-${bundle.id}`
  const productSavingsCents = bundle.originalTotalCents - bundle.totalCents
  const deliverySavingsCents = (bundle.savingsCents ?? 0) - productSavingsCents
  const explanation = t(
    productSavingsCents === 0 ? 'promo.savingsTooltip.delivery' : 'promo.savingsTooltip.discount',
    {
      savings: formatEuro(bundle.savingsCents ?? 0),
      discount: formatEuro(productSavingsCents),
      delivery: formatEuro(deliverySavingsCents),
    }
  )

  return (
    <div className="group relative flex justify-center">
      <button
        type="button"
        aria-describedby={tooltipId}
        aria-label={t('promo.savingsTooltip.triggerLabel', { savings: savingsLabel })}
        className="inline-flex items-center gap-1 text-center font-bold text-brand-600 underline decoration-dotted underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        {savingsLabel}
        <Info aria-hidden="true" className="size-4" />
      </button>

      <div
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden w-52 -translate-x-1/2 border-2 border-foreground bg-background p-3 text-left font-mono text-xs font-normal leading-relaxed text-foreground shadow-[var(--cta-shadow-hover)] group-hover:block group-focus-within:block"
      >
        {explanation}
      </div>
    </div>
  )
}

export function PromoBundleCard({ bundle }: PromoBundleCardProps) {
  const { t } = useTranslation()
  const title = t(`${bundle.copyKey}.title`)
  const detailItems = t(`${bundle.copyKey}.details`, { returnObjects: true }) as readonly string[]
  const offerLabel =
    bundle.emphasis === 'good'
      ? t('promo.labels.goodOffer')
      : bundle.emphasis === 'best'
        ? t('promo.labels.bestOffer')
        : null
  const cartUrl = buildShopifyCartPermalink({
    variantId: SINGLE_JAR_PRODUCT.variantId,
    quantity: bundle.quantity,
  })

  return (
    <article
      aria-labelledby={`promo-bundle-${bundle.id}`}
      data-testid="promo-bundle-card"
      className={cn(
        'relative flex min-w-0 flex-col overflow-hidden border-2 border-foreground bg-card text-card-foreground',
        bundle.emphasis === 'best' && 'border-brand-600'
      )}
    >
      <div
        className={cn(
          'flex min-h-11 items-center justify-center border-b-2 border-foreground px-3 py-2 text-center font-mono text-sm font-bold uppercase tracking-wide',
          bundle.emphasis === 'good' && 'bg-gold text-black',
          bundle.emphasis === 'best' && 'border-brand-700 bg-brand-700 text-white',
          bundle.emphasis === 'default' && 'bg-foreground text-background'
        )}
      >
        {offerLabel ?? t(`${bundle.copyKey}.promo`)}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div data-testid="promo-bundle-visual" className="relative isolate">
          <div
            data-testid="promo-bundle-price-row"
            className="relative z-30 mb-4 flex items-start justify-between gap-3"
          >
            <div>
              <div className="flex items-baseline gap-2 font-mono">
                {bundle.originalTotalCents > bundle.totalCents && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatEuro(bundle.originalTotalCents)}
                  </span>
                )}
                <span className="text-3xl font-bold tracking-tight">
                  {formatEuro(bundle.totalCents)}
                </span>
              </div>
            </div>
          </div>

          {bundle.discountPercent > 0 && <DiscountBurst bundle={bundle} />}

          <div
            data-testid="promo-bundle-image-stage"
            className="relative aspect-square overflow-hidden bg-white"
          >
            <BundleImage bundle={bundle} alt={t(`${bundle.copyKey}.imageAlt`)} />
          </div>
        </div>

        <div className="mt-4 flex-1">
          <h3 id={`promo-bundle-${bundle.id}`} className="font-mono text-xl font-bold">
            {title}:
          </h3>
          <ul className="mt-3 space-y-2">
            {detailItems.map((item) => (
              <li key={item} className="flex items-start gap-2 font-mono text-sm font-semibold">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center border border-foreground">
                  <Check aria-hidden="true" className="size-3.5 text-brand-600" strokeWidth={3} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 min-h-14 space-y-1 border-y border-border py-3 font-mono text-lg font-semibold">
          {bundle.freeShipping ? (
            <p className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
              <Truck aria-hidden="true" className="size-4" />
              {t('promo.labels.freeDelivery')}
            </p>
          ) : (
            <p className="text-center text-muted-foreground">{t('promo.labels.noDiscount')}</p>
          )}
          {bundle.savingsCents !== undefined && <SavingsTooltip bundle={bundle} />}
        </div>

        <Button asChild size="lg" variant="destructive" className="group mt-5 w-full">
          <a
            href={cartUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('promo.cta')} — ${title}`}
          >
            {t('promo.cta')}
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </a>
        </Button>
      </div>
    </article>
  )
}
