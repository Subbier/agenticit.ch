"use client"

// Kategorie-Filter + Kartenraster der Blog-Übersicht. Erhält nur
// serialisierbare Metadaten (kein HTML) von der Server-Seite.
import { useState } from "react"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"

const ALLE = "Alle Themen"

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("de-CH", { day: "numeric", month: "short", year: "numeric" })
}

function PostCard({ post, featured }: { post: BlogPostMeta; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`flex h-full flex-col rounded-[14px] border bg-white p-6 transition hover:-translate-y-[2px] hover:border-[#8FE05A] ${
        featured ? "border-[#101418] sm:p-7" : "border-[#E1E4E8]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="font-[family-name:var(--font-mono-signal)] text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#0E7490]">
          {post.category}
        </span>
        {post.pillar ? (
          <span className="rounded-full bg-[#101418] px-2.5 py-[3px] font-[family-name:var(--font-mono-signal)] text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#8FE05A]">
            Guide
          </span>
        ) : null}
      </div>
      <h3
        className={`mt-3 font-[family-name:var(--font-display)] font-bold leading-snug tracking-[-0.01em] text-[#101418] ${
          featured ? "text-[clamp(18px,3.6vw,22px)]" : "text-[17px]"
        }`}
      >
        {post.title}
      </h3>
      <p className="mt-3 flex-1 font-[family-name:var(--font-carbon-text)] text-[13.5px] leading-relaxed text-[#4A545F]">
        {post.description}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-[#E1E4E8] pt-4">
        <span className="font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]">
          {formatDate(post.date)} · {post.readingTime} Min.
        </span>
        <span className="font-[family-name:var(--font-carbon-text)] text-[13px] font-semibold text-[#1F9A5E]">
          Lesen →
        </span>
      </div>
    </Link>
  )
}

export function BlogIndexGrid({ posts, categories }: { posts: BlogPostMeta[]; categories: string[] }) {
  const [active, setActive] = useState<string>(ALLE)

  const visible = active === ALLE ? posts : posts.filter((p) => p.category === active)
  const featured = visible.filter((p) => p.pillar)
  const regular = visible.filter((p) => !p.pillar)

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Themen filtern">
        {[ALLE, ...categories].map((c) => {
          const isActive = c === active
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 font-[family-name:var(--font-carbon-text)] text-[13px] font-semibold transition ${
                isActive
                  ? "border-[#101418] bg-[#101418] text-white"
                  : "border-[#E1E4E8] bg-white text-[#4A545F] hover:border-[#101418] hover:text-[#101418]"
              }`}
            >
              {c}
            </button>
          )
        })}
      </div>

      {featured.length ? (
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <PostCard key={p.slug} post={p} featured />
          ))}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regular.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-10 text-center font-[family-name:var(--font-carbon-text)] text-[14px] text-[#6B7480]">
          Keine Artikel in dieser Kategorie.
        </p>
      ) : null}
    </div>
  )
}
