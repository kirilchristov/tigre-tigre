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

  it('renders the approved Bulgarian brochure content and three flexible bundle cards', () => {
    const { container } = renderPromoPage()

    expect(screen.getByRole('heading', { level: 1, name: 'ОКЕЙ НАМАЛЕНИЯ' })).toBeVisible()
    expectVisibleCopy([
      'до',
      '-15%',
      '*на избрани количества буркани',
      'Вземи повече буркани и получи едно напълно окей намаление.',
      'Сложи върху:',
      'ориз, нудъли, яйца',
      'шкембе и рибена чорба',
      '100% безсрамно вкусно',
      '2/5 люто',
    ])
    expect(screen.getByRole('heading', { level: 2, name: 'Сложи върху:' })).not.toHaveClass(
      'lowercase'
    )

    const cards = screen.getAllByTestId('promo-bundle-card')
    expect(cards).toHaveLength(3)
    expect(screen.queryByRole('heading', { level: 3, name: '1 буркан' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Към магазина — 1 буркан' })).not.toBeInTheDocument()
    expect(within(cards[0]).getByText('€15.98')).toBeVisible()
    expect(within(cards[1]).getByText('€21.60')).toBeVisible()
    expect(within(cards[2]).getByText('€40.80')).toBeVisible()
    const discountBursts = screen.getAllByTestId('promo-discount-burst')
    expect(discountBursts).toHaveLength(2)
    expect(within(discountBursts[0]).getByText('-10%')).toHaveClass('bg-gold', 'text-white')
    expect(within(discountBursts[1]).getByText('-15%')).toHaveClass(
      'bg-brand-700',
      'text-white'
    )
    for (const burst of discountBursts) {
      expect(burst).toHaveClass(
        'promo-discount-burst',
        'h-40',
        'w-48',
        'bg-black',
        'p-[4px]'
      )
      expect(burst.firstElementChild).toHaveClass('text-4xl')
      expect(burst).toHaveClass('absolute', 'right-0', 'top-0', 'z-10')
      expect(burst.parentElement).toHaveAttribute('data-testid', 'promo-bundle-visual')
      expect(burst).not.toHaveClass('border-2', 'min-w-16')
    }
    for (const priceRow of screen.getAllByTestId('promo-bundle-price-row')) {
      expect(priceRow).toHaveClass('relative', 'z-30')
    }
    for (const imageStage of screen.getAllByTestId('promo-bundle-image-stage')) {
      expect(imageStage).toHaveClass('relative')
      expect(imageStage.querySelector('img')).toHaveClass('relative', 'z-20')
    }
    const bundleDetails = [
      {
        card: cards[0],
        title: '2 буркана:',
        items: ['за да си спестиш доставката', 'резервен буркан', 'кратко спокойствие'],
      },
      {
        card: cards[1],
        title: '3 буркана:',
        items: ['-10% отстъпка', 'три за щастие', 'за да има за по-дълго'],
      },
      {
        card: cards[2],
        title: '6 буркана:',
        items: ['-15% отстъпка', 'спестяваш 6 доставки', 'ще остане и за почерпка'],
      },
    ] as const

    for (const { card, title, items } of bundleDetails) {
      expect(within(card).getByRole('heading', { level: 3, name: title })).toBeVisible()
      const list = within(card).getByRole('list')
      expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual(items)
    }

    expect(screen.queryByRole('heading', { name: 'Вземи 2 буркана' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Вземи 6 буркана' })).not.toBeInTheDocument()
    expect(screen.queryByText('Получаваш:')).not.toBeInTheDocument()
    for (const [card, savings] of [
      [cards[0], 'Спестяваш €1.74'],
      [cards[1], 'Спестяваш €4.11'],
      [cards[2], 'Спестяваш €8.88'],
    ] as const) {
      expect(within(card).getByText(savings)).toHaveClass('font-bold', 'text-brand-600')
    }

    const tooltipCases = [
      {
        card: cards[0],
        triggerName: 'Как се изчислява „Спестяваш €1.74“',
        id: 'promo-savings-tooltip-duo',
        explanation: 'Спестяваш €1.74 (€1.74 доставка)',
      },
      {
        card: cards[1],
        triggerName: 'Как се изчислява „Спестяваш €4.11“',
        id: 'promo-savings-tooltip-trio',
        explanation: 'Спестяваш €4.11 (€2.37 отстъпка + €1.74 доставка)',
      },
      {
        card: cards[2],
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

    for (const card of cards) {
      expect(within(card).queryByText('общо')).not.toBeInTheDocument()
    }

    expect(within(cards[1]).getByText('€23.97')).toHaveClass('line-through')
    expect(within(cards[2]).getByText('€47.94')).toHaveClass('line-through')
    expect(within(cards[0]).queryByText('€15.98', { selector: '.line-through' })).toBeNull()

    expect(screen.getByTestId('promo-bundle-grid')).toHaveClass(
      'grid',
      'sm:grid-cols-2',
      'lg:grid-cols-3'
    )

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
      'Put it on:',
      'rice, noodles, eggs',
      'tripe soup and fish soup',
      '100% shamelessly delicious',
      '2/5 heat',
    ])
    const englishCards = screen.getAllByTestId('promo-bundle-card')
    for (const { card, title, items } of [
      {
        card: englishCards[0],
        title: '2 jars:',
        items: ['to save on delivery', 'a backup jar', 'brief peace of mind'],
      },
      {
        card: englishCards[1],
        title: '3 jars:',
        items: ['10% off', 'three’s a charm', 'to last longer'],
      },
      {
        card: englishCards[2],
        title: '6 jars:',
        items: ['15% off', 'save 6 deliveries', 'enough left to share'],
      },
    ] as const) {
      expect(within(card).getByRole('heading', { level: 3, name: title })).toBeVisible()
      const list = within(card).getByRole('list')
      expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual(items)
    }
    for (const name of [
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
