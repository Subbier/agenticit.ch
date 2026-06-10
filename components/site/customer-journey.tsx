"use client"

import { Fragment, useEffect, useState } from "react"
import { Megaphone, MessageCircle, Target, CheckCircle2, TrendingUp, Heart, Hand } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { industries, DEFAULT_INDUSTRY, getIndustryByValue } from "@/lib/lead-pricing"
import { getJourney } from "@/lib/revops-journeys"

type Snippet = ReturnType<typeof getJourney>

const stages: { icon: typeof Megaphone; label: string; body: (s: Snippet) => string }[] = [
  { icon: Megaphone, label: "Anziehen", body: (s) => s.attract },
  {
    icon: MessageCircle,
    label: "Sofort antworten",
    body: () => "Jede Anfrage bekommt in Sekunden eine freundliche Antwort – Tag und Nacht, auf jedem Kanal.",
  },
  {
    icon: Target,
    label: "Qualifizieren",
    body: () => "Die KI erkennt, wer wirklich kaufen will, und bereitet den Kontakt mit allen Details vor.",
  },
  { icon: CheckCircle2, label: "Abschliessen", body: (s) => s.close },
  { icon: TrendingUp, label: "Ausbauen", body: (s) => s.expand },
  { icon: Heart, label: "Weiterempfehlen", body: (s) => s.advocate },
]

export function CustomerJourney() {
  const [industry, setIndustry] = useState<string>(DEFAULT_INDUSTRY)
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const snippet = getJourney(industry)
  const industryLabel = getIndustryByValue(industry).label
  const current = stages[active]
  const Icon = current.icon

  // Auto-Ablauf bis zur ersten Berührung
  useEffect(() => {
    if (touched) return
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), 3200)
    return () => clearInterval(id)
  }, [touched])

  const pick = (i: number) => {
    setActive(i)
    setTouched(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Ihre Kundenreise</p>
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">So sieht das bei Ihnen aus.</h2>
        <p className="mt-4 text-base text-white/70 max-w-2xl mx-auto">
          Wählen Sie Ihre Branche – wir zeigen Ihnen, wie wir Ihre Kundenreise von der ersten Aufmerksamkeit bis zur
          Weiterempfehlung automatisieren.
        </p>
      </div>

      <div className="mx-auto mb-10 max-w-xs">
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger className="h-12 bg-white/10 border-white/20 text-white backdrop-blur-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            {industries.map((ind) => (
              <SelectItem key={ind.value} value={ind.value}>
                {ind.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Interaktiver Pfad */}
      <div className="relative">
        <style>{`@keyframes jtap{0%,100%{transform:translate(0,0) scale(1);opacity:.9}50%{transform:translate(0,6px) scale(.82);opacity:.5}}`}</style>
        <div className="flex items-center">
          {stages.map((s, i) => {
            const done = i < active
            const isActive = i === active
            return (
              <Fragment key={s.label}>
                <button
                  onClick={() => pick(i)}
                  onMouseEnter={() => pick(i)}
                  aria-label={`Schritt ${i + 1}: ${s.label}`}
                  className={`relative flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 sm:size-11 ${
                    isActive
                      ? "scale-110 border-emerald-300 bg-emerald-300 text-black shadow-lg shadow-emerald-300/20"
                      : done
                        ? "border-emerald-300/40 bg-emerald-300/15 text-emerald-200"
                        : "border-white/15 bg-white/[0.04] text-white/45"
                  }`}
                >
                  {i + 1}
                  {i === 0 && !touched && (
                    <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2" style={{ animation: "jtap 1.3s ease-in-out infinite" }}>
                      <Hand className="size-7 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
                    </span>
                  )}
                </button>
                {i < stages.length - 1 && (
                  <div className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${done ? "bg-emerald-300/60" : "bg-white/12"}`} />
                )}
              </Fragment>
            )
          })}
        </div>
        {/* Labels (ab sm) */}
        <div className="mt-3 hidden grid-cols-6 gap-1 sm:grid">
          {stages.map((s, i) => (
            <span
              key={s.label}
              className={`text-center text-xs leading-tight transition-colors ${i === active ? "text-emerald-200 font-semibold" : "text-white/45"}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Detail-Karte */}
      <div className="mt-8 rounded-3xl border border-white/12 bg-white/[0.05] p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200">
            <Icon className="size-6" />
          </span>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-white/40">Schritt {active + 1} von {stages.length}</span>
            <h3 className="text-xl font-bold text-white leading-tight">{current.label}</h3>
          </div>
        </div>
        <p key={`${industry}-${active}`} className="mt-4 text-base leading-7 text-white/75 animate-fade-in-up">
          {current.body(snippet)}
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-white/50">
        Beispielhafte Reise für <span className="text-emerald-200 font-medium">{industryLabel}</span> – die Details
        stimmen wir in einem kurzen Gespräch auf Sie ab.
      </p>
    </div>
  )
}
