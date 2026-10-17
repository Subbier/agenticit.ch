import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import { getAllPosts, getPost, parseBlogAction } from "./blog"

const guides = [
  "eigene-ki-agenten-vs-chatgpt",
  "prozessautomatisierung-kmu-leitfaden",
  "website-briefing-vorlage",
  "landingpage-oder-website",
  "ki-roi-berechnen",
  "leadgenerierung-ki",
  "leadgenerierung-mit-ki-leitfaden",
  "ki-agenten",
  "neukundengewinnung-kmu-schweiz",
] as const
const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("optional article actions require complete copy and a local destination", () => {
  const valid = {
    title: "Vorlage",
    copy: "Für Ihr Team",
    label: "Speichern",
    href: "/vorlagen/briefing.txt",
  }
  assert.deepEqual(parseBlogAction(valid), valid)
  for (const value of [
    undefined,
    null,
    "link",
    {},
    { ...valid, label: " " },
    { ...valid, href: "https://example.invalid" },
    { ...valid, href: "//example.invalid" },
    { ...valid, href: "/\\example.invalid" },
    { ...valid, href: "/\n/example.invalid" },
    { ...valid, href: "/\texample.invalid" },
  ])
    assert.equal(parseBlogAction(value), undefined)
})

test("reviewed guides preserve publication dates and expose their actual update and next step", () => {
  for (const slug of guides) {
    const post = getPost(slug)
    assert.ok(post, slug)
    assert.equal(post.updated, "2026-10-17")
    assert.equal(
      post.date,
      ["website-briefing-vorlage", "landingpage-oder-website"].includes(slug)
        ? "2026-10-17"
        : "2026-07-24",
    )
    assert.ok(post.sources.length >= 2)
    assert.ok(post.sources.every((source) => source.url.startsWith("https://")))
    assert.ok(post.nextStep?.href.startsWith("/"))
    assert.ok(post.faq.length >= 3)
  }
  assert.equal(
    getPost("ki-email-management")?.updated,
    undefined,
    "Untouched articles must not acquire an update date",
  )
  assert.equal(
    new Set(getAllPosts().map((post) => post.slug)).size,
    getAllPosts().length,
  )
})

for (const slug of guides) {
  test(`${slug} renders sources, matching article dates, FAQs and a check before asking for contact`, async () => {
    const post = getPost(slug)!
    const response = await fetch(new URL(`/blog/${slug}`, baseUrl), {
      redirect: "manual",
    })
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = (
      html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    ).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
    assert.ok(
      !/<form\b/.test(main),
      "Read or try the check without a contact form on the article",
    )
    assert.ok(
      !/von der\s*AgenticIT-Redaktion geprüft|Antwort innert 24 Stunden|nDSG- und DSGVO-konform/.test(
        main,
      ),
    )
    assert.ok(main.includes(`href="${post.nextStep!.href}"`))
    assert.match(main, /<time\b[^>]*datetime="2026-10-17"/i)
    assert.ok(
      html.includes(`rel="canonical" href="https://agenticit.ch/blog/${slug}"`),
    )
    for (const source of post.sources)
      assert.ok(main.includes(`href="${source.url}"`))
    const data = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, json]) => JSON.parse(json))
    const article = data.find((item) => item["@type"] === "Article")
    assert.equal(article.datePublished, post.date)
    assert.equal(article.dateModified, post.updated)
    assert.equal(article.author.name, "AgenticIT GmbH")
    const faq = data.find((item) => item["@type"] === "FAQPage")
    assert.equal(faq.mainEntity.length, post.faq.length)
    for (const entry of faq.mainEntity)
      assert.ok(main.includes(entry.acceptedAnswer.text))
  })
}

test("the website briefing is a complete public text download with no contact gate", async () => {
  const post = getPost("website-briefing-vorlage")!
  assert.equal(post.resource?.href, "/vorlagen/AgenticIT-Website-Briefing.txt")
  const response = await fetch(new URL(post.resource!.href, baseUrl))
  assert.equal(response.status, 200)
  const body = await response.text()
  assert.equal(
    body,
    readFileSync("public/vorlagen/AgenticIT-Website-Briefing.txt", "utf8"),
  )
  for (const term of [
    "ZIELKUNDEN",
    "ANFRAGEWEG",
    "CRM",
    "ABNAHME",
    "Keine Passwörter",
  ])
    assert.ok(body.includes(term))
  const page = await (
    await fetch(new URL(`/blog/${post.slug}`, baseUrl))
  ).text()
  assert.match(
    page,
    /href="\/vorlagen\/AgenticIT-Website-Briefing\.txt" download="AgenticIT-Website-Briefing\.txt"/,
  )
  assert.ok(
    /class="blog-resource-view" href="\/vorlagen\/AgenticIT-Website-Briefing\.txt">/.test(
      page,
    ),
    "A plain browser view must remain available independently of download handling",
  )
})

test("webdesign visitors can find the briefing from the service page and blog index", async () => {
  for (const path of ["/loesungen/webdesign", "/blog"]) {
    const response = await fetch(new URL(path, baseUrl))
    assert.equal(response.status, 200)
    assert.ok(
      (await response.text()).includes('href="/blog/website-briefing-vorlage"'),
    )
  }
})

test("the AI and automation services lead to their matching decision guides", async () => {
  for (const [service, slug] of [
    ["ki-entwicklung", guides[0]],
    ["prozessautomatisierung", guides[1]],
  ]) {
    const response = await fetch(new URL(`/loesungen/${service}`, baseUrl))
    assert.equal(response.status, 200)
    assert.ok((await response.text()).includes(`href="/blog/${slug}"`))
  }
})

for (const [slug, filename] of [
  ["ki-agenten", "AgenticIT-KI-Einsatzkarte.txt"],
  ["neukundengewinnung-kmu-schweiz", "AgenticIT-Akquise-Plan.txt"],
] as const) {
  test(`${slug} serves its complete editable worksheet without a contact gate`, async () => {
    const post = getPost(slug)!
    assert.equal(post.resource?.href, `/vorlagen/${filename}`)
    const response = await fetch(new URL(post.resource!.href, baseUrl))
    assert.equal(response.status, 200)
    assert.match(response.headers.get("content-type") ?? "", /text\/plain/)
    const body = await response.text()
    assert.equal(body, readFileSync(`public/vorlagen/${filename}`, "utf8"))
    assert.ok(body.split("\n").length >= 40)
    assert.ok(body.includes("Keine Passwörter"))
    assert.ok(body.includes("nicht automatisch an uns gesendet"))
    assert.ok(body.includes("Ist-Ergebnis:"))
    assert.ok(body.includes("Nachweis:"))
    const html = await (await fetch(new URL(`/blog/${slug}`, baseUrl))).text()
    assert.ok(html.includes(`download="${filename}"`))
    assert.match(
      html,
      new RegExp(
        `class="blog-resource-view" href="/vorlagen/${filename.replaceAll(".", "\\.")}"`,
      ),
    )
  })
}

test("marketing visitors can reach the acquisition plan from the service and blog index", async () => {
  for (const path of ["/loesungen/gtm-markteintritt", "/blog"]) {
    const html = await (await fetch(new URL(path, baseUrl))).text()
    assert.ok(html.includes('href="/blog/neukundengewinnung-kmu-schweiz"'))
  }
})
