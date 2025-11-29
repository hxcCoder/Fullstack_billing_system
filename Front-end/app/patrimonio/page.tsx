//aqui en patrimonio se muestra la pagina de patrimonio cultural en una aplicacion Next.js con soporte para multiples idiomas
// es una pagina estatica que utiliza componentes reutilizables para el heroe y el contenido.
"use client"

import { useLanguage } from "@/contexts/language-context"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeritageHero } from "@/components/heritage/heritage-hero"
import { HeritageContent } from "@/components/heritage/heritage-content"

export default function PatrimonioPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-8">
        <HeritageHero />
        <HeritageContent />
      </div>
      <Footer />
    </main>
  )
}
