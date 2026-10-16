import { JourneyShell } from "@/components/journey/shell"
import { MarketingSetupCheck } from "@/components/journey/marketing-setup-check"
import { JsonLd } from "@/components/site/json-ld"
import { createPageMetadata, faqPageJsonLd } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "Marketing-Setup-Check: Ihr Plan für passende Anfragen",
  description:
    "Fünf Fragen zu Angebot, Auftritt, Werbekonten, Messung und Übergabe ans Team. Erhalten Sie einen priorisierten Marketing-Plan zum Speichern – direkt und unverbindlich.",
  path: "/marketing-setup-check",
})

const faqs = [
  {
    question: "Was bekomme ich aus dem Marketing-Setup-Check?",
    answer:
      "Sie ordnen fünf Grundlagen ein und erhalten bis zu drei nächste Schritte mit Zuständigkeiten und klaren Abnahmekriterien. Den vollständigen Plan können Sie direkt als Textdatei speichern. Er basiert auf Ihren Angaben und ersetzt keinen technischen Audit.",
  },
  {
    question: "Muss ich Werbekonten oder Kontaktdaten angeben?",
    answer:
      "Sie geben weder Zugangsdaten noch Kontaktdaten ein, um das Ergebnis zu sehen. Wenn Sie vorerst keine bezahlte Werbung planen, können Sie das auswählen. Eine persönliche Rückmeldung können Sie anschliessend freiwillig anfragen.",
  },
  {
    question: "Startet der Check automatisch Kampagnen oder Kontakte?",
    answer:
      "Nein. Der Check greift nicht auf Ihre Systeme zu und löst keine Kampagne, keinen Anruf und keine Nachricht aus. Die Umsetzung sowie allfällige Ausgaben werden separat vereinbart und freigegeben.",
  },
]

export default function Page() {
  return (
    <JourneyShell>
      <JsonLd data={[faqPageJsonLd(faqs)]} />
      <main className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>Marketing-Setup-Check</span>
          <h1>
            Von der Idee
            <br />
            zur nächsten Anfrage.
          </h1>
          <p>
            Stehen Angebot, Auftritt und Anfrageweg? Mit fünf kurzen Fragen
            finden Sie Ihren nächsten sinnvollen Schritt – und nehmen einen
            konkreten Plan mit.
          </p>
          <p className={styles.fine}>
            5 Fragen · Direktes Ergebnis · Plan zum Speichern
          </p>
        </div>
        <MarketingSetupCheck />
        <section
          className={`${styles.section} ${styles.wideContent}`}
          aria-labelledby="marketing-faq"
        >
          <span className={styles.eyebrow}>Gut zu wissen</span>
          <h2 id="marketing-faq">Kurz geklärt.</h2>
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
