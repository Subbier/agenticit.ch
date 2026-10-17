"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowLeft, ArrowRight, Check, Download } from "lucide-react"
import { downloadText } from "./check"
import { createCheckMeasurement, type CheckKind } from "@/lib/check-measurement"
import styles from "./journey.module.css"
import ui from "./marketing-setup-check.module.css"

type ChoiceStatus = "ready" | "partial" | "open" | "unknown" | "not-planned"
type ChoiceQuestion = {
  id: string
  label: string
  question: string
  hint: string
  ready: string
  extraOptions?: readonly { value: ChoiceStatus; label: string }[]
}
type ChoiceResult<Input> = {
  input: Input
  title: string
  summary: string
  statuses: readonly { id: string; label: string; status: ChoiceStatus }[]
  outstanding: readonly {
    id: string
    title: string
    action: string
    done: string
    owner: string
  }[]
  priorities: readonly {
    id: string
    title: string
    action: string
    done: string
    owner: string
  }[]
}

export function ChoiceCheck<Input>({
  label,
  kind,
  questions,
  statusLabels,
  buildResult,
  buildPlan,
  filename,
  resultNote,
  introNote,
  renderContact,
  planPreviewLabel,
}: {
  label: string
  kind: CheckKind
  questions: readonly ChoiceQuestion[]
  statusLabels: Partial<Record<ChoiceStatus, string>>
  buildResult: (input: unknown) => ChoiceResult<Input> | null
  buildPlan: (input: unknown) => string | null
  filename: string
  resultNote: string
  introNote: string
  renderContact: (input: Input) => ReactNode
  planPreviewLabel?: string
}) {
  const [answers, setAnswers] = useState<Partial<Record<string, ChoiceStatus>>>(
    {},
  )
  const [step, setStep] = useState(0)
  const [screen, setScreen] = useState<"questions" | "result" | "edit">(
    "questions",
  )
  const [showContact, setShowContact] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const moveFocus = useRef(false)
  const contact = useRef<HTMLDivElement>(null)
  const measurement = useRef(createCheckMeasurement(kind))
  const question = questions[step]
  const result = buildResult({ version: 1, answers })
  const plan = buildPlan({ version: 1, answers })

  useEffect(() => {
    if (moveFocus.current) heading.current?.focus()
  }, [step, screen])
  useEffect(() => {
    if (showContact) contact.current?.focus()
  }, [showContact])

  function next() {
    if (!answers[question.id]) return
    moveFocus.current = true
    if (step === questions.length - 1 && result) {
      measurement.current.record("check_result_ready")
      setScreen("result")
    } else setStep((value) => Math.min(value + 1, questions.length - 1))
  }

  const options: { value: ChoiceStatus; label: string }[] = [
    { value: "ready", label: question.ready },
    { value: "partial", label: "Teilweise – wir sind noch dran" },
    { value: "open", label: "Das ist noch offen" },
    { value: "unknown", label: "Kann ich noch nicht beurteilen" },
    ...(question.extraOptions ?? []),
  ]

  return (
    <section className={ui.area} aria-label={label}>
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
                  <strong>{statusLabels[item.status]}</strong>
                </li>
              ))}
            </ul>
          </details>
          <p className={styles.fine}>{resultNote}</p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                downloadText(plan, filename)
                measurement.current.record("plan_download_clicked")
              }}
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
          {planPreviewLabel ? (
            <details className={ui.planPreview}>
              <summary>{planPreviewLabel}</summary>
              <pre>{plan}</pre>
            </details>
          ) : null}
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
              {renderContact(result.input)}
            </div>
          ) : null}
        </div>
      ) : (
        <div className={`${styles.checkPanel} ${ui.panel}`}>
          <div className={ui.progress}>
            <span>
              Frage {step + 1} von {questions.length}
            </span>
            <progress
              aria-label={`Fortschritt: ${label}`}
              value={step + 1}
              max={questions.length}
            />
          </div>
          <span className={styles.eyebrow}>{question.label}</span>
          <h2 ref={heading} tabIndex={-1} className={ui.title}>
            {question.question}
          </h2>
          <p id={`${kind}-question-hint`}>{question.hint}</p>
          <fieldset
            className={ui.options}
            aria-describedby={`${kind}-question-hint`}
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
                  onChange={() => {
                    measurement.current.record("check_started")
                    setAnswers((value) => ({
                      ...value,
                      [question.id]: option.value,
                    }))
                  }}
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
              type="button"
              onClick={next}
              className={styles.button}
              disabled={!answers[question.id]}
            >
              {step === questions.length - 1
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
                measurement.current.record("check_result_ready")
                setScreen("result")
              }}
            >
              Plan mit diesen Antworten aktualisieren
            </button>
          ) : null}
          <p className={styles.fine}>{introNote}</p>
        </div>
      )}
    </section>
  )
}
