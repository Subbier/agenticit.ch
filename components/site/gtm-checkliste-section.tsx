"use client"

// Lead-Magnet auf der GTM-Unterseite: Branche + Ziel wählen, Kontakt angeben,
// persönliche Go-to-Market-Checkliste sofort ansehen und herunterladen.
// Lead geht parallel an /api/leads (source "gtm-checkliste"); die Checkliste
// wird auch geliefert, wenn der Webhook nicht erreichbar ist.
import { useMemo, useState } from "react"
import { Reveal } from "@/components/site/reveal"
import { downloadReport, openReport, reportFilename } from "@/lib/calculator-reports"
import {
  GTM_BRANCHEN,
  GTM_ZIELE,
  buildGtmCheckliste,
  gtmChecklisteHtml,
} from "@/lib/gtm-checkliste"

const INPUT_CLASS =
  "w-full rounded-[10px] border border-[#AEB8C2] bg-white px-4 py-3 font-[family-name:var(--font-carbon-text)] text-[14.5px] text-[#0A0C10] outline-none transition placeholder:text-[#5A6B82] hover:border-[#7E8A96] focus:border-[#1F9A5E] focus:shadow-[0_0_0_3px_rgba(31,154,94,0.18)]"

function StepBadge({ n, done }: { n: number; done: boolean }) {
  return (
    <span
      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full font-[family-name:var(--font-mono-signal)] text-[12px] font-bold ${
        done ? "bg-[#1F9A5E] text-white" : "border border-[#C8D0D8] bg-white text-[#5A6B82]"
      }`}
    >
      {done ? "✓" : n}
    </span>
  )
}

export function GtmChecklisteSection() {
  const [branche, setBranche] = useState<string | null>(null)
  const [ziel, setZiel] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  const liste = useMemo(
    () => (branche && ziel ? buildGtmCheckliste(branche, ziel) : null),
    [branche, ziel],
  )

  const formValid = name.trim().length >= 2 && /.+@.+\..+/.test(email) && consent && liste

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formValid || !liste) return
    setSubmitting(true)

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "gtm-checkliste",
          name: name.trim(),
          email: email.trim(),
          consent: true,
          industry: liste.brancheLabel,
          goal: liste.zielLabel,
          message: `GTM-Checkliste erstellt: ${liste.brancheLabel} / ${liste.zielLabel}`,
          company_website: honeypot,
        }),
      })
    } catch {
      // Checkliste trotzdem freigeben — der Besucher soll nie leer ausgehen.
    }

    setSubmitting(false)
    setUnlocked(true)
  }

  function handleDownload() {
    if (!liste) return
    const html = gtmChecklisteHtml(liste, name.trim() || undefined)
    if (!openReport(html)) {
      downloadReport(html, reportFilename("GTM_Checkliste"))
    }
  }

  return (
    <section id="gtm-checkliste" className="scroll-mt-20 border-t border-[#E1E4E8] bg-[#F1F3F5] px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[860px]">
        <Reveal className="mx-auto mb-10 flex max-w-[640px] flex-col items-center text-center">
          <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1F9A5E]">
            Kostenlos · Sofort zum Download
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,5.2vw,34px)] font-bold leading-[1.08] tracking-[-0.015em] text-[#101418]">
            Ihre persönliche GTM-Checkliste.
          </h2>
          <p className="mt-4 max-w-[540px] font-[family-name:var(--font-carbon-text)] text-[15px] leading-relaxed text-[#4A545F]">
            Zwei Antworten von Ihnen — ein massgeschneiderter Fahrplan von uns. Konkret,
            umsetzbar und auf Ihre Branche zugeschnitten.
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-[16px] border border-[#C8D0D8] bg-white p-6 shadow-[0_14px_40px_rgba(10,12,16,0.10)] sm:p-8">
            {/* Schritt 1: Branche */}
            <div className="flex items-center gap-3">
              <StepBadge n={1} done={Boolean(branche)} />
              <h3 className="font-[family-name:var(--font-display)] text-[17px] font-bold text-[#101418]">
                In welcher Branche sind Sie zuhause?
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {GTM_BRANCHEN.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBranche(b.id)}
                  className={`rounded-full border px-4 py-2 font-[family-name:var(--font-carbon-text)] text-[13.5px] font-semibold transition ${
                    branche === b.id
                      ? "border-[#1F9A5E] bg-[#1F9A5E] text-white"
                      : "border-[#C8D0D8] bg-white text-[#4A545F] hover:border-[#7E8A96]"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Schritt 2: Ziel */}
            <div className={`mt-8 transition-opacity ${branche ? "opacity-100" : "pointer-events-none opacity-40"}`}>
              <div className="flex items-center gap-3">
                <StepBadge n={2} done={Boolean(ziel)} />
                <h3 className="font-[family-name:var(--font-display)] text-[17px] font-bold text-[#101418]">
                  Was wollen Sie erreichen?
                </h3>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {GTM_ZIELE.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setZiel(z.id)}
                    className={`rounded-[10px] border px-4 py-3 text-left font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold transition ${
                      ziel === z.id
                        ? "border-[#1F9A5E] bg-[#1F9A5E]/[0.08] text-[#101418]"
                        : "border-[#C8D0D8] bg-white text-[#4A545F] hover:border-[#7E8A96]"
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Schritt 3: Kontakt + Freischaltung */}
            {!unlocked ? (
              <form
                onSubmit={handleSubmit}
                className={`mt-8 transition-opacity ${liste ? "opacity-100" : "pointer-events-none opacity-40"}`}
              >
                <div className="flex items-center gap-3">
                  <StepBadge n={3} done={false} />
                  <h3 className="font-[family-name:var(--font-display)] text-[17px] font-bold text-[#101418]">
                    Wohin dürfen wir die Checkliste schicken?
                  </h3>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ihr Name"
                    autoComplete="name"
                    className={INPUT_CLASS}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ihre E-Mail"
                    autoComplete="email"
                    className={INPUT_CLASS}
                  />
                </div>
                {/* Honeypot: bleibt für Menschen unsichtbar und leer */}
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <label className="mt-4 flex items-start gap-2.5 font-[family-name:var(--font-carbon-text)] text-[12.5px] font-medium leading-relaxed text-[#4A545F]">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#1F9A5E]"
                  />
                  <span>
                    Ich bin einverstanden, dass AgenticIT mich zur Checkliste kontaktieren darf.
                    Kein Spam, DSG-konform, jederzeit widerrufbar.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!formValid || submitting}
                  className="mt-5 w-full rounded-[10px] bg-[#1F9A5E] px-6 py-3.5 font-[family-name:var(--font-carbon-text)] text-[15px] font-bold text-white transition hover:bg-[#187C4B] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  {submitting ? "Wird erstellt …" : "Checkliste erstellen →"}
                </button>
              </form>
            ) : null}

            {/* Ergebnis */}
            {unlocked && liste ? (
              <div className="mt-8 border-t border-[#E1E4E8] pt-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(18px,4vw,22px)] font-bold text-[#101418]">
                      Ihr Fahrplan: {liste.zielLabel}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-carbon-text)] text-[13px] text-[#5A6B82]">
                      Branche: {liste.brancheLabel} · erstellt für {name.trim()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex-none rounded-[10px] bg-[#0A0C10] px-5 py-3 font-[family-name:var(--font-carbon-text)] text-[14px] font-bold text-white transition hover:bg-[#1E2833]"
                  >
                    Als PDF speichern ↓
                  </button>
                </div>

                {[
                  { title: "Das Fundament — ohne das verpufft alles", items: liste.fundament },
                  { title: `Ihr Ziel: ${liste.zielLabel}`, items: liste.zielItems },
                  { title: `Speziell für ${liste.brancheLabel}`, items: liste.branchenItems },
                ].map((group) => (
                  <div key={group.title} className="mt-6">
                    <h4 className="font-[family-name:var(--font-mono-signal)] text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#1F9A5E]">
                      {group.title}
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 font-[family-name:var(--font-carbon-text)] text-[14px] leading-relaxed text-[#1E2833]">
                          <span className="mt-[3px] h-[15px] w-[15px] flex-none rounded-[4px] border-2 border-[#9AA3AD]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <p className="mt-8 rounded-[10px] bg-[#F1F3F5] p-4 font-[family-name:var(--font-carbon-text)] text-[13.5px] leading-relaxed text-[#4A545F]">
                  <strong className="text-[#101418]">Möchten Sie die Liste nicht alleine abarbeiten?</strong>{" "}
                  Wir gehen sie in einem kostenlosen Erstgespräch gemeinsam durch und zeigen Ihnen,
                  wo bei Ihnen der grösste Hebel liegt: <a href="tel:+41315394444" className="font-semibold text-[#1F9A5E] hover:underline">031 539 44 44</a>
                </p>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
