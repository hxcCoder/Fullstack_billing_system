"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") return null

    try {
      return localStorage.getItem(key)
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[v0] Error reading from localStorage:", error)
      }
      return null
    }
  },

  setItem: (key: string, value: string): boolean => {
    if (typeof window === "undefined") return false

    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[v0] Error writing to localStorage:", error)
      }
      return false
    }
  },
}

// Translation data
const translations = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.gallery": "Galería",
    "nav.store": "Tienda",
    "nav.artists": "Artistas",
    "nav.projects": "Proyectos",
    "nav.heritage": "Patrimonio",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",

    // Hero section
    "hero.title": "CASA Tejuela",
    "hero.subtitle": "Galería Cultural en el corazón de Puerto Montt",
    "hero.description":
      "Descubre el arte y patrimonio cultural de la región de Los Lagos en nuestro espacio dedicado a preservar y promover la identidad local.",
    "hero.hours": "Lun - Sáb: 10:00 - 19:00",
    "hero.exploreGallery": "Explorar Galería",
    "hero.visitStore": "Visitar Tienda",
    "hero.scrollNext": "Desplazarse a la siguiente sección",

    // About section
    "about.title": "Quiénes Somos",
    "about.description":
      "CASA Tejuela es un espacio cultural dedicado a preservar y promover el patrimonio artístico de Puerto Montt y la región de Los Lagos. Nuestra galería-tienda conecta a artistas locales con la comunidad, celebrando la rica tradición cultural de Chiloé y la Patagonia.",

    // Gallery section
    "gallery.title": "Galería",
    "gallery.subtitle": "Explora nuestra colección de arte local",
    "gallery.viewAll": "Ver toda la galería",

    // Projects section
    "projects.title": "Proyectos",
    "projects.subtitle": "Iniciativas culturales y comunitarias",
    "projects.viewAll": "Ver todos los proyectos",

    // Contact section
    "contact.title": "Contacto",
    "contact.subtitle": "¿Tienes alguna pregunta? Nos encantaría escucharte.",
    "contact.name": "Nombre",
    "contact.email": "Correo electrónico",
    "contact.subject": "Asunto",
    "contact.phone": "Teléfono",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.info": "Información de Contacto",
    "contact.location": "Ubicación",
    "contact.address": "Puerto Montt, Chile",
    "contact.fullAddress": "Av. Diego Portales 123, Puerto Montt, Chile",
    "contact.privacy": "Tus datos están protegidos y no serán compartidos con terceros.",
    "contact.successMessage": "Mensaje enviado correctamente. Te contactaremos pronto.",
    "contact.namePlaceholder": "Tu nombre",
    "contact.emailPlaceholder": "tu@email.com",
    "contact.subjectPlaceholder": "Asunto del mensaje (opcional)",
    "contact.phonePlaceholder": "+56 9 1234 5678 (opcional)",
    "contact.messagePlaceholder": "Escribe tu mensaje aquí...",
    "contact.validation.nameRequired": "El nombre es requerido",
    "contact.validation.emailRequired": "El email es requerido",
    "contact.validation.emailInvalid": "El email no es válido",
    "contact.validation.messageRequired": "El mensaje es requerido",
    "contact.validation.submitError": "Error al enviar el mensaje. Por favor, intenta de nuevo.",
    "contact.hours.title": "Horarios de Atención",
    "contact.hours.weekdays": "Lunes - Viernes",
    "contact.hours.weekdaysTimes": "10:00 - 19:00",
    "contact.hours.saturday": "Sábado",
    "contact.hours.saturdayTimes": "10:00 - 17:00",
    "contact.hours.sunday": "Domingo",
    "contact.hours.closed": "Cerrado",

    // Footer
    "footer.description":
      "Galería cultural dedicada a preservar y promover el patrimonio artístico de Puerto Montt y la región de Los Lagos.",
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.followUs": "Síguenos",
    "footer.rights": "Todos los derechos reservados.",

    // Store
    "store.title": "Tienda",
    "store.subtitle": "Descubre obras únicas de artistas locales",
    "store.all": "Todos",
    "store.paintings": "Pinturas",
    "store.sculptures": "Esculturas",
    "store.crafts": "Artesanías",
    "store.addToCart": "Agregar al carrito",
    "store.price": "Precio",
    "store.artist": "Artista",
    "cart.title": "Carrito",
    "cart.empty": "Tu carrito está vacío",
    "cart.total": "Total",
    "cart.checkout": "Finalizar compra",
    "cart.remove": "Eliminar",
    "cart.quantity": "Cantidad",

    // Map section
    "map.title": "Nuestra Ubicación",
    "map.subtitle": "Visítanos en el corazón de Puerto Montt",
    "map.address": "Puerto Montt, Región de Los Lagos, Chile",
    "map.directions": "Cómo llegar",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.gallery": "Gallery",
    "nav.store": "Store",
    "nav.artists": "Artists",
    "nav.projects": "Projects",
    "nav.heritage": "Heritage",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Hero section
    "hero.title": "CASA Tejuela",
    "hero.subtitle": "Cultural Gallery in the heart of Puerto Montt",
    "hero.description":
      "Discover the art and cultural heritage of the Los Lagos region in our space dedicated to preserving and promoting local identity.",
    "hero.hours": "Mon - Sat: 10:00 - 19:00",
    "hero.exploreGallery": "Explore Gallery",
    "hero.visitStore": "Visit Store",
    "hero.scrollNext": "Scroll to next section",

    // About section
    "about.title": "About Us",
    "about.description":
      "CASA Tejuela is a cultural space dedicated to preserving and promoting the artistic heritage of Puerto Montt and the Los Lagos region. Our gallery-store connects local artists with the community, celebrating the rich cultural tradition of Chiloé and Patagonia.",

    // Gallery section
    "gallery.title": "Gallery",
    "gallery.subtitle": "Explore our collection of local art",
    "gallery.viewAll": "View entire gallery",

    // Projects section
    "projects.title": "Projects",
    "projects.subtitle": "Cultural and community initiatives",
    "projects.viewAll": "View all projects",

    // Contact section
    "contact.title": "Contact",
    "contact.subtitle": "Have a question? We'd love to hear from you.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.phone": "Phone",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.info": "Contact Information",
    "contact.location": "Location",
    "contact.address": "Puerto Montt, Chile",
    "contact.fullAddress": "Av. Diego Portales 123, Puerto Montt, Chile",
    "contact.privacy": "Your data is protected and will not be shared with third parties.",
    "contact.successMessage": "Message sent successfully. We'll contact you soon.",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "your@email.com",
    "contact.subjectPlaceholder": "Message subject (optional)",
    "contact.phonePlaceholder": "+56 9 1234 5678 (optional)",
    "contact.messagePlaceholder": "Write your message here...",
    "contact.validation.nameRequired": "Name is required",
    "contact.validation.emailRequired": "Email is required",
    "contact.validation.emailInvalid": "Email is not valid",
    "contact.validation.messageRequired": "Message is required",
    "contact.validation.submitError": "Error sending message. Please try again.",
    "contact.hours.title": "Business Hours",
    "contact.hours.weekdays": "Monday - Friday",
    "contact.hours.weekdaysTimes": "10:00 - 19:00",
    "contact.hours.saturday": "Saturday",
    "contact.hours.saturdayTimes": "10:00 - 17:00",
    "contact.hours.sunday": "Sunday",
    "contact.hours.closed": "Closed",

    // Footer
    "footer.description":
      "Cultural gallery dedicated to preserving and promoting the artistic heritage of Puerto Montt and the Los Lagos region.",
    "footer.quickLinks": "Quick Links",
    "footer.followUs": "Follow Us",
    "footer.rights": "All rights reserved.",

    // Store
    "store.title": "Store",
    "store.subtitle": "Discover unique works by local artists",
    "store.all": "All",
    "store.paintings": "Paintings",
    "store.sculptures": "Sculptures",
    "store.crafts": "Crafts",
    "store.addToCart": "Add to cart",
    "store.price": "Price",
    "store.artist": "Artist",
    "cart.title": "Cart",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.remove": "Remove",
    "cart.quantity": "Quantity",

    // Map section
    "map.title": "Our Location",
    "map.subtitle": "Visit us in the heart of Puerto Montt",
    "map.address": "Puerto Montt, Los Lagos Region, Chile",
    "map.directions": "Get Directions",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const saved = safeLocalStorage.getItem("language")
    if (saved && (saved === "es" || saved === "en")) {
      setLanguage(saved as Language)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    const success = safeLocalStorage.setItem("language", lang)
    if (!success && process.env.NODE_ENV === "development") {
      console.warn("[v0] Failed to save language preference to localStorage")
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
