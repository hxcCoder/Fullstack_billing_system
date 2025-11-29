//aqui en tienda se muestra la pagina de tienda en una aplicacion Next.js con soporte para multiples idiomas
//y utiliza un componente reutilizable para mostrar una cuadricula de productos.
//los datos llegan desde un archivo JSON.
import { StoreGrid } from "@/components/store/store-grid"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function TiendaPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-stone-800 mb-4">Tienda</h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Descubre y adquiere obras únicas de nuestros artistas locales. Cada pieza cuenta una historia de nuestra
              región.
            </p>
          </div>
          <StoreGrid />
        </div>
      </div>
      <Footer />
    </main>
  )
}
