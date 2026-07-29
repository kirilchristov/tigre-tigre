import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function PromoHero() {
  const { t } = useTranslation()
  const uses = t('promo.uses.items', { returnObjects: true }) as string[]

  return (
    <section aria-labelledby="promo-title" className="border-2 border-foreground bg-background">
      <div className="grid lg:grid-cols-2">
        <div className="flex min-h-[34rem] flex-col bg-brand-600 lg:col-start-2 lg:row-start-1">
          <div className="promo-stripes h-9 shrink-0 border-b-2 border-black" aria-hidden="true" />
          <div className="flex flex-1 flex-col justify-center px-6 py-12 text-white sm:px-10 lg:px-12">
            <h1
              id="promo-title"
              className="max-w-xl font-mono text-4xl font-black uppercase leading-none sm:text-5xl"
            >
              {t('promo.hero.title')}
            </h1>
            <p className="mt-8 font-mono text-2xl font-black sm:text-3xl">
              {t('promo.hero.leadIn')}
            </p>
            <p className="mt-1 font-mono text-[clamp(4.5rem,16vw,9rem)] font-black leading-none tracking-[-0.08em]">
              {t('promo.hero.discount')}
            </p>
            <p className="mt-8 max-w-md font-mono text-xl font-bold text-white ">
              {t('promo.hero.footnote')}
            </p>
          </div>
          <div className="promo-stripes h-9 shrink-0 border-t-2 border-black" aria-hidden="true" />
        </div>

        <div className="border-b-2 border-foreground lg:col-start-1 lg:row-start-1 lg:border-b-0 lg:border-r-2">
          <div className="border-b-2 border-foreground p-6 sm:p-8">
            <p className="text-5xl font-bold tracking-tight sm:text-6xl">tigre tigre</p>
            <p className="mt-1 font-mono text-lg font-bold">{t('tagline')}</p>
          </div>

          <div className="grid items-center gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:p-8">
            <div>
              <h2 className="font-mono text-3xl font-bold lowercase">{t('promo.uses.title')}</h2>
              <ul className="mt-5 space-y-3">
                {uses.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm font-semibold sm:text-base"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center border border-foreground bg-background">
                      <Check aria-hidden="true" className="size-4 text-brand-600" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <img
              src="/images/promo/one.webp"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 40vw"
              alt={t('promo.hero.imageAlt')}
              width={1024}
              height={1024}
              loading="eager"
              className="mx-auto h-auto w-full max-w-sm bg-white object-contain"
            />
          </div>
        </div>
      </div>

      <p className="border-t-2 border-foreground px-5 py-4 text-center font-mono text-sm font-semibold sm:px-8">
        {t('promo.hero.intro')}
      </p>
    </section>
  )
}
