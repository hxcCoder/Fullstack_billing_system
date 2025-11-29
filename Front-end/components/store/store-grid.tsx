"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { fetchProducts } from "@/lib/google-sheets"

const categories = [
  { id: "all", name: "Todas" },
  { id: "ceramica", name: "Cerámica" },
  { id: "pintura", name: "Pintura" },
  { id: "artesania", name: "Artesanía" },
]

const fallbackProducts = [
  {
    id: 1,
    name: "Jarrón de Cerámica Artesanal",
    price: 45000,
    image: "/ceramic-vase-handmade.png",
    category: "ceramica",
    artist: "María González",
    description: "Hermoso jarrón de cerámica hecho a mano",
    available: true,
  },
  {
    id: 2,
    name: "Pintura Paisaje Patagónico",
    price: 120000,
    image: "/patagonian-landscape-painting.png",
    category: "pintura",
    artist: "Carlos Mendoza",
    description: "Óleo sobre lienzo del paisaje patagónico",
    available: true,
  },
  {
    id: 3,
    name: "Textil Mapuche Contemporáneo",
    price: 85000,
    image: "/mapuche-textile-contemporary.png",
    category: "artesania",
    artist: "Ana Huenul",
    description: "Textil inspirado en tradiciones mapuches",
    available: true,
  },
  {
    id: 4,
    name: "Escultura en Madera Nativa",
    price: 95000,
    image: "/native-wood-sculpture.png",
    category: "artesania",
    artist: "Roberto Silva",
    description: "Escultura tallada en madera nativa",
    available: true,
  },
]

export function StoreGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const sheetsProducts = await fetchProducts()
        if (sheetsProducts.length > 0) {
          setProducts(sheetsProducts)
        }
      } catch (error) {
        console.error("Error loading products:", error)
        // Keep fallback products if Google Sheets fails
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts =
    selectedCategory === "all"
      ? products.filter((p) => p.available !== false)
      : products.filter((product) => product.category === selectedCategory && product.available !== false)

  const itemsPerSlide = filteredProducts.length >= 3 ? 3 : 2
  const totalSlides = Math.ceil(filteredProducts.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-500">Cargando productos...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(category.id)
              setCurrentIndex(0)
            }}
            className={
              selectedCategory === category.id
                ? "bg-red-700 hover:bg-red-800 text-white"
                : "border-stone-300 text-stone-700 hover:bg-stone-50"
            }
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Products Carousel */}
      {filteredProducts.length > 0 ? (
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 flex justify-center gap-6 px-4">
                  {filteredProducts
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((product) => (
                      <div key={product.id} className="flex-1 max-w-sm">
                        <ProductCard product={product} />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-red-700 hover:text-red-800 transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-red-700 hover:text-red-800 transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

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
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-stone-500">No hay productos en esta categoría.</p>
        </div>
      )}
    </div>
  )
}
