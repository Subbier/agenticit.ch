import assert from "node:assert/strict"
import test from "node:test"
import sitemap from "../app/sitemap"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

function bypassProblems(html: string): string[] {
  const problems: string[] = []
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  const mains = [...markup.matchAll(/<main\b[^>]*>/g)]
  const skips = [
    ...markup.matchAll(/<a\b[^>]*data-skip-link[^>]*>[\s\S]*?<\/a>/g),
  ]
  if (mains.length !== 1) problems.push("expected exactly one main landmark")
  if (!mains[0]?.[0].includes('id="main-content"'))
    problems.push("main target missing")
  if (!mains[0]?.[0].includes('tabindex="-1"'))
    problems.push("main is not programmatically focusable")
  if ((markup.match(/\bid="main-content"/g) ?? []).length !== 1)
    problems.push("target must be unique")
  if (skips.length !== 1 || !skips[0][0].includes('href="#main-content"'))
    problems.push("native skip link missing")
  if (!skips[0]?.[0].includes("Zum Inhalt springen"))
    problems.push("skip link needs a clear visible label")
  const headerPosition = markup.indexOf("<header")
  if (headerPosition < 0 || (skips[0]?.index ?? Infinity) > headerPosition)
    problems.push("skip link must precede repeated navigation")
  return problems
}

test("all canonical pages expose a native keyboard bypass to their real main landmark", async () => {
  const entries = sitemap()
  const failures: { path: string; problems: string[] }[] = []
  for (let start = 0; start < entries.length; start += 6) {
    await Promise.all(
      entries.slice(start, start + 6).map(async (entry) => {
        const path = new URL(entry.url).pathname
        const response = await fetch(new URL(path, baseUrl), {
          signal: AbortSignal.timeout(20000),
        })
        const problems = bypassProblems(await response.text())
        if (response.status !== 200) problems.unshift(`HTTP ${response.status}`)
        if (problems.length) failures.push({ path, problems })
      }),
    )
  }
  assert.deepEqual(failures, [])
})

test("the current 404 page keeps the same keyboard bypass", async () => {
  const response = await fetch(new URL("/diese-seite-existiert-nicht", baseUrl))
  assert.equal(response.status, 404)
  assert.deepEqual(bypassProblems(await response.text()), [])
})
