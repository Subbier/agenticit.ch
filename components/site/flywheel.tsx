"use client"

import { useState } from "react"
import { Hand } from "lucide-react"

const C = 260

function pt(r: number, deg: number): string {
  const a = ((deg - 90) * Math.PI) / 180
  return `${(C + r * Math.cos(a)).toFixed(1)} ${(C + r * Math.sin(a)).toFixed(1)}`
}

// Ringsegment, dessen Kanten als Pfeil (Chevron) im Uhrzeigersinn ineinandergreifen
function arrowWedge(a1: number, a2: number, R: number, r: number, delta: number): string {
  const Rm = (R + r) / 2
  const large = a2 - a1 > 180 ? 1 : 0
  return [
    `M ${pt(R, a1)}`,
    `A ${R} ${R} 0 ${large} 1 ${pt(R, a2)}`,
    `L ${pt(Rm, a2 + delta)}`,
    `L ${pt(r, a2)}`,
    `A ${r} ${r} 0 ${large} 0 ${pt(r, a1)}`,
    `L ${pt(Rm, a1 + delta)}`,
    "Z",
  ].join(" ")
}

function arc(r: number, a1: number, a2: number): string {
  const sweep = a2 > a1 ? 1 : 0
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0
  return `M ${pt(r, a1)} A ${r} ${r} 0 ${large} ${sweep} ${pt(r, a2)}`
}

type SegId =
  | "anziehen"
  | "interagieren"
  | "begeistern"
  | "marketing"
  | "vertrieb"
  | "service"
  | "center"

type Seg = {
  id: SegId
  label: string
  seg: string
  labelArc: string
  base: string
  active: string
  size: number
}

// Phasen-Ring (R 224 / r 156), Segmente angrenzend mit Pfeilkanten
const phases: Seg[] = [
  { id: "anziehen", label: "Anziehen", seg: arrowWedge(-60, 60, 224, 156, 18), labelArc: arc(190, -50, 50), base: "#103f34", active: "#1f7a63", size: 30 },
  { id: "interagieren", label: "Interagieren", seg: arrowWedge(60, 180, 224, 156, 18), labelArc: arc(190, 72, 168), base: "#0c3329", active: "#1a6b55", size: 25 },
  { id: "begeistern", label: "Begeistern", seg: arrowWedge(180, 300, 224, 156, 18), labelArc: arc(190, 192, 288), base: "#11483b", active: "#1f7a63", size: 25 },
]

// Funktionen-Ring (R 150 / r 88)
const functions: Seg[] = [
  { id: "marketing", label: "Marketing", seg: arrowWedge(0, 120, 150, 88, 16), labelArc: arc(119, 16, 104), base: "#15786a", active: "#2da894", size: 15 },
  { id: "vertrieb", label: "Vertrieb", seg: arrowWedge(120, 240, 150, 88, 16), labelArc: arc(119, 232, 128), base: "#12685c", active: "#279683", size: 15 },
  { id: "service", label: "Service", seg: arrowWedge(240, 360, 150, 88, 16), labelArc: arc(119, 256, 344), base: "#1a8676", active: "#34b8a0", size: 15 },
]

const rim = [
  { id: "fw-r1", labelArc: arc(243, -56, -16), label: "Fremde" },
  { id: "fw-r2", labelArc: arc(243, 16, 56), label: "Besucher" },
  { id: "fw-r3", labelArc: arc(243, 80, 124), label: "Interessenten" },
  { id: "fw-r4", labelArc: arc(243, 170, 128), label: "Kunden" },
  { id: "fw-r5", labelArc: arc(243, 232, 190), label: "Fans" },
  { id: "fw-r6", labelArc: arc(243, 246, 294), label: "Multiplikatoren" },
]

const detail: Record<SegId, { title: string; sub: string; desc: string }> = {
  anziehen: { title: "Anziehen", sub: "Fremde → Besucher", desc: "Wir machen Sie sichtbar – mit Anzeigen, Inhalten und einem starken Auftritt, der gefunden wird." },
  interagieren: { title: "Interagieren", sub: "Besucher → Kunden", desc: "Wir gehen auf Interessenten ein, beantworten Fragen sofort und führen sie zum Abschluss – warm und anrufbereit." },
  begeistern: { title: "Begeistern", sub: "Kunden → Multiplikatoren", desc: "Wir betreuen weiter, verkaufen Passendes nach und machen aus Kunden echte Botschafter." },
  marketing: { title: "Marketing", sub: "Aufmerksamkeit schaffen", desc: "Sichtbarkeit, Anzeigen, Inhalte und Design – damit die richtigen Menschen auf Sie aufmerksam werden." },
  vertrieb: { title: "Vertrieb", sub: "Anfragen zu Abschlüssen", desc: "Warme, qualifizierte Anfragen landen anrufbereit bei Ihnen. Sie führen das Gespräch, wir liefern den Kontakt." },
  service: { title: "Service", sub: "Kunden halten & ausbauen", desc: "Onboarding, Nachfassen und Support laufen automatisch – zufriedene Kunden bleiben und empfehlen weiter." },
  center: { title: "Wachstum", sub: "Alles aus einer Hand", desc: "Marketing, Vertrieb und Service greifen über Ihre Daten ineinander – ein Schwungrad, das wir Tag und Nacht für Sie antreiben." },
}

const allSegs = [...phases, ...functions]

