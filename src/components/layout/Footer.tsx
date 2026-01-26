import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="text-lg font-bold tracking-tight">
            tigre tigre
          </a>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.home')}
            </a>
            <a
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.about')}
            </a>
            <a
              href="#shop"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.shop')}
            </a>
            <a
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.contact')}
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
