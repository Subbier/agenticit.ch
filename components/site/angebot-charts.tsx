"use client"

import { useEffect, useRef, useState } from "react"
import type {
  AngebotChartData,
  ChartDonut,
  ChartFunnel,
  ChartLine,
  ChartRadar,
} from "@/lib/angebot-content"

/** Sichtbarkeits-Hook: triggert die Chart-Animation, sobald das Element in den Viewport scrollt. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, shown }
}

const GRID = "#E3E9F2"
const MUTED = "#94A3B8"
const INK = "#0B1F3A"

/* ----------------------------- RADAR (Acquire) ----------------------------- */
function RadarChart({ data, accent }: { data: ChartRadar; accent: string }) {
  const { ref, shown } = useInView<HTMLDivElement>()
  const cx = 210
  const cy = 150
  const R = 96
  const n = data.axes.length
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n
  const pt = (v: number, i: number) => [cx + R * v * Math.cos(angle(i)), cy + R * v * Math.sin(angle(i))]
  const poly = (vals: number[]) => vals.map((v, i) => pt(v, i).join(",")).join(" ")
  const rings = [0.25, 0.5, 0.75, 1]

  return (
    <div ref={ref}>
      <svg viewBox="0 0 420 300" className="h-auto w-full" role="img" aria-label={data.title}>
        {rings.map((lv) => (
          <polygon
            key={lv}
            points={data.axes.map((_, i) => pt(lv, i).join(",")).join(" ")}
            fill="none"
            stroke={GRID}
            strokeWidth={1}
          />
        ))}
        {data.axes.map((ax, i) => {
          const [x, y] = pt(1, i)
          const [lx, ly] = pt(1.22, i)
          return (
            <g key={ax}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={GRID} strokeWidth={1} />
              <text
                x={lx}
                y={ly}
                fontSize={10.5}
                fontWeight={700}
                fill={INK}
                textAnchor={Math.abs(lx - cx) < 6 ? "middle" : lx > cx ? "start" : "end"}
                dominantBaseline="middle"
              >
                {ax}
              </text>
            </g>
          )
        })}
        <g
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            transform: shown ? "scale(1)" : "scale(0.25)",
            opacity: shown ? 1 : 0,
            transition: "transform 800ms cubic-bezier(.2,.8,.2,1), opacity 600ms ease",
          }}
        >
          <polygon points={poly(data.now)} fill={MUTED} fillOpacity={0.16} stroke={MUTED} strokeWidth={1.5} />
          <polygon points={poly(data.agentic)} fill={accent} fillOpacity={0.2} stroke={accent} strokeWidth={2.5} />
          {data.agentic.map((v, i) => {
            const [x, y] = pt(v, i)
            return <circle key={i} cx={x} cy={y} r={3.2} fill={accent} />
          })}
        </g>
      </svg>
      <Legend
        items={[
          { label: "Mit AgenticIT", color: accent },
          { label: "Heute", color: MUTED },
        ]}
      />
    </div>
  )
}

