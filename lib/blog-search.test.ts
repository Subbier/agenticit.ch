import assert from "node:assert/strict"
import test from "node:test"
import { getAllPosts, type BlogPostMeta } from "./blog"
import { filterBlogPosts } from "./blog-search"

const posts: BlogPostMeta[] = [
  {
    slug: "website",
    title: "Was kostet eine Website?",
    description: "Einrichtung und laufenden Betrieb vergleichen.",
    category: "Webdesign & Marketing",
    tags: ["Offerten"],
    keywords: ["Webdesign Kosten Schweiz"],
    date: "2026-10-18",
    readingTime: 6,
    pillar: false,
  },
  {
    slug: "belege",
    title: "Belege übergeben",
    description: "E-Mails und Rechnungen für die Buchhaltung vorbereiten.",
    category: "KI-Automatisierung",
    tags: ["Buchhaltung"],
    keywords: ["Dokumente ordnen"],
    date: "2026-10-17",
    readingTime: 4,
    pillar: true,
  },
]

test("a blank search keeps every guide in its original order without changing the input", () => {
  const before = structuredClone(posts)
  assert.deepEqual(filterBlogPosts(posts), posts)
  assert.deepEqual(filterBlogPosts(posts, { query: "  --  " }), posts)
  assert.deepEqual(posts, before)
})

test("customer terms are found in titles, descriptions, categories, tags and keywords", () => {
  for (const query of [
    "Website",
    "Betrieb",
    "Webdesign",
    "Offerten",
    "Schweiz",
  ])
    assert.deepEqual(
      filterBlogPosts(posts, { query }).map((post) => post.slug),
      ["website"],
      query,
    )
})

test("all entered words must match, including across metadata fields", () => {
  assert.deepEqual(
    filterBlogPosts(posts, { query: "Schweiz Betrieb" }).map(
      (post) => post.slug,
    ),
    ["website"],
  )
  assert.deepEqual(filterBlogPosts(posts, { query: "Website Buchhaltung" }), [])
})

test("capitalisation, umlaut accents and hyphenated searches do not hide a matching guide", () => {
  for (const query of ["ÜBERGEBEN", "ubergeben", "E Mail", "e-mail"])
    assert.deepEqual(
      filterBlogPosts(posts, { query }).map((post) => post.slug),
      ["belege"],
      query,
    )
})

test("a topic and search are combined; missing matches stay empty", () => {
  assert.deepEqual(
    filterBlogPosts(posts, { category: "KI-Automatisierung" }).map(
      (post) => post.slug,
    ),
    ["belege"],
  )
  assert.deepEqual(
    filterBlogPosts(posts, {
      category: "KI-Automatisierung",
      query: "Website",
    }),
    [],
  )
  assert.deepEqual(filterBlogPosts(posts, { query: "NichtsDazuVorhanden" }), [])
  assert.deepEqual(filterBlogPosts(posts, { category: "Unbekannt" }), [])
})

test("real customer questions find the existing relevant help", () => {
  const all = getAllPosts()
  for (const [query, slug] of [
    ["Offertenvergleich", "webdesign-kosten-schweiz"],
    ["Belege", "buchhaltung-automatisieren-ki"],
    ["Termine", "ki-sprachassistent-telefonie"],
    ["CRM", "marketing-automatisierung-kmu"],
  ])
    assert.ok(
      filterBlogPosts(all, { query }).some((post) => post.slug === slug),
      `${query}: ${slug}`,
    )
  for (const post of all)
    assert.ok(
      filterBlogPosts(all, { query: post.title }).some(
        (result) => result.slug === post.slug,
      ),
      post.slug,
    )
})
