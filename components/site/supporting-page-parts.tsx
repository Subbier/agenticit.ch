import shared from "@/components/journey/journey.module.css"
import styles from "@/components/journey/supporting-pages.module.css"

export function SupportingFaq({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  return (
    <section className={styles.section} aria-labelledby="questions-title">
      <div className={styles.heading}>
        <span className={shared.eyebrow}>Vor dem Start</span>
        <h2 id="questions-title">Ihre Fragen. Klar beantwortet.</h2>
      </div>
      <div className={styles.faqs}>
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
