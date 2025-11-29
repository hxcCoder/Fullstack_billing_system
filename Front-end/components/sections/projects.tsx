"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Projects() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      id: 1,
      title: "Memorias del Puerto",
      artist: "Elena Vargas",
      description:
        "Una colección fotográfica que documenta la evolución histórica del puerto de Puerto Montt a través de testimonios visuales.",
      image: "/puerto-montt-historical-photography.png",
      slug: "memorias-del-puerto",
    },
    {
      id: 2,
      title: "Textiles Ancestrales",
      artist: "Carmen Huenul",
      description: "Reinterpretación contemporánea de técnicas textiles mapuches, fusionando tradición y modernidad.",
      image: "/mapuche-textile-art-contemporary.png",
      slug: "textiles-ancestrales",
    },
    {
      id: 3,
      title: "Paisajes Volcánicos",
      artist: "Miguel Torres",
      description: "Serie de pinturas al óleo inspiradas en los volcanes y paisajes únicos de la región de Los Lagos.",
      image: "/volcanic-landscape-oil-painting.png",
      slug: "paisajes-volcanicos",
    },
    {
      id: 4,
      title: "Cerámica Contemporánea",
      artist: "Ana Morales",
      description:
        "Piezas únicas que combinan técnicas ancestrales con diseños modernos, reflejando la identidad local.",
      image: "/ceramic-vase-handmade.png",
      slug: "ceramica-contemporanea",
    },
    {
      id: 5,
      title: "Patagonia Infinita",
      artist: "Roberto Silva",
      description: "Paisajes patagónicos capturados en óleo, mostrando la majestuosidad de los territorios australes.",
      image: "/patagonian-landscape-painting.png",
      slug: "patagonia-infinita",
    },
  ]

  const projectsPerSlide = 2
  const totalSlides = Math.ceil(projects.length / projectsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentProjects = () => {
    const startIndex = currentIndex * projectsPerSlide
    return projects.slice(startIndex, startIndex + projectsPerSlide)
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{t("projects.title")}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t("projects.subtitle")}</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    {projects
                      .slice(slideIndex * projectsPerSlide, (slideIndex + 1) * projectsPerSlide)
                      .map((project) => (
                        <div key={project.id} className="group">
                          <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg bg-stone-100">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="space-y-4 text-center">
                            <h3 className="text-xl font-bold text-stone-800 group-hover:text-red-700 transition-colors duration-200">
                              {project.title}
                            </h3>
                            <p className="text-stone-600 font-medium">por {project.artist}</p>
                            <p className="text-stone-600 leading-relaxed text-sm">{project.description}</p>
                            <Link
                              href={`/proyectos/${project.slug}`}
                              className="inline-flex items-center text-red-700 font-medium hover:text-red-800 transition-colors duration-200 text-sm"
                            >
                              {t("projects.viewProject")} →
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-stone-600 hover:text-red-700 hover:shadow-xl transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-stone-600 hover:text-red-700 hover:shadow-xl transition-all duration-200"
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
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? "bg-red-700 w-8" : "bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/proyectos"
            className="inline-flex items-center px-6 py-3 border-2 border-red-700 text-red-700 font-medium rounded-lg hover:bg-red-700 hover:text-white transition-colors duration-200"
          >
            {t("projects.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  )
}
