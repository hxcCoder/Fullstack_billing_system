"use client"

import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/config"

interface BrandLogoProps {
  variant?: "image" | "text" | "combined"
  size?: "sm" | "md" | "lg"
  className?: string
  href?: string
  showText?: boolean
}

export function BrandLogo({
  variant = "image",
  size = "md",
  className = "",
  href = "/",
  showText = false,
}: BrandLogoProps) {
  const imageSizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10 sm:h-12 sm:w-12",
    lg: "h-14 w-14 sm:h-16 sm:w-16",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  }

  const LogoContent = () => {
    if (variant === "text") {
      return <span className={`font-bold text-stone-800 ${textSizeClasses[size]} ${className}`}>{siteConfig.name}</span>
    }

    if (variant === "combined") {
      return (
        <div className={`flex items-center space-x-3 ${className}`}>
          <Image
            src={siteConfig.branding.logo.primary || "/placeholder.svg"}
            alt={`${siteConfig.name} Logo`}
            width={48}
            height={48}
            className={`${imageSizeClasses[size]} object-contain`}
            priority
          />
          {showText && <span className={`font-bold text-stone-800 ${textSizeClasses[size]}`}>{siteConfig.name}</span>}
        </div>
      )
    }

    return (
      <Image
        src={siteConfig.branding.logo.primary || "/placeholder.svg"}
        alt={`${siteConfig.name} Logo`}
        width={48}
        height={48}
        className={`${imageSizeClasses[size]} object-contain ${className}`}
        priority
      />
    )
  }

  if (href) {
    return (
      <Link
        href={href}
        className="block hover:opacity-80 focus:opacity-80 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 rounded-md transition-all duration-200 hover:scale-105"
        aria-label={`${siteConfig.name} - Ir al inicio`}
      >
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}
