import Link from "next/link"
import { AgenticAnalysisSection } from "@/components/site/agentic-analysis-section"
import { SiteHeader } from "@/components/site/site-header"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { SITE_TRUST_LINE } from "@/lib/site-trust-line"

type HomePageProps = {
  jsonLd?: Record<string, unknown>[]
}

/** AIDA · Interest — fünf Navigations-Welten (Praxisbeispiele separat im Desire-Block) */
const WORLDS = [
  {
    icon: "🚀",
    subtitle: "Was wir für Sie erreichen",
    title: "Lösungen",
    text: "Kundendienst-KI, Prozessautomatisierung und RevOps & Growth – die drei Hebel, die sofort Zeit sparen oder Umsatz bringen.",
    href: "/loesungen",
    cta: "Lösungen entdecken",
  },
  {
    icon: "🧠",
    subtitle: "Wie wir es bauen",
    title: "Technologie",
    text: "Autonome KI-Agenten, Multi-Agenten-Systeme und nahtlose Enterprise-Integration. Ein Chatbot redet – ein KI-Agent handelt.",
    href: "/technologie",
    cta: "Technologie ansehen",
  },
  {
    icon: "🔒",
    subtitle: "Ihre Daten bleiben Ihr Kapital",
    title: "Sicherheit",
    text: "Datensouveränität, lokale KI-Infrastruktur, private Enterprise-KI. Schweizer Datenhaltung, DSG-konform, auf Wunsch offline.",
    href: "/sicherheit",
    cta: "Sicherheit verstehen",
  },
]

const STATS = [
  { b: "Bis zu 84 %", s: "kürzere Bearbeitungszeiten in Vorzeige-Projekten" },
  { b: "CHF 8'000–25'000", s: "monatliche Ersparnis bei klarem Anwendungsfall" },
  { b: "171 %", s: "ROI im Schnitt vergleichbarer KI-Systeme" },
]

const TRUST = [
  { ic: "🇨🇭", b: "Schweizer Server", s: "Lokale Infrastruktur" },
  { ic: "📜", b: "DSG-konform", s: "Schweizer Datenschutz" },
  { ic: "🔌", b: "Offline-fähig", s: "Läuft auch ohne Internet" },
  { ic: "🛡️", b: "Private KI", s: "Nur für Ihr Unternehmen" },
]

const CASE_TEASERS = [
  { branche: "Kundendienst", kpi: "–84 %", label: "Bearbeitungszeit" },
  { branche: "RevOps", kpi: "171 %", label: "ROI im Schnitt" },
  { branche: "Prozesse", kpi: "CHF 8–25k", label: "Ersparnis pro Monat" },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[#16C7C0]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
      {children}
    </span>
  )
}

