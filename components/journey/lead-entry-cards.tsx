import mobile from "../site/mobile-scroll.module.css"
import Link from "next/link"
import { ArrowUpRight, FileDown } from "lucide-react"
import { leadEntries } from "@/lib/lead-entry"
import { PotentialArt } from "./potential-art"
import { WebsiteOptionArt } from "./website-option-art"
import styles from "./lead-entry-cards.module.css"

export function LeadEntryCards() {
  return (
    <div
      className={`${styles.grid} ${mobile.scrollRegion}`}
      data-visual-lead-entries="true"
      role="region"
      aria-label="Was soll besser laufen?"
      tabIndex={0}
    >
      {leadEntries.map((entry) => (
        <Link
          key={entry.id}
          href={entry.href}
          className={styles.card}
          data-lead-entry={entry.id}
        >
          <div className={styles.art}>
            {entry.id === "webdesign" ? (
              <WebsiteOptionArt variant="personal" />
            ) : (
              <PotentialArt kind={entry.kind} />
            )}
          </div>
          <div className={styles.content}>
            <h3>{entry.title}</h3>
            <p>{entry.benefit}</p>
            <span className={styles.result}>
              <FileDown size={15} aria-hidden="true" />
              {entry.result}
            </span>
            <span className={styles.action}>
              {entry.action}
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
