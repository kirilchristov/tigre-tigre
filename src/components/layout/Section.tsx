import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  fullHeight?: boolean
  /** If true, section will be full-width without max-width container */
  fullWidth?: boolean
  /** Custom max-width class (e.g., 'max-w-4xl', 'max-w-5xl'). Default: 'max-w-7xl' */
  maxWidth?: string
  /** Custom horizontal padding class. Default: 'px-6' */
  padding?: string
}

export function Section({
  children,
  className,
  id,
  fullHeight = false,
  fullWidth = false,
  maxWidth = 'max-w-7xl',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        fullHeight && 'min-h-screen flex flex-col items-center justify-center',
        className
      )}
    >
      {fullWidth ? children : <div className={cn(maxWidth, 'mx-auto w-full')}>{children}</div>}
    </section>
  )
}
