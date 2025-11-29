# 📋 Guía Simple - CASA Tejuela

## 🎯 Para Empezar Rápido

### 1. Cambiar Información Básica
Edita `lib/config.ts`:
\`\`\`typescript
export const siteConfig = {
  name: "TU GALERÍA",
  description: "Tu descripción",
  branding: {
    logo: {
      primary: "/tu-logo.png"
    }
  }
}
\`\`\`

### 2. Cambiar Colores
En `app/globals.css`, busca `:root` y cambia:
\`\`\`css
--primary: #TU_COLOR;
--secondary: #TU_COLOR;
\`\`\`

### 3. Agregar Tus Imágenes
- Copia tus imágenes a la carpeta `public/`
- Reemplaza `logo-casa-tejuela.png` con tu logo
- Edita `data/content.json` para usar tus imágenes

### 4. Cambiar Contacto
En `components/sections/contact.tsx`:
- Cambia `info@casatejuela.cl` por tu email
- Cambia `+56652345678` por tu teléfono

## 🛒 Configurar Tienda

### Agregar Productos
Edita `data/content.json`:
\`\`\`json
{
  "products": [
    {
      "id": "1",
      "name": "Tu Producto",
      "artist": "Artista",
      "price": 50000,
      "image": "/tu-imagen.jpg",
      "category": "categoria"
    }
  ]
}
\`\`\`

### Configurar WhatsApp
En `components/store/cart-sidebar.tsx`, cambia:
\`\`\`typescript
const whatsappUrl = `https://wa.me/TU_NUMERO?text=...`
\`\`\`

## 📱 Desplegar

### Opción 1: Vercel (Más Fácil)
1. Sube tu código a GitHub
2. Ve a vercel.com
3. Conecta tu repositorio
4. ¡Listo!

### Opción 2: Netlify
1. Ejecuta `npm run build`
2. Sube la carpeta `.next` a netlify.com
3. ¡Listo!

## ❓ Preguntas Frecuentes

**¿Cómo cambio el logo?**
Reemplaza `/public/logo-casa-tejuela.png` con tu logo

**¿Cómo agrego más páginas?**
Crea archivos en la carpeta `app/` siguiendo la estructura de Next.js

**¿Funciona sin internet?**
No, necesita estar en un servidor web, pero no necesita base de datos

**¿Puedo vender productos reales?**
Sí, pero los pagos son por contacto directo (WhatsApp/Email)

**¿Es gratis?**
Sí, el código es gratis. Solo pagas el hosting (Vercel/Netlify tienen planes gratuitos)
