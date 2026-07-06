import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  fullWidth?: boolean
}

export function Section({ children, className, id, fullWidth = false }: SectionProps) {
  return (
    <section id={id} className={cn(className)}>
      {fullWidth ? children : <div className="max-w-7xl mx-auto w-full">{children}</div>}
    </section>
  )
}
