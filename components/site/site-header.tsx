import Link from "next/link"
import { SUBPAGES_BY_PARENT } from "@/lib/subpage-content"

type NavHub = { label: string; slug: string }

const HUBS: NavHub[] = [
  { label: "Lösungen", slug: "loesungen" },
  { label: "Technologie", slug: "technologie" },
  { label: "Sicherheit", slug: "sicherheit" },
  { label: "Branchen", slug: "branchen" },
  { label: "Unternehmen", slug: "unternehmen" },
]

// Kontaktdaten – E-Mail wie im restlichen Repo (Impressum/Datenschutz).
// ⚠️ Telefonnummer ist ein Platzhalter – bitte durch die echte Nummer ersetzen.
const CONTACT_EMAIL = "hello@agenticit.ch"
const CONTACT_PHONE_TEL = "+41000000000"
const CONTACT_PHONE_LABEL = "+41 00 000 00 00"

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5h3l1.2 4-2 1.4a12 12 0 0 0 5 5l1.4-2 4 1.2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SiteHeader({ activeSlug }: { activeSlug?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1F3A]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-5 px-6">
        <Link href="/" className="text-[19px] font-extrabold tracking-[-0.3px] text-white">
          Agentic<span className="text-[#16C7C0]">IT</span>
        </Link>

        {/* Desktop-Navigation mit Dropdowns */}
        <nav className="ml-3 hidden items-center gap-2 md:flex lg:gap-3">
          {HUBS.map((hub) => {
            const subs = SUBPAGES_BY_PARENT[hub.slug] ?? []
            const isActive = activeSlug === hub.slug || activeSlug?.startsWith(`${hub.slug}/`)
            return (
              <div key={hub.slug} className="group relative">
                <Link
                  href={`/${hub.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center gap-1 rounded-[8px] px-3 py-2 text-[14.5px] font-semibold transition ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {hub.label}
                  <svg
                    className="h-3 w-3 opacity-70 transition group-hover:rotate-180"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                {/* Dropdown-Panel */}
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-[260px] rounded-[14px] border border-[#E3E9F2] bg-white p-2 shadow-[0_18px_48px_rgba(11,31,58,0.22)]">
                    <Link
                      href={`/${hub.slug}`}
                      className="block rounded-[9px] px-3 py-2 text-[13px] font-extrabold uppercase tracking-[0.4px] text-[#0a8f89] hover:bg-[#F1F8FF]"
                    >
                      {hub.label} – Übersicht
                    </Link>
                    {subs.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/${s.slug}`}
                        className="block rounded-[9px] px-3 py-[9px] text-[14px] font-semibold text-[#0B1F3A] hover:bg-[#F1F8FF] hover:text-[#0a8f89]"
                      >
                        {s.navLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Menü-Linie als Abschluss der Navigation */}
          <span className="ml-1 h-5 w-px bg-white/15" aria-hidden="true" />
        </nav>

        {/* Direktkontakt: anrufen / schreiben – zentriert zwischen Menü-Linie und Button */}
        <div className="hidden flex-1 items-center justify-center gap-5 md:flex lg:gap-6">
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            aria-label={`Anrufen: ${CONTACT_PHONE_LABEL}`}
            title={`Anrufen: ${CONTACT_PHONE_LABEL}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-[#16C7C0]/60 hover:bg-white/5 hover:text-white"
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label={`E-Mail schreiben: ${CONTACT_EMAIL}`}
            title={`E-Mail schreiben: ${CONTACT_EMAIL}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-[#16C7C0]/60 hover:bg-white/5 hover:text-white"
          >
            <MailIcon className="h-[18px] w-[18px]" />
          </a>
        </div>

        <a
          href="/#kontakt"
          className="hidden rounded-[10px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-[18px] py-[10px] text-[14px] font-extrabold text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)] md:inline-block"
        >
          Jetzt starten →
        </a>

        {/* Mobile-Menü (ohne JS, native <details>) */}
        <details className="group relative ml-auto md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-[10px] border border-white/15 px-3 py-2 text-[14px] font-semibold text-white [&::-webkit-details-marker]:hidden">
            Menü
            <svg className="h-3.5 w-3.5 transition group-open:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="absolute right-0 top-full mt-2 max-h-[70vh] w-[280px] overflow-auto rounded-[14px] border border-[#E3E9F2] bg-white p-3 shadow-[0_18px_48px_rgba(11,31,58,0.28)]">
            {HUBS.map((hub) => {
              const subs = SUBPAGES_BY_PARENT[hub.slug] ?? []
              return (
                <div key={hub.slug} className="mb-2 last:mb-0">
                  <Link href={`/${hub.slug}`} className="block rounded-[9px] px-2 py-2 text-[14px] font-extrabold text-[#0B1F3A] hover:bg-[#F1F8FF]">
                    {hub.label}
                  </Link>
                  <div className="ml-2 border-l border-[#E3E9F2] pl-2">
                    {subs.map((s) => (
                      <Link key={s.slug} href={`/${s.slug}`} className="block rounded-[8px] px-2 py-[7px] text-[13.5px] text-[#5A6B82] hover:bg-[#F1F8FF] hover:text-[#0a8f89]">
                        {s.navLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#E3E9F2] pt-3">
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="flex items-center justify-center gap-2 rounded-[10px] border border-[#E3E9F2] px-3 py-[10px] text-[13.5px] font-bold text-[#0B1F3A] hover:bg-[#F1F8FF]">
                <PhoneIcon className="h-4 w-4 text-[#0a8f89]" /> Anrufen
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center justify-center gap-2 rounded-[10px] border border-[#E3E9F2] px-3 py-[10px] text-[13.5px] font-bold text-[#0B1F3A] hover:bg-[#F1F8FF]">
                <MailIcon className="h-4 w-4 text-[#0a8f89]" /> Schreiben
              </a>
            </div>
            <a href="/#kontakt" className="mt-2 block rounded-[10px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-3 py-[11px] text-center text-[14px] font-extrabold text-white">
              Jetzt starten →
            </a>
          </div>
        </details>
      </div>
    </header>
  )
}
