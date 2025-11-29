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

interface GalleryItem {
  id: number
  title: string
  artist: string
  description: string
  image: string
  year?: string
}

interface Artist {
  id: number
  name: string
  bio: string
  image: string
  specialty: string
  slug: string
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("/api/sheets/products")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  try {
    const response = await fetch("/api/sheets/gallery")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return []
  }
}

export async function fetchArtists(): Promise<Artist[]> {
  try {
    const response = await fetch("/api/sheets/artists")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching artists:", error)
    return []
  }
}

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[áàäâ]/g, "a")
    .replace(/[éèëê]/g, "e")
    .replace(/[íìïî]/g, "i")
    .replace(/[óòöô]/g, "o")
    .replace(/[úùüû]/g, "u")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}
