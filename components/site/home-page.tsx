import Link from "next/link"
import { BranchenRadar } from "@/components/site/branchen-radar"
import { FooterBadges } from "@/components/site/footer-badges"
import { SiteHeader } from "@/components/site/site-header"
import { AgentWorkflowShowcase } from "@/components/site/agent-workflow-showcase"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { FaqSection } from "@/components/site/faq-section"
import { homeAllFaqs } from "@/lib/seo-faqs"

type HomePageProps = {
  jsonLd?: Record<string, unknown>[]
}

const STATS = [
  {
    b: "Bis zu 84 %",
    s: "kürzere Bearbeitungszeiten in Vorzeige-Projekten",
    bShort: "84 %",
    sShort: "kürzere Bearbeitungszeit",
  },
  {
    b: "CHF 8'000–25'000",
    s: "mehr Ergebnis pro Monat bei klarem Anwendungsfall",
    bShort: "CHF 8–25k",
    sShort: "mehr pro Monat",
  },
  {
    b: "171 %",
    s: "ROI im Schnitt vergleichbarer KI-Systeme",
    bShort: "171 %",
    sShort: "ROI im Schnitt",
  },
]

const TRUST = [
  { ic: "🇨🇭", b: "Schweizer Server", s: "Lokale Infrastruktur" },
  { ic: "📜", b: "DSG-konform", s: "Schweizer Datenschutz" },
  { ic: "🔌", b: "Offline-fähig", s: "Läuft auch ohne Internet" },
  { ic: "🛡️", b: "Private KI", s: "Nur für Ihr Unternehmen" },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[#1F9A5E]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
      {children}
    </span>
  )
}

