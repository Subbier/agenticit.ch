// Blog-Loader — liest die Markdown-Artikel aus content/blog/ zur Build-Zeit.
//
// Quelle der Artikel: T-One-Claudio-Master-Bibliothek (03_Content-Blog),
// normalisiert auf ein einheitliches Frontmatter-Schema (siehe README dort).
// Rendering: gray-matter (Frontmatter) + marked (GFM → HTML). Läuft nur
// serverseitig (fs) — niemals aus Client-Komponenten importieren.

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { marked } from "marked"

export type BlogFaq = { q: string; a: string }
export type BlogSource = { label: string; url: string }
export type BlogAction = {
  title: string
  copy: string
  href: string
  label: string
}

export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  category: string
  tags: string[]
  keywords: string[]
  readingTime: number
  pillar: boolean
}

export type BlogPost = BlogPostMeta & {
  faq: BlogFaq[]
  sources: BlogSource[]
  resource?: BlogAction
  nextStep?: BlogAction
  /** Gerenderter Artikel-Body (vertrauenswürdiger, eigener Content). */
  html: string
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

marked.setOptions({ gfm: true, breaks: false })

export function parseBlogAction(value: unknown): BlogAction | undefined {
  if (!value || typeof value !== "object") return undefined
  const data = value as Record<string, unknown>
  if (
    !["title", "copy", "href", "label"].every(
      (key) => typeof data[key] === "string" && String(data[key]).trim(),
    )
  )
    return undefined
  const action = data as BlogAction
  if (
    !action.href.startsWith("/") ||
    action.href.startsWith("//") ||
    /[\u0000-\u0020\u007f\\]/.test(action.href)
  )
    return undefined
  return {
    title: action.title,
    copy: action.copy,
    href: action.href,
    label: action.label,
  }
}

function toPost(file: string): BlogPost | null {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
  const { data, content } = matter(raw)
  if (!data.slug || !data.title) return null

  const faq: BlogFaq[] = Array.isArray(data.faq)
    ? data.faq
        .map((f: { q?: string; a?: string }) => ({
          q: String(f.q ?? ""),
          a: String(f.a ?? ""),
        }))
        .filter((f: BlogFaq) => f.q && f.a)
    : []

  const sources: BlogSource[] = Array.isArray(data.sources)
    ? data.sources
        .map((s: { label?: string; url?: string }) => ({
          label: String(s.label ?? ""),
          url: String(s.url ?? ""),
        }))
        .filter((s: BlogSource) => s.label && s.url)
    : []

  return {
    slug: String(data.slug),
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date ?? "2026-07-24"),
    updated: typeof data.updated === "string" ? data.updated : undefined,
    category: String(data.category ?? "KI-Grundlagen"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    readingTime: Number(data.readingTime ?? 8),
    pillar: data.pillar === true,
    faq,
    sources,
    resource: parseBlogAction(data.resource),
    nextStep: parseBlogAction(data.nextStep),
    html: marked.parse(content, { async: false }) as string,
  }
}

let cache: BlogPost[] | null = null

export function getAllPosts(): BlogPost[] {
  if (cache) return cache
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  const posts = files
    .map(toPost)
    .filter((p): p is BlogPost => p !== null)
    // Pillar-Artikel zuerst, danach neueste zuerst, stabil nach Titel.
    .sort((a, b) => {
      if (a.pillar !== b.pillar) return a.pillar ? -1 : 1
      if (a.date !== b.date) return a.date < b.date ? 1 : -1
      return a.title.localeCompare(b.title, "de-CH")
    })
  cache = posts
  return posts
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug)
  const sameCategory = all.filter((p) => p.category === post.category)
  const rest = all.filter((p) => p.category !== post.category)
  return [...sameCategory, ...rest].slice(0, count)
}

export const BLOG_CATEGORIES = [
  "RevOps",
  "KI-Agenten",
  "KI-Automatisierung",
  "Vertrieb & Leads",
  "Recht & Sicherheit",
  "KI-Grundlagen",
  "Webdesign & Marketing",
] as const
