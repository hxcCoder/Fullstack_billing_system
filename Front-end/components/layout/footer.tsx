import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-violet-500/30 underground-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <h3 className="text-3xl font-black text-white neon-text uppercase tracking-wider">CASA Tejuela</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md font-medium">
              Underground cultural gallery en Puerto Montt dedicada a promover el arte alternativo y patrimonio rebelde
              de la región de Los Lagos.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com"
                className="text-gray-400 hover:text-violet-400 transition-colors duration-200 neon-glow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguir en Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://facebook.com"
                className="text-gray-400 hover:text-violet-400 transition-colors duration-200 neon-glow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguir en Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#gallery"
                  className="text-gray-400 hover:text-violet-400 transition-colors duration-200 uppercase tracking-wide text-sm font-medium"
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda"
                  className="text-gray-400 hover:text-violet-400 transition-colors duration-200 uppercase tracking-wide text-sm font-medium"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  href="/artistas"
                  className="text-gray-400 hover:text-violet-400 transition-colors duration-200 uppercase tracking-wide text-sm font-medium"
                >
                  Artistas
                </Link>
              </li>
              <li>
                <Link
                  href="/patrimonio"
                  className="text-gray-400 hover:text-violet-400 transition-colors duration-200 uppercase tracking-wide text-sm font-medium"
                >
                  Patrimonio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2 text-violet-400" />
                <a
                  href="mailto:info@casatejuela.cl"
                  className="hover:text-violet-400 transition-colors duration-200 text-sm"
                >
                  info@casatejuela.cl
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2 text-violet-400" />
                <a href="tel:+56652345678" className="hover:text-violet-400 transition-colors duration-200 text-sm">
                  +56 65 234 5678
                </a>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-violet-400" />
                <span className="text-sm">Av. Diego Portales 123, Puerto Montt, Chile</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-violet-500/30 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wider">
            © 2024 CASA Tejuela Underground. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
