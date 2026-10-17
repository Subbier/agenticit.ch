"use client"

import { useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowRight, Download, Loader2 } from "lucide-react"
import { JourneyContent } from "@/components/journey/content"
import { downloadText } from "@/components/journey/check"
import {
  buildAcquisitionPlan,
  calculateAcquisitionPlan,
  formatPlanningNumber as fmt,
  planningIndustries,
  type AcquisitionPlanInput,
  type PlanningIndustryId,
} from "@/lib/acquisition-planner"
import {
  POTENZIAL_HERO,
  planningFaqs,
  planningSteps,
} from "@/lib/potenzial-content"
import styles from "./potential-planner.module.css"
import shared from "@/components/journey/journey.module.css"

function PlanningContact({ input }: { input: AcquisitionPlanInput }) {
  const [contactMethod, setContactMethod] = useState("email")
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle")
  const [error, setError] = useState("")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const form = new FormData(event.currentTarget)
    setStatus("sending")
    setError("")
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "potenzialrechner",
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          contactMethod,
          phone: contactMethod === "phone" ? form.get("phone") : "",
          acquisitionPlan: input,
          consent: form.get("consent") === "on",
          company_website: form.get("company_website") || "",
        }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok || data?.ok !== true || form.get("company_website"))
        throw new Error(
          data?.message ||
            "Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.",
        )
      setStatus("success")
    } catch (reason) {
      setStatus("error")
      setError(
        reason instanceof Error
          ? reason.message
          : "Die Anfrage konnte nicht übermittelt werden.",
      )
    }
  }
  if (status === "success")
    return (
      <div className={shared.formSuccess} role="status">
        <h3>Danke für Ihre Anfrage.</h3>
        <p>
          Ihre Angaben wurden übermittelt. Wir prüfen Ihren Plan persönlich und
          melden uns über den gewählten Kontaktweg. Die Rechnung bleibt oben
          verfügbar.
        </p>
      </div>
    )
  return (
    <form className={shared.contact} onSubmit={submit}>
      <h3>Ihr Ziel gemeinsam einordnen.</h3>
      <p>
        Wir prüfen mit Ihnen Anfrageweg, Bearbeitung und einen passenden
        nächsten Schritt. Ihre Angaben und der berechnete Plan werden
        mitgesendet.
      </p>
      <div className={shared.formGrid}>
        <label className={shared.field}>
          Ihr Name *
          <input
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
          />
        </label>
        <label className={shared.field}>
          E-Mail *
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={180}
            required
          />
        </label>
        <label className={shared.field}>
          Unternehmen *
          <input
            name="company"
            autoComplete="organization"
            minLength={2}
            maxLength={160}
            required
          />
        </label>
        <label className={shared.field}>
          Gewünschter Kontaktweg
          <select
            value={contactMethod}
            onChange={(event) => setContactMethod(event.target.value)}
          >
            <option value="email">E-Mail</option>
            <option value="phone">Telefonischer Rückruf</option>
          </select>
        </label>
        {contactMethod === "phone" ? (
          <label className={`${shared.field} ${shared.fieldFull}`}>
            Telefonnummer für den Rückruf *
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              minLength={7}
              maxLength={80}
              required
            />
          </label>
        ) : null}
      </div>
      <div className={shared.hiddenField} aria-hidden="true">
        <label>
          Dieses Feld bitte leer lassen
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className={shared.consent}>
        <input name="consent" type="checkbox" required />
        <span>
          Ich bin einverstanden, dass AgenticIT meine Angaben und meine Planung
          zur Bearbeitung dieser Anfrage verwendet und mich dazu kontaktiert.{" "}
          <Link href="/datenschutz">Datenschutz</Link>
        </span>
      </label>
      <div className={shared.actions}>
        <button
          className={shared.button}
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />{" "}
              Wird übermittelt …
            </>
          ) : (
            <>
              Persönliche Rückmeldung anfragen{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <p className={shared.fine}>
        Damit erteilen Sie noch keinen Auftrag. Es erfolgt keine
        Newsletter-Anmeldung.
      </p>
      {error ? (
        <p role="alert" className={shared.formError}>
          {error} Alternativ:{" "}
          <a href="mailto:info@agenticit.ch">info@agenticit.ch</a>.
        </p>
      ) : null}
    </form>
  )
}

