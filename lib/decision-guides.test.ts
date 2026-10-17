import assert from "node:assert/strict"
import test from "node:test"
import { getPost } from "./blog"
import { decisionGuides } from "./decision-guides"
import sitemap from "../app/sitemap"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

for (const guide of decisionGuides) {
  test(`${guide.slug} gives an indexable answer, matching sources and FAQ, and a usable next step`, async () => {
    const post = getPost(guide.slug)
    assert.ok(post)
    assert.equal(post.date, "2026-10-18")
    assert.equal(post.updated, "2026-10-18")
    assert.ok(post.resource)
    assert.ok(post.nextStep)
    assert.ok(post.sources.length >= 2)
    assert.ok(post.faq.length >= 4)
    assert.ok(!post.html.includes("ß"))
    const path = `/blog/${guide.slug}`
    assert.equal(
      sitemap().find((entry) => entry.url === `https://agenticit.ch${path}`)
        ?.lastModified,
      post.updated,
    )
    const response = await fetch(new URL(path, baseUrl), { redirect: "manual" })
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
    assert.ok(
      !/<form\b/.test(main),
      "The help must be available before contact",
    )
    assert.ok(
      html.includes(`rel="canonical" href="https://agenticit.ch${path}"`),
    )
    assert.ok(!/name="robots" content="[^"]*noindex/.test(html))
    for (const source of post.sources)
      assert.ok(main.includes(`href="${source.url}"`))
    assert.ok(main.includes(`href="${post.resource.href}?download=1"`))
    assert.ok(main.includes(`href="${post.nextStep.href}"`))
    const check = await fetch(new URL(post.nextStep.href, baseUrl), {
      redirect: "manual",
    })
    assert.equal(check.status, 200)
    const data = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, value]) => JSON.parse(value))
    const article = data.find((value) => value["@type"] === "Article")
    assert.equal(article.datePublished, post.date)
    assert.equal(article.dateModified, post.updated)
    const faq = data.find((value) => value["@type"] === "FAQPage")
    assert.deepEqual(
      faq.mainEntity.map((item: { name: string }) => item.name),
      post.faq.map((item) => item.q),
    )
  })

  test(`${guide.slug} is discoverable from home, blog and its service without removing existing resources`, async () => {
    for (const source of ["/", "/blog", `/loesungen/${guide.serviceSlug}`]) {
      const response = await fetch(new URL(source, baseUrl))
      assert.equal(response.status, 200)
      assert.ok(
        (await response.text()).includes(`href="/blog/${guide.slug}"`),
        source,
      )
    }
  })
}

test("website cost examples name their actual sources and distinguish planning from an offer", () => {
  const post = getPost("webdesign-kosten-schweiz")!
  assert.ok(post.html.includes("18. Oktober 2026"))
  assert.ok(post.html.includes("keine repräsentative Marktstatistik"))
  assert.ok(post.html.includes("kein AgenticIT-Tarif"))
  const total = 4000 + 36 * 60 + 3 * 100
  assert.equal(total, 6460)
  assert.match(post.html, /6(?:'|&#39;)460/)
  assert.ok(post.html.includes("keine Offerte"))
})
