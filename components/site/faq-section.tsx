import type { FaqItem } from "@/lib/seo"

type FaqSectionProps = {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  faqs: FaqItem[]
}

export function FaqSection({ id = "faq", eyebrow = "FAQ", title, intro, faqs }: FaqSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl text-balance">{title}</h2>
        {intro ? <p className="mt-4 text-base leading-8 text-white/72">{intro}</p> : null}

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm open:border-emerald-300/25 open:bg-white/[0.06]"
            >
              <summary className="cursor-pointer list-none px-5 py-4 text-base font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {faq.question}
                  <span className="mt-0.5 shrink-0 text-emerald-200 transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-7 text-white/72">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
