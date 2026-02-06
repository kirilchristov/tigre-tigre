import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { GRADIENT_TYPES, GradientMask } from '@/components/ui/gradient-mask'

export function SplashPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Blended Edges */}
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

      {/* Logo/Text */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight">tigre tigre</h1>
      </div>
    </div>
  )
}
