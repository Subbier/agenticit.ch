import type { Metadata } from "next"
import Link from "next/link"
import { JourneyShell } from "@/components/journey/shell"
import { CompanyVideo } from "@/components/journey/company-video"
import { JsonLd } from "@/components/site/json-ld"
import { companyVideo, companyVideoTranscript } from "@/lib/company-video"
import { breadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata: Metadata = createPageMetadata({
  title: "AgenticIT Firmenvideo: Marketing, Sales und KI",
  description: companyVideo.description,
  path: companyVideo.path,
  image: companyVideo.thumbnail,
  imageAlt: companyVideo.name,
})

export default function Page() {
  return (
    <JourneyShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Firmenvideo", path: companyVideo.path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "@id": `${SITE_URL}${companyVideo.path}#video`,
            name: companyVideo.name,
            description: companyVideo.description,
            url: `${SITE_URL}${companyVideo.path}`,
            thumbnailUrl: `${SITE_URL}${companyVideo.thumbnail}`,
            contentUrl: `${SITE_URL}${companyVideo.src}`,
            uploadDate: companyVideo.publishedAt,
            duration: "PT58.1S",
            inLanguage: "de-CH",
            transcript: companyVideoTranscript.join(" "),
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ]}
      />
      <main className={`${styles.container} ${styles.companyVideoPage}`}>
        <nav className={styles.companyVideoBreadcrumb} aria-label="Seitenpfad">
          <Link href="/">Startseite</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Firmenvideo</span>
        </nav>
        <CompanyVideo standalone />
      </main>
    </JourneyShell>
  )
}
