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
  // CSP: erlaubt Next.js, GTM/GA, Vercel Analytics & Simple-Icons-CDN
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://cdn.simpleicons.org",
      "font-src 'self' data:",
      "media-src 'self' blob: mediastream:",
      "worker-src 'self' blob:",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://api.elevenlabs.io wss://api.elevenlabs.io https://*.elevenlabs.io wss://*.elevenlabs.io https://*.livekit.cloud wss://*.livekit.cloud",
      "frame-src https://www.googletagmanager.com",
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
  experimental: {
    serverComponentsExternalPackages: ["pdfkit", "qrcode", "nodemailer"],
    // pdfkit liest seine Schrift-Metriken (data/*.afm) und das sRGB-ICC-Profil zur
    // Laufzeit per fs.readFileSync. Vercels File-Tracing erkennt diese dynamischen
    // Pfade nicht und kopiert den data/-Ordner sonst NICHT ins Serverless-Lambda
    // → ENOENT "Helvetica.afm" → "Analyse konnte nicht erstellt werden".
    // Diese Includes erzwingen, dass die Dateien ins /api/analyse-Bundle gelangen.
    outputFileTracingIncludes: {
      "/api/analyse": ["./node_modules/pdfkit/js/data/**/*"],
      "/api/analyse/route": ["./node_modules/pdfkit/js/data/**/*"],
    },
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
      { source: "/sicherheit/:slug+", destination: "/sicherheit", permanent: true },
      // Entfernte/konsolidierte Seiten → passende Zielseite (301, SEO bleibt heil)
      { source: "/ai-agents", destination: "/technologie/autonome-ki-agenten", permanent: true },
      { source: "/revops", destination: "/loesungen/revops-growth", permanent: true },
      { source: "/smart-apps", destination: "/loesungen", permanent: true },
      { source: "/branchen", destination: "/loesungen", permanent: true },
      { source: "/branchen/:slug+", destination: "/loesungen", permanent: true },
      { source: "/car-dealerships", destination: "/", permanent: true },
      { source: "/unternehmen", destination: "/", permanent: true },
      { source: "/unternehmen/:slug+", destination: "/", permanent: true },
      { source: "/ueber-uns", destination: "/", permanent: true },
    ]
  },
}

export default nextConfig
