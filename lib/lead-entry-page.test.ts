import assert from "node:assert/strict"
import test from "node:test"
import { leadEntries } from "./lead-entry"
const base = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3131"
for (const path of ["/", "/werkzeuge"])
  test(`${path} uses compact visual AIDA cards with direct usable destinations`, async () => {
    const html = await (await fetch(base + path)).text()
    for (const entry of leadEntries) {
      const card =
        html.match(
          new RegExp(
            `<a(?=[^>]*data-lead-entry="${entry.id}")[^>]*>[\\s\\S]*?</a>`,
          ),
        )?.[0] ?? ""
      assert.ok(
        card.includes(`href="${entry.href.replace(/&/g, "&amp;")}"`),
        entry.id,
      )
      assert.ok(card.includes("<svg") && card.includes(entry.result))
      const target = await fetch(new URL(entry.href, base))
      assert.equal(target.status, 200)
      const page = await target.text()
      assert.ok(
        page.includes('name="volume"') ||
          page.includes('data-webdesign-check="true"'),
      )
    }
    assert.ok(!html.includes("Ergebnis sofort"))
  })
