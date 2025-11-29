import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { checkoutSchema, checkRateLimit } from "@/lib/validation"
import { headers } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const headersList = headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const clientIp = forwardedFor?.split(",")[0] || realIp || "unknown"

    // Rate limiting for checkout attempts
    if (!checkRateLimit(`checkout_${clientIp}`, 10, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Demasiados intentos de compra. Intenta de nuevo en una hora." },
        { status: 429 },
      )
    }

    const body = await request.json()

    // Validate checkout data
    const validationResult = checkoutSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Datos de carrito inválidos",
          details: validationResult.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      )
    }

    const { items, customerEmail } = validationResult.data

    // Additional business logic validation
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const maxOrderAmount = 50000000 // 50M CLP max order

    if (totalAmount > maxOrderAmount) {
      return NextResponse.json({ error: "El monto total excede el límite permitido" }, { status: 400 })
    }

    if (totalAmount < 1000) {
      // Minimum 1000 CLP
      return NextResponse.json({ error: "El monto mínimo de compra es $1.000 CLP" }, { status: 400 })
    }

    // Create line items for Stripe with validated data
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "clp",
        product_data: {
          name: item.name.substring(0, 100), // Stripe limit
          description: item.artist ? `Obra de ${item.artist.substring(0, 50)}` : "Producto de CASA Tejuela",
          images: item.image ? [item.image] : [],
          metadata: {
            product_id: item.id.toString(),
            category: item.category || "artwork",
          },
        },
        unit_amount: Math.round(item.price), // Ensure integer
      },
      quantity: item.quantity,
    }))

    // Create Stripe checkout session with enhanced security
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/tienda`,
      customer_email: customerEmail,
      metadata: {
        source: "casa-tejuela-store",
        client_ip: clientIp,
        timestamp: new Date().toISOString(),
        item_count: items.length.toString(),
        total_amount: totalAmount.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes expiry
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["CL"], // Only Chile for now
      },
      phone_number_collection: {
        enabled: true,
      },
    })

    // Log successful checkout creation
    console.log(`[v0] Checkout session created for ${clientIp}:`, {
      sessionId: session.id,
      itemCount: items.length,
      totalAmount,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("[v0] Checkout session error:", error)

    // Don't expose internal error details
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: "Error procesando el pago. Intenta de nuevo." }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor. Intenta de nuevo más tarde." }, { status: 500 })
  }
}
