import Link from "next/link"
import Aurora from "@/components/site/aurora-bg"
import { Footer } from "@/components/footer"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import type { LegalSectionContent } from "@/lib/legal-types"

type LegalPageLayoutProps = {
  title: string
  intro: string
  sections: readonly LegalSectionContent[]
}

export function LegalPageLayout({ title, intro, sections }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          <section className="px-4 pt-40 pb-16 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
              <p className="mt-4 text-base leading-8 text-white/72">{intro}</p>

              <div className="mt-10 grid gap-4">
                {sections.map((section) => (
                  <LegalSection key={section.title} {...section} />
                ))}
              </div>

              <p className="mt-10 text-sm text-white/55">
                <Link href="/" className="text-emerald-200 transition hover:text-white">
                  ← Zurück zur Startseite
                </Link>
              </p>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}

function LegalSection({ title, paragraphs, list, links, extra }: LegalSectionContent) {
  return (
    <article className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-sm leading-7 text-white/72">
          {paragraph}
        </p>
      ))}
      {list && (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-white/72">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {links && (
        <ul className="mt-3 space-y-1 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-emerald-200 transition hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {extra && <p className="mt-3 text-sm leading-7 text-white/72">{extra}</p>}
    </article>
  )
}
