"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X, Plus, Minus, MessageCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"

export function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { state, removeFromCart, updateQuantity, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price)
  }

  const handleCheckout = () => {
    const itemsList = state.items
      .map((item) => `• ${item.name} (${item.artist}) - ${formatPrice(item.price)} x ${item.quantity}`)
      .join("\n")

    const message = `Hola! Me interesa comprar las siguientes obras de CASA Tejuela:

${itemsList}

Total: ${formatPrice(state.total)}

Por favor, contáctame para coordinar la compra.`

    // Crear enlaces de contacto
    const whatsappUrl = `https://wa.me/56652345678?text=${encodeURIComponent(message)}`
    const emailUrl = `mailto:info@casatejuela.cl?subject=Consulta de Compra - CASA Tejuela&body=${encodeURIComponent(message)}`

    // Mostrar opciones de contacto
    const userChoice = confirm("¿Cómo te gustaría contactarnos?\n\nOK = WhatsApp\nCancelar = Email")

    if (userChoice) {
      window.open(whatsappUrl, "_blank")
    } else {
      window.location.href = emailUrl
    }
  }

  return (
    <>
      {/* Cart Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-40 bg-white border-stone-300 text-stone-700 hover:bg-stone-50"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {state.itemCount > 0 && (
          <span className="bg-red-700 text-white text-xs rounded-full px-2 py-1 ml-1">{state.itemCount}</span>
        )}
      </Button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />

          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-stone-200">
                <h2 className="text-lg font-semibold text-stone-800">Carrito de Compras</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {state.items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-stone-50 p-4 rounded-lg">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-stone-800 truncate">{item.name}</h3>
                          <p className="text-xs text-stone-600">por {item.artist}</p>
                          <p className="text-sm font-semibold text-red-700">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t border-stone-200 p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-stone-800">Total:</span>
                    <span className="text-xl font-bold text-red-700">{formatPrice(state.total)}</span>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                    <p className="font-medium mb-1">💬 Proceso de Compra Simple</p>
                    <p>Te contactaremos por WhatsApp o email para coordinar el pago y entrega</p>
                  </div>

                  <Button onClick={handleCheckout} className="w-full bg-red-700 hover:bg-red-800 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contactar para Comprar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent"
                  >
                    Vaciar Carrito
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
