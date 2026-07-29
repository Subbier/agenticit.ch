import type { FaqItem } from "@/lib/seo"

type FaqSectionProps = {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  faqs: FaqItem[]
  /** "dark" (Standard) für dunkle Seiten, "light" für helle Hintergründe. */
  variant?: "dark" | "light"
}

export function FaqSection({ id = "faq", eyebrow = "FAQ", title, intro, faqs, variant = "dark" }: FaqSectionProps) {
  const light = variant === "light"
  return (
    <section id={id} className="scroll-mt-28 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <p
          className={`overline text-sm font-semibold uppercase tracking-[0.2em] ${
            light ? "text-[#0B6E96]" : "text-[#57C7FF]"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-3 text-2xl font-semibold sm:text-3xl text-balance ${
            light ? "text-[#0A0C10]" : "text-white"
          }`}
        >
          {title}
        </h2>
        {intro ? (
          <p className={`mt-4 text-base leading-8 ${light ? "text-[#5A6B82]" : "text-white/72"}`}>{intro}</p>
        ) : null}

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className={
                light
                  ? "group rounded-2xl border border-[#E1E4E8] bg-white shadow-[0_4px_14px_rgba(10,12,16,0.04)] open:border-[#1F9A5E]/35"
                  : "group rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm open:border-emerald-300/25 open:bg-white/[0.06]"
              }
            >
              <summary
                className={`cursor-pointer list-none px-5 py-4 text-base font-medium marker:content-none [&::-webkit-details-marker]:hidden ${
                  light ? "text-[#0A0C10]" : "text-white"
                }`}
              >
                <span className="flex items-start justify-between gap-4">
                  {faq.question}
                  <span
                    className={`mt-0.5 shrink-0 transition-transform group-open:rotate-45 ${
                      light ? "text-[#0B6E96]" : "text-[#57C7FF]"
                    }`}
                  >
                    +
                  </span>
                </span>
              </summary>
              <div
                className={`border-t px-5 pb-5 pt-4 text-sm leading-7 ${
                  light ? "border-[#EDF0F3] text-[#5A6B82]" : "border-white/10 text-white/72"
                }`}
              >
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
