import { useState, ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SourceProps {
  srcSet: string
  sizes?: string
  type?: string
  media?: string
}

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
  containerClassName?: string
  sources?: SourceProps[]
  onLoadComplete?: () => void
  showErrorMessage?: boolean
}

export function ImageWithFallback({
  src,
  fallbackSrc = '/images/placeholder.jpg',
  alt,
  className,
  containerClassName,
  sources,
  onLoadComplete,
  showErrorMessage = true,
  ...props
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoadComplete?.()
  }

  const handleError = () => {
    setIsLoading(false)
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(true)
    }
  }

  return (
    <div className={cn('relative', containerClassName)}>
      {isLoading && (
        <div
          className={cn('absolute inset-0 bg-muted animate-pulse', className)}
          aria-label="Loading image"
        />
      )}
      {sources && sources.length > 0 ? (
        <picture>
          {sources.map((source, index) => (
            <source key={index} {...source} />
          ))}
          <img
            src={currentSrc}
            alt={alt}
            className={cn(
              'transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100',
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </picture>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
      {hasError && showErrorMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground text-sm">
          {alt || 'Image unavailable'}
        </div>
      )}
    </div>
  )
}
