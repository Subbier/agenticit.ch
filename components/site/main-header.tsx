"use client"

// Gemeinsamer Header für die ganze Website (29.07.2026).
//
// Ersetzt die Implementierungen von site-header.tsx UND carbon-header.tsx. Beide
// pflegten dieselbe Navigationsliste doppelt und öffneten weisse Dropdown-Kästen
// auf dunklem Grund — im Carbon-&-Signal-Kontext ein Fremdkörper.
//
// Die Navigationsdaten werden bewusst als Prop hereingereicht und NICHT hier
// importiert: `site-nav-data.ts` leitet sie aus subpage-content.ts und
// angebot-content.ts ab (zusammen ~50 kB Quelltext). Als Client-Komponente würde
// dieser Import beide Dateien ins Browser-Bundle ziehen. So bleibt nur die fertige,
// kleine Liste übrig.
//
// Mega-Menü: EIN Panel für alle Hubs, ohne Spalten-Überschriften. Jede Spalte
// steht exakt unter ihrem Menüpunkt — die x-Positionen der Labels werden dafür
// gemessen (Labels sind unterschiedlich breit, reine CSS-Raster können das nicht).

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import type { NavHub } from "@/components/site/site-nav-data"

const OPEN_DELAY = 120
const CLOSE_DELAY = 180

/** Höhe einer Menüzeile im Panel (px) — Basis für die Panelhöhe. */
const PANEL_ROW_H = 32
const PANEL_PAD_TOP = 10
const PANEL_PAD_BOTTOM = 22

/** Zertifizierungen, die im Mega-Menü rechts stehen. */
const CERTIFIED_BY = ["Google", "Microsoft", "Anthropic", "Semrush", "LinkedIn", "Meta"]

