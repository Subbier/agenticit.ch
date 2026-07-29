"use client"

import { useState } from "react"
import { useConversation, ConversationProvider } from "@elevenlabs/react"
import { Mic, PhoneOff, Loader2 } from "lucide-react"

function VoiceAgentInner({ theme }: { theme?: "carbon" }) {
  const conversation = useConversation()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  const status = conversation.status
  const connected = status === "connected"
  const carbon = theme === "carbon"

  async function start() {
    setError("")
    setBusy(true)
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      const res = await fetch("/api/voice/token", { cache: "no-store" })
      const data = (await res.json().catch(() => ({}))) as { token?: string }
      if (!res.ok || !data.token) {
        setError("Der Assistent ist gerade nicht verfügbar. Bitte später erneut versuchen.")
        return
      }
      await conversation.startSession({ conversationToken: data.token, connectionType: "webrtc" })
    } catch {
      setError("Mikrofonzugriff nötig, um mit dem Assistenten zu sprechen.")
    } finally {
      setBusy(false)
    }
  }

  async function stop() {
    await conversation.endSession()
  }

  return (
    <div
      className={
        carbon
          ? "mx-auto mt-8 flex max-w-[460px] flex-col items-center gap-5 rounded-[16px] border border-[#E1E4E8] bg-[#F1F3F5] p-8"
          : "mx-auto mt-8 flex max-w-[460px] flex-col items-center gap-5 rounded-[22px] border border-[#E3E9F2] bg-white p-8 shadow-[0_18px_48px_rgba(11,31,58,0.12)]"
      }
    >
      <div
        className={`grid h-20 w-20 place-items-center rounded-full transition ${
          carbon
            ? connected
              ? conversation.isSpeaking
                ? "animate-pulse bg-[#1F9A5E]"
                : "bg-[#8FE05A]"
              : "bg-[#1F9A5E]"
            : connected
              ? conversation.isSpeaking
                ? "animate-pulse bg-gradient-to-br from-[#16C7C0] to-[#0a8f89]"
                : "bg-gradient-to-br from-[#3BD974] to-[#22C55E]"
              : "bg-gradient-to-br from-[#16C7C0] to-[#0a8f89]"
        }`}
      >
        <Mic className={`h-9 w-9 ${carbon && connected && !conversation.isSpeaking ? "text-[#122400]" : "text-white"}`} />
      </div>

      {connected ? (
        <p className={`font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold ${carbon ? "text-[#101418]" : "text-[#0B1F3A]"}`}>
          {conversation.isSpeaking ? "Der Assistent spricht …" : "Sie sind verbunden – sprechen Sie los."}
        </p>
      ) : (
        <p className={`font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold ${carbon ? "text-[#101418]" : "text-[#0B1F3A]"}`}>
          Tippen Sie auf „Gespräch starten" und sprechen Sie.
        </p>
      )}

      {!connected ? (
        <button
          type="button"
          onClick={start}
          disabled={busy || status === "connecting"}
          className={
            carbon
              ? "flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#8FE05A] py-[15px] font-[family-name:var(--font-carbon-text)] text-[16px] font-semibold text-[#122400] transition hover:bg-[#A2E874] disabled:opacity-60"
              : "flex w-full items-center justify-center gap-2 rounded-[13px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] py-[15px] text-[16px] font-extrabold text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)] transition hover:-translate-y-[1px] disabled:opacity-60 disabled:hover:translate-y-0"
          }
        >
          {busy || status === "connecting" ? (
            <>
              <Loader2 className="h-[18px] w-[18px] animate-spin" /> Verbindung …
            </>
          ) : (
            <>
              <Mic className="h-[18px] w-[18px]" /> Gespräch starten
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={stop}
          className={
            carbon
              ? "flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#8FE05A] py-[15px] font-[family-name:var(--font-carbon-text)] text-[16px] font-semibold text-[#122400] transition hover:opacity-90"
              : "flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#8FE05A] py-[15px] text-[16px] font-extrabold text-[#122400] transition hover:-translate-y-[1px]"
          }
        >
          <PhoneOff className="h-[18px] w-[18px]" /> Gespräch beenden
        </button>
      )}

      {error ? <p className="text-[13px] font-semibold text-red-600">{error}</p> : null}
      <p className={`font-[family-name:var(--font-carbon-text)] text-[12.5px] ${carbon ? "text-[#4A545F]" : "text-[#5A6B82]"}`}>
        Mikrofonzugriff erforderlich · Sie hören die echte Stimme des Agenten.
      </p>
    </div>
  )
}

// useConversation benötigt den ConversationProvider als Vorfahren.
export function VoiceAgentWidget({ theme }: { theme?: "carbon" }) {
  return (
    <ConversationProvider>
      <VoiceAgentInner theme={theme} />
    </ConversationProvider>
  )
}
