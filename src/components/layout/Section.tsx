import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  fullHeight?: boolean
}

export function Section({ children, className, id, fullHeight = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'px-6',
        fullHeight && 'min-h-screen flex flex-col items-center justify-center',
        className
      )}
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </section>
  )
}
