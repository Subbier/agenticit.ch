"use client"

import { useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Phone,
  ShieldCheck,
  Video,
} from "lucide-react"
import {
  healthInsurers,
  TEST_LEAD_CALL_NOTICE,
  TEST_LEAD_CONSENT,
  TEST_LEAD_CONSENT_VERSION,
  testLeadSchema,
} from "@/lib/test-leads"
import styles from "./insurance-lead.module.css"

export function InsuranceLeadPage() {
  const [status, setStatus] = useState<"editing" | "sending" | "sent">(
    "editing",
  )
  const [error, setError] = useState("")
  const [receipt, setReceipt] = useState("")
  const [callback, setCallback] = useState("")
  const requestId = useRef("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    requestId.current ||= crypto.randomUUID()
    const current = Object.fromEntries(new FormData(event.currentTarget))
    const result = testLeadSchema.safeParse({
      ...current,
      requestId: requestId.current,
      consent: current.consent === "on",
      consentVersion: TEST_LEAD_CONSENT_VERSION,
      companyWebsite: current.companyWebsite || "",
    })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    setStatus("sending")
    try {
      const response = await fetch("/api/testleads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(25000),
      })
      const answer = await response.json()
      if (!response.ok || !answer.ok || !answer.receiptId)
        throw new Error(
          answer.message ||
            "Deine Anfrage konnte nicht übermittelt werden. Bitte versuche es erneut.",
        )
      setReceipt(answer.receiptId)
      setCallback(answer.callbackLabel || "")
      setStatus("sent")
    } catch (cause) {
      setError(
        cause instanceof Error && cause.name !== "TimeoutError"
          ? cause.message
          : "Die Übermittlung dauert gerade länger. Bitte versuche es nochmals mit denselben Angaben.",
      )
      setStatus("editing")
    }
  }

  return (
    <div className={styles.page} data-site-design="journey">
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="AgenticIT Startseite"
        >
          <img src="/journey-brand.svg" width="32" height="38" alt="" />
          <span>
            Agentic<span>IT</span>
          </span>
        </Link>
        <span className={styles.headerNote}>
          <ShieldCheck size={17} aria-hidden="true" /> Live-Demo mit Mia
        </span>
      </header>
      <main className={styles.main}>
        <section className={styles.intro} aria-labelledby="lead-title">
          <span className={styles.eyebrow}>
            <span /> ERLEBE KI IM GESPRÄCH
          </span>
          <h1 id="lead-title">
            Lead-Terminierung
            <br />
            <em>testen.</em>
          </h1>
          <p className={styles.lead}>
            Trage deine Angaben und die Telefonnummer ein, unter der wir dich
            erreichen können. Sobald deine Angaben gespeichert sind, startet Mia
            den Anruf: eine KI-Assistentin, die mit dir einen Termin vereinbaren
            möchte.
          </p>
          <a href="#testformular" className={styles.mobileStart}>
            Testlead ausfüllen <ArrowRight size={17} aria-hidden="true" />
          </a>
          <ol className={styles.steps}>
            <li>
              <span>01</span>
              <div>
                <strong>Formular ausfüllen.</strong>
                <p>
                  Die Krankenkassen-Angaben bilden den Gesprächskontext. Für
                  diese Demo kannst du Beispieldaten verwenden.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Abheben und ganz normal sprechen.</strong>
                <p>
                  Mia ist als Call-Agent konfiguriert und führt dich durch das
                  Gespräch.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Einen Termin vereinbaren.</strong>
                <p>
                  Mia findet mit dir am Telefon einen freien Termin bei Sabir
                  Rastoder – für ein Telefon- oder Videogespräch.
                </p>
              </div>
            </li>
          </ol>
          <div className={styles.testTip}>
            <span className={styles.eyebrow}>DEIN PART IM TEST</span>
            <h2>Mach es Mia nicht zu einfach.</h2>
            <p>
              Verhalte dich ganz normal. Stelle auch einen Einwand und höre, wie
              Mia reagiert.
            </p>
            <blockquote>«Können Sie mir das nicht einfach senden?»</blockquote>
            <blockquote>«Ich habe gerade keine Zeit.»</blockquote>
          </div>
          <div className={styles.contactModes}>
            <span>
              <Phone size={15} aria-hidden="true" /> Telefon
            </span>
            <span>
              <Video size={16} aria-hidden="true" /> Video
            </span>
            <span>
              <Clock3 size={16} aria-hidden="true" /> 30 Minuten
            </span>
          </div>
        </section>
        <section
          id="testformular"
          className={styles.card}
          aria-labelledby="form-title"
        >
          {status === "sent" ? (
            <div className={styles.success} role="status" aria-live="polite">
              <CheckCircle2 size={48} strokeWidth={1.4} aria-hidden="true" />
              <span className={styles.eyebrow}>TESTLEAD ANGELEGT</span>
              <h2 id="form-title">Dein Test läuft. Mia ruft dich an.</h2>
              <p>
                Halte dein Telefon bereit: Mia ruft dich an und versucht, mit
                dir einen Termin bei Sabir zu vereinbaren.
              </p>
              {callback && (
                <div className={styles.callback}>
                  <Clock3 size={19} aria-hidden="true" />
                  <span>{callback}</span>
                </div>
              )}
              <p className={styles.fine}>
                Sprich ganz normal mit Mia und bring gerne einen Einwand ein.
                Ein Termin wird erst nach deiner Bestätigung im Gespräch
                gebucht.
              </p>
              <p className={styles.fine}>Deine Referenz: {receipt}</p>
              <Link href="/" className={styles.textLink}>
                Zur AgenticIT-Webseite <ArrowRight size={16} />{" "}
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.cardTop}>
                <span className={styles.eyebrow}>DEIN TESTLEAD</span>
              </div>
              <h2 id="form-title" className={styles.formTitle}>
                Teste Mia im Gespräch.
              </h2>
              <p className={styles.cardIntro}>
                Einmal ausfüllen. Telefon bereithalten.
              </p>
              <form onSubmit={submit} className={styles.form}>
                <div className={styles.grid}>
                  <label>
                    Vollständiger Name
                    <input
                      name="fullName"
                      autoComplete="name"
                      placeholder="Vorname und Nachname"
                      required
                      minLength={2}
                      maxLength={120}
                    />
                  </label>
                  <label>
                    Geschlecht
                    <select name="gender" defaultValue="" required>
                      <option value="" disabled>
                        Bitte auswählen
                      </option>
                      <option value="female">weiblich</option>
                      <option value="male">männlich</option>
                    </select>
                  </label>
                  <label>
                    Geburtsdatum
                    <input
                      name="birthDate"
                      type="date"
                      autoComplete="bday"
                      min="1900-01-01"
                      max={new Date().toISOString().slice(0, 10)}
                      required
                    />
                  </label>
                  <label>
                    Postleitzahl
                    <input
                      name="postcode"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="z. B. 3000"
                      pattern="[1-9][0-9]{3}"
                      maxLength={4}
                      required
                    />
                  </label>
                  <label>
                    Ort
                    <input
                      name="city"
                      autoComplete="address-level2"
                      placeholder="Dein Wohnort"
                      required
                      minLength={2}
                      maxLength={100}
                    />
                  </label>
                  <label>
                    Weitere Familienmitglieder
                    <select name="familyMembers" defaultValue="0" required>
                      <option value="0">Nur ich</option>
                      {Array.from({ length: 15 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} weitere {i === 0 ? "Person" : "Personen"}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.full}>
                    Jetzige Krankenkasse
                    <select name="insurer" defaultValue="" required>
                      <option value="" disabled>
                        Bitte auswählen
                      </option>
                      {healthInsurers.map((insurer) => (
                        <option key={insurer}>{insurer}</option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.full}>
                    Telefonnummer
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="079 123 45 67"
                      required
                      maxLength={40}
                    />
                    <small>{TEST_LEAD_CALL_NOTICE}</small>
                  </label>
                  <label className={styles.full}>
                    E-Mail-Adresse
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@beispiel.ch"
                      required
                      maxLength={180}
                    />
                  </label>
                  <label className={styles.honeypot} aria-hidden="true">
                    Webseite
                    <input
                      name="companyWebsite"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                  <label className={[styles.consent, styles.full].join(" ")}>
                    <input type="checkbox" name="consent" required />
                    <span>{TEST_LEAD_CONSENT}</span>
                  </label>
                </div>
                {error && (
                  <p role="alert" className={styles.error}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <LoaderCircle className={styles.spin} size={19} /> Wird
                      übermittelt …
                    </>
                  ) : (
                    <>
                      Lead-Terminierung testen
                      <ArrowRight size={19} aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className={styles.formNote}>
                  <Check size={14} aria-hidden="true" /> KI-Testanruf{" "}
                  <span>·</span> Nur eigene oder freigegebene Nummern
                </p>
              </form>
            </>
          )}
        </section>
      </main>
      <footer id="footer" className={styles.footer}>
        <details id="datenschutz">
          <summary>Deine Daten im Test</summary>
          <p>
            AgenticIT GmbH verarbeitet deine Testangaben im separaten CRM-Modul
            TestLeads. Mia ist die KI-Assistentin der FAIR Beratung GmbH und
            führt den von dir gewünschten Testanruf aus. Der Testanruf wird zur
            Qualitätsprüfung aufgezeichnet. Deine ausgewählte Krankenkasse
            erhält keine Anfrage. Eingesetzte Dienste: Zoho CRM, Aircall,
            Calendly und Google Kalender. Ein Google-Meet-Link wird nur für
            einen vereinbarten Videotermin erstellt. Auskunft, Berichtigung,
            Löschung oder Kontaktstopp:{" "}
            <a href="mailto:sr@agenticit.ch">sr@agenticit.ch</a>. Weitere
            Informationen stehen in unserer{" "}
            <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </p>
        </details>
        <div>
          <span>
            © {new Date().getFullYear()} AgenticIT GmbH · Bern, Schweiz
          </span>
          <nav aria-label="Rechtliches">
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/impressum">Impressum</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
