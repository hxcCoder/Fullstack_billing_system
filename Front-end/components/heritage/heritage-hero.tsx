"use client"

import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function HeritageHero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full">
      <div className="relative h-full w-full">
        <Image
          src="/traditional-shingle-architecture-puerto-montt-chil.png"
          alt={t("heritage.hero.alt")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("heritage.hero.title")}</h1>
            <p className="text-xl md:text-2xl leading-relaxed">{t("heritage.hero.subtitle")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
