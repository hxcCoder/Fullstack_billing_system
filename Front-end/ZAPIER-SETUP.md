# 🔗 Configuración de Zapier para CASA Tejuela

## 📋 Pasos para configurar Zapier

### 1. Crear cuenta en Zapier
- Ve a [zapier.com](https://zapier.com)
- Regístrate (plan gratuito: 100 tareas/mes)

### 2. Crear Zap para formulario de contacto

#### Trigger: Webhooks by Zapier
1. Selecciona "Webhooks by Zapier"
2. Evento: "Catch Hook"
3. Copia la URL del webhook que te da Zapier

#### Action: Google Sheets
1. Selecciona "Google Sheets"
2. Evento: "Create Spreadsheet Row"
3. Conecta tu cuenta de Google
4. Selecciona tu hoja de CASA Tejuela
5. Crea/selecciona pestaña "Contactos"
6. Mapea los campos:
   - Nombre → `name`
   - Email → `email`
   - Teléfono → `phone`
   - Asunto → `subject`
   - Mensaje → `message`
   - Fecha → `timestamp`
   - Fuente → `source`

### 3. Configurar variable de entorno
Agrega en tu proyecto:
\`\`\`
NEXT_PUBLIC_ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/XXXXXX/XXXXXX/
\`\`\`

### 4. Estructura de Google Sheets
Crea pestaña "Contactos" con estas columnas:
| Nombre | Email | Teléfono | Asunto | Mensaje | Fecha | Fuente |
|--------|-------|----------|--------|---------|-------|--------|

## 🔄 Funcionamiento
- **Con Zapier**: Datos van directo a Google Sheets
- **Sin Zapier**: Fallback a mailto (como antes)
- **Notificaciones**: Zapier puede enviar emails automáticos

## 💰 Costos
- **Plan gratuito**: 100 formularios/mes
- **Plan Starter**: $19.99/mes - 750 formularios/mes

## 🚀 Próximos pasos
1. Configurar Zap para ventas (PayPal → Google Sheets)
2. Agregar notificaciones por email
3. Crear dashboard de métricas