export function HomePage({ jsonLd = [] }: HomePageProps) {
  return (
    <main className="min-h-screen bg-white text-[#0A0C10]">
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <SiteHeader />

      {/* A · Attention — Hero (Carbon & Signal: flach, ohne Glow, R4/R7) */}
      <section className="relative overflow-hidden bg-[#0A0C10] px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-20">
        {/* Dezentes Punktraster wie im Workflow-Panel */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative mx-auto flex max-w-[1120px] flex-col items-center">
          <span className="inline-block rounded-full border border-[#8FE05A]/25 bg-[#8FE05A]/10 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
            Wachsen, ohne mehr Personal
          </span>
          <h1 className="mx-auto mt-8 max-w-[900px] text-[clamp(34px,5.4vw,56px)] font-extrabold leading-[1.06] tracking-[-1px] text-white">
            Mehr Zeit. Mehr Umsatz.{" "}
            <span className="text-[#57C7FF] italic">Weniger Handarbeit.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[680px] text-[clamp(16px,2vw,18px)] font-medium leading-relaxed text-white/85">
            Individuelle IT-Lösungen für Ihren Vertrieb.
          </p>
          {/* Die beiden CTA-Buttons («Erstgespräch sichern» / «Was liegt bei Ihnen
              drin?») und der Kennzahlen-Block (84 % / CHF 8'000–25'000 / 171 %)
              standen hier bis zum 29.07.2026. Beides ist dem Speed-to-Lead-Showcase
              gewichen, der jetzt direkt im Hero läuft — der dunkle Hero-Bereich
              reicht dafür weiter nach unten. Dieselben Kennzahlen erscheinen weiter
              unten im Abschnitt „15 → 1". */}
          <div className="mt-12 w-full text-left">
            <AgentWorkflowShowcase embedded />
          </div>

          {/* Die Trust-Zeile (🇨🇭/📜/🔌/🛡️) stand hier bis zum 29.07.2026 — sie ist
              dem CTA-Button gewichen. Die vier Punkte erscheinen weiterhin im
              Abschnitt «Schweizer Sicherheit». */}
          {/* Frage ÜBER dem Button.
              ACHTUNG: globals.css setzt ungelayert `p { margin-block: 0 var(--mb-body) }`.
              Diese Regel schlägt jede Tailwind-`mt-`-Klasse DIREKT auf einem <p>.
              Deshalb trägt hier der umschliessende <div> den Abstand, nicht der Absatz. */}
          <div className="flex flex-col items-center">
            {/* 16 px = derselbe Abstand wie zwischen dem Lead-Text und dem
                Workflow-Panel darüber (.awf--embedded .awf-frame margin-top). */}
            <div className="mt-4">
              <p className="max-w-[560px] text-[14px] font-medium leading-relaxed text-white/65">
                Welche wiederkehrenden oder zeitraubenden Aufgaben würden Sie gerne automatisieren?
              </p>
            </div>
            <a
              href="#kontakt"
              className="mt-4 rounded-[12px] bg-[#8FE05A] px-[26px] py-[15px] text-[15px] font-extrabold text-[#122400] shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition hover:-translate-y-[1px] hover:bg-[#A2E874]"
            >
              Online-Meeting vereinbaren
            </a>
          </div>
        </div>
      </section>

      {/* Der Agent-Workflow-Showcase steht seit dem 29.07.2026 direkt im Hero
          (eingebettete Variante oben) — hier keine zweite Sektion mehr. */}

      {/* I · Interest — Branchen-Radar (ersetzt seit 29.07.2026 den zweigeteilten
          Potenzialrechner/ROI-Bereich): Branche + Region wählen → Nachfrage,
          Werbewert und die Top-10-Rangliste der Region. Daten fest eingebaut
          (Ubersuggest, Juli 2026). */}
      <BranchenRadar />

      {/* Die Sektion «Alles aus einer Hand · Was springt für Sie dabei heraus?»
          (drei Nutzen-Karten) stand hier bis zum 29.07.2026 — auf Wunsch
          entfernt. Die Inhalte leben weiter auf /loesungen, /technologie und
          /sicherheit; der Anker #loesungen liegt jetzt auf der Differenzierung. */}

      {/* I → D · Differenzierung — heller Hintergrund, dezent vom Weiss abgesetzt */}
      <section id="loesungen" className="relative scroll-mt-20 overflow-hidden bg-[#F4F6F8] px-4 py-16 sm:px-6">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-[#57C7FF]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[760px] text-center">
            <span className="inline-block rounded-full bg-[#57C7FF]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0B6E96]">
              Der Unterschied
            </span>
            <h2 className="mt-5 text-[clamp(28px,4vw,40px)] font-extrabold leading-tight tracking-[-0.5px] text-[#0A0C10]">
              Die Leistung einer ganzen Agentur – zu einem Bruchteil der Kosten.
            </h2>
            <p className="mx-auto mt-4 max-w-[680px] text-[16px] leading-relaxed text-[#5A6B82]">
              Klassische Agenturen verrechnen Ihnen ganze Teams. Bei uns liefert{" "}
              <strong className="font-bold text-[#0A0C10]">ein Experte mit digitalen Helfern</strong> dasselbe Ergebnis –
              schneller, präziser und deutlich günstiger für Sie.
            </p>
          </div>
          {/* Mobil: untereinander und exakt zentriert — ab sm nebeneinander */}
          <div className="mb-8 flex flex-col items-center justify-center gap-[26px] sm:flex-row sm:flex-wrap">
            <div className="text-center">
              <div className="text-[54px] font-extrabold leading-none text-[#0A0C10]">15</div>
              <small className="text-[13px] text-[#5A6B82]">Spezialisten · klassische Agentur</small>
            </div>
            <div className="rotate-90 text-[20px] font-extrabold text-[#0A0C10]/35 sm:rotate-0">→</div>
            <div className="text-center">
              <div className="text-[54px] font-extrabold leading-none text-[#0B6E96]">1</div>
              <small className="text-[13px] text-[#5A6B82]">Person + KI-Agenten · AgenticIT</small>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[3fr_4fr_3fr]">
            {STATS.map((s) => (
              <div key={s.b} className="rounded-[14px] border border-[#E1E4E8] bg-white p-[18px] text-center shadow-[0_4px_14px_rgba(10,12,16,0.05)]">
                <b className="block whitespace-nowrap text-[22px] text-[#0A0C10]">{s.b}</b>
                <span className="text-[13.5px] text-[#5A6B82]">{s.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D · Desire — Sicherheit & Einfachheit */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-9 max-w-[680px] text-center">
            <span className="inline-block rounded-full bg-[#1F9A5E]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
              Schweizer Sicherheit
            </span>
            <h2 className="mt-5 text-[clamp(28px,3.8vw,38px)] font-extrabold leading-tight tracking-[-0.5px] text-[#0A0C10]">
              Ihre Daten – sicher wie in einem Schweizer Tresor.
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[16px] leading-relaxed text-[#5A6B82]">
              Alles bleibt in der Schweiz, unter Ihrer Kontrolle, auf Wunsch ganz ohne Internet. Und Ihr Team nutzt es
              ab Tag eins – so einfach wie Office, ohne Schulungswochen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[14px] md:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.b} className="rounded-[14px] border border-[#E1E4E8] bg-white p-[18px] text-center">
                <div className="text-[24px]">{t.ic}</div>
                <b className="mt-2 block text-[16px] font-extrabold text-[#0A0C10]">{t.b}</b>
                <span className="text-[12.5px] text-[#5A6B82]">{t.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Die Sektion «Der Markt wartet nicht · Ihre Mitbewerber sind schon dran»
          samt Praxisbeispiel-Kacheln stand hier bis zum 29.07.2026 — auf Wunsch
          entfernt. Die Fallbeispiele bleiben unter /case-studies erreichbar. */}

      {/* AIO/GEO · FAQ — definitorische Fragen für KI-Antworten & Featured Snippets.
          Heller Hintergrund, dezent vom Weiss abgesetzt — nur Hero und Footer
          bleiben dunkel (29.07.2026). */}
      <div className="bg-[#F4F6F8]">
        <FaqSection
          id="faq"
          eyebrow="Häufige Fragen"
          title="KI-Agenten, agentische KI & RevOps – kurz erklärt"
          intro="Die wichtigsten Begriffe rund um KI-Automatisierung für Schweizer Unternehmen – klar und ohne Fachjargon beantwortet."
          faqs={homeAllFaqs}
          variant="light"
        />
      </div>

      {/* A · Action — Final CTA */}
      <section id="kontakt" className="scroll-mt-20 bg-[#FAFAF7] px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-col items-center rounded-[22px] border border-[#E1E4E8] bg-[#F1F3F5] px-4 py-8 text-center shadow-[0_6px_20px_rgba(10,12,16,0.07)] sm:p-10">
            <Eyebrow>Kostenlos · Unverbindlich</Eyebrow>
            <h2 className="mt-5 text-[clamp(28px,3.8vw,38px)] font-extrabold leading-tight tracking-[-0.5px] text-[#0A0C10]">
              Finden Sie heraus, was bei Ihnen drin liegt.
            </h2>
            <p className="mt-3 max-w-[480px] text-[16px] leading-relaxed text-[#5A6B82]">
              Kurz Ihre Angaben hinterlassen – wir rufen Sie persönlich an und zeigen Ihnen in 15 Minuten, wo bei Ihnen
              Zeit und Geld freiliegen.
            </p>
            <CtaContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-[#0A0C10] py-12 text-[#c6d2e4]">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-4 sm:px-6 md:grid-cols-[1.5fr_1fr_0.8fr_0.8fr]">
          {/* Marke + Partner-Logos */}
          <div className="max-w-[340px]">
            <div className="text-[20px] font-extrabold text-white">
              Agentic<span className="text-[#57C7FF]">IT</span>
            </div>
            <div className="mt-6">
              <FooterBadges />
            </div>
          </div>

          {/* Kontakt + Adresse (Local SEO) */}
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">KONTAKT</b>
            <a href="tel:+41315394444" className="block py-[3px] text-[#9AA6B2] hover:text-white">031 539 44 44</a>
            <a href="mailto:info@agenticit.ch" className="block py-[3px] text-[#9AA6B2] hover:text-white">info@agenticit.ch</a>
            <address className="mt-1 py-[3px] text-[13px] not-italic leading-relaxed text-[#9AA6B2]">
              AgenticIT GmbH<br />
              Switzerland<br />
              www.agenticit.ch
            </address>
            <Link href="/kontakt" className="mt-1 block py-[3px] font-semibold text-[#57C7FF] hover:text-white">
              Zum Kontaktformular →
            </Link>
          </div>

          {/* Lösungen / Technologie */}
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">IT Lösungen für</b>
            <Link href="/loesungen/gtm-markteintritt" className="block py-[3px] text-[#9AA6B2] hover:text-white">GTM</Link>
            <Link href="/loesungen/revops-umsatzgenerierung" className="block py-[3px] text-[#9AA6B2] hover:text-white">RevOps</Link>
            <b className="mb-[10px] mt-4 block text-[13px] tracking-[0.3px] text-white">TECHNOLOGIE</b>
            <Link href="/technologie/autonome-ki-agenten" className="block py-[3px] text-[#9AA6B2] hover:text-white">KI Agenten</Link>
            <Link href="/technologie/multi-agenten-systeme" className="block py-[3px] text-[#9AA6B2] hover:text-white">Agenten Teams</Link>
            <Link href="/technologie/enterprise-integration" className="block py-[3px] text-[#9AA6B2] hover:text-white">Enterprise</Link>
          </div>

          {/* Bereiche */}
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">BEREICHE</b>
            <Link href="/angebot/begeistern" className="block py-[3px] text-[#9AA6B2] hover:text-white">Begeistern</Link>
            <Link href="/angebot/umsetzen" className="block py-[3px] text-[#9AA6B2] hover:text-white">Umsetzen</Link>
            <Link href="/angebot/erschaffen" className="block py-[3px] text-[#9AA6B2] hover:text-white">Erschaffen</Link>
            <Link href="/angebot/erweitern" className="block py-[3px] text-[#9AA6B2] hover:text-white">Erweitern</Link>
            <b className="mb-[10px] mt-4 block text-[13px] tracking-[0.3px] text-white">WISSEN</b>
            <Link href="/blog" className="block py-[3px] text-[#9AA6B2] hover:text-white">Blog</Link>
            <Link href="/branchen" className="block py-[3px] text-[#9AA6B2] hover:text-white">Branchen</Link>
          </div>
        </div>

        {/* Trusties */}
        <div className="mx-auto mt-9 flex max-w-[1120px] flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 px-4 pt-6 text-[12px] font-semibold text-[#9AA6B2] sm:px-6">
          <span className="inline-flex items-center gap-1.5">🔒 SSL-gesichert</span>
          <span className="inline-flex items-center gap-1.5">🛡️ revDSG / DSGVO-konform</span>
          <span className="inline-flex items-center gap-1.5">🤝 Keine Weitergabe an Dritte</span>
          <span className="inline-flex items-center gap-1.5">
            Coded in Bärn with
            <span className="ml-1.5 inline-flex items-end gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src="/logos/energy-can.png"
                  alt=""
                  className="w-auto origin-bottom object-contain"
                  style={{ height: "3ex" }}
                />
              ))}
            </span>
          </span>
          <Link href="/datenschutz" className="inline-flex items-center gap-1.5 hover:text-white">Datenschutz</Link>
          <Link href="/impressum" className="inline-flex items-center gap-1.5 hover:text-white">Impressum</Link>
        </div>
      </footer>
    </main>
  )
}
