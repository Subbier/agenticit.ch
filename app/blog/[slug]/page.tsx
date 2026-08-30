import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogArticlePage } from "@/components/site/blog-article-page"
import { getAllPosts, getPost } from "@/lib/blog"
import { createPageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
  })
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!getPost(params.slug)) notFound()
  return <BlogArticlePage slug={params.slug} />
}
