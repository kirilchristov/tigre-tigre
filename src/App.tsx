import { lazy, Suspense } from 'react'
import { LazySection } from '@/components/ui/lazy-section'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { env } from '@/lib/env'
import { GoogleAnalyticsTracker } from '@/components/GoogleAnalyticsTracker'
import { MetaPixelTracker } from '@/components/MetaPixelTracker'

// import { SplashPage } from '@/components/SplashPage'
import { NotFound } from '@/components/NotFound'
import { QrRedirect } from './components/QRRedirect'
import { ProductCTA } from '@/components/ProductCTA'
import { WaitlistEmbed } from '@/components/WaitlistEmbed'

const AboutScrollHighlightSection = lazy(() =>
  import('@/components/sections/AboutScrollHighlightSection').then((mod) => ({
    default: mod.AboutScrollHighlightSection,
  }))
)

const CtaSection = lazy(() =>
  import('@/components/sections/CtaSection').then((mod) => ({ default: mod.CtaSection }))
)
const ContactSection = lazy(() =>
  import('@/components/sections/ContactSection').then((mod) => ({ default: mod.ContactSection }))
)
const BannerScrollerSection = lazy(() =>
  import('@/components/sections/BannerScrollerSection').then((mod) => ({
    default: mod.BannerScrollerSection,
  }))
)

const SubHeroTextRollerSection = lazy(() =>
  import('@/components/sections/SubHeroTextRollerSection').then((mod) => ({
    default: mod.SubHeroTextRollerSection,
  }))
)

// const FirstTigerScrollHighlightSection = lazy(() =>
//   import('@/components/sections/FirstTigerScrollHighlightSection').then((mod) => ({
//     default: mod.FirstTigerScrollHighlightSection,
//   }))
// )

const WhatIsItSection = lazy(() =>
  import('@/components/sections/WhatIsItSection').then((mod) => ({
    default: mod.WhatIsItSection,
  }))
)

const HowToEatScrollHighlightSection = lazy(() =>
  import('@/components/sections/HowToEatScrollHighlightSection').then((mod) => ({
    default: mod.HowToEatScrollHighlightSection,
  }))
)

const ContentsSection = lazy(() =>
  import('@/components/sections/ContentsSection').then((mod) => ({
    default: mod.ContentsSection,
  }))
)

function HomePage() {
  const isSoldOut = env.soldOut.enabled

  return (
    <Layout>
      <Suspense fallback={<div className="min-h-screen" />}>
        <CtaSection isSoldOut={isSoldOut} footer={isSoldOut ? <WaitlistEmbed /> : <ProductCTA />} />
        {/* <SubHeroTextRollerSection /> */}
      </Suspense>
      {/* {!isSoldOut ? (
        <LazySection>
        <FirstTigerScrollHighlightSection />
        </LazySection>
        ) : null} */}

      <WhatIsItSection />
      <SubHeroTextRollerSection />

      <HowToEatScrollHighlightSection />

      <LazySection>
        <BannerScrollerSection />
      </LazySection>

      <ContentsSection />

      <AboutScrollHighlightSection
        footer={
          !isSoldOut && (
            <div className="pb-4">
              <ProductCTA />
            </div>
          )
        }
      />

      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>
    </Layout>
  )
}

function App() {
  // Show splash page ONLY on production domains (not staging or localhost)
  // const hostname = window.location.hostname
  // const isProductionDomain = hostname === 'tigre-tigre.com' || hostname === 'www.tigre-tigre.com'

  // Show splash page on production domain
  // if (isProductionDomain) {
  //   return <SplashPage />
  // }

  // Show full site with routing on staging domain and localhost
  return (
    <BrowserRouter>
      <GoogleAnalyticsTracker />
      <MetaPixelTracker />
      <Routes>
        <Route path="/r/:code" element={<QrRedirect />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
