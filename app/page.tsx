import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features, UseCases } from "@/components/landing/features"
import { DemoPreview } from "@/components/landing/demo-preview"
import { Faq } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

/**
 * meso.land landing page.
 * Sections are assembled in display order; each one lives in components/landing/.
 */
export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      {/* Sticky top navigation with anchor links and CTAs. */}
      <Header />

      <main className="flex flex-1 flex-col">
        {/* Hero: headline, actions, and core interface preview. */}
        <Hero />
        {/* Feature grid and use cases; the nav anchors target these sections. */}
        <Features />
        <UseCases />
        {/* Interactive tabbed demos. */}
        <DemoPreview />
        {/* Accordion FAQ. */}
        <Faq />
      </main>

      <Footer />
    </div>
  )
}
