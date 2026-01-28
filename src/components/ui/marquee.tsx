import React from 'react'
import Marquee from 'react-fast-marquee'
import { cn } from '@/lib/utils'

interface MarqueeItemProps {
  src?: string
  alt?: string
  text?: string
  className?: string
}

interface MarqueeWrapperProps {
  items: MarqueeItemProps[]
  speed?: number
  direction?: 'left' | 'right'
  gradient?: boolean
  gradientColor?: string
  gradientWidth?: number | string
  pauseOnHover?: boolean
  pauseOnClick?: boolean
  className?: string
  itemClassName?: string
  imageClassName?: string
  textClassName?: string
}

const MarqueeWrapper: React.FC<MarqueeWrapperProps> = ({
  items,
  speed = 50,
  direction = 'left',
  gradient = true,
  gradientColor = 'white',
  gradientWidth = 200,
  pauseOnHover = true,
  pauseOnClick = false,
  className,
  itemClassName,
  imageClassName,
  textClassName,
}) => {
  return (
    <Marquee
      speed={speed}
      direction={direction}
      gradient={gradient}
      gradientColor={gradientColor}
      gradientWidth={gradientWidth}
      pauseOnHover={pauseOnHover}
      pauseOnClick={pauseOnClick}
      className={cn('overflow-hidden', className)}
    >
      {items.map((item, index) => (
        <div key={index} className={cn('mx-4 flex items-center justify-center', itemClassName)}>
          {item.src ? (
            <img
              src={item.src}
              alt={item.alt || `Marquee item ${index + 1}`}
              className={cn('h-auto max-h-24 w-auto object-contain', imageClassName)}
            />
          ) : (
            <span
              className={cn('text-lg font-medium text-gray-800 dark:text-gray-200', textClassName)}
            >
              {item.text}
            </span>
          )}
        </div>
      ))}
    </Marquee>
  )
}

export default MarqueeWrapper
