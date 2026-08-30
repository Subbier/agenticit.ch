// Blog-Artikelseite im Design "Carbon & Signal": dunkler Hero (Carbon),
// heller Artikel-Body (Typografie in blog-article.css), FAQ-Sektion,
// KI-Transparenzhinweis, verwandte Artikel und der site-weite CTA-Baustein.
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost, getRelatedPosts, type BlogPost } from "@/lib/blog"
import { CarbonHeader } from "@/components/site/carbon-header"
import { CarbonFooter } from "@/components/site/carbon-footer"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo"
import "./blog-article.css"

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("de-CH", { day: "numeric", month: "long", year: "numeric" })
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full flex-col rounded-[14px] border border-[#E1E4E8] bg-white p-6 transition hover:-translate-y-[2px] hover:border-[#8FE05A]"
    >
      <span className="font-[family-name:var(--font-mono-signal)] text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#0E7490]">
        {post.category}
      </span>
      <h3 className="mt-3 flex-1 font-[family-name:var(--font-display)] text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#101418]">
        {post.title}
      </h3>
      <span className="mt-4 font-[family-name:var(--font-carbon-text)] text-[12.5px] font-medium text-[#6B7480]">
        {post.readingTime} Min. Lesezeit
      </span>
    </Link>
  )
}

export function BlogArticlePage({ slug }: { slug: string }) {
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post, 3)

  const jsonLd: object[] = [
    articleJsonLd({
      headline: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      datePublished: post.date,
      author: "AgenticIT Redaktion",
    }),
    breadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ]
  if (post.faq.length) {
    jsonLd.push(faqPageJsonLd(post.faq.map((f) => ({ question: f.q, answer: f.a }))))
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#101418]">
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <CarbonHeader />

      {/* HERO — flach Carbon */}
      <section className="bg-[#0A0C10] px-5 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
        <div className="mx-auto w-full max-w-[760px]">
          <nav aria-label="Brotkrumen" className="mb-5 font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]">
            <Link href="/" className="hover:text-white">Start</Link>
            <span className="mx-2 text-white/20">/</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-[#B9C2CE]">{post.category}</span>
          </nav>
          <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
            {post.category}
            {post.pillar ? " · Pillar-Guide" : ""}
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(28px,5.4vw,42px)] font-bold leading-[1.06] tracking-[-0.02em] text-white">
            {post.title}
          </h1>
          <p className="mt-5 max-w-[640px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.2vw,17px)] leading-relaxed text-[#B9C2CE]">
            {post.description}
          </p>
          <p className="mt-6 font-[family-name:var(--font-carbon-text)] text-[13px] font-medium text-[#6B7480]">
            {formatDate(post.date)} · {post.readingTime} Min. Lesezeit · AgenticIT Redaktion
          </p>
        </div>
      </section>

      {/* ARTIKEL */}
      <section className="bg-white px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-[760px]">
          <article className="blog-article" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.sources.length ? (
            <div className="mt-12 rounded-[14px] border border-[#E1E4E8] bg-[#FAFAF7] p-6">
              <h2 className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[#101418]">Quellen</h2>
              <ul className="mt-3 space-y-2">
                {post.sources.map((s, i) => (
                  <li key={i} className="font-[family-name:var(--font-carbon-text)] text-[13.5px] text-[#4A545F]">
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0E7490] underline decoration-[#0E7490]/35 underline-offset-2 hover:decoration-[#0E7490]">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="mt-10 border-t border-[#E1E4E8] pt-5 font-[family-name:var(--font-carbon-text)] text-[12.5px] leading-relaxed text-[#6B7480]">
            Transparenz: Dieser Beitrag wurde KI-gestützt erstellt und von der AgenticIT-Redaktion geprüft
            (Human-in-the-Loop). Fragen dazu? <Link href="/kontakt" className="font-semibold text-[#0E7490] underline underline-offset-2">Sprechen Sie mit uns.</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      {post.faq.length ? (
        <section className="bg-[#FAFAF7] px-5 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto w-full max-w-[760px]">
            <Reveal className="mb-8 flex flex-col items-start">
              <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0E7490]">
                Häufige Fragen
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(23px,4.6vw,30px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#101418]">
                Kurz beantwortet
              </h2>
            </Reveal>
            <div className="space-y-3">
              {post.faq.map((f, i) => (
                <details key={i} className="group rounded-[14px] border border-[#E1E4E8] bg-white px-6 py-1 open:pb-5">
                  <summary className="cursor-pointer list-none py-4 font-[family-name:var(--font-display)] text-[15.5px] font-bold leading-snug text-[#101418] marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="mr-2 text-[#1F9A5E]">+</span>
                    {f.q}
                  </summary>
                  <p className="font-[family-name:var(--font-carbon-text)] text-[14.5px] leading-relaxed text-[#4A545F]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* VERWANDTE ARTIKEL */}
      {related.length ? (
        <section className="bg-white px-5 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto w-full max-w-[1000px]">
            <Reveal className="mb-8 flex flex-col items-center text-center">
              <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0E7490]">
                Weiterlesen
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(23px,4.6vw,30px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#101418]">
                Verwandte Artikel
              </h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <RelatedCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA mit Lead-Formular */}
      <section id="kontakt" className="scroll-mt-20 bg-[#FAFAF7] px-5 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0E7490]">
            Unverbindlich · Persönlich
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(24px,5vw,32px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#101418]">
            Was davon liegt bei Ihnen drin?
          </h2>
          <p className="mt-4 max-w-[520px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#4A545F]">
            In einem kurzen Gespräch zeigen wir Ihnen, welche Abläufe aus diesem Artikel sich in Ihrem
            Unternehmen automatisieren lassen — konkret, messbar und ohne Verpflichtung.
          </p>
          <CtaContactForm />
          <p className="mt-4 font-[family-name:var(--font-carbon-text)] text-[12px] text-[#8B94A1]">
            DSG-konform · Antwort innert 24 Stunden · Keine Verpflichtung
          </p>
        </Reveal>
      </section>

      <CarbonFooter />
    </main>
  )
}
