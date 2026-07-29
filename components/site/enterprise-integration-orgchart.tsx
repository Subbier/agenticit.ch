"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ORG_KPIS, ORG_NODES } from "@/lib/enterprise-integration-orgchart-data"
import "./enterprise-integration-orgchart.css"

function OrgBox({ node, docked }: { node: (typeof ORG_NODES)[0]; docked: boolean }) {
  return (
    <div className={`eio-box${docked ? " docked" : ""}`}>
      <div className="eio-role">{node.role}</div>
      <span className="eio-tool">
        Ihr Tool bleibt: <b>{node.tool}</b>
      </span>
      <span className="eio-badge">✓ verbunden</span>
      <div className="eio-dock">
        <span className="eio-ai">🤖</span>
        <div className="eio-d">
          <b>{node.dockTitle}</b>
          <span>{node.dockText}</span>
        </div>
      </div>
    </div>
  )
}

export function EnterpriseIntegrationOrgchart() {
  const [dockedIds, setDockedIds] = useState<Set<number>>(new Set())
  const [busOn, setBusOn] = useState(false)
  const [connected, setConnected] = useState(false)
  const [btnDockLabel, setBtnDockLabel] = useState("🔌 Digitale Kollegen andocken")
  const [kpiValues, setKpiValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(ORG_KPIS.map((k) => [k.id, k.from])),
  )
  const [kpiShow, setKpiShow] = useState<Set<string>>(new Set())

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const countRaf = useRef<number[]>([])

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    countRaf.current.forEach(cancelAnimationFrame)
    countRaf.current = []
  }, [])

  const T = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }, [])

  const countTo = useCallback((kpiId: string, to: number) => {
    const from = ORG_KPIS.find((k) => k.id === kpiId)?.from ?? 0
    const t0 = performance.now()
    const dur = 900

    function step(now: number) {
      const p = Math.min(1, (now - t0) / dur)
      const e = 1 - Math.pow(1 - p, 3)
      setKpiValues((prev) => ({ ...prev, [kpiId]: from + (to - from) * e }))
      if (p < 1) {
        const id = requestAnimationFrame(step)
        countRaf.current.push(id)
      }
    }
    const id = requestAnimationFrame(step)
    countRaf.current.push(id)
  }, [])

  const reset = useCallback(
    (full = true) => {
      clearAll()
      setDockedIds(new Set())
      setBusOn(false)
      setConnected(false)
      setKpiShow(new Set())
      setKpiValues(Object.fromEntries(ORG_KPIS.map((k) => [k.id, k.from])))
      if (full) setBtnDockLabel("🔌 Digitale Kollegen andocken")
    },
    [clearAll],
  )

  const dock = useCallback(() => {
    clearAll()
    reset(false)
    setConnected(true)

    ORG_NODES.forEach((node, k) => {
      T(() => setDockedIds((prev) => new Set(prev).add(node.id)), 250 + k * 420)
    })

    const afterDock = 250 + ORG_NODES.length * 420 + 200
    T(() => setBusOn(true), afterDock)
    T(
      () =>
        ORG_KPIS.forEach((kpi, k) => {
          T(() => {
            setKpiShow((prev) => new Set(prev).add(kpi.id))
            countTo(kpi.id, kpi.to)
          }, k * 180)
        }),
      afterDock + 150,
    )
    setBtnDockLabel("✓ Angedockt")
  }, [T, clearAll, reset, countTo])

  useEffect(() => {
    reset(true)
    T(dock, 700)
    return clearAll
    // eslint-disable-next-line react-hooks/exhaustive-deps -- auto-start once on mount
  }, [])

  const ceo = ORG_NODES[0]
  const departments = ORG_NODES.slice(1)

  return (
    <section
      id="enterprise-integration-orgchart"
      className="eio-section scroll-mt-20 border-y border-[#E1E4E8] bg-gradient-to-b from-[#0A0C10] to-[#1E2631] px-5 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-[600px]">
        <div className="eio-intro">
          <span className="eio-ey">Live-Element · Enterprise-Integration</span>
          <h2 className="eio-h2">
            KI <span className="eio-go">in</span> Ihren Systemen – nicht daneben.
          </h2>
          <p className="eio-lead">
            Keine Insellösung. Auf jeder Ebene dockt ein digitaler Kollege an Ihre bestehenden Tools an – und plötzlich
            spielt alles zusammen.
          </p>
        </div>

        <div className="eio-card">
          <div className="eio-top">
            <div className="eio-brand">
              <span className="eio-dot" />
              <div>
                AgenticIT
                <small>ORG-CHART-ANDOCKUNG</small>
              </div>
            </div>
            <div className={`eio-state${connected ? " on" : ""}`}>
              {connected ? "✓ Alles verbunden" : "⚠ Insellösungen"}
            </div>
          </div>

          <div className="eio-body">
            <div className="eio-chart">
              <div className="eio-ceo">
                <OrgBox node={ceo} docked={dockedIds.has(ceo.id)} />
              </div>
              <div className="eio-stem" />
              <div className="eio-hbar">
                <span className="eio-drop" style={{ left: "16.6%" }} />
                <span className="eio-drop" style={{ left: "50%" }} />
                <span className="eio-drop" style={{ left: "83.3%" }} />
              </div>

              <div className="eio-row">
                {departments.map((node) => (
                  <OrgBox key={node.id} node={node} docked={dockedIds.has(node.id)} />
                ))}
              </div>

              <div className={`eio-bus${busOn ? " on" : ""}`}>
                <div className="eio-blab">
                  <span>Datenfluss zwischen Ihren Systemen</span>
                  <span className="eio-pill">{busOn ? "automatisch" : "manuell"}</span>
                </div>
                <div className="eio-track">
                  <div className="eio-dotflow" />
                </div>
                <div className="eio-manual">✋ Daten werden von Hand zwischen Programmen hin- und hergeschaufelt.</div>
              </div>
            </div>

            <div className="eio-kpis">
              {ORG_KPIS.map((kpi) => (
                <div key={kpi.id} className={`eio-kpi ${kpi.direction}${kpiShow.has(kpi.id) ? " show" : ""}`}>
                  <div className="eio-kh">
                    <span className="eio-n">{kpi.label}</span>
                    <span className="eio-ar">{kpi.direction === "up" ? "↑" : "↓"}</span>
                  </div>
                  <div className="eio-v">
                    <span>{Math.round(kpiValues[kpi.id] ?? kpi.from)}</span>%
                  </div>
                  <div className="eio-meter">
                    <i style={{ width: `${kpiValues[kpi.id] ?? kpi.from}%` }} />
                  </div>
                  <div className="eio-delta">{kpi.delta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="eio-bar">
            <button type="button" className="eio-btn primary" onClick={dock}>
              {btnDockLabel}
            </button>
            <button type="button" className="eio-btn ghost" onClick={() => reset(true)}>
              ↺ Vorher
            </button>
            <span className="eio-grow" />
            <span className="eio-note">Kein Systemwechsel – Ihre Tools bleiben, die KI kommt dazu.</span>
          </div>
        </div>

        <p className="eio-disc">
          Integration sauber &amp; sicher nach Schweizer Standard. · KI-gestützter Entwurf, vor Veröffentlichung
          menschlich geprüft · <b>DSG-konform · Daten in der Schweiz.</b>
        </p>
      </div>
    </section>
  )
}
