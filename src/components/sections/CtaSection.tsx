import type { ReactNode } from 'react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { useScrollReveal } from '@/hooks/useGsap'

interface CtaSectionProps {
  isSoldOut?: boolean
  footer?: ReactNode
}

export function CtaSection({ isSoldOut = false, footer }: CtaSectionProps) {
  const imageRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="shop">
      <div className="max-w-4xl mx-auto px-4 sm:px-4">
        {/* Product Image with Blended Edges */}
        <div ref={imageRef} className="flex justify-center relative">
          {isSoldOut ? (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <span className="inline-block whitespace-nowrap text-red-600 border-4 sm:border-[6px] border-red-600 px-4 py-2 sm:px-12 sm:py-4 text-[clamp(1.75rem,10vw,3rem)] sm:text-7xl lg:text-8xl leading-none font-black tracking-[0.14em] sm:tracking-[0.2em] uppercase -rotate-12 opacity-90">
                Sold Out
              </span>
            </div>
          ) : null}
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
      {footer}
    </section>
  )
}
