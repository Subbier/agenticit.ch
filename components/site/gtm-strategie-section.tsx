// GTM-Story-Sektion (nur /loesungen/gtm-markteintritt): Warum eine echte
// Go-to-Market-Strategie über Erfolg entscheidet. Dunkler Impact-Block im
// Carbon-Design — begeistern statt informieren, führt zum Checklisten-Lead-Magnet.
import { Reveal } from "@/components/site/reveal"

const PUNCHES = [
  {
    number: "01",
    title: "Sieben Sekunden.",
    text: "Länger schaut niemand hin. Eine träge Seite, ein austauschbarer Text, ein Formular mit zwölf Feldern — und Ihr Besucher ist weg. Nicht verärgert. Einfach weg. Beim Nächsten. Die Konkurrenz ist genau einen Klick entfernt.",
  },
  {
    number: "02",
    title: "Billig wird teuer.",
    text: "Das Internet ist voll mit Paket-Angeboten: Website in drei Tagen, Kampagne ab morgen. Was fehlt, ist die Strategie dahinter. Was bleibt, ist ein Auftritt, der aussieht wie tausend andere — und eine Reputation, die leise Schaden nimmt.",
  },
  {
    number: "03",
    title: "Erst die Persona. Dann der Kanal.",
    text: "Wer entscheidet bei Ihren Kunden? Was muss diese Person sehen, lesen und fühlen, bevor sie anfragt? Erst wenn diese Customer Journey steht, wird klar, ob Website, Social Media oder Google Ads den ersten Kontakt machen — und was dort stehen muss.",
  },
  {
    number: "04",
    title: "Das Fundament trägt alles.",
    text: "Stimmt die Basis nicht, versickert jedes Werbebudget — egal wie gross. Stimmt sie, wird Kundengewinnung planbar: Besucher kommen, verstehen, vertrauen und fragen an. Nicht durch Zufall. Durch System.",
  },
]

export function GtmStrategieSection() {
  return (
    <section className="bg-[#0A0C10] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1000px]">
        <Reveal className="mx-auto mb-12 flex max-w-[720px] flex-col items-center text-center sm:mb-16">
          <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
            Warum Go-to-Market entscheidet
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.06] tracking-[-0.02em] text-white">
            Sichtbarkeit kann man kaufen.
            <br />
            <span className="text-[#57C7FF]">Überzeugen muss die Substanz.</span>
          </h2>
          <p className="mt-5 max-w-[600px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.4vw,17px)] leading-relaxed text-[#B9C2CE]">
            Jeden Tag starten Firmen Kampagnen, schalten Anzeigen, posten Inhalte — und wundern sich,
            warum nichts zurückkommt. Die Antwort ist fast immer dieselbe: Es fehlt keine Werbung.
            Es fehlt eine Go-to-Market-Strategie.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {PUNCHES.map((p, i) => (
            <Reveal key={p.number} delay={i * 100} className="h-full">
              <div className="flex h-full flex-col rounded-[14px] border border-white/[0.08] bg-white/[0.03] p-7">
                <span className="font-[family-name:var(--font-mono-signal)] text-[12px] font-semibold tracking-[0.18em] text-[#1F9A5E]">
                  {p.number}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(19px,4.2vw,24px)] font-bold leading-tight tracking-[-0.01em] text-white">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 font-[family-name:var(--font-carbon-text)] text-[14.5px] leading-relaxed text-[#9AA6B2]">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-12 flex max-w-[680px] flex-col items-center text-center sm:mt-16">
          <p className="font-[family-name:var(--font-display)] text-[clamp(18px,4vw,24px)] font-bold leading-snug text-white">
            Genau dafür bauen wir Go-to-Market-Systeme: Website, Kanäle und Kampagnen —
            orchestriert auf Ihre Zielgruppe, gemessen an Terminen statt Klicks.
          </p>
          <p className="mt-4 font-[family-name:var(--font-carbon-text)] text-[15px] leading-relaxed text-[#B9C2CE]">
            Wie solide ist Ihr Fundament? Finden Sie es in zwei Minuten heraus — mit Ihrer
            persönlichen GTM-Checkliste, direkt hier unten.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
