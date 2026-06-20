import Link from "next/link"
import { ROICalculatorSection } from "@/components/roi-calculator-section"
import { SiteHeader } from "@/components/site/site-header"

type HomePageProps = {
  jsonLd?: Record<string, unknown>[]
}

const WORLDS = [
  { icon: "🚀", title: "Lösungen", text: "Kundendienst-KI, Prozessautomatisierung und RevOps & Growth – die Hebel, die sofort Zeit sparen oder Umsatz bringen.", href: "/loesungen" },
  { icon: "🧠", title: "Technologie", text: "Autonome KI-Agenten, Multi-Agenten-Systeme und Enterprise-Integration. Ein Chatbot redet – ein KI-Agent handelt.", href: "/technologie" },
  { icon: "🔒", title: "Sicherheit", text: "Datensouveränität, lokale KI-Infrastruktur, private Enterprise-KI. Schweizer Datenhaltung, DSG-konform, auf Wunsch offline.", href: "/sicherheit" },
  { icon: "🏢", title: "Branchen", text: "Finanzwesen & Treuhand, Professional Services, Industrie & Handel. Keine Lösung von der Stange, sondern in Ihrer Sprache.", href: "/branchen" },
  { icon: "🤝", title: "Unternehmen", text: "Eine KI-Agentur aus der Schweiz, die Technologie in messbare Resultate übersetzt – und Ihre Belegschaft aktiv mitnimmt.", href: "/unternehmen" },
  { icon: "📈", title: "Praxisbeispiele", text: "Echte Vorher-Nachher-Kennzahlen aus umgesetzten Projekten – nach Branche filterbar.", href: "/case-studies" },
]

const STATS = [
  { b: "bis 84 %", s: "kürzere Bearbeitungszeit" },
  { b: "CHF 8–25k", s: "Ersparnis pro Monat" },
  { b: "171 %", s: "ROI im Schnitt" },
]

