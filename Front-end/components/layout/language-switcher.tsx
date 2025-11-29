"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
  ]

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-stone-600" />
      <div className="flex space-x-1">
        {languages.map((lng) => (
          <Button
            key={lng.code}
            variant={language === lng.code ? "default" : "ghost"}
            size="sm"
            onClick={() => setLanguage(lng.code as "es" | "en")}
            className={
              language === lng.code
                ? "bg-red-700 hover:bg-red-800 text-white text-xs px-2 py-1 h-7"
                : "text-stone-600 hover:text-red-700 text-xs px-2 py-1 h-7"
            }
          >
            {lng.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
