"use client"

// Schriftlicher KI-Chatbot (unten rechts, global) für AgenticIT.
// Geführter Dialog: kommuniziert mit Besuchern und vereinbart einen
// Rückruftermin (Name, Telefon, optional E-Mail, Thema, Tag + Uhrzeit).
// Die Buchung geht an /api/callback (Zoho-Termin + Bestätigungsmail).
// Klare KI-Kennzeichnung gemäss Transparenzpflicht.

import { useEffect, useRef, useState } from "react"
import { Send, X, Check } from "lucide-react"

type Phase =
  | "greeting"
  | "ask_name"
  | "ask_phone"
  | "ask_email"
  | "ask_topic"
  | "ask_day"
  | "ask_time"
  | "confirm"
  | "submitting"
  | "done"
  | "error"

type QuickReply = { label: string; value: string }
type Msg = { id: number; from: "bot" | "user"; text: string }

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

function nextBusinessDays(count: number): QuickReply[] {
  const out: QuickReply[] = []
  const d = new Date()
  while (out.length < count) {
    d.setDate(d.getDate() + 1)
    const day = d.getDay()
    if (day === 0 || day === 6) continue // Wochenende überspringen
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    out.push({ label: `${WEEKDAYS[day]} ${dd}.${m}.`, value: `${y}-${m}-${dd}` })
  }
  return out
}

function dayLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  const dt = new Date(y, m - 1, d)
  return `${WEEKDAYS[dt.getDay()]} ${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.`
}

function isPhone(v: string): boolean {
  return v.replace(/[^0-9]/g, "").length >= 6
}
function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.04 4C9.96 4 5 8.95 5 15.02c0 2.4.77 4.62 2.08 6.43L5 28l6.74-2.04a11 11 0 0 0 4.3.87h.01c6.08 0 11.03-4.95 11.03-11.02C27.08 8.95 22.12 4 16.04 4Zm0 19.95h-.01a9.2 9.2 0 0 1-4.68-1.28l-.34-.2-3.5 1.06.94-3.41-.22-.35a9.13 9.13 0 0 1-1.4-4.85c0-5.05 4.12-9.16 9.18-9.16 2.45 0 4.75.96 6.48 2.69a9.1 9.1 0 0 1 2.68 6.48c0 5.05-4.12 9.16-9.18 9.16Zm5.03-6.86c-.27-.14-1.63-.8-1.88-.9-.25-.09-.43-.13-.62.14-.18.27-.71.9-.87 1.08-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.98 2.66 1.12 2.85c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.18-.52-.32Z" />
    </svg>
  )
}

