"use client"

import Link from "next/link"
import { useState } from "react"
import { ANGEBOT_AREAS } from "@/lib/angebot-content"

// Orbit = die drei Reise-Phasen; Hub (Mitte) = Erweitern.
const orbit = ANGEBOT_AREAS.filter((a) => a.key !== "erweitern")
const hub = ANGEBOT_AREAS.find((a) => a.key === "erweitern")!

// Positionen der drei Stationen rund um den Motor (Prozent, transform-zentriert).
const POS = [
  { top: "3%", left: "50%" }, // Begeistern – oben
  { top: "74%", left: "87%" }, // Umsetzen – unten rechts
  { top: "74%", left: "13%" }, // Erschaffen – unten links
]

export function AngebotFlywheel() {
  const [active, setActive] = useState<number | null>(null)
  const current = active === null ? null : orbit[active]

  return (
    <div className="mx-auto grid max-w-[980px] grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,440px)_1fr]">
      {/* Das Rad */}
      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        {/* Ringe / Motor */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="100" cy="100" r="74" fill="none" stroke="#E1E4E8" strokeWidth="1.5" />
          <circle
            cx="100"
            cy="100"
            r="74"
            fill="none"
            stroke="#1F9A5E"
            strokeWidth="2"
            strokeDasharray="3 9"
            strokeLinecap="round"
            className="origin-center animate-[spin_26s_linear_infinite] opacity-60 motion-reduce:animate-none"
          />
          {/* Flussrichtung: drei Pfeilspitzen auf dem Ring */}
          {[ -30, 90, 210 ].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x = 100 + 74 * Math.cos(rad)
            const y = 100 + 74 * Math.sin(rad)
            return (
              <g key={deg} transform={`translate(${x} ${y}) rotate(${deg + 90})`}>
                <path d="M-4 -3 L4 0 L-4 3 Z" fill="#1F9A5E" opacity="0.85" />
              </g>
            )
          })}
        </svg>

        {/* Hub: Erweitern */}
        <div className="absolute left-1/2 top-1/2 flex aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#E1E4E8] bg-white p-4 text-center">
          {current === null ? (
            <>
              <span className="text-[26px] leading-none" aria-hidden="true">{hub.icon}</span>
              <div className="mt-1 font-[family-name:var(--font-display)] text-[14px] font-bold leading-tight text-[#101418]">Erweitern</div>
              <div className="mt-0.5 font-[family-name:var(--font-carbon-text)] text-[10.5px] font-medium leading-tight text-[#8B94A1]">
                läuft im Hintergrund über alles
              </div>
            </>
          ) : (
            <>
              <span className="text-[24px] leading-none" aria-hidden="true">{current.icon}</span>
              <div className="mt-1 font-[family-name:var(--font-display)] text-[13.5px] font-bold leading-tight" style={{ color: current.accent }}>
                {current.navLabel}
              </div>
              <div className="mt-0.5 font-[family-name:var(--font-carbon-text)] text-[10px] font-medium leading-snug text-[#4A545F]">{current.german}</div>
            </>
          )}
        </div>

        {/* Drei Stationen */}
        {orbit.map((a, i) => {
          const isOn = active === i
          return (
            <Link
              key={a.key}
              href={`/${a.slug}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              style={{ top: POS[i].top, left: POS[i].left, transform: "translate(-50%,-50%)" }}
              className="group absolute flex w-[34%] max-w-[150px] flex-col items-center"
            >
              <span
                className="grid h-[58px] w-[58px] place-items-center rounded-full border bg-white text-[24px] transition duration-300"
                style={{
                  borderColor: isOn ? a.accent : "#E1E4E8",
                  transform: isOn ? "scale(1.1)" : "scale(1)",
                }}
                aria-hidden="true"
              >
                {a.icon}
              </span>
              <span className="mt-2 font-[family-name:var(--font-display)] text-[12.5px] font-bold leading-tight text-[#101418]">{a.navLabel}</span>
              <span className="font-[family-name:var(--font-carbon-text)] text-[10.5px] font-medium leading-tight text-[#8B94A1]">{a.german}</span>
            </Link>
          )
        })}
      </div>

      {/* Info-Panel */}
      <div className="text-center lg:text-left">
        <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#57C7FF]">
          {current === null ? "Der Wachstumsmotor" : current.eyebrow}
        </span>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(20px,3vw,26px)] font-bold tracking-[-0.015em] text-[#101418]">
          {current === null ? "Gewinnen, abschliessen, binden — Betrieb inklusive." : `${current.name} (${current.german})`}
        </h3>
        <p className="mx-auto mt-3 max-w-[460px] font-[family-name:var(--font-carbon-text)] text-[15px] leading-relaxed text-[#4A545F] lg:mx-0">
          {current === null
            ? "Fahren Sie über eine Station, um den Bereich kennenzulernen. Begeistern, Umsetzen und Erschaffen bilden die Reise Ihres Kunden — Erweitern hält im Zentrum den Betrieb am Laufen."
            : current.tagline}
        </p>

        {current === null ? (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {orbit.map((a) => (
              <span
                key={a.key}
                className="rounded-[6px] px-3 py-1.5 font-[family-name:var(--font-carbon-text)] text-[12.5px] font-semibold"
                style={{ background: a.accentSoft, color: a.accent }}
              >
                {a.navLabel}
              </span>
            ))}
          </div>
        ) : (
          <Link
            href={`/${current.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 rounded-[8px] px-5 py-3 font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-white transition hover:gap-2.5"
            style={{ background: current.accent }}
          >
            {current.navLabel} öffnen →
          </Link>
        )}
      </div>
    </div>
  )
}
