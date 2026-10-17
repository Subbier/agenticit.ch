import { JourneyContent } from "@/components/journey/content"
import design from "@/components/journey/content.module.css"
// Blog-Artikelseite im Design "Carbon & Signal": dunkler Hero (Carbon),
// heller Artikel-Body (Typografie in blog-article.css), FAQ-Sektion,
// KI-Transparenzhinweis, verwandte Artikel und der site-weite CTA-Baustein.
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { notFound } from "next/navigation"
import { getPost, getRelatedPosts, type BlogPost } from "@/lib/blog"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo"
import "./blog-article.css"

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full flex-col rounded-[14px] border border-[#dce3db] bg-white p-6 transition hover:-translate-y-[2px] hover:border-[#8FE05A]"
    >
      <span className="font-[family-name:var(--font-mono-signal)] text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#4d7c36]">
        {post.category}
      </span>
      <h3 className="mt-3 flex-1 font-[family-name:var(--font-display)] text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#202522]">
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
      dateModified: post.updated,
      author: "AgenticIT GmbH",
    }),
    breadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ]
  if (post.faq.length) {
    jsonLd.push(
      faqPageJsonLd(post.faq.map((f) => ({ question: f.q, answer: f.a }))),
    )
  }

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
        <div className="mx-auto w-full max-w-[760px]">
          <nav
            aria-label="Brotkrumen"
            className="mb-5 font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]"
          >
            <Link href="/" className="hover:text-[#202522]">
              Start
            </Link>
            <span className="mx-2 text-[#202522]">/</span>
            <Link href="/blog" className="hover:text-[#202522]">
              Blog
            </Link>
            <span className="mx-2 text-[#202522]">/</span>
            <span className="text-[#647068]">{post.category}</span>
          </nav>
          <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4d7c36]">
            {post.category}
            {post.pillar ? " · Leitfaden" : ""}
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(28px,5.4vw,42px)] font-bold leading-[1.06] tracking-[-0.02em] text-[#202522]">
            {post.title}
          </h1>
          <p className="mt-5 max-w-[640px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.2vw,17px)] leading-relaxed text-[#647068]">
            {post.description}
          </p>
          <p className="mt-6 font-[family-name:var(--font-carbon-text)] text-[13px] font-medium text-[#6B7480]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && post.updated !== post.date ? (
              <>
                {" "}
                · Aktualisiert{" "}
                <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </>
            ) : null}
            {" · "}
            {post.readingTime} Min. Lesezeit · AgenticIT GmbH
          </p>
        </div>
      </section>

      {post.resource ? (
        <aside
          className="blog-resource"
          aria-labelledby="article-resource-title"
        >
          <div>
            <span>Direkt zum Mitnehmen</span>
            <h2 id="article-resource-title">{post.resource.title}</h2>
            <p>{post.resource.copy}</p>
            <a className="blog-resource-view" href={post.resource.href}>
              Im Browser ansehen
            </a>
          </div>
          <a
            href={`${post.resource.href}?download=1`}
            download={post.resource.href.split("/").pop()}
          >
            {post.resource.label}
            <Download size={17} aria-hidden="true" />
          </a>
        </aside>
      ) : null}

      {/* ARTIKEL */}
      <section className="bg-white px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-[760px]">
          <article
            className="blog-article"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {post.sources.length ? (
            <div className="mt-12 rounded-[14px] border border-[#dce3db] bg-[#f5f7f2] p-6">
              <h2 className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[#202522]">
                Quellen
              </h2>
              <ul className="mt-3 space-y-2">
                {post.sources.map((s, i) => (
                  <li
                    key={i}
                    className="font-[family-name:var(--font-carbon-text)] text-[13.5px] text-[#647068]"
                  >
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#4d7c36] underline decoration-[#4d7c36]/35 underline-offset-2 hover:decoration-[#4d7c36]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="mt-10 border-t border-[#dce3db] pt-5 font-[family-name:var(--font-carbon-text)] text-[12.5px] leading-relaxed text-[#6B7480]">
            Herausgeber: AgenticIT GmbH. Fragen zum Beitrag oder zu Ihrem
            konkreten Ablauf?{" "}
            <Link
              href="/kontakt"
              className="font-semibold text-[#4d7c36] underline underline-offset-2"
            >
              Sprechen Sie mit uns.
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      {post.faq.length ? (
        <section className="bg-[#f5f7f2] px-5 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto w-full max-w-[760px]">
            <Reveal className="mb-8 flex flex-col items-start">
              <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4d7c36]">
                Häufige Fragen
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(23px,4.6vw,30px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#202522]">
                Kurz beantwortet
              </h2>
            </Reveal>
            <div className="space-y-3">
              {post.faq.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-[14px] border border-[#dce3db] bg-white px-6 py-1 open:pb-5"
                >
                  <summary className="cursor-pointer list-none py-4 font-[family-name:var(--font-display)] text-[15.5px] font-bold leading-snug text-[#202522] marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="mr-2 text-[#1F9A5E]">+</span>
                    {f.q}
                  </summary>
                  <p className="font-[family-name:var(--font-carbon-text)] text-[14.5px] leading-relaxed text-[#647068]">
                    {f.a}
                  </p>
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
              <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4d7c36]">
                Weiterlesen
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(23px,4.6vw,30px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#202522]">
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

      {post.nextStep ? (
        <section
          className="blog-next-step"
          aria-labelledby="article-next-step-title"
        >
          <span>Ihr nächster Schritt</span>
          <h2 id="article-next-step-title">{post.nextStep.title}</h2>
          <p>{post.nextStep.copy}</p>
          <Link href={post.nextStep.href}>
            {post.nextStep.label}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      ) : (
        <section
          id="kontakt"
          className="scroll-mt-20 bg-[#f5f7f2] px-5 py-16 sm:px-6 sm:py-20"
        >
          <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4d7c36]">
              Unverbindlich · Persönlich
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(24px,5vw,32px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#202522]">
              Was davon liegt bei Ihnen drin?
            </h2>
            <p className="mt-4 max-w-[520px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#647068]">
              In einem kurzen Gespräch zeigen wir Ihnen, welche Abläufe aus
              diesem Artikel sich in Ihrem Unternehmen automatisieren lassen —
              konkret, messbar und ohne Verpflichtung.
            </p>
            <CtaContactForm />
            <p className="mt-4 font-[family-name:var(--font-carbon-text)] text-[12px] text-[#8B94A1]">
              Persönliche Rückmeldung · Keine Verpflichtung
            </p>
          </Reveal>
        </section>
      )}
    </JourneyContent>
  )
}
