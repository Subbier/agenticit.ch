import { JourneyContent } from "@/components/journey/content"
import design from "@/components/journey/content.module.css"
// Blog-Übersicht im Design "Carbon & Signal": dunkler Hero, helles
// Kartenraster mit Kategorie-Filter, site-weiter CTA-Baustein.
import Link from "next/link"
import { getAllPosts, BLOG_CATEGORIES, type BlogPostMeta } from "@/lib/blog"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { BlogIndexGrid } from "@/components/site/blog-index-grid"
import { breadcrumbJsonLd } from "@/lib/seo"

export function BlogIndexPage() {
  const posts = getAllPosts()
  const metas: BlogPostMeta[] = posts.map(
    ({
      slug,
      title,
      description,
      date,
      updated,
      category,
      tags,
      keywords,
      readingTime,
      pillar,
    }) => ({
      slug,
      title,
      description,
      date,
      updated,
      category,
      tags,
      keywords,
      readingTime,
      pillar,
    }),
  )
  const categories = BLOG_CATEGORIES.filter((c) =>
    metas.some((p) => p.category === c),
  )

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ]

  return (
    <JourneyContent>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      {/* HERO — flach Carbon */}
      <section className={design.pageHero}>
        <div className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center">
          <nav
            aria-label="Brotkrumen"
            className="mb-5 font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]"
          >
            <Link href="/" className="hover:text-[#202522]">
              Start
            </Link>
            <span className="mx-2 text-[#202522]">/</span>
            <span className="text-[#647068]">Blog</span>
          </nav>
          <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4d7c36]">
            AgenticIT Wissen
          </span>
          <h1 className="mt-5 max-w-[620px] font-[family-name:var(--font-display)] text-[clamp(29px,5.6vw,45px)] font-bold leading-[1.04] tracking-[-0.02em] text-[#202522]">
            Praxiswissen zu KI, Marketing und Webdesign.
          </h1>
          <p className="mt-6 max-w-[600px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.2vw,17px)] leading-relaxed text-[#647068]">
            Antworten, Entscheidungshilfen und Vorlagen für Schweizer KMU. Für
            einen klaren Auftritt, passende Anfragen und digitale Abläufe, die
            Ihr Team unterstützen.
          </p>
        </div>
      </section>

      {/* ARTIKEL-RASTER */}
      <section className="bg-[#f5f7f2] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-[1080px]">
          <Reveal>
            <BlogIndexGrid posts={metas} categories={categories} />
          </Reveal>
        </div>
      </section>

      {/* CTA mit Lead-Formular */}
      <section
        id="kontakt"
        className="scroll-mt-20 bg-white px-5 py-16 sm:px-6 sm:py-20"
      >
        <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4d7c36]">
            Unverbindlich · Persönlich
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(24px,5vw,32px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#202522]">
            Lieber direkt über Ihren Fall sprechen?
          </h2>
          <p className="mt-4 max-w-[520px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#647068]">
            Wir besprechen Ihr Anliegen, die vorhandenen Systeme und einen
            passenden nächsten Schritt.
          </p>
          <CtaContactForm pagePath="/blog" />
          <p className="mt-4 font-[family-name:var(--font-carbon-text)] text-[12px] text-[#8B94A1]">
            Persönliche Rückmeldung · Keine Verpflichtung
          </p>
        </Reveal>
      </section>
    </JourneyContent>
  )
}
