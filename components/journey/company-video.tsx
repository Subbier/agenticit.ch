"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import thumbnail from "@/public/videos/agenticit-thumbnail.jpg"
import { ArrowUpRight } from "lucide-react"
import { companyVideo, companyVideoTranscript } from "@/lib/company-video"
import styles from "./journey.module.css"

export function CompanyVideo({ standalone = false }: { standalone?: boolean }) {
  const video = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)

  function startVideo() {
    const player = video.current
    if (!player) return

    setPlaybackError(false)
    player.focus()
    void player.play().catch((error: unknown) => {
      // A pause while the file is loading cancels play; it is not a media failure.
      if (error instanceof DOMException && error.name === "AbortError") return
      setPlaybackError(true)
    })
  }

  return (
    <section
      className={`${styles.section} ${styles.companyVideo} ${standalone ? styles.companyVideoStandalone : ""}`}
      id="firmenvideo"
      aria-labelledby="company-video-title"
    >
      <div className={styles.companyVideoHeading}>
        {standalone ? (
          <h1 id="company-video-title">AgenticIT in 60 Sekunden.</h1>
        ) : (
          <>
            <span className={styles.eyebrow}>AgenticIT in 60 Sekunden</span>
            <h2 id="company-video-title">
              Technik, die Ihnen den Rücken freihält.
            </h2>
          </>
        )}
        <p className={styles.sectionIntro}>
          Wie wir KI und passende Tools zu Abläufen verbinden, die Ihr Team
          entlasten – und mehr Raum für Ihre Kunden schaffen.
        </p>
      </div>
      <div className={styles.companyVideoFrame}>
        <video
          ref={video}
          controls
          playsInline
          preload="none"
          width={1920}
          height={1080}
          tabIndex={0}
          aria-label="AgenticIT: Neue Kunden, digitale Abläufe, ein Partner"
          onPlay={() => {
            setHasStarted(true)
            setPlaybackError(false)
          }}
        >
          <source src={companyVideo.src} type="video/mp4" />
          <track
            kind="subtitles"
            srcLang="de"
            label="Deutsch"
            src={companyVideo.subtitles}
            default
          />
          Ihr Browser unterstützt keine Videowiedergabe. Sie können das{" "}
          <a href={companyVideo.src}>Video direkt öffnen</a>.
        </video>
        {!hasStarted ? (
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1244px) calc(100vw - 64px), 1180px"
            className={styles.companyVideoPoster}
          />
        ) : null}
        {!hasStarted ? (
          <button
            type="button"
            className={styles.companyVideoPlay}
            aria-label="Firmenvideo abspielen (60 Sekunden)"
            onClick={startVideo}
          />
        ) : null}
      </div>
      {playbackError ? (
        <p className={styles.companyVideoError} role="status">
          Bitte starten Sie das Video über die Wiedergabetaste oder{" "}
          <a href={companyVideo.src}>öffnen Sie es direkt</a>.
        </p>
      ) : null}
      <div className={styles.companyVideoFooter}>
        <p className={styles.fine}>
          Wo steckt Ihr Zeitpotenzial?
          <br />
          Unverbindlicher Check · Ergebnis sofort
        </p>
        <Link href="/automatisierungs-check" className={styles.button}>
          Unverbindlichen Check starten
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <details className={styles.companyVideoTranscript} open={standalone}>
        <summary>
          Video als Text lesen <span aria-hidden="true">+</span>
        </summary>
        <div className={styles.companyVideoTranscriptCopy}>
          <p className={styles.fine}>
            Gesprochener Text der Videofassung vom 16. Oktober 2026.
          </p>
          <blockquote>
            {companyVideoTranscript.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </blockquote>
          {!standalone ? (
            <Link href={companyVideo.path} className={styles.textLink}>
              Video mit Text öffnen
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </details>
    </section>
  )
}
