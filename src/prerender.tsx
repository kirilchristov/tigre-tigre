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

export async function prerender() {
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <StaticRouter location="/">
        <Layout>
          <CtaSection footer={<ProductCTA />} />
          <SubHeroTextRollerSection />
          <WhatIsItSection />
          <HowToEatScrollHighlightSection />
          <BannerScrollerSection />
          <ContentsSection />
          <AboutScrollHighlightSection
            footer={<div className="pb-4"><ProductCTA /></div>}
          />
          <TestimonialsSection />
          <ProductCTA />
          <ContactSection />
        </Layout>
      </StaticRouter>
    </I18nextProvider>
  )

  return {
    html,
    head: { lang: i18n.language },
  }
}
