import { useTranslation } from 'react-i18next'
// import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { GradientMask, GRADIENT_TYPES } from '@/components/ui/gradient-mask'
import { useHeroAnimation } from '@/hooks/useGsap'

export function HeroSection() {
  const { t } = useTranslation()
  const contentRef = useHeroAnimation<HTMLDivElement>()

  return (
    <section
      className="relative  flex flex-col items-center justify-start pt-32 px-4 sm:px-4 overflow-hidden h-full"
      aria-label="Hero section"
    >
      {/* Background Image with Fade Effect */}
      <GradientMask
        type={GRADIENT_TYPES.RADIAL}
        className="absolute inset-0"
        innerClassName="absolute inset-0"
      >
        <ImageWithFallback
          src="/images/hero-lg.jpg"
          alt=""
          sources={[
            {
              srcSet:
                '/images/hero-sm.webp 640w, /images/hero-md.webp 1024w, /images/hero-lg.webp 1920w',
              sizes: '100vw',
              type: 'image/webp',
            },
          ]}
          className="w-full h-full object-cover object-center"
          containerClassName="w-full h-full"
          loading="eager"
          showErrorMessage={false}
        />
      </GradientMask>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 z-10 text-center px-4 w-full max-w-5xl"
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-4">
          {t('hero.title')}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground mb-8">{t('hero.subtitle')}</p>
        {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="min-h-[48px]">
            {t('hero.shopNow')}
          </Button>
          <Button variant="outline" size="lg" className="min-h-[48px]">
            {t('hero.learnMore')}
          </Button>
        </div> */}
      </div>
    </section>
  )
}
