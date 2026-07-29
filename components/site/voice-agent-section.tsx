"use client"

import dynamic from "next/dynamic"
import { Mic } from "lucide-react"

// Das ElevenLabs-SDK läuft ausschliesslich im Browser (kein Server-Rendering).
const VoiceAgentWidget = dynamic(
  () => import("@/components/site/voice-agent-widget").then((m) => m.VoiceAgentWidget),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto mt-8 flex max-w-[460px] flex-col items-center gap-5 rounded-[22px] border border-[#E3E9F2] bg-white p-8 shadow-[0_18px_48px_rgba(11,31,58,0.12)]">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#16C7C0] to-[#0a8f89]">
          <Mic className="h-9 w-9 text-white" />
        </div>
        <p className="text-[14px] font-bold text-[#0B1F3A]">Assistent wird geladen …</p>
      </div>
    ),
  },
)

export type VoiceAgentSectionProps = {
  agentId?: string
  eyebrow?: string
  title?: string
  description?: string
  /** "carbon" nur für Lösungen/Angebot/Technologie/Branchen (Design-System 26.07.2026). */
  theme?: "carbon"
}

export function VoiceAgentSection({
  eyebrow = "Hören Sie selbst",
  title = "So klingt Ihr KI-Telefonassistent.",
  description = "Starten Sie ein Muster-Gespräch direkt im Browser – genau so nimmt unser Agent Anrufe entgegen, qualifiziert und bucht Termine. Rund um die Uhr.",
  theme,
}: VoiceAgentSectionProps) {
  const carbon = theme === "carbon"
  return (
    <section
      id="voice-agent"
      className={
        carbon
          ? "scroll-mt-20 border-y border-[#E1E4E8] bg-white px-5 py-14 sm:px-6 sm:py-20"
          : "scroll-mt-20 border-y border-[#E3E9F2] bg-gradient-to-b from-white to-[#F5F8FC] px-5 py-14 sm:px-6 sm:py-20"
      }
    >
      <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
        <span
          className={
            carbon
              ? "font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]"
              : "inline-block rounded-full bg-[#16C7C0]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]"
          }
        >
          {eyebrow}
        </span>
        <h2
          className={
            carbon
              ? "mx-auto mt-3 max-w-[560px] font-[family-name:var(--font-display)] text-[clamp(24px,4.8vw,34px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#101418]"
              : "mx-auto mt-3 max-w-[560px] text-[clamp(26px,5vw,38px)] font-extrabold leading-[1.08] tracking-[-0.6px] text-[#0B1F3A]"
          }
        >
          {title}
        </h2>
        <p
          className={
            carbon
              ? "mx-auto mt-4 max-w-[560px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,2vw,17px)] leading-relaxed text-[#4A545F]"
              : "mx-auto mt-4 max-w-[560px] text-[clamp(15px,2vw,17px)] leading-relaxed text-[#5A6B82]"
          }
        >
          {description}
        </p>

        <VoiceAgentWidget theme={theme} />
      </div>
    </section>
  )
}
