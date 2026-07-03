import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "RASTODER — Masterpiece",
  description: "An interactive cinematic journey from deep space to Bern and the Adriatic coast.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
