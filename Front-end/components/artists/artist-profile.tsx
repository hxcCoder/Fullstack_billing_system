"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Artist {
  id: number
  name: string
  bio: string
  image: string
  specialty: string
  slug: string
  works: Array<{
    title: string
    image: string
    year: string
  }>
}

interface ArtistProfileProps {
  artist: Artist
}

export function ArtistProfile({ artist }: ArtistProfileProps) {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <div className="mb-8">
        <Button asChild variant="ghost" className="text-stone-600 hover:text-red-700">
          <Link href="/artistas">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("artists.backToArtists")}
          </Link>
        </Button>
      </div>

      {/* Artist Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-1">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-stone-100">
            <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-stone-800 mb-2">{artist.name}</h1>
            <p className="text-xl text-red-700 font-medium">{artist.specialty}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-stone-800 mb-4">{t("artists.biography")}</h2>
            <p className="text-stone-600 leading-relaxed text-lg">{artist.bio}</p>
          </div>
        </div>
      </div>

      {/* Artist Works */}
      <div>
        <h2 className="text-3xl font-bold text-stone-800 mb-8">{t("artists.works")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artist.works.map((work, index) => (
            <div key={index} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100 mb-4">
                <Image
                  src={work.image || "/placeholder.svg"}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-stone-800">{work.title}</h3>
                <p className="text-stone-600">{work.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Artist */}
      <div className="mt-16 bg-stone-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-stone-800 mb-4">{t("artists.interestedInWork")}</h3>
        <p className="text-stone-600 mb-6 max-w-2xl mx-auto">{t("artists.contactMessage")}</p>
        <Button asChild className="bg-red-700 hover:bg-red-800 text-white">
          <Link href="/contacto">{t("artists.contactUs")}</Link>
        </Button>
      </div>
    </div>
  )
}
