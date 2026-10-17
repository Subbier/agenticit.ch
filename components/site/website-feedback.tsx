"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, MessageSquare, X } from "lucide-react"
import {
  canOfferFeedback,
  feedbackQuestions,
  FEEDBACK_OPEN_EVENT,
  FEEDBACK_DELAY_MS,
  FEEDBACK_SESSION_KEY,
  FEEDBACK_VERSION,
  type FeedbackAnswers,
} from "@/lib/website-feedback"
import styles from "./website-feedback.module.css"
import { CONSENT_REOPEN_EVENT } from "@/lib/consent"

export function WebsiteFeedbackLink() {
  return (
    <button
      type="button"
      className={styles.footerLink}
      onClick={() => window.dispatchEvent(new Event(FEEDBACK_OPEN_EVENT))}
    >
      Webseite bewerten
    </button>
  )
}

export function WebsiteFeedback() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<FeedbackAnswers>>({})
  const [status, setStatus] = useState<"editing" | "sending" | "sent">(
    "editing",
  )
  const [error, setError] = useState("")
  const alreadyOffered = useRef(false)
  const manual = useRef(false)
  const previousFocus = useRef<HTMLElement | null>(null)
  const restoreFocusOnClose = useRef(true)
  const questionHeading = useRef<HTMLLegendElement>(null)
  const question = feedbackQuestions[step]

  function rememberOffer() {
    alreadyOffered.current = true
    try {
      sessionStorage.setItem(FEEDBACK_SESSION_KEY, "offered")
    } catch {
      /* Visit memory still works without storage. */
    }
  }

  useEffect(() => {
    const show = () => {
      rememberOffer()
      previousFocus.current = document.activeElement as HTMLElement | null
      restoreFocusOnClose.current = true
      manual.current = true
      setOpen(true)
    }
    const hideForConsent = () => setOpen(false)
    window.addEventListener(FEEDBACK_OPEN_EVENT, show)
    window.addEventListener(CONSENT_REOPEN_EVENT, hideForConsent)
    return () => {
      window.removeEventListener(FEEDBACK_OPEN_EVENT, show)
      window.removeEventListener(CONSENT_REOPEN_EVENT, hideForConsent)
    }
  }, [])

  useEffect(() => {
    restoreFocusOnClose.current = false
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (pathname !== "/") return
    const startedAt = Date.now()
    let timer: ReturnType<typeof setTimeout>
    const offer = () => {
      let stored = false
      try {
        stored = sessionStorage.getItem(FEEDBACK_SESSION_KEY) !== null
      } catch {
        /* Use in-memory suppression. */
      }
      const activeField = document.activeElement?.closest(
        "input, textarea, select, [contenteditable=true]",
      )
      const playingVideo = Array.from(document.querySelectorAll("video")).some(
        (video) => !video.paused && !video.ended,
      )
      const otherDialog = Array.from(
        document.querySelectorAll('[role="dialog"]:not([aria-hidden="true"])'),
      ).some((dialog) => {
        const rect = dialog.getBoundingClientRect()
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < innerHeight &&
          getComputedStyle(dialog).visibility !== "hidden" &&
          Number(getComputedStyle(dialog).opacity) > 0
        )
      })
      if (
        canOfferFeedback({
          elapsedMs: Date.now() - startedAt,
          alreadyOffered: alreadyOffered.current || stored,
          visible: document.visibilityState === "visible",
          blocked: Boolean(
            activeField ||
              playingVideo ||
              otherDialog ||
              document.getElementById("consent-title"),
          ),
          pathname,
          navigationOpen: Boolean(
            document.querySelector("header details[open]"),
          ),
        })
      ) {
        rememberOffer()
        manual.current = false
        previousFocus.current = document.activeElement as HTMLElement | null
        restoreFocusOnClose.current = true
        setOpen(true)
      } else if (!alreadyOffered.current && !stored)
        timer = setTimeout(offer, 1000)
    }
    timer = setTimeout(offer, FEEDBACK_DELAY_MS)
    return () => clearTimeout(timer)
  }, [pathname])

  function changeStep(next: number) {
    setStep(next)
    setError("")
    requestAnimationFrame(() => questionHeading.current?.focus())
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending" || !answers[question.id]) return
    if (step < feedbackQuestions.length - 1) {
      changeStep(step + 1)
      return
    }
    setStatus("sending")
    setError("")
    try {
      const response = await fetch("/api/website-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: FEEDBACK_VERSION, answers }),
        signal: AbortSignal.timeout(20_000),
      })
      const result = await response.json()
      if (!response.ok || result.ok !== true)
        throw new Error("Feedback unavailable")
      setStatus("sent")
    } catch {
      setStatus("editing")
      setError(
        "Das Senden hat gerade nicht geklappt. Ihre Antworten bleiben erhalten. Bitte versuchen Sie es noch einmal.",
      )
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          className={styles.panel}
          data-website-feedback
          onOpenAutoFocus={(event) => {
            if (!manual.current) event.preventDefault()
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            if (restoreFocusOnClose.current) previousFocus.current?.focus()
          }}
          onInteractOutside={() => {
            restoreFocusOnClose.current = false
          }}
        >
          <Dialog.Close
            className={styles.close}
            aria-label="Umfrage schliessen"
          >
            <X size={18} aria-hidden="true" />
          </Dialog.Close>
          <div className={styles.eyebrow}>
            <MessageSquare size={14} aria-hidden="true" /> Ihre Meinung
          </div>
          <Dialog.Title className={styles.title}>
            {status === "sent"
              ? "Danke für Ihren Blick von aussen."
              : "Ihr Eindruck zählt."}
          </Dialog.Title>
          <Dialog.Description className={styles.description}>
            {status === "sent"
              ? "Ihre Rückmeldung ist bei uns angekommen. Sie helfen uns, die Webseite für Sie und andere besser zu machen."
              : "5 kurze Fragen zu unserer neuen Webseite. Freiwillig und ohne Kontaktdaten."}
          </Dialog.Description>
          {status === "sent" ? (
            <div className={styles.thanks} role="status">
              <span className={styles.thanksIcon}>
                <Check size={30} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <p>Schön, dass Sie sich Zeit genommen haben.</p>
              <Dialog.Close className={styles.primary}>
                Weiter entdecken <ArrowRight size={16} aria-hidden="true" />
              </Dialog.Close>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className={styles.progressLabel}>
                <span>
                  Frage {step + 1} von {feedbackQuestions.length}
                </span>
                <span>Ca. 30 Sekunden</span>
              </div>
              <div
                className={styles.progress}
                role="progressbar"
                aria-label="Fortschritt der Umfrage"
                aria-valuemin={0}
                aria-valuemax={5}
                aria-valuenow={step + 1}
              >
                {feedbackQuestions.map((item, index) => (
                  <span key={item.id} data-active={index <= step} />
                ))}
              </div>
              <fieldset
                className={styles.question}
                disabled={status === "sending"}
                key={question.id}
              >
                <legend ref={questionHeading} tabIndex={-1}>
                  {question.title}
                </legend>
                <div
                  className={`${styles.options} ${question.id === "overall" ? styles.rating : ""}`}
                >
                  {question.options.map((option) => (
                    <label className={styles.option} key={option.value}>
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: option.value,
                          }))
                        }
                        aria-label={option.label}
                        required
                      />
                      <span>
                        {question.id === "overall"
                          ? option.value
                          : option.label}
                      </span>
                    </label>
                  ))}
                </div>
                {question.id === "overall" ? (
                  <div className={styles.ratingLabels}>
                    <span>Schwach</span>
                    <span>Sehr gut</span>
                  </div>
                ) : null}
              </fieldset>
              <div className={styles.actions}>
                {step > 0 ? (
                  <button
                    type="button"
                    className={styles.back}
                    onClick={() => changeStep(step - 1)}
                    disabled={status === "sending"}
                  >
                    <ArrowLeft size={15} aria-hidden="true" /> Zurück
                  </button>
                ) : (
                  <Dialog.Close className={styles.back}>
                    Nicht jetzt
                  </Dialog.Close>
                )}
                <button
                  type="submit"
                  className={styles.primary}
                  disabled={!answers[question.id] || status === "sending"}
                >
                  {status === "sending"
                    ? "Wird gesendet …"
                    : step === 4
                      ? "Bewertung senden"
                      : "Weiter"}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              {error ? (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              ) : null}
              <p className={styles.privacy}>
                Nur Ihre Antworten werden übermittelt.{" "}
                <Link href="/datenschutz" onClick={() => setOpen(false)}>
                  Datenschutz
                </Link>
              </p>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
