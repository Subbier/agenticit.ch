"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowLeft, ArrowRight, Check, Download } from "lucide-react"
import {
  buildMarketingSetupPlan,
  buildMarketingSetupResult,
  marketingSetupQuestions,
  marketingStatusLabels,
  type MarketingSetupAnswers,
  type MarketingSetupStatus,
} from "@/lib/marketing-setup"
import { downloadText, JourneyContact } from "./check"
import styles from "./journey.module.css"
import ui from "./marketing-setup-check.module.css"

export function MarketingSetupCheck() {
  const [answers, setAnswers] = useState<Partial<MarketingSetupAnswers>>({})
  const [step, setStep] = useState(0)
  const [screen, setScreen] = useState<"questions" | "result" | "edit">(
    "questions",
  )
  const [showContact, setShowContact] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const moveFocus = useRef(false)
  const contact = useRef<HTMLDivElement>(null)
  const question = marketingSetupQuestions[step]
  const result = buildMarketingSetupResult({ version: 1, answers })
  const plan = buildMarketingSetupPlan({ version: 1, answers })

  useEffect(() => {
    if (moveFocus.current) heading.current?.focus()
  }, [step, screen])
  useEffect(() => {
    if (showContact) contact.current?.focus()
  }, [showContact])

  function next(event: FormEvent) {
    event.preventDefault()
    if (!answers[question.id]) return
    moveFocus.current = true
    if (step === marketingSetupQuestions.length - 1 && result)
      setScreen("result")
    else
      setStep((value) =>
        Math.min(value + 1, marketingSetupQuestions.length - 1),
      )
  }

  const options: { value: MarketingSetupStatus; label: string }[] = [
    { value: "ready", label: question.ready },
    { value: "partial", label: "Teilweise – wir sind noch dran" },
    { value: "open", label: "Das ist noch offen" },
    { value: "unknown", label: "Kann ich noch nicht beurteilen" },
    ...(question.id === "accounts"
      ? [
          {
            value: "not-planned" as const,
            label: "Vorerst ohne bezahlte Werbung",
          },
        ]
      : []),
  ]

  return (
    <section className={ui.area} aria-label="Marketing-Setup-Check">
      {screen === "result" && result && plan ? (
        <div className={`${styles.checkPanel} ${ui.panel}`}>
          <span className={styles.eyebrow}>Ihr Plan · nach Ihren Angaben</span>
          <h2 ref={heading} tabIndex={-1} className={ui.title}>
            {result.title}
          </h2>
          <p>{result.summary}</p>
          <ol className={ui.priorities}>
            {result.priorities.map((item, index) => (
              <li key={item.id}>
                <span className={ui.number} aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.action}</p>
                  <details className={ui.done}>
                    <summary>Wann ist dieser Schritt erledigt?</summary>
                    <p>{item.done}</p>
                    <p>
                      <strong>Zuständig:</strong> {item.owner}
                    </p>
                  </details>
                </div>
              </li>
            ))}
          </ol>
          {result.outstanding.length > 3 ? (
            <p className={styles.fine}>
              Zuerst diese drei Schritte. Die weiteren Punkte stehen in Ihrem
              Plan zum Speichern.
            </p>
          ) : null}
          <details className={ui.review}>
            <summary>Ihre fünf Angaben im Überblick</summary>
            <ul>
              {result.statuses.map((item) => (
                <li key={item.id}>
                  <span>{item.label}</span>
                  <strong>{marketingStatusLabels[item.status]}</strong>
                </li>
              ))}
            </ul>
          </details>
          <p className={styles.fine}>
            Diese Selbsteinschätzung ersetzt keinen technischen Audit. Sie ist
            keine Freigabe zum Kampagnenstart und keine Erfolgsprognose.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                downloadText(plan, "AgenticIT-Marketing-Setup-Plan.txt")
              }
            >
              Meinen Plan speichern <Download size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.textLink}
              onClick={() => {
                moveFocus.current = true
                setShowContact(false)
                setStep(0)
                setScreen("edit")
              }}
            >
              Antworten ändern
            </button>
          </div>
          <div className={ui.consultation}>
            <div>
              <h3>Die nächsten Schritte gemeinsam angehen?</h3>
              <p>
                Wir prüfen Ihren Stand mit Ihnen und vereinbaren, was sich
                konkret lohnt.
              </p>
            </div>
            {!showContact ? (
              <button
                type="button"
                className={styles.secondary}
                onClick={() => setShowContact(true)}
              >
                Persönliche Rückmeldung anfragen{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ) : null}
          </div>
          {showContact ? (
            <div
              ref={contact}
              tabIndex={-1}
              aria-label="Optionale Beratungsanfrage"
            >
              <JourneyContact marketingSetup={result.input} />
            </div>
          ) : null}
        </div>
      ) : (
        <form className={`${styles.checkPanel} ${ui.panel}`} onSubmit={next}>
          <div className={ui.progress}>
            <span>
              Frage {step + 1} von {marketingSetupQuestions.length}
            </span>
            <progress
              aria-label="Fortschritt des Marketing-Setup-Checks"
              value={step + 1}
              max={marketingSetupQuestions.length}
            />
          </div>
          <span className={styles.eyebrow}>{question.label}</span>
          <h2 ref={heading} tabIndex={-1} className={ui.title}>
            {question.question}
          </h2>
          <p id="marketing-question-hint">{question.hint}</p>
          <fieldset
            className={ui.options}
            aria-describedby="marketing-question-hint"
            key={question.id}
          >
            <legend className="sr-only">{question.question}</legend>
            {options.map((option) => (
              <label
                key={option.value}
                className={ui.option}
                data-selected={answers[question.id] === option.value}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  required
                  onChange={() =>
                    setAnswers((value) => ({
                      ...value,
                      [question.id]: option.value,
                    }))
                  }
                />
                <span>{option.label}</span>
                {answers[question.id] === option.value ? (
                  <Check size={18} aria-hidden="true" />
                ) : null}
              </label>
            ))}
          </fieldset>
          <div className={`${styles.actions} ${ui.navigation}`}>
            {step > 0 ? (
              <button
                className={styles.textLink}
                type="button"
                onClick={() => {
                  moveFocus.current = true
                  setStep((value) => value - 1)
                }}
              >
                <ArrowLeft size={15} aria-hidden="true" /> Zurück
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className={styles.button}
              disabled={!answers[question.id]}
            >
              {step === marketingSetupQuestions.length - 1
                ? "Meinen Plan anzeigen"
                : "Weiter"}{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          {screen === "edit" && result ? (
            <button
              type="button"
              className={styles.textLink}
              onClick={() => {
                moveFocus.current = true
                setScreen("result")
              }}
            >
              Plan mit diesen Antworten aktualisieren
            </button>
          ) : null}
          <p className={styles.fine}>
            Kein Zugang zu Ihren Konten nötig. Ihre Antworten werden erst mit
            einer optionalen Kontaktanfrage übermittelt.
          </p>
        </form>
      )}
    </section>
  )
}
