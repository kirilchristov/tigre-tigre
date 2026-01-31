import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface BrandSignatureProps {
  className?: string
  titleClassName?: string
  taglineClassName?: string
}

export function BrandSignature({
  className,
  titleClassName,
  taglineClassName,
}: BrandSignatureProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn('text-black mt-8', className)}
      style={{ fontFamily: 'Arial, sans-serif', textAlign: 'left' }}
    >
      <div
        className={cn('text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed', titleClassName)}
      >
        {t('title')}
      </div>
      <div className={cn('text-xl md:text-2xl lg:text-3xl font-normal', taglineClassName)}>
        {t('tagline')}
      </div>
    </div>
  )
}
