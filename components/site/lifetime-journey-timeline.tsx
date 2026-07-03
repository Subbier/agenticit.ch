"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  Download,
  Gauge,
  Database,
  Users,
  MessageCircle,
  Target,
  Phone,
  MessageSquare,
  CalendarCheck,
  RefreshCw,
  Swords,
  FileText,
  Share2,
  ShieldCheck,
  CheckCircle2,
  ClipboardCheck,
  Gift,
  Award,
  Radio,
  TrendingUp,
  HeartPulse,
  Search,
  Repeat,
  Play,
  Pause,
  RotateCcw,
  type LucideIcon,
} from "lucide-react"

type PhaseKey = "akquise" | "termin" | "angebot" | "onboard" | "bindung" | "langfrist"

const PHASES: Record<PhaseKey, { color: string; label: string }> = {
  akquise: { color: "#16C7C0", label: "Akquise" },
  termin: { color: "#2DA8FF", label: "Terminierung" },
  angebot: { color: "#7C5CFF", label: "Angebot & Abschluss" },
  onboard: { color: "#2BB673", label: "Onboarding" },
  bindung: { color: "#F5A623", label: "Bindung & Wachstum" },
  langfrist: { color: "#F2667A", label: "Lebenslange Betreuung" },
}

type Step = { d: number; p: PhaseKey; icon: LucideIcon; t: string; desc: string }

const STEPS: Step[] = [
  { d: 1, p: "akquise", icon: Download, t: "Lead Import", desc: "Neuer Lead trifft ein und wird automatisch erfasst und angelegt." },
  { d: 1, p: "akquise", icon: Gauge, t: "Bewertung", desc: "KI-Scoring nach Potenzial, Kaufbereitschaft und Fit – Priorisierung in Sekunden." },
  { d: 1, p: "akquise", icon: Database, t: "Anreicherung", desc: "Datenanreicherung aus 50+ Quellen: Firma, Rolle, Signale, Kontaktdaten." },
  { d: 1, p: "akquise", icon: Users, t: "Segmentierung", desc: "Zuordnung zu Sinus-Milieu & Zielgruppe für passgenaue Ansprache." },
  { d: 1, p: "akquise", icon: MessageCircle, t: "Follow-Up / Willkommen", desc: "Personalisierte Willkommens-Nachricht – sofort, im richtigen Ton." },
  { d: 1, p: "akquise", icon: Target, t: "Strategieaufbau", desc: "Individuelle Verkaufs- und Kommunikationsstrategie wird automatisch erstellt." },
  { d: 1, p: "termin", icon: Phone, t: "Agentic Terminanruf", desc: "KI-Agent ruft an und vereinbart einen Termin – transparent als KI gekennzeichnet." },
  { d: 1, p: "termin", icon: MessageSquare, t: "Agentic Termin-WhatsApp", desc: "Parallele WhatsApp-Sequenz für Erreichbarkeit über den Lieblingskanal." },
  { d: 1, p: "termin", icon: CalendarCheck, t: "Terminvereinbarung", desc: "Termin wird gebucht, bestätigt und allen Beteiligten zugestellt." },
  { d: 2, p: "angebot", icon: RefreshCw, t: "CRM- & Kalender-Aktualisierung", desc: "Automatischer Sync aller Daten in CRM und Kalender – kein manuelles Tippen." },
  { d: 2, p: "angebot", icon: Swords, t: "Erstellung Battle Card", desc: "Wettbewerbs-Briefing fürs Gespräch: Argumente, Einwände, Differenzierung." },
  { d: 2, p: "angebot", icon: FileText, t: "Vergleich / Offerte", desc: "Maßgeschneiderte Offerte und Vergleich werden automatisch generiert." },
  { d: 2, p: "angebot", icon: Share2, t: "Cross-Selling-Konzept", desc: "Passende Zusatzangebote werden identifiziert und vorbereitet." },
  { d: 3, p: "angebot", icon: ShieldCheck, t: "Kaufreue-Behandlung", desc: "Proaktive Reassurance nach Abschluss – senkt die Stornoquote spürbar." },
  { d: 8, p: "onboard", icon: CheckCircle2, t: "Aufnahmebestätigung", desc: "Onboarding- und Aufnahmebestätigung wird versendet – sauberer Start." },
  { d: 14, p: "onboard", icon: ClipboardCheck, t: "Zufriedenheitsumfrage / Bewertung", desc: "NPS- und Review-Anfrage zum richtigen Zeitpunkt für echtes Feedback." },
  { d: 21, p: "bindung", icon: Gift, t: "Digital Give-Away", desc: "Digitales Geschenk stärkt die Bindung und das Markenerlebnis." },
  { d: 35, p: "bindung", icon: Award, t: "Ambassador / Empfehlungsprogramm", desc: "Aktivierung zufriedener Kunden als Empfehler – Wachstum durch Vertrauen." },
  { d: 35, p: "bindung", icon: Radio, t: "Social Media Listening", desc: "Monitoring von Erwähnungen & Stimmung – Chancen und Risiken früh erkennen." },
  { d: 60, p: "bindung", icon: TrendingUp, t: "Upselling / Vertragsverlängerung", desc: "Wachstums- und Renewal-Trigger zum optimalen Moment der Beziehung." },
  { d: 365, p: "langfrist", icon: HeartPulse, t: "Kündigungsprävention", desc: "Frühwarnsystem erkennt Abwanderungssignale und startet Retention." },
  { d: 365, p: "langfrist", icon: Search, t: "Bedarfsanfrage", desc: "Reaktivierung bei neuem Bedarf – relevant, statt aufdringlich." },
  { d: 730, p: "langfrist", icon: Repeat, t: "Lebenszyklen", desc: "Langfrist-Betreuung über Lebensphasen hinweg – echte Lifetime Value." },
]

