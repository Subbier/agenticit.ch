"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Download } from "lucide-react"
import {
  automationIndustries,
  buildAutomationPlan,
  calculateAutomationPotential,
  calculateAutomationScenarios,
  getAutomationTasks,
  formatAutomationDuration,
  type AutomationInput,
  type AutomationTaskInputV2,
} from "@/lib/automation"
import { toggleRadarSelection } from "@/lib/radar-regions"
import { downloadText, JourneyContact } from "./check"
import { createCheckMeasurement } from "@/lib/check-measurement"
import styles from "./journey.module.css"

const fmt = (value: number) =>
  new Intl.NumberFormat("de-CH", { maximumFractionDigits: 1 }).format(value)

export function AutomationCheck() {
  const [industryIds, setIndustryIds] = useState<string[]>([])
  const [tasks, setTasks] = useState<AutomationTaskInputV2[]>([])
  const [hourlyRate, setHourlyRate] = useState("")
  const [showContact, setShowContact] = useState(false)
  const contact = useRef<HTMLDivElement>(null)
  const measurement = useRef(createCheckMeasurement("automation"))
  const availableTasks = getAutomationTasks(industryIds)
  const input: AutomationInput = {
    version: 2,
    industryIds,
    tasks,
    hourlyRate: hourlyRate === "" ? undefined : Number(hourlyRate),
  }
  const result = calculateAutomationPotential(input)
  const plan = buildAutomationPlan(input)
  const scenarios = calculateAutomationScenarios(input)
  const firstTask =
    result &&
    [...result.rows].sort((a, b) => b.freedMinutes - a.freedMinutes)[0]
  const hasResult = result !== null

  useEffect(() => {
    if (hasResult) measurement.current.record("check_result_ready")
  }, [hasResult])

  function toggleIndustry(id: string) {
    measurement.current.record("check_started")
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
            {
              id,
              weeklyCount: 10,
              minutes: 15,
              automationPercent: 50,
              controlMinutes: 2,
            },
          ],
    )
    setShowContact(false)
  }
  function updateTask(
    id: string,
    field: "weeklyCount" | "minutes" | "automationPercent" | "controlMinutes",
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
              durch Ihre Angaben. Der Zielanteil ist die Bearbeitungszeit, die
              Automatisierung übernehmen soll. Zusätzliche Kontrolle ziehen wir
              separat ab. Die übrige Handarbeit bleibt berücksichtigt.
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
                            inputMode="numeric"
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
                            inputMode="decimal"
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
                          Automatisierung in %
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
                        <label className={styles.field}>
                          Kontrolle: Min. / Vorgang
                          <input
                            aria-label={`Zusätzliche Kontrolle in Minuten je Vorgang: ${task.label}`}
                            type="number"
                            inputMode="decimal"
                            min="0"
                            max="10080"
                            step="0.1"
                            value={
                              Number.isNaN(selected.controlMinutes)
                                ? ""
                                : selected.controlMinutes
                            }
                            onChange={(event) =>
                              updateTask(
                                task.id,
                                "controlMinutes",
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
            <h2>Was bleibt wirklich frei?</h2>
            <p className={styles.fine}>
              Planung für Ihre ausgewählten Aufgaben. Keine Aussage über den
              gesamten Betrieb.
            </p>
            {result ? (
              <div aria-live="polite" aria-atomic="true">
                <div className={styles.automationMetric}>
                  <strong>{fmt(result.automationPercent)} %</strong>
                  <span>geplanter Automatisierungsanteil</span>
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
                  <strong>
                    {formatAutomationDuration(Math.abs(result.freedHours))}
                  </strong>
                  <span>
                    {result.freedHours < 0
                      ? "zusätzlicher Aufwand pro Woche"
                      : "Zeitgewinn nach Kontrolle pro Woche"}
                  </span>
                </div>
                <p className={styles.fine}>
                  Heute {formatAutomationDuration(result.currentHours)}/Woche ·
                  davon rechnerisch automatisiert:{" "}
                  {formatAutomationDuration(result.automatedHours)} ·
                  zusätzliche Kontrolle:{" "}
                  {formatAutomationDuration(result.controlHours)} ·
                  verbleibender Gesamtaufwand:{" "}
                  {formatAutomationDuration(result.remainingHours)}
                </p>
                {result.freedHours < 0 ? (
                  <p className={styles.automationWarning}>
                    Die Kontrolle kostet unter diesen Annahmen mehr Zeit, als
                    die Automatisierung freigibt. Prüfen Sie einen einfacheren
                    Ablauf.
                  </p>
                ) : (
                  <p className={styles.fine}>
                    {formatAutomationDuration(result.monthlyHours)}{" "}
                    rechnerischer Zeitgewinn pro Monat.
                  </p>
                )}
              </div>
            ) : (
              <p className={styles.automationEmpty} role="status">
                {tasks.length
                  ? "Bitte vervollständigen Sie die Werte. Häufigkeit und Zeit müssen positiv sein, der Anteil zwischen 0 und 100 %. Kontrolle darf 0 sein."
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
                <strong>CHF {fmt(Math.abs(result.monthlyTimeValue))}</strong>
                <span>
                  {result.monthlyTimeValue < 0
                    ? "Zeitwert des Mehraufwands pro Monat"
                    : "rechnerischer Zeitwert pro Monat"}
                </span>
              </div>
            ) : null}
            {scenarios ? (
              <details className={styles.automationScenario}>
                <summary>Vorsichtiger rechnen</summary>
                <p>
                  Was, wenn nur 75 % Ihres Zielanteils möglich sind? Die
                  Kontrollzeit bleibt gleich. Ein Vergleich von Annahmen, keine
                  Prognose.
                </p>
                <dl>
                  <div>
                    <dt>Vorsichtiger</dt>
                    <dd>
                      {formatAutomationDuration(scenarios.cautious.freedHours)}
                    </dd>
                  </div>
                  <div>
                    <dt>Ihre Planung</dt>
                    <dd>
                      {formatAutomationDuration(scenarios.planned.freedHours)}
                    </dd>
                  </div>
                </dl>
                <p>
                  Zeitgewinn nach Kontrolle pro Woche. Ein Minus bedeutet
                  Mehraufwand.
                </p>
              </details>
            ) : null}
            <p className={styles.automationAssumptions}>
              Keine garantierte Zeit- oder Kostenersparnis. Einrichtung,
              Software und Betrieb sind noch nicht abgezogen.
            </p>
            <details className={styles.automationScenario}>
              <summary>Rechenweg und Annahmen</summary>
              <p>
                Je Aufgabe: Vorgänge × Minuten × Automatisierungsanteil minus
                Vorgänge × zusätzliche Kontrollminuten. Die übrige Handarbeit
                bleibt bestehen.
              </p>
              <p>
                Kontrolle wird je Vorgang berücksichtigt, sobald der Anteil
                grösser als 0 % ist. Bei 0 % startet keine Automatisierung und
                kein neuer Kontrollschritt.
              </p>
              <p>
                Monatswert = Wochenwert × 52 / 12. Der Zeitwert entspricht Ihren
                Stunden × internem Stundensatz. Freie Zeit ist keine automatisch
                eingesparte Ausgabe. Ergebniswerte werden gerundet.
              </p>
              <p>
                Beispielwerte und Zielanteile sind Annahmen, keine
                Branchenbenchmarks oder geprüfte technische Machbarkeit.
              </p>
            </details>
            {result && firstTask ? (
              <div className={styles.automationStartingPoint}>
                <span className={styles.eyebrow}>Ihr möglicher Startpunkt</span>
                {firstTask.freedMinutes > 0 ? (
                  <>
                    <h3>{firstTask.label}</h3>
                    <p>
                      Hier liegt Ihr grösster rechnerischer Zeitgewinn. Der
                      gespeicherte Plan zeigt Ihnen, was Sie vor einer Umsetzung
                      prüfen sollten.
                    </p>
                  </>
                ) : (
                  <p>
                    Unter diesen Annahmen entsteht noch kein Zeitgewinn. Prüfen
                    Sie einen einfacheren Teilprozess oder die eingegebene
                    Kontrollzeit.
                  </p>
                )}
              </div>
            ) : null}
            {result && plan ? (
              <div className={styles.automationActions}>
                <button
                  className={styles.secondary}
                  type="button"
                  onClick={() => {
                    downloadText(plan, "AgenticIT-Automatisierungs-Check.txt")
                    measurement.current.record("plan_download_clicked")
                  }}
                >
                  <Download size={16} aria-hidden="true" />
                  Ihren Plan speichern
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
