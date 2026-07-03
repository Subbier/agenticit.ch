"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  distributeLanes,
  OVERHEAD,
  SCALE,
  SEG_COLORS,
  SEGMENTS,
  SEQ_TOTAL,
} from "@/lib/multi-agent-time-win-data"
import "./multi-agent-time-win.css"

const TEAM_OPTIONS = [2, 3, 6] as const

export function MultiAgentTimeWin() {
  const [teamN, setTeamN] = useState(6)
  const [btnLabel, setBtnLabel] = useState("▶ Rennen starten")
  const [clkSeq, setClkSeq] = useState(0)
  const [clkPar, setClkPar] = useState(0)
  const [playheadPct, setPlayheadPct] = useState(0)
  const [showPlayhead, setShowPlayhead] = useState(false)
  const [seqLit, setSeqLit] = useState<boolean[]>(() => SEGMENTS.map(() => false))
  const [agentsOn, setAgentsOn] = useState<boolean[]>([])
  const [laneProgress, setLaneProgress] = useState<number[]>([])
  const [lanesFin, setLanesFin] = useState<boolean[]>([])
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState({ gain: 0, xfast: "", stSeq: "", stPar: "", stAg: 0 })

  const lanes = useMemo(() => distributeLanes(teamN), [teamN])
  const parTotal = useMemo(() => Math.max(...lanes.map((l) => l.time), 0) + OVERHEAD, [lanes])

  const rafRef = useRef<number | null>(null)
  const t0Ref = useRef(0)
  const agentTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearAgentTimers = useCallback(() => {
    agentTimers.current.forEach(clearTimeout)
    agentTimers.current = []
  }, [])

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    clearAgentTimers()
    setBtnLabel("▶ Rennen starten")
    setClkSeq(0)
    setClkPar(0)
    setPlayheadPct(0)
    setShowPlayhead(false)
    setSeqLit(SEGMENTS.map(() => false))
    setAgentsOn(lanes.map(() => false))
    setLaneProgress(lanes.map(() => 0))
    setLanesFin(lanes.map(() => false))
    setShowResult(false)
  }, [lanes, clearAgentTimers])

  const finish = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    setBtnLabel("↻ Erneut abspielen")
    setClkSeq(SEQ_TOTAL)
    setClkPar(parTotal)
    const gain = Math.round(((SEQ_TOTAL - parTotal) / SEQ_TOTAL) * 100)
    const x = SEQ_TOTAL / parTotal
    setResult({
      gain,
      xfast: `${x.toFixed(1).replace(".0", "")}× schneller`,
      stSeq: `${SEQ_TOTAL}s`,
      stPar: `${parTotal}s`,
      stAg: lanes.length,
    })
    setShowResult(true)
  }, [lanes.length, parTotal])

  const tick = useCallback(
    (now: number) => {
      const sim = (now - t0Ref.current) / SCALE
      const sq = Math.min(sim, SEQ_TOTAL)
      setPlayheadPct((sq / SEQ_TOTAL) * 100)
      setClkSeq(Math.round(sq))

      let cum = 0
      setSeqLit(
        SEGMENTS.map((s) => {
          const lit = sq >= cum + 0.01
          cum += s.d
          return lit
        }),
      )

      const sp = Math.min(sim, parTotal)
      setClkPar(Math.round(sp))
      setLaneProgress(lanes.map((l) => Math.min(sim, l.time) / l.time))
      setLanesFin(lanes.map((l) => sim >= l.time))

      if (sim >= SEQ_TOTAL) {
        finish()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    },
    [lanes, parTotal, finish],
  )

  const run = useCallback(() => {
    reset()
    setBtnLabel("● Läuft …")
    setShowPlayhead(true)
    lanes.forEach((_, i) => {
      const id = setTimeout(() => {
        setAgentsOn((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 120 * i)
      agentTimers.current.push(id)
    })
    t0Ref.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
  }, [reset, lanes, tick])

  const handleTeamChange = useCallback(
    (n: number) => {
      setTeamN(n)
    },
    [],
  )

  useEffect(() => {
    reset()
  }, [teamN, reset])

  useEffect(() => {
    const id = setTimeout(run, 500)
    return () => {
      clearTimeout(id)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearAgentTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- auto-start once on mount
  }, [])

  return (
    <section
      id="multi-agenten-zeitgewinn"
      className="matw-section scroll-mt-20 border-y border-[#E3E9F2] bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-5 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-[580px]">
        <div className="matw-intro">
          <span className="matw-ey">Live-Element · Multi-Agenten-Systeme</span>
          <h2 className="matw-h2">
            Ein Helfer wartet. <span className="matw-go">Ein Team liefert.</span>
          </h2>
          <p className="matw-lead">
            Der Hauptagent zerlegt die Aufgabe, mehrere Spezialisten arbeiten parallel. Sieh live, wie viel Zeit das
            spart gegenüber „nacheinander“.
          </p>
        </div>

        <div className="matw-card">
          <div className="matw-top">
            <div className="matw-brand">
              <span className="matw-dot" />
              <div>
                AgenticIT
                <small>ZEITGEWINN-VISUALISIERUNG</small>
              </div>
            </div>
            <div className="matw-task">
              Aufgabe
              <br />
              <b>Angebot für Neukunde erstellen</b>
            </div>
          </div>

          <div className="matw-body">
            <div className="matw-orch">
              <div className="matw-hub">
                <span className="matw-hi">🧠</span>
                <div>
                  <b>Hauptagent</b>
                  <span>zerlegt &amp; koordiniert</span>
                </div>
              </div>
              <div className="matw-fan">
                {lanes.map((_, i) => (
                  <div
                    key={i}
                    className={`matw-ag${agentsOn[i] ? " on" : ""}`}
                    style={{ ["--ac" as string]: SEG_COLORS[i % SEG_COLORS.length] }}
                  >
                    🤖
                  </div>
                ))}
              </div>
            </div>

            <div className="matw-seglabel">
              <span className="matw-l">
                Ein Helfer <span className="matw-tag slow">nacheinander</span>
              </span>
              <span className="matw-clk">
                ⏱ <b>{clkSeq}</b>s
              </span>
            </div>
            <div className="matw-seq">
              {showPlayhead ? (
                <div className="matw-ph" style={{ left: `${playheadPct}%` }} />
              ) : null}
              {SEGMENTS.map((s, i) => (
                <div
                  key={s.n}
                  className={`matw-sg${seqLit[i] ? " lit" : ""}`}
                  style={{
                    width: `${(s.d / SEQ_TOTAL) * 100}%`,
                    background: `color-mix(in srgb, ${s.c} 80%, #0a1226)`,
                  }}
                >
                  {s.n}
                </div>
              ))}
            </div>

            <div className="matw-seglabel">
              <span className="matw-l">
                Agenten-Team <span className="matw-tag fast">parallel</span>
              </span>
              <span className="matw-clk">
                ⏱ <b>{clkPar}</b>s
              </span>
            </div>
            <div className="matw-lanes">
              {lanes.map((lane, i) => (
                <div key={i} className={`matw-lane${lanesFin[i] ? " fin" : ""}`}>
                  <div
                    className="matw-fill"
                    style={{
                      ["--lc" as string]: SEG_COLORS[i % SEG_COLORS.length],
                      width: `${(laneProgress[i] ?? 0) * 100}%`,
                    }}
                  />
                  <div className="matw-lab">{lane.segs.map((s) => s.n).join(" · ")}</div>
                  <div className="matw-done">✓</div>
                </div>
              ))}
            </div>

            <div className={`matw-res${showResult ? " show" : ""}`}>
              <div className="matw-big">
                <span className="matw-pct">{result.gain}%</span>
                <span className="matw-x">{result.xfast}</span>
                <span className="matw-cap">weniger Zeit als „nacheinander“</span>
              </div>
              <div className="matw-sub">
                <div className="matw-stat s1">
                  <div className="matw-v">{showResult ? result.stSeq : "–"}</div>
                  <div className="matw-k">nacheinander</div>
                </div>
                <div className="matw-stat s2">
                  <div className="matw-v">{showResult ? result.stPar : "–"}</div>
                  <div className="matw-k">mit Agenten-Team</div>
                </div>
                <div className="matw-stat">
                  <div className="matw-v">{showResult ? result.stAg : "–"}</div>
                  <div className="matw-k">Spezialisten</div>
                </div>
              </div>
            </div>
          </div>

          <div className="matw-bar">
            <button type="button" className="matw-btn primary" onClick={run}>
              {btnLabel}
            </button>
            <span className="matw-grow" />
            <div className="matw-seg-toggle">
              {TEAM_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={teamN === n ? "on" : ""}
                  onClick={() => handleTeamChange(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <span className="matw-hint">
              Mehr Last? Mehr Agenten – das Team wächst einfach mit. (illustratives Beispiel)
            </span>
          </div>
        </div>

        <p className="matw-disc">
          Sie sehen nur das fertige Ergebnis – die Koordination im Hintergrund übernehmen wir. · KI-gestützter Entwurf,
          vor Veröffentlichung menschlich geprüft · <b>DSG-konform · Daten in der Schweiz.</b>
        </p>
      </div>
    </section>
  )
}
