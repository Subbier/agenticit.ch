"use client"

import Link from "next/link"
import { useRef, useState, type FormEvent } from "react"
import { ArrowLeft, ArrowRight, Check, Download, Loader2 } from "lucide-react"
import {
  buildJourneyPlan,
  calculateTimePotential,
  challenges,
  channelLabels,
  packages,
  systemLabels,
  type ChallengeId,
  type JourneyAnswers,
} from "@/lib/journey"
import styles from "./journey.module.css"
import type { AutomationInput } from "@/lib/automation"
import type { MarketingSetupInput } from "@/lib/marketing-setup"
import {
  createCheckMeasurement,
  trackInquiryAcknowledgement,
} from "@/lib/check-measurement"

export function downloadText(text: string, filename: string) {
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", text], { type: "text/plain;charset=utf-8" }),
  )
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function TimeCalculator() {
  const [cases, setCases] = useState("30")
  const [before, setBefore] = useState("15")
  const [after, setAfter] = useState("5")
  const result =
    cases !== "" && before !== "" && after !== ""
      ? calculateTimePotential(Number(cases), Number(before), Number(after))
      : null
  const number = (value: number) =>
    new Intl.NumberFormat("de-CH", { maximumFractionDigits: 1 }).format(value)
  return (
    <div className={styles.calculator}>
      <h3>Was könnte eine einfachere Routine freigeben?</h3>
      <p className={styles.fine}>
        Beispielwerte: Ersetzen Sie diese durch Ihre Schätzung. Die künftige
        Zeit ist eine Annahme, die im Test geprüft wird.
      </p>
      <div className={styles.calculatorInputs}>
        <label className={styles.field}>
          Vorgänge pro Woche
          <input
            type="number"
            min="0"
            max="100000"
            step="1"
            inputMode="numeric"
            value={cases}
            onChange={(event) => setCases(event.target.value)}
          />
        </label>
        <label className={styles.field}>
          Heute: Minuten je Vorgang
          <input
            type="number"
            min="0"
            max="10080"
            value={before}
            onChange={(event) => setBefore(event.target.value)}
          />
        </label>
        <label className={styles.field}>
          Künftig geschätzt: Minuten
          <input
            type="number"
            min="0"
            max={before || "10080"}
            value={after}
            onChange={(event) => setAfter(event.target.value)}
          />
        </label>
      </div>
      <div aria-live="polite" className={styles.calculationResult}>
        {result ? (
          <>
            <strong>{number(result.freedHours)} Std.</strong>
            <span>rechnerisch freie Kapazität pro Woche</span>
            <p className={styles.fine}>
              Heutiger Aufwand: {number(result.currentHours)} Std. · Geschätzter
              künftiger Aufwand: {number(result.futureHours)} Std. Dies ist
              keine Zusage einer Kostenersparnis.
            </p>
          </>
        ) : (
          <p className={styles.formError}>
            Bitte vollständige, nicht negative Werte eingeben. Die künftige Zeit
            darf nicht über der heutigen liegen.
          </p>
        )}
      </div>
      {result ? (
        <button
          type="button"
          className={styles.textLink}
          onClick={() =>
            downloadText(
              [
                "AGENTICIT · ZEITPOTENZIAL · SCHÄTZRECHNUNG",
                `Vorgänge pro Woche: ${cases}`,
                `Heutige Minuten je Vorgang: ${before}`,
                `Geschätzte künftige Minuten je Vorgang: ${after}`,
                `Rechnerisch freie Kapazität pro Woche: ${number(result.freedHours)} Stunden`,
                "Die künftige Zeit ist eine Annahme und muss im tatsächlichen Ablauf geprüft werden. Keine Zusage einer Kostenersparnis.",
                "https://agenticit.ch/kundenreise-check?thema=admin",
              ].join("\n"),
              "AgenticIT-Zeitpotenzial.txt",
            )
          }
        >
          Schätzrechnung speichern <Download size={14} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}

export function JourneyContact({
  answers,
  automation,
  marketingSetup,
}:
  | { answers: JourneyAnswers; automation?: never; marketingSetup?: never }
  | { automation: AutomationInput; answers?: never; marketingSetup?: never }
  | {
      marketingSetup: MarketingSetupInput
      answers?: never
      automation?: never
    }) {
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
          source: marketingSetup
            ? "marketing-setup-check"
            : automation
              ? "automation-check"
              : "journey-check",
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          phone: contactMethod === "phone" ? form.get("phone") : "",
          contactMethod,
          journey: answers ? { version: 1, ...answers } : undefined,
          automation,
          marketingSetup,
          consent: form.get("consent") === "on",
          company_website: form.get("company_website") || "",
        }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok || data?.ok !== true)
        throw new Error(
          data?.message ||
            "Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.",
        )
      trackInquiryAcknowledgement(
        marketingSetup
          ? "marketing_setup"
          : automation
            ? "automation"
            : "customer_journey",
        response.ok,
        data,
        form.get("company_website"),
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
      <div className={styles.formSuccess} role="status">
        <h3>Danke für Ihre Anfrage.</h3>
        <p>
          Ihre Angaben wurden übermittelt. Wir prüfen Ihr Anliegen persönlich
          und melden uns über den gewählten Kontaktweg. Ihr Plan bleibt oben
          verfügbar.
        </p>
      </div>
    )
  return (
    <form className={styles.contact} onSubmit={submit}>
      <h3>Den nächsten Schritt gemeinsam prüfen?</h3>
      <p>
        Wir sehen uns Ihren Ablauf an und besprechen, welche Services zu Ihrem
        Anliegen passen. Ihre Auswahl aus dem Check wird mitgesendet.
      </p>
      <div className={styles.formGrid}>
        <label className={styles.field}>
          Ihr Name *
          <input
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
          />
        </label>
        <label className={styles.field}>
          E-Mail *
          <input
            name="email"
            autoComplete="email"
            type="email"
            maxLength={180}
            required
          />
        </label>
        <label className={styles.field}>
          Unternehmen *
          <input
            name="company"
            autoComplete="organization"
            minLength={2}
            maxLength={160}
            required
          />
        </label>
        <label className={styles.field}>
          Gewünschter Kontaktweg
          <select
            name="contactMethod"
            value={contactMethod}
            onChange={(event) => setContactMethod(event.target.value)}
          >
            <option value="email">E-Mail</option>
            <option value="phone">Telefonischer Rückruf</option>
          </select>
        </label>
        {contactMethod === "phone" ? (
          <label className={`${styles.field} ${styles.fieldFull}`}>
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
      <div className={styles.hiddenField} aria-hidden="true">
        <label>
          Dieses Feld bitte leer lassen
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className={styles.consent}>
        <input name="consent" type="checkbox" required />
        <span>
          Ich bin einverstanden, dass AgenticIT meine Angaben und
          Check-Antworten zur Bearbeitung dieser Anfrage verwendet und mich dazu
          kontaktiert. <Link href="/datenschutz">Datenschutz</Link>
        </span>
      </label>
      <div className={styles.actions}>
        <button
          className={styles.button}
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
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
      <p className={styles.fine}>
        Damit erteilen Sie noch keinen Auftrag. Es erfolgt keine
        Newsletter-Anmeldung.
      </p>
      {error ? (
        <p role="alert" className={styles.formError}>
          {error} Alternativ erreichen Sie uns unter{" "}
          <a href="mailto:info@agenticit.ch">info@agenticit.ch</a>.
        </p>
      ) : null}
    </form>
  )
}

export function JourneyCheck({
  initialChallenge,
}: {
  initialChallenge?: ChallengeId
}) {
  const [challenge, setChallenge] = useState<ChallengeId | undefined>(
    initialChallenge,
  )
  const [channel, setChannel] = useState<
    JourneyAnswers["channel"] | undefined
  >()
  const [system, setSystem] = useState<JourneyAnswers["system"] | undefined>()
  const [step, setStep] = useState(initialChallenge ? 1 : 0)
  const [showContact, setShowContact] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const measurement = useRef(createCheckMeasurement("customer_journey"))
  function go(next: number) {
    if (next > step) measurement.current.record("check_started")
    if (next === 3) measurement.current.record("check_result_ready")
    setStep(next)
    setShowContact(false)
    requestAnimationFrame(() => heading.current?.focus())
  }
  function savePlan(text: string) {
    downloadText(text, `AgenticIT-${challenge}-Plan.txt`)
    measurement.current.record("plan_download_clicked")
  }
  if (step === 3 && challenge && channel && system) {
    const answers = { challenge, channel, system }
    const plan = buildJourneyPlan(answers)
    const service = packages.find((item) => item.id === plan.packageId)!
    return (
      <div className={styles.checkPanel}>
        <div className={styles.resultTop}>
          <div>
            <span className={styles.eyebrow}>Ihr Ergebnis</span>
            <h2 ref={heading} tabIndex={-1}>
              {plan.title}
            </h2>
          </div>
          <span className={styles.resultTag}>
            <Check size={13} aria-hidden="true" />
            Direkt für Sie nutzbar
          </span>
        </div>
        <p className={styles.fine}>
          {channelLabels[channel]} · {systemLabels[system]}
        </p>
        <h3
          style={{ fontSize: "21px", fontWeight: 500, margin: "18px 0 22px" }}
        >
          {plan.focus}
        </h3>
        <ol className={styles.resultList}>
          {plan.steps.map((text, index) => (
            <li key={text}>
              <span aria-hidden="true">{index + 1}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.measurement}>
          <strong>Daran erkennen Sie eine Verbesserung</strong>
          {plan.measure}
        </div>
        {challenge === "admin" ? <TimeCalculator /> : null}
        <details className={styles.template} open>
          <summary>Ihre Vorlage zum Weiterarbeiten</summary>
          <pre>{plan.template}</pre>
        </details>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => savePlan(plan.download)}
          >
            <Download size={16} aria-hidden="true" />
            Plan speichern
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => setShowContact(true)}
            aria-expanded={showContact}
            aria-controls="personal-follow-up"
          >
            Mit uns konkretisieren <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
        <p className={styles.fine} style={{ marginTop: 14 }}>
          Ihr Plan ist eine Orientierung anhand Ihrer Antworten. Eine Prüfung
          Ihrer Systeme hat noch nicht stattgefunden.
        </p>
        <div className={styles.measurement}>
          <strong>Passende Services: {service.title}</strong>
          {service.scope} Umfang und Preis klären wir gemeinsam.{" "}
          <Link href="/pakete" className={styles.textLink}>
            Services ansehen →
          </Link>
        </div>
        <div id="personal-follow-up">
          {showContact ? <JourneyContact answers={answers} /> : null}
        </div>
        <button type="button" className={styles.back} onClick={() => go(0)}>
          <ArrowLeft size={14} aria-hidden="true" />
          Antworten ändern
        </button>
      </div>
    )
  }
  return (
    <div className={styles.checkPanel}>
      <div className={styles.progress}>
        <span>Frage {step + 1} von 3</span>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={3}
          aria-valuenow={step + 1}
          aria-label="Fortschritt im Kundenreise-Check"
        >
          <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
        <span>Ergebnis ohne E-Mail</span>
      </div>
      <h2 tabIndex={-1} ref={heading}>
        {step === 0
          ? "Was möchten Sie zuerst verbessern?"
          : step === 1
            ? "Wie erreichen Anliegen heute Ihr Team?"
            : "Wie behalten Sie den Überblick?"}
      </h2>
      <p>
        {step === 0
          ? "Wählen Sie das Anliegen, das Sie im Alltag am meisten beschäftigt."
          : step === 1
            ? "Ihre Antwort hilft, den ersten Übergabeschritt passend zu gestalten."
            : "So können wir den Ansatzpunkt auf Ihre heutige Arbeitsweise abstimmen."}
      </p>
      <div className={styles.options}>
        {step === 0
          ? challenges.map((item) => (
              <button
                className={styles.option}
                key={item.id}
                type="button"
                aria-pressed={challenge === item.id}
                onClick={() => {
                  setChallenge(item.id)
                  go(1)
                }}
              >
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.magnet}</small>
                </span>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ))
          : null}
        {step === 1
          ? (
              Object.entries(channelLabels) as [
                JourneyAnswers["channel"],
                string,
              ][]
            ).map(([key, label]) => (
              <button
                className={styles.option}
                type="button"
                key={key}
                aria-pressed={channel === key}
                onClick={() => {
                  setChannel(key)
                  go(2)
                }}
              >
                <strong>{label}</strong>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ))
          : null}
        {step === 2
          ? (
              Object.entries(systemLabels) as [
                JourneyAnswers["system"],
                string,
              ][]
            ).map(([key, label]) => (
              <button
                className={styles.option}
                type="button"
                key={key}
                aria-pressed={system === key}
                onClick={() => {
                  setSystem(key)
                  go(3)
                }}
              >
                <strong>{label}</strong>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ))
          : null}
      </div>
      {step > 0 ? (
        <button
          type="button"
          className={styles.back}
          onClick={() => go(step - 1)}
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Zurück
        </button>
      ) : null}
    </div>
  )
}
