import { useTranslation } from 'react-i18next'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export function ContentsSection() {
  const { t } = useTranslation()

  return (
    <section id="content">
      <div className="max-w-4xl mx-auto px-4 sm:px-4">
        {/* Ingredients Typography */}
        <div className="text-center">
          <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-foreground lowercase tracking-tight">
            {t('contents.title')}
          </h2>
          <p className="font-mono text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-loose text-foreground/80 max-w-2xl mx-auto lowercase tracking-wide">
            {t('contents.ingredients')}
          </p>
          <p className="mt-6 font-mono text-base md:text-lg lg:text-xl leading-relaxed text-foreground font-bold lowercase tracking-wide">
            {t('contents.naturalLabel')}
          </p>
          <p className="mt-2 font-mono text-base md:text-lg lg:text-xl leading-relaxed text-foreground/70 lowercase tracking-wide">
            {t('contents.netWeight')}
          </p>
        </div>
        <div className="flex justify-center relative">
          <ImageWithFallback
            src="/images/product-shots/2026_back-2048x1536.webp"
            alt="tigre tigre Chili Crunch ingredients"
            sources={[
              {
                srcSet:
                  '/images/product-shots/2026_back-1280x960.webp 1280w, /images/product-shots/2026_back-2048x1536.webp 2048w',
                sizes: '(max-width: 768px) 100vw, 2048px',
                type: 'image/webp',
              },
            ]}
            fallbackSrc="/images/product-shots/2026_back.png"
            className="w-full max-w-7xl h-auto"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
