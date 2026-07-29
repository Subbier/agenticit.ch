// Server-Komponente: reicht die Navigationsdaten an den gemeinsamen Header weiter.
//
// Bis 29.07.2026 war dies ein zweiter, fast identischer Header nur für die
// Carbon-Seiten (Lösungen, Bereiche, Technologie, Branchen) — mit derselben
// Navigationsliste wie site-header.tsx. Jede Menü-Änderung musste doppelt
// gemacht werden, und die weissen Dropdown-Panels passten nicht zum dunklen
// Carbon-&-Signal-Design.
//
// Beides ist jetzt vereint in `main-header.tsx`, die Struktur in `site-nav-data.ts`.
//
// Offener Aufräumpunkt: Importe schrittweise auf `SiteHeader` (oder direkt
// `MainHeader`) umstellen, dann diese Datei löschen.

import { MainHeader } from "@/components/site/main-header"
import { NAV_HUBS } from "@/components/site/site-nav-data"

export function CarbonHeader({ activeSlug }: { activeSlug?: string }) {
  return <MainHeader hubs={NAV_HUBS} activeSlug={activeSlug} />
}
