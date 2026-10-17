"use client"

import { JourneyContent } from "@/components/journey/content"

import design from "@/components/journey/content.module.css"

import { useEffect, useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, CheckCircle2, Send } from "lucide-react"
import { company } from "@/lib/company"
import { isCallbackPhoneNumber } from "@/lib/callback-inquiry"
import {
  contactValidationMessage,
  createContactSender,
  type ContactFields,
} from "@/lib/contact-inquiry"

export function ContactPage() {
  const [form, setForm] = useState<ContactFields>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  )
  const [honey, setHoney] = useState("")
  const [error, setError] = useState("")
  const sender = useRef<ReturnType<typeof createContactSender> | null>(null)
  const locked = useRef(false)
  const successRef = useRef<HTMLDivElement>(null)
  if (sender.current === null) sender.current = createContactSender()
  const valid = contactValidationMessage(form, consent) === null
  const phoneInvalid =
    Boolean(form.phone.trim()) && !isCallbackPhoneNumber(form.phone.trim())

  useEffect(() => {
    if (status === "done") successRef.current?.focus()
  }, [status])

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!valid || locked.current) return
    locked.current = true
    setStatus("loading")
    setError("")
    try {
      if (await sender.current!({ form, consent, honey })) setStatus("done")
      else {
        locked.current = false
        setStatus("idle")
      }
    } catch (failure) {
      locked.current = false
      setError(
        failure instanceof Error && !(failure instanceof TypeError)
          ? failure.message
          : "Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.",
      )
      setStatus("error")
    }
  }

  return (
    <JourneyContent>
      {/* Hero */}
      <section className={design.pageHero}>
        <div className="mx-auto max-w-[760px]">
          <span className="inline-block rounded-full bg-[#8fe05a]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#4d7c36]">
            Kontakt
          </span>
          <h1 className="mx-auto mt-4 max-w-[620px] text-[clamp(28px,4.6vw,42px)] font-extrabold leading-[1.1] tracking-[-0.8px] text-[#202522]">
            Sprechen wir über Ihr Potenzial.
          </h1>
          <p className="mx-auto mt-4 max-w-[540px] text-[clamp(15px,2vw,18px)] leading-relaxed text-[#647068]">
            Schreiben Sie uns – wir melden uns persönlich. Unverbindlich,
            konkret, auf Ihr Geschäft zugeschnitten.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-14">
        <div className="mx-auto grid max-w-[1000px] items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* Formular */}
          <div className="min-w-0 rounded-[20px] border border-[#dce3db] bg-white p-5 shadow-[0_18px_48px_rgba(10,12,16,0.10)] md:p-8">
            {status === "done" ? (
              <div
                className={`${design.contactSuccess} py-8 text-center`}
                role="status"
                tabIndex={-1}
                ref={successRef}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8fe05a]/15 text-[#4d7c36]">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-[22px] font-extrabold text-[#202522]">
                  Danke
                  {form.name ? `, ${form.name.trim().split(/\s+/)[0]}` : ""}!
                </h2>
                <p className="mx-auto mt-2 max-w-[400px] text-[14px] leading-relaxed text-[#647068]">
                  Ihre Nachricht wurde übermittelt. Wir prüfen Ihr Anliegen und
                  melden uns persönlich bei Ihnen.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-block rounded-[12px] bg-[#8FE05A] px-5 py-3 text-[14px] font-extrabold text-[#122400]"
                >
                  Zur Startseite
                </Link>
              </div>
            ) : (
              <form
                className={`${design.contactForm} space-y-4`}
                onSubmit={submit}
                aria-labelledby="contact-heading"
                data-contact-page="/kontakt"
                aria-busy={status === "loading"}
              >
                <h2
                  id="contact-heading"
                  className="text-[18px] font-extrabold text-[#202522]"
                >
                  Ihre Nachricht
                </h2>
                <p className="text-[13px] text-[#647068]">
                  Mit * markierte Felder sind erforderlich.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-[14px] font-semibold text-[#202522]"
                    >
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={120}
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full rounded-[11px] border border-[#dce3db] px-4 py-3 text-[15px] transition focus:border-[#4d7c36]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-[14px] font-semibold text-[#202522]"
                    >
                      E-Mail *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      required
                      type="email"
                      maxLength={180}
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-[11px] border border-[#dce3db] px-4 py-3 text-[15px] transition focus:border-[#4d7c36]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-[14px] font-semibold text-[#202522]"
                    >
                      Telefon (optional)
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      maxLength={80}
                      aria-invalid={phoneInvalid || undefined}
                      aria-describedby="contact-phone-hint"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-[11px] border border-[#dce3db] px-4 py-3 text-[15px] transition focus:border-[#4d7c36]"
                    />
                    <p
                      id="contact-phone-hint"
                      className="mt-2 text-[12px] text-[#647068]"
                      aria-live="polite"
                    >
                      {phoneInvalid
                        ? "Bitte die Nummer mit Vorwahl prüfen oder das Feld leer lassen."
                        : "Optional, mit Vorwahl."}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="mb-2 block text-[14px] font-semibold text-[#202522]"
                    >
                      Firma (optional)
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      autoComplete="organization"
                      maxLength={160}
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className="w-full rounded-[11px] border border-[#dce3db] px-4 py-3 text-[15px] transition focus:border-[#4d7c36]"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-[14px] font-semibold text-[#202522]"
                  >
                    Wie können wir helfen? *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={5}
                    maxLength={1200}
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full rounded-[11px] border border-[#dce3db] px-4 py-3 text-[15px] transition focus:border-[#4d7c36]"
                  />
                </div>
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                />
                <label
                  htmlFor="contact-consent"
                  className="flex min-h-11 items-start gap-3 py-2 text-[14px] leading-relaxed text-[#647068]"
                >
                  <input
                    id="contact-consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#4d7c36]"
                  />
                  Ich bin einverstanden, dass AgenticIT meine Angaben zur
                  Bearbeitung und Beantwortung meiner Anfrage verwendet.
                </label>
                {status === "error" ? (
                  <p
                    className="text-[13px] font-bold text-red-600"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}
                <div className={design.contactActions}>
                  <button
                    type="submit"
                    disabled={!valid || status === "loading"}
                    className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#8FE05A] py-[15px] text-[16px] font-extrabold text-[#122400] shadow-[0_6px_16px_rgba(10,12,16,0.18)] transition hover:-translate-y-[1px] disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <Send
                      className="h-[18px] w-[18px] shrink-0"
                      aria-hidden="true"
                    />
                    {status === "loading"
                      ? "Wird gesendet …"
                      : "Nachricht senden"}
                  </button>
                  <p className="text-center text-[12px] leading-relaxed text-[#647068]">
                    Informationen zur Bearbeitung Ihrer Angaben finden Sie in
                    unserer{" "}
                    <a
                      className="underline underline-offset-4"
                      href="/datenschutz"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Datenschutzerklärung (neuer Tab)"
                    >
                      Datenschutzerklärung (neuer Tab)
                    </a>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Kontaktdaten */}
          <div>
            <h2 className="text-[20px] font-extrabold text-[#202522]">
              So erreichen Sie uns
            </h2>
            <div className="mt-5 space-y-4">
              <a
                href={`tel:${company.phone}`}
                className="flex items-center gap-3 text-[15px] font-semibold text-[#202522] hover:text-[#4d7c36]"
              >
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[#f5f7f2] text-[#4d7c36]">
                  <Phone className="h-5 w-5" />
                </span>
                {company.phoneLabel}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-[15px] font-semibold text-[#202522] hover:text-[#4d7c36]"
              >
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[#f5f7f2] text-[#4d7c36]">
                  <Mail className="h-5 w-5" />
                </span>
                {company.email}
              </a>
              <div className="flex items-center gap-3 text-[15px] font-semibold text-[#202522]">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[#f5f7f2] text-[#4d7c36]">
                  <MapPin className="h-5 w-5" />
                </span>
                <address className="not-italic leading-relaxed">
                  {company.legalName}
                  <br />
                  {company.address.streetAddress}
                  <br />
                  {company.address.postalCode} {company.address.addressLocality}
                </address>
              </div>
            </div>
            <p className="mt-6 rounded-[14px] border border-[#dce3db] bg-[#f5f7f2] p-4 text-[13.5px] leading-relaxed text-[#647068]">
              Marketing, Sales und Digitalisierung mit KI – gemeinsam geplant,
              auf Ihren Betrieb abgestimmt. Wir besprechen Ihren Bedarf und
              vereinbaren den nächsten Schritt persönlich.
            </p>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-[13.5px] font-semibold text-[#4d7c36]">
              <a
                className="underline underline-offset-4"
                href={company.registerUrl}
              >
                Firmenangaben bei Zefix ↗
              </a>
              <a
                className="underline underline-offset-4"
                href={company.swico.directoryUrl}
              >
                Mitglied im Swico-Verzeichnis ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Häufige Fragen — beantwortet vorab, was sonst per Mail gefragt wird */}
      <section className="border-t border-[#dce3db] bg-[#f5f7f2] px-6 py-14">
        <div className="mx-auto max-w-[760px]">
          <h2 className="text-center text-[24px] font-extrabold text-[#202522]">
            Häufige Fragen vor dem ersten Gespräch
          </h2>
          <div className="mt-8 space-y-5">
            {[
              {
                q: "Wie schnell melden Sie sich?",
                a: `Wir melden uns persönlich zur Bearbeitung Ihrer Anfrage. Wenn Sie einen bestimmten Zeitpunkt bevorzugen, schreiben Sie ihn ins Nachrichtenfeld. Telefonisch erreichen Sie uns unter ${company.phoneLabel}.`,
              },
              {
                q: "Was passiert nach meiner Anfrage?",
                a: "Wir klären Ihr Anliegen, Ihre bisherigen Abläufe und die beteiligten Systeme. Danach besprechen wir, welcher nächste Schritt sinnvoll ist und welche Angaben dafür noch fehlen. Umfang und Kosten einer Umsetzung vereinbaren wir vor dem Start.",
              },
              {
                q: "Kostet das erste Gespräch etwas?",
                a: "Nein. Das Erstgespräch und die anschliessende Einschätzung sind kostenlos und unverbindlich. Es entsteht keine Verpflichtung, und wir arbeiten ohne Verkaufsdruck.",
              },
              {
                q: "Müssen wir unsere bestehenden Programme wechseln?",
                a: "In aller Regel nicht. Wir docken an das an, was Sie bereits nutzen — E-Mail, Telefonie, CRM, Buchhaltung. Ein Systemwechsel ist die Ausnahme, nicht der Ausgangspunkt.",
              },
              {
                q: "Was passiert mit unseren Daten?",
                a: "Wir verwenden Ihre Angaben, um Ihre Anfrage zu bearbeiten. Welche Dienste die Website einbindet und welche Daten dabei bearbeitet werden, steht in der Datenschutzerklärung. Bei einer Umsetzung klären wir Hosting, Datenwege und Zugriffe für die gewählte Lösung gesondert.",
              },
              {
                q: "Für welche Unternehmensgrösse lohnt sich das?",
                a: "Entscheidend sind Ihre Aufgaben und Ziele: Wie oft fällt ein Vorgang an, wie viel Zeit kostet er und was würde eine Verbesserung bringen? Wir vergleichen diesen Nutzen mit Einrichtung und laufendem Aufwand. Das kann für kleine Betriebe ebenso relevant sein wie für grössere Teams.",
              },
            ].map((f) => (
              <div
                key={f.q}
                className="rounded-[14px] border border-[#dce3db] bg-white p-5"
              >
                <h3 className="text-[16px] font-extrabold text-[#202522]">
                  {f.q}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#647068]">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER — zentral in carbon-footer.tsx (ein Footer für die ganze Seite) */}
    </JourneyContent>
  )
}
