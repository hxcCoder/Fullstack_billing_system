# 🔧 Guía de Mantenimiento - CASA Tejuela

## Tareas de Mantenimiento Regular

### Semanal
- [ ] Revisar formularios de contacto
- [ ] Verificar funcionamiento del carrito
- [ ] Comprobar velocidad de carga
- [ ] Revisar transacciones de Stripe

### Mensual
- [ ] Actualizar contenido de artistas
- [ ] Revisar y actualizar productos
- [ ] Verificar enlaces rotos
- [ ] Actualizar dependencias menores

### Trimestral
- [ ] Actualizar Next.js y dependencias principales
- [ ] Revisar métricas de Google Analytics
- [ ] Optimizar imágenes si es necesario
- [ ] Backup completo del contenido

## Actualización de Contenido

### Agregar Nuevo Artista
1. Editar `data/content.json`:
\`\`\`json
{
  "artists": [
    {
      "id": "nuevo-artista",
      "name": "Nombre del Artista",
      "specialty": "Especialidad",
      "bio": "Biografía completa...",
      "image": "/images/artists/nuevo-artista.jpg",
      "works": [
        {
          "title": "Obra 1",
          "year": "2024",
          "image": "/images/works/obra1.jpg"
        }
      ]
    }
  ]
}
\`\`\`

2. Subir imágenes a `public/images/artists/` y `public/images/works/`
3. Commit y push para deploy automático

### Agregar Nuevo Producto
\`\`\`json
{
  "products": [
    {
      "id": "nuevo-producto",
      "name": "Nombre del Producto",
      "price": 35000,
      "category": "ceramica",
      "image": "/images/products/nuevo-producto.jpg",
      "description": "Descripción detallada..."
    }
  ]
}
\`\`\`

### Actualizar Traducciones
Editar archivos en `public/locales/es/` y `public/locales/en/`:
\`\`\`json
{
  "new_section": {
    "title": "Nuevo Título",
    "description": "Nueva descripción"
  }
}
\`\`\`

## Solución de Problemas Comunes

### Error: "Stripe key not found"
**Causa**: Variable de entorno no configurada
**Solución**: 
1. Verificar en panel de hosting
2. Reiniciar aplicación
3. Verificar formato de la clave

### Error: "Images not loading"
**Causa**: Rutas incorrectas en JSON
**Solución**:
1. Verificar que imágenes existen en `public/`
2. Comprobar rutas en `data/content.json`
3. Usar rutas absolutas desde `/`

### Error: "Translation not found"
**Causa**: Clave de traducción faltante
**Solución**:
1. Agregar clave en ambos archivos de idioma
2. Verificar sintaxis JSON
3. Reiniciar aplicación

### Sitio Lento
**Diagnóstico**:
1. Usar Google PageSpeed Insights
2. Verificar tamaño de imágenes
3. Comprobar red de CDN

**Soluciones**:
- Optimizar imágenes (WebP, < 500KB)
- Implementar lazy loading
- Usar Next.js Image component

## Actualizaciones de Dependencias

### Actualizaciones Seguras (Menores)
\`\`\`bash
npm update
npm audit fix
\`\`\`

### Actualizaciones Principales
\`\`\`bash
# Verificar versiones disponibles
npm outdated

# Actualizar una por una
npm install next@latest
npm install react@latest

# Probar después de cada actualización
npm run build
npm run dev
\`\`\`

## Optimización de Rendimiento

### Imágenes
- Formato WebP preferido
- Tamaño máximo: 1920px ancho
- Peso máximo: 500KB por imagen
- Usar `next/image` para optimización automática

### Código
- Eliminar console.logs en producción
- Minimizar CSS personalizado
- Usar componentes lazy cuando sea apropiado

### SEO
- Actualizar meta descriptions
- Verificar sitemap.xml
- Comprobar structured data

## Backup y Restauración

### Crear Backup
\`\`\`bash
# Backup del contenido
cp data/content.json backups/content-$(date +%Y%m%d).json

# Backup de traducciones
cp -r public/locales backups/locales-$(date +%Y%m%d)/

# Backup de imágenes críticas
cp -r public/images backups/images-$(date +%Y%m%d)/
\`\`\`

### Restaurar desde Backup
\`\`\`bash
# Restaurar contenido
cp backups/content-20241201.json data/content.json

# Commit y deploy
git add .
git commit -m "Restore content from backup"
git push
\`\`\`

## Contacto de Emergencia

### Problemas Críticos
- Sitio completamente caído
- Pagos no procesándose
- Pérdida de datos

### Información de Contacto
- **Hosting**: [Panel de control del proveedor]
- **Dominio**: [Panel de DNS]
- **Stripe**: [Dashboard de Stripe]
- **Desarrollador**: [Información de contacto]

### Logs de Errores
- Vercel: Dashboard → Functions → View Logs
- Netlify: Dashboard → Site → Functions
- Stripe: Dashboard → Logs
