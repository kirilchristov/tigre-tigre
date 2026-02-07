import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] border text-base font-semibold tracking-[0.01em] transition-[transform,box-shadow,background-color,border-color,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--cta-focus-ring)/0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none disabled:opacity-45 motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-foreground bg-foreground text-background shadow-[var(--cta-shadow-rest)] hover:-translate-y-px hover:bg-foreground hover:shadow-[var(--cta-shadow-hover)] active:translate-y-0 active:bg-foreground active:shadow-[var(--cta-shadow-pressed)]',
        ctaPrimary:
          'border-foreground bg-foreground text-background shadow-[var(--cta-shadow-rest)] hover:-translate-y-px hover:bg-brand-600 hover:border-brand-600 hover:shadow-[var(--cta-shadow-hover)] active:translate-y-0 active:bg-brand-700 active:border-brand-700 active:shadow-[var(--cta-shadow-pressed)]',
        ctaSecondary:
          'border-foreground bg-background text-foreground shadow-none hover:-translate-y-px hover:bg-foreground hover:text-background hover:shadow-[var(--cta-shadow-hover)] active:translate-y-0 active:shadow-[var(--cta-shadow-pressed)]',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground shadow-[var(--cta-shadow-rest)] hover:-translate-y-px hover:bg-destructive/95 hover:shadow-[var(--cta-shadow-hover)] active:translate-y-0 active:shadow-[var(--cta-shadow-pressed)]',
        outline:
          'border-input bg-background text-foreground shadow-none hover:bg-accent hover:text-accent-foreground',
        secondary:
          'border-secondary bg-secondary text-secondary-foreground shadow-none hover:bg-secondary/80',
        ghost: 'border-transparent bg-transparent shadow-none hover:bg-accent hover:text-accent-foreground',
        link: 'border-transparent bg-transparent text-primary shadow-none underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'ctaPrimary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button }
