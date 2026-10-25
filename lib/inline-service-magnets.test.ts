import assert from "node:assert/strict"
import test from "node:test"

const base = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3128"
for (const slug of [
  "webdesign",
  "ki-entwicklung",
  "prozessautomatisierung",
  "gtm-markteintritt",
  "revops-umsatzgenerierung",
]) {
  test(`${slug}: calculator is directly available, with one page heading and mobile disclosure`, async () => {
    const response = await fetch(`${base}/loesungen/${slug}`)
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    assert.ok(main.includes('data-inline-lead-magnet="true"'))
    const marker =
      slug === "webdesign" ? 'data-webdesign-check="true"' : 'name="volume"'
    assert.ok(main.includes(marker))
    assert.ok(main.indexOf(marker) < main.indexOf('id="beispiele"'))
    if (slug === "webdesign") {
      assert.equal((main.match(/type="radio"/g) ?? []).length, 4)
      assert.ok(!main.includes('name="volume"'))
      assert.ok(!main.includes('href="/marketing-setup-check"'))
    }
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
    assert.ok(main.includes('href="#potenzial-rechner"'))
    assert.ok(main.includes('aria-expanded="false"'))
    assert.ok(main.includes("Mehr lesen"))
    assert.ok(
      !main.includes('download="'),
      "Results require contact registration",
    )
    assert.ok(!main.includes("Ihren Auftritt einordnen"))
  })
}
