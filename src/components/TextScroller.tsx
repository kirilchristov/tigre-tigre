import React from 'react'
import { cn } from '@/lib/utils'

interface TextScrollerProps {
  texts: string[]
  /** Animation duration in seconds */
  duration?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
  textClassName?: string
}

const TextScroller: React.FC<TextScrollerProps> = ({
  texts,
  duration = 30,
  direction = 'left',
  pauseOnHover = true,
  className,
  textClassName,
}) => {
  return (
    <div
      className={cn('w-full py-4 overflow-hidden', className)}
      style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          'flex whitespace-nowrap w-max',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {texts.map((text, index) => (
          <span
            key={index}
            className={cn(
              'mx-8 text-2xl font-bold tracking-wider [font-variant:small-caps]',
              textClassName
            )}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TextScroller
