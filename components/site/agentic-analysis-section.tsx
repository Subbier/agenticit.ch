"use client"

import { useCallback, useMemo, useState } from "react"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  ShieldCheck,
  Lock,
  MapPin,
  FileDown,
  Globe,
  Mail,
  Phone,
  User,
  Building2,
  RotateCcw,
} from "lucide-react"
import { BRANCH_PRESETS, type PresetItem } from "@/lib/analyse/branch-presets"

/* =================================================================== *
 *  Farbwelt: White Core · Hellblau · Hellorange · schwarze Typo
 * =================================================================== */
const BLUE = "#1F9A5E"
const ORANGE = "#F97316"

type UseCasePick = { title: string; benefit: string; trigger: string; ablauf: string; bereich: string; aufwand: string; branchSpecific: boolean }

type AnalysisResult = {
  visibility: { google: number; local: number; bing: number; ki: number }
  lighthouse: { found: boolean; performance: number | null; seo: number | null; lcp: number | null }
  searchDemand: { keywords: { keyword: string; volume: number }[]; total: number; potentialVisitors: number; potentialLeads: number }
  semrush: {
    found: boolean
    organicTraffic: number | null
    organicKeywords: number | null
    topKeywords: { keyword: string; position: number; volume: number; cpc: number }[]
  }
  freed: { weeklyHours: number; yearlyHours: number; fte: number }
  roi: { timeValue: number; dealsValue: number; retentionValue: number; total: number; paybackMonths: number }
  recommendations: { title: string; effect: string; area: string }[]
  priorities: { want: string; answer: string }[]
  branchLabel: string
  automation: UseCasePick[]
  revops: UseCasePick[]
}

// Besucher-Branchen (Spiegel von lib/analyse/recommend.ts – hier ohne Katalog-Import, klein für den Client).
const BRANCHEN: { id: string; label: string }[] = [
  { id: "treuhand", label: "Treuhand · Finanzen · Versicherung" },
  { id: "beratung", label: "Beratung · Kanzlei · Coaching" },
  { id: "agentur", label: "Agentur · Marketing · Medien" },
  { id: "handel", label: "Handel · E-Commerce · Retail" },
  { id: "handwerk", label: "Handwerk · Bau" },
  { id: "gastro", label: "Gastronomie · Hotel · Tourismus" },
  { id: "gesundheit", label: "Gesundheit · Praxis" },
  { id: "it", label: "IT · SaaS · Software" },
  { id: "andere", label: "Andere Branche" },
]

function presetFor(branche: string) {
  return BRANCH_PRESETS[branche] ?? BRANCH_PRESETS["andere"]
}

const chf = (n: number) =>
  new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n)
const deNum = (n: number) => new Intl.NumberFormat("de-CH").format(n)

type Choice = { id: string; q: string; opts: string[] }

const AREA1: Choice[] = [
  { id: "sichtbarkeit", q: "Wie gut werden Sie bei Google gefunden?", opts: ["Sehr gut", "Mittel", "Kaum", "Weiss nicht"] },
  { id: "web_anfragen", q: "Wie viele Anfragen bringt Ihre Website pro Monat?", opts: ["Über 20", "5–20", "Unter 5", "Keine"] },
]
const ROUTINE: Choice = {
  id: "routine_stunden",
  q: "Wie viele Stunden pro Woche gehen bei Ihnen für Büroarbeit drauf?",
  opts: ["Unter 5", "5–15", "15–30", "Über 30"],
}

const STEPS = ["Sichtbarkeit", "Alltag", "Wachstum", "Ergebnis"]
type ItemStatus = "ja" | "nein"
type Status = "idle" | "loading" | "done" | "error"

