import { lazy, Suspense } from 'react'
import { LazySection } from '@/components/ui/lazy-section'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { GoogleAnalyticsTracker } from '@/components/GoogleAnalyticsTracker'
import { MetaPixelTracker } from '@/components/MetaPixelTracker'

import { NotFound } from '@/components/NotFound'
import { ProductCTA } from '@/components/ProductCTA'

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

const TestimonialsSection = lazy(() =>
  import('@/components/sections/TestimonialsSection').then((mod) => ({
    default: mod.TestimonialsSection,
  }))
)

function HomePage() {
  return (
    <Layout>
      <Suspense fallback={<div className="min-h-screen" />}>
        <CtaSection footer={<ProductCTA />} />
        <SubHeroTextRollerSection />
      </Suspense>
      <WhatIsItSection />

      <LazySection>
        <BannerScrollerSection />
      </LazySection>
      <HowToEatScrollHighlightSection />
      <TestimonialsSection />
      <ContentsSection />
      <AboutScrollHighlightSection footer={<ProductCTA />} />
      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <GoogleAnalyticsTracker />
      <MetaPixelTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
