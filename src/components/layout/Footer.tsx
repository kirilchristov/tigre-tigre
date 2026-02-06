import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  const navItems = [
    { key: 'home', href: '#' },
    { key: 'firstTiger', href: '#first-tiger-highlight' },
    { key: 'howTo', href: '#howto-highlight' },
    { key: 'about', href: '#about-highlight' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <footer className="py-12 border-t border-border bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
          <p className="text-base text-muted-foreground font-mono">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
