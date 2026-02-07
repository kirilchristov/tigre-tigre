import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { cn } from '@/lib/utils'

interface BannerItem {
  src: string
  alt: string
}

interface EmblaBannerCarouselProps {
  items: BannerItem[]
  /** Speed of continuous scroll (pixels per second) */
  speed?: number
  /** Height classes for responsive sizing */
  className?: string
  /** Image height classes */
  imageClassName?: string
}

const EmblaBannerCarousel: React.FC<EmblaBannerCarouselProps> = ({
  items,
  speed = 1,
  className,
  imageClassName = 'h-[350px] md:h-[640px]',
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: 'start',
      containScroll: false,
      slidesToScroll: 1,
    },
    [
      AutoScroll({
        speed,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  )

  // Ensure auto scroll is playing
  useEffect(() => {
    if (!emblaApi) return
    emblaApi.plugins().autoScroll?.play()
  }, [emblaApi])

  return (
    <div className={cn('w-full', className)}>
      {/* Viewport - overflow hidden */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        {/* Container - flex row, no gaps */}
        <div className="flex touch-pan-y">
          {items.map((item, index) => (
            <div key={index} className="flex-[0_0_auto] min-w-0">
              <img
                src={item.src}
                alt={item.alt}
                className={cn('w-auto object-contain select-none', imageClassName)}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaBannerCarousel
