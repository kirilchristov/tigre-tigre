export interface NavItem {
  key: 'home' | 'howTo' | 'content' | 'about' | 'contact' | 'whatIsThis' | 'testimonials'
  href: string
}

export const navItems: NavItem[] = [
  { key: 'home', href: '#' },
  { key: 'whatIsThis', href: '#what-is-it' },
  { key: 'howTo', href: '#howto-highlight' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'content', href: '#content' },
  { key: 'about', href: '#about-highlight' },
  { key: 'contact', href: '#contact' },
]

export function resolveNavHref(pathname: string, href: string) {
  const isHome = pathname === '/'

  if (isHome) {
    return href
  }

  return href === '#' ? '/' : `/${href}`
}
