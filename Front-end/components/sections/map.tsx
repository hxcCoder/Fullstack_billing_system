"use client"

import { useLanguage } from "@/contexts/language-context"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MapSection() {
  const { t } = useLanguage()

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=Puerto+Montt,+Chile", "_blank")
  }

  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">{t("map.title")}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t("map.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Map placeholder - configurable */}
          <div className="relative h-96 bg-stone-200 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-red-700 mx-auto mb-4" />
                <p className="text-stone-600 font-medium">Mapa configurable</p>
                <p className="text-sm text-stone-500 mt-2">Aquí irá el mapa interactivo</p>
              </div>
            </div>
          </div>

          {/* Location info */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-red-700 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">{t("contact.info")}</h3>
                <p className="text-stone-600">{t("map.address")}</p>
                <p className="text-stone-600 mt-1">{t("contact.phone")}</p>
                <p className="text-stone-600">info@casatejuela.cl</p>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleGetDirections} className="bg-red-700 hover:bg-red-800 text-white">
                <Navigation className="h-4 w-4 mr-2" />
                {t("map.directions")}
              </Button>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <h4 className="font-semibold text-stone-900 mb-2">{t("contact.hours.title")}</h4>
              <div className="space-y-1 text-sm text-stone-600">
                <p>{t("contact.hours.weekdays")}</p>
                <p>{t("contact.hours.saturday")}</p>
                <p>{t("contact.hours.sunday")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