const TRUST = [
  { ic: "🇨🇭", b: "Schweizer Server", s: "Lokale Infrastruktur" },
  { ic: "📜", b: "DSG-konform", s: "Schweizer Datenschutz" },
  { ic: "🔌", b: "Offline-fähig", s: "Läuft auch ohne Internet" },
  { ic: "🛡️", b: "Private KI", s: "Nur für Ihr Unternehmen" },
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

      {/* HEADER (dunkel, mit Dropdown-Navigation) */}
      <SiteHeader />

      {/* HERO (dunkelblau) – horizontal zentriert */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-6 pb-16 pt-16 text-center">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#16C7C0]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1120px]">
          <span className="inline-block rounded-full bg-[#16C7C0]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#16C7C0]">
            KI-Agentur aus der Schweiz
          </span>
          <div className="mt-4 flex justify-center md:translate-x-[20%]">
            <h1 className="max-w-[880px] text-[clamp(30px,5vw,50px)] font-extrabold leading-[1.1] tracking-[-1px] text-white">
              Sie prägen die Vision.{" "}
              <span className="bg-gradient-to-r from-[#16C7C0] to-[#5ee0da] bg-clip-text text-transparent">
                Wir bauen den Antrieb.
              </span>
            </h1>
          </div>
          <div className="mt-[18px] flex justify-center md:translate-x-[20%]">
            <p className="max-w-[680px] text-[clamp(16px,2.2vw,20px)] text-[#b9c6da]">
              Ihr digitales Team für Vertrieb, Service und Prozesse – sicher, messbar, ab Tag eins. Die Routine läuft im
              Hintergrund, Ihre besten Leute machen das, was zählt.
            </p>
          </div>
          <div className="mt-[26px] flex flex-wrap justify-center gap-3">
            <a href="#kontakt" className="rounded-[12px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(34,197,94,0.32)] transition hover:-translate-y-[1px]">
              Kostenloses Erstgespräch sichern
            </a>
            <a href="#rechner" className="rounded-[12px] bg-gradient-to-br from-[#FB923C] to-[#F97316] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(249,115,22,0.3)] transition hover:-translate-y-[1px]">
              → Potenzial berechnen
            </a>
          </div>
          <div className="mt-[34px] flex flex-wrap justify-center gap-[14px]">
            {STATS.map((s) => (
              <div key={s.b} className="min-w-[150px] rounded-[14px] border border-white/10 bg-white/5 px-5 py-[14px] backdrop-blur">
                <b className="block text-[26px] text-white">{s.b}</b>
                <span className="text-[12.5px] text-[#9fb0c8]">{s.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI RECHNER */}
      <div id="rechner" className="scroll-mt-20 bg-gradient-to-b from-[#F1F8FF] to-white">
        <ROICalculatorSection />
      </div>

      {/* FÜNF WELTEN */}
      <section id="loesungen" className="scroll-mt-20 px-6 py-14">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-9 max-w-[720px] text-center">
            <Eyebrow>Alles aus einer Hand</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,3.4vw,34px)] font-extrabold">Fünf Welten, ein Wachstumsmotor.</h2>
            <p className="mt-3 text-[16px] text-[#5A6B82]">Sie brauchen keine fünf Anbieter. Sie brauchen einen Partner, der alles verzahnt.</p>
          </div>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {WORLDS.map((w) => (
              <Link key={w.title} href={w.href} className="group flex h-full flex-col rounded-[16px] border border-[#E3E9F2] bg-white p-6 shadow-[0_6px_20px_rgba(11,31,58,0.07)] transition hover:-translate-y-[3px] hover:border-[#16C7C0]/40 hover:shadow-[0_18px_48px_rgba(11,31,58,0.12)]">
                <div className="mb-[14px] grid h-[46px] w-[46px] place-items-center rounded-[12px] bg-[#F1F8FF] text-[22px]">{w.icon}</div>
                <h3 className="text-[19px] font-bold text-[#0B1F3A]">{w.title}</h3>
                <p className="my-2 text-[14.5px] text-[#5A6B82]">{w.text}</p>
                <span className="mt-auto text-[14px] font-extrabold text-[#0a8f89]">Mehr erfahren →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENZIERUNG */}
      <section className="bg-[#F5F8FC] px-6 py-14">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-9 max-w-[720px] text-center">
            <Eyebrow>Der Unterschied</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,3.4vw,34px)] font-extrabold">Wo andere Teams aufblähen, nutzen wir KI.</h2>
            <p className="mt-3 text-[16px] text-[#5A6B82]">Bei uns steuert ein einziger Experte smarte KI-Agenten – und liefert die Leistung einer ganzen Abteilung.</p>
          </div>
          <div className="mb-[26px] flex flex-wrap items-center justify-center gap-[26px]">
            <div className="text-center">
              <div className="text-[54px] font-extrabold leading-none text-[#0B1F3A]">15</div>
              <small className="text-[13px] text-[#5A6B82]">Spezialisten · klassische Agentur</small>
            </div>
            <div className="text-[18px] font-extrabold text-[#5A6B82]">vs.</div>
            <div className="text-center">
              <div className="text-[54px] font-extrabold leading-none text-[#0a8f89]">1</div>
              <small className="text-[13px] text-[#5A6B82]">Person + KI-Agenten · AgenticIT</small>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.b} className="rounded-[14px] border border-[#E3E9F2] bg-white p-[18px] text-center">
                <b className="block text-[22px] text-[#0B1F3A]">{s.b}</b>
                <span className="text-[13.5px] text-[#5A6B82]">{s.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SICHERHEIT */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-9 max-w-[720px] text-center">
            <Eyebrow>So einfach wie Office. So sicher wie ein Schweizer Tresor.</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,3.4vw,34px)] font-extrabold">Ihre Daten bleiben in der Schweiz.</h2>
            <p className="mt-3 text-[16px] text-[#5A6B82]">Keine Schulungswochen, kein IT-Studium. Ihr Team ist vom ersten Tag an dabei – und Ihre Daten bleiben unter Ihrer Kontrolle.</p>
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

      {/* FINAL CTA */}
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#F1F8FF] to-white px-6 py-14">
        <div className="mx-auto max-w-[1120px]">
          <div className="rounded-[22px] border border-[#E3E9F2] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] p-10 text-center shadow-[0_6px_20px_rgba(11,31,58,0.07)]">
            <Eyebrow>Der zweitbeste Zeitpunkt ist jetzt</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,3.4vw,32px)] font-extrabold">Sehen Sie, was ein digitaler Kollege für Sie tut.</h2>
            <p className="mx-auto mb-[22px] mt-3 max-w-[560px] text-[#5A6B82]">
              In einem kostenlosen Gespräch zeigen wir Ihnen genau eine Aufgabe, die wir ab nächster Woche automatisieren könnten – mit konkreter Zahl, was das bringt.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#" className="rounded-[12px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(34,197,94,0.32)] transition hover:-translate-y-[1px]">
                Kostenlosen Termin sichern
              </a>
              <a href="#" className="rounded-[12px] bg-gradient-to-br from-[#FB923C] to-[#F97316] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(249,115,22,0.3)] transition hover:-translate-y-[1px]">
                💬 Mit dem KI-Assistenten starten
              </a>
            </div>
            <p className="mt-4 text-[11px] text-[#9aa9bf]">
              Hinweis: Jede KI-Interaktion startet mit „Ich bin der KI-Assistent von AgenticIT.“ · DSG-konform.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1F3A] py-9 text-[#c6d2e4]">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-10 px-6">
          <div className="max-w-[280px]">
            <div className="text-[19px] font-extrabold text-white">Agentic<span className="text-[#16C7C0]">IT</span></div>
            <p className="mt-[10px] text-[13px] text-[#9fb0c8]">KI-Agenten, Omnichannel-Automation und Predictive Lead Scoring für Schweizer Unternehmen.</p>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">LÖSUNGEN</b>
            <Link href="/loesungen" className="block py-[3px] text-[#9fb0c8] hover:text-white">Kundendienst-KI</Link>
            <Link href="/loesungen" className="block py-[3px] text-[#9fb0c8] hover:text-white">Prozessautomatisierung</Link>
            <Link href="/loesungen" className="block py-[3px] text-[#9fb0c8] hover:text-white">RevOps & Growth</Link>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">TECHNOLOGIE</b>
            <Link href="/technologie" className="block py-[3px] text-[#9fb0c8] hover:text-white">Autonome KI-Agenten</Link>
            <Link href="/technologie" className="block py-[3px] text-[#9fb0c8] hover:text-white">Multi-Agenten-Systeme</Link>
            <Link href="/technologie" className="block py-[3px] text-[#9fb0c8] hover:text-white">Enterprise-Integration</Link>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">UNTERNEHMEN</b>
            <Link href="/unternehmen" className="block py-[3px] text-[#9fb0c8] hover:text-white">Über uns</Link>
            <Link href="/datenschutz" className="block py-[3px] text-[#9fb0c8] hover:text-white">Datenschutz</Link>
            <Link href="/impressum" className="block py-[3px] text-[#9fb0c8] hover:text-white">Impressum</Link>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-[1120px] border-t border-white/10 px-6 pt-4 text-[12px] text-[#8294ad]">
          © 2026 AgenticIT. Alle Rechte vorbehalten.
        </div>
      </footer>
    </main>
  )
}
