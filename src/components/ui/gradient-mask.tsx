import { cn } from '@/lib/utils'
import { CSSProperties, ReactNode } from 'react'

export const GRADIENT_TYPES = {
  RADIAL: 'radial',
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const

export type GradientType = (typeof GRADIENT_TYPES)[keyof typeof GRADIENT_TYPES]

interface GradientMaskProps {
  children: ReactNode
  /** Shape of the gradient: 'ellipse' or 'circle' */
  shape?: 'ellipse' | 'circle'
  /** Width of the gradient (percentage) */
  width?: number
  /** Height of the gradient (percentage) */
  height?: number
  /** Horizontal position (percentage, 0-100) */
  positionX?: number
  /** Vertical position (percentage, 0-100) */
  positionY?: number
  /** Where the gradient starts to fade (percentage, 0-100) */
  fadeStart?: number
  /** Where the gradient becomes fully transparent (percentage, 0-100) */
  fadeEnd?: number
  /** Additional CSS classes for the container */
  className?: string
  /** CSS classes for the inner wrapper */
  innerClassName?: string
  /** Type of gradient: 'radial', 'horizontal', or 'vertical' */
  type?: GradientType
  /** Edge fade percentage for linear gradients (0-50) */
  edgeFade?: number
}

/**
 * GradientMask component that applies gradient mask effects to its children.
 * Supports radial (center fade), horizontal (left/right fade), and vertical (top/bottom fade).
 *
 * @example
 * // Default radial fade
 * <GradientMask>
 *   <img src="/image.jpg" />
 * </GradientMask>
 *
 * @example
 * // Horizontal fade (left/right edges only)
 * <GradientMask type={GRADIENT_TYPES.HORIZONTAL} edgeFade={15}>
 *   <img src="/image.jpg" />
 * </GradientMask>
 *
 * @example
 * // Vertical fade (top/bottom edges only)
 * <GradientMask type={GRADIENT_TYPES.VERTICAL} edgeFade={20}>
 *   <img src="/image.jpg" />
 * </GradientMask>
 */
export function GradientMask({
  children,
  shape = 'ellipse',
  width = 70,
  height = 70,
  positionX = 50,
  positionY = 50,
  fadeStart = 30,
  fadeEnd = 90,
  className,
  innerClassName,
  type = GRADIENT_TYPES.HORIZONTAL,
  edgeFade = 10,
}: GradientMaskProps) {
  const getMaskGradient = () => {
    switch (type) {
      case GRADIENT_TYPES.HORIZONTAL:
        // Linear gradient - fade on left and right sides only
        return `linear-gradient(to right, transparent 0%, black ${edgeFade}%, black ${100 - edgeFade}%, transparent 100%)`
      case GRADIENT_TYPES.VERTICAL:
        // Linear gradient - fade on top and bottom only
        return `linear-gradient(to bottom, transparent 0%, black ${edgeFade}%, black ${100 - edgeFade}%, transparent 100%)`
      case GRADIENT_TYPES.RADIAL:
      default:
        // Radial gradient - fade from center
        return `radial-gradient(${shape} ${width}% ${height}% at ${positionX}% ${positionY}%, black ${fadeStart}%, transparent ${fadeEnd}%)`
    }
  }

  const maskGradient = getMaskGradient()

  const maskStyle: CSSProperties = {
    maskImage: maskGradient,
    WebkitMaskImage: maskGradient,
  }

  return (
    <div className={cn('relative', className)}>
      <div className={cn('w-full h-full', innerClassName)} style={maskStyle}>
        {children}
      </div>
    </div>
  )
}
