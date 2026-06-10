"use client"

import { useState } from "react"
import { Hand, Bot, Target, PenTool, MessageCircle, Filter, CalendarCheck, LineChart } from "lucide-react"

type Node = {
  id: string
  icon: typeof Bot
  label: string
  desc: string
}

// 6 Sub-Agenten unter dem KI-Manager
const team: Node[] = [
  { id: "strategie", icon: Target, label: "Strategie-Agent", desc: "Analysiert Markt und Wettbewerb, plant Kampagnen und steuert Budgets in Echtzeit." },
  { id: "content", icon: PenTool, label: "Content-Agent", desc: "Erstellt Anzeigen, Texte, Designs und Landingpages, die wirklich konvertieren." },
  { id: "dialog", icon: MessageCircle, label: "Dialog-Agent", desc: "Beantwortet jede Anfrage in Sekunden – auf Web, WhatsApp, Mail und Telefon." },
  { id: "qualify", icon: Filter, label: "Qualifizierungs-Agent", desc: "Erkennt echte Kaufabsicht, priorisiert Leads und bereitet den Kontakt vor." },
  { id: "termin", icon: CalendarCheck, label: "Termin-Agent", desc: "Prüft Verfügbarkeit, bucht und bestätigt Termine – ganz ohne Ihr Zutun." },
  { id: "daten", icon: LineChart, label: "Daten-Agent", desc: "Misst alles, optimiert rund um die Uhr und liefert Ihnen klare Reports." },
]

const manager = {
  id: "manager",
  icon: Bot,
  label: "KI-Manager",
  desc: "Koordiniert das gesamte Team, behält Ihr Ziel im Blick und übergibt Ihnen nur das Wesentliche: anrufbereite Kunden.",
}

export function AgentTeam() {
  const [sel, setSel] = useState<string>("manager")
  const [touched, setTouched] = useState(false)
  const pick = (id: string) => {
    setSel(id)
    setTouched(true)
  }
  const active = sel === "manager" ? manager : team.find((t) => t.id === sel) ?? manager

  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-3 sm:p-6">
      <style>{`@keyframes atap{0%,100%{transform:translate(0,0) scale(1);opacity:.9}50%{transform:translate(0,6px) scale(.82);opacity:.5}}`}</style>

      {/* KI-Manager – als Agenten-Knoten an der Spitze */}
      <div className="flex justify-center">
        <button
          onMouseEnter={() => pick("manager")}
          onClick={() => pick("manager")}
          className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition ${
            sel === "manager" ? "border-emerald-300/70 bg-emerald-300/15" : "border-emerald-300/40 bg-emerald-300/[0.08] hover:bg-emerald-300/15"
          }`}
        >
          <span className={`flex size-12 items-center justify-center rounded-xl ${sel === "manager" ? "bg-emerald-300 text-black" : "bg-emerald-300/20 text-emerald-200"}`}>
            <Bot className="size-6" />
          </span>
          <span className="text-sm font-bold text-white">KI-Manager</span>
        </button>
      </div>

      {/* Hierarchie-Verbinder */}
      <div className="mx-auto mt-2 h-4 w-px bg-white/15" />
      <div className="mx-auto h-px w-2/3 bg-white/12" />
      <p className="mt-3 mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
        Steuert 6 Sub-Agenten
      </p>

      {/* Sub-Agenten */}
      <div className="relative grid grid-cols-3 gap-2.5">
        {team.map((n) => {
          const isSel = sel === n.id
          const Icon = n.icon
          return (
            <button
              key={n.id}
              onMouseEnter={() => pick(n.id)}
              onClick={() => pick(n.id)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition ${
                isSel ? "border-emerald-300/60 bg-emerald-300/15" : "border-white/12 bg-white/[0.04] hover:bg-white/[0.07]"
              }`}
            >
              <span className={`flex size-10 items-center justify-center rounded-lg ${isSel ? "bg-emerald-300 text-black" : "bg-white/[0.06] text-emerald-200"}`}>
                <Icon className="size-5" />
              </span>
              <span className={`text-center text-[11px] sm:text-xs leading-tight ${isSel ? "font-semibold text-emerald-200" : "text-white/60"}`}>
                {n.label}
              </span>
            </button>
          )
        })}
        {!touched && (
          <span className="pointer-events-none absolute -bottom-7 left-[8%]" style={{ animation: "atap 1.3s ease-in-out infinite" }}>
            <Hand className="size-7 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          </span>
        )}
      </div>

      <div className="mt-7 min-h-[88px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
        <h3 className="text-lg font-bold text-white">{active.label}</h3>
        <p className="mt-1 text-sm leading-6 text-white/70">{active.desc}</p>
      </div>
      {!touched && <p className="mt-2 text-center text-xs text-emerald-200/90">Tippen Sie auf einen Agenten – er zeigt, was er für Sie übernimmt.</p>}
    </div>
  )
}
