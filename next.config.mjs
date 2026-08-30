/** @type {import('next').NextConfig} */

const securityHeaders = [
  // HSTS: HTTPS erzwingen (2 Jahre, inkl. Subdomains, Preload-fähig)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Clickjacking-Schutz
  { key: "X-Frame-Options", value: "DENY" },
  // Origin-Isolation
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // MIME-Sniffing verhindern
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(self), geolocation=()",
  },
  // CSP: erlaubt Next.js, GTM/GA, Vercel Analytics, Simple-Icons-CDN sowie die im
  // GTM-Container GTM-K4TN9PVZ hinterlegten Marketing-Tags.
  //
  // WICHTIG (28.07.2026): Meta Pixel, TikTok Pixel und Zoho SalesIQ lagen seit zwei
  // Monaten im GTM-Container und wurden vom Browser blockiert, weil ihre Domains hier
  // fehlten. Die Freigabe unten macht sie technisch lauffähig. Sie feuern trotzdem
  // NICHT automatisch: im GTM hängen alle drei am Trigger „Consent Marketing erteilt"
  // (dataLayer-Event `consent_marketing_granted`). Ohne Consent-Banner wird dieses
  // Event nie ausgelöst — genau so gewollt, bis der Banner steht.
  //
  // Regel für neue Tools: NUR hier die Domain ergänzen, alles andere im GTM.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      [
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
        // Meta Pixel
        "https://connect.facebook.net",
        // TikTok Pixel
        "https://analytics.tiktok.com",
        // Zoho SalesIQ (EU-Rechenzentrum)
        "https://salesiq.zohopublic.eu https://css.zohostatic.eu",
      ].join(" "),
      "style-src 'self' 'unsafe-inline' https://css.zohostatic.eu",
      [
        "img-src 'self' data: blob:",
        "https://www.googletagmanager.com https://www.google-analytics.com https://cdn.simpleicons.org",
        "https://www.facebook.com",
        "https://analytics.tiktok.com",
        "https://salesiq.zohopublic.eu https://css.zohostatic.eu https://*.zohostatic.eu",
      ].join(" "),
      "font-src 'self' data: https://css.zohostatic.eu",
      "media-src 'self' blob: mediastream: https://css.zohostatic.eu",
      "worker-src 'self' blob:",
      [
        "connect-src 'self'",
        "https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
        "https://vitals.vercel-insights.com",
        "https://api.elevenlabs.io wss://api.elevenlabs.io https://*.elevenlabs.io wss://*.elevenlabs.io",
        "https://*.livekit.cloud wss://*.livekit.cloud",
        // Meta Pixel
        "https://connect.facebook.net https://www.facebook.com",
        // TikTok Pixel
        "https://analytics.tiktok.com https://*.tiktok.com",
        // Zoho SalesIQ inkl. WebSocket für den Live-Chat
        "https://salesiq.zohopublic.eu wss://salesiq.zohopublic.eu https://*.zoho.eu wss://*.zoho.eu",
      ].join(" "),
      "frame-src https://www.googletagmanager.com https://www.facebook.com https://salesiq.zohopublic.eu",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
]

const nextConfig = {
  // ESM-only Pakete (ElevenLabs Voice-SDK) müssen von Next transpiliert werden.
  transpilePackages: ["@elevenlabs/react", "@elevenlabs/client"],
  // Diese Node-Bibliotheken NICHT bundlen – sonst gehen interne Dateien verloren
  // (pdfkit-Schriften .afm, nodemailer, qrcode). Werden zur Laufzeit aus node_modules geladen.
  serverExternalPackages: ["pdfkit", "qrcode", "nodemailer"],
  // pdfkit liest seine Schrift-Metriken (data/*.afm) und das sRGB-ICC-Profil zur
  // Laufzeit per fs.readFileSync. Vercels File-Tracing erkennt diese dynamischen
  // Pfade nicht und kopiert den data/-Ordner sonst NICHT ins Serverless-Lambda
  // → ENOENT "Helvetica.afm" → "Analyse konnte nicht erstellt werden".
  // Diese Includes erzwingen, dass die Dateien ins /api/analyse-Bundle gelangen.
  outputFileTracingIncludes: {
    "/api/analyse": ["./node_modules/pdfkit/js/data/**/*"],
    "/api/analyse/route": ["./node_modules/pdfkit/js/data/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
  // Konsolidierte Hubs: alte Unterseiten dauerhaft auf die Hauptseite leiten (SEO/Links bleiben heil).
  async redirects() {
    return [
      // www → Hauptdomain. Ohne diese Regel liefert www.agenticit.ch auf allen
      // Unterseiten 404 und erzeugt eine zusätzliche Weiterleitungsstufe.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.agenticit.ch" }],
        destination: "https://agenticit.ch/:path*",
        permanent: true,
      },
      // Doppelte Rechner-Seite: /potenzialrechner und /potenzial behandelten
      // dasselbe Thema und konkurrierten in der Suche gegeneinander.
      { source: "/potenzialrechner", destination: "/potenzial", permanent: true },
      { source: "/sicherheit/:slug+", destination: "/sicherheit", permanent: true },
      // Entfernte/konsolidierte Seiten → passende Zielseite (301, SEO bleibt heil)
      { source: "/ai-agents", destination: "/technologie/autonome-ki-agenten", permanent: true },
      { source: "/revops", destination: "/loesungen/revops-umsatzgenerierung", permanent: true },
      { source: "/smart-apps", destination: "/loesungen", permanent: true },
      // /branchen ist neu eine echte Seite (Vertrieb-Spezialisierung) – keine Weiterleitung mehr.
      { source: "/car-dealerships", destination: "/", permanent: true },
      { source: "/unternehmen", destination: "/", permanent: true },
      { source: "/unternehmen/:slug+", destination: "/", permanent: true },
      { source: "/ueber-uns", destination: "/", permanent: true },
      // GTM/RevOps-Split (26.07.2026): alte Lösungen-Unterseiten → neue Hub-Seiten
      { source: "/loesungen/kundendienst-ki", destination: "/loesungen/revops-umsatzgenerierung", permanent: true },
      { source: "/loesungen/prozessautomatisierung", destination: "/loesungen/revops-umsatzgenerierung", permanent: true },
      { source: "/loesungen/revops-growth", destination: "/loesungen/gtm-markteintritt", permanent: true },
      // Angebot-Umbenennung (26.07.2026): Acquire/Convert/Retain/Operate → Begeistern/Umsetzen/Erschaffen/Erweitern
      { source: "/angebot/acquire", destination: "/angebot/begeistern", permanent: true },
      { source: "/angebot/convert", destination: "/angebot/umsetzen", permanent: true },
      { source: "/angebot/retain", destination: "/angebot/erschaffen", permanent: true },
      { source: "/angebot/operate", destination: "/angebot/erweitern", permanent: true },
    ]
  },
}

export default nextConfig
