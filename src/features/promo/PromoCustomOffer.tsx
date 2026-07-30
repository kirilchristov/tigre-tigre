import { useTranslation } from 'react-i18next'
import { ProductCTA } from '@/components/ProductCTA'

export function PromoCustomOffer() {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby="promo-custom-offer-title"
      data-testid="promo-custom-offer"
      className="grid overflow-hidden border-2 border-foreground bg-card lg:grid-cols-2"
    >
      <div className="flex flex-col justify-center bg-gold p-6 text-black sm:p-8 lg:p-10">
        <p className="w-fit bg-black px-3 py-2 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">
          {t('promo.customOffer.eyebrow')}
        </p>
        <h2
          id="promo-custom-offer-title"
          className="mt-6 font-mono text-4xl font-black tracking-tight sm:text-5xl"
        >
          {t('promo.customOffer.title')}
        </h2>
        <p className="mt-4 max-w-xl text-base font-mono font-medium sm:text-md">
          {t('promo.customOffer.body')}
        </p>
      </div>

      <div className="flex items-center bg-card p-4 sm:p-6 lg:p-8">
        <ProductCTA />
      </div>
    </section>
  )
}
