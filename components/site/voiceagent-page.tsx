import Link from "next/link"
import { SiteHeader } from "@/components/site/site-header"
import { VoiceAgentSection } from "@/components/site/voice-agent-section"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { CarbonFooter } from "@/components/site/carbon-footer"

const VOICE_AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? "agent_0201kwjmq83cf1btc17d9048pf8n"

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[#1F9A5E]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
      {children}
    </span>
  )
}

/** Kernfähigkeiten – branchenneutral, aber im Finanz-Kontext formuliert */
const CAPABILITIES = [
  {
    icon: "📞",
    title: "Anrufannahme rund um die Uhr",
    text: "Kein verpasster Anruf mehr – auch abends, am Wochenende und in Spitzenzeiten. Der Agent nimmt jeden Anruf sofort entgegen, freundlich und in Ihrem Namen.",
  },
  {
    icon: "🎯",
    title: "Lead-Qualifizierung in Echtzeit",
    text: "Der Agent stellt die richtigen Fragen, erkennt das Anliegen und priorisiert heisse Leads – qualifizierte Kontakte landen sofort bei Ihrem Berater.",
  },
  {
    icon: "📅",
    title: "Termine automatisch buchen",
    text: "Beratungsgespräche werden direkt im Kalender gebucht – inklusive Bestätigung per E-Mail oder WhatsApp. Ohne Telefon-Pingpong.",
  },
  {
    icon: "🔁",
    title: "Rückruf-Management",
    text: "Anliegen aufnehmen, Kontext erfassen, Rückruf strukturiert an das richtige Team weiterleiten. Ihr Berater startet vorbereitet ins Gespräch.",
  },
  {
    icon: "💬",
    title: "Häufige Fragen beantworten",
    text: "Öffnungszeiten, Unterlagen, Produktbasics, Statusauskünfte – Standardfragen klärt der Agent selbst und entlastet Ihr Team spürbar.",
  },
  {
    icon: "🌍",
    title: "Mehrsprachig & konsistent",
    text: "Deutsch, Französisch, Englisch – immer im gleichen professionellen Ton. Jeder Anrufer erhält dieselbe hochwertige Erfahrung.",
  },
]

/** Branchen-spezifische Szenarien innerhalb der Finanzdienstleistung */
const VERTICALS = [
  {
    tag: "Versicherungen & Makler",
    title: "Schadenmeldung & Erst-Triage",
    points: [
      "Schadenmeldungen 24/7 aufnehmen und strukturiert dokumentieren",
      "Dringlichkeit erkennen und Notfälle sofort eskalieren",
      "Offerten-Anfragen qualifizieren und Beratungstermine buchen",
    ],
  },
  {
    tag: "Banken & Finanzierung",
    title: "Anfragen kanalisieren statt Warteschleife",
    points: [
      "Finanzierungs- und Hypothekenanfragen vorqualifizieren",
      "Anrufer ans richtige Fachteam weiterleiten – ohne Wartemusik",
      "Termine für persönliche Beratung verbindlich vereinbaren",
    ],
  },
  {
    tag: "Vermögensverwaltung & Treuhand",
    title: "Diskreter Erstkontakt für neue Mandate",
    points: [
      "Interessenten für Vermögensberatung professionell empfangen",
      "Anliegen vertraulich aufnehmen und Berater-Termin koordinieren",
      "Bestandskunden bei Standardanliegen schnell weiterhelfen",
    ],
  },
  {
    tag: "Krankenkassen & Vorsorge",
    title: "Beratungstermine ohne Telefonstau",
    points: [
      "Zusatzversicherungs- und Vorsorgeanfragen aufnehmen",
      "Wechselinteressenten qualifizieren und an Berater übergeben",
      "Rückrufe in Stosszeiten (Jahresende) zuverlässig abfangen",
    ],
  },
]

