import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Cookie, Settings2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildShopifyPolicyLinks } from '@/lib/shopify'
import { useConsent } from '@/context/ConsentContext'
import { cn } from '@/lib/utils'

type BannerView = 'summary' | 'customize'

function ToggleRow({
  id,
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  id: string
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
      <div className="min-w-0">
        <label htmlFor={id} className="block font-mono text-sm font-bold text-foreground">
          {title}
        </label>
        <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative mt-1 inline-flex h-6 w-11 shrink-0 items-center border-2 border-foreground transition-colors',
          checked ? 'bg-foreground' : 'bg-background',
          disabled && 'cursor-not-allowed opacity-60'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'mx-0.5 block size-4 bg-background transition-transform',
            checked ? 'translate-x-5 bg-background' : 'translate-x-0 bg-foreground'
          )}
        />
      </button>
    </div>
  )
}

function ConsentBannerContent() {
  const { t, i18n } = useTranslation()
  const { hasDecision, isSaving, choice, saveChoice, closeBanner } = useConsent()
  // Fresh mount per open: the draft always reflects the stored choice and
  // optional categories stay off before any decision exists.
  const [view, setView] = useState<BannerView>('summary')
  const [draft, setDraft] = useState({
    analytics: hasDecision ? choice.analytics : false,
    marketing: hasDecision ? choice.marketing : false,
  })

  const policyLinks = useMemo(
    () => buildShopifyPolicyLinks(i18n.resolvedLanguage ?? i18n.language),
    [i18n.resolvedLanguage, i18n.language]
  )
  const privacyHref = policyLinks.find((link) => link.key === 'privacyPolicy')?.href ?? '#'

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      data-testid="cookie-consent-banner"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl border-2 border-foreground bg-background p-4 font-mono shadow-[var(--cta-shadow-hover)] sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Cookie aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
          <div>
            <h2 id="cookie-consent-title" className="text-base font-bold text-foreground">
              {t('consent.title')}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {t('consent.description')}{' '}
              <a
                href={privacyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t('consent.policyLink')}
              </a>
            </p>
          </div>
        </div>

        {hasDecision && (
          <button
            type="button"
            aria-label={t('consent.close')}
            onClick={closeBanner}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>

      {view === 'customize' ? (
        <div className="mt-4 space-y-3">
          <ToggleRow
            id="consent-necessary"
            title={t('consent.necessary.title')}
            description={t('consent.necessary.description')}
            checked
            disabled
          />
          <ToggleRow
            id="consent-analytics"
            title={t('consent.analytics.title')}
            description={t('consent.analytics.description')}
            checked={draft.analytics}
            onChange={(analytics) => setDraft((current) => ({ ...current, analytics }))}
          />
          <ToggleRow
            id="consent-marketing"
            title={t('consent.marketing.title')}
            description={t('consent.marketing.description')}
            checked={draft.marketing}
            onChange={(marketing) => setDraft((current) => ({ ...current, marketing }))}
          />

          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setView('summary')}
              disabled={isSaving}
            >
              {t('consent.back')}
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              data-testid="consent-save"
              onClick={() => void saveChoice(draft)}
              disabled={isSaving}
            >
              <Check aria-hidden="true" className="size-4" />
              {isSaving ? t('consent.saving') : t('consent.save')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            data-testid="consent-customize"
            onClick={() => setView('customize')}
            disabled={isSaving}
          >
            <Settings2 aria-hidden="true" className="size-4" />
            {t('consent.customize')}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-testid="consent-reject"
            onClick={() => void saveChoice({ analytics: false, marketing: false })}
            disabled={isSaving}
          >
            {isSaving ? t('consent.saving') : t('consent.rejectAll')}
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            data-testid="consent-accept"
            onClick={() => void saveChoice({ analytics: true, marketing: true })}
            disabled={isSaving}
          >
            {isSaving ? t('consent.saving') : t('consent.acceptAll')}
          </Button>
        </div>
      )}
    </div>
  )
}

export function CookieConsentBanner() {
  const { bannerOpen } = useConsent()
  return bannerOpen ? <ConsentBannerContent /> : null
}

/** Persistent footer control that reopens the banner (never a dead link). */
export function CookieSettingsButton({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { openSettings } = useConsent()

  return (
    <button
      type="button"
      onClick={openSettings}
      data-testid="cookie-settings-button"
      className={cn(
        'font-mono text-sm text-muted-foreground transition-colors hover:text-foreground',
        className
      )}
    >
      {t('consent.settings')}
    </button>
  )
}
