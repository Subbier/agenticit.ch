"use client"

import { useState } from "react"
import { Hand, Layers, Megaphone, Share2, Search, PenTool, MessageCircle, Database } from "lucide-react"

type Node = {
  id: string
  icon: typeof Layers
  label: string
  desc: string
  left: string
  top: string
}

const disciplines: Node[] = [
  { id: "performance", icon: Megaphone, label: "Performance-Marketing", desc: "Anzeigen auf Google, Meta und LinkedIn – ausgespielt genau im Moment der Kaufbereitschaft.", left: "50%", top: "9%" },
  { id: "social", icon: Share2, label: "Social Media", desc: "Reichweite und Vertrauen auf Instagram, LinkedIn und TikTok – mit Inhalten, die im Kopf bleiben.", left: "85%", top: "30%" },
  { id: "seo", icon: Search, label: "SEO & Web", desc: "Schnelle, suchoptimierte Seiten, die in der Deutschschweiz gefunden werden und Anfragen bringen.", left: "85%", top: "70%" },
  { id: "content", icon: PenTool, label: "Content & Design", desc: "Texte, Designs und Werbemittel, die auffallen und konvertieren – konsistent über alle Kanäle.", left: "50%", top: "91%" },
  { id: "omnichannel", icon: MessageCircle, label: "Omnichannel", desc: "Web, WhatsApp, Mail und Telefon werden zu einem nahtlosen Gespräch – ohne Kontextverlust.", left: "15%", top: "70%" },
  { id: "crm", icon: Database, label: "Daten & CRM", desc: "Jede Anfrage sauber erfasst, bewertet und übergeben – ganz ohne Datenpflege für Sie.", left: "15%", top: "30%" },
]

const center = {
  label: "AgenticIT",
  desc: "Alles aus einer Hand: Disziplinen, die zusammenspielen, statt nebeneinander zu laufen. Sie behalten Ihre Tools – wir den Überblick.",
}

const lineTargets = [
  [50, 9],
  [85, 30],
  [85, 70],
  [50, 91],
  [15, 70],
  [15, 30],
]

export function ExcellenceMap() {
  const [sel, setSel] = useState<string>("center")
  const [touched, setTouched] = useState(false)
  const pick = (id: string) => {
    setSel(id)
    setTouched(true)
  }
  const active = sel === "center" ? center : disciplines.find((d) => d.id === sel) ?? center

  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-3 sm:p-6">
      <style>{`@keyframes etap{0%,100%{transform:translate(0,0) scale(1);opacity:.9}50%{transform:translate(0,6px) scale(.82);opacity:.5}}`}</style>

      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {lineTargets.map(([x, y], i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke={sel === disciplines[i].id ? "rgba(110,231,183,0.8)" : "rgba(110,231,183,0.28)"}
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* Center */}
        <button
          onMouseEnter={() => pick("center")}
          onClick={() => pick("center")}
          className={`absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center backdrop-blur-md transition ${
            sel === "center" ? "border-emerald-300 bg-emerald-300/20 scale-105" : "border-emerald-300/40 bg-emerald-300/10"
          }`}
        >
          <Layers className="size-6 text-emerald-200" />
          <span className="mt-1 text-xs font-bold text-white">AgenticIT</span>
        </button>

        {/* Disziplinen */}
        {disciplines.map((n) => {
          const isSel = sel === n.id
          const Icon = n.icon
          return (
            <button
              key={n.id}
              onMouseEnter={() => pick(n.id)}
              onClick={() => pick(n.id)}
              className="absolute flex w-[5.75rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
              style={{ left: n.left, top: n.top }}
            >
              <span className={`flex size-12 items-center justify-center rounded-2xl border transition ${
                isSel ? "border-emerald-300 bg-emerald-300 text-black scale-110" : "border-white/15 bg-black/60 text-emerald-200"
              }`}>
                <Icon className="size-5" />
              </span>
              <span className={`text-[11px] sm:text-xs leading-tight ${isSel ? "font-semibold text-emerald-200" : "text-white/60"}`}>
                {n.label}
              </span>
            </button>
          )
        })}

        {!touched && (
          <span className="pointer-events-none absolute" style={{ left: "62%", top: "20%", animation: "etap 1.3s ease-in-out infinite" }}>
            <Hand className="size-7 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          </span>
        )}
      </div>

      <div className="mt-5 min-h-[88px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
        <h3 className="text-lg font-bold text-white">{active.label}</h3>
        <p className="mt-1 text-sm leading-6 text-white/70">{active.desc}</p>
      </div>
      {!touched && <p className="mt-2 text-center text-xs text-emerald-200/90">Tippen Sie auf eine Disziplin – sie zeigt, was wir für Sie übernehmen.</p>}
    </div>
  )
}
