import assert from "node:assert/strict"
import test from "node:test"
import { getAllPosts, getRelatedPosts } from "./blog"

test("every published article is discoverable through another article's related guides", () => {
  const posts = getAllPosts()
  const linked = new Set<string>()
  for (const post of posts) {
    const related = getRelatedPosts(post)
    assert.equal(related.length, 3)
    assert.equal(new Set(related.map((item) => item.slug)).size, 3)
    assert.ok(related.every((item) => item.slug !== post.slug))
    assert.ok(related.some((item) => item.category === post.category))
    related.forEach((item) => linked.add(item.slug))
  }
  assert.deepEqual(
    posts.filter((post) => !linked.has(post.slug)).map((post) => post.slug),
    [],
  )
})

test("related guide limits are respected, including an empty selection", () => {
  const post = getAllPosts()[0]
  assert.deepEqual(getRelatedPosts(post, 0), [])
  assert.equal(getRelatedPosts(post, 1).length, 1)
  assert.equal(getRelatedPosts(post, 2).length, 2)
})
