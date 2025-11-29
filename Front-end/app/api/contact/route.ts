//este codigo es para manejar el envio de formularios de contacto en una aplicacion Next.js con TypeScript
//aqui se valida, sanitiza y limita la tasa de solicitudes para prevenir spam y abusos
import { type NextRequest, NextResponse } from "next/server"
import { contactFormSchema, sanitizeHtml, checkRateLimit } from "@/lib/validation"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const headersList = headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const clientIp = forwardedFor?.split(",")[0] || realIp || "unknown"

    // Rate limiting
    if (!checkRateLimit(clientIp, 3, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en 15 minutos." }, { status: 429 })
    }

    const body = await request.json()

    // Validate input data
    const validationResult = contactFormSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: validationResult.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      )
    }

    const { name, email, message, subject, phone } = validationResult.data

    // Sanitize input data
    const sanitizedData = {
      name: sanitizeHtml(name),
      email: email.toLowerCase().trim(),
      message: sanitizeHtml(message),
      subject: subject ? sanitizeHtml(subject) : undefined,
      phone: phone ? sanitizeHtml(phone) : undefined,
    }

    // Additional security checks
    const suspiciousPatterns = [
      /\b(viagra|cialis|casino|lottery|winner)\b/i,
      /\b(click here|free money|make money fast)\b/i,
      /(http|https):\/\/[^\s]+/g, // URLs in message
    ]

    const messageContent = `${sanitizedData.name} ${sanitizedData.message} ${sanitizedData.subject || ""}`
    const isSuspicious = suspiciousPatterns.some((pattern) => pattern.test(messageContent))

    if (isSuspicious) {
      console.warn(`[v0] Suspicious contact form submission from ${clientIp}:`, sanitizedData)
      // Still return success to avoid revealing spam detection
      return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" })
    }

    // Log successful submission (in production, send to your email service)
    console.log(`[v0] Contact form submission from ${clientIp}:`, {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip: clientIp,
      userAgent: headersList.get("user-agent"),
    })

    // In production, integrate with your email service here
    // Example: await sendEmail(sanitizedData)

    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente. Te contactaremos pronto.",
    })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Error interno del servidor. Intenta de nuevo más tarde." }, { status: 500 })
  }
}
