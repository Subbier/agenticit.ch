"use client"

// Footer-Link, mit dem Besucher ihre Einwilligung jederzeit ändern oder widerrufen
// können — DSGVO Art. 7 Abs. 3. Öffnet den Consent-Dialog erneut.

import { CONSENT_REOPEN_EVENT } from "@/lib/consent"

export function ConsentSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
      className={className}
    >
      Cookie-Einstellungen
    </button>
  )
}
