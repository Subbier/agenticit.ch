import { JourneyShell } from "@/components/journey/shell"
import { CrmCheck } from "@/components/journey/crm-check"
import { JsonLd } from "@/components/site/json-ld"
import { createPageMetadata, faqPageJsonLd } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "CRM-Ablauf-Check: Daten und Übergaben gezielt verbessern",
  description:
    "Fünf Fragen zu Feldern, Datenübernahme, doppelten Übergaben, Team und Fehlerfällen. Erhalten Sie nächste Schritte und einen ausfüllbaren CRM-Ablaufplan.",
  path: "/crm-ablauf-check",
})

const faqs = [
  {
    question: "Was erhalten wir aus dem CRM-Ablauf-Check?",
    answer:
      "Bis zu drei nächste Schritte und einen vollständigen Plan mit allen offenen Punkten. Die ausfüllbare Vorlage hält Quelle, Feldzuordnung, CRM-Ziel, Verantwortliche und Fehlerfälle fest. Vier Prüffälle helfen Ihrem Team bei einer späteren gemeinsamen Abnahme.",
  },
  {
    question: "Wie unterscheidet er sich vom Anfragen-Check?",
    answer:
      "Der Anfragen-Check betrachtet die Bearbeitung im Vertrieb: Eingang, Reaktion, Nachfassen und Ergebnis. Der CRM-Ablauf-Check konzentriert sich auf Daten und Übergaben zwischen Ihren Werkzeugen und dem Team. Sie können damit einen einzelnen Ablauf vorbereiten.",
  },
  {
    question: "Brauchen wir dafür bereits ein bestimmtes CRM?",
    answer:
      "Sie können den Ablauf für ein vorhandenes CRM oder einen geplanten Wechsel skizzieren. Der Check empfiehlt keinen pauschalen Systemwechsel und greift auf kein System zu. Ob die gewünschte Verbindung technisch funktioniert, muss im tatsächlichen Zielsystem geprüft werden.",
  },
  {
    question: "Werden Kundendaten oder Kontaktdaten benötigt?",
    answer:
      "Für Check und Plan sind weder Kundendaten noch Zugänge oder Kontaktdaten nötig. Der Check verändert kein CRM und startet keine Anrufe oder Nachrichten. Erst mit einer freiwilligen Anfrage senden Sie Ihre Antworten zusammen mit Ihren Kontaktangaben an AgenticIT.",
  },
]

export default function Page() {
  return (
    <JourneyShell>
      <JsonLd data={[faqPageJsonLd(faqs)]} />
      <main className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>CRM-Ablauf-Check</span>
          <h1>
            Einmal erfassen.
            <br />
            Sauber weitergeben.
          </h1>
          <p>
            Von Formular, Gespräch oder Liste ins CRM: Wo klappt die Übergabe,
            wo braucht Ihr Team noch Handarbeit? Fünf kurze Fragen führen zu
            Ihren nächsten Schritten und einer Vorlage für den künftigen Ablauf.
          </p>
          <p className={styles.fine}>
            5 Fragen · Konkrete Prioritäten · Ablaufplan zum Speichern
          </p>
        </div>
        <CrmCheck />
        <section
          className={`${styles.section} ${styles.wideContent}`}
          aria-labelledby="crm-faq"
        >
          <span className={styles.eyebrow}>Gut zu wissen</span>
          <h2 id="crm-faq">Kurz geklärt.</h2>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details className={styles.faq} key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </JourneyShell>
  )
}
