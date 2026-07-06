import { useTranslation } from 'react-i18next'
import { buildShopifyPolicyLinks } from '@/lib/shopify'
import { getNavItems } from './nav-items'

export function Footer() {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()
  const navItems = getNavItems()
  const policyLinks = buildShopifyPolicyLinks(i18n.resolvedLanguage ?? i18n.language)

  return (
    <footer className="py-12 border-t border-border bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          {/* Logo */}
          <a href="#" className="text-lg sm:text-xl font-bold tracking-tight">
            tigre tigre
          </a>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors font-mono"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-base text-muted-foreground font-mono">
            {t('footer.copyright', { year: currentYear })}
          </p>
        </div>

        <nav
          aria-label={t('footer.policiesLabel')}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-border pt-8 text-center"
        >
          {policyLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(`footer.policies.${link.key}`)}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
