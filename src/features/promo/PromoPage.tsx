import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout'
import { PROMO_BUNDLES } from './promo-data'
import { PromoBundleCard } from './PromoBundleCard'
import { PromoHero } from './PromoHero'
import { PromoTrust } from './PromoTrust'

const DISPLAYED_PROMO_BUNDLES = Object.freeze(
  PROMO_BUNDLES.filter((bundle) => bundle.id !== 'single')
)

export function PromoPage() {
  const { t } = useTranslation()

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16 sm:space-y-14 sm:pb-24">
        <PromoHero />

        <section aria-labelledby="promo-bundles-title">
          <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
                {t('promo.bundles.eyebrow')}
              </p>
              <h2
                id="promo-bundles-title"
                className="mt-2 font-mono text-3xl font-black uppercase sm:text-4xl"
              >
                {t('promo.bundles.title')}
              </h2>
            </div>
            <p className="max-w-lg text-sm text-muted-foreground">{t('promo.bundles.note')}</p>
          </div>

          <div
            data-testid="promo-bundle-grid"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {DISPLAYED_PROMO_BUNDLES.map((bundle) => (
              <PromoBundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </section>

        <PromoTrust />
      </div>
    </Layout>
  )
}
