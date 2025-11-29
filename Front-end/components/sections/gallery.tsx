"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryItems = [
    {
      id: 1,
      title: "Paisaje Patagónico",
      artist: "María González",
      description: "Óleo sobre lienzo que captura la belleza natural de la región",
      image: "/patagonian-landscape-oil-painting.png",
    },
    {
      id: 2,
      title: "Tejuelas Tradicionales",
      artist: "Carlos Mendoza",
      description: "Fotografía artística de la arquitectura local tradicional",
      image: "/traditional-wooden-shingles-architecture-photograp.png",
    },
    {
      id: 3,
      title: "Cultura Mapuche",
      artist: "Ana Huenul",
      description: "Textil contemporáneo inspirado en tradiciones ancestrales",
      image: "/mapuche-inspired-contemporary-textile-art.png",
    },
    {
      id: 4,
      title: "Puerto Montt Nocturno",
      artist: "Roberto Silva",
      description: "Acuarela que retrata la ciudad en la noche",
      image: "/puerto-montt-night-watercolor-painting.png",
    },
  ]

  const itemsPerSlide = 3
  const totalSlides = Math.ceil(galleryItems.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="gallery" className="py-20 bg-stone-100 underground-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-lg border border-orange-200 shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-6 bg-white/80"
                >
                  {galleryItems.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((artwork) => (
                    <article key={artwork.id} className="text-center group">
                      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-stone-50 border border-orange-100 group-hover:border-orange-300 transition-all duration-300 shadow-md group-hover:shadow-lg">
                        <Image
                          src={artwork.image || "/placeholder.svg"}
                          alt={`${artwork.title} por ${artwork.artist}. ${artwork.description}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-stone-800 tracking-wide">{artwork.title}</h3>
                        <p className="text-orange-600 font-semibold text-sm">por {artwork.artist}</p>
                        <p className="text-stone-600 text-sm leading-relaxed">{artwork.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white border border-orange-200 rounded-full shadow-lg flex items-center justify-center text-orange-600 hover:text-orange-700 hover:bg-orange-50 hover:shadow-xl transition-all duration-200"
                aria-label="Ver obras anteriores"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white border border-orange-200 rounded-full shadow-lg flex items-center justify-center text-orange-600 hover:text-orange-700 hover:bg-orange-50 hover:shadow-xl transition-all duration-200"
                aria-label="Ver obras siguientes"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? "bg-orange-500 w-8 shadow-md" : "bg-stone-400 hover:bg-orange-300"
                  }`}
                  aria-label={`Ir al grupo de obras ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/galeria"
            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl tracking-wide"
          >
            Ver toda la galería
          </Link>
        </div>
      </div>
    </section>
  )
}
