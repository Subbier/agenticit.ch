import { ArrowUpRight } from "lucide-react"
import shared from "@/components/journey/journey.module.css"
import ui from "@/components/journey/supporting-pages.module.css"
import styles from "@/components/journey/offer-pages.module.css"

export function OfferFlow({
  steps,
}: {
  steps: { title: string; text: string }[]
}) {
  return (
    <section className={styles.flow} aria-labelledby="flow-title">
      <span className={shared.eyebrow}>Die Verbindung zählt</span>
      <h2 id="flow-title">Ein Ablauf. Klare Übergaben.</h2>
      <ol>
        {steps.map((step, index) => (
          <li key={step.title}>
            <span aria-hidden="true">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function OfferClosing({
  check,
}: {
  check: { href: string; label: string }
}) {
  return (
    <section id="kontakt" className={ui.section} aria-labelledby="next-title">
      <div className={ui.heading}>
        <span className={shared.eyebrow}>Ihr nächster Schritt</span>
        <h2 id="next-title">Mit einer konkreten Aufgabe beginnen.</h2>
        <p>
          Ordnen Sie Ihren Ablauf ein und nehmen Sie Ihren Plan mit. Wenn Sie
          Unterstützung möchten, klären wir gemeinsam Umfang, Voraussetzungen,
          Kosten und Verantwortung.
        </p>
      </div>
      <div className={[ui.actions, styles.actions].join(" ")}>
        <a href={check.href} className={shared.button}>
          {check.label}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <a href="/kontakt" className={ui.textLink}>
          Direkt Kontakt aufnehmen
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
