export interface Artist {
  id: string
  name: string
  slug: string
  bio: string
  specialty: string
  image: string
  works: ArtWork[]
  featured: boolean
  socialLinks?: {
    instagram?: string
    website?: string
    email?: string
  }
}

export interface ArtWork {
  id: string
  title: string
  year: number
  medium: string
  dimensions?: string
  price?: number
  image: string
  description?: string
  available: boolean
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  inStock: boolean
  featured: boolean
  artist?: string
  dimensions?: string
  materials?: string[]
}

export interface GalleryItem {
  id: string
  title: string
  artist: string
  image: string
  year?: number
  medium?: string
  featured: boolean
}

export interface ContactForm {
  name: string
  email: string
  message: string
  subject?: string
  phone?: string
}

export interface Language {
  code: "es" | "en"
  name: string
  flag: string
}

export interface SiteContent {
  hero: {
    images: string[]
    title?: string
    subtitle?: string
  }
  about: {
    title: string
    content: string
    image?: string
  }
  gallery: GalleryItem[]
  artists: Artist[]
  products: Product[]
  heritage: {
    title: string
    content: string
    sections: {
      title: string
      content: string
      image?: string
    }[]
  }
}
