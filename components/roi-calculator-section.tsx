"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion"
import { ChevronDown, Check, Info, FileDown } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { formatChf } from "@/lib/format-currency"
import { PILLARS, computeRoi, type Scenario } from "@/lib/microservices"

const SCENARIOS: { key: Scenario; label: string; hint: string }[] = [
  { key: "min", label: "Vorsichtig", hint: "tief gerechnet" },
  { key: "schnitt", label: "Realistisch", hint: "Durchschnitt" },
  { key: "pro", label: "Optimistisch", hint: "Best Case" },
]

function AnimatedChf({ value }: { value: number }) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => formatChf(v))
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.45, ease: "easeOut" })
    return controls.stop
  }, [value, mv])
  return <motion.span>{text}</motion.span>
}

/** Kleines „i“ mit Tooltip – versteckt Quellen/Belege, bis man drüberfährt. */
function InfoDot({ text }: { text: string }) {
  return (
    <span
      tabIndex={0}
      title={text}
      aria-label={`Quelle: ${text}`}
      className="inline-grid h-[18px] w-[18px] flex-none cursor-help place-items-center rounded-full border border-[#c7d3e6] bg-white text-[#5A6B82] outline-none transition hover:border-[#16C7C0] hover:text-[#0a8f89] focus-visible:ring-2 focus-visible:ring-[#16C7C0]/40"
    >
      <Info className="h-[11px] w-[11px]" />
    </span>
  )
}

/** Nummern-Badge, macht die zwei Schritte als oberste Ebene erkennbar. */
function StepBadge({ n }: { n: number }) {
  return (
    <span className="grid h-[28px] w-[28px] flex-none place-items-center rounded-full bg-[#0B1F3A] text-[14px] font-extrabold text-white">
      {n}
    </span>
  )
}

