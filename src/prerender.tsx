import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './lib/i18n'
import { Layout } from './components/layout'
import { ProductCTA } from './components/ProductCTA'
import { CtaSection } from './components/sections/CtaSection'
import { SubHeroTextRollerSection } from './components/sections/SubHeroTextRollerSection'
import { WhatIsItSection } from './components/sections/WhatIsItSection'
import { HowToEatScrollHighlightSection } from './components/sections/HowToEatScrollHighlightSection'
import { BannerScrollerSection } from './components/sections/BannerScrollerSection'
import { ContentsSection } from './components/sections/ContentsSection'
import { AboutScrollHighlightSection } from './components/sections/AboutScrollHighlightSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { ContactSection } from './components/sections/ContactSection'
import { PromoPage } from './features/promo/PromoPage'
import { getPageHeadElements, getPageMetadata } from './lib/page-metadata'

interface PrerenderArguments {
  url?: string
}

export async function prerender({ url = '/' }: PrerenderArguments = {}) {
  const requestedUrl = new URL(url, 'https://tigre-tigre.com')
  const { pathname, search } = requestedUrl
  const page =
    pathname === '/promo' ? (
      <PromoPage />
    ) : (
      <Layout>
        <CtaSection footer={<ProductCTA />} />
        <SubHeroTextRollerSection />
        <WhatIsItSection />
        <HowToEatScrollHighlightSection />
        <BannerScrollerSection />
        <ContentsSection />
        <AboutScrollHighlightSection
          footer={
            <div className="pb-4">
              <ProductCTA />
            </div>
          }
        />
        <TestimonialsSection />
        <ProductCTA />
        <ContactSection />
      </Layout>
    )

  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <StaticRouter location={`${pathname}${search}`}>{page}</StaticRouter>
    </I18nextProvider>
  )
  const language = i18n.resolvedLanguage ?? i18n.language
  const metadata = getPageMetadata(pathname, language, search)

  return {
    html,
    head: {
      lang: language,
      title: metadata.title,
      elements: getPageHeadElements(metadata),
    },
  }
}
