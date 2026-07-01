import { SiteHeader } from "@/components/site/site-header"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { AngebotFooter } from "@/components/site/angebot-area-page"
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo"

const ACCENT = "#F6A21E"
const NAVY = "#0B1F3A"

const pillars = [
  {
    title: "Empfang & Frontdesk",
    tag: "Der erste Eindruck, immer erreichbar",
    points: [
      "Nimmt jeden Anruf entgegen – auch abends und am Wochenende",
      "Bucht Termine direkt in Ihre Agenda",
      "Beantwortet Standardfragen sofort",
      "Leitet Wichtiges mit vollem Kontext weiter",
    ],
  },
  {
    title: "Back Office",
    tag: "Administration, die sich selbst erledigt",
    points: [
      "Schreibt E-Mail-Entwürfe – Sie lesen und senden",
      "Recherchiert und trägt Informationen zusammen",
      "Pflegt Daten und Dokumente",
      "Erledigt wiederkehrende Aufgaben im Hintergrund",
    ],
  },
  {
    title: "Sales",
    tag: "Kein Lead bleibt liegen",
    points: [
      "Reagiert auf neue Anfragen in Sekunden",
      "Fasst über Anruf, WhatsApp und E-Mail nach",
      "Qualifiziert und vereinbart Termine",
      "Reaktiviert alte Kontakte automatisch",
    ],
  },
]

const industries = [
  "Arztpraxen & Kliniken",
  "Treuhand & Kanzleien",
  "Handwerk & Bau",
  "Immobilien",
  "Autogewerbe",
  "Hotellerie & Gastro",
  "Beauty & Wellness",
  "E-Commerce & Support",
]

const flow = [
  "Das Telefon klingelt – der KI-Agent nimmt sofort ab und weist sich klar als KI aus.",
  "Er klärt das Anliegen und beantwortet häufige Fragen.",
  "Er bucht den passenden Termin direkt in Ihre Agenda.",
  "Er legt Ihnen den E-Mail-Entwurf bereit – Sie lesen und senden.",
]