/** Ablauf in vier Schritten */
const STEPS = [
  { n: "1", t: "Anruf kommt rein", d: "Der Agent meldet sich sofort – transparent als KI-Assistent Ihres Unternehmens." },
  { n: "2", t: "Anliegen verstehen", d: "Er hört zu, stellt gezielte Rückfragen und erfasst alle relevanten Angaben." },
  { n: "3", t: "Handeln", d: "Termin buchen, Rückruf anlegen, Auskunft geben oder an den richtigen Menschen übergeben." },
  { n: "4", t: "Übergabe an Ihr Team", d: "Sie erhalten eine saubere Zusammenfassung – Ihr Berater startet vorbereitet." },
]

const TRUST = [
  { ic: "🇨🇭", b: "Schweizer Datenhaltung", s: "Server in der Schweiz" },
  { ic: "📜", b: "revDSG / DSGVO-konform", s: "Datenschutz nach Schweizer Recht" },
  { ic: "🔔", b: "KI-Kennzeichnung", s: "Der Agent weist sich klar als KI aus" },
  { ic: "🤝", b: "Mensch behält Kontrolle", s: "Jederzeit Übergabe an Ihr Team" },
]

const STATS = [
  { b: "0 verpasste Anrufe", s: "auch ausserhalb der Bürozeiten" },
  { b: "< 1 Sek.", s: "bis der Agent abnimmt" },
  { b: "24 / 7 / 365", s: "erreichbar, ohne Mehrkosten pro Anruf" },
]

