// Server-Komponente: reicht die Navigationsdaten an den gemeinsamen Header weiter.
//
// Bis 29.07.2026 war dies ein eigener Header mit einer HUBS-Liste, die es in
// carbon-header.tsx ein zweites Mal gab. Beides ist jetzt `main-header.tsx`.
//
// Warum diese Datei bleibt: rund 30 Seiten importieren `SiteHeader`. Ein
// Import-Umbau über die halbe Codebasis wäre die riskantere Änderung — der
// Umstieg passiert schrittweise.
//
// Änderungen an der Navigation gehören in `site-nav-data.ts`, NICHT hierher.

import { MainHeader } from "@/components/site/main-header"
import { NAV_HUBS } from "@/components/site/site-nav-data"

export function SiteHeader({ activeSlug }: { activeSlug?: string }) {
  return <MainHeader hubs={NAV_HUBS} activeSlug={activeSlug} />
}
