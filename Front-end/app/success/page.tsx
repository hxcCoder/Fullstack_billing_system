//es succes porque es la pagina que se muestra despues de una compra exitosa en una aplicacion Next.js.
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-stone-200 p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-stone-800 mb-4">¡Compra Exitosa!</h1>
        <p className="text-stone-600 mb-8">
          Gracias por tu compra. Recibirás un correo de confirmación con los detalles de tu pedido.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full bg-red-700 hover:bg-red-800 text-white">
            <Link href="/tienda">Seguir Comprando</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent"
          >
            <Link href="/">Volver al Inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
