import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { HeroSection } from '@/components/sections'
import { SplashPage } from '@/components/SplashPage'
import { NotFound } from '@/components/NotFound'

// Lazy load sections below the fold for better performance
const AboutSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.AboutSection }))
)
const FeaturesSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.FeaturesSection }))
)
const TestimonialsSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.TestimonialsSection }))
)
const CtaSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.CtaSection }))
)
const ContactSection = lazy(() =>
  import('@/components/sections').then((mod) => ({ default: mod.ContactSection }))
)

const BannerScrollerSection = lazy(() =>
  import('./components/BannerScroller').then((mod) => ({ default: mod.default }))
)

const TextScrollerSection = lazy(() =>
  import('./components/TextScroller').then((mod) => ({ default: mod.default }))
)

function HomePage() {
  return (
    <Layout>
      <CtaSection />
      <Suspense fallback={<div className="min-h-screen" />}>
        <TextScrollerSection
          texts={['безсрамно вкусно', 'безсрамно вкусно', 'безсрамно вкусно']}
          speed={60}
          direction="right"
          textClassName="text-6xl font-black text-red-600"
        />
        <AboutSection />
        <BannerScrollerSection />
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
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
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