export function HomePage({ jsonLd = [] }: HomePageProps) {
  return (
    <main className="min-h-screen bg-white text-[#0B1F3A]">
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <SiteHeader />

      {/* A · Attention — Hero (Beweis-Hero mit dezenter Aurora) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-6 pb-20 pt-20 text-center">
        {/* Aurora: sanft driftende Verlaufsflächen */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="aurora-blob absolute left-1/2 top-[-12%] h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-[#16C7C0]/20 blur-[130px] animate-[aurora-drift-1_16s_ease-in-out_infinite] motion-reduce:animate-none" />
          <div className="aurora-blob absolute left-[22%] top-[24%] h-[360px] w-[540px] -translate-x-1/2 rounded-full bg-[#2DA8FF]/16 blur-[120px] animate-[aurora-drift-2_22s_ease-in-out_infinite] motion-reduce:animate-none" />
          <div className="aurora-blob absolute left-[80%] top-[8%] h-[340px] w-[480px] -translate-x-1/2 rounded-full bg-[#5ee0da]/14 blur-[120px] animate-[aurora-drift-3_19s_ease-in-out_infinite] motion-reduce:animate-none" />
        </div>

        <div className="relative mx-auto flex max-w-[1120px] flex-col items-center">
          <span className="inline-block rounded-full border border-white/10 bg-[#16C7C0]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#16C7C0]">
            KI für Unternehmen aus der Schweiz
          </span>
          <h1 className="mx-auto mt-5 max-w-[900px] text-[clamp(31px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-1px] text-white">
            Schweizer KI-Agenten,{" "}
            <span className="bg-gradient-to-r from-[#16C7C0] to-[#5ee0da] bg-clip-text text-transparent">
              die sich Ihrem Geschäft anpassen.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[680px] text-[clamp(15px,2vw,18px)] font-medium leading-relaxed text-white/80">
            KI-Agenten übernehmen Ihre zeitintensiven und wiederkehrenden Aufgaben, damit Sie sich auf Ihr Kerngeschäft konzentrieren können.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#kontakt"
              className="rounded-[12px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-[26px] py-[15px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(34,197,94,0.32)] transition hover:-translate-y-[1px]"
            >
              Jetzt kostenloses Erstgespräch sichern
            </a>
            <a
              href="#rechner"
              className="rounded-[12px] border border-white/20 px-[24px] py-[15px] text-[15px] font-extrabold text-white/90 transition hover:border-[#16C7C0]/60 hover:text-white"
            >
              Kostenlose KI-Analyse starten →
            </a>
          </div>

          {/* Beweis: Kennzahlen als dezente Glas-Chips */}
          <div className="mt-11 grid w-full max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-[3fr_4fr_3fr]">
            {STATS.map((s) => (
              <div
                key={s.b}
                className="rounded-[16px] border border-white/10 bg-white/[0.06] px-4 py-[18px] text-center backdrop-blur-sm"
              >
                <div className="whitespace-nowrap text-[clamp(15px,1.9vw,18px)] font-extrabold leading-none tracking-[-0.4px] text-white">
                  {s.b}
                </div>
                <div className="mt-2 text-[12.5px] leading-snug text-white/65">{s.s}</div>
              </div>
            ))}
          </div>

          {/* Trust-Zeile */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12.5px] font-semibold text-white/55">
            {TRUST.map((t, i) => (
              <span key={t.b} className="flex items-center gap-x-3">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden="true" /> : null}
                <span>
                  {t.ic} {t.b}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* I · Interest — KI-Standortbestimmung (Herzstück) */}
      <AgenticAnalysisSection />

      {/* I · Interest — Fünf Welten */}
      <section id="loesungen" className="scroll-mt-20 px-6 py-14">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-9 max-w-[720px] text-center">
            <Eyebrow>Alles aus einer Hand</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,3.4vw,34px)] font-extrabold">Fünf Welten, ein Wachstumsmotor.</h2>
            <p className="mt-3 text-[16px] text-[#5A6B82]">
              Sie brauchen keine fünf Anbieter. Sie brauchen einen Partner, der alles verzahnt.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {WORLDS.map((w) => (
              <Link
                key={w.title}
                href={w.href}
                className="group flex h-full flex-col rounded-[16px] border border-[#E3E9F2] bg-white p-6 shadow-[0_6px_20px_rgba(11,31,58,0.07)] transition hover:-translate-y-[3px] hover:border-[#16C7C0]/40 hover:shadow-[0_18px_48px_rgba(11,31,58,0.12)]"
              >
                <div className="mb-[14px] grid h-[46px] w-[46px] place-items-center rounded-[12px] bg-[#F1F8FF] text-[22px]">
                  {w.icon}
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.5px] text-[#0a8f89]">{w.subtitle}</span>
                <h3 className="mt-1 text-[19px] font-bold text-[#0B1F3A]">{w.title}</h3>
                <p className="my-2 flex-1 text-[14.5px] text-[#5A6B82]">{w.text}</p>
                <span className="mt-auto text-[14px] font-extrabold text-[#0a8f89]">{w.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* I → D · Differenzierung */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-6 py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-[#2DA8FF]/12 blur-[120px]" />
        <div className="relative mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[760px] text-center">
            <span className="inline-block rounded-full bg-[#2DA8FF]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#7ec8ff]">
              Der Unterschied
            </span>
            <h2 className="mt-3 text-[clamp(26px,3.8vw,38px)] font-extrabold tracking-[-0.5px] text-white">
              Wo andere Teams aufblähen, nutzen wir KI.
            </h2>
            <p className="mx-auto mt-4 max-w-[680px] text-[16px] leading-relaxed text-[#b9c6da]">
              Klassische Agenturen kosten Zeit und hohe Budgets. Bei uns steuert{" "}
              <strong className="font-bold text-white">ein einziger Experte smarte KI-Agenten</strong> – und liefert die
              Leistung einer ganzen Abteilung. Schneller, präziser, kosteneffizienter.
            </p>
          </div>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-[26px]">
            <div className="text-center">
              <div className="text-[54px] font-extrabold leading-none text-white">15</div>
              <small className="text-[13px] text-[#9fb0c8]">Spezialisten · klassische Agentur</small>
            </div>
            <div className="text-[20px] font-extrabold text-white/40">→</div>
            <div className="text-center">
              <div className="text-[54px] font-extrabold leading-none text-[#5ee0da]">1</div>
              <small className="text-[13px] text-[#9fb0c8]">Person + KI-Agenten · AgenticIT</small>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[3fr_4fr_3fr]">
            {STATS.map((s) => (
              <div key={s.b} className="rounded-[14px] border border-white/10 bg-white/5 p-[18px] text-center backdrop-blur">
                <b className="block whitespace-nowrap text-[22px] text-white">{s.b}</b>
                <span className="text-[13.5px] text-[#9fb0c8]">{s.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D · Desire — Sicherheit & Einfachheit */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-9 max-w-[680px] text-center">
            <span className="inline-block rounded-full bg-[#16C7C0]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
              Schweizer Sicherheit
            </span>
            <h2 className="mt-3 text-[clamp(26px,3.6vw,36px)] font-extrabold tracking-[-0.5px] text-[#0B1F3A]">
              Sicher wie ein Schweizer Tresor.
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[16px] leading-relaxed text-[#5A6B82]">
              Lokale Infrastruktur, volle Kontrolle, auf Wunsch offline – und so einfach zu nutzen wie Office. Ab Tag
              eins, ohne Schulungswochen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[14px] md:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.b} className="rounded-[14px] border border-[#E3E9F2] bg-white p-[18px] text-center">
                <div className="text-[24px]">{t.ic}</div>
                <b className="mt-2 block text-[15px] text-[#0B1F3A]">{t.b}</b>
                <span className="text-[12.5px] text-[#5A6B82]">{t.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D · Desire — Dringlichkeit & Praxisbeispiele */}
      <section className="bg-[#F5F8FC] px-6 py-14">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[720px] text-center">
            <Eyebrow>Der Markt wartet nicht</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,3.4vw,34px)] font-extrabold">
              Ihre Mitbewerber auch nicht.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5A6B82]">
              Bereits <strong className="font-bold text-[#0B1F3A]">34 % der Schweizer KMU</strong> setzen KI aktiv ein,{" "}
              <strong className="font-bold text-[#0B1F3A]">52 %</strong> automatisieren ganze Prozesse. Die Frage ist
              nicht mehr <em>ob</em>, sondern <em>wie schnell.</em>
            </p>
          </div>

          <div className="mx-auto mb-6 max-w-[720px] text-center">
            <h3 className="text-[clamp(24px,3.4vw,34px)] font-extrabold tracking-[-0.4px] text-[#0B1F3A]">Praxisbeispiele mit echten Zahlen</h3>
            <p className="mt-2 text-[15px] text-[#5A6B82]">
              Vorher-Nachher-Kennzahlen aus umgesetzten Projekten – nach Branche filterbar.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CASE_TEASERS.map((c) => (
              <Link
                key={c.branche}
                href="/case-studies"
                className="group rounded-[16px] border border-[#E3E9F2] bg-white p-6 text-center shadow-[0_6px_20px_rgba(11,31,58,0.07)] transition hover:-translate-y-[2px] hover:border-[#16C7C0]/40"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-[0.5px] text-[#0a8f89]">{c.branche}</span>
                <div className="mt-2 text-[36px] font-extrabold text-[#0B1F3A]">{c.kpi}</div>
                <div className="text-[14px] text-[#5A6B82]">{c.label}</div>
                <span className="mt-3 inline-block text-[13px] font-extrabold text-[#0a8f89] group-hover:underline">
                  Praxisbeispiele ansehen →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* A · Action — Final CTA */}
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#F1F8FF] to-white px-6 py-14">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-col items-center rounded-[22px] border border-[#E3E9F2] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] p-10 text-center shadow-[0_6px_20px_rgba(11,31,58,0.07)]">
            <Eyebrow>Unverbindlich · Persönlich</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(26px,3.6vw,36px)] font-extrabold tracking-[-0.5px] text-[#0B1F3A]">
              Sprechen wir über Ihr Potenzial.
            </h2>
            <p className="mt-3 max-w-[480px] text-[16px] leading-relaxed text-[#5A6B82]">
              Hinterlassen Sie kurz Ihre Angaben – wir melden uns persönlich.
            </p>
            <CtaContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-[#0B1F3A] py-12 text-[#c6d2e4]">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-6 md:grid-cols-[1.5fr_1fr_0.8fr_0.8fr]">
          {/* Marke + Aufhänger */}
          <div className="max-w-[340px]">
            <div className="text-[20px] font-extrabold text-white">
              Agentic<span className="text-[#16C7C0]">IT</span>
            </div>
          </div>

          {/* Kontakt + Adresse (Local SEO) */}
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">KONTAKT</b>
            <a href="tel:+41445052027" className="block py-[3px] text-[#9fb0c8] hover:text-white">044 505 20 27</a>
            <a href="mailto:info@agenticit.ch" className="block py-[3px] text-[#9fb0c8] hover:text-white">info@agenticit.ch</a>
            <address className="mt-1 py-[3px] text-[13px] not-italic leading-relaxed text-[#9fb0c8]">
              AgenticIT<br />
              Postfach<br />
              3072 Ostermundigen, Bern<br />
              Schweiz
            </address>
            <Link href="/kontakt" className="mt-1 block py-[3px] font-semibold text-[#16C7C0] hover:text-white">
              Zum Kontaktformular →
            </Link>
          </div>

          {/* Lösungen / Technologie */}
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">LÖSUNGEN</b>
            <Link href="/loesungen" className="block py-[3px] text-[#9fb0c8] hover:text-white">Kundendienst-KI</Link>
            <Link href="/loesungen" className="block py-[3px] text-[#9fb0c8] hover:text-white">Prozessautomatisierung</Link>
            <Link href="/loesungen" className="block py-[3px] text-[#9fb0c8] hover:text-white">RevOps & Growth</Link>
            <b className="mb-[10px] mt-4 block text-[13px] tracking-[0.3px] text-white">TECHNOLOGIE</b>
            <Link href="/technologie" className="block py-[3px] text-[#9fb0c8] hover:text-white">Autonome KI-Agenten</Link>
            <Link href="/technologie" className="block py-[3px] text-[#9fb0c8] hover:text-white">Enterprise-Integration</Link>
          </div>

          {/* Unternehmen */}
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">UNTERNEHMEN</b>
            <Link href="/kontakt" className="block py-[3px] text-[#9fb0c8] hover:text-white">Kontakt</Link>
            <Link href="/sicherheit" className="block py-[3px] text-[#9fb0c8] hover:text-white">Sicherheit</Link>
            <Link href="/datenschutz" className="block py-[3px] text-[#9fb0c8] hover:text-white">Datenschutz</Link>
            <Link href="/impressum" className="block py-[3px] text-[#9fb0c8] hover:text-white">Impressum</Link>
          </div>
        </div>

        {/* Trusties */}
        <div className="mx-auto mt-9 flex max-w-[1120px] flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 px-6 pt-6 text-[12px] font-semibold text-[#9fb0c8]">
          <span className="inline-flex items-center gap-1.5">🔒 SSL-gesichert</span>
          <span className="inline-flex items-center gap-1.5">🇨🇭 Schweizer Software</span>
          <span className="inline-flex items-center gap-1.5">🛡️ revDSG / DSGVO-konform</span>
          <span className="inline-flex items-center gap-1.5">🗄️ Daten in der Schweiz</span>
          <span className="inline-flex items-center gap-1.5">🤝 Keine Weitergabe an Dritte</span>
        </div>

        <div className="mx-auto mt-5 max-w-[1120px] px-6 text-[12px] text-[#8294ad]">
          <p>© 2026 AgenticIT · Postfach · 3072 Ostermundigen · Alle Rechte vorbehalten.</p>
          <p className="mt-1">{SITE_TRUST_LINE}</p>
        </div>
      </footer>
    </main>
  )
}
