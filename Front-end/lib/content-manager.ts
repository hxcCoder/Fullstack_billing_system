import { db } from "./database"
import type { Artist, Product, GalleryItem, SiteContent } from "./types"

export class ContentManager {
  // Artists management
  static async getAllArtists(): Promise<Artist[]> {
    return await db.getArtists()
  }

  static async getFeaturedArtists(): Promise<Artist[]> {
    const artists = await db.getArtists()
    return artists.filter((artist) => artist.featured)
  }

  static async getArtistBySlug(slug: string): Promise<Artist | null> {
    return await db.getArtistBySlug(slug)
  }

  static async addArtist(artistData: Omit<Artist, "id">): Promise<Artist> {
    return await db.createArtist(artistData)
  }

  static async updateArtist(id: string, updates: Partial<Artist>): Promise<Artist> {
    return await db.updateArtist(id, updates)
  }

  static async removeArtist(id: string): Promise<void> {
    await db.deleteArtist(id)
  }

  // Products management
  static async getAllProducts(): Promise<Product[]> {
    return await db.getProducts()
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    const products = await db.getProducts()
    return products.filter((product) => product.featured)
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.getProductsByCategory(category)
  }

  static async addProduct(productData: Omit<Product, "id">): Promise<Product> {
    return await db.createProduct(productData)
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    return await db.updateProduct(id, updates)
  }

  static async removeProduct(id: string): Promise<void> {
    await db.deleteProduct(id)
  }

  // Gallery management
  static async getAllGalleryItems(): Promise<GalleryItem[]> {
    return await db.getGalleryItems()
  }

  static async getFeaturedGalleryItems(): Promise<GalleryItem[]> {
    return await db.getFeaturedGalleryItems()
  }

  static async addGalleryItem(itemData: Omit<GalleryItem, "id">): Promise<GalleryItem> {
    return await db.createGalleryItem(itemData)
  }

  static async updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem> {
    return await db.updateGalleryItem(id, updates)
  }

  static async removeGalleryItem(id: string): Promise<void> {
    await db.deleteGalleryItem(id)
  }

  // Utility methods
  static async getHomePageContent(): Promise<SiteContent> {
    const [gallery, artists, products] = await Promise.all([
      this.getFeaturedGalleryItems(),
      this.getFeaturedArtists(),
      this.getFeaturedProducts(),
    ])

    return {
      hero: {
        images: ["/puerto-montt-cultural-gallery-exterior.png", "/traditional-chilean-artwork-display.png", "/local-artisan-workshop.png"],
      },
      about: {
        title: "Nuestra Historia",
        content:
          "CASA Tejuela es más que una galería; es un espacio donde convergen la tradición y la innovación artística de Puerto Montt.",
      },
      gallery,
      artists,
      products,
      heritage: {
        title: "Patrimonio Cultural",
        content: "Descubre la rica herencia cultural de Puerto Montt y la arquitectura de tejuela.",
        sections: [],
      },
    }
  }
}
