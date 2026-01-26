import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-6 overflow-hidden">
      {/* Background Image with Fade Effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
        }}
      >
        <picture>
          <source
            srcSet="/images/hero-sm.webp 640w, /images/hero-md.webp 1024w, /images/hero-lg.webp 1920w"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/images/hero-lg.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </picture>
      </div>

      {/* Content */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">{t('hero.title')}</h1>
        <p className="text-xl md:text-2xl text-foreground mb-8">{t('hero.subtitle')}</p>
        <div className="flex justify-center gap-4">
          <Button size="lg">{t('hero.shopNow')}</Button>
          <Button variant="outline" size="lg">
            {t('hero.learnMore')}
          </Button>
        </div>
      </div>
    </section>
  )
}
