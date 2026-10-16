"use client"

import { useId, useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react"
import { KARRIERE_JOBS } from "@/lib/karriere-content"
import styles from "./journey.module.css"
import career from "./careers.module.css"

export function CareerApplication({
  initialPosition = "",
}: {
  initialPosition?: string
}) {
  const formId = useId()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: initialPosition,
    link: "",
    message: "",
  })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  )
  const [honey, setHoney] = useState("")
  const valid =
    form.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.position.length > 0 &&
    consent

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!valid || status === "loading") return
    setStatus("loading")
    try {
      const response = await fetch("/api/karriere", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          position: form.position,
          link: form.link.trim(),
          message: form.message.trim(),
          consent: true,
          company_website: honey,
        }),
      })
      if (!response.ok) throw new Error("Application submission failed")
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      id="bewerbung"
      className={career.application}
      aria-labelledby={`${formId}-title`}
    >
      <div className={`${styles.container} ${career.applicationLayout}`}>
        <div className={career.applicationIntro}>
          <span className={styles.eyebrow}>Der erste Schritt</span>
          <h2 id={`${formId}-title`}>Lernen wir uns kennen.</h2>
          <p>
            Ein paar Zeilen zu Ihnen und ein Link zu Ihrem Profil genügen für
            den Anfang. Den Rest besprechen wir persönlich.
          </p>
          <div className={career.applicationNote}>
            <CheckCircle2 size={20} aria-hidden="true" />
            <span>Wir prüfen jede Bewerbung persönlich.</span>
          </div>
          <a className={styles.textLink} href="mailto:info@agenticit.ch">
            Noch eine Frage? Schreiben Sie uns{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className={career.applicationPanel}>
          {status === "done" ? (
            <div className={career.applicationSuccess} role="status">
              <CheckCircle2 size={36} strokeWidth={1.5} aria-hidden="true" />
              <h3>
                Danke{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Ihre
                Bewerbung wurde übermittelt.
              </h3>
              <p>
                Wir schauen uns Ihre Angaben an und melden uns persönlich bei
                Ihnen.
              </p>
              <Link href="/karriere" className={styles.secondary}>
                Zur Stellenübersicht
              </Link>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className={career.applicationForm}
              aria-busy={status === "loading"}
            >
              <p className={career.formHint}>
                Mit * markierte Felder sind erforderlich.
              </p>
              <fieldset disabled={status === "loading"}>
                <legend className={career.visuallyHidden}>
                  Ihre Bewerbung
                </legend>
                <div className={styles.formGrid}>
                  <label className={styles.field}>
                    Name *
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={120}
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                    />
                  </label>
                  <label className={styles.field}>
                    E-Mail *
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={180}
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                    />
                  </label>
                  <label className={styles.field}>
                    Telefon (optional)
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={80}
                      value={form.phone}
                      onChange={(event) =>
                        setForm({ ...form, phone: event.target.value })
                      }
                    />
                  </label>
                  <label className={styles.field}>
                    LinkedIn / Portfolio (optional)
                    <input
                      name="link"
                      type="text"
                      maxLength={300}
                      value={form.link}
                      onChange={(event) =>
                        setForm({ ...form, link: event.target.value })
                      }
                    />
                  </label>
                  <label className={`${styles.field} ${styles.fieldFull}`}>
                    Für welche Stelle? *
                    <select
                      name="position"
                      required
                      value={form.position}
                      onChange={(event) =>
                        setForm({ ...form, position: event.target.value })
                      }
                    >
                      <option value="">Bitte wählen</option>
                      {KARRIERE_JOBS.map((job) => (
                        <option key={job.slug} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={`${styles.field} ${styles.fieldFull}`}>
                    Ein paar Zeilen zu Ihnen (optional)
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={1500}
                      value={form.message}
                      onChange={(event) =>
                        setForm({ ...form, message: event.target.value })
                      }
                    />
                  </label>
                </div>
                <input
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honey}
                  onChange={(event) => setHoney(event.target.value)}
                  className={career.visuallyHidden}
                  aria-hidden="true"
                />
                <div className={styles.consent}>
                  <input
                    id={`${formId}-consent`}
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                  />
                  <div>
                    <label htmlFor={`${formId}-consent`}>
                      Ich bin einverstanden, dass AgenticIT meine Angaben zur
                      Bearbeitung meiner Bewerbung verwendet. *
                    </label>{" "}
                    <Link href="/datenschutz">Datenschutzerklärung</Link>
                  </div>
                </div>
                {status === "error" ? (
                  <p className={styles.formError} role="alert">
                    Senden fehlgeschlagen. Bitte erneut versuchen oder an{" "}
                    <a href="mailto:info@agenticit.ch">info@agenticit.ch</a>{" "}
                    schreiben.
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={!valid || status === "loading"}
                  className={`${styles.button} ${career.submit}`}
                >
                  {status === "loading"
                    ? "Wird gesendet …"
                    : "Bewerbung senden"}
                  <Send size={16} aria-hidden="true" />
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
