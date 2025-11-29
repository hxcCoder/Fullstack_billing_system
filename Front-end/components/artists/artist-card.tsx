"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

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

interface ArtistCardProps {
  artist: Artist
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const { t } = useLanguage()

  return (
    <Link href={`/artistas/${artist.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={artist.image || "/placeholder.svg"}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-stone-800 mb-2 group-hover:text-red-700 transition-colors duration-200">
            {artist.name}
          </h3>
          <p className="text-red-700 font-medium text-sm mb-3">{artist.specialty}</p>
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">{artist.bio}</p>
          <div className="mt-4">
            <span className="text-red-700 font-medium text-sm group-hover:text-red-800 transition-colors duration-200">
              {t("artists.viewPortfolio")} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
