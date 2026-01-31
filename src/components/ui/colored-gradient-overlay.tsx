import { cn } from '@/lib/utils'
import { CSSProperties, ReactNode } from 'react'

interface ColoredOverlayProps {
  children: ReactNode
  /** Color of the overlay (CSS color value) */
  color?: string
  /** Opacity of the color (0-1) */
  opacity?: number
  /** CSS blend mode for the overlay */
  blendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'
  /** Additional CSS classes for the container */
  className?: string
  /** CSS classes for the overlay layer */
  overlayClassName?: string
}

/**
 * ColoredOverlay component that adds a solid color overlay to its children.
 * Use with GradientMask to add gradient edges to the color effect.
 *
 *
 *  <ColoredOverlay color="salmon" opacity={0.6} blendMode="multiply">
 *    {children}
 *  </ColoredOverlay>
 */
export function ColoredOverlay({
  children,
  color = 'black',
  opacity = 0.5,
  blendMode = 'normal',
  className,
  overlayClassName,
}: ColoredOverlayProps) {
  // Convert color to rgba format for solid overlay
  const getColorWithOpacity = () => {
    if (color.startsWith('rgba')) {
      return color
    }
    if (color.startsWith('rgb')) {
      return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)
    }
    if (color.startsWith('#')) {
      // Convert hex to rgba
      const hex = color.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
    // For named colors (like 'salmon', 'red', etc.), use color-mix
    return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`
  }

  const overlayStyle: CSSProperties = {
    backgroundColor: getColorWithOpacity(),
    mixBlendMode: blendMode,
  }

  return (
    <div className={cn('relative w-full h-full', className)}>
      {children}
      <div
        className={cn('absolute inset-0 pointer-events-none', overlayClassName)}
        style={overlayStyle}
        aria-hidden="true"
      />
    </div>
  )
}
