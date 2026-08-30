import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogArticlePage } from "@/components/site/blog-article-page"
import { getAllPosts, getPost } from "@/lib/blog"
import { createPageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getPost(slug)) notFound()
  return <BlogArticlePage slug={slug} />
}
