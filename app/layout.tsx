import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Dancing_Script, Caveat } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { JsonLd } from "@/components/site/json-ld"
import { organizationJsonLd, SITE_NAME, SITE_URL, websiteJsonLd } from "@/lib/seo"

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
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable} ${dancingScript.variable} ${caveat.variable}`}
      >
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

        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
