// Public company facts checked in the official UID register on 2026-10-19
// and the Swico member directory on 2026-10-17.
// Sources and unresolved claims are documented in docs/company-identity.md.
export const company = {
  legalName: "AgenticIT GmbH",
  brandName: "AgenticIT",
  description:
    "AgenticIT verbindet Marketing, Sales und digitale Abläufe für Schweizer Unternehmen: Websites, passende Tools, KI-Agenten und Prozessautomatisierung aus einer Hand.",
  email: "info@agenticit.ch",
  phone: "+41315394444",
  phoneLabel: "031 539 44 44",
  address: {
    streetAddress: "Eschenweg 12",
    postalCode: "3072",
    addressLocality: "Ostermundigen",
    addressRegion: "Bern",
    addressCountry: "CH",
  },
  uid: "CHE-157.845.314",
  registerUrl: "https://www.uid.admin.ch/Detail.aspx?uid_id=CHE157845314",
  uidUrl: "https://www.uid.admin.ch/Detail.aspx?uid_id=CHE157845314",
  logo: "/logos/agenticit-symbol.svg",
  swico: {
    name: "Swico",
    url: "https://www.swico.ch/de/",
    directoryUrl:
      "https://www.swico.ch/de/verband/mitgliedschaft/mitgliederverzeichnis/",
  },
} as const
