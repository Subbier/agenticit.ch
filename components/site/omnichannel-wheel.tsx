"use client"

import { useId, useState } from "react"
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

type Channel = {
  id: SegId
  label: string
  deg: number
  group: Group
  Icon: LucideIcon
}

const R_OUT = 150
const R_IN = 96
const R_ICON = 250
const R_BUB = 27

const channels: Channel[] = [
  { id: "website", label: "Website", deg: 6, group: "digital", Icon: Globe },
  {
    id: "whatsapp",
    label: "WhatsApp",
    deg: 23,
    group: "digital",
    Icon: MessageCircle,
  },
  { id: "email", label: "E-Mail", deg: 40, group: "digital", Icon: Mail },
  {
    id: "social",
    label: "Social Media",
    deg: 57,
    group: "digital",
    Icon: Share2,
  },
  { id: "chatbot", label: "KI-Chatbot", deg: 74, group: "digital", Icon: Bot },
  { id: "video", label: "Video", deg: 91, group: "digital", Icon: Video },
  {
    id: "telefon",
    label: "Telefon",
    deg: 120,
    group: "persoenlich",
    Icon: Phone,
  },
  {
    id: "vorort",
    label: "Vor-Ort-Termin",
    deg: 152,
    group: "persoenlich",
    Icon: MapPin,
  },
]

const arcs: {
  id: SegId
  label: string
  seg: string
  labelArc: string
  fill: string
}[] = [
  {
    id: "omni",
    label: "Omnichannel",
    seg: ringSeg(184, 356, R_OUT, R_IN),
    labelArc: arc(122, 206, 334),
    fill: "url(#ocOmni)",
  },
  {
    id: "digital",
    label: "Digital",
    seg: ringSeg(2, 88, R_OUT, R_IN),
    labelArc: arc(122, 12, 78),
    fill: "url(#ocDigital)",
  },
  {
    id: "persoenlich",
    label: "Persönlich",
    seg: ringSeg(92, 178, R_OUT, R_IN),
    labelArc: arc(122, 100, 170),
    fill: "#3a4656",
  },
]

const detail: Record<SegId, { tag: string; title: string; desc: string }> = {
  omni: {
    tag: "Das Prinzip",
    title: "Kanäle mit klaren Übergaben",
    desc: "Passende Eingänge auswählen, den benötigten Kontext festlegen und die Übernahme im Team prüfen.",
  },
  digital: {
    tag: "Digitale Kanäle",
    title: "Digitale Anfragen weiterführen",
    desc: "Eingangsbestätigung, Zuständigkeit und persönliche Übernahme klären. Automatische Reaktionen auf passende Grenzen prüfen.",
  },
  persoenlich: {
    tag: "Persönliche Kanäle",
    title: "Persönlich übernehmen",
    desc: "Telefonische Beratung und Vor-Ort-Termin mit den freigegebenen Angaben vorbereiten. Ihr Team führt das Gespräch weiter.",
  },
  website: {
    tag: "Digital",
    title: "Website",
    desc: "Angebot und nächsten Schritt verständlich zeigen. Formularfelder auf die benötigten Angaben abstimmen.",
  },
  whatsapp: {
    tag: "Digital",
    title: "WhatsApp",
    desc: "Prüfen, ob der Kanal zur Zielgruppe und zum Anliegen passt. Erreichbarkeit und Weitergabe nötiger Angaben vereinbaren.",
  },
  email: {
    tag: "Digital",
    title: "E-Mail",
    desc: "Entwürfe und Kontaktzweck prüfen. Ausgehende Sales-Nachrichten vor dem Versand durch eine Person freigeben.",
  },
  social: {
    tag: "Digital",
    title: "Social Media",
    desc: "Passende Themen veröffentlichen und den Weg vom Beitrag zur Kontaktaufnahme verständlich machen.",
  },
  chatbot: {
    tag: "Digital",
    title: "KI-Chatbot",
    desc: "Zu Beginn als KI ausweisen, Wissensrahmen festlegen und ungeklärte Anliegen an eine Person übergeben.",
  },
  video: {
    tag: "Digital",
    title: "Video",
    desc: "Angebot und Ablauf verständlich erklären. Passende Untertitel und einen klaren nächsten Schritt vorsehen.",
  },
  telefon: {
    tag: "Persönlich",
    title: "Telefon",
    desc: "Erreichbarkeit, Gesprächsziel und Weitergabe der benötigten Angaben gemeinsam festlegen.",
  },
  vorort: {
    tag: "Persönlich",
    title: "Vor-Ort-Termin",
    desc: "Beratungsziel, benötigte Unterlagen und verantwortliche Person vor dem Treffen klären.",
  },
}

