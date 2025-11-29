# 🚀 Guía de Configuración CASA Tejuela

## ✅ Estado Actual del Proyecto

Tu proyecto **CASA Tejuela** está completamente configurado y listo para usar. Todos los archivos de configuración están en su lugar:

- ✅ **Next.js 14** configurado con i18n (ES/EN)
- ✅ **TypeScript** con paths aliases (@/*)
- ✅ **Tailwind CSS v4** con paleta cálida personalizada
- ✅ **25 imágenes** incluidas en `/public/`
- ✅ **Componentes shadcn/ui** instalados
- ✅ **Diseño responsive** completo

## 🎯 Inicio Inmediato

\`\`\`bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:3000
\`\`\`

¡Tu sitio estará funcionando inmediatamente!

## 🎨 Personalización Rápida

### Cambiar Textos
\`\`\`tsx
// components/sections/about.tsx
<h2>Tu nuevo título aquí</h2>
<p>Tu nueva descripción aquí</p>
\`\`\`

### Cambiar Colores
\`\`\`css
/* app/globals.css - línea 8 */
--primary: #tu-color-primario;
--secondary: #tu-color-secundario;
\`\`\`

### Agregar Imágenes
1. Coloca tu imagen en `/public/`
2. Úsala en componentes: `<Image src="/tu-imagen.jpg" />`

## 🔌 Conectores Disponibles

### 1. Supabase (Base de datos)
\`\`\`bash
npm install @supabase/supabase-js
\`\`\`
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key
\`\`\`

### 2. Stripe (Pagos)
\`\`\`bash
npm install stripe @stripe/stripe-js
\`\`\`
\`\`\`env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
\`\`\`

### 3. Resend (Emails)
\`\`\`bash
npm install resend
\`\`\`
\`\`\`env
RESEND_API_KEY=tu-api-key
\`\`\`

### 4. Vercel Blob (Almacenamiento)
\`\`\`bash
npm install @vercel/blob
\`\`\`
\`\`\`env
BLOB_READ_WRITE_TOKEN=tu-token
\`\`\`

## 📱 Características Incluidas

- 🎨 **Paleta cálida y terrosa** (dorados, marrones, naranjas)
- 🖼️ **Carrusel sin texto superpuesto** (como solicitaste)
- 📱 **100% responsive** (móvil, tablet, desktop)
- 🌙 **Modo oscuro** incluido
- ♿ **Accesible** (WCAG 2.1)
- ⚡ **Optimizado** (Core Web Vitals)

## 🚀 Despliegue en 1 Click

### Vercel (Recomendado)
1. Conecta tu repo a Vercel
2. Deploy automático ✅

### Netlify
\`\`\`bash
# Build: npm run build
# Publish: .next
\`\`\`

## 📞 Soporte

Si necesitas ayuda:
1. Revisa la documentación en `README.md`
2. Todos los componentes están documentados
3. El código está comentado para fácil modificación

---

**¡Tu galería cultural está lista para brillar! 🎨**
