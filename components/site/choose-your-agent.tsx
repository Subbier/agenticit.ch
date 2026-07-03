"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AGENT_DEMOS, type AgentDemo } from "@/lib/choose-your-agent-data"
import "./choose-your-agent.css"

type FeedItem = { id: number; stepIndex: number; status: "work" | "done" }

export function ChooseYourAgent() {
  const [current, setCurrent] = useState(0)
  const [liveTxt, setLiveTxt] = useState("Bereit")
  const [triggerLocked, setTriggerLocked] = useState(false)
  const [showTrigger, setShowTrigger] = useState(false)
  const [sayHtml, setSayHtml] = useState<string | null>(null)
  const [feed, setFeed] = useState<FeedItem[]>([])
  const [showSummary, setShowSummary] = useState(false)
  const [started, setStarted] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const feedRef = useRef<HTMLDivElement>(null)

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const T = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }, [])

  const runAgent = useCallback(
    (idx: number) => {
      clearTimers()
      const agent = AGENT_DEMOS[idx]
      setCurrent(idx)
      setStarted(true)
      setFeed([])
      setSayHtml(null)
      setShowSummary(false)
      setTriggerLocked(false)
      setShowTrigger(true)
      setLiveTxt("Aktiv")

      T(() => setSayHtml(agent.say), 550)

      let delay = 1100
      agent.steps.forEach((_, i) => {
        T(() => {
          setFeed((prev) => {
            const next = prev.map((item) => (item.status === "work" ? { ...item, status: "done" as const } : item))
            return [...next, { id: Date.now() + i, stepIndex: i, status: "work" }]
          })
          feedRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }, delay)
        delay += 1150
      })

      T(() => setTriggerLocked(true), 900)
      T(() => {
        setFeed((prev) => prev.map((item) => (item.status === "work" ? { ...item, status: "done" } : item)))
        setLiveTxt("Fertig")
        setShowSummary(true)
      }, delay + 200)
    },
    [T, clearTimers],
  )

  useEffect(() => {
    T(() => runAgent(0), 400)
    return clearTimers
  }, [T, runAgent, clearTimers])

  const agent = AGENT_DEMOS[current]

  return (
    <section id="waehle-deinen-agenten" className="cyoa-section scroll-mt-20 border-y border-[#E3E9F2] bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[560px]">
        <div className="cyoa-intro">
          <span className="cyoa-ey">Live-Element · Autonome KI-Agenten</span>
          <h2 className="cyoa-h2">
            <span className="cyoa-strike">KI redet.</span> <span className="cyoa-go">Dein Agent handelt.</span>
          </h2>
          <p className="cyoa-lead">
            Wähle eine Rolle. Ein Auslöser feuert – und der Agent erledigt die Aufgabe von Anfang bis Ende. Ohne dein Zutun.
          </p>
        </div>

        <div className="cyoa-card" style={{ ["--cc" as string]: agent.color }}>
          <div className="cyoa-top">
            <div className="cyoa-brand">
              <span className="cyoa-dot" />
              <div>
                AgenticIT
                <small>WÄHLE DEINEN AGENTEN</small>
              </div>
            </div>
            <div className="cyoa-live">
              <span className="cyoa-led" />
              <span>{liveTxt}</span>
            </div>
          </div>

          <div className="cyoa-roles">
            {AGENT_DEMOS.map((a, idx) => (
              <button
                key={a.id}
                type="button"
                className={`cyoa-chip${current === idx ? " active" : ""}`}
                style={{ ["--cc" as string]: a.color }}
                onClick={() => runAgent(idx)}
              >
                <span className="cyoa-ci">{a.icon}</span>
                {a.name}
              </button>
            ))}
          </div>

          <div className="cyoa-stage">
            <div className={`cyoa-trigger${showTrigger ? " show" : ""}${triggerLocked ? " locked" : ""}`}>
              <div className="cyoa-tIco">{agent.icon}</div>
              <div>
                <b>Auslöser</b>
                <p>{agent.trigger}</p>
              </div>
            </div>

            <div className="cyoa-feed" ref={feedRef}>
              {!started && (
                <div className="cyoa-empty">
                  <div className="cyoa-empty-big">👆</div>
                  <div>
                    Wähle oben eine Agenten-Rolle,
                    <br />
                    um den Live-Task zu starten.
                  </div>
                </div>
              )}
              {sayHtml ? <div className="cyoa-say" dangerouslySetInnerHTML={{ __html: sayHtml }} /> : null}
              {feed.map((item) => {
                const st = agent.steps[item.stepIndex]
                return (
                  <div key={item.id} className={`cyoa-item ${item.status}`}>
                    <div className="cyoa-rail">
                      <div className="cyoa-bub">{item.status === "done" ? "✓" : item.stepIndex + 1}</div>
                    </div>
                    <div className="cyoa-body">
                      <div className="cyoa-h">{st.h}</div>
                      <div className="cyoa-s">{st.s}</div>
                      <div className="cyoa-st">
                        {item.status === "done" ? (
                          "Erledigt"
                        ) : (
                          <>
                            Agent arbeitet{" "}
                            <span className="cyoa-dots">
                              <i />
                              <i />
                              <i />
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={`cyoa-summary${showSummary ? " show" : ""}`}>
              <div className="cyoa-summary-row">
                <span className="cyoa-chk">✓</span>
                <b>{agent.name}: Aufgabe abgeschlossen – ohne dein Zutun.</b>
              </div>
              <div className="cyoa-stats">
                {agent.stats.map(([v, k]) => (
                  <div key={k} className="cyoa-stat">
                    <div className="cyoa-stat-v">{v}</div>
                    <div className="cyoa-stat-k">{k}</div>
                  </div>
                ))}
              </div>
              <div className="cyoa-ctl">
                🔒 <span>Du behältst die Kontrolle: <b>jede Regel und Grenze bestimmst du.</b></span>
              </div>
            </div>
          </div>

          <div className="cyoa-bar">
            <button type="button" className="cyoa-btn primary" onClick={() => runAgent(current)}>
              ↻ Erneut abspielen
            </button>
            <span className="cyoa-grow" />
            <span className="cyoa-note">Arbeitet rund um die Uhr – ohne Pause, ohne Müdigkeitsfehler.</span>
          </div>
        </div>

        <p className="cyoa-disc">
          Jede KI-Interaktion startet mit <b>„Ich bin der KI-Assistent von AgenticIT.“</b> · KI-gestützter Entwurf, vor
          Veröffentlichung menschlich geprüft · DSG-konform · Daten in der Schweiz.
        </p>
      </div>
    </section>
  )
}