export function ROICalculatorSection() {
  const [scenario, setScenario] = useState<Scenario>("schnitt")
  const [selected, setSelected] = useState<Set<string>>(new Set(["lead", "sales", "bot"]))
  const [open, setOpen] = useState<Set<string>>(new Set(["revops"]))
  const [investment, setInvestment] = useState(60000)
  const [showNotes, setShowNotes] = useState(false)

  const result = useMemo(() => computeRoi(selected, scenario, investment), [selected, scenario, investment])

  const toggle = (set: Set<string>, key: string, fn: (s: Set<string>) => void) => {
    const next = new Set(set)
    next.has(key) ? next.delete(key) : next.add(key)
    fn(next)
  }

  return (
    <section id="roi-calculator" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <span className="inline-block rounded-full bg-[#16C7C0]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
          Erst die Zahl, dann die Technik
        </span>
        <h2 className="mt-3 text-[clamp(26px,3.6vw,36px)] font-extrabold tracking-[-0.5px] text-[#0B1F3A]">
          Rechnen Sie nach – in 20 Sekunden.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-[1.6] text-[#475569]">
          Andere verkaufen Tools. Wir zeigen Ihnen zuerst, welches Jahrespotenzial in Ihrem Betrieb steckt –
          konservativ gerechnet, auf belegten Studienwerten.
        </p>
      </div>

      {/* Weisse Rechner-Karte (äusserer Rahmen) */}
      <div className="mx-auto mt-10 max-w-[1120px] px-6">
        <div className="overflow-hidden rounded-[20px] border border-[#E3E9F2] border-t-[4px] border-t-[#16C7C0] bg-white text-[#0B1F3A] shadow-[0_18px_48px_rgba(11,31,58,0.28)]">
          {/* Head */}
          <div className="border-b border-[#E3E9F2] bg-[#FAFCFF] px-5 pb-5 pt-6 md:px-8 md:pb-6 md:pt-7">
            <span className="mb-3 inline-block rounded-full bg-[#16C7C0]/15 px-[12px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.6px] text-[#0a8f89]">
              ROI-Rechner
            </span>
            <h3 className="text-[clamp(26px,3.8vw,36px)] font-extrabold leading-[1.1] tracking-[-0.6px] text-[#0B1F3A]">
              Was bringt Ihnen ein digitales Team?
            </h3>
            <p className="mt-2 text-[15px] font-medium leading-[1.55] text-[#475569] md:text-[16px]">
              In 2 Schritten zu Ihrer Zahl: erst festlegen, wie vorsichtig wir rechnen, dann die Bereiche wählen.
              Ihr <b className="font-bold text-[#0B1F3A]">Jahrespotenzial</b> aktualisiert sich live.
            </p>
          </div>

          {/* Body: Desktop 2-spaltig (Eingaben links, Ergebnis rechts), Mobile gestapelt */}
          <div className="grid grid-cols-1 gap-6 px-4 pb-6 pt-5 md:px-8 md:pb-8 md:pt-7 lg:grid-cols-[1fr_minmax(350px,430px)] lg:gap-9">
            {/* Spalte 1 · Eingaben */}
            <div className="space-y-5">
              {/* SCHRITT 1 (innerer Block) */}
              <div className="rounded-[16px] border border-[#CBD6E6] bg-[#FAFCFF] p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <StepBadge n={1} />
                  <div>
                    <h4 className="text-[16px] font-bold leading-snug text-[#1f3553] md:text-[17px]">
                      Wie vorsichtig sollen wir rechnen?
                    </h4>
                    <p className="mt-1 text-[14px] leading-[1.5] text-[#5A6B82]">
                      „Vorsichtig“ rechnet bewusst tief – so ist Ihre Zahl garantiert nicht schöngerechnet.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-[6px] rounded-[14px] bg-[#F1F8FF] p-[5px]">
                  {SCENARIOS.map((s) => {
                    const active = scenario === s.key
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setScenario(s.key)}
                        aria-pressed={active}
                        className={cn(
                          "flex-1 rounded-[10px] py-[11px] text-[14px] font-bold transition",
                          active
                            ? "bg-white text-[#0B1F3A] shadow-[0_3px_10px_rgba(11,31,58,0.12)] ring-1 ring-[#16C7C0]/55"
                            : "text-[#5A6B82] hover:bg-white/60",
                        )}
                      >
                        {s.label}
                        <span className={cn("block text-[11px] font-semibold", active ? "text-[#0a8f89]" : "text-[#9aa9bf]")}>
                          {s.hint}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* SCHRITT 2 (innerer Block) */}
              <div className="rounded-[16px] border border-[#CBD6E6] bg-[#FAFCFF] p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <StepBadge n={2} />
                  <div>
                    <h4 className="text-[16px] font-bold leading-snug text-[#1f3553] md:text-[17px]">
                      Wobei soll die KI Sie entlasten?
                    </h4>
                    <p className="mt-1 text-[14px] leading-[1.5] text-[#5A6B82]">
                      Wählen Sie Ihre Bereiche – jede Auswahl erhöht Ihr Jahrespotenzial. Tippen Sie auf einen Bereich für Details.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-[10px]">
                  {PILLARS.map((p) => {
                    const cnt = p.products.filter((x) => selected.has(x.id)).length
                    const isOpen = open.has(p.key)
                    return (
                      <div
                        key={p.key}
                        className={cn(
                          "overflow-hidden rounded-[14px] border-2 bg-white transition",
                          cnt ? "border-[#0a8f89] shadow-[0_4px_16px_rgba(10,143,137,0.16)]" : "border-[#D7E0EC]",
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => toggle(open, p.key, setOpen)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center gap-[12px] px-[15px] py-[14px] text-left"
                        >
                          <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[11px] bg-[#F1F8FF] text-[19px]">
                            {p.icon}
                          </span>
                          <span className="flex-1">
                            <span className="block text-[16px] font-extrabold leading-[1.2] text-[#0B1F3A]">{p.plain}</span>
                            <span className="mt-[2px] block text-[12.5px] font-medium text-[#5A6B82]">
                              {p.benefit} · <span className="text-[#9aa9bf]">{p.name}</span>
                            </span>
                          </span>
                          <span
                            className={cn(
                              "min-w-[38px] rounded-full px-[10px] py-[4px] text-center text-[12.5px] font-extrabold",
                              cnt ? "bg-[#16C7C0]/15 text-[#0a8f89]" : "bg-[#F1F8FF] text-[#5A6B82]",
                            )}
                          >
                            {cnt}/{p.products.length}
                          </span>
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="flex-none">
                            <ChevronDown className="h-[18px] w-[18px] text-[#5A6B82]" />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="flex flex-col gap-2 border-t border-[#EEF2F7] bg-[#FAFCFF] px-3 pb-3 pt-3">
                                {p.products.map((x) => {
                                  const on = selected.has(x.id)
                                  return (
                                    <button
                                      key={x.id}
                                      type="button"
                                      onClick={() => toggle(selected, x.id, setSelected)}
                                      aria-pressed={on}
                                      className={cn(
                                        "flex items-center gap-[12px] rounded-[12px] border bg-white px-3 py-[11px] text-left transition",
                                        on ? "border-[#5fd8d2] bg-[#16C7C0]/[0.06]" : "border-[#EEF2F7] hover:border-[#dbe3ee]",
                                      )}
                                    >
                                      <span
                                        className={cn(
                                          "grid h-[22px] w-[22px] flex-none place-items-center rounded-[7px] border-[1.5px] transition",
                                          on ? "border-[#16C7C0] bg-[#16C7C0] text-white" : "border-[#cdd8e8]",
                                        )}
                                      >
                                        {on && <Check className="h-[14px] w-[14px]" />}
                                      </span>
                                      <span className="flex-1">
                                        <span className="block text-[15px] font-bold leading-[1.25] text-[#0B1F3A]">{x.name}</span>
                                        <span className="mt-[1px] block text-[12.5px] leading-[1.4] text-[#5A6B82]">{x.desc}</span>
                                      </span>
                                      <InfoDot text={x.src} />
                                    </button>
                                  )
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Spalte 2 · Ergebnis (Desktop: klebend) */}
            <div className="self-start lg:sticky lg:top-24">
              <div className="rounded-[16px] border border-[#E3E9F2] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] p-5 md:p-6">
                <div className="text-[13px] font-bold uppercase tracking-[0.4px] text-[#5A6B82]">
                  Ihr Return on Invest (ROI)
                </div>
                <div className="my-1 text-[clamp(40px,6.2vw,56px)] font-extrabold leading-[1.0] tracking-[-1.5px] text-[#0a8f89]">
                  {result.roi > 0 ? "+" : ""}
                  {Math.round(result.roi).toLocaleString("de-CH")} %
                </div>
                <div className="text-[15px] font-semibold text-[#475569]">
                  Jahrespotenzial{" "}
                  <b className="font-extrabold text-[#0B1F3A]">
                    <AnimatedChf value={result.annual} />
                  </b>
                </div>
                <div className="mt-3 text-[13px] leading-[1.5] text-[#5A6B82]">
                  {result.count ? (
                    <>
                      Basis: <b className="font-bold text-[#0B1F3A]">{result.count} Bereich(e)</b> · 3-Jahres-Effekt{" "}
                      <b className="font-bold text-[#0B1F3A]">{formatChf(result.threeYear)}</b> · Jahres-Ersparnis{" "}
                      <b className="font-bold text-[#0B1F3A]">{formatChf(result.savings)}</b>
                    </>
                  ) : (
                    "Bitte mindestens einen Bereich wählen."
                  )}
                </div>

                <div className="mt-4 border-t border-[#D5E6F0] pt-4">
                  <div className="flex items-center justify-between text-[13.5px] font-semibold text-[#475569]">
                    <span>Ihre Jahres-Investition</span>
                    <b className="text-[15px] font-extrabold text-[#0B1F3A]">{formatChf(investment)}</b>
                  </div>
                  <Slider
                    className="mt-3"
                    min={12000}
                    max={360000}
                    step={6000}
                    value={[investment]}
                    onValueChange={(v) => setInvestment(v[0])}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  /* TODO: PDF-Auswertung erzeugen / Lead-Formular (DSG-konform) anbinden */
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-[13px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] py-[15px] text-center text-[16px] font-extrabold text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)] transition hover:-translate-y-[1px]"
              >
                <FileDown className="h-[18px] w-[18px]" />
                Auswertung als PDF sichern
              </button>

              {/* Hinweise/Quellen hinter „i“ – hält die Karte ruhig */}
              <button
                type="button"
                onClick={() => setShowNotes((v) => !v)}
                aria-expanded={showNotes}
                className="mx-auto mt-3 flex items-center gap-[6px] text-[12.5px] font-semibold text-[#5A6B82] transition hover:text-[#0a8f89]"
              >
                <Info className="h-[14px] w-[14px]" />
                Hinweise &amp; Quellen
                <ChevronDown className={cn("h-[13px] w-[13px] transition", showNotes && "rotate-180")} />
              </button>
              <AnimatePresence initial={false}>
                {showNotes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mt-2 text-center text-[11.5px] leading-[1.5] text-[#9aa9bf]">
                      Unverbindlich · Ihre personalisierte PDF-Auswertung erhalten Sie nach kurzer Kontaktangabe (DSG-konform).
                      Werte sind indikativ und beruhen auf belegten Studienwerten. KI-gestützter Entwurf – vor Nutzung menschlich geprüft.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