const SPEEDS = [1, 1.5, 2, 0.5]

export function LifetimeJourneyTimeline() {
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [i, setI] = useState(-1)
  const [speed, setSpeed] = useState(1)

  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const leadRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // position the track so the active node sits on the centre reading line
  const positionTrack = useCallback(() => {
    const stage = stageRef.current
    const track = trackRef.current
    const el = nodeRefs.current[i]
    if (!stage || !track || !el) return
    const offset = stage.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2)
    track.style.transform = `translateY(${offset}px)`
    if (leadRef.current) {
      leadRef.current.style.top = `${el.offsetTop + el.offsetHeight / 2 + offset}px`
    }
  }, [i])

  useLayoutEffect(() => {
    if (i >= 0) positionTrack()
  }, [i, positionTrack])

  useEffect(() => {
    const onResize = () => positionTrack()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [positionTrack])

  // autoplay loop
  useEffect(() => {
    if (!playing) return
    if (i >= STEPS.length - 1) {
      setPlaying(false)
      setDone(true)
      return
    }
    timerRef.current = setTimeout(() => setI((v) => v + 1), i < 0 ? 1500 / speed : 2100 / speed)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [playing, i, speed])

  const start = () => {
    setStarted(true)
    setDone(false)
    setI(0)
    setPlaying(true)
  }
  const restart = () => {
    setDone(false)
    setI(0)
    setPlaying(true)
  }
  const toggle = () => {
    if (done) {
      restart()
      return
    }
    setPlaying((p) => !p)
  }
  const inspect = (idx: number) => {
    if (done) return
    setPlaying(false)
    setI(idx)
  }
  const cycleSpeed = () => setSpeed((s) => SPEEDS[(SPEEDS.indexOf(s) + 1) % SPEEDS.length])

  const active = i >= 0 ? STEPS[i] : null
  const progress = i >= 0 ? ((i + 1) / STEPS.length) * 100 : 0

  let lastDay = -1

  return (
    <section className="bg-gradient-to-b from-[#13294B] to-[#0B1F3A] px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[640px] text-center">
        <span className="inline-block rounded-full bg-[#16C7C0]/15 px-[13px] py-[6px] text-[11px] font-extrabold uppercase tracking-[0.7px] text-[#16C7C0] sm:text-[12px]">
          Live-Demo
        </span>
        <h2 className="mt-3 text-[clamp(24px,5vw,34px)] font-extrabold leading-[1.1] tracking-[-0.6px] text-white">
          Ein Lead trifft ein. Der Rest läuft von selbst.
        </h2>
        <p className="mx-auto mt-3 max-w-[460px] text-[clamp(14px,3.2vw,16px)] leading-relaxed text-[#9fb0c8]">
          Drücke den Knopf und sieh zu, wie der Wachstumsmotor jeden Schritt von Tag 1 bis Tag 730 selbst übernimmt.
        </p>
      </div>

      <div
        className={`relative mx-auto mt-8 flex aspect-square w-full max-w-[520px] select-none flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(120%_80%_at_50%_-10%,#16224a_0%,#0c1326_45%,#070b16_100%)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]`}
      >
        {/* header */}
        <div className="relative z-[6] flex items-center justify-between gap-3 bg-gradient-to-b from-[#070b16]/90 to-transparent px-[18px] pb-[10px] pt-4">
          <div className="flex items-center gap-[9px] text-[14px] font-bold text-white">
            <span
              className="h-[22px] w-[22px] flex-none rounded-[7px]"
              style={{
                background:
                  "conic-gradient(from 200deg,#16C7C0,#2DA8FF,#7C5CFF,#F5A623,#16C7C0)",
                boxShadow: "0 0 16px rgba(45,168,255,.6)",
              }}
            />
            <span>
              AgenticIT
              <span className="block text-[10.5px] font-medium tracking-[0.4px] text-[#8ea0c8]">
                LIFETIME CUSTOMER JOURNEY
              </span>
            </span>
          </div>
          <div className="text-right text-[11px] leading-[1.3] tabular-nums text-[#8ea0c8]">
            <b className="text-[13px] text-white">{Math.max(0, i + 1)}</b>/23
            <br />
            <span>{done ? "Abgeschlossen" : active ? PHASES[active.p].label : "Bereit"}</span>
          </div>
        </div>

        {/* progress */}
        <div className="relative z-[6] mx-[18px] mt-[2px] h-1 overflow-hidden rounded-full bg-[#0c1428]">
          <i
            className="absolute inset-0 rounded-full transition-[width] duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg,#16C7C0,#2DA8FF,#7C5CFF,#2BB673,#F5A623,#F2667A)",
            }}
          />
        </div>

        {/* stage */}
        <div ref={stageRef} className="relative flex-1 overflow-hidden">
          {/* reading line */}
          <div
            className={`pointer-events-none absolute inset-x-0 top-1/2 z-[4] h-[84px] -translate-y-1/2 border-y border-white/5 transition-opacity duration-400 ${
              started ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(90deg,rgba(34,211,238,0),rgba(45,168,255,.1),rgba(34,211,238,0))",
            }}
          >
            <span className="absolute left-3 top-[6px] text-[8.5px] tracking-[2px] text-[#8ea0c8]">
              JETZT
            </span>
          </div>

          {/* travelling lead */}
          <div
            ref={leadRef}
            className={`absolute left-[34px] z-[5] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 ${
              started ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: "radial-gradient(circle at 35% 30%,#fff,#16C7C0)",
              boxShadow: "0 0 0 6px rgba(22,199,192,.18),0 0 26px rgba(22,199,192,.9)",
            }}
          />

          {/* track */}
          <div
            ref={trackRef}
            className="absolute inset-x-0 top-0 px-4 transition-transform duration-[1050ms] [transition-timing-function:cubic-bezier(.5,.02,.2,1)]"
          >
            {/* spine */}
            <div className="pointer-events-none absolute bottom-2 left-[43px] top-2 w-0.5 bg-gradient-to-b from-transparent via-[#1e2c4d] to-transparent" />

            {STEPS.map((s, idx) => {
              const showDay = s.d !== lastDay
              lastDay = s.d
              const Icon = s.icon
              const color = PHASES[s.p].color
              const lit = idx <= i
              const isActive = idx === i
              return (
                <div key={idx}>
                  {showDay && (
                    <div className="relative z-[2] flex h-[42px] items-center gap-[10px] pl-0.5">
                      <b className="whitespace-nowrap rounded-full border border-[#1e2c4d] bg-[#111c36] px-[9px] py-1 text-[10px] tracking-[1.5px] text-[#8ea0c8]">
                        TAG {s.d}
                      </b>
                      <span className="h-px flex-1 bg-[#1e2c4d]" />
                    </div>
                  )}
                  <div
                    ref={(el) => {
                      nodeRefs.current[idx] = el
                    }}
                    onMouseEnter={() => inspect(idx)}
                    onClick={() => inspect(idx)}
                    className={`relative z-[3] flex min-h-[62px] cursor-pointer items-center gap-[13px] py-[9px] pr-3 transition-all duration-500 ${
                      lit ? "opacity-100 saturate-100" : "opacity-30 saturate-50"
                    } ${isActive ? "translate-x-0.5" : ""}`}
                  >
                    <div
                      className="relative flex h-[54px] w-[54px] flex-none items-center justify-center rounded-[15px] border bg-[#111c36] transition-all duration-400"
                      style={{
                        borderColor: lit ? `color-mix(in srgb, ${color} 55%, #1e2c4d)` : "#1e2c4d",
                        boxShadow: isActive
                          ? `0 0 0 4px color-mix(in srgb, ${color} 22%, transparent), 0 0 26px color-mix(in srgb, ${color} 55%, transparent)`
                          : "none",
                        transform: isActive ? "scale(1.06)" : "scale(1)",
                      }}
                    >
                      <span
                        className="absolute -right-[7px] -top-[7px] flex h-[19px] w-[19px] items-center justify-center rounded-full text-[10px] font-extrabold text-[#06101e] shadow-[0_2px_8px_rgba(0,0,0,.4)]"
                        style={{ background: color }}
                      >
                        {idx + 1}
                      </span>
                      <Icon size={25} strokeWidth={1.8} style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14.5px] font-semibold leading-[1.2] text-white">{s.t}</div>
                      <div className="mt-[2px] text-[9.5px] uppercase tracking-[0.5px]" style={{ color }}>
                        {PHASES[s.p].label}
                      </div>
                      <div
                        className="overflow-hidden text-[11.5px] leading-[1.35] text-[#8ea0c8] transition-all duration-400"
                        style={{
                          maxHeight: isActive ? 60 : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 3 : 0,
                        }}
                      >
                        {s.desc}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* controls */}
        <div
          className={`relative z-[7] flex items-center gap-2 bg-gradient-to-t from-[#070b16]/90 to-transparent px-4 py-[11px] transition-all duration-400 ${
            started ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <button
            onClick={toggle}
            aria-label="Abspielen / Pause"
            className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] border border-[#1e2c4d] bg-[#111c36] text-white transition-colors hover:border-[#2c3f6b] hover:bg-[#16234a]"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={restart}
            aria-label="Neu starten"
            className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] border border-[#1e2c4d] bg-[#111c36] text-white transition-colors hover:border-[#2c3f6b] hover:bg-[#16234a]"
          >
            <RotateCcw size={16} />
          </button>
          <div className="min-w-0 flex-1 truncate text-[11.5px] text-[#8ea0c8]">
            {done ? (
              <b className="text-white">23/23 Schritte – vollautomatisch.</b>
            ) : active ? (
              <>
                Tag {active.d} · <b className="text-white">{active.t}</b>
              </>
            ) : (
              "—"
            )}
          </div>
          <button
            onClick={cycleSpeed}
            aria-label="Geschwindigkeit"
            className="flex h-[38px] flex-none items-center justify-center rounded-[11px] border border-[#1e2c4d] bg-[#111c36] px-[11px] text-[11px] font-bold text-[#16C7C0] transition-colors hover:border-[#2c3f6b] hover:bg-[#16234a]"
          >
            {speed}×
          </button>
        </div>

        {/* intro overlay */}
        {!started && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[18px] bg-[radial-gradient(80%_60%_at_50%_40%,rgba(13,19,38,.6),rgba(5,8,15,.92))] px-7 text-center backdrop-blur-[2px]">
            <h3 className="max-w-[15ch] text-[clamp(18px,5vw,24px)] font-bold leading-[1.18] text-white">
              Ein Lead trifft ein.{" "}
              <span className="bg-gradient-to-r from-[#16C7C0] to-[#7C5CFF] bg-clip-text text-transparent">
                Was dann passiert, läuft vollautomatisch.
              </span>
            </h3>
            <p className="max-w-[30ch] text-[12.5px] leading-[1.5] text-[#8ea0c8]">
              23 Schritte. Ein Klick. Von Tag 1 bis Tag 730.
            </p>
            <button
              onClick={start}
              className="group relative mt-1 inline-flex items-center gap-[10px] rounded-full bg-gradient-to-r from-[#16C7C0] to-[#2DA8FF] px-[26px] py-[15px] text-[14.5px] font-bold text-[#06101e] shadow-[0_10px_30px_rgba(45,168,255,.45)] transition-transform hover:-translate-y-0.5"
            >
              <span className="absolute -inset-1.5 animate-ping rounded-full border-2 border-[#16C7C0] opacity-60" />
              <Play size={18} className="fill-[#06101e]" />
              Lead eintreffen lassen
            </button>
          </div>
        )}
      </div>

      {/* hint */}
      <p className="mx-auto mt-4 max-w-[520px] text-center text-[11px] text-[#9fb0c8]">
        Tippe oder fahre über einen Schritt für Details · ↺ erneut abspielen. Der KI-Terminanruf ist transparent als
        KI gekennzeichnet.
      </p>
    </section>
  )
}
