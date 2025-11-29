"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Shield, Zap } from "lucide-react"

interface FormData {
  name: string
  email: string
  message: string
  subject: string
  phone: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
  subject?: string
  phone?: string
  general?: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    subject: "",
    phone: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const { t } = useLanguage()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t("contact.validation.nameRequired")
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.validation.emailRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("contact.validation.emailInvalid")
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.validation.messageRequired")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Zapier webhook URL (configurar en variables de entorno)
      const zapierWebhook = process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL

      if (zapierWebhook) {
        // Enviar a Zapier
        const response = await fetch(zapierWebhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || "No proporcionado",
            subject: formData.subject || "Consulta desde CASA Tejuela",
            message: formData.message,
            timestamp: new Date().toISOString(),
            source: "CASA Tejuela Website",
          }),
        })

        if (response.ok) {
          setSubmitStatus("success")
          setFormData({ name: "", email: "", message: "", subject: "", phone: "" })
        } else {
          throw new Error("Error en Zapier")
        }
      } else {
        // Fallback a mailto si no hay Zapier configurado
        const subject = formData.subject || "Consulta desde CASA Tejuela"
        const body = `Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || "No proporcionado"}

Mensaje:
${formData.message}`

        const mailtoLink = `mailto:info@casatejuela.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.location.href = mailtoLink
      }
    } catch (error) {
      console.error("Error enviando formulario:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="contact" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{t("contact.title")}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="flex justify-center mb-8">
              <BrandLogo />
            </div>

            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-amber-800 text-sm">
                <Zap className="h-4 w-4 inline mr-2" />
                {process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL
                  ? "Los datos se enviarán automáticamente a nuestro sistema"
                  : "Al enviar el formulario se abrirá tu cliente de email con los datos prellenados"}
              </p>
            </div>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-800">{t("contact.successMessage")}</p>
              </div>
            )}

            {(submitStatus === "error" || errors.general) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800">{errors.general || t("contact.validation.submitError")}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                  {t("contact.name")} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                  placeholder={t("contact.namePlaceholder")}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                  {t("contact.email")} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                  placeholder={t("contact.emailPlaceholder")}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                  {t("contact.subject")}
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full"
                  placeholder={t("contact.subjectPlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                  {t("contact.phone")}
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                  placeholder={t("contact.phonePlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  {t("contact.message")} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full ${errors.message ? "border-red-500 focus:border-red-500" : ""}`}
                  placeholder={t("contact.messagePlaceholder")}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-700 hover:bg-red-800 text-white disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : t("contact.send")}
              </Button>

              <p className="text-xs text-stone-500 text-center">
                <Shield className="h-3 w-3 inline mr-1" />
                {t("contact.privacy")}
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-stone-800 mb-6">{t("contact.info")}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-red-700 mt-1" />
                  <div>
                    <p className="font-medium text-stone-800">{t("contact.email")}</p>
                    <a
                      href="mailto:info@casatejuela.cl"
                      className="text-stone-600 hover:text-red-700 transition-colors duration-200"
                    >
                      info@casatejuela.cl
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-red-700 mt-1" />
                  <div>
                    <p className="font-medium text-stone-800">{t("contact.phone")}</p>
                    <a
                      href="tel:+56652345678"
                      className="text-stone-600 hover:text-red-700 transition-colors duration-200"
                    >
                      +56 65 234 5678
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-700 mt-1" />
                  <div>
                    <p className="font-medium text-stone-800">{t("contact.location")}</p>
                    <p className="text-stone-600">Av. Diego Portales 123, Puerto Montt, Chile</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
              <h4 className="text-lg font-semibold text-stone-800 mb-4">{t("contact.hours.title")}</h4>
              <div className="space-y-2 text-stone-600">
                <div className="flex justify-between">
                  <span>{t("contact.hours.weekdays")}</span>
                  <span>{t("contact.hours.weekdaysTimes")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.saturday")}</span>
                  <span>{t("contact.hours.saturdayTimes")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.sunday")}</span>
                  <span>{t("contact.hours.closed")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
