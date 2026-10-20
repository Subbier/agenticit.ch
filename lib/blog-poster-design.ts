// Shared editorial cover system. Each cover is a new vector composition;
// supplied video frames and original posters remain unchanged.
export const posterHeadlines: Record<string, readonly string[]> = {
  "buchhaltung-automatisieren-ki": ["Belege rein.", "Routine raus."],
  "change-management-mit-ki": ["Neue Technik.", "Ihr Team kommt mit."],
  "eigene-ki-agenten-vs-chatgpt": ["Eigener Agent.", "Oder ChatGPT?"],
  "haeufige-ki-fehler-vermeiden": ["KI einführen.", "Fehler vermeiden."],
  "ki-agent-entwickeln-lassen": ["Ihr erster", "KI-Agent."],
  "ki-agenten": ["KI-Agenten.", "Was zählt wirklich?"],
  "ki-agenten-praxisbeispiele-schweiz": [
    "Weniger Theorie.",
    "Mehr KI im Alltag.",
  ],
  "ki-agenten-sicherheit-compliance": ["KI mit klaren", "Grenzen."],
  "ki-automatisierung-vertrieb": ["Vertrieb, der", "zusammenspielt."],
  "ki-datenanalyse-kmu": ["Aus Zahlen", "wird Klarheit."],
  "ki-datenschutz-schweiz-ndsg": ["Ihre Daten.", "Klare Spielregeln."],
  "ki-einfuehrung-schritt-fuer-schritt": [
    "Mit KI starten.",
    "Schritt für Schritt.",
  ],
  "ki-email-management": ["Weniger Postfach.", "Mehr Überblick."],
  "ki-im-kundenservice-leitfaden": ["Guter Service.", "Klare Übergaben."],
  "ki-im-verkaufsgespraech": ["Gut vorbereitet.", "Besser beraten."],
  "ki-roi-berechnen": ["Was bringt KI", "Ihrem Betrieb?"],
  "ki-social-media-automatisierung": ["Social Media.", "Mit einem Plan."],
  "ki-sprachassistent-telefonie": ["Ein guter Empfang.", "Auch am Telefon."],
  "ki-trends-2026-schweiz": ["Was bleibt", "vom KI-Hype?"],
  "ki-vs-mensch-im-service": ["KI oder Mensch?", "Das richtige Team."],
  "kundenakquise-methoden": ["Neue Kunden.", "Mit System."],
  "landingpage-oder-website": ["Landingpage.", "Oder Website?"],
  "leadgenerierung-ki": ["Passende Leads.", "Klare nächste Schritte."],
  "leadgenerierung-mit-ki-leitfaden": [
    "Ein guter Anlass.",
    "Für neue Kontakte.",
  ],
  "marketing-automatisierung-kmu": ["Marketing, das", "zusammenspielt."],
  "multi-agenten-systeme-erklaert": ["Mehrere Agenten.", "Eine klare Aufgabe."],
  "neukundengewinnung-kmu-schweiz": ["Vom Interesse", "zum Neukunden."],
  "prozessautomatisierung-kmu-leitfaden": [
    "Weniger Handarbeit.",
    "Mehr Freiraum.",
  ],
  "revops-as-a-service": ["Marketing. Sales.", "Ein gemeinsamer Weg."],
  "revops-metriken-kennzahlen": ["Messen, was", "weiterbringt."],
  "speed-to-lead-5-minuten-regel": [
    "Die Anfrage ist da.",
    "Was passiert jetzt?",
  ],
  "webdesign-kosten-schweiz": ["Was kostet", "Ihre neue Website?"],
  "website-briefing-vorlage": ["Eine gute Website", "beginnt mit Klarheit."],
  "werbung-fuer-kmu": ["Der richtige Kanal.", "Für Ihre Kunden."],
}

const escapeXml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  )

const motifs = {
  marketing: `<circle cx="792" cy="274" r="108"/><circle cx="792" cy="274" r="76"/><circle cx="792" cy="274" r="43"/><path d="M684 274h216M792 166v216"/><circle cx="792" cy="274" r="6" fill="#8fe05a" stroke="none"/>`,
  sales: `<path d="M694 361V197h190M694 329l48-46 46 15 90-102"/><path d="M843 196h35v35"/><path d="M733 361v-36m55 36v-41m55 41v-94"/><circle cx="788" cy="298" r="6" fill="#8fe05a" stroke="none"/>`,
  operations: `<rect x="684" y="185" width="72" height="72" rx="12"/><rect x="824" y="290" width="72" height="72" rx="12"/><path d="M756 221h65q39 0 39 39v30M720 257v30q0 39 39 39h65"/><circle cx="720" cy="221" r="6" fill="#8fe05a" stroke="none"/><path d="m845 326 11 11 21-24"/>`,
  "getting-started": `<path d="M704 198h176v151H704zM704 248h176M762 198v151M822 198v151M704 299h176"/><circle cx="792" cy="274" r="75"/><path d="m765 274 19 19 36-39"/><circle cx="880" cy="198" r="6" fill="#8fe05a" stroke="none"/>`,
} as const

export function makeEditorialPoster(
  slug: string,
  topic: keyof typeof motifs,
  label: string,
) {
  const lines = posterHeadlines[slug]
  if (!lines) throw new Error(`Missing poster headline: ${slug}`)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
  <rect width="960" height="540" fill="#31452d"/>
  <path d="M64 110h832M64 443h832" stroke="#5d7056" stroke-width="1"/>
  <text x="64" y="72" fill="#f4f5ef" font-family="Arial, sans-serif" font-size="29" font-weight="700">Agentic<tspan font-weight="400">IT</tspan></text>
  <text x="896" y="69" text-anchor="end" fill="#c0cbb8" font-family="Arial, sans-serif" font-size="12" letter-spacing="3">WISSEN IN BILD &amp; TON</text>
  <path d="M64 158h32" stroke="#8fe05a" stroke-width="3"/>
  <text x="64" y="191" fill="#c0cbb8" font-family="Arial, sans-serif" font-size="13" letter-spacing="2.2">${escapeXml(label.toLocaleUpperCase("de-CH"))}</text>
  <text fill="#f4f5ef" font-family="Arial, sans-serif" font-size="52" font-weight="600" letter-spacing="-1.7">${lines.map((line, index) => `<tspan x="61" y="${272 + index * 64}">${escapeXml(line)}</tspan>`).join("")}</text>
  <path d="M638 158v232" stroke="#5d7056" stroke-width="1"/>
  <g fill="none" stroke="#c0cbb8" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${motifs[topic]}</g>
  <text x="480" y="483" text-anchor="middle" fill="#c0cbb8" font-family="Arial, sans-serif" font-size="12" letter-spacing="2">KLARTEXT FÜR SCHWEIZER KMU</text>
  </svg>`
}
