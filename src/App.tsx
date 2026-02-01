import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'

import { SplashPage } from '@/components/SplashPage'
import { NotFound } from '@/components/NotFound'
import { QrRedirect } from './components/QRRedirect'
import { ProductCTA } from './components/ProductCTA'

// Lazy load sections below the fold for better performance
// const AboutSection = lazy(() =>
//   import('@/components/sections').then((mod) => ({ default: mod.AboutSection }))
// )
const AboutScrollHighlightSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.AboutScrollHighlightSection }))
)
// const FeaturesSection = lazy(() =>
//   import('@/components/sections').then((mod) => ({ default: mod.FeaturesSection }))
// )
// const TestimonialsSection = lazy(() =>
//   import('@/components/sections').then((mod) => ({ default: mod.TestimonialsSection }))
// )
const CtaSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.CtaSection }))
)
const ContactSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.ContactSection }))
)
const BannerScrollerSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.BannerScrollerSection }))
)

const SubHeroTextRollerSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.SubHeroTextRollerSection }))
)

// const FirstTigerSection = lazy(() =>
//   import('@/components/sections').then((mod) => ({ default: mod.FirstTigerSection }))
// )
const FirstTigerScrollHighlightSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.FirstTigerScrollHighlightSection }))
)
// const HowToEatSection = lazy(() =>
//   import('@/components/sections').then((mod) => ({ default: mod.HowToEatSection }))
// )
const HowToEatScrollHighlightSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.HowToEatScrollHighlightSection }))
)

// const HeroSection = lazy(() =>
//   import('@/components/sections').then((mod) => ({ default: mod.HeroSection }))
// )

function HomePage() {
  return (
    <Layout>
      <Suspense fallback={<div className="min-h-screen" />}>
        <CtaSection />
        <SubHeroTextRollerSection />
        <FirstTigerScrollHighlightSection />
        <BannerScrollerSection />
        <HowToEatScrollHighlightSection />
        <ProductCTA />
        <AboutScrollHighlightSection />
        {/* <AboutSection /> */}
        {/* <HeroSection /> */}
        {/* <FeaturesSection /> */}
        {/* <TestimonialsSection /> */}
        <ContactSection />
      </Suspense>
    </Layout>
  )
}

function App() {
  // Show splash page ONLY on production domains (not staging or localhost)
  const hostname = window.location.hostname
  const isProductionDomain = hostname === 'tigre-tigre.com' || hostname === 'www.tigre-tigre.com'

  // Show splash page on production domain
  if (isProductionDomain) {
    return <SplashPage />
  }

  // Show full site with routing on staging domain and localhost
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/r/:code" element={<QrRedirect />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
