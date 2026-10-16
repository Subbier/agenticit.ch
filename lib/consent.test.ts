import assert from "node:assert/strict"
import test from "node:test"
import { runInNewContext } from "node:vm"
import { mountConsentTagManager } from "./consent-tags"
import {
  applyConsent,
  CONSENT_DEFAULT_SCRIPT,
  CONSENT_STORAGE_KEY,
  readConsent,
  writeConsent,
} from "./consent"

const choice = (statistics: unknown, marketing: unknown) =>
  JSON.stringify({
    version: 1,
    statistics,
    marketing,
    decidedAt: "2026-10-17T00:00:00Z",
  })

function browserFixture(raw: string | null = null) {
  const originalWindow = globalThis.window
  const originalDocument = globalThis.document
  const store = new Map<string, string>(
    raw === null ? [] : [[CONSENT_STORAGE_KEY, raw]],
  )
  const events = new EventTarget()
  const scripts: { id?: string; src?: string; async?: boolean }[] = []
  let reloads = 0
  const fixtureWindow = {
    dataLayer: [] as unknown[],
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
    },
    location: {
      reload: () => {
        reloads += 1
      },
    },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
  }
  Object.assign(globalThis, {
    window: fixtureWindow,
    document: {
      getElementById: (id: string) =>
        scripts.find((script) => script.id === id) ?? null,
      createElement: () => ({}),
      head: {
        appendChild: (script: (typeof scripts)[number]) => scripts.push(script),
      },
    },
  })
  return {
    window: fixtureWindow,
    scripts,
    reloads: () => reloads,
    restore: () => {
      if (originalWindow === undefined)
        Reflect.deleteProperty(globalThis, "window")
      else Object.assign(globalThis, { window: originalWindow })
      if (originalDocument === undefined)
        Reflect.deleteProperty(globalThis, "document")
      else Object.assign(globalThis, { document: originalDocument })
    },
  }
}

test("invalid stored flags cannot turn a string into consent, in either startup path", () => {
  for (const raw of [
    choice("false", false),
    choice(false, "true"),
    "{broken",
    JSON.stringify({ version: 1, statistics: true, marketing: false }),
  ]) {
    const fixture = browserFixture(raw)
    try {
      assert.equal(readConsent(), null)
      runInNewContext(CONSENT_DEFAULT_SCRIPT, { window: fixture.window })
      const updates = fixture.window.dataLayer.filter(
        (item) => (item as ArrayLike<unknown>)[1] === "update",
      )
      assert.equal(updates.length, 0)
    } finally {
      fixture.restore()
    }
  }
})

test("stored boolean choices restore their exact categories after denied defaults", () => {
  const fixture = browserFixture(choice(true, false))
  try {
    assert.deepEqual(readConsent(), {
      version: 1,
      statistics: true,
      marketing: false,
      decidedAt: "2026-10-17T00:00:00Z",
    })
    runInNewContext(CONSENT_DEFAULT_SCRIPT, { window: fixture.window })
    const commands = fixture.window.dataLayer as ArrayLike<unknown>[]
    assert.equal(
      (commands[0][2] as Record<string, string>).analytics_storage,
      "denied",
    )
    assert.equal(
      (commands[1][2] as Record<string, string>).analytics_storage,
      "granted",
    )
    assert.equal(
      (commands[1][2] as Record<string, string>).ad_storage,
      "denied",
    )
  } finally {
    fixture.restore()
  }
})

test("saved and fresh choices emit only the tag-category grants they actually allow", () => {
  for (const statistics of [false, true]) {
    for (const marketing of [false, true]) {
      const fixture = browserFixture(choice(statistics, marketing))
      try {
        const grants = () =>
          fixture.window.dataLayer
            .filter(
              (item) =>
                typeof item === "object" && item !== null && "event" in item,
            )
            .map((item) => (item as { event: string }).event)
            .filter((event) => event.endsWith("_granted"))
        const expected = [
          ...(statistics ? ["consent_statistics_granted"] : []),
          ...(marketing ? ["consent_marketing_granted"] : []),
        ]
        runInNewContext(CONSENT_DEFAULT_SCRIPT, { window: fixture.window })
        assert.deepEqual(grants(), expected)
        fixture.window.dataLayer.length = 0
        applyConsent({ statistics, marketing })
        assert.deepEqual(grants(), expected)
      } finally {
        fixture.restore()
      }
    }
  }
})

test("Google tags remain absent until consent and load once after a permitted category", () => {
  const fixture = browserFixture()
  const cleanup = mountConsentTagManager()
  try {
    assert.equal(fixture.scripts.length, 0)
    applyConsent({ statistics: false, marketing: false })
    assert.equal(fixture.scripts.length, 0)
    writeConsent({ statistics: true, marketing: false })
    applyConsent({ statistics: true, marketing: false })
    assert.equal(fixture.scripts.length, 1)
    assert.equal(
      fixture.scripts[0].src,
      "https://www.googletagmanager.com/gtm.js?id=GTM-K4TN9PVZ",
    )
    applyConsent({ statistics: true, marketing: true })
    assert.equal(fixture.scripts.length, 1)
    assert.equal(fixture.reloads(), 0)
  } finally {
    cleanup()
    fixture.restore()
  }
})

test("a saved choice works on first mount and a withdrawal reloads without duplicating tags", () => {
  const fixture = browserFixture(choice(true, true))
  let cleanup = mountConsentTagManager()
  try {
    assert.equal(fixture.scripts.length, 1)
    cleanup()
    cleanup = mountConsentTagManager()
    assert.equal(fixture.scripts.length, 1)
    writeConsent({ statistics: true, marketing: false })
    applyConsent({ statistics: true, marketing: false })
    assert.equal(fixture.reloads(), 1)
    cleanup()
    applyConsent({ statistics: false, marketing: false })
    assert.equal(fixture.reloads(), 1, "Unmount removes its listener")
  } finally {
    cleanup()
    fixture.restore()
  }
})

test("initial HTML cannot start Google tags before a valid consent decision", async () => {
  const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
  const html = await (await fetch(baseUrl)).text()
  assert.ok(!/<iframe\b[^>]*googletagmanager\.com/.test(html))
  assert.ok(!html.includes("https://www.googletagmanager.com/gtm.js?id="))
  assert.ok(html.includes("analytics_storage:'denied'"))
})
