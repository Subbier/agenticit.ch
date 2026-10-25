import assert from "node:assert/strict"
import test from "node:test"
import { potentialKinds } from "./potential-report"
const base = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3130"
for (const kind of potentialKinds)
  test(`${kind} has illustrations, three steps and no ungated result`, async () => {
    const response = await fetch(`${base}/kundenreise-check?thema=${kind}`)
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    assert.ok(main.includes(`data-visual-lead-magnet="${kind}"`))
    assert.ok(main.includes("<svg") && main.includes("<progress"))
    assert.ok(main.includes('name="volume"'))
    assert.ok(!main.includes('download="') && !main.includes('name="email"'))
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
  })
test("the overview uses picture choices for all seven outcomes", async () => {
  const html = await (await fetch(`${base}/kundenreise-check`)).text()
  assert.equal((html.match(/type="radio"/g) ?? []).length, 7)
})
