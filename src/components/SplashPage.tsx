import { useState } from 'react'

export function SplashPage() {
  const [imageLoading, setImageLoading] = useState(true)

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
        {imageLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
        <picture>
          <source
            srcSet="/images/hero-sm.webp 640w, /images/hero-md.webp 1024w, /images/hero-lg.webp 1920w"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/images/hero-lg.jpg"
            alt=""
            className="w-full h-full object-cover object-center transition-opacity duration-500"
            style={{ opacity: imageLoading ? 0 : 1 }}
            loading="eager"
            onLoad={() => setImageLoading(false)}
          />
        </picture>
      </div>

      {/* Logo/Text */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight">tigre tigre</h1>
      </div>
    </div>
  )
}
