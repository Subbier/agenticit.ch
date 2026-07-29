"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion"
import { FileDown, RotateCcw, CheckCircle2, Check, Info } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { formatChf } from "@/lib/format-currency"
import { computeAutomation } from "@/lib/automation-calculator"
import {
  automationReportHtml,
  downloadReport,
  openReport,
  reportFilename,
  roiReportHtml,
  type CalculatorReportContact,
} from "@/lib/calculator-reports"
import { PILLARS, computeRoi, type Scenario } from "@/lib/microservices"

const SCENARIOS: { key: Scenario; label: string; hint: string }[] = [
  { key: "min", label: "Vorsichtig", hint: "tief gerechnet" },
  { key: "schnitt", label: "Realistisch", hint: "Durchschnitt" },
  { key: "pro", label: "Optimistisch", hint: "Best Case" },
]

// Start bei null: nichts vorausgewählt, das Jahrespotenzial steht auf CHF 0.
const DEFAULT_PILLARS = new Set<string>()

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[#1F9A5E]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
      {children}
    </span>
  )
}

function AnimatedChf({ value }: { value: number }) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => formatChf(v))
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.4, ease: "easeOut" })
    return controls.stop
  }, [value, mv])
  return <motion.span>{text}</motion.span>
}

export function ROICalculatorSection() {
  const router = useRouter()
  // Zeitgewinn
  const [hoursPerWeek, setHoursPerWeek] = useState(0)
  const [hourlyRate, setHourlyRate] = useState(0)
  const [automationPercent, setAutomationPercent] = useState(0)
  // Startzustand: erst wenn ein Regler bewegt wurde, erscheinen Zahlen — davor 0.
  const [timeTouched, setTimeTouched] = useState(false)
  const automation = useMemo(
    () => computeAutomation({ hoursPerWeek, hourlyRate, automationPercent }),
    [hoursPerWeek, hourlyRate, automationPercent],
  )
  const shownAutomation = timeTouched
    ? automation
    : { ...automation, hoursSavedWeek: 0, hoursSavedYear: 0, valuePerYear: 0 }

  // ROI
  const [scenario, setScenario] = useState<Scenario>("schnitt")
  const [selectedPillars, setSelectedPillars] = useState<Set<string>>(new Set(DEFAULT_PILLARS))
  const [investment, setInvestment] = useState(0)

  const selectedProducts = useMemo(() => {
    const ids = new Set<string>()
    PILLARS.forEach((p) => {
      if (selectedPillars.has(p.key)) p.products.forEach((x) => ids.add(x.id))
    })
    return ids
  }, [selectedPillars])

  const roi = useMemo(() => computeRoi(selectedProducts, scenario, investment), [selectedProducts, scenario, investment])

  // Lead / Auswertung
  const [showForm, setShowForm] = useState(false)
  const [done, setDone] = useState(false)
  const [contact, setContact] = useState<CalculatorReportContact>({ name: "", address: "", phone: "", email: "" })
  const [consent, setConsent] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [popupBlocked, setPopupBlocked] = useState(false)
  const [savedReports, setSavedReports] = useState<{ automation: string; roi: string } | null>(null)
  const [showNotes, setShowNotes] = useState(false)

  const resetCalculator = useCallback(() => {
    setHoursPerWeek(0)
    setHourlyRate(0)
    setAutomationPercent(0)
    setTimeTouched(false)
    setScenario("schnitt")
    setSelectedPillars(new Set(DEFAULT_PILLARS))
    setInvestment(0)
    setShowForm(false)
    setDone(false)
    setContact({ name: "", address: "", phone: "", email: "" })
    setConsent(true)
    setSubmitting(false)
    setSubmitError("")
    setPopupBlocked(false)
    setSavedReports(null)
  }, [])

  const deliverReports = useCallback((autoHtml: string, roiHtml: string) => {
    downloadReport(autoHtml, reportFilename("Zeitgewinn"))
    window.setTimeout(() => downloadReport(roiHtml, reportFilename("ROI")), 350)
    const opened1 = openReport(autoHtml)
    window.setTimeout(() => openReport(roiHtml), 400)
    setSavedReports({ automation: autoHtml, roi: roiHtml })
    setPopupBlocked(!opened1)
    setDone(true)
  }, [])

  const togglePillar = (key: string) => {
    setSelectedPillars((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const canSubmit =
    contact.name.trim().length >= 2 &&
    contact.phone.trim().length >= 6 &&
    (contact.email?.includes("@") ?? false) &&
    consent

  async function handleDownload() {
    if (!canSubmit) return
    setSubmitting(true)
    setSubmitError("")
    setPopupBlocked(false)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "home",
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          company: contact.address,
          message: `AgenticIT-Rechner: ${automation.hoursSavedYear}h/Jahr gespart (${formatChf(automation.valuePerYear)}); ROI ${Math.round(roi.roi)}%; Invest ${investment}`,
          consent: true,
          company_website: "",
        }),
      }).catch(() => null)

      // Kein Sofort-Download mehr: Der Lead geht an uns, der Besucher landet auf der Danke-Seite.
      router.push("/danke-auswertung")
    } catch {
      setSubmitError("Auswertung konnte nicht erstellt werden. Bitte erneut versuchen.")
    } finally {
      setSubmitting(false)
    }
  }

  function redownload(which: "automation" | "roi" | "both") {
    if (!savedReports) return
    if (which === "automation" || which === "both") downloadReport(savedReports.automation, reportFilename("Zeitgewinn"))
    if (which === "roi" || which === "both") {
      window.setTimeout(() => downloadReport(savedReports.roi, reportFilename("ROI")), which === "both" ? 350 : 0)
    }
  }

  return (
    <section id="roi-calculator" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1120px] px-6">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Erst die Zahl, dann die Technik</Eyebrow>
          <h2 className="mt-3 text-[clamp(26px,3.6vw,36px)] font-extrabold tracking-[-0.5px] text-[#0A0C10]">
            Rechnen Sie nach – in 20 Sekunden.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[1.6] text-[#475569]">
            Andere verkaufen Tools. Wir zeigen Ihnen zuerst, welches Potenzial in Ihrem Betrieb steckt –
            konservativ gerechnet, auf belegten Studienwerten.
          </p>
        </div>

        {/* Karte */}
        <div className="mx-auto mt-10 overflow-hidden rounded-[20px] border border-[#E1E4E8] border-t-[4px] border-t-[#1F9A5E] bg-white text-[#0A0C10] shadow-[0_18px_48px_rgba(10,12,16,0.18)]">
          {/* Head */}
          <div className="border-b border-[#E1E4E8] bg-[#FAFAF7] px-5 pb-5 pt-6 md:px-8 md:pb-6 md:pt-7">
            <span className="mb-3 inline-block rounded-full bg-[#1F9A5E]/15 px-[12px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.6px] text-[#57C7FF]">
              ROI-Rechner
            </span>
            <h3 className="text-[clamp(24px,3.4vw,32px)] font-extrabold leading-[1.1] tracking-[-0.5px] text-[#0A0C10]">
              Was bringt Ihnen ein digitales Team?
            </h3>
            <p className="mt-2 text-[15px] font-medium leading-[1.55] text-[#475569] md:text-[16px]">
              Stellen Sie Ihre Eckdaten ein – Ihr <b className="font-bold text-[#0A0C10]">Zeitgewinn</b> und Ihr{" "}
              <b className="font-bold text-[#0A0C10]">ROI</b> aktualisieren sich live.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {done && savedReports ? (
              /* ===== Erfolg ===== */
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 md:p-10">
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1F9A5E]/15 text-[#57C7FF]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-[24px] font-extrabold text-[#0A0C10]">
                    Ihre Auswertung ist bereit{contact.name ? `, ${contact.name.split(" ")[0]}` : ""}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-[480px] text-[14px] leading-relaxed text-[#5A6B82]">
                    Beide Reports wurden heruntergeladen. Zum Speichern als PDF einfach im Browser drucken und „Als PDF speichern" wählen.
                  </p>
                  {popupBlocked ? (
                    <p className="mx-auto mt-3 max-w-[480px] rounded-[10px] bg-[#FFF7ED] px-3 py-2 text-[12px] text-[#9A3412]">
                      Pop-ups wurden blockiert – die Downloads funktionieren trotzdem über die Buttons unten.
                    </p>
                  ) : null}
                </div>
                <div className="mx-auto mt-6 grid max-w-[560px] gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => redownload("automation")} className="flex items-center justify-center gap-2 rounded-[12px] border border-[#E1E4E8] bg-[#8FE05A] px-4 py-3.5 text-[14px] font-bold text-[#122400] transition hover:border-[#1F9A5E]/40">
                    <FileDown className="h-4 w-4 text-[#57C7FF]" /> Report 1 · Zeitgewinn
                  </button>
                  <button type="button" onClick={() => redownload("roi")} className="flex items-center justify-center gap-2 rounded-[12px] border border-[#E1E4E8] bg-[#8FE05A] px-4 py-3.5 text-[14px] font-bold text-[#122400] transition hover:border-[#1F9A5E]/40">
                    <FileDown className="h-4 w-4 text-[#57C7FF]" /> Report 2 · ROI
                  </button>
                </div>
                <div className="mx-auto mt-6 flex max-w-[560px] justify-center">
                  <button type="button" onClick={resetCalculator} className="inline-flex items-center gap-2 rounded-[12px] border border-[#E1E4E8] px-5 py-3 text-[14px] font-bold text-[#5A6B82] transition hover:border-[#1F9A5E]/40 hover:text-[#57C7FF]">
                    <RotateCcw className="h-4 w-4" /> Neu rechnen
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ===== Rechner (2-spaltig) ===== */
              <motion.div key="calc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-6 px-4 pb-6 pt-5 md:px-8 md:pb-8 md:pt-7 lg:grid-cols-[1fr_minmax(350px,420px)] lg:gap-9">
                {/* Spalte 1 · Eingaben */}
                <div className="space-y-5">
                  {/* Zeitgewinn */}
                  <div className="rounded-[16px] border border-[#D3D9DF] bg-[#FAFAF7] p-4 md:p-5">
                    <h4 className="text-[16px] font-bold text-[#242B34] md:text-[17px]">1 · Wie viel Routine bindet Ihr Team?</h4>
                    <p className="mt-1 text-[13.5px] leading-[1.5] text-[#5A6B82]">
                      Wiederkehrende Aufgaben, die kein Geld bringen – die nimmt Ihnen ein digitaler Kollege ab.
                    </p>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="flex justify-between text-[13px] font-semibold text-[#475569]">
                          <span>Stunden/Woche für Routine</span>
                          <b className="text-[#0A0C10]">{hoursPerWeek} h</b>
                        </div>
                        <Slider className="mt-2" min={0} max={60} step={1} value={[hoursPerWeek]} onValueChange={(v) => { setTimeTouched(true); setHoursPerWeek(v[0]) }} />
                      </div>
                      <div>
                        <div className="flex justify-between text-[13px] font-semibold text-[#475569]">
                          <span>Ø Stundenwert</span>
                          <b className="text-[#0A0C10]">{formatChf(hourlyRate)}</b>
                        </div>
                        <Slider className="mt-2" min={0} max={250} step={5} value={[hourlyRate]} onValueChange={(v) => { setTimeTouched(true); setHourlyRate(v[0]) }} />
                      </div>
                      <div>
                        <div className="flex justify-between text-[13px] font-semibold text-[#475569]">
                          <span>Davon automatisierbar</span>
                          <b className="text-[#0A0C10]">{automationPercent} %</b>
                        </div>
                        <Slider className="mt-2" min={0} max={90} step={5} value={[automationPercent]} onValueChange={(v) => { setTimeTouched(true); setAutomationPercent(v[0]) }} />
                      </div>
                    </div>
                  </div>

                  {/* ROI-Bereiche */}
                  <div className="rounded-[16px] border border-[#D3D9DF] bg-[#FAFAF7] p-4 md:p-5">
                    <h4 className="text-[16px] font-bold text-[#242B34] md:text-[17px]">2 · Wobei soll die KI Sie entlasten?</h4>
                    <p className="mt-1 text-[13.5px] leading-[1.5] text-[#5A6B82]">
                      Wählen Sie Ihre Bereiche – jede Auswahl erhöht Ihr Jahrespotenzial.
                    </p>

                    <div className="mt-4 flex gap-[6px] rounded-[14px] bg-[#FAFAF7] p-[5px]">
                      {SCENARIOS.map((s) => {
                        const active = scenario === s.key
                        return (
                          <button
                            key={s.key}
                            type="button"
                            onClick={() => setScenario(s.key)}
                            aria-pressed={active}
                            className={cn(
                              "flex-1 rounded-[10px] py-[10px] text-[13.5px] font-bold transition",
                              active ? "bg-white text-[#0A0C10] shadow-[0_3px_10px_rgba(10,12,16,0.12)] ring-1 ring-[#1F9A5E]/55" : "text-[#5A6B82] hover:bg-white/60",
                            )}
                          >
                            {s.label}
                            <span className={cn("block text-[11px] font-semibold", active ? "text-[#57C7FF]" : "text-[#9aa9bf]")}>{s.hint}</span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="mt-3 space-y-[10px]">
                      {PILLARS.map((p) => {
                        const on = selectedPillars.has(p.key)
                        return (
                          <button
                            key={p.key}
                            type="button"
                            onClick={() => togglePillar(p.key)}
                            aria-pressed={on}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-[14px] border-2 bg-white px-4 py-[13px] text-left transition",
                              on ? "border-[#1F9A5E] shadow-[0_4px_16px_rgba(10,143,137,0.14)]" : "border-[#D7E0EC] hover:border-[#CBD3DB]",
                            )}
                          >
                            <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[11px] bg-[#FAFAF7] text-[19px]">{p.icon}</span>
                            <span className="flex-1">
                              <span className="block text-[15.5px] font-extrabold leading-[1.2] text-[#0A0C10]">{p.plain}</span>
                              <span className="mt-[2px] block text-[12.5px] text-[#5A6B82]">{p.benefit}</span>
                            </span>
                            <span className={cn("grid h-[22px] w-[22px] flex-none place-items-center rounded-[7px] border-[1.5px] transition", on ? "border-[#8FE05A] bg-[#8FE05A] text-[#122400]" : "border-[#D3D9DF]")}>
                              {on && <Check className="h-[14px] w-[14px]" />}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Spalte 2 · Ergebnis */}
                <div className="self-start lg:sticky lg:top-24">
                  {/* Zeitgewinn-Ergebnis */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { l: "Pro Woche", v: `${shownAutomation.hoursSavedWeek} h` },
                      { l: "Pro Jahr", v: `${shownAutomation.hoursSavedYear.toLocaleString("de-CH")} h` },
                      { l: "Wert / Jahr", v: formatChf(shownAutomation.valuePerYear) },
                    ].map((c) => (
                      <div key={c.l} className="rounded-[12px] border border-[#E1E4E8] bg-[#FAFAF7] p-3 text-center">
                        <div className="text-[10.5px] font-bold uppercase tracking-wide text-[#5A6B82]">{c.l}</div>
                        <div className="mt-1 text-[clamp(15px,2.6vw,19px)] font-extrabold leading-tight text-[#57C7FF]">{c.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* ROI-Hero */}
                  <div className="mt-3 rounded-[16px] border border-[#E1E4E8] bg-gradient-to-br from-[#FAFAF7] to-[#F1F3F5] p-5 md:p-6">
                    <div className="text-[13px] font-bold uppercase tracking-[0.4px] text-[#5A6B82]">Ihr Return on Invest (ROI)</div>
                    <div className="my-1 text-[clamp(40px,6.2vw,54px)] font-extrabold leading-[1.0] tracking-[-1.5px] text-[#57C7FF]">
                      {roi.roi > 0 ? "+" : ""}
                      {Math.round(roi.roi).toLocaleString("de-CH")} %
                    </div>
                    <div className="text-[15px] font-semibold text-[#475569]">
                      Jahrespotenzial{" "}
                      <b className="font-extrabold text-[#0A0C10]">
                        <AnimatedChf value={roi.annual} />
                      </b>
                    </div>
                    <div className="mt-4 border-t border-[#D5E6F0] pt-4">
                      <div className="flex items-center justify-between text-[13.5px] font-semibold text-[#475569]">
                        <span>Ihre Jahres-Investition</span>
                        <b className="text-[15px] font-extrabold text-[#0A0C10]">{formatChf(investment)}</b>
                      </div>
                      <Slider className="mt-3" min={0} max={360000} step={6000} value={[investment]} onValueChange={(v) => setInvestment(v[0])} />
                    </div>
                  </div>

                  {/* PDF / Lead */}
                  {!showForm ? (
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#8FE05A] py-[15px] text-[16px] font-extrabold text-[#122400] shadow-[0_6px_16px_rgba(10,12,16,0.18)] transition hover:-translate-y-[1px]"
                    >
                      <FileDown className="h-[18px] w-[18px]" /> Auswertung anfordern
                    </button>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 space-y-2.5"
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleDownload()
                      }}
                    >
                      <p className="text-[13px] font-semibold text-[#475569]">
                        Sie erhalten demnächst eine detaillierte Auswertung Ihrer individuellen ROI-Chancen.
                      </p>
                      {[
                        { k: "name" as const, ph: "Vollständiger Name *", type: "text", req: true },
                        { k: "address" as const, ph: "Firma", type: "text", req: false },
                        { k: "phone" as const, ph: "Telefon *", type: "tel", req: true },
                        { k: "email" as const, ph: "E-Mail *", type: "email", req: true },
                      ].map((f) => (
                        <input
                          key={f.k}
                          type={f.type}
                          required={f.req}
                          placeholder={f.ph}
                          value={(contact[f.k] as string) ?? ""}
                          onChange={(e) => setContact((c) => ({ ...c, [f.k]: e.target.value }))}
                          className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-[11px] text-[15px] outline-none transition focus:border-[#1F9A5E]"
                        />
                      ))}
                      <label className="flex items-start gap-2 text-[12px] leading-snug text-[#5A6B82]">
                        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#1F9A5E]" />
                        Ich bin einverstanden, dass AgenticIT meine Angaben zur Auswertung und Kontaktaufnahme nutzt (DSG-konform).
                      </label>
                      {submitError ? <p className="text-[13px] text-red-600">{submitError}</p> : null}
                      <button
                        type="submit"
                        disabled={!canSubmit || submitting}
                        className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#8FE05A] py-[15px] text-[16px] font-extrabold text-[#122400] shadow-[0_6px_16px_rgba(10,12,16,0.18)] transition hover:-translate-y-[1px] disabled:opacity-50 disabled:hover:translate-y-0"
                      >
                        <FileDown className="h-[18px] w-[18px]" />
                        {submitting ? "Wird gesendet …" : "Auswertung erhalten"}
                      </button>
                    </motion.form>
                  )}

                  {/* Hinweise hinter „i" */}
                  <button type="button" onClick={() => setShowNotes((v) => !v)} aria-expanded={showNotes} className="mx-auto mt-3 flex items-center gap-[6px] text-[12.5px] font-semibold text-[#5A6B82] transition hover:text-[#57C7FF]">
                    <Info className="h-[14px] w-[14px]" /> Hinweise &amp; Quellen
                  </button>
                  <AnimatePresence initial={false}>
                    {showNotes && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 text-center text-[11.5px] leading-[1.5] text-[#9aa9bf]">
                        Unverbindlich · Werte sind indikativ und beruhen auf belegten Studienwerten. KI-gestützter Entwurf – vor Nutzung menschlich geprüft · DSG-konform.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
