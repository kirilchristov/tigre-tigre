import React from 'react'
import MarqueeWrapper from './ui/marquee'
import { cn } from '@/lib/utils'

interface TextScrollerProps {
  texts: string[]
  speed?: number
  direction?: 'left' | 'right'
  gradient?: boolean
  gradientColor?: string
  pauseOnHover?: boolean
  className?: string
  textClassName?: string
  separator?: string | React.ReactNode
}

const TextScroller: React.FC<TextScrollerProps> = ({
  texts,
  speed = 50,
  direction = 'left',
  gradient = false,
  gradientColor = 'white',
  pauseOnHover = true,
  className,
  textClassName,
}) => {
  const textItems = texts.map((text) => ({
    text,
  }))

  return (
    <div className={cn('w-full py-4', className)}>
      <MarqueeWrapper
        items={textItems}
        speed={speed}
        direction={direction}
        gradient={gradient}
        gradientColor={gradientColor}
        pauseOnHover={pauseOnHover}
        itemClassName="mx-8 flex items-center gap-8"
        textClassName={cn(
          'text-2xl font-bold tracking-wider [font-variant:small-caps]',
          textClassName
        )}
      />
    </div>
  )
}

export default TextScroller
