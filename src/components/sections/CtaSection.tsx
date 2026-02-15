import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { useScrollReveal } from '@/hooks/useGsap'
import { ProductCTA } from '../ProductCTA'

export function CtaSection() {
  const imageRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="shop">
      <div className="max-w-4xl mx-auto px-4 sm:px-4">
        {/* Product Image with Blended Edges */}
        <div ref={imageRef} className="flex justify-center relative">
          <ImageWithFallback
            src="/images/product-shots/product_shadow-1024x1024.webp"
            alt="tigre tigre Chili Crunch"
            sources={[
              {
                srcSet:
                  '/images/product-shots/product_shadow-640x640.webp 640w, /images/product-shots/product_shadow-1024x1024.webp 1024w',
                sizes: '(max-width: 768px) 100vw, 1024px',
                type: 'image/webp',
              },
            ]}
            className="w-full max-w-7xl h-auto"
            loading="eager"
          />
        </div>
      </div>
      <ProductCTA />
    </section>
  )
}
