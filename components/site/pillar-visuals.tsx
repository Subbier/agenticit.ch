"use client"

import { useState } from "react"
import { Hand, BadgeCheck, Bot, Target, PenTool, LineChart } from "lucide-react"

/* ---------- AI Agents: KI-Manager + spezialisierte Sub-Agenten ---------- */

const agents = [
  { icon: Target, label: "Strategie-Agent", desc: "Analysiert den Markt und steuert Ihre Kampagnen in Echtzeit." },
  { icon: PenTool, label: "Content-Agent", desc: "Erstellt konvertierende Werbemittel und Landingpages." },
  { icon: LineChart, label: "Daten-Agent", desc: "Optimiert Budgets rund um die Uhr für maximale Effizienz." },
]

export function AgentsInteractive() {
  const [sel, setSel] = useState(0)
  const [touched, setTouched] = useState(false)
  const pick = (i: number) => {
    setSel(i)
    setTouched(true)
  }
  const a = agents[sel]

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-3 sm:p-6">
      <style>{`@keyframes pvtap{0%,100%{transform:translate(0,0) scale(1);opacity:.9}50%{transform:translate(0,6px) scale(.82);opacity:.5}}`}</style>

      {/* Haupt-Agent */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-5 py-2.5">
          <Bot className="size-6 text-emerald-200" />
          <span className="text-base font-bold text-white">KI-Manager</span>
        </div>
      </div>
      <div className="mx-auto my-3 h-5 w-px bg-white/15" />
      <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Sub-Agenten</p>

      {/* Sub-Agenten als Icon-Kacheln */}
      <div className="relative grid grid-cols-3 gap-3">
        {agents.map((ag, i) => {
          const isSel = sel === i
          const SubIcon = ag.icon
          return (
            <button
              key={ag.label}
              onMouseEnter={() => pick(i)}
              onClick={() => pick(i)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2 transition ${
                isSel ? "border-emerald-300/60 bg-emerald-300/15" : "border-white/12 bg-white/[0.04] hover:bg-white/[0.07]"
              }`}
            >
              <span className={`flex size-9 items-center justify-center rounded-lg ${isSel ? "bg-emerald-300 text-black" : "bg-white/[0.06] text-emerald-200"}`}>
                <SubIcon className="size-5" />
              </span>
              <span className={`text-center text-[11px] sm:text-xs leading-tight ${isSel ? "font-semibold text-emerald-200" : "text-white/55"}`}>
                {ag.label}
              </span>
            </button>
          )
        })}
        {!touched && (
          <span className="pointer-events-none absolute -bottom-7 left-[6%]" style={{ animation: "pvtap 1.3s ease-in-out infinite" }}>
            <Hand className="size-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          </span>
        )}
      </div>

      <div className="mt-5 min-h-[76px] rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
        <p className="text-sm font-semibold text-white">Sub-Agent: {a.label}</p>
        <p className="mt-1 text-xs leading-5 text-white/65">{a.desc}</p>
      </div>
      {!touched && <p className="mt-2 text-center text-xs text-emerald-200/90">Tippen Sie auf einen Sub-Agenten</p>}
    </div>
  )
}

/* ---------- Excellence: Plattformen / Akkreditierungen (Trust) ---------- */

// si = Simple-Icons-Slug (einfarbiges Logo via CDN); slug = optionale eigene Datei.
type Brand = { name: string; slug: string; si?: string; mono: string; use: string }

const brands: Brand[] = [
  { name: "Google", slug: "google", si: "google", mono: "G", use: "Suche & Local Marketing" },
  { name: "Google Ads", slug: "google-ads", si: "googleads", mono: "GA", use: "Suchkampagnen & Performance" },
  { name: "Meta", slug: "meta", si: "meta", mono: "M", use: "Anzeigen & Retargeting" },
  { name: "Instagram", slug: "instagram", si: "instagram", mono: "IG", use: "Content & Reichweite" },
  { name: "LinkedIn", slug: "linkedin", si: "linkedin", mono: "in", use: "B2B-Ansprache" },
  { name: "TikTok", slug: "tiktok", si: "tiktok", mono: "TT", use: "Kurzvideo-Reichweite" },
  { name: "OpenAI", slug: "openai", si: "openai", mono: "OA", use: "KI-Texte & Dialoge" },
  { name: "Anthropic", slug: "anthropic", si: "anthropic", mono: "An", use: "KI-Agenten" },
  { name: "Microsoft", slug: "microsoft", mono: "MS", use: "Microsoft 365 & Ads" },
  { name: "Semrush", slug: "semrush", si: "semrush", mono: "SE", use: "SEO & Keyword-Daten" },
  { name: "Surfer SEO", slug: "surfer-seo", mono: "SF", use: "Content-Optimierung" },
  { name: "Nvidia", slug: "nvidia", si: "nvidia", mono: "Nv", use: "GPU- & KI-Infrastruktur" },
  { name: "Adobe", slug: "adobe", si: "adobe", mono: "Ad", use: "Design & Kreativ-Suite" },
  { name: "Zoho", slug: "zoho", si: "zoho", mono: "Z", use: "CRM & Automation" },
  { name: "Artlist", slug: "artlist", mono: "Al", use: "Musik, Video & Footage" },
]

// Einfarbig, heller Ton, transparenter Hintergrund.
const LOGO_HEX = "e2e8f0"

// Lokal vorhandene Logos (public/brands) – verhindert 404-Konsolenfehler durch blindes Durchprobieren.
const LOCAL_BRAND_FILES = new Set(["adobe.png", "artlist.png", "microsoft.png", "surfer-seo.png"])

// Reihenfolge: eigene Datei (public/brands) → Simple-Icons-CDN → Monogramm.
function BrandLogo({ brand, active }: { brand: Brand; active: boolean }) {
  const sources = [
    LOCAL_BRAND_FILES.has(`${brand.slug}.svg`) ? `/brands/${brand.slug}.svg` : null,
    LOCAL_BRAND_FILES.has(`${brand.slug}.png`) ? `/brands/${brand.slug}.png` : null,
    brand.si ? `https://cdn.simpleicons.org/${brand.si}/${LOGO_HEX}` : null,
  ].filter(Boolean) as string[]
  const [idx, setIdx] = useState(0)

  if (idx >= sources.length) {
    return <span className={`text-lg font-bold tracking-tight ${active ? "text-emerald-200" : "text-white/80"}`}>{brand.mono}</span>
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[idx]}
      alt={brand.name}
      onError={() => setIdx((i) => i + 1)}
      className="h-8 w-8 object-contain opacity-90"
      loading="lazy"
    />
  )
}

export function BrandsInteractive() {
  const [sel, setSel] = useState(0)
  const [touched, setTouched] = useState(false)
  const pick = (i: number) => {
    setSel(i)
    setTouched(true)
  }
  const b = brands[sel]

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-3 sm:p-6">
      <div className="mb-4 flex items-center justify-center gap-2 text-emerald-200">
        <BadgeCheck className="size-5" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em]">Akkreditiert &amp; zertifiziert</span>
      </div>

      {/* Einfarbige Logo-Kacheln (Monogramm) */}
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5">
        {brands.map((brand, i) => {
          const isSel = sel === i
          return (
            <button
              key={brand.name}
              onMouseEnter={() => pick(i)}
              onClick={() => pick(i)}
              title={brand.name}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border transition ${
                isSel ? "border-emerald-300/60 bg-emerald-300/15" : "border-white/12 bg-white/[0.04] hover:bg-white/[0.07]"
              }`}
            >
              <BrandLogo brand={brand} active={isSel} />
              <span className="px-1 text-center text-[10px] leading-tight text-white/55">{brand.name}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 min-h-[56px] rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
        <p className="text-sm font-semibold text-white">{b.name}</p>
        <p className="mt-0.5 text-xs leading-5 text-white/65">{b.use}</p>
      </div>
      {!touched && <p className="mt-2 text-center text-xs text-emerald-200/90">Tippen Sie auf eine Plattform</p>}
    </div>
  )
}
