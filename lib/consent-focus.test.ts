import assert from "node:assert/strict"
import test from "node:test"
import { restoreConsentFocus } from "./consent-focus"

function target(connected = true) {
  const calls: FocusOptions[] = []
  return {
    isConnected: connected,
    focus: (options: FocusOptions = {}) => {
      calls.push(options)
    },
    calls,
  }
}

test("closing cookie settings returns to the connected opener without scrolling", () => {
  const opener = target()
  const main = target()
  assert.equal(restoreConsentFocus(opener, main), true)
  assert.deepEqual(opener.calls, [{ preventScroll: true }])
  assert.equal(main.calls.length, 0)
})

test("a removed opener falls back to the available main content", () => {
  const opener = target(false)
  const main = target()
  assert.equal(restoreConsentFocus(opener, main), true)
  assert.equal(opener.calls.length, 0)
  assert.deepEqual(main.calls, [{ preventScroll: true }])
})

test("first-visit cookie choices use the main content when there is no opener", () => {
  const main = target()
  assert.equal(restoreConsentFocus(null, main), true)
  assert.equal(main.calls.length, 1)
})

test("missing or disconnected focus targets do not receive focus", () => {
  const disconnected = target(false)
  assert.equal(restoreConsentFocus(disconnected, null), false)
  assert.equal(restoreConsentFocus(null, disconnected), false)
  assert.equal(restoreConsentFocus(null, null), false)
  assert.equal(disconnected.calls.length, 0)
})
