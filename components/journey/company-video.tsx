"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import thumbnail from "@/public/videos/agenticit-thumbnail.jpg"
import { ArrowUpRight } from "lucide-react"
import styles from "./journey.module.css"

const VIDEO_SRC = "/videos/agenticit-firmenvideo.mp4?v=3"

export function CompanyVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)

  function startVideo() {
    const player = video.current
    if (!player) return

    setPlaybackError(false)
    player.focus()
    void player.play().catch(() => setPlaybackError(true))
  }

  return (
    <section
      className={`${styles.section} ${styles.companyVideo}`}
      id="firmenvideo"
      aria-labelledby="company-video-title"
    >
      <div className={styles.companyVideoHeading}>
        <span className={styles.eyebrow}>AgenticIT in 60 Sekunden</span>
        <h2 id="company-video-title">
          Technik, die Ihnen den Rücken freihält.
        </h2>
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
          onPlay={() => setHasStarted(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          Ihr Browser unterstützt keine Videowiedergabe. Sie können das{" "}
          <a href={VIDEO_SRC}>Video direkt öffnen</a>.
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
          <a href={VIDEO_SRC}>öffnen Sie es direkt</a>.
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
    </section>
  )
}
