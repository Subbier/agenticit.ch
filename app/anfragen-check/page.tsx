import { JourneyShell } from "@/components/journey/shell"
import { InquiryCheck } from "@/components/journey/inquiry-check"
import { JsonLd } from "@/components/site/json-ld"
import { createPageMetadata, faqPageJsonLd } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "Anfragen-Check: Ihren Vertriebsablauf gezielt verbessern",
  description:
    "Fünf Fragen zu Anfrageeingang, Zuständigkeit, Reaktion, Nachfassen und Ergebnis. Erhalten Sie konkrete Prioritäten und einen Plan für Ihr Team zum Speichern.",
  path: "/anfragen-check",
})

const faqs = [
  {
    question: "Zeigt der Check, wie viele Leads wir verlieren?",
    answer:
      "Der Check zeigt Ansatzpunkte aus Ihren Antworten. Er misst keine verlorenen Anfragen und berechnet keinen entgangenen Umsatz. Dafür wären tatsächliche Vorgänge und nachvollziehbare Ergebnisse nötig. Ungeklärte Punkte führen zuerst zu einer Klärung.",
  },
  {
    question: "Was erhalten wir aus dem Anfragen-Check?",
    answer:
      "Bis zu drei nächste Schritte und einen vollständigen Plan mit allen offenen Punkten, Zuständigkeiten und Abnahmekriterien. Wenn nach Ihren Angaben bereits alles steht, erhalten Sie einen Ablauf-Test zur gemeinsamen Prüfung. Den Plan können Sie direkt speichern.",
  },
  {
    question: "Brauchen wir Kundendaten oder einen CRM-Zugang?",
    answer:
      "Für das Ergebnis sind weder Kundendaten noch Systemzugänge oder Kontaktdaten nötig. Der Check startet keine Anrufe und keine Nachrichten. Erst mit einer freiwilligen Anfrage senden Sie Ihre Antworten zusammen mit Ihren Kontaktangaben an AgenticIT.",
  },
]

export default function Page() {
  return (
    <JourneyShell>
      <JsonLd data={[faqPageJsonLd(faqs)]} />
      <main id="main-content" tabIndex={-1} className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>Anfragen-Check</span>
          <h1>
            Anfragen im Blick.
            <br />
            Nächster Schritt klar.
          </h1>
          <p>
            Wer übernimmt? Wann meldet sich Ihr Team? Was passiert nach der
            Offerte? Fünf kurze Fragen zeigen, wo Sie Ihre Anfragebearbeitung
            als Nächstes verbessern können.
          </p>
          <p className={styles.fine}>
            5 Fragen · Konkrete Prioritäten · Plan zum Speichern
          </p>
        </div>
        <InquiryCheck />
        <section
          className={`${styles.section} ${styles.wideContent}`}
          aria-labelledby="inquiry-faq"
        >
          <span className={styles.eyebrow}>Gut zu wissen</span>
          <h2 id="inquiry-faq">Kurz geklärt.</h2>
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
