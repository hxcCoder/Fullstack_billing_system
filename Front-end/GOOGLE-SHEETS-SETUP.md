# Configuración de Google Sheets para CASA Tejuela

Esta guía te explica paso a paso cómo configurar Google Sheets como backend para tu galería de arte.

## 📋 Paso 1: Crear tu Google Sheet

### 1.1 Crear el documento
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea un nuevo documento
3. Nómbralo "CASA Tejuela - Catálogo"

### 1.2 Crear las hojas (pestañas)
Crea 3 hojas con estos nombres exactos:
- `Productos`
- `Galeria` 
- `Artistas`

## 🛍️ Paso 2: Configurar la hoja "Productos"

En la hoja **Productos**, crea estas columnas en la fila 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| name | price | image | description | artist | category | available | featured |

### Ejemplo de datos:
\`\`\`
name                    | price  | image                           | description                    | artist        | category  | available | featured
Jarrón Cerámica Azul   | 45000  | /ceramic-vase-blue.jpg         | Jarrón artesanal color azul   | María González| ceramica  | TRUE      | FALSE
Pintura Volcán Osorno  | 120000 | /volcano-painting.jpg          | Óleo del volcán Osorno        | Carlos Mendoza| pintura   | TRUE      | TRUE
\`\`\`

**Importante:**
- `price`: Solo números (45000, no $45.000)
- `available`: TRUE o FALSE
- `category`: ceramica, pintura, artesania, textil
- `image`: Ruta de la imagen (debe existir en tu carpeta public/)

## 🎨 Paso 3: Configurar la hoja "Galeria"

En la hoja **Galeria**, crea estas columnas:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| title | artist | description | image | year | featured |

### Ejemplo:
\`\`\`
title              | artist        | description                    | image                    | year | featured
Paisaje Patagónico | María González| Óleo que captura la belleza   | /landscape-painting.jpg  | 2023 | TRUE
\`\`\`

## 👨‍🎨 Paso 4: Configurar la hoja "Artistas"

En la hoja **Artistas**, crea estas columnas:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| name | bio | image | specialty | slug | active |

### Ejemplo:
\`\`\`
name           | bio                              | image              | specialty      | slug           | active
María González | Pintora especializada en paisajes| /maria-artist.jpg  | Pintura al óleo| maria-gonzalez | TRUE
\`\`\`

## 🔑 Paso 5: Obtener las credenciales de Google API

### 5.1 Crear proyecto en Google Cloud Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Sheets API**

### 5.2 Crear API Key
1. Ve a "Credenciales" → "Crear credenciales" → "Clave de API"
2. Copia la API Key generada
3. **Opcional:** Restringe la API Key solo a Google Sheets API

### 5.3 Obtener el ID de tu Google Sheet
1. Abre tu Google Sheet
2. En la URL verás algo como: `https://docs.google.com/spreadsheets/d/ABC123XYZ/edit`
3. Copia la parte `ABC123XYZ` (eso es tu Spreadsheet ID)

### 5.4 Hacer público tu Google Sheet
1. En tu Google Sheet, haz clic en "Compartir"
2. Cambia a "Cualquier persona con el enlace puede ver"
3. Asegúrate de que sea "Viewer" (no "Editor")

## ⚙️ Paso 6: Configurar las variables de entorno

Crea un archivo `.env.local` en la raíz de tu proyecto:

\`\`\`env
NEXT_PUBLIC_GOOGLE_SHEETS_ID=tu_spreadsheet_id_aqui
NEXT_PUBLIC_GOOGLE_API_KEY=tu_api_key_aqui
\`\`\`

**Ejemplo:**
\`\`\`env
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSyBnNAISIUQiQiQiQiQiQiQiQiQiQiQiQiQ
\`\`\`

## 🚀 Paso 7: Probar la configuración

1. Reinicia tu servidor de desarrollo
2. Ve a tu tienda en el navegador
3. Deberías ver los productos de tu Google Sheet

## 📝 Cómo agregar/editar contenido

### Agregar un nuevo producto:
1. Abre tu Google Sheet
2. Ve a la hoja "Productos"
3. Agrega una nueva fila con todos los datos
4. Guarda (Ctrl+S)
5. Recarga tu sitio web (puede tomar 1-2 minutos)

### Editar precios:
1. Cambia el valor en la columna "price"
2. Guarda el documento
3. Los cambios aparecerán en tu sitio

### Marcar producto como no disponible:
1. Cambia "available" de TRUE a FALSE
2. El producto desaparecerá de tu tienda

## 🔧 Solución de problemas

### Los productos no aparecen:
- Verifica que las variables de entorno estén correctas
- Asegúrate de que el Google Sheet sea público
- Revisa que los nombres de las hojas sean exactos: "Productos", "Galeria", "Artistas"

### Error de API:
- Verifica que la Google Sheets API esté habilitada
- Confirma que la API Key sea válida
- Asegúrate de que no hayas excedido los límites de uso

### Imágenes no se muestran:
- Las rutas de imagen deben empezar con "/" (ejemplo: "/mi-imagen.jpg")
- Las imágenes deben estar en la carpeta `public/` de tu proyecto
- Verifica que los nombres de archivo coincidan exactamente

## 💡 Consejos

1. **Backup**: Siempre haz una copia de tu Google Sheet
2. **Imágenes**: Usa nombres descriptivos para tus imágenes
3. **Precios**: Mantén un formato consistente (solo números)
4. **Categorías**: Usa siempre las mismas categorías para el filtro
5. **Testing**: Prueba los cambios en un ambiente de desarrollo primero

## 📞 Soporte

Si tienes problemas, revisa:
1. La consola del navegador (F12) para errores
2. Que todas las columnas tengan los nombres correctos
3. Que los datos estén en el formato correcto

¡Tu galería de arte ahora está conectada con Google Sheets! 🎨
