import {
  ArrowUpRight,
  Check,
  Clock3,
  HeartHandshake,
  Handshake,
  Magnet,
  MessageCircle,
  Network,
  PhoneCall,
  UserPlus,
} from "lucide-react"
import type { PotentialKind } from "@/lib/potential-report"

const icons = {
  acquisition: Magnet,
  conversion: MessageCircle,
  admin: Network,
  onboarding: UserPlus,
  phone: PhoneCall,
  retention: HeartHandshake,
  partnership: Handshake,
}

export function PotentialArt({
  kind,
  level = 1,
}: {
  kind: PotentialKind
  level?: number
}) {
  const Icon = icons[kind]
  const time = ["admin", "onboarding", "partnership"].includes(kind)
  return (
    <svg viewBox="0 0 360 160" aria-hidden="true" focusable="false">
      <rect
        width="360"
        height="160"
        rx="10"
        fill={level === 3 ? "#e9e7f2" : "#edf3e8"}
      />
      <circle
        cx="94"
        cy="80"
        r="49"
        fill={level === 2 ? "#227a70" : level === 3 ? "#65518b" : "#294e36"}
      />
      <Icon
        x={66}
        y={52}
        width={56}
        height={56}
        color="#b4e981"
        strokeWidth={1.6}
      />
      <path
        d="M153 80h29"
        stroke="#70935e"
        strokeWidth="3"
        strokeDasharray="4 5"
      />
      <rect
        x="194"
        y="30"
        width="130"
        height="100"
        rx="9"
        fill="white"
        stroke="#c6d6c0"
      />
      {time ? (
        <>
          <Clock3
            x={211}
            y={47}
            width={46}
            height={46}
            color="#4d7c36"
            strokeWidth={1.5}
          />
          <path
            d="M268 78l9 9 25-30"
            stroke="#4d7c36"
            strokeWidth="4"
            fill="none"
          />
          <rect
            x="211"
            y="108"
            width={45 + level * 20}
            height="6"
            rx="3"
            fill="#b4e981"
          />
        </>
      ) : (
        <>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={212 + i * 29}
              y={103 - (i + 1) * level * 9}
              width="19"
              height={14 + (i + 1) * level * 9}
              rx="3"
              fill={i === 2 ? "#7ab350" : "#d8e7ce"}
            />
          ))}
          <ArrowUpRight x={271} y={40} width={34} height={34} color="#4d7c36" />
        </>
      )}
      <circle cx="315" cy="126" r="12" fill="#4d7c36" />
      <Check x={307} y={118} width={16} height={16} color="white" />
    </svg>
  )
}
