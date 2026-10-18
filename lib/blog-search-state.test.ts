import assert from "node:assert/strict"
import test from "node:test"
import { createBlogSearchState } from "./blog-search-state"

test("search and topic survive a view subscription ending and starting again", () => {
  const state = createBlogSearchState()
  let notices = 0
  const stop = state.subscribe(() => notices++)
  state.set({ query: "Offertenvergleich" })
  state.set({ category: "Webdesign & Marketing" })
  assert.equal(notices, 2)
  const selected = state.getSnapshot()
  assert.deepEqual(selected, {
    query: "Offertenvergleich",
    category: "Webdesign & Marketing",
  })
  assert.ok(Object.isFrozen(selected))
  stop()
  const resumed: unknown[] = []
  const stopAgain = state.subscribe(() => resumed.push(state.getSnapshot()))
  assert.equal(state.getSnapshot(), selected)
  state.set({ query: "Offertenvergleich" })
  assert.equal(resumed.length, 0)
  state.set({ query: "", category: "" })
  assert.equal(resumed.length, 1)
  assert.equal(notices, 2)
  assert.deepEqual(state.getSnapshot(), { query: "", category: "" })
  stopAgain()
})

test("server rendering and independent documents always start with all guides", () => {
  const state = createBlogSearchState()
  const initial = state.getServerSnapshot()
  assert.equal(initial, state.getServerSnapshot())
  assert.equal(initial, state.getSnapshot())
  state.set({ query: "CRM", category: "RevOps" })
  assert.equal(state.getServerSnapshot(), initial)
  assert.deepEqual(state.getServerSnapshot(), { query: "", category: "" })
  assert.deepEqual(createBlogSearchState().getSnapshot(), {
    query: "",
    category: "",
  })
})
