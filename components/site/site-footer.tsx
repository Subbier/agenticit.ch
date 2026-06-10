import Link from "next/link"
import { Linkedin, Mail, MapPin } from "lucide-react"
import { navItems } from "@/lib/site-content"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-white text-sm font-black text-neutral-950">
              AI
            </span>
            <span className="text-lg font-semibold text-white">AgenticIT</span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
            Autonome KI-Agenten, Omnichannel-Journeys und Predicting Intelligence für Schweizer Unternehmen, die
            schneller reagieren und präziser wachsen wollen.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Lösungen</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/60">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Kontakt</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/60">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-emerald-200" />
              Schweiz
            </li>
            <li>
              <a href="mailto:hello@agenticit.ch" className="flex items-center gap-2 transition hover:text-white">
                <Mail className="size-4 text-emerald-200" />
                hello@agenticit.ch
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 transition hover:text-white">
                <Linkedin className="size-4 text-emerald-200" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} AgenticIT. Alle Rechte vorbehalten.</p>
        <div className="flex gap-4">
          <Link href="/datenschutz" className="transition hover:text-white">
            Datenschutz
          </Link>
          <Link href="/impressum" className="transition hover:text-white">
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  )
}
