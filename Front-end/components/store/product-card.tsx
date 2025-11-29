"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  artist: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price)
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      addToCart(product)
      setJustAdded(true)
      toast({
        title: "¡Agregado al carrito!",
        description: `${product.name} se agregó correctamente`,
        variant: "success",
        duration: 3000,
      })
      setTimeout(() => setJustAdded(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-lg hover:border-stone-300 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-stone-800 mb-2 group-hover:text-red-700 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-stone-600 text-sm mb-2 font-medium">por {product.artist}</p>
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-700 bg-red-50 px-3 py-1 rounded-lg">
            {formatPrice(product.price)}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={isAdding || justAdded}
            className={`
              transition-all duration-300 min-w-[120px]
              ${
                justAdded
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-700 hover:bg-red-800 text-white hover:scale-105"
              }
            `}
          >
            {isAdding ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : justAdded ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <ShoppingCart className="h-4 w-4 mr-2" />
            )}
            {isAdding ? "Agregando..." : justAdded ? "¡Agregado!" : "Agregar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
