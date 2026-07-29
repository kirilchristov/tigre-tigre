import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bg' : 'en'
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('lang', newLang)

    void i18n.changeLanguage(newLang)
    navigate(
      {
        pathname: location.pathname,
        search: `?${searchParams.toString()}`,
        hash: location.hash,
      },
      { replace: true }
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="font-medium"
      aria-label={i18n.language === 'en' ? 'Switch to Bulgarian' : 'Switch to English'}
    >
      {i18n.language === 'en' ? 'BG' : 'EN'}
    </Button>
  )
}
