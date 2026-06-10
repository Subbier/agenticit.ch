"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, X } from "lucide-react"
import { navItems } from "@/lib/site-content"

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goToContact = () => {
    setOpen(false)
    const target = document.getElementById("contact")
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    window.location.href = "/#contact"
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition ${
          scrolled
            ? "border-white/[0.14] bg-neutral-950/[0.82] shadow-2xl shadow-black/25 backdrop-blur-xl"
            : "border-white/10 bg-neutral-950/[0.52] backdrop-blur-md"
        }`}
        aria-label="Hauptnavigation"
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-white text-sm font-black text-neutral-950">
            AI
          </span>
          <span className="text-base font-semibold tracking-tight text-white">AgenticIT</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active ? "text-emerald-200" : "text-white/72 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <button
          type="button"
          onClick={goToContact}
          className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-100 md:inline-flex"
        >
          Potenzial-Audit sichern
          <ArrowRight className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/[0.12] text-white md:hidden"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-lg border border-white/[0.12] bg-neutral-950/[0.94] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/[0.82] transition hover:bg-white/[0.08] hover:text-white"
              >
                {item.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={goToContact}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-neutral-950"
            >
              Potenzial-Audit sichern
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
