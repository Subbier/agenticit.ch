import assert from "node:assert/strict"
import test from "node:test"
import { BLOG_CATEGORIES, getAllPosts } from "./blog"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the blog offers labelled local search and topics while keeping all guides in the initial HTML", async () => {
  const response = await fetch(new URL("/blog", baseUrl))
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = (
    html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  ).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  assert.match(
    main,
    /<label\b[^>]*for="blog-post-search"[^>]*>Ratgeber durchsuchen<\/label>/,
  )
  assert.match(
    main,
    /<input\b(?=[^>]*\bid="blog-post-search")(?=[^>]*\btype="search")[^>]*>/,
  )
  assert.match(
    main,
    /<label\b[^>]*for="blog-post-category"[^>]*>Thema<\/label>/,
  )
  assert.match(main, /<select\b[^>]*id="blog-post-category"/)
  assert.match(main, /<option\b[^>]*value=""[^>]*>Alle Themen<\/option>/)
  assert.ok(!main.includes('role="tablist"'))
  const posts = getAllPosts()
  for (const category of BLOG_CATEGORIES.filter((name) =>
    posts.some((post) => post.category === name),
  ))
    assert.ok(main.includes(`value="${category.replaceAll("&", "&amp;")}"`))
  for (const post of posts)
    assert.ok(main.includes(`href="/blog/${post.slug}"`), post.slug)
  assert.ok(main.includes('role="status"'))
  assert.ok(main.includes('aria-controls="blog-post-results"'))
  assert.ok(main.includes('id="blog-post-results"'))
})