/* ----------------------------- FUNNEL (Convert) ---------------------------- */
function FunnelChart({ data, accent }: { data: ChartFunnel; accent: string }) {
  const { ref, shown } = useInView<HTMLDivElement>()
  const opacities = [1, 0.82, 0.64, 0.46]

  return (
    <div ref={ref} className="flex flex-col gap-3 py-2">
      {data.steps.map((s, i) => (
        <div key={s.label} className="grid grid-cols-[1fr_46px] items-center gap-2">
          <div className="flex justify-center">
            <div
              className="flex h-11 items-center justify-center overflow-hidden whitespace-nowrap rounded-[11px] px-2 text-[12.5px] font-extrabold text-white"
              style={{
                width: shown ? `${s.pct}%` : "0%",
                minWidth: shown ? "76px" : "0px",
                background: accent,
                opacity: opacities[i] ?? 0.5,
                transition: `width 750ms cubic-bezier(.2,.8,.2,1) ${i * 110}ms`,
              }}
            >
              {s.label}
            </div>
          </div>
          <div className="text-right text-[12.5px] font-extrabold tabular-nums text-[#0B1F3A]">{s.pct}%</div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------ LINE (Retain) ------------------------------ */
function LineChart({ data, accent }: { data: ChartLine; accent: string }) {
  const { ref, shown } = useInView<HTMLDivElement>()
  const W = 320
  const left = 16
  const right = W - 16
  const top = 24
  const bottom = 170
  const all = [...data.agentic, ...data.now]
  const min = Math.min(...all) - 6
  const max = Math.max(...all) + 6
  const xAt = (i: number) => left + (i * (right - left)) / (data.xLabels.length - 1)
  const yAt = (v: number) => bottom - ((v - min) / (max - min)) * (bottom - top)
  const line = (vals: number[]) => vals.map((v, i) => `${xAt(i)},${yAt(v)}`).join(" ")

  return (
    <div ref={ref}>
      <svg viewBox="0 0 320 210" className="h-auto w-full" role="img" aria-label={data.title}>
        {[0, 0.5, 1].map((g) => {
          const y = top + g * (bottom - top)
          return <line key={g} x1={left} y1={y} x2={right} y2={y} stroke={GRID} strokeWidth={1} />
        })}
        {/* Heute */}
        <polyline
          points={line(data.now)}
          fill="none"
          stroke={MUTED}
          strokeWidth={2}
          strokeDasharray="2 1"
          pathLength={1}
          style={{ strokeDasharray: 1, strokeDashoffset: shown ? 0 : 1, transition: "stroke-dashoffset 900ms ease 200ms" }}
        />
        {/* Mit AgenticIT */}
        <polyline
          points={line(data.agentic)}
          fill="none"
          stroke={accent}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{ strokeDasharray: 1, strokeDashoffset: shown ? 0 : 1, transition: "stroke-dashoffset 1000ms ease" }}
        />
        {data.agentic.map((v, i) => (
          <circle
            key={i}
            cx={xAt(i)}
            cy={yAt(v)}
            r={4}
            fill="#fff"
            stroke={accent}
            strokeWidth={2.5}
            style={{ opacity: shown ? 1 : 0, transition: `opacity 300ms ease ${500 + i * 140}ms` }}
          />
        ))}
        {data.xLabels.map((lb, i) => (
          <text key={lb} x={xAt(i)} y={196} fontSize={11} fontWeight={700} fill={MUTED} textAnchor="middle">
            {lb}
          </text>
        ))}
      </svg>
      <Legend
        items={[
          { label: "Mit AgenticIT", color: accent },
          { label: "Heute", color: MUTED },
        ]}
      />
    </div>
  )
}

/* ------------------------------ DONUT (Operate) ---------------------------- */
function DonutChart({ data }: { data: ChartDonut }) {
  const { ref, shown } = useInView<HTMLDivElement>()
  const r = 78
  const C = 2 * Math.PI * r
  const total = data.segments.reduce((s, x) => s + x.value, 0)
  let acc = 0

  return (
    <div ref={ref}>
      <div className="mx-auto flex max-w-[300px] flex-col items-center">
        <svg viewBox="0 0 220 220" className="h-auto w-full max-w-[220px]" role="img" aria-label={data.title}>
          <circle cx={110} cy={110} r={r} fill="none" stroke={GRID} strokeWidth={24} />
          {data.segments.map((seg, i) => {
            const len = (seg.value / total) * C
            const rotation = -90 + (acc / total) * 360
            acc += seg.value
            return (
              <circle
                key={seg.label}
                cx={110}
                cy={110}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={24}
                strokeLinecap="butt"
                transform={`rotate(${rotation} 110 110)`}
                strokeDasharray={shown ? `${len} ${C - len}` : `0 ${C}`}
                style={{ transition: `stroke-dasharray 800ms cubic-bezier(.2,.8,.2,1) ${i * 130}ms` }}
              />
            )
          })}
          <text x={110} y={102} fontSize={26} textAnchor="middle" dominantBaseline="central">⚙️</text>
          <text x={110} y={130} fontSize={11} fontWeight={700} fill={MUTED} textAnchor="middle">
            Zeit gewonnen
          </text>
        </svg>
        <div className="mt-4 grid w-full grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
          {data.segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2 text-[12.5px] font-semibold text-[#314866]">
              <span className="h-2.5 w-2.5 flex-none rounded-[3px]" style={{ background: seg.color }} aria-hidden="true" />
              <span className="flex-1">{seg.label}</span>
              <span className="tabular-nums text-[#8294ad]">{seg.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-2 text-[12.5px] font-semibold text-[#5A6B82]">
          <span className="h-2.5 w-4 rounded-full" style={{ background: it.color }} aria-hidden="true" />
          {it.label}
        </span>
      ))}
    </div>
  )
}

/** Dispatcher: rendert das passende Chart zum Bereich. */
export function AngebotChart({ chart, accent }: { chart: AngebotChartData; accent: string }) {
  switch (chart.type) {
    case "radar":
      return <RadarChart data={chart} accent={accent} />
    case "funnel":
      return <FunnelChart data={chart} accent={accent} />
    case "line":
      return <LineChart data={chart} accent={accent} />
    case "donut":
      return <DonutChart data={chart} />
  }
}
