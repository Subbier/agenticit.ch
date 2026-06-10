"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AgenticITWordmark } from "@/components/agenticit-wordmark"
import { navItems } from "@/lib/site-content"

export function GlassmorphismNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true)
    }, 100)

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        // Only hide/show after scrolling past 50px to avoid flickering at top
        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            setIsVisible(false)
          } else if (lastScrollY.current - currentScrollY > 5) {
            setIsVisible(true)
          }
        } else {
          setIsVisible(true)
        }

        lastScrollY.current = currentScrollY
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true })

      return () => {
        window.removeEventListener("scroll", controlNavbar)
        clearTimeout(timer)
      }
    }

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      return
    }

    const element = document.querySelector(href)
    if (element) {
      const rect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const elementAbsoluteTop = rect.top + currentScrollY
      const navbarHeight = 100
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight)

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 xl:top-8 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 xl:-translate-y-24"
        } ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{
          transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        {/* Main Navigation — max-w-4xl (896px) + 20% = 67.2rem, zentriert */}
        <div className="mx-auto w-[min(90vw,24rem)] xl:w-[min(90vw,67.2rem)]">
          <div className="rounded-full border border-white/20 bg-white/10 py-3 pl-4 pr-3 backdrop-blur-md xl:py-2.5 xl:pl-8 xl:pr-2.5">
            <div className="grid grid-cols-[1fr_auto] items-center gap-3 xl:grid-cols-[auto_1fr_auto]">
              {/* Logo */}
              <Link
                href="/"
                className="flex shrink-0 items-center justify-self-start hover:opacity-90 transition-opacity duration-200 cursor-pointer"
                aria-label="AgenticIT – Startseite"
              >
                <AgenticITWordmark className="text-white" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden xl:flex xl:items-center xl:justify-center xl:gap-6 xl:justify-self-center 2xl:gap-8">
                {navItems.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="cursor-pointer whitespace-nowrap font-medium text-white/80 transition-all duration-200 hover:scale-105 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="cursor-pointer whitespace-nowrap font-medium text-white/80 transition-all duration-200 hover:scale-105 hover:text-white"
                    >
                      {item.name}
                    </button>
                  ),
                )}
              </div>

              {/* Desktop CTA / Mobile Menu */}
              <div className="justify-self-end">
                <button
                  className="relative hidden items-center rounded-full bg-white px-5 py-2 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-lg cursor-pointer group xl:inline-flex 2xl:px-6"
                  onClick={() => scrollToSection("#contact")}
                >
                  <span className="mr-2 whitespace-nowrap">Jetzt starten</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? "Menü schliessen" : "Menü öffnen"}
                  aria-expanded={isOpen}
                  className="text-white transition-transform duration-200 hover:scale-110 cursor-pointer xl:hidden"
                >
                  <div className="relative w-6 h-6">
                    <Menu
                      size={24}
                      className={`absolute inset-0 transition-all duration-300 ${
                        isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                      }`}
                    />
                    <X
                      size={24}
                      className={`absolute inset-0 transition-all duration-300 ${
                        isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative xl:hidden">
          {/* Backdrop overlay */}
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsOpen(false)}
            style={{ top: "0", left: "0", right: "0", bottom: "0", zIndex: -1 }}
          />

          {/* Menu container */}
          <div
            className={`mx-auto mt-2 w-[min(92vw,28rem)] transition-all duration-500 ease-out transform-gpu ${
              isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col space-y-1">
                {navItems.map((item, index) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 ${
                        isOpen ? "animate-mobile-menu-item" : ""
                      }`}
                      style={{
                        animationDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 ${
                        isOpen ? "animate-mobile-menu-item" : ""
                      }`}
                      style={{
                        animationDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                      }}
                    >
                      {item.name}
                    </button>
                  ),
                )}
                <div className="h-px bg-white/10 my-2" />
                <button
                  className={`relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-3 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group transform ${
                    isOpen ? "animate-mobile-menu-item" : ""
                  }`}
                  style={{
                    animationDelay: isOpen ? `${navItems.length * 80 + 150}ms` : "0ms",
                  }}
                  onClick={() => scrollToSection("#contact")}
                >
                  <span className="mr-2">Jetzt starten</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
