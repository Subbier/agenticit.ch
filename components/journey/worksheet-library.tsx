import Link from "next/link"
import { getPost } from "@/lib/blog"
import { worksheetLibrary } from "@/lib/worksheet-library"
import shared from "./journey.module.css"
import styles from "./worksheet-library.module.css"

export function WorksheetLibrary() {
  return (
    <section
      className={styles.library}
      aria-labelledby="worksheet-library-title"
    >
      <span className={shared.eyebrow}>Direkt für Ihr Team</span>
      <h2 id="worksheet-library-title">
        Vorlagen, mit denen Sie weiterkommen.
      </h2>
      <p className={styles.intro}>
        Auswählen, ausfüllen und gemeinsam planen. Jede Vorlage gibt es als
        bearbeitbare Textdatei und mit einem passenden Leitfaden.
      </p>
      <div className={styles.grid}>
        {worksheetLibrary.map((item) => (
          <details
            key={item.filename}
            name="worksheet"
            className={styles.entry}
          >
            <summary>
              {item.name}
              <span aria-hidden="true">+</span>
            </summary>
            <div className={styles.body}>
              <p>{item.copy}</p>
              <a href={`/vorlagen/${item.filename}`}>
                {item.name} im Browser lesen
              </a>
              <a
                href={`/vorlagen/${item.filename}?download=1`}
                download={item.filename}
              >
                {item.name} speichern (.txt)
              </a>
              <Link className={styles.guide} href={`/blog/${item.guide}`}>
                Leitfaden: {getPost(item.guide)?.title ?? item.name}
              </Link>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
