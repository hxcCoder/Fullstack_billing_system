"use client"

import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import content from "@/data/content.json"

export function HeritageContent() {
  const { t } = useLanguage()

  return (
    <div className="py-20">
      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">{t("heritage.intro.title")}</h2>
          <p className="text-lg text-stone-600 leading-relaxed">{t("heritage.intro.content")}</p>
        </div>
      </section>

      {/* Heritage Sections */}
      <div className="space-y-20">
        {content.tourism.sections.map((section, index) => (
          <section key={index} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-6">
                  {t(`heritage.sections.${index}.title`)}
                </h3>
                <p className="text-lg text-stone-600 leading-relaxed mb-8">{t(`heritage.sections.${index}.content`)}</p>
                {index === 0 && (
                  <div className="bg-stone-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-stone-800 mb-4">
                      {t("heritage.sections.0.features.title")}
                    </h4>
                    <ul className="space-y-2 text-stone-600">
                      <li className="flex items-start">
                        <span className="text-red-700 mr-2">•</span>
                        {t("heritage.sections.0.features.weather")}
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-700 mr-2">•</span>
                        {t("heritage.sections.0.features.materials")}
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-700 mr-2">•</span>
                        {t("heritage.sections.0.features.technique")}
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-700 mr-2">•</span>
                        {t("heritage.sections.0.features.heritage")}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100">
                  <Image
                    src={section.image || "/placeholder.svg"}
                    alt={t(`heritage.sections.${index}.title`)}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Cultural Timeline */}
      <section className="py-20 bg-stone-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{t("heritage.timeline.title")}</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t("heritage.timeline.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">{t("heritage.timeline.mapuche.title")}</h3>
              <p className="text-stone-600">{t("heritage.timeline.mapuche.content")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">{t("heritage.timeline.european.title")}</h3>
              <p className="text-stone-600">{t("heritage.timeline.european.content")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">{t("heritage.timeline.modern.title")}</h3>
              <p className="text-stone-600">{t("heritage.timeline.modern.content")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Puerto Montt */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">{t("heritage.visit.title")}</h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">{t("heritage.visit.content")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
              <h3 className="text-xl font-semibold text-stone-800 mb-4">{t("heritage.visit.architecture.title")}</h3>
              <p className="text-stone-600">{t("heritage.visit.architecture.content")}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
              <h3 className="text-xl font-semibold text-stone-800 mb-4">{t("heritage.visit.culture.title")}</h3>
              <p className="text-stone-600">{t("heritage.visit.culture.content")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
