import { Header } from './Header'
import { Footer } from './Footer'
import { useTranslation } from 'react-i18next'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:not-sr-only focus:border-2 focus:border-foreground focus:bg-background focus:px-4 focus:py-3 focus:font-mono focus:font-bold"
      >
        {t('a11y.skipToContent')}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-24 md:pt-28">
        {children}
      </main>
      <Footer />
    </div>
  )
}
