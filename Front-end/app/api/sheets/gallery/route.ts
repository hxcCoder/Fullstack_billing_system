import { NextResponse } from "next/server"

interface GalleryItem {
  id: number
  title: string
  artist: string
  description: string
  image: string
  year?: string
}

export async function GET() {
  try {
    // URL de tu backend que devuelve items de galería
    const response = await fetch("http://localhost:8000/gallery")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    const gallery: GalleryItem[] = data.map((item: any, index: number) => ({
      id: item.id || index + 1,
      title: item.title || "",
      artist: item.artist || "",
      description: item.description || "",
      image: item.image || "",
      year: item.year || "",
    }))

    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json([])
  }
}
