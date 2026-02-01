import { forwardRef } from 'react'

interface HighlightSVGProps {
  className?: string
  'data-word-index'?: number
  style?: React.CSSProperties
}

/**
 * Thick marker/highlighter stroke behind text
 */
export const HighlightMarker = forwardRef<SVGSVGElement, HighlightSVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 238 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity: 0 }}
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M0.68306 28C44.7761 25.8 73.3363 22.3 237.683 21"
        stroke="currentColor"
        strokeWidth="36"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />
    </svg>
  )
)
HighlightMarker.displayName = 'HighlightMarker'

/**
 * Animated circle/enclosure around text
 */
export const HighlightCircle = forwardRef<SVGSVGElement, HighlightSVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 244 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity: 0 }}
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M117.31 1C51.6512 2.5873 1 4.92139 1 33.7483C1 49.5614 27.3792 51.9417 49.1706 50.7288C70.9621 49.5159 191.389 50.7288 197.123 50.7288C213.18 50.7288 243 43.4514 243 28.8967C243 1 120.342 4.57143 98.5504 4.57143"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />
    </svg>
  )
)
HighlightCircle.displayName = 'HighlightCircle'

/**
 * Simple underline stroke
 */
export const HighlightUnderline = forwardRef<SVGSVGElement, HighlightSVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 309 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity: 0 }}
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M0.141418 3.97803C7.14142 2.97803 280.641 6.97803 308.641 0.978027"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />
    </svg>
  )
)
HighlightUnderline.displayName = 'HighlightUnderline'
