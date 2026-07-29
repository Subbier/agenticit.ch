"use client"

// Kampagnen-Landingpage (Demo) der fiktiven "Maklerservice AG".
// Aufbau nach PAS: Pain -> Agitate -> Solution. Ziel: Lead ins
// Zoho-Modul "Krankenkassen_Leads" (via /api/kk-lead), danach ruft
// die digitale Assistentin Mia den Lead an und vereinbart den Termin.

import { useState } from "react"
import { Check, Leaf, PhoneCall, ShieldCheck, Clock } from "lucide-react"

const KASSEN = [
  "Groupe Mutuel",
  "CSS",
  "Helsana",
  "Swica",
  "Visana",
  "Concordia",
  "KPT",
  "Sanitas",
  "Assura",
  "Atupri",
  "Sympany",
  "Andere",
]

const FRANCHISEN = ["300", "500", "1000", "1500", "2000", "2500"]

type FormState = "idle" | "sending" | "done" | "error"

export function KkTerminPage() {
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    telefon: "",
    email: "",
    plz: "",
    kasse: "",
    franchise: "",
    consent: false,
    company_website: "", // Honeypot
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (state === "sending") return
    setState("sending")
    try {
      const res = await fetch("/api/kk-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("bad status")
      setState("done")
    } catch {
      setState("error")
    }
  }

  const input =
    "w-full rounded-lg border border-emerald-900/15 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"

  return (
    <main className="min-h-screen bg-[#f7faf8] text-slate-900">
      {/* Header der fiktiven Marke */}
      <header className="border-b border-emerald-900/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Maklerservice <span className="text-[#57C7FF]">AG</span>
            </span>
          </div>
          <a
            href="#formular"
            className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Kostenlosen Check anfordern
          </a>
        </div>
      </header>

      {/* PAIN */}
      <section className="mx-auto max-w-5xl px-5 pt-14 pb-10 text-center">
        <p className="mb-4 inline-block rounded-full bg-emerald-700/10 px-4 py-1.5 text-sm font-semibold text-[#57C7FF]">
          Für alle, die auf Alternativmedizin setzen
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Sie zahlen jeden Monat Prämien –{" "}
          <span className="text-[#57C7FF]">Ihre Alternativmedizin aber aus der eigenen Tasche?</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Osteopathie, TCM, Akupunktur, Naturheilkunde: Genau die Behandlungen, die Ihnen guttun,
          werden von der Grundversicherung nicht übernommen.
        </p>
      </section>

      {/* AGITATE */}
      <section className="mx-auto max-w-5xl px-5 pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-6">
            <p className="text-3xl font-extrabold text-[#57C7FF]">CHF 120–180</p>
            <p className="mt-2 text-sm text-slate-600">
              kostet eine einzige Sitzung beim Osteopathen oder Naturheilpraktiker – selbst bezahlt.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-6">
            <p className="text-3xl font-extrabold text-[#57C7FF]">CHF 1'500+</p>
            <p className="mt-2 text-sm text-slate-600">
              geben regelmässige Nutzer von Komplementärmedizin pro Jahr aus – Jahr für Jahr.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-6">
            <p className="text-3xl font-extrabold text-[#57C7FF]">1× im Jahr</p>
            <p className="mt-2 text-sm text-slate-600">
              haben Sie die Chance zu optimieren. Wer den Termin verpasst, zahlt zwölf weitere Monate drauf.
            </p>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-slate-700">
          Das Ärgerliche: Mit der <strong>richtigen Zusatzversicherung</strong> würde Ihre Kasse
          bis zu 80&nbsp;% dieser Kosten übernehmen. Die meisten zahlen nur deshalb selbst,
          weil nie jemand ihre Situation angeschaut hat.
        </p>
      </section>

      {/* SOLUTION */}
      <section className="border-y border-emerald-900/10 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Der kostenlose Alternativmedizin-Check der Maklerservice AG
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Wir vergleichen für Sie die Zusatzversicherungen aller grossen Schweizer Kassen –
            mit Fokus auf Komplementärmedizin. Unabhängig, kostenlos und unverbindlich.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl bg-[#f7faf8] p-5">
              <PhoneCall className="mt-0.5 h-6 w-6 shrink-0 text-[#57C7FF]" />
              <div>
                <p className="font-semibold">1. Rückruf in Minuten</p>
                <p className="mt-1 text-sm text-slate-600">
                  Nach dem Absenden ruft Sie Mia, unsere digitale Assistentin, an und nimmt Ihre
                  Wünsche auf – transparent als KI gekennzeichnet.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-[#f7faf8] p-5">
              <Clock className="mt-0.5 h-6 w-6 shrink-0 text-[#57C7FF]" />
              <div>
                <p className="font-semibold">2. Termin nach Wunsch</p>
                <p className="mt-1 text-sm text-slate-600">
                  Mia findet direkt am Telefon den passenden Termin für Ihr persönliches
                  Beratungsgespräch – 30 Minuten, kostenfrei.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-[#f7faf8] p-5">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#57C7FF]" />
              <div>
                <p className="font-semibold">3. Ihr Berater übernimmt</p>
                <p className="mt-1 text-sm text-slate-600">
                  Ihr persönlicher Berater zeigt Ihnen schwarz auf weiss, welche Lösung
                  Alternativmedizin am besten abdeckt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAR */}
      <section id="formular" className="mx-auto max-w-3xl px-5 py-14">
        <div className="rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(6,78,59,0.35)] sm:p-10">
          {state === "done" ? (
            <div className="py-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700/10">
                <Check className="h-7 w-7 text-[#57C7FF]" />
              </span>
              <h3 className="mt-5 text-2xl font-bold">Merci, Ihre Anfrage ist da!</h3>
              <p className="mx-auto mt-3 max-w-md text-slate-600">
                Halten Sie Ihr Telefon bereit: <strong>Mia, unsere digitale Assistentin</strong>,
                ruft Sie in den nächsten Minuten an, gleicht kurz Ihre Angaben ab und findet den
                passenden Termin für Ihre persönliche Beratung.
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold">Jetzt kostenlosen Check anfordern</h3>
              <p className="mt-2 text-sm text-slate-600">
                2 Minuten ausfüllen – Mia ruft Sie umgehend zurück und vereinbart Ihren
                Beratungstermin.
              </p>
              <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Honeypot – für Besucher unsichtbar */}
                <input
                  type="text"
                  value={form.company_website}
                  onChange={(e) => set("company_website", e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <input required placeholder="Vorname*" className={input} value={form.vorname} onChange={(e) => set("vorname", e.target.value)} />
                <input required placeholder="Nachname*" className={input} value={form.nachname} onChange={(e) => set("nachname", e.target.value)} />
                <input required type="tel" placeholder="Telefon (für den Rückruf)*" className={input} value={form.telefon} onChange={(e) => set("telefon", e.target.value)} />
                <input required type="email" placeholder="E-Mail*" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} />
                <input placeholder="PLZ" inputMode="numeric" maxLength={4} className={input} value={form.plz} onChange={(e) => set("plz", e.target.value)} />
                <select required className={input} value={form.kasse} onChange={(e) => set("kasse", e.target.value)}>
                  <option value="">Aktuelle Krankenkasse*</option>
                  {KASSEN.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
                <select className={`${input} sm:col-span-2`} value={form.franchise} onChange={(e) => set("franchise", e.target.value)}>
                  <option value="">Ihre Franchise (falls bekannt)</option>
                  {FRANCHISEN.map((f) => (
                    <option key={f} value={f}>CHF {f}</option>
                  ))}
                </select>
                <label className="flex items-start gap-3 text-sm text-slate-600 sm:col-span-2">
                  <input
                    required
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-emerald-900/30 text-[#57C7FF] focus:ring-emerald-600"
                  />
                  <span>
                    Ich bin einverstanden, dass die Maklerservice AG mich zur Terminvereinbarung
                    telefonisch kontaktiert (auch durch die als KI gekennzeichnete digitale
                    Assistentin) und meine Angaben dafür verarbeitet.*
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="rounded-full bg-emerald-700 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60 sm:col-span-2"
                >
                  {state === "sending" ? "Wird gesendet …" : "Kostenlosen Check anfordern →"}
                </button>
                {state === "error" && (
                  <p className="text-sm text-red-600 sm:col-span-2">
                    Das hat leider nicht geklappt. Bitte versuchen Sie es gleich nochmals.
                  </p>
                )}
                <p className="text-xs text-slate-400 sm:col-span-2">
                  Kostenlos & unverbindlich · Daten in der Schweiz · Keine Weitergabe an Dritte
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      <footer className="border-t border-emerald-900/10 bg-white py-6 text-center text-xs text-slate-400">
        © 2026 Maklerservice AG · Demo-Kampagnenseite, betrieben von AgenticIT – «Maklerservice AG»
        ist eine fiktive Marke zu Demonstrationszwecken.
      </footer>
    </main>
  )
}
