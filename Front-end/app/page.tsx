import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Gallery } from "@/components/sections/gallery"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { MapSection } from "@/components/sections/map"
import { Footer } from "@/components/layout/footer"
import { SkipLink } from "@/components/ui/skip-link"

export default function Home() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <Hero />
        <About />
        <Gallery />
        <Projects />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </>
  )
}