export function VoiceAgentPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0C10]">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0C10] to-[#1E2631] px-6 pb-20 pt-20 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 top-[-12%] h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-[#1F9A5E]/20 blur-[130px]" />
          <div className="absolute left-[80%] top-[8%] h-[340px] w-[480px] -translate-x-1/2 rounded-full bg-[#57C7FF]/14 blur-[120px]" />
        </div>

        <div className="relative mx-auto flex max-w-[1120px] flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1F9A5E]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
            🔒 Exklusiv · Vertraulich für ausgewählte Partner
          </span>
          <h1 className="mx-auto mt-5 max-w-[900px] text-[clamp(31px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-1px] text-white">
            Ihr KI-Telefonassistent für{" "}
            <span className="bg-[#1F9A5E] bg-clip-text text-transparent">
              Finanzdienstleister.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[680px] text-[clamp(15px,2vw,18px)] font-medium leading-relaxed text-white/80">
            Jeder Anruf entgegengenommen, jedes Anliegen qualifiziert, jeder Termin gebucht – rund um die Uhr.
            Hören Sie selbst, wie Ihr Voice Agent klingt.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#voice-agent"
              className="rounded-[12px] bg-gradient-to-br from-[#1F9A5E] to-[#1F9A5E] px-[26px] py-[15px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(31,154,94,0.32)] transition hover:-translate-y-[1px]"
            >
              🎙️ Live-Demo starten
            </a>
            <a
              href="#kontakt"
              className="rounded-[12px] border border-white/20 px-[24px] py-[15px] text-[15px] font-extrabold text-white/90 transition hover:border-[#1F9A5E]/60 hover:text-white"
            >
              Erstgespräch vereinbaren →
            </a>
          </div>

          <div className="mt-11 grid w-full max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-3">
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
        </div>
      </section>

      {/* LIVE-DEMO – der eigentliche Voice Agent */}
      <VoiceAgentSection
        agentId={VOICE_AGENT_ID}
        eyebrow="Hören Sie selbst"
        title="So nimmt Ihr Agent Anrufe entgegen."
        description="Starten Sie ein Muster-Gespräch direkt im Browser – genau so empfängt der Agent Ihre Anrufer, qualifiziert das Anliegen und bucht Termine. Transparent als KI ausgewiesen, rund um die Uhr."
      />

      {/* KERNFÄHIGKEITEN */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[720px] text-center">
            <Eyebrow>Was der Agent für Sie übernimmt</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,3.4vw,34px)] font-extrabold">
              Ein Mitarbeiter, der nie ans Limit kommt.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5A6B82]">
              Gerade in der Finanzdienstleistung zählt der erste Eindruck am Telefon. Der Voice Agent sorgt dafür,
              dass jeder Anrufer sofort und professionell betreut wird.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="flex h-full flex-col rounded-[16px] border border-[#E1E4E8] bg-white p-6 shadow-[0_6px_20px_rgba(10,12,16,0.07)]"
              >
                <div className="mb-[14px] grid h-[46px] w-[46px] place-items-center rounded-[12px] bg-[#FAFAF7] text-[22px]">
                  {c.icon}
                </div>
                <h3 className="text-[18px] font-bold text-[#0A0C10]">{c.title}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-[#5A6B82]">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHEN-SZENARIEN */}
      <section className="bg-[#F1F3F5] px-6 py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[720px] text-center">
            <Eyebrow>Für Ihre Sparte gedacht</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,3.4vw,34px)] font-extrabold">
              Konkrete Einsätze in der Finanzbranche.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5A6B82]">
              Vom ersten Anruf bis zur sauberen Übergabe – passend zu Ihrem Geschäftsmodell.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
            {VERTICALS.map((v) => (
              <div
                key={v.title}
                className="flex h-full flex-col rounded-[16px] border border-[#E1E4E8] bg-white p-7 shadow-[0_6px_20px_rgba(10,12,16,0.07)]"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-[0.5px] text-[#57C7FF]">{v.tag}</span>
                <h3 className="mt-1 text-[19px] font-bold text-[#0A0C10]">{v.title}</h3>
                <ul className="mt-3 space-y-2">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[14.5px] leading-snug text-[#2A3340]">
                      <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#1F9A5E]" aria-hidden="true" />
                      <span className="font-semibold">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABLAUF */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[720px] text-center">
            <Eyebrow>So einfach läuft es</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,3.4vw,34px)] font-extrabold">In vier Schritten zum entlasteten Team.</h2>
          </div>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-[16px] border border-[#E1E4E8] bg-white p-6 shadow-[0_6px_20px_rgba(10,12,16,0.07)]">
                <div className="grid h-[40px] w-[40px] place-items-center rounded-full bg-gradient-to-br from-[#1F9A5E] to-[#1F9A5E] text-[16px] font-extrabold text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 text-[16px] font-bold text-[#0A0C10]">{s.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#5A6B82]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SICHERHEIT & COMPLIANCE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0C10] to-[#1E2631] px-6 py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-[#57C7FF]/12 blur-[120px]" />
        <div className="relative mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[720px] text-center">
            <span className="inline-block rounded-full bg-[#57C7FF]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
              Vertrauen & Compliance
            </span>
            <h2 className="mt-3 text-[clamp(26px,3.8vw,38px)] font-extrabold tracking-[-0.5px] text-white">
              Datenschutz, der zur Finanzbranche passt.
            </h2>
            <p className="mx-auto mt-4 max-w-[680px] text-[16px] leading-relaxed text-[#C3CBD3]">
              Sensible Daten brauchen klare Regeln. Der Voice Agent läuft auf Schweizer Infrastruktur, weist sich
              transparent als KI aus und übergibt jederzeit an einen Menschen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[14px] md:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.b} className="rounded-[14px] border border-white/10 bg-white/5 p-[18px] text-center backdrop-blur">
                <div className="text-[24px]">{t.ic}</div>
                <b className="mt-2 block text-[15px] text-white">{t.b}</b>
                <span className="text-[12.5px] text-[#9AA6B2]">{t.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#FAFAF7] to-white px-6 py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-col items-center rounded-[22px] border border-[#E1E4E8] bg-gradient-to-br from-[#FAFAF7] to-[#F1F3F5] p-10 text-center shadow-[0_6px_20px_rgba(10,12,16,0.07)]">
            <Eyebrow>Unverbindlich · Persönlich</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(26px,3.6vw,36px)] font-extrabold tracking-[-0.5px] text-[#0A0C10]">
              Bringen wir Ihren Voice Agent ans Telefon.
            </h2>
            <p className="mt-3 max-w-[520px] text-[16px] leading-relaxed text-[#5A6B82]">
              Hinterlassen Sie kurz Ihre Angaben – wir richten eine auf Ihr Unternehmen abgestimmte Demo ein und
              melden uns persönlich.
            </p>
            <CtaContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER — zentral in carbon-footer.tsx (ein Footer für die ganze Seite) */}
      <CarbonFooter />
    </main>
  )
}
