"use client"

import Link from "next/link"
import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { ArrowLeft, ArrowRight, Check, Download, Loader2 } from "lucide-react"
import { websiteQuestions, type WebsiteBrief } from "@/lib/webdesign-brief"
import { WebsiteOptionArt } from "./website-option-art"
import { LeadPdfPreview } from "./lead-pdf-preview"
import styles from "./webdesign-check.module.css"

export function WebdesignCheck() {
  const [answers, setAnswers] = useState<Partial<WebsiteBrief>>({ version: 1 })
  const [step, setStep] = useState(0)
  const [contact, setContact] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [download, setDownload] = useState("")
  const heading = useRef<HTMLHeadingElement>(null)
  const first = useRef(true)
  const groupId = useId()
  const question = websiteQuestions[step]
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    heading.current?.focus()
  }, [step, contact, download])
  useEffect(
    () => () => {
      if (download) URL.revokeObjectURL(download)
    },
    [download],
  )
  function next() {
    if (!answers[question.id]) return
    if (step === 4) setContact(true)
    else setStep(step + 1)
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy || download) return
    setBusy(true)
    setError("")
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch("/api/website-brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "journey-check",
          websiteBrief: answers,
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          consent: form.get("consent") === "on",
          company_website: form.get("company_website"),
        }),
      })
      if (
        !response.ok ||
        !response.headers.get("content-type")?.includes("application/pdf")
      ) {
        const data = await response.json().catch(() => ({}))
        throw new Error(
          data.message ||
            "Ihre Anfrage wurde noch nicht übermittelt. Bitte versuchen Sie es erneut.",
        )
      }
      setDownload(URL.createObjectURL(await response.blob()))
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Bitte versuchen Sie es erneut.",
      )
    } finally {
      setBusy(false)
    }
  }
  return (
    <section
      className={styles.wrap}
      aria-label="Ihr Website-Kompass"
      data-webdesign-check="true"
    >
      <div className={styles.intro}>
        <h2>Welche Website passt zu Ihnen?</h2>
        <p>Fünf kurze Fragen. Ihr persönliches Website-Konzept als PDF.</p>
      </div>
      <div className={styles.panel}>
        <div className={styles.progress}>
          <span>
            {download
              ? "Ihr Konzept ist bereit"
              : contact
                ? "Ihr persönliches PDF"
                : `Frage ${step + 1} von 5`}
          </span>
          <progress
            max={5}
            value={contact || download ? 5 : step + 1}
            aria-label="Fortschritt"
          />
        </div>
        {download ? (
          <div className={styles.result}>
            <h3 ref={heading} tabIndex={-1}>
              Ihr Website-Konzept liegt bereit.
            </h3>
            <p>
              Ihre Website-Art, eine passende Seitenstruktur und Ihre
              Gestaltungsidee auf einer Seite.
            </p>
            <a
              className={styles.primary}
              href={download}
              download="AgenticIT-Mein-Website-Konzept.pdf"
            >
              <Download size={18} />
              Mein Website-Konzept herunterladen
            </a>
          </div>
        ) : contact ? (
          <form onSubmit={submit}>
            <LeadPdfPreview website />
            <h3 ref={heading} tabIndex={-1}>
              Für wen dürfen wir das Konzept erstellen?
            </h3>
            <p className={styles.contactIntro}>
              Ihre Auswahl wird zu einem persönlichen PDF – mit Seitenstruktur,
              Bildsprache und einer passenden Hauptaktion.
            </p>
            <div className={styles.contactFields}>
              <label>
                Name
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                />
              </label>
              <label>
                Unternehmen
                <input
                  name="company"
                  required
                  minLength={2}
                  maxLength={160}
                  autoComplete="organization"
                />
              </label>
              <label className={styles.full}>
                E-Mail
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={180}
                  autoComplete="email"
                />
              </label>
            </div>
            <div className={styles.honey} aria-hidden="true">
              <label>
                Website
                <input
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" required />
              <span>
                Ich möchte mein Website-Konzept erhalten. AgenticIT darf meine
                Angaben dafür verarbeiten und mich zu dieser Anfrage
                kontaktieren.{" "}
                <Link
                  href="/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Datenschutz
                </Link>
              </span>
            </label>
            <p className={styles.note}>
              Kein Newsletter. Sie können einer weiteren Kontaktaufnahme
              jederzeit widersprechen.
            </p>
            {error ? (
              <p role="alert" className={styles.error}>
                {error}
              </p>
            ) : null}
            <div className={styles.actions}>
              <button
                className={styles.back}
                type="button"
                disabled={busy}
                onClick={() => {
                  setContact(false)
                  setError("")
                }}
              >
                <ArrowLeft size={17} />
                Zurück
              </button>
              <button className={styles.primary} type="submit" disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 size={17} />
                    Wird erstellt …
                  </>
                ) : (
                  <>
                    Mein Website-Konzept erhalten
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <>
            <fieldset className={styles.question}>
              <legend>
                <span className={styles.eyebrow}>{question.label}</span>
                <h3 ref={heading} tabIndex={-1}>
                  {question.title}
                </h3>
              </legend>
              <div className={styles.options}>
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.value
                  return (
                    <label
                      key={option.value}
                      className={`${styles.option} ${selected ? styles.selected : ""}`}
                    >
                      <input
                        type="radio"
                        name={`${groupId}-${question.id}`}
                        value={option.value}
                        checked={selected}
                        onChange={() =>
                          setAnswers({
                            ...answers,
                            [question.id]: option.value,
                          })
                        }
                      />
                      <div className={styles.picture}>
                        <WebsiteOptionArt
                          variant={option.visual}
                          selected={selected}
                        />
                      </div>
                      <div className={styles.optionText}>
                        <span className={styles.radio} aria-hidden="true">
                          {selected ? <Check size={13} /> : null}
                        </span>
                        <span>
                          <strong>{option.title}</strong>
                          <small>{option.caption}</small>
                        </span>
                      </div>
                    </label>
                  )
                })}
              </div>
            </fieldset>
            <div className={styles.actions}>
              {step > 0 ? (
                <button
                  type="button"
                  className={styles.back}
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft size={17} />
                  Zurück
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                className={styles.primary}
                disabled={!answers[question.id]}
                onClick={next}
              >
                {step === 4 ? "Mein Konzept sichern" : "Weiter"}
                <ArrowRight size={17} />
              </button>
            </div>
            <p className={styles.note}>
              Ihr PDF erhalten Sie am Schluss nach Eingabe Ihrer Kontaktdaten.
              Die Bilder zeigen beispielhafte Gestaltungen.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
