export interface NavItem {
  key: 'home' | 'firstTiger' | 'howTo' | 'content' | 'about' | 'contact' | 'whatIsThis' | 'testimonials'
  href: string
}

const baseNavItems: NavItem[] = [
  { key: 'home', href: '#' },
  // { key: 'firstTiger', href: '#first-tiger-highlight' },
  { key: 'whatIsThis', href: '#what-is-it' },
  { key: 'howTo', href: '#howto-highlight' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'content', href: '#content' },
  { key: 'about', href: '#about-highlight' },
  { key: 'contact', href: '#contact' },
]

export function getNavItems(): NavItem[] {
  return baseNavItems
}