export function AiWorkforcePage() {
  const jsonLd = [
    serviceJsonLd({
      name: "AI Workforce – KI-Mitarbeiter für KMU",
      description:
        "KI-Agenten übernehmen Empfang, Back Office und Sales: Anrufe annehmen, Termine buchen, E-Mails vorbereiten. 24/7, revDSG-konform.",
      path: "/ai-workforce",
    }),
    breadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: "AI Workforce", path: "/ai-workforce" },
    ]),
  ]

  return (
    <main className="min-h-screen bg-white text-[#0B1F3A]">
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <SiteHeader />

      {/* HERO */}
      <section
        className="relative overflow-hidden px-5 pt-16 pb-20 text-white sm:px-6"
        style={{ backgroundImage: `linear-gradient(160deg, #0E2038 0%, #12294A 55%, #173257 100%)` }}
      >
        <div
          className="pointer-events-none absolute right-[-60px] top-1/2 hidden -translate-y-1/2 opacity-[0.08] md:block"
          aria-hidden="true"
        >
          <PhoneIcon className="inline-block h-[150px] w-[150px]" />
          <WhatsAppIcon className="ml-6 inline-block h-[150px] w-[150px]" />
        </div>

        <div className="relative mx-auto max-w-[1040px]">
          <Reveal>
            <span className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
              AI Workforce · Ihre KI-Belegschaft
            </span>
            <h1 className="mt-4 max-w-[20ch] text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.1] tracking-[-0.01em]">
              Die gut gelaunten KI-Mitarbeiter lassen Sie nie im Stich.
            </h1>
            <p className="mt-5 max-w-[54ch] text-[18px] leading-relaxed text-[#C7D4E6]">
              KI-Mitarbeiter übernehmen Empfang, Back Office und Sales – rund um die Uhr, ab Tag eins. Kein Recruiting,
              keine Einarbeitung, keine Ausfälle.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-xl px-6 py-3.5 text-[15px] font-bold text-[#3A2600] transition hover:brightness-105"
                style={{ background: ACCENT, borderBottom: "3px solid #E08A00" }}
              >
                Kostenloses Erstgespräch
              </a>
              <a
                href="#loesung"
                className="rounded-xl border border-white/35 px-6 py-3.5 text-[15px] font-bold text-white transition hover:border-white"
              >
                So funktioniert&rsquo;s ↓
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {["🇨🇭 Schweizer Server", "📜 revDSG-konform", "⚡ Startklar ohne Schulung", "🤝 Mensch behält die Kontrolle"].map(
                (b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[12.5px] text-[#CBD8EA]"
                  >
                    {b}
                  </span>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAIN */}
      <section className="border-b border-[#E3E9F2] px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-[1040px] text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
            Das Problem
          </span>
          <h2 className="mx-auto mt-3 max-w-[20ch] text-[clamp(24px,3.6vw,34px)] font-extrabold tracking-[-0.5px]">
            Gute Leute finden? Fast unmöglich.
          </h2>
          <p className="mx-auto mt-4 max-w-[60ch] text-[17px] leading-relaxed text-[#5A6B82]">
            Offene Stellen bleiben monatelang unbesetzt. Ihr Team fängt die Lücke auf – bis es überlastet ist. Anrufe
            gehen verloren, Anfragen bleiben liegen, Termine platzen. Nicht, weil niemand will. Sondern weil niemand da
            ist.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Monate", "bleiben Schlüsselstellen im KMU oft unbesetzt"],
              ["Nach 17 Uhr", "klingelt das Telefon – nur hört niemand mehr zu"],
              ["1 Person", "macht drei Jobs gleichzeitig und verliert Qualität"],
            ].map(([n, l]) => (
              <div key={n} className="rounded-2xl bg-[#F4F7FB] p-6">
                <div className="text-[30px] font-extrabold" style={{ color: NAVY }}>
                  {n}
                </div>
                <div className="mt-1.5 text-[14px] text-[#5A6B82]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGGREGATE */}
      <section className="px-5 py-16 text-white sm:px-6" style={{ background: NAVY }}>
        <div className="mx-auto max-w-[1040px] text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
            Und es wird teurer
          </span>
          <h2 className="mx-auto mt-3 max-w-[24ch] text-[clamp(24px,3.6vw,34px)] font-extrabold tracking-[-0.5px]">
            Wenn Sie jemanden finden, frisst er Ihre Marge.
          </h2>
          <p className="mx-auto mt-4 max-w-[60ch] text-[17px] leading-relaxed text-[#AFC0D9]">
            Ein neuer Mitarbeiter kostet weit mehr als sein Lohn – und das Problem verschwindet damit nicht.
          </p>
          <div className="mx-auto mt-9 grid max-w-[760px] gap-3.5 text-left">
            {[
              ["Lohn ist nur der Anfang.", "Lohnnebenkosten, Recruiting, Einarbeitung, Software, Arbeitsplatz – Monate vergehen, bis jemand produktiv ist."],
              ["Und dann geht er wieder.", "Ferien, Krankheit, Fluktuation. Jede Kündigung startet das teure Spiel von vorn."],
              ["Das Telefon wartet nicht.", "Jeder verpasste Anruf ist ein verlorener Auftrag – der zur Konkurrenz wandert, die schneller abnimmt."],
              ["Und es wird nicht besser.", "Die Demografie verschärft den Fachkräftemangel Jahr für Jahr. Wer heute keine Antwort hat, zahlt morgen mehr."],
            ].map(([b, t]) => (
              <div key={b} className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <span className="text-[18px] font-extrabold leading-6" style={{ color: ACCENT }}>
                  ✕
                </span>
                <p className="text-[15px] text-[#D5E0F0]">
                  <b className="text-white">{b}</b> {t}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[30ch] text-[20px] font-extrabold">
            Sie brauchen keine weitere Stellenanzeige. Sie brauchen eine Lösung, die sofort arbeitet.
          </p>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="loesung" className="px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-[1040px]">
          <div className="text-center">
            <span className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
              Die Lösung
            </span>
            <h2 className="mx-auto mt-3 max-w-[20ch] text-[clamp(24px,3.6vw,34px)] font-extrabold tracking-[-0.5px]">
              Stellen Sie KI-Agenten ein. Heute.
            </h2>
            <p className="mx-auto mt-4 max-w-[62ch] text-[17px] leading-relaxed text-[#5A6B82]">
              Ein digitales Team, das ans Telefon geht, Termine bucht, E-Mails vorbereitet und nachfasst – zuverlässig,
              rund um die Uhr, ohne Lohnlauf. Ihre Mitarbeiter machen wieder das, was zählt.
            </p>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <Reveal key={p.title}>
                <div className="h-full rounded-2xl border border-[#E3E9F2] bg-white p-6 shadow-[0_14px_30px_rgba(16,32,64,0.06)]">
                  <h3 className="text-[19px] font-extrabold" style={{ color: NAVY }}>
                    {p.title}
                  </h3>
                  <div className="mt-0.5 text-[13px] font-bold" style={{ color: "#E08A00" }}>
                    {p.tag}
                  </div>
                  <ul className="mt-3.5 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[14.5px] text-[#37485F]">
                        <span className="mt-[2px] font-extrabold" style={{ color: "#21B67A" }}>
                          ✓
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-14 text-center text-[17px] text-[#5A6B82]">
            Bewährt in Branchen, in denen jeder verpasste Kontakt weh tut:
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {industries.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[#E3E9F2] bg-white px-4 py-2.5 text-[14px] font-semibold"
                style={{ color: NAVY }}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[820px] rounded-2xl border border-[#E3E9F2] bg-white p-7 shadow-[0_14px_30px_rgba(16,32,64,0.06)]">
            <h3 className="text-[18px] font-extrabold" style={{ color: NAVY }}>
              Ein Beispiel: Ihr KI-Empfang, während Sie im Termin sind
            </h3>
            <ol className="mt-4 space-y-0">
              {flow.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3.5 border-t border-[#E3E9F2] py-3 text-[15px] text-[#37485F] first:border-t-0"
                >
                  <span
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ background: NAVY }}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-[#F4F7FB] px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-[1040px] text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
            Warum AgenticIT
          </span>
          <h2 className="mx-auto mt-3 max-w-[20ch] text-[clamp(24px,3.6vw,34px)] font-extrabold tracking-[-0.5px]">
            Schweizer KI, der man vertraut.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["🇨🇭", "Daten in der Schweiz, revDSG-/DSGVO-konform, auf Wunsch offline"],
              ["24/7", "Immer erreichbar – ohne Überstunden, ohne Ausfälle"],
              ["Tag 1", "Startklar ohne Schulungswochen, Mensch behält die Kontrolle"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white p-6">
                <div className="text-[28px] font-extrabold" style={{ color: NAVY }}>
                  {n}
                </div>
                <div className="mt-1.5 text-[14px] text-[#5A6B82]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="px-5 py-16 text-white sm:px-6" style={{ background: NAVY }}>
        <div className="mx-auto max-w-[1040px]">
          <div className="text-center">
            <span className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
              Unverbindlich &amp; persönlich
            </span>
            <h2 className="mx-auto mt-3 max-w-[24ch] text-[clamp(24px,3.6vw,34px)] font-extrabold tracking-[-0.5px]">
              Lernen Sie Ihren ersten KI-Mitarbeiter kennen.
            </h2>
            <p className="mx-auto mt-3 max-w-[58ch] text-[16px] leading-relaxed text-[#AFC0D9]">
              Kurz Ihre Angaben – wir zeigen Ihnen in einem Erstgespräch, welche Aufgaben ein KI-Agent bei Ihnen sofort
              übernimmt.
            </p>
          </div>
          <div className="mt-8">
            <CtaContactForm />
          </div>
        </div>
      </section>

      <AngebotFooter />
    </main>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#ffffff" className={className} aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#ffffff" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.005c6.585 0 11.946-5.335 11.949-11.893a11.821 11.821 0 00-3.484-8.413z" />
    </svg>
  )
}