const CONTACT_PHONE_TEL = "+41315394444"
const CONTACT_PHONE_LABEL = "031 539 44 44"

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5h3l1.2 4-2 1.4a12 12 0 0 0 5 5l1.4-2 4 1.2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3 w-3 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MainHeader({ hubs, activeSlug }: { hubs: NavHub[]; activeSlug?: string }) {
  const [openHub, setOpenHub] = useState<string | null>(null)
  /** Per Klick fixiert — dann schliesst blosses Wegfahren mit der Maus nicht. */
  const [pinned, setPinned] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  /** x-Position (px, relativ zum Header) des Label-Texts je Hub. */
  const [colX, setColX] = useState<Record<string, number> | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const labelRefs = useRef(new Map<string, HTMLAnchorElement>())
  const phoneRef = useRef<HTMLAnchorElement>(null)
  /** x-Position des Telefonhörers — dort beginnt der Zertifizierungs-Block. */
  const [certX, setCertX] = useState<number | null>(null)

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }, [])

  useEffect(() => () => clearTimer(), [clearTimer])

  const scheduleOpen = useCallback(
    (label: string) => {
      clearTimer()
      timer.current = setTimeout(() => setOpenHub(label), OPEN_DELAY)
    },
    [clearTimer],
  )

  const scheduleClose = useCallback(() => {
    if (pinned) return
    clearTimer()
    timer.current = setTimeout(() => setOpenHub(null), CLOSE_DELAY)
  }, [pinned, clearTimer])

  const closeNow = useCallback(() => {
    clearTimer()
    setOpenHub(null)
    setPinned(false)
  }, [clearTimer])

  /** Misst, wo jeder Menüpunkt-Text beginnt — die Panel-Spalten starten exakt dort. */
  const measure = useCallback(() => {
    const header = headerRef.current
    if (!header) return
    const headerLeft = header.getBoundingClientRect().left
    const pos: Record<string, number> = {}
    labelRefs.current.forEach((el, label) => {
      // px-3 am Label: der Text beginnt 12px innerhalb des Link-Rechtecks.
      pos[label] = el.getBoundingClientRect().left - headerLeft + 12
    })
    setColX(pos)
    setCertX(phoneRef.current ? phoneRef.current.getBoundingClientRect().left - headerLeft : null)
  }, [])

  useEffect(() => {
    if (!openHub) return
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [openHub, measure])

  // Escape schliesst, Klick ausserhalb schliesst.
  useEffect(() => {
    if (!openHub) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow()
    }
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) closeNow()
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("mousedown", onClick)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("mousedown", onClick)
    }
  }, [openHub, closeNow])

  const isActive = (hub: NavHub) => {
    if (!activeSlug) return false
    const slug = hub.href.replace(/^\//, "")
    return (
      activeSlug === slug ||
      activeSlug.startsWith(`${slug}/`) ||
      hub.items.some((i) => `/${activeSlug}` === i.href)
    )
  }

  const maxRows = Math.max(...hubs.map((h) => h.items.length), 2)
  const panelHeight = PANEL_PAD_TOP + maxRows * PANEL_ROW_H + PANEL_PAD_BOTTOM

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0A0C10]">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-5 px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-[19px] font-bold tracking-[-0.02em] text-white"
        >
          Agentic<span className="text-[#57C7FF]">IT</span>
        </Link>

        {/* Links zusammengezogen mit grosszügigen Abständen — rechts bleibt
            Platz für den Zertifizierungs-Text im Mega-Menü. */}
        <nav
          aria-label="Hauptnavigation"
          className="ml-6 hidden flex-1 items-center gap-3 md:flex lg:ml-10 lg:gap-6 xl:gap-8"
        >
          {hubs.map((hub) => {
            const active = isActive(hub)
            const hasPanel = hub.items.length > 0
            const open = openHub === hub.label

            const labelClass = `inline-flex items-center gap-1 rounded-[6px] px-3 py-2 font-[family-name:var(--font-carbon-text)] text-[14px] font-medium transition ${
              active || open ? "text-white" : "text-[#8B94A1] hover:text-white"
            }`

            if (!hasPanel) {
              return (
                <Link
                  key={hub.label}
                  href={hub.href}
                  aria-current={active ? "page" : undefined}
                  className={labelClass}
                  onMouseEnter={() => {
                    clearTimer()
                    setOpenHub(null)
                  }}
                >
                  {hub.label}
                </Link>
              )
            }

            return (
              <div
                key={hub.label}
                onMouseEnter={() => scheduleOpen(hub.label)}
                onMouseLeave={scheduleClose}
              >
                {/* Das Label ist ein echter Link auf die Hub-Seite — wichtig für die
                    interne Verlinkung. Vorher waren „Lösungen" und „Bereiche" reine
                    Dropdown-Auslöser ohne eigenen Link; die Search Console meldete
                    /loesungen deshalb als „Gefunden – zurzeit nicht indexiert". */}
                <span className="inline-flex items-center">
                  <Link
                    href={hub.href}
                    ref={(el) => {
                      if (el) labelRefs.current.set(hub.label, el)
                      else labelRefs.current.delete(hub.label)
                    }}
                    aria-current={active ? "page" : undefined}
                    className={labelClass}
                    onFocus={() => setOpenHub(hub.label)}
                  >
                    {hub.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-label={`${hub.label}: Untermenü ${open ? "schliessen" : "öffnen"}`}
                    onClick={() => {
                      clearTimer()
                      if (open && pinned) {
                        closeNow()
                      } else {
                        setOpenHub(hub.label)
                        setPinned(true)
                      }
                    }}
                    className={`-ml-2 rounded-[6px] p-2 transition ${
                      active || open ? "text-white" : "text-[#8B94A1] hover:text-white"
                    }`}
                  >
                    <Chevron open={open} />
                  </button>
                </span>
              </div>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            ref={phoneRef}
            aria-label={`Anrufen: ${CONTACT_PHONE_LABEL}`}
            title={`Anrufen: ${CONTACT_PHONE_LABEL}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.12] text-[#8B94A1] transition hover:border-[#8FE05A]/50 hover:text-white"
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
          </a>
          <Link
            href="/kontakt"
            aria-label="Kontakt – Nachricht schreiben"
            title="Kontakt – Nachricht schreiben"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.12] text-[#8B94A1] transition hover:border-[#8FE05A]/50 hover:text-white"
          >
            <MailIcon className="h-[18px] w-[18px]" />
          </Link>
        </div>

        <Link
          href="/karriere"
          className="ml-2 hidden rounded-[8px] bg-[#8FE05A] px-[18px] py-[10px] font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-[#122400] transition hover:bg-[#A2E874] md:inline-block"
        >
          Profis gesucht!
        </Link>

        {/* Mobil */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex items-center gap-2 rounded-[8px] border border-white/[0.14] px-3 py-2 font-[family-name:var(--font-carbon-text)] text-[14px] font-medium text-white md:hidden"
        >
          Menü
          <Chevron open={mobileOpen} />
        </button>
      </div>

      {/* ===== Mega-Menü: ein Panel für alle Hubs. Keine Überschriften — die
             Menüpunkte oben SIND die Überschriften, jede Spalte beginnt exakt
             auf deren Linie. ===== */}
      {openHub && colX && (
        <div
          className="absolute inset-x-0 top-full hidden md:block"
          onMouseEnter={clearTimer}
          onMouseLeave={scheduleClose}
        >
          <div className="border-b border-white/[0.10] bg-[#0F131A] shadow-[0_28px_70px_rgba(0,0,0,0.55)]">
            <div className="relative" style={{ height: panelHeight }}>
              {hubs
                .filter((hub) => hub.items.length > 0)
                .map((col) => (
                  <div
                    key={col.label}
                    className="absolute flex flex-col"
                    style={{ left: colX[col.label] ?? 24, top: PANEL_PAD_TOP }}
                  >
                    {col.items.map((item) => {
                      const itemActive = activeSlug ? `/${activeSlug}` === item.href : false
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeNow}
                          aria-current={itemActive ? "page" : undefined}
                          className={`flex items-center whitespace-nowrap font-[family-name:var(--font-carbon-text)] text-[13.5px] font-semibold transition ${
                            itemActive ? "text-[#8FE05A]" : "text-[#C7CFD8] hover:text-white"
                          }`}
                          style={{ height: PANEL_ROW_H }}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                ))}

              {/* Zertifizierungen: linksbündig auf der Spalte des Telefonhörers.
                  Reiner Text, keine Logos — so von Sabir festgelegt (29.07.2026). */}
              <div
                className="absolute hidden max-w-[260px] lg:block"
                style={{ left: certX ?? undefined, right: certX == null ? 24 : undefined, top: PANEL_PAD_TOP }}
              >
                {/* Erste Zeile exakt wie eine Menüzeile: gleiche Höhe, gleiche Farbe. */}
                <span
                  className="flex items-center font-[family-name:var(--font-carbon-text)] text-[13.5px] font-semibold text-[#C7CFD8]"
                  style={{ height: PANEL_ROW_H }}
                >
                  AgenticIT is certified by
                </span>
                <span className="block font-[family-name:var(--font-carbon-text)] text-[13.5px] font-semibold leading-[1.8] text-[#C7CFD8]">
                  {CERTIFIED_BY.join(" · ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="max-h-[75vh] overflow-auto border-t border-white/[0.08] bg-[#0F131A] px-4 py-4 md:hidden">
          {hubs.map((hub) => (
            <div key={hub.label} className="mb-3 last:mb-0">
              <Link
                href={hub.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-[8px] px-2 py-2 font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-white hover:bg-white/[0.05]"
              >
                {hub.label}
              </Link>
              {hub.items.length > 0 && (
                <div className="ml-2 border-l border-white/[0.10] pl-2">
                  {hub.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-[7px] px-2 py-[7px] font-[family-name:var(--font-carbon-text)] text-[13.5px] text-[#8B94A1] hover:bg-white/[0.05] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.08] pt-4">
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="flex items-center justify-center gap-2 rounded-[8px] border border-white/[0.14] px-3 py-[10px] font-[family-name:var(--font-carbon-text)] text-[13.5px] font-semibold text-white"
            >
              <PhoneIcon className="h-4 w-4 text-[#57C7FF]" /> Anrufen
            </a>
            <Link
              href="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-[8px] border border-white/[0.14] px-3 py-[10px] font-[family-name:var(--font-carbon-text)] text-[13.5px] font-semibold text-white"
            >
              <MailIcon className="h-4 w-4 text-[#57C7FF]" /> Kontakt
            </Link>
          </div>
          <Link
            href="/karriere"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-[8px] bg-[#8FE05A] px-3 py-[11px] text-center font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-[#122400]"
          >
            Profis gesucht!
          </Link>
        </div>
      )}
    </header>
  )
}
