import { FileDown } from "lucide-react"
import styles from "./lead-pdf-preview.module.css"
export function LeadPdfPreview({ website = false }: { website?: boolean }) {
  return (
    <div className={styles.preview}>
      <svg viewBox="0 0 120 135" aria-hidden="true" focusable="false">
        <rect
          x="20"
          y="8"
          width="82"
          height="118"
          rx="5"
          fill="white"
          stroke="#bfd0b5"
        />
        <rect x="31" y="23" width="44" height="5" rx="2" fill="#4d7c36" />
        <rect x="31" y="36" width="60" height="3" rx="1" fill="#d5dfcf" />
        <rect x="31" y="44" width="45" height="3" rx="1" fill="#d5dfcf" />
        {website ? (
          <>
            <rect x="31" y="57" width="60" height="30" rx="3" fill="#e0ebd8" />
            <circle cx="77" cy="66" r="4" fill="#7ba45f" />
            <path d="M33 84l17-15 12 8 13-6 15 13" fill="#97b880" />
          </>
        ) : (
          <>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={32 + i * 20}
                y={85 - i * 11}
                width="13"
                height={15 + i * 11}
                rx="2"
                fill={i === 2 ? "#7ba45f" : "#d5e5ca"}
              />
            ))}
          </>
        )}
        <rect x="31" y="108" width="60" height="6" rx="2" fill="#294e36" />
      </svg>
      <div>
        <span className={styles.label}>DAS NEHMEN SIE MIT</span>
        <strong>
          {website
            ? "Ihr persönliches Website-Konzept"
            : "Ihr persönliches Potenzial-PDF"}
        </strong>
        <p>
          {website
            ? "Ihre Seitenstruktur. Ihr Stil. Ihr Auftritt."
            : "Ihre Zahlen. Heute und mögliches Szenario im Vergleich."}
        </p>
        <span className={styles.download}>
          <FileDown size={15} aria-hidden="true" />
          Nach Ihren Kontaktdaten herunterladen
        </span>
      </div>
    </div>
  )
}
