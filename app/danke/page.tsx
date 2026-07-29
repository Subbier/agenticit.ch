import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site/site-header"
import { CarbonFooter } from "@/components/site/carbon-footer"

// Danke-/Bestätigungsseite (Master: AgenticIT-Conversion-Funnel.md, §5).
// Eigene Route, damit Ads/Analytics eine saubere Conversion-URL haben.
export const metadata: Metadata = {
  title: "Danke – Ihre Anfrage ist da | AgenticIT",
  description: "Wir melden uns innerhalb eines Werktags mit einem kurzen, unverbindlichen Rückruf.",
  robots: { index: false, follow: false },
}

const STEPS = [
  "Wir schauen uns die Nachfrage in Ihrer Branche konkret an.",
  "Im Gespräch (ca. 15 Min.) zeigen wir Ihnen Ihre Kundenreise – Schritt für Schritt.",
  "Wenn es passt, starten Sie mit dem Schnupper-Abo. Wenn nicht, haben Sie trotzdem einen klaren Plan.",
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-[#0A0C10]">
      <SiteHeader />

      {/* Dunkler Kopf */}
      <section className="bg-[#0A0C10] px-5 py-16 text-center sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[680px]">
          <span className="font-[family-name:var(--font-mono-signal)] text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
            Anfrage erhalten
          </span>
          <h1 className="mt-4 text-[clamp(30px,5vw,46px)] font-bold leading-[1.08] tracking-[-0.015em] text-white">
            Danke — <span className="text-[#57C7FF] italic">Ihre Anfrage ist da.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-relaxed text-[#A8B2BD]">
            Wir melden uns innerhalb eines Werktags mit einem kurzen, unverbindlichen Rückruf.
          </p>
        </div>
      </section>

      {/* Was als Nächstes passiert */}
      <section className="px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-[640px]">
          <span className="block text-center font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#57C7FF]">
            Was als Nächstes passiert
          </span>
          <div className="mt-6 space-y-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-start gap-4 rounded-[12px] border border-[#E1E4E8] bg-[#F1F3F5] p-5">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#1F9A5E] font-[family-name:var(--font-mono-signal)] text-[13px] font-semibold text-white">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-[#4A545F]">{s}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[12px] bg-[#141A24] p-5 text-center">
            <p className="text-[14px] text-[#A8B2BD]">
              Damit nichts verloren geht: Speichern Sie unsere Nummer — wir rufen von{" "}
              <b className="font-[family-name:var(--font-mono-signal)] text-[#57C7FF]">+41 76 202 01 36</b> an.
            </p>
          </div>

          {/* Vertrauens-Element (Funnel §5) */}
          <div className="mt-8 rounded-[12px] border border-[#E1E4E8] bg-white p-6 text-center">
            <p className="text-[14.5px] leading-relaxed text-[#4A545F]">
              «Wir bauen Ihre Kundenreise so, wie wir sie für uns selbst gebaut haben — nachprüfbar, zum Beispiel mit{" "}
              <a href="https://advok.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#57C7FF]">
                advok.app
              </a>
              .»
            </p>
            <p className="mt-2 font-[family-name:var(--font-mono-signal)] text-[11.5px] uppercase tracking-[0.16em] text-[#8B94A1]">
              Sabir Rastoder · CTO, AgenticIT
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block rounded-[8px] bg-[#8FE05A] px-6 py-3 text-[14px] font-bold text-[#122400] transition hover:bg-[#A2E874]"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </section>

      <CarbonFooter />
    </main>
  )
}
