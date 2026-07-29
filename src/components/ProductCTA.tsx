import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
import { cn } from '@/lib/utils'
import { buildShopifyCartPermalink } from '@/lib/shopify'
import { SINGLE_JAR_PRODUCT } from '@/lib/product-config'
import { ArrowRight } from 'lucide-react'

const BASE_PRICE = SINGLE_JAR_PRODUCT.priceCents / 100

const floorMoney = (v: number) => Math.floor(v * 100) / 100
const money = (v: number) => (Math.round((v + Number.EPSILON) * 100) / 100).toFixed(2)

function getPromo(qty: number) {
  if (qty >= 6) return { discount: 0.15, freeShipping: true }
  if (qty >= 3) return { discount: 0.1, freeShipping: true }
  if (qty === 2) return { discount: 0, freeShipping: true }
  return { discount: 0, freeShipping: false }
}

interface ProductCTAProps {
  className?: string
  compact?: boolean
}

export function ProductCTA({ className, compact = false }: ProductCTAProps) {
  const { t } = useTranslation()
  const [quantity, setQuantity] = useState(1)

  const promo = getPromo(quantity)
  const discountPerItem = floorMoney(BASE_PRICE * promo.discount)
  const total = money((BASE_PRICE - discountPerItem) * quantity)
  const undiscountedTotal = money(BASE_PRICE * quantity)
  const cartUrl = buildShopifyCartPermalink({
    variantId: SINGLE_JAR_PRODUCT.variantId,
    quantity,
  })

  let nudge: React.ReactNode = null
  if (quantity === 1) nudge = t('productCTA.nudge.freeDelivery')
  else if (quantity === 2) nudge = t('productCTA.nudge.tenOff')
  else if (quantity >= 3 && quantity < 6) nudge = t('productCTA.nudge.fifteenOff')
  else if (quantity === 20)
    nudge = (
      <>
        {t('productCTA.nudge.bulkContact')}{' '}
        <a href="mailto:sales@tigre-tigre.com" className="underline hover:no-underline">
          {t('productCTA.nudge.bulkContactLink')}
        </a>
      </>
    )

  let promoBadge: string
  if (promo.discount === 0.15) promoBadge = t('productCTA.promo.fifteenOff')
  else if (promo.discount === 0.1) promoBadge = t('productCTA.promo.tenOff')
  else if (promo.freeShipping) promoBadge = t('productCTA.promo.freeShipping')
  else promoBadge = t('productCTA.promo.fastDelivery')

  return (
    <div className={cn('w-full max-w-md mx-auto my-4 px-4 font-mono', className)}>
      <div
        className={cn(
          'relative border-t-2 border-foreground bg-muted/30 transition-all',
          compact ? 'p-4' : 'p-6'
        )}
      >
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2">
              {promo.discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  €{undiscountedTotal}
                </span>
              )}
              <span className={cn('font-bold text-foreground', compact ? 'text-2xl' : 'text-3xl')}>
                €{total}
              </span>
            </div>
            <p
              className={cn(
                'text-sm font-bold mt-1',
                quantity === 1 ? 'text-gold' : 'text-green-600'
              )}
            >
              {promoBadge}
            </p>
          </div>

          <QuantityStepper
            value={quantity}
            min={1}
            max={20}
            onChange={setQuantity}
            quantityLabel={t('productCTA.quantity')}
            decrementLabel={t('productCTA.decrement')}
            incrementLabel={t('productCTA.increment')}
          />

          <p className={cn('text-xs text-muted-foreground', !nudge && 'invisible')}>
            {nudge ?? ' '}
          </p>

          <Button
            asChild
            variant="destructive"
            size={compact ? 'default' : 'lg'}
            className="w-full group"
          >
            <a href={cartUrl} target="_blank" rel="noopener noreferrer">
              {t('productCTA.multiple.button')}
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </a>
          </Button>
        </div>
      </div>

      {/* <div className="mt-6 text-center text-sm text-muted-foreground space-y-1">
        <p>{t('productCTA.trustSignal')}</p>
        <p>{t('productCTA.bulkNote')}</p>
      </div> */}
    </div>
  )
}
