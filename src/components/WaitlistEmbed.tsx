import { useTranslation } from 'react-i18next'

const TALLY_EMBED_URL =
  'https://tally.so/embed/XxoVBj?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'

export function WaitlistEmbed() {
  const { t } = useTranslation()

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4 font-mono">
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">{t('waitlist.title')}</h3>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 mb-4">
          {t('waitlist.description')}
        </p>

        <iframe
          src={TALLY_EMBED_URL}
          title={t('waitlist.iframeTitle')}
          width="100%"
          className="bg-background rounded-[2px]"
        />
      </div>
    </div>
  )
}
