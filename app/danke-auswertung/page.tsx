import { JourneyContent } from "@/components/journey/content"
import design from "@/components/journey/content.module.css"
import type { Metadata } from "next"
import Link from "next/link"

// Danke-Seite nach dem ROI-Rechner. Eigene Route, damit Ads/Analytics eine
// saubere Conversion-URL haben.
export const metadata: Metadata = {
  title: "Vielen Dank – Ihre Auswertung ist unterwegs | AgenticIT",
  description:
    "Sie erhalten demnächst eine detaillierte Analyse Ihrer individuellen Return-on-Invest-Chancen.",
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <JourneyContent>
      <section className={design.pageHero}>
        <div className="mx-auto max-w-[680px]">
          <span className="font-[family-name:var(--font-mono-signal)] text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#4d7c36]">
            Anfrage erhalten
          </span>
          <h1 className="mt-4 text-[clamp(30px,5vw,46px)] font-bold leading-[1.08] tracking-[-0.015em] text-[#202522]">
            Vielen Dank für Ihr Interesse an{" "}
            <span className="text-[#4d7c36] italic">
              unseren Dienstleistungen.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed text-[#A8B2BD]">
            Sie erhalten demnächst eine detaillierte Analyse Ihrer individuellen
            Return-on-Invest-Chancen.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-[640px] text-center">
          <div className="rounded-[12px] bg-white p-5">
            <p className="text-[14px] text-[#A8B2BD]">
              Damit nichts verloren geht: Speichern Sie unsere Nummer — wir
              rufen von{" "}
              <b className="font-[family-name:var(--font-mono-signal)] text-[#4d7c36]">
                +41 76 202 01 36
              </b>{" "}
              an.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block rounded-[8px] bg-[#8FE05A] px-6 py-3 text-[14px] font-bold text-[#122400] transition hover:bg-[#A2E874]"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </JourneyContent>
  )
}
