"use client"

import mobile from "./mobile-scroll.module.css"

import { useRef, useState } from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react"
import {
  filterVideos,
  formatVideoDuration,
  videoTopics,
  type BlogVideo,
  type VideoTopicId,
} from "@/lib/blog-videos"
import { BlogVideoPlayer } from "./blog-video-player"
import styles from "./blog-videos.module.css"

export type VideoCard = {
  slug: string
  title: string
  category: string
  video: BlogVideo
}

export function BlogVideoRail({ items }: { items: VideoCard[] }) {
  const rail = useRef<HTMLUListElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const [active, setActive] = useState<VideoCard | null>(null)
  const [topicId, setTopicId] = useState<VideoTopicId>("all")
  const visibleItems = filterVideos(items, topicId)
  const filters = [{ id: "all" as const, label: "Alle Videos" }, ...videoTopics]
  function move(direction: number) {
    const list = rail.current
    if (!list) return
    const card = list.firstElementChild as HTMLElement | null
    list.scrollBy({
      left: direction * ((card?.offsetWidth ?? 360) + 20),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
  }
  return (
    <section className={styles.section} aria-labelledby="blog-videos-title">
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>Wissen zum Anschauen</span>
          <h2 id="blog-videos-title">
            Eine gute Frage.
            <br />
            Ein Video weiter.
          </h2>
          <p>
            KI, Marketing und digitale Abläufe. Verständlich erklärt, direkt aus
            der Praxis.
          </p>
        </div>
        <div className={styles.navigation}>
          <a href="/blog" className={styles.all}>
            Alle Videos & Ratgeber <ArrowRight size={18} aria-hidden="true" />
          </a>
          <div className={styles.arrows}>
            <button
              type="button"
              aria-label="Vorherige Videos"
              aria-controls="home-video-rail"
              onClick={() => move(-1)}
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Weitere Videos"
              aria-controls="home-video-rail"
              onClick={() => move(1)}
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.filters}
        role="group"
        aria-label="Videos nach Thema filtern"
      >
        {filters.map((topic) => (
          <button
            key={topic.id}
            type="button"
            aria-pressed={topicId === topic.id}
            aria-controls="home-video-rail"
            onClick={() => setTopicId(topic.id)}
          >
            {topic.label}
            <span>{filterVideos(items, topic.id).length}</span>
          </button>
        ))}
      </div>
      <p className={styles.resultCount} role="status">
        {visibleItems.length} Videos ·{" "}
        {filters.find((topic) => topic.id === topicId)?.label}
      </p>
      <ul
        key={topicId}
        ref={rail}
        id="home-video-rail"
        className={`${styles.rail} ${mobile.scrollRegion}`}
        tabIndex={0}
        aria-label="Videos von AgenticIT"
      >
        {visibleItems.map((item) => (
          <li key={item.slug} className={styles.railCard}>
            <button
              type="button"
              className={styles.watch}
              onClick={(event) => {
                trigger.current = event.currentTarget
                setActive(item)
              }}
              aria-label={`${item.title}: Video ansehen (${formatVideoDuration(item.video.durationSeconds)})`}
            >
              <span className={styles.cover}>
                <img
                  src={item.video.poster}
                  alt=""
                  width={960}
                  height={540}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.play}>
                  <Play fill="currentColor" size={22} aria-hidden="true" />
                </span>
                <span className={styles.duration}>
                  {formatVideoDuration(item.video.durationSeconds)}
                </span>
              </span>
              <span className={styles.cardCopy}>
                <span className={styles.eyebrow}>{item.category}</span>
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.watchLabel}>
                  Video ansehen <ArrowRight size={16} aria-hidden="true" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.hint}>
        Weiterwischen. Neues entdecken. <span aria-hidden="true">→</span>
      </p>
      <Dialog.Root
        open={Boolean(active)}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        {active ? (
          <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content
              className={styles.modal}
              onCloseAutoFocus={(event) => {
                event.preventDefault()
                trigger.current?.focus()
              }}
            >
              <div className={styles.modalHead}>
                <Dialog.Title>{active.title}</Dialog.Title>
                <Dialog.Close
                  className={styles.close}
                  aria-label="Video schliessen"
                >
                  <X size={24} aria-hidden="true" />
                </Dialog.Close>
              </div>
              <Dialog.Description className={styles.modalDescription}>
                {active.category} ·{" "}
                {formatVideoDuration(active.video.durationSeconds)} Min.
              </Dialog.Description>
              <BlogVideoPlayer
                key={active.slug}
                video={active.video}
                title={active.title}
              />
              <Link href={`/blog/${active.slug}`} className={styles.readLink}>
                Artikel und Vorlage öffnen{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </Dialog.Root>
    </section>
  )
}
