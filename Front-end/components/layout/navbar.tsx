"use client"

import type React from "react"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"
import { useCart } from "@/contexts/cart-context"
import { BrandLogo } from "@/components/ui/brand-logo"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()
  const { state } = useCart()
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const leftNavItems = [
    { href: pathname === "/" ? "#gallery" : "/#gallery", label: t("nav.gallery") },
    { href: "/tienda", label: t("nav.store") },
    { href: pathname === "/" ? "#about" : "/#about", label: t("nav.about") },
  ]

  const rightNavItems = [
    { href: pathname === "/" ? "#projects" : "/#projects", label: t("nav.projects") },
    { href: pathname === "/" ? "#contact" : "/#contact", label: t("nav.contact") },
  ]

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        const focusableElement = element.querySelector('h1, h2, h3, [tabindex="0"]') as HTMLElement
        if (focusableElement) {
          focusableElement.focus()
        }
      }
    }
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false)
      menuButtonRef.current?.focus()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      document.addEventListener("keydown", handleTabKey)
      firstElement?.focus()

      return () => document.removeEventListener("keydown", handleTabKey)
    }
  }, [isOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-violet-500/30 neon-glow"
          : "bg-gray-900/90 backdrop-blur-sm border-b border-gray-700"
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1" role="menubar">
            {leftNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="relative text-gray-300 hover:text-violet-400 focus:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-3 py-2 transition-all duration-200 font-bold group whitespace-nowrap uppercase tracking-wider text-sm"
                role="menuitem"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full neon-glow"></span>
              </Link>
            ))}
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 mx-4 lg:mx-8">
            <BrandLogo
              variant="combined"
              size={isScrolled ? "sm" : "md"}
              className="transition-all duration-300 max-w-[120px] sm:max-w-[140px] lg:max-w-none neon-text"
            />
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden lg:flex items-center justify-end space-x-6 xl:space-x-8 flex-1" role="menubar">
            {rightNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="relative text-gray-300 hover:text-violet-400 focus:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-3 py-2 transition-all duration-200 font-bold group whitespace-nowrap uppercase tracking-wider text-sm"
                role="menuitem"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full neon-glow"></span>
              </Link>
            ))}

            <Link
              href="/tienda"
              className="relative p-2 text-gray-300 hover:text-violet-400 focus:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md transition-colors duration-200"
              aria-label={`Carrito de compras - ${state.itemCount} artículos`}
            >
              <ShoppingBag className="h-5 w-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium neon-glow">
                  {state.itemCount > 9 ? "9+" : state.itemCount}
                </span>
              )}
            </Link>

            <LanguageSwitcher />
          </div>

          <div className="lg:hidden flex items-center space-x-2 sm:space-x-3">
            {/* Mobile cart icon */}
            <Link
              href="/tienda"
              className="relative p-2 text-gray-300 hover:text-violet-400 focus:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md transition-colors duration-200"
              aria-label={`Carrito de compras - ${state.itemCount} artículos`}
            >
              <ShoppingBag className="h-5 w-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium neon-glow">
                  {state.itemCount > 9 ? "9+" : state.itemCount}
                </span>
              )}
            </Link>

            <LanguageSwitcher />
            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:bg-gray-800 hover:text-violet-400 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="lg:hidden absolute left-0 right-0 top-full bg-gray-900/98 backdrop-blur-md border-b border-violet-500/30 shadow-2xl z-[99] neon-glow"
            onKeyDown={handleKeyDown}
            role="menu"
            aria-label="Menú de navegación móvil"
          >
            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto underground-grid">
              {[...leftNavItems, ...rightNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="block px-4 py-3 text-gray-300 hover:text-violet-400 hover:bg-gray-800/50 focus:text-violet-400 focus:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 rounded-lg transition-all duration-200 font-bold uppercase tracking-wider"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
