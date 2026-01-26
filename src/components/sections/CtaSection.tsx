import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useScrollReveal } from '@/hooks/useGsap'

export function CtaSection() {
  const { t } = useTranslation()
  const imageRef = useScrollReveal<HTMLDivElement>()
  const contentRef = useScrollReveal<HTMLDivElement>()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return (
    <section id="shop" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Product Image with Blended Edges */}
        <div
          ref={imageRef}
          className="flex justify-center mb-12 relative"
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 50%, white 0%, white 60%, transparent 100%)',
          }}
        >
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-7xl h-[400px] bg-muted animate-pulse rounded" />
            </div>
          )}
          <div
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
            }}
          >
            <picture>
              <source
                srcSet="/images/product-sm.webp 400w, /images/product-md.webp 600w, /images/product-lg.webp 800w, /images/product-xl.webp 1280w"
                sizes="(max-width: 768px) 100vw, 1280px"
                type="image/webp"
              />
              <img
                src="/images/product-xl.jpg"
                alt="Tigre Tigre Chili Crunch"
                className="w-full max-w-7xl h-auto transition-opacity duration-300"
                style={{ opacity: imageLoading ? 0 : 1 }}
                loading="lazy"
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false)
                  setImageError(true)
                }}
              />
            </picture>
          </div>
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Image unavailable
            </div>
          )}
        </div>

        {/* Content */}
        <div ref={contentRef} className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-muted-foreground mb-8 px-4">
            {t('cta.description')}
          </p>
          <Button
            size="lg"
            className="text-lg px-8 sm:px-12 py-6 h-auto min-h-[56px] w-full sm:w-auto"
          >
            {t('cta.button')}
          </Button>
        </div>
      </div>
    </section>
  )
}
