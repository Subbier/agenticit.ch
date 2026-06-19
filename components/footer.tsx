"use client"
import type React from "react"
import type { ComponentProps, ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { LinkedinIcon, ShieldCheck, Lock, Server } from "lucide-react"
import { AgenticITWordmark } from "@/components/agenticit-wordmark"

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: "Services",
    links: [
      { title: "RevOps", href: "/revops" },
      { title: "AI Agents", href: "/ai-agents" },
      { title: "Excellence", href: "/excellence" },
      { title: "Smart Apps", href: "/smart-apps" },
    ],
  },
  {
    label: "Agentic AI",
    links: [
      { title: "Agentic AI", href: "/agentic-ai" },
      { title: "KI-Agenten für Unternehmen", href: "/ki-agenten-unternehmen" },
    ],
  },
  {
    label: "Unternehmen",
    links: [
      { title: "Über uns", href: "/ueber-uns" },
      { title: "Kontakt", href: "#contact" },
      { title: "Datenschutz", href: "/datenschutz" },
      { title: "Impressum", href: "/impressum" },
    ],
  },
  {
    label: "Ressourcen",
    links: [
      { title: "Case Studies", href: "/case-studies" },
      { title: "Lead-Rechner", href: "/#roi-calculator" },
      { title: "Live-Demo", href: "#ai-team" },
    ],
  },
]

function SwissCross({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-[#D52B1E] ${className ?? ""}`}
    >
      <svg viewBox="0 0 32 32" className="size-3" fill="none">
        <rect x="13" y="6" width="6" height="20" fill="#fff" />
        <rect x="6" y="13" width="20" height="6" fill="#fff" />
      </svg>
    </span>
  )
}

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 530" className={className} fill="currentColor" aria-hidden>
      <path d="M135.7 44C202.6 94.3 274.6 196.3 301 251.1c26.4-54.8 98.4-156.8 165.3-207.1C514.6 7.8 593-19.3 593 70.1c0 17.9-10.2 150.3-16.2 171.8-20.9 74.7-97.1 93.8-164.9 82.3 118.5 20.2 148.7 87 83.6 153.8-123.6 126.9-177.7-31.8-191.6-72.5-2.5-7.5-3.7-11-3.7-8 0-3-1.2 .5-3.7 8-13.9 40.7-68 199.4-191.6 72.5-65.1-66.8-34.9-133.6 83.6-153.8C124.3 325.7 48.1 306.6 27.2 231.9 21.2 210.4 11 78 11 60.1c0-89.4 78.4-62.3 124.7-16.1z" />
    </svg>
  )
}

const trustBadges = [
  { icon: ShieldCheck, label: "revDSG (Schweiz) konform" },
  { icon: ShieldCheck, label: "DSGVO-konform" },
  { icon: Server, label: "Daten in der Schweiz" },
  { icon: Lock, label: "Verantwortungsvolle KI · Human-in-the-Loop" },
]

export function Footer() {
  return (
    <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <AgenticITWordmark size="footer" className="text-white" />
          <p className="text-muted-foreground text-sm max-w-sm mt-4">
            KI-Agenten, Omnichannel-Automation und Predictive Lead Scoring für Schweizer Unternehmen – DSG-konform und
            mit Daten in der Schweiz.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            <SwissCross />
            <span className="text-xs font-medium text-white/80">Entwickelt &amp; betrieben in der Schweiz</span>
          </div>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">{section.label}</h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="hover:text-foreground inline-flex items-center transition-all duration-300"
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      {/* Haltung / Verantwortungsvolle KI – führt zu /ueber-uns */}
      <div className="mt-12 w-full border-t border-foreground/10 pt-8 text-center">
        <a href="/ueber-uns" className="group inline-block">
          <p className="text-base font-semibold text-white transition-colors group-hover:text-emerald-200 sm:text-lg">
            Technologie im Dienst des Menschen.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/60">
            Wir bauen KI, die entlastet, befähigt und Zugang schafft – nicht ersetzt. Nachvollziehbar, erkennbar und
            immer mit dem Menschen am Steuer.
          </p>
          <span className="mt-3 inline-block text-xs font-medium text-emerald-300/90 transition-colors group-hover:text-emerald-200">
            Unsere Haltung zu KI &rarr;
          </span>
        </a>
      </div>

      {/* Trust- / Compliance-Leiste */}
      <div className="mt-8 w-full pt-2">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {trustBadges.map((b) => {
            const Icon = b.icon
            return (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75"
              >
                <Icon className="size-3.5 text-emerald-300" />
                {b.label}
              </span>
            )
          })}
        </div>
        <div className="mt-7 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/agenticit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AgenticIT auf LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/75 transition-colors hover:text-white"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href="https://bsky.app/profile/agenticit.ch"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AgenticIT auf Bluesky"
              className="flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/75 transition-colors hover:text-white"
            >
              <BlueskyIcon className="size-4" />
            </a>
          </div>
          <p className="text-muted-foreground text-center text-xs">
            © {new Date().getFullYear()} Agentic IT GmbH · AgenticIT. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>["className"]
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
