"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  artist: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
  error: string | null
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }

const CartContext = createContext<{
  state: CartState
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          error: null,
        }
      }

      const newItems = [...state.items, { ...action.payload, quantity: 1 }]
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        error: null,
      }
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        error: null,
      }
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        error: null,
      }
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        error: null,
      }

    case "LOAD_CART": {
      return {
        ...state,
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0),
        isLoading: false,
        error: null,
      }
    }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") return null

    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error("[v0] Error reading from localStorage:", error)
      return null
    }
  },

  setItem: (key: string, value: string): boolean => {
    if (typeof window === "undefined") return false

    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.error("[v0] Error writing to localStorage:", error)
      return false
    }
  },

  removeItem: (key: string): boolean => {
    if (typeof window === "undefined") return false

    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error("[v0] Error removing from localStorage:", error)
      return false
    }
  },
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const loadCart = async () => {
      dispatch({ type: "SET_LOADING", payload: true })

      try {
        const savedCart = safeLocalStorage.getItem("casa-tejuela-cart")

        if (savedCart) {
          const cartItems = JSON.parse(savedCart)

          // Validate cart data structure
          if (Array.isArray(cartItems)) {
            const validItems = cartItems.filter(
              (item) => item && typeof item.id === "number" && typeof item.quantity === "number" && item.quantity > 0,
            )

            dispatch({ type: "LOAD_CART", payload: validItems })
          } else {
            throw new Error("Invalid cart data format")
          }
        } else {
          dispatch({ type: "SET_LOADING", payload: false })
        }
      } catch (error) {
        console.error("[v0] Error loading cart from localStorage:", error)
        dispatch({ type: "SET_ERROR", payload: "Error al cargar el carrito" })

        // Clear corrupted data
        safeLocalStorage.removeItem("casa-tejuela-cart")
      }
    }

    loadCart()
  }, [])

  useEffect(() => {
    if (!state.isLoading && state.error === null) {
      const success = safeLocalStorage.setItem("casa-tejuela-cart", JSON.stringify(state.items))

      if (!success) {
        dispatch({ type: "SET_ERROR", payload: "Error al guardar el carrito" })
      }
    }
  }, [state.items, state.isLoading, state.error])

  const addToCart = (product: Product) => {
    try {
      dispatch({ type: "ADD_TO_CART", payload: product })
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
      dispatch({ type: "SET_ERROR", payload: "Error al agregar producto al carrito" })
    }
  }

  const removeFromCart = (id: number) => {
    try {
      dispatch({ type: "REMOVE_FROM_CART", payload: id })
    } catch (error) {
      console.error("[v0] Error removing from cart:", error)
      dispatch({ type: "SET_ERROR", payload: "Error al eliminar producto del carrito" })
    }
  }

  const updateQuantity = (id: number, quantity: number) => {
    try {
      if (quantity <= 0) {
        removeFromCart(id)
      } else {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
      }
    } catch (error) {
      console.error("[v0] Error updating quantity:", error)
      dispatch({ type: "SET_ERROR", payload: "Error al actualizar cantidad" })
    }
  }

  const clearCart = () => {
    try {
      dispatch({ type: "CLEAR_CART" })
      safeLocalStorage.removeItem("casa-tejuela-cart")
    } catch (error) {
      console.error("[v0] Error clearing cart:", error)
      dispatch({ type: "SET_ERROR", payload: "Error al limpiar el carrito" })
    }
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
