"use client"

import { useLanguage } from "@/contexts/language-context"

export function About() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">{t("about.title")}</h2>
          <p className="text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto">{t("about.description")}</p>
        </div>
      </div>
    </section>
  )
}
