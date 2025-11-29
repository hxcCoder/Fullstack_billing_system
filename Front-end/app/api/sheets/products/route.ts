import { NextResponse } from "next/server"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  artist: string
  category: string
  available: boolean
}

export async function GET() {
  try {
    // URL de tu backend Flask
    const response = await fetch("http://localhost:8000/productos")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()

    // Adaptar datos a lo que tu frontend espera
    const products: Product[] = data.map((item: any, index: number) => ({
      id: item.id_producto || item.id || index + 1,
      name: item.nombre || "",
      price: Number(item.precio) || 0,
      image: item.image || "",
      description: item.descripcion || "",
      artist: item.artist || "",
      category: item.category || "",
      available: item.available ?? true,
    }))

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json([])
  }
}
