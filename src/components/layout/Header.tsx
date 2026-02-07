import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'

export function Header() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { key: 'home', href: '#' },
    { key: 'firstTiger', href: '#first-tiger-highlight' },
    { key: 'howTo', href: '#howto-highlight' },
    { key: 'about', href: '#about-highlight' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight min-h-[44px] flex items-center"
          >
            tigre tigre
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden border-t border-border bg-background overflow-hidden transition-all duration-300',
          isMenuOpen ? 'max-h-screen' : 'max-h-0'
        )}
      >
        <nav
          className="flex flex-col px-4 py-4 gap-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="font-mono text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2 min-h-[44px] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
          {/* <Button size="sm" className="w-full mt-2 min-h-[44px]" asChild>
            <a href="#shop" onClick={() => setIsMenuOpen(false)}>
              {t('hero.shopNow')}
            </a>
          </Button> */}
        </nav>
      </div>
    </header>
  )
}
