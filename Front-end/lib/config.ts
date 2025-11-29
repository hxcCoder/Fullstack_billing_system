export const siteConfig = {
  name: "CASA Tejuela",
  description: "Galería-tienda cultural en Puerto Montt, Chile. Arte local, patrimonio y cultura de la región.",
  url: "https://casatejuela.com",
  ogImage: "https://casatejuela.com/og.png",
  links: {
    instagram: "https://instagram.com/casatejuela",
    facebook: "https://facebook.com/casatejuela",
    email: "contacto@casatejuela.com",
    phone: "+56 9 1234 5678",
    whatsapp: "+56912345678",
  },
  location: {
    address: "Puerto Montt, Región de Los Lagos, Chile",
    coordinates: {
      lat: -41.4693,
      lng: -72.9424,
    },
    googleMapsUrl: "https://maps.google.com/?q=-41.4693,-72.9424",
  },
  branding: {
    logo: {
      primary: "/logo-casa-tejuela.png",
      fallback: "/logo.png",
      favicon: "/favicon.ico",
    },
    colors: {
      primary: "#8B4513", // Saddle brown
      secondary: "#CD853F", // Peru
      accent: "#D2691E", // Chocolate
    },
  },
  business: {
    hours: {
      monday: "10:00 - 18:00",
      tuesday: "10:00 - 18:00",
      wednesday: "10:00 - 18:00",
      thursday: "10:00 - 18:00",
      friday: "10:00 - 19:00",
      saturday: "10:00 - 19:00",
      sunday: "Cerrado",
    },
    rut: "12.345.678-9",
  },
  features: {
    ecommerce: true,
    multilingual: true,
    blog: false,
    newsletter: true,
  },
}

export const themeConfig = {
  colors: {
    primary: "oklch(0.45 0.15 25)", // Clay red
    secondary: "oklch(0.6 0.12 35)", // Warm brown
    accent: "oklch(0.7 0.08 45)", // Stone gray
    background: "oklch(0.99 0.005 85)", // Warm white
    foreground: "oklch(0.25 0.015 45)", // Dark brown
  },
  fonts: {
    sans: "Inter",
    serif: "Playfair Display",
    mono: "JetBrains Mono",
  },
  layout: {
    maxWidth: "1200px",
    containerPadding: "1rem",
    sectionSpacing: "4rem",
  },
}
