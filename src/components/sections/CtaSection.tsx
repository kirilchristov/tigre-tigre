import type { ReactNode } from 'react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { useScrollReveal } from '@/hooks/useGsap'

interface CtaSectionProps {
  footer?: ReactNode
}

export function CtaSection({ footer }: CtaSectionProps) {
  const imageRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="shop">
      <div className="max-w-4xl mx-auto px-4 sm:px-4">
        {/* Product Image with Blended Edges */}
        <div ref={imageRef} className="flex justify-center relative">
          <ImageWithFallback
            src="/images/product-shots/2026_front-2048x2048.webp"
            alt="tigre tigre Chili Crunch"
            sources={[
              {
                srcSet:
                  '/images/product-shots/2026_front-1280x1280.webp 1280w, /images/product-shots/2026_front-2048x2048.webp 2048w',
                sizes: '(max-width: 768px) 100vw, 2048px',
                type: 'image/webp',
              },
            ]}
            className="w-full max-w-7xl h-auto brightness-[1.01] contrast-[1.01]" // Subtle enhancement to make the product pop
            loading="eager"
          />
        </div>
      </div>
      {footer}
    </section>
  )
}