export function PotenzialPage() {
  const [customers, setCustomers] = useState("")
  const [rate, setRate] = useState("")
  const [minutes, setMinutes] = useState("")
  const [industryIds, setIndustryIds] = useState<PlanningIndustryId[]>([])
  const [showContact, setShowContact] = useState(false)
  const contact = useRef<HTMLDivElement>(null)
  const input = {
    version: 1 as const,
    industryIds,
    monthlyCustomers: customers === "" ? NaN : Number(customers),
    closeRate: rate === "" ? NaN : Number(rate),
    handlingMinutes: minutes === "" ? undefined : Number(minutes),
  }
  const result = calculateAcquisitionPlan(input)
  const plan = buildAcquisitionPlan(input)
  function update(setter: (value: string) => void, value: string) {
    setter(value)
    setShowContact(false)
  }
  function example() {
    setCustomers("10")
    setRate("25")
    setMinutes("15")
    setShowContact(false)
  }
  function openContact() {
    setShowContact(true)
    requestAnimationFrame(() => {
      contact.current?.focus()
      contact.current?.scrollIntoView({ block: "start", behavior: "instant" })
    })
  }
  return (
    <JourneyContent>
      <div className={styles.page}>
        <header className={styles.hero}>
          <nav aria-label="Brotkrumen">
            <a href="/werkzeuge">Checks & Vorlagen</a>
            <span aria-hidden="true">/</span>
            <span>Anfragenplanung</span>
          </nav>
          <span className={shared.eyebrow}>{POTENZIAL_HERO.eyebrow}</span>
          <h1>{POTENZIAL_HERO.h1}</h1>
          <p>{POTENZIAL_HERO.lead}</p>
          <p className={styles.note}>
            Eine Planungsrechnung mit Ihren Annahmen, keine Prognose.
          </p>
        </header>
        <section
          id="rechner"
          className={styles.workspace}
          aria-label="Anfragenplanung"
        >
          <div className={styles.inputs}>
            <span className={shared.eyebrow}>01 · Ihre Annahmen</span>
            <h2>Vom Ziel rückwärts rechnen.</h2>
            <div className={styles.fields}>
              <label>
                Kundenziel pro Monat
                <input
                  type="number"
                  min="1"
                  max="10000"
                  step="1"
                  inputMode="numeric"
                  value={customers}
                  onChange={(event) => update(setCustomers, event.target.value)}
                  aria-describedby="customers-hint"
                />
                <span id="customers-hint">
                  Wie viele Neukunden möchten Sie gewinnen?
                </span>
              </label>
              <label>
                Angenommene Abschlussquote (%)
                <input
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  inputMode="decimal"
                  value={rate}
                  onChange={(event) => update(setRate, event.target.value)}
                  aria-describedby="rate-hint"
                />
                <span id="rate-hint">
                  Wie viel Prozent der passenden Anfragen werden zu Kunden?
                </span>
              </label>
              <label className={styles.full}>
                Minuten je Anfrage (optional)
                <input
                  type="number"
                  min="0"
                  max="1440"
                  step="0.5"
                  inputMode="decimal"
                  value={minutes}
                  onChange={(event) => update(setMinutes, event.target.value)}
                  aria-describedby="minutes-hint"
                />
                <span id="minutes-hint">
                  Gesamte Bearbeitungszeit Ihres Teams, einschliesslich
                  Nachfassen.
                </span>
              </label>
            </div>
            <button type="button" className={styles.example} onClick={example}>
              Beispiel einsetzen: 10 Kunden, 25 %, 15 Min.
            </button>
            <details className={styles.industries}>
              <summary>Branchen ergänzen (optional)</summary>
              <p>
                Mehrere möglich. Die Auswahl ergänzt Ihren Plan und verändert
                die Rechnung nicht.
              </p>
              <div>
                {planningIndustries.map((industry) => (
                  <button
                    key={industry.value}
                    type="button"
                    aria-pressed={industryIds.includes(industry.value)}
                    onClick={() => {
                      setIndustryIds((current) =>
                        current.includes(industry.value)
                          ? current.filter((id) => id !== industry.value)
                          : [...current, industry.value],
                      )
                      setShowContact(false)
                    }}
                  >
                    {industry.label}
                  </button>
                ))}
              </div>
            </details>
          </div>
          <div className={styles.result}>
            <span className={styles.darkEyebrow}>02 · Ihre Planung</span>
            <h2>Das Anfrageziel dahinter.</h2>
            <div
              className={styles.liveResult}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {result ? (
                <>
                  <strong>{fmt(result.requiredInquiries)}</strong>
                  <span>passende Anfragen pro Monat</span>
                  <p>
                    Für Ihr Ziel von {fmt(result.input.monthlyCustomers)}{" "}
                    Neukunden bei {fmt(result.input.closeRate)} %
                    Abschlussquote.
                  </p>
                </>
              ) : (
                <>
                  <span className={styles.placeholder}>
                    Ihr Ziel → Ihre Anfragen
                  </span>
                  <p>
                    Tragen Sie Kundenziel und Abschlussquote ein oder starten
                    Sie mit dem Beispiel.
                  </p>
                </>
              )}
            </div>
            {result ? (
              <>
                <div className={styles.effort}>
                  <span>Bearbeitung im Team</span>
                  <b>
                    {result.handlingMinutes === null
                      ? "Noch zu klären"
                      : result.handlingMinutes < 60
                        ? `${fmt(result.handlingMinutes)} Min.`
                        : `${fmt(result.handlingMinutes / 60)} Std.`}
                  </b>
                  <p>
                    {result.handlingMinutes === null
                      ? "Minuten je Anfrage ergänzen, um den Aufwand mitzudenken."
                      : "Nach Ihrer Zeitannahme, ohne Prüfung verfügbarer Kapazität."}
                  </p>
                </div>
                <details className={styles.calculation}>
                  <summary>Rechenweg & vorsichtigere Annahme</summary>
                  <p>
                    {fmt(result.input.monthlyCustomers)} × 100 ÷{" "}
                    {fmt(result.input.closeRate)} ={" "}
                    {fmt(result.requiredInquiries)} passende Anfragen,
                    aufgerundet.
                  </p>
                  <p>
                    Mit 80 % Ihrer Quote, also {fmt(result.cautiousRate)} %,
                    wären rechnerisch {fmt(result.cautiousInquiries)} Anfragen
                    nötig. Eine zusätzliche Annahme, keine gemessene Schwankung.
                  </p>
                </details>
              </>
            ) : (
              <p
                className={styles.darkNote}
                role={customers !== "" && rate !== "" ? "alert" : undefined}
              >
                {customers !== "" && rate !== ""
                  ? "Bitte prüfen Sie Ihre Werte: 1 bis 10’000 ganze Neukunden, 0,1 bis 100 % Abschlussquote. Die optionale Zeit liegt zwischen 0 und 1’440 Minuten."
                  : "Nutzen Sie eigene Erfahrungswerte. Ohne solche Werte bleibt Ihre Abschlussquote eine Annahme."}
              </p>
            )}
          </div>
        </section>
        {result && plan ? (
          <section className={styles.plan} aria-label="Ihr Akquise-Plan">
            <h2>Eine Zahl. Drei nächste Schritte.</h2>
            <div className={styles.steps}>
              {planningSteps.map((step, index) => (
                <article key={step.title}>
                  <span>0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
            <p className={styles.note}>
              Nachfrage, Werbekosten und Abschlussdauer sind hier nicht
              gemessen. Abschlüsse können später erfolgen. Prüfen Sie die
              Annahmen im echten Ablauf.
            </p>
            <div className={styles.planActions} id="rueckruf">
              <button
                type="button"
                className={shared.button}
                onClick={() => downloadText(plan, "AgenticIT-Anfragenplan.txt")}
              >
                Meinen Plan speichern <Download size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={shared.secondary}
                onClick={openContact}
              >
                Plan mit uns besprechen{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
            <details className={styles.preview}>
              <summary>Vollständigen Plan ansehen</summary>
              <pre>{plan}</pre>
            </details>
            {showContact ? (
              <div
                ref={contact}
                tabIndex={-1}
                className={styles.contactArea}
                aria-label="Freiwillige Anfrage zur Anfragenplanung"
                role="region"
              >
                <PlanningContact input={result.input} />
              </div>
            ) : null}
          </section>
        ) : null}
        <section className={styles.faq} aria-labelledby="planning-faq">
          <h2 id="planning-faq">Gut zu wissen.</h2>
          {planningFaqs.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
          <a href="/marketing-setup-check">
            Lieber zuerst den Anfrageweg prüfen?{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </section>
      </div>
    </JourneyContent>
  )
}
