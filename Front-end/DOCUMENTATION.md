# CASA Tejuela - Documentación Técnica

## 📋 Descripción del Proyecto

CASA Tejuela es una galería-tienda cultural en Puerto Montt, Chile, desarrollada con Next.js 14, TypeScript y Tailwind CSS. El sitio presenta arte local, patrimonio cultural y funcionalidad de e-commerce con integración de Stripe.

## 🏗️ Arquitectura del Proyecto


## 🎨 Sistema de Diseño

### Paleta de Colores (Tonos Tierra)
- **Primario**: `oklch(0.45 0.15 25)` - Rojo arcilla profundo
- **Secundario**: `oklch(0.95 0.01 45)` - Beige claro
- **Acento**: `oklch(0.6 0.12 35)` - Terracota
- **Fondo**: `oklch(0.99 0.005 85)` - Blanco cálido
- **Texto**: `oklch(0.25 0.015 45)` - Gris carbón

### Tipografía
- **Fuente Principal**: Inter (Google Fonts)
- **Jerarquía**: text-sm → text-base → text-lg → text-xl → text-2xl

## 🌐 Sistema de Internacionalización

### Idiomas Soportados
- **Español (es)**: Idioma principal
- **Inglés (en)**: Idioma secundario

### Cómo Agregar Nuevas Traducciones
1. Editar `public/locales/es/common.json` y `public/locales/en/common.json`
2. Usar el hook `useLanguage()` en componentes:
\`\`\`tsx
const { t } = useLanguage();
return <h1>{t('nav.home')}</h1>;
\`\`\`

## 🛒 Sistema de E-commerce

### Configuración de Stripe
1. Obtener claves de Stripe (test/producción)
2. Configurar variables de entorno:
   - `STRIPE_SECRET_KEY`: Clave secreta de Stripe
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Clave pública

### Gestión de Productos
Los productos se gestionan en `data/content.json`:
\`\`\`json
{
  "products": [
    {
      "id": "1",
      "name": "Nombre del producto",
      "price": 25000,
      "category": "ceramica",
      "image": "/path/to/image.jpg",
      "description": "Descripción del producto"
    }
  ]
}
\`\`\`

## 📝 Gestión de Contenido

### Archivo Principal: `data/content.json`
Contiene toda la información del sitio:
- Información de la galería
- Productos de la tienda
- Perfiles de artistas
- Contenido de patrimonio cultural

### Cómo Actualizar Contenido
1. **Texto de secciones**: Editar `data/content.json`
2. **Traducciones**: Editar archivos en `public/locales/`
3. **Imágenes**: Subir a `public/` y actualizar rutas en JSON

## 🎯 Funcionalidades Principales

### 1. Página Principal
- **Hero Carousel**: Swiper.js con imágenes destacadas
- **Sección Quiénes Somos**: Información de la galería
- **Galería**: Grid de obras de arte
- **Proyectos**: Portafolios de artistas
- **Contacto**: Formulario y información
- **Mapa**: Ubicación configurable

### 2. Sistema de Artistas
- **Lista de artistas**: `/artistas`
- **Perfiles individuales**: `/artistas/[slug]`
- **Portafolios**: Obras y biografías

### 3. Tienda E-commerce
- **Catálogo**: `/tienda`
- **Carrito**: Persistente con localStorage
- **Checkout**: Integración con Stripe
- **Categorías**: Filtrado por tipo de producto

### 4. Patrimonio Cultural
- **Contenido educativo**: `/patrimonio`
- **Historia local**: Arquitectura de tejuela
- **Identidad cultural**: Puerto Montt

## 🔧 Configuración y Personalización

### Variables de Entorno Requeridas
\`\`\`env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
\`\`\`

### Cambiar Colores del Sitio
Editar `app/globals.css` en la sección `:root`:
\`\`\`css
:root {
  --primary: oklch(0.45 0.15 25); /* Color principal */
  --accent: oklch(0.6 0.12 35);   /* Color de acento */
  /* ... otros colores */
}
\`\`\`

### Cambiar Logo
1. Reemplazar `public/logo-casa-tejuela.png`
2. Mantener proporciones para responsive design

### Configurar Mapa
En `components/sections/map.tsx`, actualizar:
- Coordenadas de Google Maps
- Dirección física
- Información de contacto

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Clases Responsive Utilizadas
- `sm:`, `md:`, `lg:` para diferentes tamaños
- Grid adaptativo: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Deploy automático

### Otros Proveedores
Compatible con cualquier proveedor que soporte Next.js 14:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔄 Mantenimiento

### Actualizar Contenido
1. **Productos**: Editar `data/content.json`
2. **Artistas**: Agregar/modificar en sección `artists`
3. **Traducciones**: Actualizar archivos de locales

### Agregar Nuevas Páginas
1. Crear archivo en `app/nueva-pagina/page.tsx`
2. Agregar enlace en navbar si es necesario
3. Actualizar traducciones

### Optimización de Imágenes
- Usar formato WebP cuando sea posible
- Mantener imágenes < 1MB
- Usar Next.js Image component para optimización automática

## 🛡️ Seguridad

### Mejores Prácticas Implementadas
- Variables de entorno para claves sensibles
- Validación de formularios
- Sanitización de datos de entrada
- HTTPS obligatorio en producción

## 📊 Analytics y Monitoreo

### Integración Recomendada
- Google Analytics 4
- Vercel Analytics
- Stripe Dashboard para métricas de ventas

## 🆘 Solución de Problemas

### Errores Comunes
1. **Error de Stripe**: Verificar variables de entorno
2. **Imágenes no cargan**: Verificar rutas en `data/content.json`
3. **Traducciones no funcionan**: Verificar archivos de locales

### Logs de Desarrollo
Usar `console.log("[v0] mensaje")` para debugging durante desarrollo.

## 📞 Soporte

Para modificaciones avanzadas o problemas técnicos:
1. Revisar esta documentación
2. Consultar documentación de Next.js 14
3. Verificar configuración de Stripe
4. Contactar al desarrollador si es necesario

---

**Versión**: 1.0  
**Última actualización**: Diciembre 2024  
**Tecnologías**: Next.js 14, TypeScript, Tailwind CSS, Stripe
\`\`\`

\`\`\`json file="" isHidden
