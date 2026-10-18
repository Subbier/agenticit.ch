import type { BlogPostMeta } from "./blog"

type SearchablePost = Pick<
  BlogPostMeta,
  "title" | "description" | "category" | "tags" | "keywords"
>

function searchText(value: string) {
  return value
    .toLocaleLowerCase("de-CH")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\u00df/g, "ss")
}

export function filterBlogPosts<T extends SearchablePost>(
  posts: readonly T[],
  { query = "", category = "" }: { query?: string; category?: string } = {},
): T[] {
  const words = searchText(query).match(/[\p{L}\p{N}]+/gu) ?? []
  return posts.filter((post) => {
    if (category && post.category !== category) return false
    const content = searchText(
      [
        post.title,
        post.description,
        post.category,
        ...post.tags,
        ...post.keywords,
      ].join(" "),
    )
    return words.every((word) => content.includes(word))
  })
}
