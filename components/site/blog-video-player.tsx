"use client"

import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"
import {
  formatVideoDuration,
  pauseOtherMedia,
  type BlogVideo,
} from "@/lib/blog-videos"
import styles from "./blog-videos.module.css"

export function BlogVideoPlayer({
  video,
  title,
}: {
  video: BlogVideo
  title: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const player = ref.current
    if (!player) return
    function pauseOtherPlayers(event: Event) {
      if (event.target instanceof HTMLMediaElement && event.target !== player)
        player?.pause()
    }
    document.addEventListener("play", pauseOtherPlayers, true)
    return () => {
      document.removeEventListener("play", pauseOtherPlayers, true)
      player.pause()
    }
  }, [])

  function start() {
    const player = ref.current
    if (!player) return
    setFailed(false)
    player.focus({ preventScroll: true })
    void player.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return
      setStarted(true)
      setFailed(true)
    })
  }

  return (
    <div>
      <div className={styles.player}>
        <video
          ref={ref}
          controls
          playsInline
          preload="none"
          poster={video.poster}
          width={video.width}
          height={video.height}
          tabIndex={0}
          aria-label={title}
          onPlay={() => {
            pauseOtherMedia(
              ref.current,
              document.querySelectorAll<HTMLMediaElement>("video, audio"),
            )
            setStarted(true)
            setFailed(false)
          }}
          onError={() => {
            setStarted(true)
            setFailed(true)
          }}
        >
          <source
            src={`${video.src}?v=${video.sha256.slice(0, 12)}`}
            type="video/mp4"
          />
          Ihr Browser unterstützt keine Videowiedergabe.{" "}
          <a href={video.src}>Video direkt öffnen</a>.
        </video>
        {!started ? (
          <button
            className={styles.start}
            type="button"
            onClick={start}
            aria-label={`${title} abspielen (${formatVideoDuration(video.durationSeconds)})`}
          >
            <Play fill="currentColor" size={24} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      {failed ? (
        <p className={styles.error} role="status">
          Das Video konnte nicht gestartet werden. Nutzen Sie die
          Wiedergabetaste oder{" "}
          <a href={video.src}>öffnen Sie das Video direkt</a>.
        </p>
      ) : null}
    </div>
  )
}
