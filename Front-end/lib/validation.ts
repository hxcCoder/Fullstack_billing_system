import { z } from "zod"

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),
  email: z
    .string()
    .email("Por favor ingresa un email válido")
    .max(254, "El email no puede exceder 254 caracteres")
    .toLowerCase(),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres"),
  subject: z.string().max(200, "El asunto no puede exceder 200 caracteres").optional(),
  phone: z
    .string()
    .regex(/^[+]?[0-9\s\-$$$$]{0,20}$/, "Formato de teléfono inválido")
    .optional(),
})

export const cartItemSchema = z.object({
  id: z.number().positive("ID de producto inválido"),
  name: z.string().min(1, "Nombre de producto requerido").max(200),
  price: z.number().positive("Precio debe ser positivo").max(10000000),
  quantity: z.number().int().positive("Cantidad debe ser positiva").max(100),
  image: z.string().url("URL de imagen inválida").optional(),
  artist: z.string().max(100).optional(),
  category: z.string().max(50).optional(),
  description: z.string().max(1000).optional(),
})

export const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1, "El carrito no puede estar vacío").max(50),
  customerEmail: z.string().email("Email inválido").optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type CartItemData = z.infer<typeof cartItemSchema>
export type CheckoutData = z.infer<typeof checkoutSchema>

// Sanitization utilities
export function sanitizeHtml(input: string): string {
  if (typeof input !== "string") return ""

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<link\b[^>]*>/gi, "")
    .replace(/<meta\b[^>]*>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
}

export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return ""

  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
}

// Rate limiting utilities
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// CSRF token utilities
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length === 64
}
