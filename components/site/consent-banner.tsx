"use client"

// Einwilligungsdialog im Design-System „Carbon & Signal".
// Erscheint erst nach dem ersten Paint (kein Layout-Sprung, kein Blockieren des LCP)
// und bleibt stehen, bis eine bewusste Entscheidung getroffen wurde.
//
// Keine Kategorie ist vorausgewählt — vorangekreuzte Kästchen sind nach DSGVO
// keine gültige Einwilligung.

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  CONSENT_REOPEN_EVENT,
  applyConsent,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent"

type Category = {
  id: "necessary" | "statistics" | "marketing"
  label: string
  description: string
  tools: string
  locked?: boolean
}

const CATEGORIES: Category[] = [
  {
    id: "necessary",
    label: "Notwendig",
    description:
      "Hält die Seite funktionsfähig — Sicherheit, Formularversand und Ihre Auswahl auf dieser Karte. Lässt sich nicht abwählen.",
    tools: "Session, Sicherheits-Token, Einwilligungsspeicher",
    locked: true,
  },
  {
    id: "statistics",
    label: "Statistik",
    description:
      "Zeigt uns anonymisiert, welche Seiten gelesen werden und wo Besucher abbrechen. Wir nutzen das, um Inhalte zu verbessern.",
    tools: "Google Analytics 4",
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Erlaubt es, Werbung auf Ihre Interessen zuzuschneiden, und aktiviert unseren Live-Chat für direkte Fragen.",
    tools: "Meta Pixel, TikTok Pixel, Zoho SalesIQ (Chat)",
  },
]

export function ConsentBanner() {
  const [open, setOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [statistics, setStatistics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Erst nach dem Mount entscheiden, ob gefragt werden muss — sonst weicht das
  // Server-HTML vom Client ab (Hydration-Fehler).
  useEffect(() => {
    const stored = readConsent()
    if (!stored) {
      setOpen(true)
      return
    }
    setStatistics(stored.statistics)
    setMarketing(stored.marketing)
  }, [])

  // Footer-Link „Cookie-Einstellungen" öffnet den Dialog erneut.
  useEffect(() => {
    const reopen = () => {
      const stored = readConsent()
      setStatistics(stored?.statistics ?? false)
      setMarketing(stored?.marketing ?? false)
      setShowDetails(true)
      setOpen(true)
    }
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen)
  }, [])

  const decide = useCallback((choice: Pick<ConsentChoice, "statistics" | "marketing">) => {
    writeConsent(choice)
    applyConsent(choice)
    setStatistics(choice.statistics)
    setMarketing(choice.marketing)
    setOpen(false)
    setShowDetails(false)
  }, [])

  // Escape schliesst nur die Detailansicht. Ein Wegdrücken des Dialogs wäre
  // keine Entscheidung — und stille Zustimmung gibt es nicht.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showDetails) setShowDetails(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, showDetails])

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  if (!open) return null

  const toggle = (id: Category["id"]) => {
    if (id === "statistics") setStatistics((v) => !v)
    if (id === "marketing") setMarketing((v) => !v)
  }
  const isOn = (id: Category["id"]) =>
    id === "necessary" ? true : id === "statistics" ? statistics : marketing

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-5 sm:pb-5"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="mx-auto max-w-[720px] rounded-[16px] border border-white/[0.10] bg-[#0F131A] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.55)] outline-none sm:p-6"
      >
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-[3px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#57C7FF]" />
          <div className="min-w-0">
            <h2
              id="consent-title"
              className="font-[family-name:var(--font-display)] text-[17px] font-bold tracking-[-0.01em] text-white"
            >
              Sie entscheiden, was gemessen wird
            </h2>
            <p
              id="consent-desc"
              className="mt-1.5 font-[family-name:var(--font-carbon-text)] text-[14px] leading-[1.6] text-[#9AA6B2]"
            >
              Notwendige Cookies halten die Seite am Laufen. Alles Weitere — Reichweitenmessung,
              Werbung und unser Live-Chat — läuft nur, wenn Sie zustimmen. Sie können Ihre Wahl
              jederzeit im Footer ändern.{" "}
              <Link href="/datenschutz" className="font-semibold text-[#57C7FF] underline-offset-2 hover:underline">
                Datenschutz
              </Link>
            </p>
          </div>
        </div>

        {showDetails && (
          <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5">
            {CATEGORIES.map((cat) => {
              const on = isOn(cat.id)
              return (
                <li key={cat.id} className="rounded-[10px] bg-white/[0.03] p-3.5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-white">
                        {cat.label}
                        {cat.locked && (
                          <span className="ml-2 rounded-[5px] bg-white/[0.08] px-1.5 py-0.5 text-[11px] font-medium text-[#9AA6B2]">
                            immer aktiv
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-[family-name:var(--font-carbon-text)] text-[13px] leading-[1.55] text-[#9AA6B2]">
                        {cat.description}
                      </p>
                      <p className="mt-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[11.5px] text-[#6B7684]">
                        {cat.tools}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      aria-label={`${cat.label} ${on ? "aktiv" : "inaktiv"}`}
                      disabled={cat.locked}
                      onClick={() => toggle(cat.id)}
                      className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition ${
                        on ? "border-[#8FE05A]/60 bg-[#8FE05A]" : "border-white/[0.16] bg-white/[0.08]"
                      } ${cat.locked ? "cursor-not-allowed opacity-55" : "cursor-pointer"}`}
                    >
                      <span
                        className={`absolute top-[2px] h-[18px] w-[18px] rounded-full transition-all ${
                          on ? "left-[22px] bg-[#122400]" : "left-[2px] bg-white/70"
                        }`}
                      />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => decide({ statistics: true, marketing: true })}
            className="order-1 rounded-[9px] bg-[#8FE05A] px-5 py-[11px] font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-[#122400] transition hover:bg-[#A2E874] sm:order-3"
          >
            Alle akzeptieren
          </button>

          {showDetails ? (
            <button
              type="button"
              onClick={() => decide({ statistics, marketing })}
              className="order-2 rounded-[9px] border border-white/[0.16] px-5 py-[11px] font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-white transition hover:border-white/30 sm:order-2"
            >
              Auswahl speichern
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="order-2 rounded-[9px] border border-white/[0.16] px-5 py-[11px] font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-white transition hover:border-white/30 sm:order-2"
            >
              Einstellungen
            </button>
          )}

          <button
            type="button"
            onClick={() => decide({ statistics: false, marketing: false })}
            className="order-3 rounded-[9px] px-5 py-[11px] font-[family-name:var(--font-carbon-text)] text-[14px] font-medium text-[#9AA6B2] transition hover:text-white sm:order-1 sm:mr-auto"
          >
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  )
}
