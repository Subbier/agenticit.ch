"use client"

// Suche, Themenfilter und Kartenraster. Erhält nur
// serialisierbare Metadaten (kein HTML) von der Server-Seite.
import { useRef, useSyncExternalStore } from "react"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"
import { filterBlogPosts } from "@/lib/blog-search"
import { createBlogSearchState } from "@/lib/blog-search-state"
import styles from "./blog-index-grid.module.css"

const searchState = createBlogSearchState()

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("de-CH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function PostCard({
  post,
  featured,
}: {
  post: BlogPostMeta
  featured?: boolean
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${styles.card} flex h-full flex-col rounded-[14px] border bg-white p-6 transition hover:-translate-y-[2px] hover:border-[#8FE05A] ${
        featured ? "border-[#202522] sm:p-7" : "border-[#dce3db]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="font-[family-name:var(--font-mono-signal)] text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#4d7c36]">
          {post.category}
        </span>
        {post.pillar ? (
          <span className="rounded-full bg-[#202522] px-2.5 py-[3px] font-[family-name:var(--font-mono-signal)] text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#8FE05A]">
            Guide
          </span>
        ) : null}
      </div>
      <h3
        className={`mt-3 font-[family-name:var(--font-display)] font-bold leading-snug tracking-[-0.01em] text-[#202522] ${
          featured ? "text-[clamp(18px,3.6vw,22px)]" : "text-[17px]"
        }`}
      >
        {post.title}
      </h3>
      <p className="mt-3 flex-1 font-[family-name:var(--font-carbon-text)] text-[13.5px] leading-relaxed text-[#647068]">
        {post.description}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-[#dce3db] pt-4">
        <span className="font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]">
          {post.updated && post.updated !== post.date ? "Aktualisiert " : ""}
          {formatDate(post.updated ?? post.date)} · {post.readingTime} Min.
        </span>
        <span className="font-[family-name:var(--font-carbon-text)] text-[13px] font-semibold text-[#4d7c36]">
          Lesen →
        </span>
      </div>
    </Link>
  )
}

export function BlogIndexGrid({
  posts,
  categories,
}: {
  posts: BlogPostMeta[]
  categories: string[]
}) {
  const { query, category } = useSyncExternalStore(
    searchState.subscribe,
    searchState.getSnapshot,
    searchState.getServerSnapshot,
  )
  const searchRef = useRef<HTMLInputElement>(null)
  const visible = filterBlogPosts(posts, { query, category })
  const featured = visible.filter((p) => p.pillar)
  const regular = visible.filter((p) => !p.pillar)
  const hasFilters = query.length > 0 || category.length > 0

  return (
    <div>
      <h2 className="sr-only">Ratgeber finden</h2>
      <div
        className={styles.filters}
        role="search"
        aria-label="Ratgeber suchen"
      >
        <div className={styles.field}>
          <label htmlFor="blog-post-search">Ratgeber durchsuchen</label>
          <input
            ref={searchRef}
            id="blog-post-search"
            type="search"
            placeholder="z. B. Belege, CRM, Website"
            autoComplete="off"
            maxLength={120}
            value={query}
            onChange={(event) => searchState.set({ query: event.target.value })}
            aria-controls="blog-post-results"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="blog-post-category">Thema</label>
          <select
            id="blog-post-category"
            value={category}
            onChange={(event) =>
              searchState.set({ category: event.target.value })
            }
            aria-controls="blog-post-results"
          >
            <option value="">Alle Themen</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.summary}>
        <p role="status" aria-live="polite" aria-atomic="true">
          {visible.length} von {posts.length} Ratgebern
        </p>
        {hasFilters ? (
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              searchState.set({ query: "", category: "" })
              searchRef.current?.focus({ preventScroll: true })
            }}
          >
            Zurücksetzen
          </button>
        ) : null}
      </div>
      <section id="blog-post-results" aria-label="Gefundene Ratgeber">
        {featured.length ? (
          <div
            className={`mb-6 grid gap-4 ${featured.length === 1 ? "max-w-[680px]" : "md:grid-cols-2"}`}
          >
            {featured.map((p) => (
              <PostCard key={p.slug} post={p} featured />
            ))}
          </div>
        ) : null}
        <div
          className={`grid gap-4 ${
            regular.length === 1
              ? "max-w-[680px]"
              : regular.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {regular.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        {visible.length === 0 ? (
          <div className={styles.empty}>
            <h3>Dazu haben wir noch keinen passenden Ratgeber.</h3>
            <p>
              Versuchen Sie einen anderen Begriff oder setzen Sie die Filter
              zurück.
            </p>
            <Link href="#kontakt" className={styles.contactLink}>
              Ihr Anliegen direkt besprechen →
            </Link>
          </div>
        ) : null}
      </section>
    </div>
  )
}
