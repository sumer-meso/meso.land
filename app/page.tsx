import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { UnderConstruction } from "@/components/landing/under-construction"
import { Faq } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

/**
 * meso.land landing page.
 * Sections are assembled in display order; each one lives in components/landing/.
 * Focused narrative: Hero → Under-Construction Demo Teaser → FAQ → Footer.
 */
export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-slate-950 text-slate-100">
      {/* Sticky top navigation with anchor links and CTAs. */}
      <Header />

      <main className="flex flex-1 flex-col">
        {/* Hero: the sovereign identity story with Universal Entity Beacon. */}
        <Hero />
        {/* Interactive Protocol Playground: under construction teaser. */}
        <UnderConstruction />
        {/* Accordion FAQ. */}
        <Faq />
      </main>

      <Footer />
    </div>
  )
}
