"use client"

import Link from "next/link"
import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { ArrowLeft, ArrowRight, Check, Download, Loader2 } from "lucide-react"
import { PotentialArt } from "./potential-art"
import { LeadPdfPreview } from "./lead-pdf-preview"
import { potentialScenes, scenarioChoices } from "@/lib/potential-visual"
import {
  potentialQuestions,
  potentialStepLabels,
  hourlyValueQuestion,
} from "@/lib/potential-questions"
import {
  potentialConfigs,
  potentialKinds,
  type PotentialInput,
  type PotentialKind,
} from "@/lib/potential-report"
import styles from "./potential-check.module.css"

type NumericKey = Exclude<keyof PotentialInput, "kind" | "version">
const empty = {
  volume: "",
  targetVolume: "",
  currentRate: "",
  targetRate: "",
  value: "",
  margin: "",
  minutes: "",
  targetMinutes: "",
  hourlyRate: "",
  setupCost: "0",
  monthlyCost: "0",
}

export function PotentialCheck({
  initialKind,
  chooseKind = false,
  embedded = false,
  title,
  context,
}: {
  initialKind: PotentialKind
  chooseKind?: boolean
  embedded?: boolean
  title?: string
  context?: "crm"
}) {
  const [kind, setKind] = useState(initialKind)
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(empty)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [download, setDownload] = useState("")
  const [scenario, setScenario] = useState("")
  const choiceId = useId()
  const heading = useRef<HTMLHeadingElement>(null)
  const c = potentialConfigs[kind]
  const revenue = c.mode === "revenue"
  const questions =
    context === "crm"
      ? {
          volume: "Wie viele CRM-Einträge bearbeiten Sie pro Monat von Hand?",
          time: "Wie viele Minuten brauchen Sie heute pro CRM-Eintrag?",
          targetTime:
            "Wie viele Minuten möchten Sie künftig pro CRM-Eintrag aufwenden?",
        }
      : potentialQuestions[kind]
  const scenarios = scenarioChoices(kind, {
    volume: Number(values.volume),
    currentRate: Number(values.currentRate),
    minutes: Number(values.minutes),
  })
  const Heading = embedded ? "h2" : "h1"
  useEffect(
    () => () => {
      if (download) URL.revokeObjectURL(download)
    },
    [download],
  )
  function move(next: number) {
    setStep(next)
    setError("")
    requestAnimationFrame(() => heading.current?.focus())
  }
  function field(
    key: NumericKey,
    label: string,
    options: {
      max?: number
      step?: string
      optional?: boolean
      help?: string
    } = {},
  ) {
    return (
      <label className={styles.field} key={key}>
        <span>{label}</span>

        <input
          name={key}
          type="number"
          inputMode="decimal"
          min="0"
          max={options.max ?? 10000000}
          step={options.step ?? "any"}
          required={!options.optional}
          value={values[key]}
          onChange={(e) => {
            setValues({ ...values, [key]: e.target.value })
            setScenario("")
          }}
        />
      </label>
    )
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy || download) return
    if (step < 2) {
      move(step + 1)
      return
    }
    setBusy(true)
    setError("")
    const form = new FormData(event.currentTarget)
    const numeric = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, Number(value)]),
    )
    const input = {
      ...numeric,
      version: 1,
      kind,
      targetVolume:
        kind === "acquisition"
          ? Number(values.targetVolume)
          : Number(values.volume),
      ...(!revenue
        ? { currentRate: 0, targetRate: 0, value: 0, margin: 0 }
        : { minutes: 0, targetMinutes: 0, hourlyRate: 0, margin: 0 }),
    }
    try {
      const response = await fetch("/api/potential-report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: c.source,
          potentialReport: input,
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          phone: form.get("phone"),
          company_website: form.get("company_website"),
          consent: form.get("consent") === "on",
        }),
      })
      if (
        !response.ok ||
        !response.headers.get("content-type")?.includes("application/pdf")
      ) {
        const data = await response.json().catch(() => ({}))
        throw new Error(
          data.message ||
            "Ihre Anfrage konnte noch nicht übermittelt werden. Bitte versuchen Sie es erneut.",
        )
      }
      setDownload(URL.createObjectURL(await response.blob()))
      requestAnimationFrame(() => heading.current?.focus())
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Bitte versuchen Sie es erneut.",
      )
    } finally {
      setBusy(false)
    }
  }
  return (
    <div
      data-visual-lead-magnet={kind}
      className={`${styles.wrap} ${embedded ? styles.embedded : ""}`}
    >
      <header className={styles.hero}>
        <span className={styles.eyebrow}>
          {embedded ? "Kostenloser Rechner" : `${c.label} · Rechner`}
        </span>
        <Heading>{title ?? c.title}</Heading>
        <p>
          {embedded ? (
            "Ihre persönliche Berechnung als PDF."
          ) : (
            <>
              {revenue
                ? "Berechnen Sie Ihren möglichen Mehrumsatz."
                : "Berechnen Sie Ihre mögliche Zeitersparnis."}{" "}
              Ihr persönliches Ergebnis als PDF.
            </>
          )}
        </p>
        <details className={styles.more}>
          <summary>Mehr erfahren</summary>
          <p>
            {c.intro} {c.opportunity}
          </p>
          <p>
            Sie wählen die Verbesserung selbst. Wir rechnen mit diesen Annahmen;
            das ist keine Erfolgszusage. Umsatz ist kein Gewinn. Der Wert freier
            Zeit ist keine automatische Kostensenkung.
          </p>
        </details>
      </header>
      <section className={styles.card} aria-label={c.label}>
        <div className={styles.progressLine}>
          <span>Schritt {step + 1} von 3</span>
          <progress aria-label="Ihr Fortschritt" value={step + 1} max={3} />
        </div>
        <ol className={styles.progress} aria-label="Ihre drei Schritte">
          {potentialStepLabels.map((label, i) => (
            <li
              key={label}
              className={
                i === step ? styles.active : i < step ? styles.done : ""
              }
              aria-current={i === step ? "step" : undefined}
            >
              <span>{i + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        {download ? (
          <div className={styles.success}>
            <h2 ref={heading} tabIndex={-1}>
              Ihre Berechnung ist bereit.
            </h2>
            <p>
              Eine Seite mit Ihren Zahlen und Ihrem Ergebnis pro Monat und Jahr.
            </p>
            <a
              className={styles.primary}
              href={download}
              download={`AgenticIT-Potenzial-${kind}.pdf`}
            >
              <Download size={17} /> Mein Potenzial als PDF herunterladen
            </a>
          </div>
        ) : (
          <form onSubmit={submit} data-check-step={step}>
            {step === 2 ? <LeadPdfPreview /> : null}
            <div className={styles.formHead}>
              <h2 ref={heading} tabIndex={-1}>
                {step === 0
                  ? revenue
                    ? "Ihre Chance auf mehr Umsatz berechnen"
                    : "Ihre Chance auf mehr freie Zeit berechnen"
                  : step === 1
                    ? revenue
                      ? "Ihr Wunsch: mehr Umsatz"
                      : "Ihr Wunsch: mehr freie Zeit"
                    : "Ihr persönliches Potenzial-PDF"}
              </h2>
              <span className={styles.note}>Schritt {step + 1} von 3</span>
            </div>
            {step === 0 ? (
              <>
                {chooseKind ? (
                  <fieldset className={styles.kindChoices}>
                    <legend>Was möchten Sie gewinnen?</legend>
                    <div className={styles.pictureChoices}>
                      {potentialKinds.map((id) => (
                        <label
                          key={id}
                          className={`${styles.pictureChoice} ${kind === id ? styles.selected : ""}`}
                        >
                          <input
                            type="radio"
                            name={`${choiceId}-kind`}
                            value={id}
                            checked={kind === id}
                            onChange={() => {
                              setKind(id)
                              setValues(empty)
                              setScenario("")
                            }}
                          />
                          <PotentialArt kind={id} />
                          <span className={styles.choiceText}>
                            <span className={styles.radio}>
                              {kind === id ? <Check size={13} /> : null}
                            </span>
                            <strong>{potentialScenes[id].title}</strong>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : null}
                <div className={styles.grid}>
                  {field("volume", questions.volume, {
                    max: 1000000,
                    step: "1",
                  })}
                  {revenue ? (
                    <>
                      {field(
                        "currentRate",
                        "rate" in questions ? questions.rate : c.rate,
                        { max: 100 },
                      )}
                      {field(
                        "value",
                        "value" in questions ? questions.value : c.value,
                      )}
                    </>
                  ) : (
                    <>
                      {field(
                        "minutes",
                        "time" in questions ? questions.time : c.time,
                        { max: 10080 },
                      )}
                      {field("hourlyRate", hourlyValueQuestion, {
                        max: 10000,
                      })}
                    </>
                  )}
                </div>
                {revenue ? (
                  <details className={styles.more}>
                    <summary>So berechnen Sie den Prozentwert</summary>
                    <p>
                      Abschlüsse bzw. Verlängerungen ÷ Anfragen bzw. anstehende
                      Verlängerungen × 100. Beispiel: 5 von 20 = 25 %.
                    </p>
                  </details>
                ) : null}
              </>
            ) : step === 1 ? (
              <>
                <fieldset className={styles.kindChoices}>
                  <legend>
                    {revenue
                      ? kind === "retention"
                        ? "Von 100 Kunden: Wie viele sollen zusätzlich verlängern?"
                        : `Aus 100 ${kind === "phone" ? "Anrufen" : "Anfragen"}: Wie viele zusätzliche Aufträge wünschen Sie sich?`
                      : "Wie viel weniger Handarbeit wünschen Sie sich?"}
                  </legend>
                  <div className={styles.scenarioChoices}>
                    {scenarios.map((option) => (
                      <label
                        key={option.id}
                        className={`${styles.pictureChoice} ${scenario === option.id ? styles.selected : ""}`}
                      >
                        <input
                          type="radio"
                          name={`${choiceId}-scenario`}
                          value={option.id}
                          checked={scenario === option.id}
                          onChange={() => {
                            setScenario(option.id)
                            setValues({
                              ...values,
                              ...(option.targetRate !== undefined
                                ? { targetRate: String(option.targetRate) }
                                : {}),
                              ...(option.targetMinutes !== undefined
                                ? {
                                    targetMinutes: String(option.targetMinutes),
                                  }
                                : {}),
                              ...(option.targetVolume !== undefined
                                ? { targetVolume: String(option.targetVolume) }
                                : {}),
                            })
                          }}
                        />
                        <PotentialArt kind={kind} level={option.level} />
                        <span className={styles.choiceText}>
                          <span className={styles.radio}>
                            {scenario === option.id ? (
                              <Check size={13} />
                            ) : null}
                          </span>
                          <span>
                            <strong>{option.title}</strong>
                            <small>{option.caption}</small>
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className={styles.grid}>
                  {kind === "acquisition"
                    ? field(
                        "targetVolume",
                        "targetVolume" in questions
                          ? questions.targetVolume
                          : c.targetUnit,
                        {
                          max: 1000000,
                          step: "1",
                        },
                      )
                    : null}
                  {revenue
                    ? field(
                        "targetRate",
                        "targetRate" in questions
                          ? questions.targetRate
                          : c.targetRate,
                        { max: 100 },
                      )
                    : field(
                        "targetMinutes",
                        "targetTime" in questions
                          ? questions.targetTime
                          : c.targetTime,
                        { max: 10080 },
                      )}
                </div>
                <p className={styles.scenarioNote}>
                  Ihr Wunschziel ist eine Annahme, keine Erfolgszusage. Sie
                  können alle Werte selbst ändern.
                </p>
              </>
            ) : (
              <>
                <div className={styles.grid}>
                  <label className={styles.field}>
                    <span>Vollständiger Name</span>
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={120}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Firmenname</span>
                    <input
                      name="company"
                      autoComplete="organization"
                      required
                      minLength={2}
                      maxLength={160}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>E-Mail-Adresse</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={180}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Telefonnummer</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      minLength={7}
                      maxLength={80}
                    />
                  </label>
                </div>
                <div className={styles.honey} aria-hidden="true">
                  <label>
                    Website
                    <input
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>
                <label className={styles.consent}>
                  <input type="checkbox" name="consent" required />
                  <span>
                    Ich fordere mein PDF an. AgenticIT darf meine Angaben dafür
                    verarbeiten und mich zu dieser Anfrage per E-Mail
                    kontaktieren.{" "}
                    <Link
                      href="/datenschutz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Datenschutz
                    </Link>
                  </span>
                </label>
                <details className={styles.more}>
                  <summary>Was passiert mit meinen Angaben?</summary>
                  <p>
                    Ihre Kontaktdaten und Rechnerangaben werden mit Ihrer
                    PDF-Anfrage an AgenticIT übermittelt. Keine
                    Newsletter-Anmeldung. Einer weiteren Kontaktaufnahme können
                    Sie jederzeit widersprechen.
                  </p>
                </details>
              </>
            )}
            {error ? (
              <p className={styles.error} role="alert">
                {error}
              </p>
            ) : null}
            <div className={styles.actions}>
              {step > 0 ? (
                <button
                  type="button"
                  className={styles.back}
                  disabled={busy}
                  onClick={() => move(step - 1)}
                >
                  <ArrowLeft size={16} />
                  Zurück
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className={styles.primary} disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 size={17} className={styles.spin} /> Wird berechnet
                    …
                  </>
                ) : step === 2 ? (
                  <>
                    Mein Potenzial-PDF erstellen <Download size={17} />
                  </>
                ) : (
                  <>
                    {step === 0
                      ? "Mein Wunschziel wählen"
                      : "Mein PDF anfordern"}{" "}
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
