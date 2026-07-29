import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Dancing_Script, Caveat, Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { GeistMono } from "geist/font/mono"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})
import { JsonLd } from "@/components/site/json-ld"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { ConsentBanner } from "@/components/site/consent-banner"
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent"
import { localBusinessJsonLd, organizationJsonLd, SITE_NAME, SITE_URL, websiteJsonLd } from "@/lib/seo"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

// Carbon & Signal – Display-/Mono-Fonts, nur von den neuen Bereichsseiten genutzt.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Agentic AI für Enterprise-Wachstum`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "KI Agenten, Omnichannel-Automation und Predicting Lead Scoring für Schweizer KMU. Speed-to-Lead in Minuten – AgenticIT.",
  generator: SITE_NAME,
  applicationName: SITE_NAME,
  authors: [{ name: "Agentic IT GmbH", url: SITE_URL }],
  creator: "Agentic IT GmbH",
  publisher: "Agentic IT GmbH",
  formatDetection: { email: false, address: false, telephone: false },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de-CH" className="dark">
      <body
        className={`font-sans antialiased ${inter.variable} ${GeistMono.variable} ${dancingScript.variable} ${caveat.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      >
        {/*
          Google Consent Mode v2 – MUSS vor dem GTM-Loader ausgeführt werden.
          `beforeInteractive` sorgt dafür, dass Next dieses Script in den <head>
          der ausgelieferten HTML-Seite hebt, unabhängig von der Position hier.
          Setzt alle nicht notwendigen Kategorien auf "denied" und spielt eine
          bereits getroffene Entscheidung sofort wieder ein — sonst würde GA4
          beim ersten Seitenaufbau ohne Einwilligung messen.
        */}
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
        />

        {/* Google Tag Manager (noscript) – muss direkt nach dem öffnenden <body> stehen */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K4TN9PVZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Tag Manager – lazyOnload, damit GTM den Hauptthread beim Seitenaufbau nicht blockiert */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K4TN9PVZ');`}
        </Script>

        <JsonLd data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]} />
        <Suspense fallback={null}>{children}</Suspense>
        <ChatbotWidget />
        <ConsentBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
