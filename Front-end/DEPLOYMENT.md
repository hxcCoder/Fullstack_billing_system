# 🚀 Guía de Despliegue - CASA Tejuela

## Preparación para Producción

### 1. Variables de Entorno Requeridas
Configurar en el panel de tu proveedor de hosting:

\`\`\`env
# Stripe (Producción)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Opcional: URLs de redirección
NEXT_PUBLIC_SITE_URL=https://casatejuela.com
\`\`\`

### 2. Verificación Pre-Despliegue
\`\`\`bash
# Instalar dependencias
npm install

# Verificar build
npm run build

# Probar localmente
npm run start
\`\`\`

## Despliegue en Vercel (Recomendado)


1. **Configurar Variables de Entorno**
   - Settings → Environment Variables
   - Agregar `STRIPE_SECRET_KEY` y `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Marcar para Production, Preview y Development

2. **Configurar Dominio**
   - Settings → Domains
   - Agregar dominio personalizado
   - Configurar DNS según instrucciones

3. **Deploy**
   - Automático en cada push a main
   - Manual desde dashboard si es necesario

## Despliegue en Netlify

### Configuración
\`\`\`toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\`\`\`

## Despliegue en DigitalOcean App Platform

### Configuración YAML
\`\`\`yaml
name: casa-tejuela
services:
- name: web
  source_dir: /
  github:
    repo: tu-usuario/casa-tejuela
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: STRIPE_SECRET_KEY
    value: sk_live_...
    type: SECRET
\`\`\`

## Configuración de Dominio y SSL

### DNS Records
\`\`\`
A     @     [IP_DEL_SERVIDOR]
CNAME www   casatejuela.com
\`\`\`

### SSL/HTTPS
- Vercel: Automático
- Netlify: Automático con Let's Encrypt
- Otros: Configurar certificado SSL

## Monitoreo Post-Despliegue

### Verificaciones Esenciales
- [ ] Página principal carga correctamente
- [ ] Navegación entre secciones funciona
- [ ] Cambio de idioma funciona
- [ ] Tienda y carrito funcionan
- [ ] Formulario de contacto envía emails
- [ ] Checkout de Stripe procesa pagos
- [ ] Responsive design en móvil/tablet
- [ ] Velocidad de carga < 3 segundos

### Herramientas de Monitoreo
- **Google PageSpeed Insights**: Rendimiento
- **GTmetrix**: Análisis de velocidad
- **Stripe Dashboard**: Transacciones
- **Google Analytics**: Tráfico y conversiones

## Backup y Seguridad

### Backup Automático
- Código: GitHub (automático)
- Contenido: Exportar `data/content.json` regularmente
- Base de datos: Si se implementa en el futuro

### Seguridad
- Mantener dependencias actualizadas
- Revisar logs de Stripe regularmente
- Monitorear intentos de acceso no autorizados
