import assert from "node:assert/strict"
import test from "node:test"
import { jumpToMainContent } from "./main-content-focus"

function setup(overrides: Partial<MouseEvent> = {}) {
  const calls: unknown[] = []
  const event = {
    button: 0,
    defaultPrevented: false,
    ctrlKey: false,
    altKey: false,
    metaKey: false,
    shiftKey: false,
    preventDefault: () => calls.push("preventDefault"),
    ...overrides,
  }
  const target = {
    focus: (options?: FocusOptions) => calls.push(["focus", options]),
    scrollIntoView: (options?: boolean | ScrollIntoViewOptions) =>
      calls.push(["scrollIntoView", options]),
  }
  return { calls, event, target }
}

test("a normal content jump prevents fragment navigation and focuses before scrolling", () => {
  const { calls, event, target } = setup()
  assert.equal(jumpToMainContent(event, target), true)
  assert.deepEqual(calls, [
    "preventDefault",
    ["focus", { preventScroll: true }],
    ["scrollIntoView", { block: "start" }],
  ])
})

test("a missing target preserves the native anchor fallback", () => {
  const { calls, event } = setup()
  assert.equal(jumpToMainContent(event, null), false)
  assert.deepEqual(calls, [])
})

test("modified, non-primary and already handled clicks preserve their default action", () => {
  for (const override of [
    { button: 1 },
    { button: 2 },
    { ctrlKey: true },
    { metaKey: true },
    { altKey: true },
    { shiftKey: true },
    { defaultPrevented: true },
  ]) {
    const { calls, event, target } = setup(override)
    assert.equal(jumpToMainContent(event, target), false)
    assert.deepEqual(calls, [])
  }
})
