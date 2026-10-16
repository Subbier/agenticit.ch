import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  HeartHandshake,
  MessagesSquare,
  Phone,
  Search,
  ClipboardCheck,
  Network,
} from "lucide-react"
import { challenges, journeyFaqs, packages } from "@/lib/journey"
import { serviceDetailLinks } from "@/lib/core-services"
import styles from "./journey.module.css"

const icons = {
  search: Search,
  messages: MessagesSquare,
  clock: Clock3,
  check: ClipboardCheck,
  phone: Phone,
  heart: HeartHandshake,
  network: Network,
}

export function ChallengeCards() {
  return (
    <div className={styles.challengeGrid}>
      {challenges.map((challenge) => {
        const Icon = icons[challenge.icon]
        return (
          <Link
            href={
              challenge.id === "admin"
                ? "/automatisierungs-check"
                : challenge.id === "acquisition"
                  ? "/marketing-setup-check"
                  : `/kundenreise-check?thema=${challenge.id}`
            }
            key={challenge.id}
            className={`${styles.challengeCard} ${challenge.id === "partnership" ? styles.challengeWide : ""}`}
          >
            <span className={styles.cardIcon}>
              <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3>{challenge.label}</h3>
            <p>{challenge.description}</p>
            <span className={styles.cardBottom}>
              {challenge.magnet}
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export function PackageCards({ expanded = false }: { expanded?: boolean }) {
  return (
    <>
      <div className={styles.packageGrid}>
        {packages.map((item, index) => (
          <article
            key={item.id}
            className={`${styles.package} ${index === 1 ? styles.featuredPackage : ""}`}
          >
            <span className={styles.packageNumber}>BEREICH {item.number}</span>
            {expanded ? <h2>{item.title}</h2> : <h3>{item.title}</h3>}
            <p>{item.short}</p>
            <p className={styles.scope}>{item.scope}</p>
            <ul>
              {item.items.map((line) => (
                <li key={line}>
                  <Check size={15} aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
            {expanded ? (
              <>
                <p>
                  <strong>So prüfen wir den Nutzen</strong>
                  <br />
                  {item.outcome}
                </p>
                <p>
                  <strong>Das brauchen wir von Ihnen</strong>
                  <br />
                  {item.requirement}
                </p>
                <nav
                  className={styles.serviceDetails}
                  aria-label={`Leistungen ${item.title}`}
                >
                  {serviceDetailLinks[item.id].map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label} <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  ))}
                </nav>
              </>
            ) : null}
            <Link
              href={
                item.id === "acquisition"
                  ? "/marketing-setup-check"
                  : `/kundenreise-check?thema=${item.challenge}`
              }
              className={styles.secondary}
            >
              Einstieg finden <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
      <p className={styles.packageNote}>
        Sie wählen Ihren Einstieg. Umfang, Preis, Dauer und Fremdkosten
        vereinbaren wir vor dem Start. Über den Ausbau entscheiden Sie.
      </p>
    </>
  )
}

export function CollaborationSteps() {
  const steps = [
    [
      "01",
      "Einordnen",
      "Wir verstehen Ihre Herausforderung, den heutigen Ablauf und die beteiligten Menschen.",
    ],
    [
      "02",
      "Planen",
      "Wir stellen die passenden Services zusammen und vereinbaren Umfang, Zuständigkeiten und Ergebnis.",
    ],
    [
      "03",
      "Umsetzen",
      "Wir richten die Lösung ein, binden Ihr Team ein und prüfen reale Vorgänge.",
    ],
    [
      "04",
      "Begleiten",
      "Wir werten den Nutzen aus und vereinbaren die passende Übergabe, Betreuung oder Weiterentwicklung.",
    ],
  ]
  return (
    <div className={styles.steps}>
      {steps.map(([number, title, text]) => (
        <article className={styles.step} key={number}>
          <span>{number}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  )
}

export function JourneyFaqs() {
  return (
    <div className={styles.faqList}>
      {journeyFaqs.map((faq) => (
        <details className={styles.faq} key={faq.question}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}

export function JourneyCta() {
  return (
    <div className={styles.cta}>
      <div>
        <h2>Wo liegt Ihr nächster sinnvoller Schritt?</h2>
        <p>Wenige Fragen. Ein konkreter Plan. Direkt für Sie nutzbar.</p>
      </div>
      <Link href="/kundenreise-check" className={styles.button}>
        Unverbindlichen Check starten{" "}
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  )
}
