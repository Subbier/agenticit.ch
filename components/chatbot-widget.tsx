"use client"

// Mia — die KI-Assistentin von AgenticIT (unten rechts, global).
// Beantwortet die häufigsten Fragen kurz und verständlich und vereinbart
// einen Rückruf auf den nächsten Arbeitstag (Wochenenden und Berner
// Feiertage werden übersprungen). Die Buchung geht an /api/callback.
// Klare KI-Kennzeichnung gemäss Transparenzpflicht.

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Send, X } from "lucide-react"

// Auf diesen Seiten wird der AgenticIT-Chat ausgeblendet
// (z. B. Kampagnenseiten mit eigenem Fremd-Branding).
const HIDDEN_PATHS = ["/kktermin"]

type Phase =
  | "menu"
  | "ask_name"
  | "ask_phone"
  | "ask_email"
  | "ask_time"
  | "confirm"
  | "submitting"
  | "done"
  | "error"

type QuickReply = { label: string; value: string }
type Msg = { id: number; from: "bot" | "user"; text: string }

const WEEKDAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

const CONTACT_MAIL = "info@agenticit.ch"
const CONTACT_PHONE = "031 539 44 44"

/** Ostersonntag nach Meeus/Jones/Butcher — Basis für die beweglichen Feiertage. */
function easterSunday(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function iso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function plusDays(d: Date, n: number): Date {
  const out = new Date(d)
  out.setDate(out.getDate() + n)
  return out
}

/** Gesetzliche Feiertage im Kanton Bern. */
function bernHolidays(year: number): Set<string> {
  const easter = easterSunday(year)
  return new Set([
    `${year}-01-01`, // Neujahr
    `${year}-01-02`, // Berchtoldstag
    iso(plusDays(easter, -2)), // Karfreitag
    iso(plusDays(easter, 1)), // Ostermontag
    iso(plusDays(easter, 39)), // Auffahrt
    iso(plusDays(easter, 50)), // Pfingstmontag
    `${year}-08-01`, // Bundesfeier
    `${year}-12-25`, // Weihnachten
    `${year}-12-26`, // Stephanstag
  ])
}

/** Nächster Arbeitstag: kein Samstag, kein Sonntag, kein Berner Feiertag. */
function nextBusinessDay(from: Date = new Date()): { iso: string; label: string } {
  let d = plusDays(from, 1)
  for (let guard = 0; guard < 30; guard++) {
    const weekday = d.getDay()
    const isWeekend = weekday === 0 || weekday === 6
    const isHoliday = bernHolidays(d.getFullYear()).has(iso(d))
    if (!isWeekend && !isHoliday) break
    d = plusDays(d, 1)
  }
  const label = `${WEEKDAYS[d.getDay()]}, ${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`
  return { iso: iso(d), label }
}

function isPhone(v: string): boolean {
  return v.replace(/[^0-9]/g, "").length >= 6
}
function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

const MENU: QuickReply[] = [
  { label: "Was ist RevOps?", value: "faq_revops" },
  { label: "Was ist GTM?", value: "faq_gtm" },
  { label: "Was sind KI-Agenten?", value: "faq_agents" },
  { label: "Rückruf anfordern", value: "intent_callback" },
  { label: "Wie bewerbe ich mich?", value: "faq_jobs" },
]

const ANSWERS: Record<string, string> = {
  faq_revops:
    "RevOps steht für «Revenue Operations». Kurz gesagt: Marketing, Vertrieb und Kundenbetreuung arbeiten nicht mehr als drei getrennte Abteilungen, sondern als ein durchgehender Ablauf mit gemeinsamen Daten und Zielen.\n\nWas Sie davon haben: Keine Anfrage geht verloren, Übergaben stocken nicht mehr, und Sie sehen jederzeit, woher Ihr Umsatz kommt.",
  faq_gtm:
    "GTM heisst «Go-to-Market» – Ihr Weg an den Markt. Er beantwortet vier Fragen: Wen wollen Sie gewinnen? Mit welchem Angebot? Über welche Kanäle? Zu welchem Preis?\n\nWas Sie davon haben: Ein neues Angebot startet nicht ins Leere, sondern bringt von Beginn weg Anfragen – planbar statt zufällig.",
  faq_agents:
    "Ein KI-Agent ist ein digitaler Mitarbeiter. Ein Chatbot antwortet nur; ein Agent erledigt die Aufgabe: Anfragen beantworten, Termine buchen, Offerten nachfassen, Daten ins CRM schreiben.\n\nWas Sie davon haben: Routine läuft rund um die Uhr weiter, ohne Ferien und ohne Wartezeit – mit Ihren Daten sicher in der Schweiz.",
  faq_jobs: `Schön, dass Sie sich für AgenticIT interessieren. Senden Sie uns einfach den Link zu Ihrem Online-Profil auf LinkedIn oder einer vergleichbaren Plattform – Lebenslauf und Anschreiben brauchen wir vorerst nicht.\n\n• E-Mail: ${CONTACT_MAIL}\n• Telefon: ${CONTACT_PHONE}\n\nMehr über uns als Arbeitgeber: agenticit.ch/karriere`,
}

type Booking = { name: string; phone: string; email: string; date: string; dateLabel: string; time: string }
const EMPTY: Booking = { name: "", phone: "", email: "", date: "", dateLabel: "", time: "" }

export function ChatbotWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>("menu")
  const [messages, setMessages] = useState<Msg[]>([])
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([])
  const [booking, setBooking] = useState<Booking>(EMPTY)
  const [text, setText] = useState("")
  const [typing, setTyping] = useState(false)
  const idRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  function pushBot(text: string, replies: QuickReply[] = []) {
    setTyping(true)
    setQuickReplies([])
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: ++idRef.current, from: "bot", text }])
      setQuickReplies(replies)
      setTyping(false)
    }, 420)
  }
  function pushUser(text: string) {
    setMessages((m) => [...m, { id: ++idRef.current, from: "user", text }])
  }

  // Begrüssung beim ersten Öffnen
  useEffect(() => {
    if (open && !started.current) {
      started.current = true
      setMessages([
        {
          id: ++idRef.current,
          from: "bot",
          text:
            "Hallo, ich bin Mia – die KI-Assistentin von AgenticIT. Ich beantworte Ihre Fragen und vereinbare auf Wunsch einen kostenlosen Rückruf. Womit darf ich helfen?",
        },
      ])
      setQuickReplies(MENU)
    }
  }, [open])

  // Autoscroll + Fokus
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing, quickReplies])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    const t = window.setTimeout(() => inputRef.current?.focus(), 280)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.clearTimeout(t)
    }
  }, [open])

  function startBooking() {
    setPhase("ask_name")
    pushBot("Sehr gern. Wie ist Ihr vollständiger Name?")
  }

  async function submit(b: Booking) {
    setPhase("submitting")
    pushBot("Einen Moment, ich trage Ihren Rückruf ein …")
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: b.name,
          phone: b.phone,
          email: b.email || undefined,
          topic: "Rückruf über Mia (Website-Chat)",
          callback_date: b.date,
          callback_time: b.time,
          consent: true,
        }),
      })
      if (!res.ok) throw new Error("bad status")
      setPhase("done")
      pushBot(
        `Perfekt, ${b.name.split(" ")[0]} – Ihr Rückruf ist eingetragen: ${b.dateLabel} um ${b.time} Uhr. Wir rufen Sie unter ${b.phone} an${
          b.email ? " und schicken Ihnen eine Bestätigung per E-Mail" : ""
        }. Bis dann.`,
      )
    } catch {
      setPhase("error")
      pushBot(
        `Das hat leider nicht geklappt. Am schnellsten erreichen Sie uns direkt: ${CONTACT_PHONE} oder ${CONTACT_MAIL}.`,
      )
    }
  }

  // Zentrale Dialog-Logik
  function process(value: string, display?: string) {
    if (display !== "") pushUser(display ?? value)

    // Fragen aus dem Menü sind jederzeit beantwortbar
    if (ANSWERS[value]) {
      pushBot(ANSWERS[value], [
        { label: "Rückruf anfordern", value: "intent_callback" },
        ...MENU.filter((m) => m.value !== value && m.value !== "intent_callback"),
      ])
      setPhase("menu")
      return
    }
    if (value === "intent_callback") {
      startBooking()
      return
    }

    switch (phase) {
      case "menu": {
        pushBot(
          "Das kläre ich am liebsten persönlich für Sie. Soll ich einen kostenlosen Rückruf vereinbaren – oder interessiert Sie zuerst eines dieser Themen?",
          MENU,
        )
        return
      }
      case "ask_name": {
        const name = value.trim()
        if (name.length < 2) {
          pushBot("Dürfen Sie mir Ihren vollständigen Namen nennen?")
          return
        }
        setBooking((b) => ({ ...b, name }))
        setPhase("ask_phone")
        pushBot(`Danke, ${name.split(" ")[0]}. Unter welcher Telefonnummer erreichen wir Sie?`)
        return
      }
      case "ask_phone": {
        if (!isPhone(value)) {
          pushBot("Das sieht nicht nach einer gültigen Nummer aus. Bitte noch einmal – zum Beispiel 079 123 45 67.")
          return
        }
        setBooking((b) => ({ ...b, phone: value.trim() }))
        setPhase("ask_email")
        pushBot("Möchten Sie eine Bestätigung per E-Mail? Dann geben Sie bitte Ihre Adresse an – sonst überspringen Sie den Schritt.", [
          { label: "Überspringen", value: "skip_email" },
        ])
        return
      }
      case "ask_email": {
        let email = ""
        if (value !== "skip_email") {
          if (!isEmail(value)) {
            pushBot("Diese E-Mail-Adresse scheint nicht zu stimmen. Bitte erneut eingeben – oder überspringen.", [
              { label: "Überspringen", value: "skip_email" },
            ])
            return
          }
          email = value.trim()
        }
        const day = nextBusinessDay()
        setBooking((b) => ({ ...b, email, date: day.iso, dateLabel: day.label }))
        setPhase("ask_time")
        pushBot(
          `Wir rufen Sie am nächsten Arbeitstag zurück: ${day.label}. Welche Uhrzeit passt Ihnen am besten?`,
          TIME_SLOTS.map((t) => ({ label: `${t} Uhr`, value: t })),
        )
        return
      }
      case "ask_time": {
        if (!/^\d{2}:\d{2}$/.test(value)) {
          pushBot("Bitte wählen Sie eine der vorgeschlagenen Uhrzeiten.", TIME_SLOTS.map((t) => ({ label: `${t} Uhr`, value: t })))
          return
        }
        const next = { ...booking, time: value }
        setBooking(next)
        setPhase("confirm")
        pushBot(
          `Bitte kurz prüfen:\n• Name: ${next.name}\n• Telefon: ${next.phone}${next.email ? `\n• E-Mail: ${next.email}` : ""}\n• Rückruf: ${next.dateLabel} um ${next.time} Uhr\n\nMit «Termin bestätigen» stimmen Sie der Kontaktaufnahme zu (Datenschutz: agenticit.ch/datenschutz).`,
          [
            { label: "Termin bestätigen", value: "confirm_booking" },
            { label: "Ändern", value: "restart_booking" },
          ],
        )
        return
      }
      case "confirm": {
        if (value === "confirm_booking") {
          void submit(booking)
        } else {
          setBooking(EMPTY)
          startBooking()
        }
        return
      }
      default:
        return
    }
  }

  function handleQuick(qr: QuickReply) {
    process(qr.value, qr.label)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = text.trim()
    if (!v || typing) return
    setText("")
    process(v)
  }

  const inputDisabled = typing || phase === "submitting" || phase === "done"
  const showInput = !["ask_time", "confirm", "done", "submitting"].includes(phase)

  // Kein AgenticIT-Chat auf Fremd-Branding-Seiten (z. B. /kktermin).
  if (pathname && HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      {/* Chat-Fenster */}
      <div
        role="dialog"
        aria-label="Chat mit Mia, der KI-Assistentin von AgenticIT"
        aria-hidden={!open}
        className={`flex w-[min(370px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[#E1E4E8] bg-white shadow-[0_24px_60px_rgba(10,12,16,0.28)] transition-all duration-300 ${
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-r from-[#0A0C10] to-[#1E2631] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#8FE05A] ring-2 ring-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mia.png" alt="Mia" className="h-full w-full object-cover object-center" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0A0C10] bg-[#34C98A]" />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-tight text-white">Mia</p>
              <p className="text-[12px] leading-tight text-[#34C98A]">KI-Assistentin · online</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Chat schliessen"
              className="ml-auto grid h-8 w-8 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Verlauf */}
        <div ref={scrollRef} className="flex h-[52vh] max-h-[460px] flex-col gap-2.5 overflow-y-auto bg-white px-4 py-4">
          {messages.map((m) =>
            m.from === "bot" ? (
              <p
                key={m.id}
                className="max-w-[88%] self-start whitespace-pre-line rounded-2xl rounded-tl-md bg-[#FAFAF7] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#0A0C10] ring-1 ring-[#E1E4E8]"
              >
                {m.text}
              </p>
            ) : (
              <p
                key={m.id}
                className="max-w-[88%] self-end whitespace-pre-line rounded-2xl rounded-tr-md bg-[#8FE05A] px-3.5 py-2.5 text-[13.5px] font-medium leading-relaxed text-[#122400]"
              >
                {m.text}
              </p>
            ),
          )}
          {typing && (
            <div className="flex items-center gap-1 self-start rounded-2xl rounded-tl-md bg-[#FAFAF7] px-3.5 py-3 ring-1 ring-[#E1E4E8]">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#5A6B82] [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#5A6B82] [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#5A6B82]" />
            </div>
          )}
          {quickReplies.length > 0 && !typing && (
            <div className="mt-1 flex flex-wrap gap-2 self-start">
              {quickReplies.map((qr) => (
                <button
                  key={qr.value}
                  onClick={() => handleQuick(qr)}
                  className="rounded-full border border-[#8FE05A] bg-[#8FE05A] px-3.5 py-1.5 text-left text-[13px] font-semibold text-[#122400] transition-colors hover:bg-[#A2E874]"
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Eingabe */}
        {showInput ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#E1E4E8] bg-white px-3 py-3">
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={inputDisabled}
              placeholder="Ihre Nachricht …"
              aria-label="Ihre Nachricht"
              className="min-w-0 flex-1 rounded-full bg-[#FAFAF7] px-4 py-2.5 text-[14px] text-[#0A0C10] outline-none ring-1 ring-[#E1E4E8] placeholder:text-[#5A6B82] focus:ring-[#8FE05A] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={inputDisabled}
              aria-label="Senden"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#8FE05A] text-[#122400] shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        ) : (
          <div className="border-t border-[#E1E4E8] bg-white px-4 py-2.5 text-center text-[11px] text-[#5A6B82]">
            Automatisierter Assistent · DSG-konform · Daten in der Schweiz
          </div>
        )}
      </div>

      {/* Launcher — Mia als rundes Porträt */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Chat schliessen" : "Chat mit Mia öffnen"}
        aria-expanded={open}
        className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-[#8FE05A] shadow-[0_10px_30px_rgba(10,12,16,0.35)] ring-2 ring-white/80 transition-transform hover:-translate-y-0.5 active:scale-95"
      >
        {open ? (
          <X className="h-7 w-7 text-[#122400]" />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src="/mia.png" alt="Mia, KI-Assistentin von AgenticIT" className="h-full w-full object-cover object-center" />
        )}
        {!open && (
          <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#34C98A]" />
        )}
      </button>
    </div>
  )
}
