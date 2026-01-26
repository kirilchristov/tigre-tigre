import { Layout } from '@/components/layout'
import {
  HeroSection,
  AboutSection,
  FeaturesSection,
  TestimonialsSection,
  CtaSection,
  ContactSection,
} from '@/components/sections'

function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
      <ContactSection />
    </Layout>
  )
}

export default App
