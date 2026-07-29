// Einwilligungsverwaltung für agenticit.ch (revDSG / DSGVO)
//
// Zusammenspiel mit dem GTM-Container GTM-K4TN9PVZ:
//   • GA4 ("GA4 - Config") reagiert auf Google Consent Mode v2 → `analytics_storage`.
//   • Meta Pixel, TikTok Pixel und Zoho SalesIQ hängen im Container am Trigger
//     "Trigger - Consent Marketing erteilt", also am dataLayer-Ereignis
//     `consent_marketing_granted`. Ohne dieses Ereignis feuern sie nie.
//
// Neue Marketing-Tools daher IMMER an denselben Trigger hängen — dann greift die
// Einwilligung automatisch, ohne dass der Seiten-Code angefasst werden muss.

export const CONSENT_STORAGE_KEY = "agenticit-consent-v1"

/** Ereignis, mit dem der Footer-Link „Cookie-Einstellungen" den Dialog erneut öffnet. */
export const CONSENT_REOPEN_EVENT = "agenticit:open-consent"

export type ConsentChoice = {
  /** Reichweitenmessung (Google Analytics 4). */
  statistics: boolean
  /** Meta Pixel, TikTok Pixel, Zoho SalesIQ. */
  marketing: boolean
  /** Zeitpunkt der Entscheidung (ISO 8601) — Nachweisbarkeit. */
  decidedAt: string
  /** Version des Einwilligungstextes. Erhöhen, wenn sich die Kategorien ändern. */
  version: 1
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

/**
 * Kanonische gtag-Implementierung: Consent Mode erwartet das `arguments`-Objekt
 * im dataLayer, nicht ein gewöhnliches Array. Deshalb eine parameterlose
 * Funktion (nur so ist `arguments` zulässig) mit vorgelagerter Typangabe.
 */
const gtag: (...args: unknown[]) => void = function () {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>
    if (parsed?.version !== 1) return null
    return {
      statistics: Boolean(parsed.statistics),
      marketing: Boolean(parsed.marketing),
      decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : new Date().toISOString(),
      version: 1,
    }
  } catch {
    // Privater Modus oder blockierter Speicher: lieber erneut fragen als raten.
    return null
  }
}

export function writeConsent(choice: Pick<ConsentChoice, "statistics" | "marketing">): ConsentChoice {
  const full: ConsentChoice = { ...choice, decidedAt: new Date().toISOString(), version: 1 }
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(full))
  } catch {
    // Kein Speicher verfügbar → Entscheidung gilt nur für diesen Seitenaufruf.
  }
  return full
}

export function clearConsent() {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    /* nichts zu tun */
  }
}

/**
 * Meldet die Entscheidung an Google Consent Mode und löst die dataLayer-Ereignisse
 * aus, an denen die GTM-Tags hängen. Wirkt sofort — kein Neuladen nötig.
 */
export function applyConsent(choice: Pick<ConsentChoice, "statistics" | "marketing">) {
  if (typeof window === "undefined") return

  gtag("consent", "update", {
    analytics_storage: choice.statistics ? "granted" : "denied",
    ad_storage: choice.marketing ? "granted" : "denied",
    ad_user_data: choice.marketing ? "granted" : "denied",
    ad_personalization: choice.marketing ? "granted" : "denied",
  })

  window.dataLayer = window.dataLayer || []
  const dl = window.dataLayer as unknown[]

  if (choice.statistics) dl.push({ event: "consent_statistics_granted" })
  if (choice.marketing) dl.push({ event: "consent_marketing_granted" })

  dl.push({
    event: "consent_update",
    consent_statistics: choice.statistics ? "granted" : "denied",
    consent_marketing: choice.marketing ? "granted" : "denied",
  })
}

/**
 * Läuft als `beforeInteractive`-Script, also VOR dem GTM-Loader.
 * Setzt alle nicht notwendigen Kategorien auf „denied" und spielt eine bereits
 * getroffene Entscheidung sofort wieder ein — sonst würde GA4 beim ersten
 * Seitenaufbau kurz ohne Einwilligung messen.
 */
export const CONSENT_DEFAULT_SCRIPT = `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('consent','default',{
    ad_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    analytics_storage:'denied',
    functionality_storage:'granted',
    security_storage:'granted',
    wait_for_update: 500
  });
  try {
    var raw = window.localStorage.getItem('${CONSENT_STORAGE_KEY}');
    if (raw) {
      var c = JSON.parse(raw);
      if (c && c.version === 1) {
        gtag('consent','update',{
          analytics_storage: c.statistics ? 'granted' : 'denied',
          ad_storage: c.marketing ? 'granted' : 'denied',
          ad_user_data: c.marketing ? 'granted' : 'denied',
          ad_personalization: c.marketing ? 'granted' : 'denied'
        });
        if (c.statistics) window.dataLayer.push({ event: 'consent_statistics_granted' });
        if (c.marketing) window.dataLayer.push({ event: 'consent_marketing_granted' });
      }
    }
  } catch (e) {}
})();
`