function WheelSvg({ sel, pick }: { sel: SegId | null; pick: (id: SegId) => void }) {
  return (
    <svg viewBox="0 0 520 520" className="w-full h-auto select-none">
      <defs>
        <linearGradient id="fwOuter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0e9f8a" />
        </linearGradient>
        <radialGradient id="fwCenter" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#10b981" />
        </radialGradient>
        <filter id="fwShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000000" floodOpacity="0.45" />
        </filter>
        {[...allSegs, ...rim].map((x) => (
          <path key={`d-${x.id}`} id={x.id} d={x.labelArc} fill="none" />
        ))}
      </defs>

      <g filter="url(#fwShadow)">
        <circle cx={C} cy={C} r={243} fill="none" stroke="url(#fwOuter)" strokeWidth="34" />

        {allSegs.map((s) => {
          const isSel = sel === s.id
          return (
            <path
              key={s.id}
              d={s.seg}
              fill={isSel ? s.active : s.base}
              stroke={isSel ? "#6ee7b7" : "#0a0b0e"}
              strokeWidth={isSel ? 3 : 2.5}
              strokeLinejoin="round"
              className="cursor-pointer transition-[fill] duration-200"
              onMouseEnter={() => pick(s.id)}
              onClick={() => pick(s.id)}
            />
          )
        })}

        <circle
          cx={C}
          cy={C}
          r={84}
          fill="url(#fwCenter)"
          stroke={sel === "center" ? "#ffffff" : "#0a0b0e"}
          strokeWidth={sel === "center" ? 3.5 : 3}
          className="cursor-pointer"
          onMouseEnter={() => pick("center")}
          onClick={() => pick("center")}
        />
      </g>

      {/* Rim-Labels */}
      {rim.map((r) => (
        <text key={r.id} fill="#06281f" fontSize="14" fontWeight="700" textAnchor="middle" letterSpacing="0.4" className="pointer-events-none">
          <textPath href={`#${r.id}`} startOffset="50%">{r.label}</textPath>
        </text>
      ))}

      {/* Funktions-Labels */}
      {functions.map((f) => (
        <text key={`t-${f.id}`} fill="#ffffff" fontSize="15" fontWeight="700" textAnchor="middle" letterSpacing="0.3" className="pointer-events-none">
          <textPath href={`#${f.id}`} startOffset="50%">{f.label}</textPath>
        </text>
      ))}

      {/* Phasen-Labels */}
      {phases.map((p) => (
        <text key={`t-${p.id}`} fill="#ffffff" fontSize={p.size} fontWeight="800" textAnchor="middle" className="pointer-events-none">
          <textPath href={`#${p.id}`} startOffset="50%">{p.label}</textPath>
        </text>
      ))}

      <text x={C} y={C + 11} textAnchor="middle" fill="#06281f" fontSize="32" fontWeight="800" className="pointer-events-none">
        Wachstum
      </text>
    </svg>
  )
}

export function Flywheel() {
  const [sel, setSel] = useState<SegId>("anziehen")
  const [touched, setTouched] = useState(false)
  const d = detail[sel]
  const pick = (id: SegId) => {
    setSel(id)
    setTouched(true)
  }
  return (
    <div className="w-full">
      <style>{`@keyframes flytap{0%,100%{transform:translate(0,0) scale(1);opacity:.9}50%{transform:translate(-7px,7px) scale(.82);opacity:.5}}`}</style>
      <div className="relative mx-auto w-full max-w-[520px]">
        <WheelSvg sel={sel} pick={pick} />
        {!touched && (
          <div className="pointer-events-none absolute" style={{ left: "70%", top: "22%", animation: "flytap 1.4s ease-in-out infinite" }}>
            <Hand className="size-8 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          </div>
        )}
      </div>
      <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.05] p-5 sm:p-6 backdrop-blur-sm">
        <p className="overline text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">{d.sub}</p>
        <h3 className="mt-1 text-2xl font-bold text-white">{d.title}</h3>
        <p className="mt-2 text-base leading-7 text-white/75">{d.desc}</p>
      </div>
    </div>
  )
}

export function FlywheelMiniInteractive() {
  const [sel, setSel] = useState<SegId>("anziehen")
  const [touched, setTouched] = useState(false)
  const d = detail[sel]
  const pick = (id: SegId) => {
    setSel(id)
    setTouched(true)
  }
  return (
    <div>
      <style>{`@keyframes fwmtap{0%,100%{transform:translate(0,0) scale(1);opacity:.9}50%{transform:translate(-6px,6px) scale(.82);opacity:.5}}`}</style>
      <div className="relative mx-auto w-full max-w-[460px]">
        <WheelSvg sel={sel} pick={pick} />
        {!touched && (
          <span className="pointer-events-none absolute" style={{ left: "70%", top: "22%", animation: "fwmtap 1.3s ease-in-out infinite" }}>
            <Hand className="size-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          </span>
        )}
      </div>
      <div className="mt-4 min-h-[84px] rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
        <p className="overline text-sm font-semibold text-emerald-200">{d.sub}</p>
        <p className="text-base font-bold text-white">{d.title}</p>
        <p className="mt-1 text-sm leading-6 text-white/70">{d.desc}</p>
      </div>
    </div>
  )
}

export function FlywheelPreview() {
  return (
    <div className="mx-auto w-full max-w-[320px]">
      <WheelSvg sel={null} pick={() => {}} />
    </div>
  )
}
