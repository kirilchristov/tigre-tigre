import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import i18n from '@/lib/i18n'
import { PromoPage } from '../PromoPage'

function renderPromoPage() {
  return render(
    <MemoryRouter initialEntries={['/promo']}>
      <PromoPage />
    </MemoryRouter>
  )
}

function expectVisibleCopy(copy: readonly string[]) {
  for (const text of copy) {
    expect(screen.getAllByText(text)[0]).toBeVisible()
  }
}

describe('PromoPage', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('bg')
  })

  afterEach(async () => {
    await i18n.changeLanguage('bg')
  })

  it('renders the approved Bulgarian brochure content and four bundles', () => {
    const { container } = renderPromoPage()

    expect(screen.getByRole('heading', { level: 1, name: 'ОКЕЙ НАМАЛЕНИЯ' })).toBeVisible()
    expectVisibleCopy([
      'до',
      '-15%',
      '*на избрани количества буркани',
      'Вземи повече буркани и получи едно напълно окей намаление.',
      'ориз, нудъли, яйца',
      'шкембе и рибена чорба',
      '1 буркан',
      'за да опиташ',
      '2 буркана',
      'за да си спестиш доставката',
      '3 буркана',
      'за да има',
      '6 буркана',
      'за наши хора',
      'Вземи 2 буркана',
      'Получаваш:',
      'резервен буркан',
      'Вземи 6 буркана',
      'спестяваш 5 доставки',
      '100% безсрамно вкусно',
      '2/5 люто',
    ])

    const cards = screen.getAllByTestId('promo-bundle-card')
    expect(cards).toHaveLength(4)
    expect(within(cards[0]).getByText('€7.99')).toBeVisible()
    expect(within(cards[1]).getByText('€15.98')).toBeVisible()
    expect(within(cards[2]).getByText('€21.60')).toBeVisible()
    expect(within(cards[3]).getByText('€40.80')).toBeVisible()
    for (const [card, savings] of [
      [cards[1], 'Спестяваш €1.74'],
      [cards[2], 'Спестяваш €4.11'],
      [cards[3], 'Спестяваш €8.88'],
    ] as const) {
      expect(within(card).getByText(savings)).toHaveClass('font-bold', 'text-brand-600')
    }

    const tooltipCases = [
      {
        card: cards[1],
        triggerName: 'Как се изчислява „Спестяваш €1.74“',
        id: 'promo-savings-tooltip-duo',
        explanation: 'Спестяваш €1.74 (€1.74 доставка)',
      },
      {
        card: cards[2],
        triggerName: 'Как се изчислява „Спестяваш €4.11“',
        id: 'promo-savings-tooltip-trio',
        explanation: 'Спестяваш €4.11 (€2.37 отстъпка + €1.74 доставка)',
      },
      {
        card: cards[3],
        triggerName: 'Как се изчислява „Спестяваш €8.88“',
        id: 'promo-savings-tooltip-six',
        explanation: 'Спестяваш €8.88 (€7.14 отстъпка + €1.74 доставка)',
      },
    ] as const

    for (const { card, triggerName, id, explanation } of tooltipCases) {
      const savingsTrigger = within(card).getByRole('button', { name: triggerName })
      const savingsTooltip = within(card).getByRole('tooltip')

      expect(savingsTrigger).toHaveAttribute('aria-describedby', id)
      expect(savingsTooltip).toHaveAttribute('id', id)
      expect(savingsTooltip).toHaveClass('group-hover:block', 'group-focus-within:block')
      expect(savingsTooltip).toHaveTextContent(explanation)
      expect(savingsTooltip).not.toHaveTextContent('Как се изчисляват спестяванията')
      expect(savingsTooltip).not.toHaveTextContent(/буркана|плащаш|→/)
    }

    expect(within(cards[0]).queryByText('общо')).not.toBeInTheDocument()
    expect(within(cards[1]).queryByText('общо')).not.toBeInTheDocument()
    expect(within(cards[2]).queryByText('общо')).not.toBeInTheDocument()
    expect(within(cards[3]).queryByText('общо')).not.toBeInTheDocument()

    expect(within(cards[2]).getByText('€23.97')).toHaveClass('line-through')
    expect(within(cards[3]).getByText('€47.94')).toHaveClass('line-through')
    expect(within(cards[0]).queryByText('€7.99', { selector: '.line-through' })).toBeNull()
    expect(within(cards[1]).queryByText('€15.98', { selector: '.line-through' })).toBeNull()

    const headings = Array.from(container.querySelectorAll('h1, h2, h3'))
    expect(headings[0]).toHaveTextContent('ОКЕЙ НАМАЛЕНИЯ')
    expect(headings[0].tagName).toBe('H1')

    expect(screen.getByRole('link', { name: 'Към основното съдържание' })).toHaveAttribute(
      'href',
      '#main-content'
    )
    expect(screen.getByAltText('Буркан tigre tigre чили крънч')).toHaveAttribute(
      'src',
      '/images/promo/one.webp'
    )
    expect(container.querySelector('main')).toHaveAttribute('id', 'main-content')
  })

  it('links every bundle to its Shopify cart safely with the homepage CTA treatment', () => {
    renderPromoPage()

    const expectedLinks = [
      {
        name: 'Към магазина — 1 буркан',
        href: 'https://shop.tigre-tigre.com/cart/56986218955100:1',
      },
      {
        name: 'Към магазина — 2 буркана',
        href: 'https://shop.tigre-tigre.com/cart/56986218955100:2',
      },
      {
        name: 'Към магазина — 3 буркана',
        href: 'https://shop.tigre-tigre.com/cart/56986218955100:3',
      },
      {
        name: 'Към магазина — 6 буркана',
        href: 'https://shop.tigre-tigre.com/cart/56986218955100:6',
      },
    ] as const

    for (const { name, href } of expectedLinks) {
      const link = screen.getByRole('link', { name })

      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link).toHaveClass(
        'bg-destructive',
        'text-destructive-foreground',
        'h-11',
        'w-full',
        'group'
      )

      const icon = link.querySelector('.lucide-arrow-right')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-hidden', 'true')
      expect(icon).toHaveClass(
        'transition-transform',
        'duration-200',
        'ease-out',
        'group-hover:translate-x-1'
      )
    }
  })

  it('renders the English adaptation through the existing locale system', async () => {
    await i18n.changeLanguage('en')
    renderPromoPage()

    expect(screen.getByRole('heading', { level: 1, name: 'OKAY DISCOUNTS' })).toBeVisible()
    expectVisibleCopy([
      'up to',
      '15% off',
      '*on selected jar quantities',
      'Grab more jars and get a perfectly okay discount.',
      'rice, noodles, eggs',
      'tripe soup and fish soup',
      '1 jar',
      'to give it a try',
      '2 jars',
      'to save the delivery',
      '3 jars',
      'so there is always some',
      '6 jars',
      'for our people',
      'Get 2 jars',
      'You get:',
      'a backup jar',
      'Get 6 jars',
      'save 5 deliveries',
      '100% shamelessly delicious',
      '2/5 heat',
    ])
    for (const name of [
      'Go to shop — 1 jar',
      'Go to shop — 2 jars',
      'Go to shop — 3 jars',
      'Go to shop — 6 jars',
    ]) {
      expect(screen.getByRole('link', { name })).toBeVisible()
    }
    expect(
      screen.getByRole('button', { name: 'How “You save €4.11” is calculated' })
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content'
    )
  })
})
