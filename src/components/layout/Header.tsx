import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { cn } from '@/lib/utils'

export function Header() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { key: 'home', href: '#' },
    { key: 'about', href: '#about' },
    { key: 'shop', href: '#shop' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight">
            tigre tigre
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <Button size="sm">{t('hero.shopNow')}</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden border-t border-border bg-background overflow-hidden transition-all duration-300',
          isMenuOpen ? 'max-h-64' : 'max-h-0'
        )}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
          <Button size="sm" className="w-full mt-2">
            {t('hero.shopNow')}
          </Button>
        </nav>
      </div>
    </header>
  )
}
