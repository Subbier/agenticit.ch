"use client"

import { useState } from "react"
import {
  Globe,
  MessageCircle,
  Mail,
  Share2,
  Bot,
  Video,
  Phone,
  MapPin,
  Hand,
  type LucideIcon,
} from "lucide-react"

const CX = 280
const CY = 285

function P(r: number, deg: number): { x: number; y: number } {
  const a = ((deg - 90) * Math.PI) / 180
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}
function ps(r: number, deg: number): string {
  const p = P(r, deg)
  return `${p.x.toFixed(1)} ${p.y.toFixed(1)}`
}
function ringSeg(a1: number, a2: number, R: number, r: number): string {
  const large = a2 - a1 > 180 ? 1 : 0
  return `M ${ps(R, a1)} A ${R} ${R} 0 ${large} 1 ${ps(R, a2)} L ${ps(r, a2)} A ${r} ${r} 0 ${large} 0 ${ps(r, a1)} Z`
}
function arc(r: number, a1: number, a2: number): string {
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0
  const sweep = a2 > a1 ? 1 : 0
  return `M ${ps(r, a1)} A ${r} ${r} 0 ${large} ${sweep} ${ps(r, a2)}`
}

type Group = "digital" | "persoenlich"
type SegId =
  | "omni"
  | "digital"
  | "persoenlich"
  | "website"
  | "whatsapp"
  | "email"
  | "social"
  | "chatbot"
  | "video"
  | "telefon"
  | "vorort"

type Channel = { id: SegId; label: string; deg: number; group: Group; Icon: LucideIcon }

const R_OUT = 150
const R_IN = 96
const R_ICON = 250
const R_BUB = 27

const channels: Channel[] = [
  { id: "website", label: "Website", deg: 6, group: "digital", Icon: Globe },
  { id: "whatsapp", label: "WhatsApp", deg: 23, group: "digital", Icon: MessageCircle },
  { id: "email", label: "E-Mail", deg: 40, group: "digital", Icon: Mail },
  { id: "social", label: "Social Media", deg: 57, group: "digital", Icon: Share2 },
  { id: "chatbot", label: "KI-Chatbot", deg: 74, group: "digital", Icon: Bot },
  { id: "video", label: "Video", deg: 91, group: "digital", Icon: Video },
  { id: "telefon", label: "Telefon", deg: 120, group: "persoenlich", Icon: Phone },
  { id: "vorort", label: "Vor-Ort-Termin", deg: 152, group: "persoenlich", Icon: MapPin },
]

const arcs: { id: SegId; label: string; seg: string; labelArc: string; fill: string }[] = [
  { id: "omni", label: "Omnichannel", seg: ringSeg(184, 356, R_OUT, R_IN), labelArc: arc(122, 206, 334), fill: "url(#ocOmni)" },
  { id: "digital", label: "Digital", seg: ringSeg(2, 88, R_OUT, R_IN), labelArc: arc(122, 12, 78), fill: "url(#ocDigital)" },
  { id: "persoenlich", label: "Persönlich", seg: ringSeg(92, 178, R_OUT, R_IN), labelArc: arc(122, 100, 170), fill: "#3a4656" },
]

const detail: Record<SegId, { tag: string; title: string; desc: string }> = {
  omni: { tag: "Das Prinzip", title: "Ein Gespräch über alle Kanäle", desc: "Egal wo Ihr Kunde startet – Website, WhatsApp oder Telefon: Der Kontext reist mit. Kein Neuanfang, kein Doppelt-Erzählen, keine verlorene Anfrage." },
  digital: { tag: "Digitale Kanäle", title: "Immer erreichbar, sofort reaktiv", desc: "Website, WhatsApp, E-Mail, Social Media, KI-Chatbot und Video – automatisiert, 24/7, mit Antwort in Sekunden statt Tagen." },
  persoenlich: { tag: "Persönliche Kanäle", title: "Wenn der Mensch zählt", desc: "Telefon und Vor-Ort-Termin – warm vorbereitet aus dem digitalen Verlauf. Sie übernehmen das Gespräch zum richtigen Zeitpunkt." },
  website: { tag: "Digital", title: "Website", desc: "Ihr Auftritt fängt Besucher ein und wandelt sie in Anfragen – mit klaren Wegen zur Kontaktaufnahme." },
  whatsapp: { tag: "Digital", title: "WhatsApp", desc: "Der Kanal mit den höchsten Öffnungsraten. Anfragen, Rückfragen und Terminbestätigung dort, wo Ihre Kunden ohnehin sind." },
  email: { tag: "Digital", title: "E-Mail", desc: "Automatisierte, persönliche Sequenzen halten Interessenten warm, bis sie kaufbereit sind." },
  social: { tag: "Digital", title: "Social Media", desc: "Sichtbarkeit dort, wo Aufmerksamkeit entsteht – Anfragen fliessen direkt in denselben Verlauf." },
  chatbot: { tag: "Digital", title: "KI-Chatbot", desc: "Beantwortet Fragen rund um die Uhr, qualifiziert vor und übergibt den heissen Kontakt anrufbereit." },
  video: { tag: "Digital", title: "Video", desc: "Erklärt, schafft Vertrauen und macht Sie für Suche und KI-Antwortmaschinen auffindbar." },
  telefon: { tag: "Persönlich", title: "Telefon", desc: "Warme, vorqualifizierte Anrufe landen bei Ihnen – mit dem ganzen Kontext aus den digitalen Kanälen." },
  vorort: { tag: "Persönlich", title: "Vor-Ort-Termin", desc: "Der persönliche Abschluss, perfekt vorbereitet: Der Interessent kennt Sie schon, bevor Sie sich treffen." },
}

