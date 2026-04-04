import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuantityStepperProps {
  value: number
  min?: number
  max?: number
  onChange: (nextValue: number) => void
  decrementLabel: string
  incrementLabel: string
  quantityLabel: string
  className?: string
}

export function QuantityStepper({
  value,
  min = 1,
  max = 12,
  onChange,
  decrementLabel,
  incrementLabel,
  quantityLabel,
  className,
}: QuantityStepperProps) {
  const canDecrease = value > min
  const canIncrease = value < max

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {quantityLabel}
      </span>
      <div className="inline-flex items-center border border-foreground rounded-[2px]">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={decrementLabel}
          disabled={!canDecrease}
          className="h-10 w-10 rounded-none border-r border-foreground"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus />
        </Button>
        <span className="min-w-12 px-3 text-center text-lg font-bold tabular-nums">{value}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={incrementLabel}
          disabled={!canIncrease}
          className="h-10 w-10 rounded-none border-l border-foreground"
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus />
        </Button>
      </div>
    </div>
  )
}
