"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: "/modern-cultural-gallery-interior-with-art-displays.png",
      alt: "Gallery space",
    },
    {
      id: 2,
      image: "/art-exhibition-space-with-local-artwork.png",
      alt: "Art exhibition",
    },
    {
      id: 3,
      image: "/cultural-center-facade-building-architecture.png",
      alt: "Cultural center",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const scrollToNext = () => {
    const nextSection = document.getElementById("about")
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary w-8 neon-glow" : "bg-muted-foreground hover:bg-primary/70"
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 translate-y-16 text-primary hover:text-primary/80 transition-all duration-300 animate-bounce neon-glow"
        aria-label="Scroll to next section"
      >
        <ArrowDown className="h-8 w-8" />
      </button>
    </section>
  )
}
