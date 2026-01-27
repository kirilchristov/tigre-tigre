import { lazy, Suspense } from 'react'
import { Layout } from '@/components/layout'
import { HeroSection } from '@/components/sections'
import { SplashPage } from '@/components/SplashPage'

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

function App() {
  // Check if we're on the production domain (not staging)
  const isProduction = window.location.hostname === 'tigre-tigre.com'

  // Show splash page on production domain
  if (isProduction) {
    return <SplashPage />
  }

  // Show full site on staging domain
  return (
    <Layout>
      <HeroSection />
      <Suspense fallback={<div className="min-h-screen" />}>
        <AboutSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
        <ContactSection />
      </Suspense>
    </Layout>
  )
}

export default App
