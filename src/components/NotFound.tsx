import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { GradientMask } from '@/components/ui/gradient-mask'

export function NotFound() {
  const { t } = useTranslation()

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Fade Effect */}
      <GradientMask className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/404-lg.jpg"
          alt=""
          sources={[
            {
              srcSet:
                '/images/404-sm.webp 640w, /images/404-md.webp 1024w, /images/404-lg.webp 1920w',
              sizes: '100vw',
              type: 'image/webp',
            },
          ]}
          className="w-full h-full object-cover object-center"
          containerClassName="absolute inset-0"
          loading="eager"
          showErrorMessage={false}
        />
      </GradientMask>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-foreground">
              404
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {t('notFound.title')}
            </p>
          </div>

          <p className="text-lg sm:text-xl text-foreground max-w-md mx-auto">
            {t('notFound.description')}
          </p>

          <Button
            variant="ctaSecondary"
            size="lg"
            onClick={handleGoHome}
            className="text-lg px-8 sm:px-12 py-6 h-auto min-h-[56px]"
          >
            {t('notFound.button')}
          </Button>
        </div>
      </div>
    </div>
  )
}
