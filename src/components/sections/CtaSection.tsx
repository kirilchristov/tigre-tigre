import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { useScrollReveal } from '@/hooks/useGsap'
import { ProductCTA } from '../ProductCTA'

export function CtaSection() {
  const imageRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="shop">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Product Image with Blended Edges */}
        <div
          ref={imageRef}
          className="flex justify-center relative"
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 50%, white 0%, white 60%, transparent 100%)',
          }}
        >
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
            <ImageWithFallback
              src="/images/mocks/mock-lg.jpg"
              alt="tigre tigre Chili Crunch"
              sources={[
                {
                  srcSet:
                    '/images/mocks/mock-sm.webp 640w, /images/mocks/mock-md.webp 1024w, /images/mocks/mock-lg.webp 1496w',
                  sizes: '(max-width: 768px) 100vw, 1496px',
                  type: 'image/webp',
                },
              ]}
              className="w-full max-w-7xl h-auto"
              loading="lazy"
            />
          </div>
        </div>
        <ProductCTA />
      </div>
    </section>
  )
}
