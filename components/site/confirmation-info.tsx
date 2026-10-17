import { JourneyContent } from "@/components/journey/content"
import { company } from "@/lib/company"
import { ArrowRight } from "lucide-react"
import shared from "@/components/journey/journey.module.css"
import styles from "./confirmation-info.module.css"

const pages = {
  inquiry: {
    eyebrow: "Nach Ihrer Anfrage",
    title: "Ihr Anliegen. Der nächste Schritt.",
    intro:
      "Nach dem Absenden prüfen wir Ihr Anliegen persönlich. Wir melden uns über den von Ihnen gewählten Kontaktweg.",
    note: "Die Sendebestätigung erscheint direkt im Formular. Falls dort eine Fehlermeldung angezeigt wird, versuchen Sie es erneut oder kontaktieren Sie uns.",
    steps: [
      {
        title: "Anliegen verstehen",
        text: "Wir schauen uns Ihre Angaben und Ihr Ziel an. Offene Punkte klären wir gemeinsam.",
      },
      {
        title: "Persönlich rückmelden",
        text: "Wir melden uns über Ihre angegebenen Kontaktdaten und besprechen, welche Unterstützung sinnvoll ist.",
      },
      {
        title: "Vorgehen vereinbaren",
        text: "Wenn die Zusammenarbeit passt, klären wir Umfang, Verantwortliche und Preis vor dem Start.",
      },
    ],
    actions: [
      { href: "/kontakt", label: "Kontaktmöglichkeiten" },
      { href: "/werkzeuge", label: "Checks & Vorlagen" },
    ],
  },
  calculation: {
    eyebrow: "Von der Rechnung zum nächsten Schritt",
    title: "Ihre Rechnung einordnen.",
    intro:
      "Eine Modellrechnung hilft bei der Planung. Wir prüfen mit Ihnen die Annahmen und den nächsten sinnvollen Schritt.",
    note: "Unsere aktuellen Checks zeigen das Ergebnis direkt. Dort können Sie den zugehörigen Plan ansehen und speichern. Eine persönliche Rückmeldung fragen Sie separat an.",
    steps: [
      {
        title: "Annahmen prüfen",
        text: "Verwenden Sie möglichst eigene Werte. Unbekannte Angaben bleiben als Annahmen oder offene Punkte erkennbar.",
      },
      {
        title: "Einen Ablauf auswählen",
        text: "Grenzen Sie Aufgabe, beteiligtes Team und gewünschtes Ergebnis ein. So wird aus einer Modellzahl eine prüfbare Frage.",
      },
      {
        title: "Machbarkeit klären",
        text: "Prüfen Sie Aufwand, Kontrolle und verfügbare Kapazität im echten Ablauf, bevor Sie eine Umsetzung vereinbaren.",
      },
    ],
    actions: [
      { href: "/automatisierungs-check", label: "Zeitpotenzial prüfen" },
      { href: "/potenzial", label: "Anfragen planen" },
    ],
  },
} as const

export function ConfirmationInfo({ kind }: { kind: keyof typeof pages }) {
  const page = pages[kind]
  return (
    <JourneyContent>
      <div className={styles.page}>
        <header className={styles.hero}>
          <span className={shared.eyebrow}>{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </header>
        <div className={styles.notice}>
          <p>{page.note}</p>
        </div>
        <section aria-label="So geht es weiter">
          <ol className={styles.steps}>
            {page.steps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <div className={styles.actions}>
          {page.actions.map((action, index) => (
            <a
              className={index === 0 ? shared.button : shared.secondary}
              href={action.href}
              key={action.href}
            >
              {action.label}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          ))}
        </div>
        <aside className={styles.contact} aria-label="Fragen an AgenticIT">
          <div>
            <span className={styles.eyebrow}>Persönlich erreichbar</span>
            <h2>Eine Frage ist noch offen?</h2>
            <p>Schreiben Sie uns oder nutzen Sie die Kontaktmöglichkeiten.</p>
          </div>
          <div className={styles.contactLinks}>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={`tel:${company.phone}`}>{company.phoneLabel}</a>
            <a href="/kontakt">
              Zum Kontaktformular <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </JourneyContent>
  )
}
