"use client"

import { useRef, useState } from "react"
import { ArrowRight, Download } from "lucide-react"
import {
  automationIndustries,
  buildAutomationPlan,
  calculateAutomationPotential,
  getAutomationTasks,
  type AutomationInput,
  type AutomationTaskInput,
} from "@/lib/automation"
import { toggleRadarSelection } from "@/lib/radar-regions"
import { downloadText, JourneyContact } from "./check"
import styles from "./journey.module.css"

const fmt = (value: number) =>
  new Intl.NumberFormat("de-CH", { maximumFractionDigits: 1 }).format(value)

export function AutomationCheck() {
  const [industryIds, setIndustryIds] = useState<string[]>([])
  const [tasks, setTasks] = useState<AutomationTaskInput[]>([])
  const [hourlyRate, setHourlyRate] = useState("")
  const [showContact, setShowContact] = useState(false)
  const contact = useRef<HTMLDivElement>(null)
  const availableTasks = getAutomationTasks(industryIds)
  const input: AutomationInput = {
    version: 1,
    industryIds,
    tasks,
    hourlyRate: hourlyRate === "" ? undefined : Number(hourlyRate),
  }
  const result = calculateAutomationPotential(input)
  const plan = buildAutomationPlan(input)

  function toggleIndustry(id: string) {
    const next = toggleRadarSelection(industryIds, id)
    const allowed = new Set(
      getAutomationTasks(next).map((task) => task.id as string),
    )
    setIndustryIds(next)
    setTasks((current) => current.filter((task) => allowed.has(task.id)))
    setShowContact(false)
  }
  function toggleTask(id: string) {
    setTasks((current) =>
      current.some((task) => task.id === id)
        ? current.filter((task) => task.id !== id)
        : [
            ...current,
            { id, weeklyCount: 10, minutes: 15, automationPercent: 50 },
          ],
    )
    setShowContact(false)
  }
  function updateTask(
    id: string,
    field: "weeklyCount" | "minutes" | "automationPercent",
    value: string,
  ) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, [field]: value === "" ? NaN : Number(value) }
          : task,
      ),
    )
    setShowContact(false)
  }

  return (
    <section
      className={styles.automationArea}
      aria-label="Automatisierungs-Check"
    >
      <fieldset className={styles.automationIndustries}>
        <legend>
          <span className={styles.eyebrow}>01 · Ihr Arbeitsalltag</span>
          <h2>In welchen Branchen sind Sie tätig?</h2>
        </legend>
        <p>
          Mehrere Branchen sind möglich. Gemeinsame Aufgaben erscheinen nur
          einmal.
        </p>
        <div className={styles.industryOptions}>
          {automationIndustries.map((industry) => (
            <button
              key={industry.id}
              type="button"
              aria-pressed={industryIds.includes(industry.id)}
              onClick={() => toggleIndustry(industry.id)}
            >
              {industryIds.includes(industry.id) && (
                <span aria-hidden="true">✓ </span>
              )}
              {industry.label}
            </button>
          ))}
        </div>
      </fieldset>
      {industryIds.length > 0 ? (
        <div className={styles.automationLayout}>
          <div>
            <span className={styles.eyebrow}>02 · Ihre manuellen Aufgaben</span>
            <h2>Was machen Sie heute noch von Hand?</h2>
            <p className={styles.automationHint}>
              Markieren Sie passende Aufgaben. Ersetzen Sie die Beispielwerte
              durch Ihre Angaben. Der Zielanteil beschreibt, wie viel der
              heutigen Bearbeitungszeit entfallen soll – einschliesslich
              verbleibender Kontrolle.
            </p>
            <div className={styles.automationTasks}>
              {availableTasks.map((task) => {
                const selected = tasks.find((item) => item.id === task.id)
                return (
                  <div className={styles.automationTask} key={task.id}>
                    <label className={styles.automationTaskLabel}>
                      <input
                        type="checkbox"
                        checked={Boolean(selected)}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span>
                        <strong>{task.label}</strong>
                        <small>{task.detail}</small>
                      </span>
                    </label>
                    {selected ? (
                      <div className={styles.automationTaskInputs}>
                        <label className={styles.field}>
                          Vorgänge / Woche
                          <input
                            aria-label={`Vorgänge pro Woche: ${task.label}`}
                            type="number"
                            min="1"
                            max="100000"
                            step="1"
                            value={
                              Number.isNaN(selected.weeklyCount)
                                ? ""
                                : selected.weeklyCount
                            }
                            onChange={(event) =>
                              updateTask(
                                task.id,
                                "weeklyCount",
                                event.target.value,
                              )
                            }
                          />
                        </label>
                        <label className={styles.field}>
                          Minuten / Vorgang
                          <input
                            aria-label={`Minuten je Vorgang: ${task.label}`}
                            type="number"
                            min="0.1"
                            max="10080"
                            step="0.1"
                            value={
                              Number.isNaN(selected.minutes)
                                ? ""
                                : selected.minutes
                            }
                            onChange={(event) =>
                              updateTask(task.id, "minutes", event.target.value)
                            }
                          />
                        </label>
                        <label className={styles.field}>
                          Zielanteil in %
                          <input
                            aria-label={`Automatisierungsanteil: ${task.label}`}
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            value={
                              Number.isNaN(selected.automationPercent)
                                ? ""
                                : selected.automationPercent
                            }
                            onChange={(event) =>
                              updateTask(
                                task.id,
                                "automationPercent",
                                event.target.value,
                              )
                            }
                          />
                        </label>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
          <aside
            className={styles.automationResults}
            aria-label="Ihr Automatisierungspotenzial"
          >
            <span className={styles.eyebrow}>03 · Ihr Potenzial</span>
            <h2>Ihre Zahlen. Ihr Zeitgewinn.</h2>
            <p className={styles.fine}>
              Planung für Ihre ausgewählten Aufgaben. Keine Aussage über den
              gesamten Betrieb.
            </p>
            {result ? (
              <div aria-live="polite" aria-atomic="true">
                <div className={styles.automationMetric}>
                  <strong>{fmt(result.automationPercent)} %</strong>
                  <span>geplanter Automatisierungsgrad</span>
                </div>
                <div
                  className={styles.automationBar}
                  role="meter"
                  aria-label="Geplanter Automatisierungsgrad des erfassten Zeitaufwands"
                  aria-valuenow={result.automationPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <span style={{ width: `${result.automationPercent}%` }} />
                </div>
                <div className={styles.automationMetric}>
                  <strong>{fmt(result.freedHours)} Std.</strong>
                  <span>rechnerisch frei pro Woche</span>
                </div>
                <p className={styles.fine}>
                  {fmt(result.monthlyHours)} Std. pro Monat · Heute{" "}
                  {fmt(result.currentHours)} Std./Woche, geplant verbleibend{" "}
                  {fmt(result.remainingHours)} Std.
                </p>
              </div>
            ) : (
              <p className={styles.automationEmpty} role="status">
                {tasks.length
                  ? "Bitte vervollständigen Sie die Werte. Häufigkeit und Zeit müssen positiv sein, der Zielanteil zwischen 0 und 100 %."
                  : "Wählen Sie Ihre ersten manuellen Aufgaben. Dann sehen Sie hier Ihr Potenzial."}
              </p>
            )}
            <label className={styles.field}>
              Interner Stundensatz in CHF{" "}
              <span className={styles.fine}>(optional)</span>
              <input
                type="number"
                min="0"
                max="10000"
                step="1"
                placeholder="z. B. 100"
                value={hourlyRate}
                onChange={(event) => {
                  setHourlyRate(event.target.value)
                  setShowContact(false)
                }}
              />
            </label>
            {result?.monthlyTimeValue !== null &&
            result?.monthlyTimeValue !== undefined ? (
              <div className={styles.automationMetric}>
                <strong>CHF {fmt(result.monthlyTimeValue)}</strong>
                <span>rechnerischer Zeitwert pro Monat</span>
              </div>
            ) : null}
            <p className={styles.automationAssumptions}>
              Beispielwerte und Zielanteile sind Annahmen, keine
              Branchenbenchmarks. Freie Zeit senkt nicht automatisch Ihre
              Ausgaben. Umsetzung, Software und Betrieb sind noch nicht
              abgezogen. Monatswert = Wochenwert × 52 / 12.
            </p>
            {result && plan ? (
              <div className={styles.automationActions}>
                <button
                  className={styles.secondary}
                  type="button"
                  onClick={() =>
                    downloadText(plan, "AgenticIT-Automatisierungs-Check.txt")
                  }
                >
                  <Download size={16} aria-hidden="true" />
                  Berechnung speichern
                </button>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => {
                    setShowContact(true)
                    requestAnimationFrame(() => contact.current?.focus())
                  }}
                  aria-expanded={showContact}
                  aria-controls="automation-follow-up"
                >
                  Machbarkeit mit uns prüfen
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <p className={styles.fine}>
                  Ergebnis und Download ohne E-Mail. Eine Anfrage stellen Sie
                  erst im nächsten Schritt.
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      ) : (
        <p className={styles.automationEmpty}>
          Wählen Sie eine Branche, um typische Aufgaben zu entdecken.
        </p>
      )}
      <div
        id="automation-follow-up"
        ref={contact}
        tabIndex={-1}
        style={{ scrollMarginTop: 24 }}
      >
        {showContact && result ? <JourneyContact automation={input} /> : null}
      </div>
    </section>
  )
}