function groupColor(g: Group, active: boolean): string {
  if (g === "digital") return active ? "#34d399" : "#6ee7b7"
  return active ? "#cbd5e1" : "#94a3b8"
}

function WheelSvg({
  sel,
  pick,
}: {
  sel: SegId | null
  pick: (id: SegId) => void
}) {
  return (
    <svg
      role="img"
      aria-label="Beispiel für digitale und persönliche Kontaktkanäle"
      viewBox="0 0 720 570"
      className="w-full h-auto select-none"
    >
      <defs>
        <linearGradient id="ocOmni" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1F9A5E" />
          <stop offset="100%" stopColor="#0c7a64" />
        </linearGradient>
        <linearGradient id="ocDigital" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#1F9A5E" />
        </linearGradient>
        <filter id="ocShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="9"
            floodColor="#000000"
            floodOpacity="0.4"
          />
        </filter>
        {arcs.map((a) => (
          <path
            key={`d-${a.id}`}
            id={`oc-${a.id}`}
            d={a.labelArc}
            fill="none"
          />
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
        <circle
          cx={CX}
          cy={CY}
          r={R_IN - 6}
          fill="#f7faf9"
          stroke="#0a0b0e"
          strokeWidth="2"
        />
      </g>

      {/* Bogen-Labels */}
      {arcs.map((a) => (
        <text
          key={`t-${a.id}`}
          fill="#ffffff"
          fontSize="20"
          fontWeight="800"
          letterSpacing="0.6"
          textAnchor="middle"
          className="pointer-events-none"
        >
          <textPath href={`#oc-${a.id}`} startOffset="50%">
            {a.label}
          </textPath>
        </text>
      ))}

      {/* Zentrum */}
      <text
        x={CX}
        y={CY - 6}
        textAnchor="middle"
        fill="#06281f"
        fontSize="22"
        fontWeight="800"
        className="pointer-events-none"
      >
        Ein Gespräch.
      </text>
      <text
        x={CX}
        y={CY + 20}
        textAnchor="middle"
        fill="#0c7a64"
        fontSize="15"
        fontWeight="600"
        className="pointer-events-none"
      >
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
            <g
              transform={`translate(${b.x - 11}, ${b.y - 11})`}
              className="pointer-events-none"
            >
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
  const channelSelectId = useId()
  const [sel, setSel] = useState<SegId>("omni")
  const [touched, setTouched] = useState(false)
  const d = detail[sel]
  const pick = (id: SegId) => {
    setSel(id)
    setTouched(true)
  }
  return (
    <div
      data-example-panel
      className="w-full rounded-2xl bg-[#17291e] p-4 sm:p-6"
    >
      <style>{`@keyframes octap{0%,100%{transform:translate(0,0) scale(1);opacity:.9}50%{transform:translate(-6px,6px) scale(.82);opacity:.5}}`}</style>
      <div className="relative mx-auto w-full max-w-[620px]">
        <WheelSvg sel={sel} pick={pick} />
        {!touched && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: "64%",
              top: "14%",
              animation: "octap 1.4s ease-in-out infinite",
            }}
          >
            <Hand className="size-8 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          </div>
        )}
      </div>
      <label
        className="mt-4 flex flex-col gap-2 text-sm text-white"
        htmlFor={channelSelectId}
      >
        Kanal wählen
        <select
          id={channelSelectId}
          value={sel}
          onChange={(event) => pick(event.target.value as SegId)}
          className="min-h-[50px] w-full rounded-md border border-[#bfcbb8] bg-white px-3 text-base text-[#202522]"
        >
          <option value="omni">Überblick</option>
          <option value="digital">Digitale Kanäle</option>
          <option value="persoenlich">Persönliche Kanäle</option>
          {channels.map((channel) => (
            <option key={channel.id} value={channel.id}>
              {channel.label}
            </option>
          ))}
        </select>
      </label>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="mt-5 rounded-2xl border border-white/12 bg-white/[0.05] p-5 sm:p-6 backdrop-blur-sm"
      >
        <p className="overline text-sm font-semibold uppercase tracking-[0.18em] text-[#b4f17b]">
          {d.tag}
        </p>
        <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white">
          {d.title}
        </h3>
        <p className="mt-2 text-base leading-7 text-white/75">{d.desc}</p>
      </div>
    </div>
  )
}