function groupColor(g: Group, active: boolean): string {
  if (g === "digital") return active ? "#34d399" : "#6ee7b7"
  return active ? "#cbd5e1" : "#94a3b8"
}

function WheelSvg({ sel, pick }: { sel: SegId | null; pick: (id: SegId) => void }) {
  return (
    <svg viewBox="0 0 720 570" className="w-full h-auto select-none">
      <defs>
        <linearGradient id="ocOmni" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0c7a64" />
        </linearGradient>
        <linearGradient id="ocDigital" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="ocShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="9" floodColor="#000000" floodOpacity="0.4" />
        </filter>
        {arcs.map((a) => (
          <path key={`d-${a.id}`} id={`oc-${a.id}`} d={a.labelArc} fill="none" />
        ))}
      </defs>

      {/* Verbindungslinien */}
      {channels.map((c) => {
        const a = P(R_OUT - 2, c.deg)
        const b = P(R_ICON - R_BUB, c.deg)
        const on = sel === c.id || sel === c.group
        return (
          <line
            key={`l-${c.id}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={on ? "#6ee7b7" : "rgba(255,255,255,0.18)"}
            strokeWidth={on ? 2 : 1.2}
          />
        )
      })}

      {/* Donut */}
      <g filter="url(#ocShadow)">
        {arcs.map((a) => {
          const isSel = sel === a.id
          return (
            <path
              key={a.id}
              d={a.seg}
              fill={a.fill}
              stroke={isSel ? "#ffffff" : "#0a0b0e"}
              strokeWidth={isSel ? 3 : 2}
              className="cursor-pointer transition-[stroke] duration-200"
              onMouseEnter={() => pick(a.id)}
              onClick={() => pick(a.id)}
            />
          )
        })}
        <circle cx={CX} cy={CY} r={R_IN - 6} fill="#f7faf9" stroke="#0a0b0e" strokeWidth="2" />
      </g>

      {/* Bogen-Labels */}
      {arcs.map((a) => (
        <text key={`t-${a.id}`} fill="#ffffff" fontSize="20" fontWeight="800" letterSpacing="0.6" textAnchor="middle" className="pointer-events-none">
          <textPath href={`#oc-${a.id}`} startOffset="50%">{a.label}</textPath>
        </text>
      ))}

      {/* Zentrum */}
      <text x={CX} y={CY - 6} textAnchor="middle" fill="#06281f" fontSize="22" fontWeight="800" className="pointer-events-none">
        Ein Gespräch.
      </text>
      <text x={CX} y={CY + 20} textAnchor="middle" fill="#0c7a64" fontSize="15" fontWeight="600" className="pointer-events-none">
        Alle Kanäle.
      </text>

      {/* Kanal-Bubbles + Labels */}
      {channels.map((c) => {
        const b = P(R_ICON, c.deg)
        const isSel = sel === c.id
        const on = isSel || sel === c.group
        const col = groupColor(c.group, on)
        return (
          <g
            key={c.id}
            className="cursor-pointer"
            onMouseEnter={() => pick(c.id)}
            onClick={() => pick(c.id)}
          >
            <circle
              cx={b.x}
              cy={b.y}
              r={R_BUB}
              fill={isSel ? "rgba(110,231,183,0.16)" : "rgba(255,255,255,0.06)"}
              stroke={on ? col : "rgba(255,255,255,0.14)"}
              strokeWidth={isSel ? 2.5 : 1.4}
              className="transition-all duration-200"
            />
            <g transform={`translate(${b.x - 11}, ${b.y - 11})`} className="pointer-events-none">
              <c.Icon width={22} height={22} color={col} strokeWidth={1.8} />
            </g>
            <text
              x={b.x + R_BUB + 12}
              y={b.y + 5}
              fill={isSel ? "#ffffff" : "rgba(255,255,255,0.82)"}
              fontSize="16"
              fontWeight={isSel ? 700 : 500}
              className="pointer-events-none"
            >
              {c.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function OmnichannelWheel() {
  const [sel, setSel] = useState<SegId>("omni")
  const [touched, setTouched] = useState(false)
  const d = detail[sel]
  const pick = (id: SegId) => {
    setSel(id)
    setTouched(true)
  }
  return (
    <div className="w-full">
      <style>{`@keyframes octap{0%,100%{transform:translate(0,0) scale(1);opacity:.9}50%{transform:translate(-6px,6px) scale(.82);opacity:.5}}`}</style>
      <div className="relative mx-auto w-full max-w-[620px]">
        <WheelSvg sel={sel} pick={pick} />
        {!touched && (
          <div className="pointer-events-none absolute" style={{ left: "64%", top: "14%", animation: "octap 1.4s ease-in-out infinite" }}>
            <Hand className="size-8 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          </div>
        )}
      </div>
      <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.05] p-5 sm:p-6 backdrop-blur-sm">
        <p className="overline text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">{d.tag}</p>
        <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white">{d.title}</h3>
        <p className="mt-2 text-base leading-7 text-white/75">{d.desc}</p>
      </div>
    </div>
  )
}
