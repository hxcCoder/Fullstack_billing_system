"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ArtistProfile } from "@/components/artists/artist-profile"

interface Artist {
  id: number
  name: string
  bio: string
  image: string
  specialty: string
  slug: string
  active: boolean
}

interface ArtistPageProps {
  params: { slug: string }
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const { t } = useLanguage()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArtist() {
      try {
        const res = await fetch("/api/artists")
        const data: Artist[] = await res.json()
        const found = data.find((a) => a.slug === params.slug)
        setArtist(found || null)
      } catch (error) {
        console.error("Error fetching artist:", error)
        setArtist(null)
      } finally {
        setLoading(false)
      }
    }

    fetchArtist()
  }, [params.slug])

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-8 text-center">Cargando...</div>
        <Footer />
      </main>
    )
  }

  if (!artist) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-stone-800 mb-4">{t("artists.notFound")}</h1>
              <p className="text-stone-600">{t("artists.notFoundMessage")}</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-8">
        <ArtistProfile artist={artist} />
      </div>
      <Footer />
    </main>
  )
}
