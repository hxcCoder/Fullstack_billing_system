// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import { CartProvider } from "@/contexts/cart-context"
import { LanguageProvider } from "@/contexts/language-context"
import { CartSidebar } from "@/components/store/cart-sidebar"
import { ErrorBoundary } from "@/components/error-boundary"
import ToastProvider from "@/components/ToastProvider" // <-- importamos el client component
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "CASA Tejuela - Underground Cultural Gallery",
  description:
    "Underground cultural gallery in Puerto Montt, Chile. Alternative art, heritage and culture.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${workSans.variable} ${openSans.variable} antialiased`}>
        <ErrorBoundary>
          <LanguageProvider>
            <ErrorBoundary>
              <CartProvider>
                <ToastProvider>
                  <ErrorBoundary>
                    {children}
                    <CartSidebar />
                  </ErrorBoundary>
                </ToastProvider>
              </CartProvider>
            </ErrorBoundary>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