export function AgenticAnalysisSection() {
  const [card, setCard] = useState(0) // 0 Intro · 1 A1 · 2 A2 · 3 A3 · 4 Form · 5 Success
  const [single, setSingle] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ anrede: "Herr", vorname: "", nachname: "", firma: "", url: "", email: "", phone: "", plz: "", stadt: "" })
  const [consent, setConsent] = useState(false)
  const [whatsappOptIn, setWhatsappOptIn] = useState(false)
  const [honey, setHoney] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [err, setErr] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [pdfBase64, setPdfBase64] = useState<string | null>(null)
  const [mailSent, setMailSent] = useState(false)
  // Schon/Noch-nicht je Maßnahme (Titel → Status)
  const [autoStatus, setAutoStatus] = useState<Record<string, ItemStatus>>({})
  const [revStatus, setRevStatus] = useState<Record<string, ItemStatus>>({})

  const branche = single["branche"] ?? ""
  const preset = presetFor(branche)
  const presetLabel = BRANCHEN.find((b) => b.id === branche)?.label ?? "Ihrer Branche"
  const setItem =
    (setter: React.Dispatch<React.SetStateAction<Record<string, ItemStatus>>>) =>
    (title: string, v: ItemStatus) =>
      setter((s) => ({ ...s, [title]: s[title] === v ? (undefined as unknown as ItemStatus) : v }))
  const setAuto = setItem(setAutoStatus)
  const setRev = setItem(setRevStatus)

  const openPdf = useCallback(() => {
    if (!pdfBase64) return
    const bytes = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0))
    const blob = new Blob([bytes], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `AgenticIT_Standortbestimmung_${(form.firma || "Analyse").replace(/[^\w-]+/g, "_")}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 4000)
  }, [pdfBase64, form.firma])

  const pick = (id: string, v: string) => setSingle((s) => ({ ...s, [id]: v }))

  const area1Done = AREA1.every((q) => single[q.id]) && Boolean(branche)
  const autoAnswered = preset.automation.filter((i) => autoStatus[i.title]).length
  const revAnswered = preset.revops.filter((i) => revStatus[i.title]).length
  const autoDoneCount = Object.values(autoStatus).filter((v) => v === "ja").length
  const revDoneCount = Object.values(revStatus).filter((v) => v === "ja").length
  const areaComplete = (c: number) =>
    c === 1 ? area1Done : c === 2 ? Boolean(single["routine_stunden"]) && autoAnswered >= 1 : revAnswered >= 1

  // 4 Schritte (Online Erfolg · Automatisierungen · KI-Mitarbeiter · PDF-Analyse) ↔ Karten 1–4
  const progressIndex = Math.min(Math.max(card - 1, -1), 4)

  const resetAnalysis = useCallback(() => {
    setCard(0)
    setSingle({})
    setForm({ anrede: "Herr", vorname: "", nachname: "", firma: "", url: "", email: "", phone: "", plz: "", stadt: "" })
    setConsent(false)
    setWhatsappOptIn(false)
    setHoney("")
    setStatus("idle")
    setErr("")
    setResult(null)
    setPdfBase64(null)
    setMailSent(false)
    setAutoStatus({})
    setRevStatus({})
  }, [])

  const validForm =
    form.vorname.trim().length >= 2 &&
    form.nachname.trim().length >= 2 &&
    form.firma.trim().length >= 2 &&
    form.url.trim().length >= 4 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.phone.trim().length >= 5 &&
    consent

  const summary = useMemo(() => {
    const lines = AREA1.map((q) => (single[q.id] ? `${q.q} → ${single[q.id]}` : null))
    return lines.filter(Boolean).join("\n")
  }, [single])

  async function submit() {
    if (!validForm) return
    setStatus("loading"); setErr("")
    void summary // (Zusammenfassung wird serverseitig aus den Antworten erzeugt)
    const automation_done = preset.automation.filter((i) => autoStatus[i.title] === "ja").map((i) => i.title)
    const automation_todo = preset.automation.filter((i) => autoStatus[i.title] === "nein").map((i) => i.title)
    const revops_done = preset.revops.filter((i) => revStatus[i.title] === "ja").map((i) => i.title)
    const revops_todo = preset.revops.filter((i) => revStatus[i.title] === "nein").map((i) => i.title)
    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contact: {
            anrede: form.anrede,
            vorname: form.vorname.trim(),
            nachname: form.nachname.trim(),
            firma: form.firma.trim(),
            url: form.url.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            plz: form.plz.trim(),
            stadt: form.stadt.trim(),
          },
          answers: {
            branche,
            web_zufriedenheit: single["web_zufriedenheit"] ?? "",
            sichtbarkeit: single["sichtbarkeit"] ?? "",
            marketing: single["marketing"] ?? "",
            web_anfragen: single["web_anfragen"] ?? "",
            routine_stunden: single["routine_stunden"] ?? "",
            automation_done,
            automation_todo,
            revops_done,
            revops_todo,
          },
          consent: true,
          whatsapp_opt_in: whatsappOptIn,
          company_website: honey,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.ok === false) {
        setStatus("error"); setErr(data.message || "Etwas ist schiefgelaufen. Bitte erneut versuchen.")
        return
      }
      setResult((data.result as AnalysisResult | undefined) ?? null)
      setPdfBase64((data.pdfBase64 as string | undefined) ?? null)
      setMailSent(Boolean(data.mailSent))
      setStatus("done"); setCard(5)
    } catch {
      setStatus("error"); setErr("Verbindung fehlgeschlagen. Bitte erneut versuchen.")
    }
  }

  return (
    <section id="rechner" aria-labelledby="analyse-heading" className="relative scroll-mt-20 overflow-hidden">
      {/* Hintergrund: nahtloser Übergang Hero (Navy) → Hellblau → Weiss */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FAFAF7_0%,#FFFFFF_55%)]"
        aria-hidden="true"
      />

      {/* Navy-Kopfzone: mobil trägt sie Titel + Fortschritt, ab sm nur ein schmaler Anschluss an den Hero */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-[#0A0C10] sm:h-10"
        aria-hidden="true"
      />
      
      
      
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31,154,94,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,154,94,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 75%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[920px] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-[104px]">
        <div className="mx-auto mb-8 max-w-[640px] text-center">
          <h2 id="analyse-heading" className="text-[clamp(28px,4.8vw,40px)] font-extrabold leading-tight tracking-[-0.6px] text-white sm:text-[#0A0C10]">
            Wie viel Zeit und Geld <span className="text-[#57C7FF] sm:text-[#57C7FF]">liegen bei Ihnen brach?</span>
          </h2>
          <p className="mt-2.5 text-[clamp(15px,2.2vw,17px)] font-semibold leading-relaxed text-[#e2ecf7] sm:text-[#334155]">
            Ein paar kurze Fragen – und Sie sehen Ihr Sparpotenzial in Franken. Kostenlos, in 20 Sekunden.
          </p>
        </div>

        {/* progress + neu starten */}
        <div className="mx-auto mb-6 flex max-w-[680px] items-center gap-3">
          <div className="flex flex-1 items-center gap-1.5">
            {STEPS.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-1.5">
                <span
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-[12px] font-extrabold transition-colors ${
                    i < progressIndex
                      ? "bg-[#8FE05A] text-[#122400]"
                      : i === progressIndex
                        ? "bg-[#8FE05A] text-[#122400] shadow-[0_4px_12px_rgba(31,154,94,0.4)] ring-2 ring-[#1F9A5E]/30"
                        : "bg-white/15 text-white/80 sm:bg-[#E2E9F2] sm:text-[#475569]"
                  }`}
                >
                  {i < progressIndex ? <Check size={14} /> : i + 1}
                </span>
                <span
                  className={`hidden text-[12.5px] font-bold sm:inline ${
                    i === progressIndex ? "text-white sm:text-[#0A0C10]" : "text-white/75 sm:text-[#475569]"
                  }`}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && <span className="h-px flex-1 bg-white/20 sm:bg-[#F1F3F5]" />}
              </div>
            ))}
          </div>
          {card > 0 ? (
            <button
              type="button"
              onClick={resetAnalysis}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-[10px] border border-white/25 bg-white/10 px-3 py-2 text-[12px] font-bold text-white backdrop-blur-sm transition hover:bg-white/20 sm:border-[#E1E4E8] sm:bg-white sm:text-[#5B6675] sm:hover:border-[#1F9A5E]/50 sm:hover:text-[#111418]"
              title="Analyse zurücksetzen und von vorne beginnen"
            >
              <RotateCcw size={14} />
              Neu starten
            </button>
          ) : null}
        </div>

        {/* CARD SHELL */}
        <div className="relative overflow-hidden rounded-[24px] border border-[#F1F3F5] bg-white shadow-[0_20px_60px_rgba(17,20,24,0.08)]">
          {status === "loading" ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-[24px] bg-white/92 backdrop-blur-[2px]">
              <Loader2 size={32} className="animate-spin text-[#57C7FF]" />
              <p className="text-[14px] font-bold text-[#111418]">Wir prüfen Ihre Website jetzt live …</p>
              <p className="max-w-[320px] text-center text-[12px] leading-relaxed text-[#6B7686]">
                Sichtbarkeit bei Google (SEMrush) · Tempo Ihrer Website · Ihr Potenzial in Franken · PDF-Report
              </p>
              <p className="text-[11px] font-semibold text-[#9AA7B8]">Dauert 20–40 Sekunden – echte Live-Daten.</p>
            </div>
          ) : null}
          {/* dünne Akzentlinie oben */}
          <div className="h-1 w-full" style={{ background: "#1F9A5E" }} />

          <div className="p-6 sm:p-9">
            {/* ============ CARD 0 · INTRO (Flyer-Stil) ============ */}
            {card === 0 && (
              <div className="grid gap-7 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                {/* Links: kurzer Pitch + Trust */}
                <div>
                  <h2 className="text-[clamp(26px,4.8vw,38px)] font-extrabold leading-[1.07] tracking-[-0.6px] text-[#111418]">
                    Was bringt Ihnen <span style={{ color: BLUE }}>KI wirklich?</span>
                  </h2>
                  <p className="mt-4 max-w-[460px] text-[16px] font-medium leading-relaxed text-[#3A4453]">
                    In 2 Minuten wissen Sie, wie viel Zeit und Geld in Ihrem Betrieb steckt – live geprüft mit echten
                    Google- und SEMrush-Daten. Ergebnis sofort, PDF per E-Mail.
                  </p>
                  <button
                    onClick={() => setCard(1)}
                    className="mt-6 inline-flex items-center gap-2 rounded-[12px] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(31,154,94,0.35)] transition-transform hover:-translate-y-0.5"
                    style={{ background: "#1F9A5E" }}
                  >
                    Analyse starten <ArrowRight size={17} />
                  </button>

                  {/* Trust-Badges */}
                  <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-[#F1F3F5] pt-4 text-[12px] font-semibold text-[#3A4453]">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={14} style={{ color: ORANGE }} /> Daten in der Schweiz</span>
                    <span className="inline-flex items-center gap-1.5"><Lock size={14} style={{ color: BLUE }} /> SSL-verschlüsselt</span>
                    <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} style={{ color: BLUE }} /> revDSG / DSGVO-konform</span>
                    <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} style={{ color: BLUE }} /> Keine Weitergabe an Dritte</span>
                  </div>
                </div>

                {/* Rechts: Beispiel der Auswertung (Musteranalyse als Bild) */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[300px]">
                    <span className="absolute -left-3 -top-3 z-10 rotate-[-6deg] rounded-[10px] bg-[#8FE05A] px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-wide text-[#122400] shadow-[0_8px_20px_rgba(31,154,94,0.45)]">
                      Analyse
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/musteranalyse-1.png"
                      alt="Beispiel einer AgenticIT-Standortbestimmung"
                      className="w-full rotate-[3deg] rounded-[12px] border border-[#F1F3F5] shadow-[0_24px_60px_rgba(17,20,24,0.22)]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ============ CARDS 1–3 · BEREICHE ============ */}
            {card >= 1 && card <= 3 && (
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[clamp(21px,3.2vw,27px)] font-extrabold leading-[1.15] tracking-[-0.4px] text-[#111418]">
                    {card === 1 ? "Werden Sie gefunden?" : card === 2 ? "Was kostet Sie heute Zeit?" : "Wie gewinnen Sie neue Kunden?"}
                  </h3>
                  <span className="mt-1 shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.5px]" style={{ background: "#FFF1E6", color: "#C2540C" }}>
                    Schritt {card} von 3
                  </span>
                </div>

                {/* CARD 1: Branche + Web-Fragen */}
                {card === 1 && (
                  <>
                    <div className="mt-5 rounded-[14px] border border-[#E1E4E8] bg-[#FAFAF7] p-4">
                      <p className="text-[15px] font-bold text-[#111418]">
                        <span className="mr-1.5 text-[#57C7FF]">★</span>In welcher Branche sind Sie tätig?
                      </p>
                      <p className="mt-1 text-[12.5px] text-[#6B7686]">
                        So wird Ihre Analyse auf Ihre Branche zugeschnitten.
                      </p>
                      <select
                        value={branche}
                        onChange={(e) => pick("branche", e.target.value)}
                        className="mt-3 w-full rounded-[11px] border border-[#E1E4E8] bg-white px-3 py-2.5 text-[14px] font-semibold text-[#111418] outline-none focus:border-[#1F9A5E]"
                      >
                        <option value="">Bitte wählen …</option>
                        {BRANCHEN.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-5 space-y-3">
                      {AREA1.map((q, qi) => {
                        const answered = Boolean(single[q.id])
                        return (
                          <div
                            key={q.id}
                            className={`rounded-[14px] border p-4 transition ${
                              answered ? "border-[#1F9A5E]/70 bg-[#FAFAF7] shadow-[0_2px_10px_rgba(31,154,94,0.10)]" : "border-[#E1E4E8] bg-[#FAFAF7]"
                            }`}
                          >
                            <p className="text-[15px] font-bold text-[#111418]">
                              <span className="mr-1.5 text-[#57C7FF]">{qi + 1}.</span>
                              {q.q}
                            </p>
                            <div className="mt-2.5 flex flex-wrap gap-2">
                              {q.opts.map((o) => {
                                const on = single[q.id] === o
                                return (
                                  <button
                                    key={o}
                                    onClick={() => pick(q.id, o)}
                                    className={`rounded-[11px] border px-3.5 py-2.5 text-[13.5px] font-semibold transition-all ${
                                      on ? "text-white" : "border-[#E1E4E8] bg-white text-[#3A4453] hover:border-[#1F9A5E]/50"
                                    }`}
                                    style={on ? { background: BLUE, borderColor: BLUE } : undefined}
                                  >
                                    {o}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}

                {/* CARD 2: branchenübliche Automatisierungen + Routine-Stunden */}
                {card === 2 && (
                  <>
                    <div className="mt-5 rounded-[14px] border border-[#E1E4E8] bg-[#FAFAF7] p-4">
                      <p className="text-[15px] font-bold text-[#111418]">{ROUTINE.q}</p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {ROUTINE.opts.map((o) => {
                          const on = single[ROUTINE.id] === o
                          return (
                            <button
                              key={o}
                              onClick={() => pick(ROUTINE.id, o)}
                              className={`rounded-[11px] border px-3.5 py-2.5 text-[13.5px] font-semibold transition-all ${
                                on ? "text-white" : "border-[#E1E4E8] bg-white text-[#3A4453] hover:border-[#1F9A5E]/50"
                              }`}
                              style={on ? { background: BLUE, borderColor: BLUE } : undefined}
                            >
                              {o}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <p className="mt-5 text-[14px] font-semibold text-[#3A4453]">
                      Das erledigen andere Firmen in <b className="text-[#111418]">{presetLabel}</b> bereits automatisch. Und Sie?
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {preset.automation.map((it) => (
                        <StatusRow key={it.title} item={it} status={autoStatus[it.title]} onSet={setAuto} />
                      ))}
                    </div>
                  </>
                )}

                {/* CARD 3: branchenübliche RevOps */}
                {card === 3 && (
                  <>
                    <p className="mt-5 text-[14px] font-semibold text-[#3A4453]">
                      So gewinnt und hält man in <b className="text-[#111418]">{presetLabel}</b> heute Kunden. Was davon nutzen Sie?
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {preset.revops.map((it) => (
                        <StatusRow key={it.title} item={it} status={revStatus[it.title]} onSet={setRev} />
                      ))}
                    </div>
                  </>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => setCard((c) => c - 1)} className="inline-flex items-center gap-1.5 px-2 py-2 text-[13px] font-bold text-[#6B7686] hover:text-[#111418]">
                    <ArrowLeft size={15} /> Zurück
                  </button>
                  <button
                    onClick={() => areaComplete(card) && setCard((c) => c + 1)}
                    disabled={!areaComplete(card)}
                    className="inline-flex items-center gap-2 rounded-[11px] px-5 py-3 text-[14px] font-bold text-white shadow-[0_8px_22px_rgba(31,154,94,0.3)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                    style={{ background: "#1F9A5E" }}
                  >
                    {card === 3 ? "Weiter zum Report" : "Weiter"} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ============ CARD 4 · LEAD-FORMULAR ============ */}
            {card === 4 && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.5px]" style={{ background: "#FFF1E6", color: "#C2540C" }}>
                    Letzter Schritt · PDF-Analyse
                  </span>
                  <span className="text-[13px] font-bold text-[#111418]">Report anfordern</span>
                </div>
                <h3 className="mt-3 text-[clamp(20px,3vw,24px)] font-extrabold tracking-[-0.3px] text-[#111418]">Wohin dürfen wir Ihren Report senden?</h3>
                <p className="mt-1 text-[14px] text-[#5A6B82]">
                  Ihr Ergebnis erscheint sofort hier auf der Seite – gleichzeitig senden wir Ihnen das vollständige PDF
                  per E-Mail. Kein Warten.
                </p>

                <div className="mt-5 rounded-[14px] border border-[#E1E4E8] bg-[#FAFAF7] p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-4 text-[13px] text-[#5B6675]">
                    <span className="font-semibold">Anrede *</span>
                    {(["Herr", "Frau"] as const).map((a) => (
                      <label key={a} className="inline-flex cursor-pointer items-center gap-1.5">
                        <input type="radio" name="anrede" checked={form.anrede === a} onChange={() => setForm({ ...form, anrede: a })} className="h-4 w-4 flex-none accent-[#1F9A5E]" />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field icon={<User size={15} />} placeholder="Vorname *" value={form.vorname} onChange={(v) => setForm({ ...form, vorname: v })} />
                    <Field icon={<User size={15} />} placeholder="Familienname *" value={form.nachname} onChange={(v) => setForm({ ...form, nachname: v })} />
                    <Field icon={<Building2 size={15} />} placeholder="Firmenname *" value={form.firma} onChange={(v) => setForm({ ...form, firma: v })} />
                    <Field icon={<Globe size={15} />} placeholder="Webadresse (firma.ch) *" value={form.url} onChange={(v) => setForm({ ...form, url: v })} />
                    <Field icon={<Mail size={15} />} placeholder="E-Mail *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field icon={<Phone size={15} />} placeholder="Telefon *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <Field icon={<MapPin size={15} />} placeholder="PLZ" value={form.plz} onChange={(v) => setForm({ ...form, plz: v })} />
                    <Field icon={<MapPin size={15} />} placeholder="Stadt" value={form.stadt} onChange={(v) => setForm({ ...form, stadt: v })} />
                  </div>

                  <input type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

                  <label className="mt-4 flex items-start gap-2.5 text-[12.5px] leading-snug text-[#5B6675]">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 flex-none accent-[#1F9A5E]" />
                    <span>Ich bin einverstanden, dass AgenticIT meine Angaben zur Erstellung der Analyse verarbeitet und mich kontaktiert.</span>
                  </label>
                  <label className="mt-3 flex items-start gap-2.5 text-[12.5px] leading-snug text-[#5B6675]">
                    <input type="checkbox" checked={whatsappOptIn} onChange={(e) => setWhatsappOptIn(e.target.checked)} className="mt-0.5 h-4 w-4 flex-none accent-[#1F9A5E]" />
                    <span>Ja, AgenticIT darf mich für die schnellste Rückmeldung auch per <strong>WhatsApp</strong> kontaktieren (optional, jederzeit widerrufbar).</span>
                  </label>
                </div>

                {/* Security-Badges – dezent */}
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11.5px] font-medium text-[#6B7686]">
                  <span className="inline-flex items-center gap-1.5"><Lock size={13} style={{ color: BLUE }} /> Ende-zu-Ende-verschlüsselt</span>
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} style={{ color: BLUE }} /> Keine Weitergabe an Dritte</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={13} style={{ color: ORANGE }} /> Swiss Hosting – Daten in der Schweiz</span>
                </div>

                {status === "error" && <p className="mt-3 text-[13px] font-bold text-[#E11D48]">{err}</p>}

                <div className="mt-6 flex items-center justify-between">
                  <button onClick={() => setCard(3)} className="inline-flex items-center gap-1.5 px-2 py-2 text-[13px] font-bold text-[#6B7686] hover:text-[#111418]">
                    <ArrowLeft size={15} /> Zurück
                  </button>
                  <button
                    onClick={submit}
                    disabled={!validForm || status === "loading"}
                    className="inline-flex items-center gap-2 rounded-[12px] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(249,115,22,0.35)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                    style={{ background: "#E879F9" }}
                  >
                    {status === "loading" ? (<><Loader2 size={16} className="animate-spin" /> Analyse wird erstellt…</>) : (<><FileDown size={16} /> Report anfordern</>)}
                  </button>
                </div>
              </div>
            )}

            {/* ============ CARD 5 · ERGEBNIS (sofort) ============ */}
            {card === 5 && (
              <div className="py-1">
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1F3F5]" style={{ color: BLUE }}>
                    <Check size={28} />
                  </div>
                  <h3 className="mt-4 text-[clamp(21px,3.4vw,28px)] font-extrabold tracking-[-0.4px] text-[#111418]">
                    Ihre Standortbestimmung, {form.vorname}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[500px] text-[14px] leading-relaxed text-[#5B6675]">
                    Das sind Ihre Ergebnisse für <b className="text-[#111418]">{form.firma}</b>.{" "}
                    {mailSent ? (
                      <>
                        Das vollständige PDF wurde soeben an <b className="text-[#111418]">{form.email}</b> gesendet –
                        und Sie können es hier direkt herunterladen.
                      </>
                    ) : (
                      <>Ihre vollständige, mehrseitige Analyse können Sie hier direkt herunterladen.</>
                    )}
                  </p>

                  {pdfBase64 ? (
                    <div className="mt-5 flex justify-center">
                      <button
                        type="button"
                        onClick={openPdf}
                        className="inline-flex items-center gap-2 rounded-[12px] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(31,154,94,0.35)] transition-transform hover:-translate-y-0.5"
                        style={{ background: "#1F9A5E" }}
                      >
                        <FileDown size={17} /> Analyse als PDF herunterladen
                      </button>
                    </div>
                  ) : null}
                </div>

                {result ? (
                  <div className="mt-7 space-y-5">
                    {/* Sichtbarkeit */}
                    <ResultBlock
                      title="So gut werden Sie heute gefunden"
                      hint={
                        result.semrush.found
                          ? `✓ Live geprüft mit SEMrush${
                              result.semrush.organicTraffic != null
                                ? ` · ~${deNum(result.semrush.organicTraffic)} Besucher/Monat über Google`
                                : ""
                            }`
                          : "Geschätzt – für diese Domain liegen keine Live-Daten vor"
                      }
                    >
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {(
                          [
                            ["Google", result.visibility.google],
                            ["Lokal", result.visibility.local],
                            ["Bing", result.visibility.bing],
                            ["KI-Suche", result.visibility.ki],
                          ] as [string, number][]
                        ).map(([label, val]) => (
                          <ScoreBar key={label} label={label} value={val} />
                        ))}
                      </div>
                    </ResultBlock>

                    {/* Website-Technik (Lighthouse) */}
                    {result.lighthouse?.found ? (
                      <ResultBlock title="So schnell ist Ihre Website" hint="✓ Live geprüft mit Google (mobil)">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {result.lighthouse.performance != null ? (
                            <ScoreBar label="Performance" value={result.lighthouse.performance} />
                          ) : null}
                          {result.lighthouse.seo != null ? <ScoreBar label="SEO" value={result.lighthouse.seo} /> : null}
                          {result.lighthouse.lcp != null ? (
                            <div className="rounded-[12px] border border-[#F1F3F5] bg-[#FAFAF7] p-3 text-center">
                              <div className="text-[22px] font-extrabold leading-none text-[#111418]">
                                {String(result.lighthouse.lcp).replace(".", ",")}s
                              </div>
                              <div className="mt-2 text-[12px] font-semibold text-[#5B6675]">Ladezeit (LCP)</div>
                            </div>
                          ) : null}
                        </div>
                      </ResultBlock>
                    ) : null}

                    {/* Suchnachfrage in der Branche (die „Rechnung") */}
                    {result.searchDemand?.total ? (
                      <ResultBlock title="So viele Kunden suchen Ihre Leistung" hint={result.branchLabel || undefined}>
                        <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
                          <div>
                            <div className="text-[30px] font-extrabold leading-none" style={{ color: BLUE }}>
                              {deNum(result.searchDemand.total)}
                            </div>
                            <div className="mt-1 text-[12px] text-[#5B6675]">Suchanfragen/Monat (Auswahl)</div>
                          </div>
                          <p className="flex-1 text-[13.5px] leading-snug text-[#3A4453]">
                            Schon bei guter Sichtbarkeit realistisch:{" "}
                            <b className="text-[#111418]">~{deNum(result.searchDemand.potentialVisitors)}</b> Besucher und{" "}
                            <b className="text-[#111418]">~{deNum(result.searchDemand.potentialLeads)}</b> Anfragen pro Monat.
                          </p>
                        </div>
                        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px] text-[#6B7686]">
                          {result.searchDemand.keywords.map((k) => (
                            <li key={k.keyword}>
                              <b className="text-[#111418]">{k.keyword}</b> · {deNum(k.volume)}/Mt.
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2.5 text-[11px] text-[#9AA7B8]">
                          Richtwerte (SEMrush CH) · Annahme: 8 % erreichbare Reichweite, 4 % Anfragequote.
                        </p>
                      </ResultBlock>
                    ) : null}

                    {/* Keywords & Suchnachfrage */}
                    {result.semrush.topKeywords.length ? (
                      <ResultBlock
                        title="Dafür werden Sie bereits gefunden"
                        hint={
                          result.semrush.organicKeywords != null
                            ? `✓ SEMrush live · ${deNum(result.semrush.organicKeywords)} Suchbegriffe insgesamt`
                            : "✓ live aus SEMrush"
                        }
                      >
                        <ul className="space-y-2">
                          {result.semrush.topKeywords.map((k) => (
                            <li key={k.keyword} className="flex items-center justify-between gap-3 text-[13.5px]">
                              <span className="truncate font-semibold text-[#111418]">{k.keyword}</span>
                              <span className="flex-none text-[12px] text-[#6B7686]">
                                Pos. {k.position} · {deNum(k.volume)} Suchen/Mt.
                              </span>
                            </li>
                          ))}
                        </ul>
                      </ResultBlock>
                    ) : null}

                    {/* Zeit + Wertbeitrag */}
                    <div className="grid gap-5 md:grid-cols-2">
                      <ResultBlock title="So viel Zeit gewinnen Sie zurück">
                        <div className="flex items-end gap-2">
                          <span className="text-[34px] font-extrabold leading-none" style={{ color: BLUE }}>
                            {result.freed.weeklyHours}
                          </span>
                          <span className="mb-1 text-[14px] font-semibold text-[#5B6675]">Std./Woche</span>
                        </div>
                        <p className="mt-2 text-[13px] leading-relaxed text-[#5B6675]">
                          ≈ {deNum(result.freed.yearlyHours)} Std./Jahr · entspricht rund {result.freed.fte} Vollzeitstelle
                          {result.freed.fte === 1 ? "" : "n"}.
                        </p>
                      </ResultBlock>
                      <ResultBlock title="So viel ist das pro Jahr wert">
                        <div className="text-[30px] font-extrabold leading-none" style={{ color: ORANGE }}>
                          {chf(result.roi.total)}
                        </div>
                        <p className="mt-2 text-[13px] leading-relaxed text-[#5B6675]">
                          Gesparte Arbeitszeit {chf(result.roi.timeValue)} · zusätzliche Aufträge {chf(result.roi.dealsValue)} ·
                          treuere Kunden {chf(result.roi.retentionValue)}. Rechnet sich nach ~{result.roi.paybackMonths} Monaten.
                        </p>
                      </ResultBlock>
                    </div>

                    {/* Würdigung: was schon läuft */}
                    {autoDoneCount + revDoneCount > 0 ? (
                      <div className="flex items-start gap-2.5 rounded-[14px] border border-[#1F9A5E]/30 bg-[#F0FDF4] p-4 text-[13.5px] font-semibold text-[#57C7FF]">
                        <Check size={16} className="mt-0.5 flex-none" />
                        <span>
                          Bereits im Einsatz: {autoDoneCount} Automatisierung{autoDoneCount === 1 ? "" : "en"} und{" "}
                          {revDoneCount} RevOps-Maßnahme{revDoneCount === 1 ? "" : "n"} – hier sind Sie schon gut aufgestellt.
                        </span>
                      </div>
                    ) : null}

                    {/* Empfohlen: branchenüblich, aber noch nicht im Einsatz */}
                    {result.automation.length ? (
                      <ResultBlock
                        title="Das nimmt Ihnen ab sofort Arbeit ab"
                        hint={result.branchLabel ? `Ihre grössten Hebel · ${result.branchLabel}` : "Ihre grössten Hebel"}
                      >
                        <PickList picks={result.automation} />
                      </ResultBlock>
                    ) : null}

                    {result.revops.length ? (
                      <ResultBlock title="So gewinnen Sie mehr Kunden" hint="Wachstum & Kundenbindung">
                        <PickList picks={result.revops} />
                      </ResultBlock>
                    ) : null}

                    {/* Strategische Top-Empfehlungen */}
                    {result.recommendations.length ? (
                      <ResultBlock title="Ihre nächsten Schritte">
                        <ul className="space-y-2.5">
                          {result.recommendations.map((r) => (
                            <li key={r.title} className="flex items-start gap-2.5">
                              <span
                                className="mt-[2px] flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#F1F3F5]"
                                style={{ color: BLUE }}
                              >
                                <Check size={13} />
                              </span>
                              <span className="text-[13.5px] leading-snug text-[#3A4453]">
                                <b className="text-[#111418]">{r.title}</b> — {r.effect}{" "}
                                <span className="text-[#9AA7B8]">({r.area})</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </ResultBlock>
                    ) : null}
                  </div>
                ) : (
                  <p className="mx-auto mt-6 max-w-[440px] text-center text-[14px] text-[#5B6675]">
                    Ihr persönliches PDF ist unterwegs an <b className="text-[#111418]">{form.email}</b>.
                  </p>
                )}

                {/* CTA + Trust */}
                <div className="mt-7 flex flex-col items-center gap-3 border-t border-[#F1F3F5] pt-6 sm:flex-row sm:justify-center">
                  <a
                    href="#kontakt"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-[#8FE05A] px-6 py-3.5 text-[15px] font-bold text-[#122400] shadow-[0_6px_16px_rgba(10,12,16,0.18)] transition-transform hover:-translate-y-0.5"
                  >
                    Kostenloses Erstgespräch sichern <ArrowRight size={17} />
                  </a>
                  <button
                    type="button"
                    onClick={resetAnalysis}
                    className="inline-flex items-center gap-2 rounded-[12px] border border-[#E1E4E8] px-5 py-3 text-[14px] font-bold text-[#5B6675] transition hover:border-[#1F9A5E]/50 hover:text-[#111418]"
                  >
                    <RotateCcw size={16} />
                    Neue Analyse
                  </button>
                </div>
                <p className="mt-4 text-center text-[11.5px] text-[#9AA7B8]">
                  KI-gestützter Entwurf, vor Versand menschlich geprüft · DSG-konform.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  icon, placeholder, value, onChange, type = "text",
}: { icon: React.ReactNode; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[11px] border border-[#E1E4E8] bg-white px-3 py-2.5 focus-within:border-[#1F9A5E] focus-within:shadow-[0_0_0_1px_#1F9A5E]">
      <span className="text-[#9AA7B8]">{icon}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-[14px] text-[#111418] outline-none placeholder:text-[#A7B2C2]"
      />
    </div>
  )
}

function ResultBlock({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border border-[#F1F3F5] bg-white p-5 shadow-[0_2px_10px_rgba(17,20,24,0.04)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h4 className="text-[13px] font-extrabold uppercase tracking-[0.5px] text-[#111418]">{title}</h4>
        {hint ? <span className="text-[11.5px] font-medium text-[#9AA7B8]">{hint}</span> : null}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function StatusRow({
  item,
  status,
  onSet,
}: {
  item: PresetItem
  status?: "ja" | "nein"
  onSet: (title: string, v: "ja" | "nein") => void
}) {
  const answered = Boolean(status)
  return (
    <div
      className={`rounded-[12px] border p-3 transition ${
        answered ? "border-[#1F9A5E]/60 bg-[#FAFAF7]" : "border-[#E1E4E8] bg-[#FAFAF7]"
      }`}
    >
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[14px] font-bold leading-snug text-[#111418]">{item.title}</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-[#6B7686]">
            <span className="font-semibold text-[#3A4453]">{item.benefit}</span>
          </p>
        </div>
        <div className="flex flex-none gap-2">
          <button
            type="button"
            onClick={() => onSet(item.title, "ja")}
            className={`rounded-[10px] border px-3 py-2 text-[12.5px] font-bold transition ${
              status === "ja" ? "border-[#8FE05A] bg-[#8FE05A] text-[#122400]" : "border-[#E1E4E8] bg-white text-[#3A4453] hover:border-[#1F9A5E]/60"
            }`}
          >
            Machen wir
          </button>
          <button
            type="button"
            onClick={() => onSet(item.title, "nein")}
            className={`rounded-[10px] border px-3 py-2 text-[12.5px] font-bold transition ${
              status === "nein" ? "border-[#8FE05A] bg-[#8FE05A] text-[#122400]" : "border-[#E1E4E8] bg-white text-[#3A4453] hover:border-[#1F9A5E]/60"
            }`}
          >
            Noch nicht
          </button>
        </div>
      </div>
    </div>
  )
}

function PickList({ picks }: { picks: UseCasePick[] }) {
  return (
    <ul className="space-y-3">
      {picks.map((p, i) => (
        <li key={p.title + i} className="flex items-start gap-2.5">
          <span
            className="mt-[2px] flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#F1F3F5]"
            style={{ color: BLUE }}
          >
            <Check size={13} />
          </span>
          <span className="text-[13.5px] leading-snug text-[#3A4453]">
            <b className="text-[#111418]">{p.title}</b> — {p.benefit}
            {p.ablauf ? <span className="mt-0.5 block text-[12.5px] text-[#5B6675]">So läuft&apos;s: {p.ablauf}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  )
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[12px] border border-[#F1F3F5] bg-[#FAFAF7] p-3 text-center">
      <div className="text-[22px] font-extrabold leading-none text-[#111418]">
        {value}
        <span className="text-[12px] font-bold text-[#9AA7B8]">/100</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F3F5]">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: `linear-gradient(90deg, ${BLUE}, ${ORANGE})` }} />
      </div>
      <div className="mt-1.5 text-[12px] font-semibold text-[#5B6675]">{label}</div>
    </div>
  )
}