type Booking = { name: string; phone: string; email: string; topic: string; date: string; time: string }
const EMPTY: Booking = { name: "", phone: "", email: "", topic: "", date: "", time: "" }

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>("greeting")
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
            "Hallo und herzlich willkommen bei AgenticIT. Ich bin Mia, die automatisierte KI-Assistentin. Gerne vereinbare ich für Sie einen kostenlosen, unverbindlichen Rückruf. Womit dürfen wir helfen?",
        },
      ])
      setQuickReplies([
        { label: "Rückruf vereinbaren", value: "intent_callback" },
        { label: "Kostenlose Analyse", value: "intent_analyse" },
        { label: "Frage zu euren Leistungen", value: "intent_info" },
      ])
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
    pushBot("Sehr gern. Wie ist Ihr Name?")
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
          topic: b.topic,
          callback_date: b.date,
          callback_time: b.time,
          consent: true,
        }),
      })
      if (!res.ok) throw new Error("bad status")
      setPhase("done")
      pushBot(
        `Perfekt, ${b.name.split(" ")[0]}! Ihr Rückruf ist eingetragen für ${dayLabel(b.date)} um ${b.time} Uhr. Wir rufen Sie unter ${b.phone} an${
          b.email ? " – eine Bestätigung geht an Ihre E-Mail" : ""
        }. Wir freuen uns auf das Gespräch.`,
      )
    } catch {
      setPhase("error")
      pushBot(
        "Das hat leider nicht geklappt. Rufen Sie uns am einfachsten direkt an: 044 505 20 27 – wir kümmern uns sofort.",
      )
    }
  }

  // Zentrale Dialog-Logik
  function process(value: string, display?: string) {
    if (display !== "") pushUser(display ?? value)

    switch (phase) {
      case "greeting": {
        if (value === "intent_analyse") {
          pushBot(
            "Unsere kostenlose KI-Analyse zeigt in wenigen Minuten Ihre grössten Wachstums- und Effizienz-Hebel. Am besten besprechen wir das Ergebnis kurz persönlich – soll ich einen Rückruf einrichten?",
            [{ label: "Ja, Rückruf vereinbaren", value: "intent_callback" }],
          )
          return
        }
        if (value === "intent_info") {
          pushBot(
            "Wir bauen Wachstumsmotoren: KI-Agenten, Omnichannel-Automation, Lead-Generierung und RevOps – End-to-End. Die Details klären wir am schnellsten im kurzen Gespräch. Darf ich einen Rückruf für Sie vereinbaren?",
            [{ label: "Ja, gerne", value: "intent_callback" }],
          )
          return
        }
        // Standard: Buchung starten (auch bei Freitext)
        startBooking()
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
        pushBot(`Danke, ${name.split(" ")[0]}. Unter welcher Telefonnummer dürfen wir Sie zurückrufen?`)
        return
      }
      case "ask_phone": {
        if (!isPhone(value)) {
          pushBot("Das sieht nicht nach einer gültigen Nummer aus. Bitte geben Sie Ihre Telefonnummer ein (z. B. 079 123 45 67).")
          return
        }
        setBooking((b) => ({ ...b, phone: value.trim() }))
        setPhase("ask_email")
        pushBot("Möchten Sie eine E-Mail-Bestätigung? Dann geben Sie bitte Ihre E-Mail an – oder überspringen Sie diesen Schritt.", [
          { label: "Überspringen", value: "skip_email" },
        ])
        return
      }
      case "ask_email": {
        if (value !== "skip_email") {
          if (!isEmail(value)) {
            pushBot("Diese E-Mail-Adresse scheint nicht zu stimmen. Bitte erneut eingeben – oder überspringen.", [
              { label: "Überspringen", value: "skip_email" },
            ])
            return
          }
          setBooking((b) => ({ ...b, email: value.trim() }))
        }
        setPhase("ask_topic")
        pushBot("Worum geht es bei Ihnen?", [
          { label: "Website / Online-Auftritt", value: "Website / Online-Auftritt" },
          { label: "Automatisierung", value: "Automatisierung" },
          { label: "Lead-Generierung", value: "Lead-Generierung" },
          { label: "RevOps / Skalierung", value: "RevOps / Skalierung" },
          { label: "Sonstiges", value: "Sonstiges" },
        ])
        return
      }
      case "ask_topic": {
        setBooking((b) => ({ ...b, topic: value.trim() }))
        setPhase("ask_day")
        pushBot("An welchem Tag passt es Ihnen am besten?", nextBusinessDays(5))
        return
      }
      case "ask_day": {
        const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ""
        if (!iso) {
          pushBot("Bitte wählen Sie einen der vorgeschlagenen Tage.", nextBusinessDays(5))
          return
        }
        setBooking((b) => ({ ...b, date: iso }))
        setPhase("ask_time")
        pushBot("Und zu welcher Uhrzeit?", TIME_SLOTS.map((t) => ({ label: `${t} Uhr`, value: t })))
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
          `Bitte kurz prüfen:\n• Name: ${next.name}\n• Telefon: ${next.phone}${next.email ? `\n• E-Mail: ${next.email}` : ""}${
            next.topic ? `\n• Thema: ${next.topic}` : ""
          }\n• Rückruf: ${dayLabel(next.date)} um ${next.time} Uhr\n\nMit „Termin bestätigen“ stimmen Sie der Kontaktaufnahme zu (Datenschutz: agenticit.ch/datenschutz).`,
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
          setBooking((b) => ({ ...b, topic: "", date: "", time: "" }))
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
  const showInput = !["ask_topic", "ask_day", "ask_time", "confirm", "done", "submitting"].includes(phase)

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      {/* Chat-Fenster */}
      <div
        role="dialog"
        aria-label="Chat mit der AgenticIT KI-Assistentin"
        aria-hidden={!open}
        className={`flex w-[min(370px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[#E3E9F2] bg-white shadow-[0_24px_60px_rgba(11,31,58,0.28)] transition-all duration-300 ${
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-r from-[#0B1F3A] to-[#13294B] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#16C7C0] to-[#0a8f89] text-white ring-2 ring-white/15">
              <WaIcon className="h-6 w-6" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0B1F3A] bg-[#5ee0da]" />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-tight text-white">AgenticIT</p>
              <p className="text-[12px] leading-tight text-[#5ee0da]">Mia · KI-Assistentin · online</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Chat schließen"
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
              <div
                key={m.id}
                className="max-w-[88%] self-start whitespace-pre-line rounded-2xl rounded-tl-md bg-[#F1F8FF] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#0B1F3A] ring-1 ring-[#E3E9F2]"
              >
                {m.text}
              </div>
            ) : (
              <div
                key={m.id}
                className="max-w-[88%] self-end whitespace-pre-line rounded-2xl rounded-tr-md bg-gradient-to-br from-[#16C7C0] to-[#0a8f89] px-3.5 py-2.5 text-[13.5px] font-medium leading-relaxed text-white"
              >
                {m.text}
              </div>
            ),
          )}

          {typing && (
            <div className="flex items-center gap-1 self-start rounded-2xl rounded-tl-md bg-[#F1F8FF] px-3.5 py-3 ring-1 ring-[#E3E9F2]">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#5A6B82] [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#5A6B82] [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#5A6B82]" />
            </div>
          )}

          {/* Schnellantworten */}
          {!typing && quickReplies.length > 0 && (
            <div className="flex flex-col items-start gap-2 pt-1">
              {quickReplies.map((qr) => (
                <button
                  key={qr.value}
                  onClick={() => handleQuick(qr)}
                  className="rounded-full border border-[#16C7C0]/40 bg-[#16C7C0]/10 px-3.5 py-1.5 text-left text-[13px] font-medium text-[#0a8f89] transition-colors hover:border-[#16C7C0] hover:bg-[#16C7C0]/20 hover:text-[#0B1F3A]"
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {phase === "done" && (
            <div className="mt-1 flex items-center gap-1.5 self-start text-[12px] font-semibold text-[#0a8f89]">
              <Check className="h-4 w-4" /> Termin eingetragen
            </div>
          )}
        </div>

        {/* Eingabe */}
        {showInput ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#E3E9F2] bg-white px-3 py-3">
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              disabled={inputDisabled}
              placeholder="Nachricht schreiben …"
              aria-label="Ihre Nachricht"
              className="min-w-0 flex-1 rounded-full bg-[#F1F8FF] px-4 py-2.5 text-[14px] text-[#0B1F3A] outline-none ring-1 ring-[#E3E9F2] placeholder:text-[#5A6B82] focus:ring-[#16C7C0]/60 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={inputDisabled}
              aria-label="Senden"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#16C7C0] to-[#0a8f89] text-white shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        ) : (
          <div className="border-t border-[#E3E9F2] bg-white px-4 py-2.5 text-center text-[11px] text-[#5A6B82]">
            Automatisierter Assistent · DSG-konform · Daten in der Schweiz
          </div>
        )}
      </div>

      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Chat schließen" : "Chat öffnen"}
        aria-expanded={open}
        className="group flex items-center gap-2.5 self-end rounded-full bg-gradient-to-br from-[#16C7C0] to-[#0a8f89] py-2.5 pl-2.5 pr-3 text-white shadow-[0_10px_30px_rgba(22,199,192,0.4)] ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 sm:pr-4"
      >
        <span className="grid h-9 w-9 place-items-center">
          {open ? <X className="h-[26px] w-[26px]" /> : <WaIcon className="h-[26px] w-[26px]" />}
        </span>
        <span className="hidden text-[14px] font-bold sm:inline">{open ? "Schließen" : "Chat starten"}</span>
      </button>
    </div>
  )
}
