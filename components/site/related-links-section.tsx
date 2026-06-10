import Link from "next/link"
import { ArrowRight } from "lucide-react"

type RelatedLink = {
  label: string
  href: string
  description: string
}

type RelatedLinksSectionProps = {
  title?: string
  links: RelatedLink[]
}

export function RelatedLinksSection({
  title = "Passende Lösungen",
  links,
}: RelatedLinksSectionProps) {
  return (
    <section className="px-4 pb-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">{title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition-all hover:border-emerald-300/30 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-white">{link.label}</h3>
                <ArrowRight className="size-4 shrink-0 text-emerald-200 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
