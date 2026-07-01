"use client"

import { useState } from "react"
import type { AngebotFaq } from "@/lib/angebot-content"

/**
 * Harmonika (Accordion) für die Detail-Leistungen eines Angebot-Bereichs.
 * Ein Eintrag ist offen; ein Klick auf den Pfeil öffnet/schliesst ihn mit
 * weicher Höhen-Animation (grid-rows 0fr → 1fr). Tastatur- & Screenreader-fähig.
 */
export function AngebotAccordion({ items, accent }: { items: AngebotFaq[]; accent: string }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-[820px] divide-y divide-[#E3E9F2] overflow-hidden rounded-[18px] border border-[#E3E9F2] bg-white shadow-[0_10px_30px_rgba(11,31,58,0.06)]">
      {items.map((it, i) => {
        const isOpen = open === i
        const panelId = `acc-panel-${i}`
        const btnId = `acc-btn-${i}`
        return (
          <div key={it.q}>
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3 px-5 py-[15px] text-left transition hover:bg-[#F8FBFE] sm:px-6"
              >
                <span
                  className="grid h-7 w-7 flex-none place-items-center rounded-full text-white"
                  style={{ background: accent }}
                  aria-hidden="true"
                >
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2.5 4.5 6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="flex-1 text-[15px] font-bold leading-snug text-[#0B1F3A] sm:text-[16px]">
                  {it.q}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-[18px] pl-[58px] text-[14.5px] leading-relaxed text-[#5A6B82] sm:px-6 sm:pl-[64px]">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
