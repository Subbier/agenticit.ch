// Einheitlicher Footer für die ganze Website — identisch mit dem Startseiten-Footer.
// Wird von Startseite, Lösungen, Technologie, Bereiche, Branchen, Legal-Seiten usw. genutzt.
import Link from "next/link"
import { FooterBadges } from "@/components/site/footer-badges"
import { ConsentSettingsLink } from "@/components/site/consent-settings-link"

export function CarbonFooter() {
  return (
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
          <Link href="/loesungen/gtm-markteintritt" className="block py-[3px] text-[#9AA6B2] hover:text-white">Markteintritt</Link>
          <Link href="/loesungen/revops-umsatzgenerierung" className="block py-[3px] text-[#9AA6B2] hover:text-white">Umsatzgenerierung</Link>
          <b className="mb-[10px] mt-4 block text-[13px] tracking-[0.3px] text-white">TECHNOLOGIE</b>
          <Link href="/technologie" className="block py-[3px] text-[#9AA6B2] hover:text-white">Übersicht</Link>
          <Link href="/technologie/autonome-ki-agenten" className="block py-[3px] text-[#9AA6B2] hover:text-white">Autonome KI-Agenten</Link>
          <Link href="/technologie/multi-agenten-systeme" className="block py-[3px] text-[#9AA6B2] hover:text-white">Multi-Agenten-Systeme</Link>
          <Link href="/technologie/enterprise-integration" className="block py-[3px] text-[#9AA6B2] hover:text-white">Enterprise-Integration</Link>
        </div>

        {/* Bereiche */}
        <div>
          <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">BEREICHE</b>
          <Link href="/angebot/begeistern" className="block py-[3px] text-[#9AA6B2] hover:text-white">Begeistern</Link>
          <Link href="/angebot/umsetzen" className="block py-[3px] text-[#9AA6B2] hover:text-white">Umsetzen</Link>
          <Link href="/angebot/erschaffen" className="block py-[3px] text-[#9AA6B2] hover:text-white">Erschaffen</Link>
          <Link href="/angebot/erweitern" className="block py-[3px] text-[#9AA6B2] hover:text-white">Erweitern</Link>
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
        {/* Widerruf der Einwilligung – DSGVO Art. 7 Abs. 3 */}
        <ConsentSettingsLink className="inline-flex items-center gap-1.5 font-semibold hover:text-white" />
      </div>
    </footer>
  )
}
