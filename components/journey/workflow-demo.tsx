"use client"

import { useId, useReducer } from "react"
import { ArrowRight, ArrowUpRight, Check, RotateCcw } from "lucide-react"
import { initialWorkflowDemo, workflowDemoReducer } from "@/lib/workflow-demo"
import shared from "./journey.module.css"
import styles from "./workflow-demo.module.css"

const panels = {
  received: {
    title: "Eine Anfrage kommt an.",
    copy: "Ein Beratungsteam sucht Unterstützung. Spielen Sie durch, wie das Anliegen für die Bearbeitung vorbereitet werden könnte.",
    action: "Anfrage einordnen",
    step: 0,
  },
  prepared: {
    title: "Das Anliegen ist vorbereitet.",
    copy: "KI ordnet den Text ein. Feste Regeln prüfen, wer die Anfrage übernehmen soll. Noch ist keine Antwort freigegeben.",
    action: "Übergabe prüfen",
    step: 1,
  },
  review: {
    title: "Ihr Team entscheidet.",
    copy: "Die zuständige Person prüft den Antwortentwurf und den Empfänger. Erst ihre Freigabe erlaubt den vereinbarten nächsten Schritt.",
    action: "Im Beispiel freigeben",
    step: 2,
  },
  approved: {
    title: "Im Beispiel freigegeben.",
    copy: "Die Vorbereitung ist erledigt, die Entscheidung bleibt beim Team. In Ihrer Lösung würde jetzt der vereinbarte nächste Schritt folgen.",
    action: "Noch einmal ansehen",
    step: 3,
  },
  blocked: {
    title: "Stopp: Wer übernimmt?",
    copy: "Eine zuständige Person fehlt. Der Ablauf hält an und gibt die Klärung ans Team. Eine ungeklärte Anfrage wird nicht einfach weitergeschickt.",
    action: "Beispiel neu starten",
    step: 1,
  },
} as const

const situations = [
  { value: "ready", label: "Zuständigkeit geklärt" },
  { value: "missing-owner", label: "Zuständigkeit fehlt" },
] as const
const steps = ["Anfrage", "Vorbereitung", "Teamprüfung", "Freigabe"]

export function WorkflowDemo() {
  const [state, dispatch] = useReducer(workflowDemoReducer, initialWorkflowDemo)
  const groupId = useId()
  const panel = panels[state.stage]
  const complete = state.stage === "approved"

  function next() {
    if (complete || state.stage === "blocked") dispatch({ type: "reset" })
    else if (state.stage === "review") dispatch({ type: "approve" })
    else dispatch({ type: "advance" })
  }

  return (
    <div
      className={styles.demo}
      role="group"
      aria-label="Interaktives Ablaufbeispiel"
    >
      <p className={styles.notice}>
        Simuliertes Beispiel. Es wird nichts gespeichert oder versendet.
      </p>
      <fieldset className={styles.choices}>
        <legend>Welche Situation möchten Sie ansehen?</legend>
        <div>
          {situations.map(({ value, label }) => (
            <label key={value}>
              <input
                type="radio"
                name={groupId}
                value={value}
                checked={state.scenario === value}
                onChange={() => dispatch({ type: "select", scenario: value })}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.workbench}>
        <ol className={styles.steps} aria-label="Schritte des Beispielablaufs">
          {steps.map((title, index) => {
            const done = index < panel.step || complete
            return (
              <li
                key={title}
                aria-current={index === panel.step ? "step" : undefined}
                data-done={done}
              >
                <span aria-hidden="true">
                  {done ? <Check size={16} /> : `0${index + 1}`}
                </span>
                {title}
              </li>
            )
          })}
        </ol>

        <div className={styles.panel}>
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={styles.status}
          >
            <span className={styles.kicker}>
              {state.stage === "blocked"
                ? "Klärung nötig"
                : `Schritt ${panel.step + 1} von 4`}
            </span>
            <h3>{panel.title}</h3>
            <p>{panel.copy}</p>
          </div>

          <div className={styles.sample}>
            {state.stage === "received" ? (
              <>
                <strong>Beispielanfrage</strong>
                <p>
                  «Wir übertragen Anfragen noch von Hand ins CRM. Können Sie uns
                  helfen, diesen Ablauf zu vereinfachen?»
                </p>
              </>
            ) : state.stage === "review" ? (
              <>
                <strong>Antwortentwurf zur Prüfung</strong>
                <p>
                  «Danke für Ihre Anfrage. Wir klären gerne mit Ihnen, welche
                  Angaben Ihr Team benötigt und wie die Übergabe heute
                  funktioniert.»
                </p>
              </>
            ) : complete ? (
              <>
                <strong>Vorbereitet statt von Hand übertragen</strong>
                <p>
                  Ihr Team kann sich auf die Beratung und den passenden nächsten
                  Schritt konzentrieren.
                </p>
              </>
            ) : (
              <dl>
                <div>
                  <dt>Anliegen</dt>
                  <dd>Anfragen ins CRM übernehmen</dd>
                </div>
                <div>
                  <dt>Zuständigkeit</dt>
                  <dd>
                    {state.scenario === "ready"
                      ? "Beratungsteam"
                      : "Noch ungeklärt"}
                  </dd>
                </div>
                <div>
                  <dt>Nächste Aufgabe</dt>
                  <dd>
                    {state.stage === "blocked"
                      ? "Zuständigkeit im Team klären"
                      : "Übergabe und Antwort prüfen"}
                  </dd>
                </div>
              </dl>
            )}
          </div>

          <div className={styles.actions}>
            <button type="button" className={shared.button} onClick={next}>
              {panel.action}{" "}
              {complete || state.stage === "blocked" ? (
                <RotateCcw size={16} aria-hidden="true" />
              ) : (
                <ArrowRight size={16} aria-hidden="true" />
              )}
            </button>
            {state.stage !== "received" &&
            !complete &&
            state.stage !== "blocked" ? (
              <button
                type="button"
                className={styles.reset}
                onClick={() => dispatch({ type: "reset" })}
              >
                Von vorn
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <a href="/anfragen-check">
          Ihren Anfrageweg prüfen <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
