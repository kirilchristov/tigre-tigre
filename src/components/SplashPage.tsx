import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export function SplashPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Blended Edges */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
        }}
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
          containerClassName="absolute inset-0"
          loading="eager"
          showErrorMessage={false}
        />
      </div>

      {/* Logo/Text */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight">tigre tigre</h1>
      </div>
    </div>
  )
}
