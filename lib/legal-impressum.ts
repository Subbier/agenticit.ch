import type { LegalSectionContent } from "@/lib/legal-types"
import { company } from "./company"

export const impressumMeta = {
  title: "Impressum",
  description: `Impressum, Firmenangaben und Kontakt der ${company.legalName} in Ostermundigen bei Bern.`,
}

export const impressumSections: readonly LegalSectionContent[] = [
  {
    title: "Anbieter dieser Website",
    compact: true,
    paragraphs: [
      company.legalName,
      company.address.streetAddress,
      `${company.address.postalCode} ${company.address.addressLocality}`,
      "Schweiz",
      `UID: ${company.uid}`,
    ],
    links: [
      {
        label: "Firmenangaben im amtlichen UID-Register",
        href: company.registerUrl,
      },
    ],
  },
  {
    title: "Kontakt",
    compact: true,
    links: [
      { label: company.email, href: `mailto:${company.email}` },
      { label: company.phoneLabel, href: `tel:${company.phone}` },
    ],
  },
  {
    title: "Verantwortlich für Inhalt und Website",
    compact: true,
    paragraphs: ["Sabir Rastoder", "Certified AI Solution Architect"],
    links: [
      { label: "sr@agenticit.ch", href: "mailto:sr@agenticit.ch" },
      { label: "+41 76 202 01 36", href: "tel:+41762020136" },
      {
        label: "Sabir Rastoder auf LinkedIn",
        href: "https://www.linkedin.com/in/rastoder",
      },
    ],
  },
  {
    title: "Haftungsausschluss",
    paragraphs: [
      "Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.",
      `Haftungsansprüche gegen die ${company.legalName} wegen Schäden materieller oder ideeller Art, die durch die Nutzung oder Nichtnutzung der bereitgestellten Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind ausgeschlossen, soweit seitens der ${company.legalName} kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.`,
    ],
  },
  {
    title: "Urheberrecht",
    paragraphs: [
      `Alle Inhalte dieser Website (Texte, Grafiken, Logos, Bilder, Programmcode) sind urheberrechtlich geschützt. Jede Verwendung ausserhalb der Schranken des Urheberrechts bedarf der schriftlichen Zustimmung der ${company.legalName}.`,
    ],
  },
]
