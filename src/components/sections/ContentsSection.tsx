import { useTranslation } from 'react-i18next'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { useScrollReveal } from '@/hooks/useGsap'
import { GRADIENT_TYPES, GradientMask } from '../ui/gradient-mask'

export function ContentsSection() {
  const { t } = useTranslation()
  const imageRef = useScrollReveal<HTMLDivElement>()
  const textRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="content">
      <div className="max-w-4xl mx-auto px-4 sm:px-4">
        {/* Ingredients Typography */}
        <div ref={textRef} className="pt-16 md:pt-24 text-center">
          <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-foreground lowercase tracking-tight">
            {t('contents.title')}
          </h2>
          <p className="font-mono text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-loose text-foreground/80 max-w-2xl mx-auto lowercase tracking-wide">
            {t('contents.ingredients')}
          </p>
        </div>
        {/* Product Image with Blended Edges */}
        <div ref={imageRef} className="flex justify-center relative">
          <GradientMask type={GRADIENT_TYPES.RADIAL}>
            <ImageWithFallback
              src="/images/product-shots/back/back-1024x1024.webp"
              alt="tigre tigre Chili Crunch ingredients"
              sources={[
                {
                  srcSet:
                    '/images/product-shots/back/back-640x640.webp 640w, /images/product-shots/back/back-1024x1024.webp 1024w',
                  sizes: '(max-width: 768px) 100vw, 1024px',
                  type: 'image/webp',
                },
              ]}
              fallbackSrc="/images/product-shots/back/back.webp"
              className="w-full max-w-7xl h-auto"
              loading="eager"
            />
          </GradientMask>
        </div>
      </div>
    </section>
  )
}
