import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export function CtaSection() {
  const { t } = useTranslation()

  return (
    <section id="shop" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Product Image with Blended Edges */}
        <div
          className="flex justify-center mb-12 relative"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, white 0%, white 60%, transparent 100%)',
          }}
        >
          <div
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
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
                className="w-full max-w-7xl h-auto"
                loading="lazy"
              />
            </picture>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-8">
            {t('cta.description')}
          </p>
          <Button size="lg" className="text-lg px-12 py-6 h-auto">
            {t('cta.button')}
          </Button>
        </div>
      </div>
    </section>
  )
}
