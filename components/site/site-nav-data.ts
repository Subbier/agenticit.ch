// Einzige Quelle der Wahrheit für die Hauptnavigation.
//
// Bis 29.07.2026 lag dieselbe HUBS-Liste doppelt vor — in site-header.tsx und in
// carbon-header.tsx. Jede Menü-Änderung musste an zwei Stellen gemacht werden.
// Diese Datei ersetzt beide. Wer die Navigation ändert, ändert sie hier.
//
// Seit 29.07.2026 zeigt das Mega-Menü ausschliesslich die Namen der Menüpunkte —
// keine Kurztexte, keine Eyebrows, keine Teaser-Kachel.

import { SUBPAGES_BY_PARENT } from "@/lib/subpage-content"
import { ANGEBOT_AREAS } from "@/lib/angebot-content"

export type NavItem = {
  label: string
  href: string
}

export type NavHub = {
  label: string
  /** Zielseite des Hubs selbst. Immer gesetzt — auch „Lösungen" und „Bereiche"
   *  verlinken jetzt ihre eigene Seite. Vorher waren sie `dropdownOnly`, wodurch
   *  /loesungen und /angebot aus der Navigation keinen einzigen internen Link
   *  bekamen. Die Search Console meldete /loesungen deshalb als
   *  „Gefunden – zurzeit nicht indexiert". */
  href: string
  items: NavItem[]
}

/** Lösungen zeigt im Menü bewusst nur die zwei Kern-Angebote (GTM + RevOps).
 *  Kundendienst-KI und Prozessautomatisierung bleiben als Seiten bestehen und
 *  in der Sitemap — nur nicht mehr in der Hauptnavigation (Stand 29.07.2026).
 *  Im Dropdown stehen nur die Kurznamen (29.07.2026). */
const LOESUNGEN_IM_MENUE: Record<string, string> = {
  "loesungen/gtm-markteintritt": "GTM",
  "loesungen/revops-umsatzgenerierung": "RevOps",
}

const loesungen: NavItem[] = (SUBPAGES_BY_PARENT["loesungen"] ?? [])
  .filter((p) => p.slug in LOESUNGEN_IM_MENUE)
  .map((p) => ({ label: LOESUNGEN_IM_MENUE[p.slug], href: `/${p.slug}` }))

/** Technologie im Dropdown: nur die drei Kern-Themen mit Kurznamen (29.07.2026). */
const TECHNOLOGIE_IM_MENUE: Record<string, string> = {
  "technologie/autonome-ki-agenten": "KI-Agenten",
  "technologie/multi-agenten-systeme": "Agent Teams",
  "technologie/enterprise-integration": "Enterprise",
}

const technologie: NavItem[] = (SUBPAGES_BY_PARENT["technologie"] ?? [])
  .filter((p) => p.slug in TECHNOLOGIE_IM_MENUE)
  .map((p) => ({ label: TECHNOLOGIE_IM_MENUE[p.slug], href: `/${p.slug}` }))

const bereiche: NavItem[] = ANGEBOT_AREAS.map((a) => ({
  label: a.navLabel,
  href: `/${a.slug}`,
}))

export const NAV_HUBS: NavHub[] = [
  { label: "Lösungen", href: "/loesungen", items: loesungen },
  { label: "Bereiche", href: "/angebot", items: bereiche },
  { label: "Technologie", href: "/technologie", items: technologie },
  {
    label: "Unternehmen",
    href: "/kontakt",
    items: [
      { label: "Branchen", href: "/branchen" },
      { label: "Blog", href: "/blog" },
      { label: "Karriere", href: "/karriere" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Admin", href: "https://agenticit-admin.vercel.app" },
    ],
  },
]

export const CONTACT_PHONE_TEL = "+41315394444"
export const CONTACT_PHONE_LABEL = "031 539 44 44"
