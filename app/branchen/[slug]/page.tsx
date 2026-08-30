import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BranchenLpPage } from "@/components/site/branchen-lp-page"
import { BRANCHEN_LPS, BRANCHEN_LP_BY_SLUG } from "@/lib/branchen-content"
import { createPageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return BRANCHEN_LPS.map((lp) => ({ slug: lp.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const lp = BRANCHEN_LP_BY_SLUG[slug]
  if (!lp) return {}
  return createPageMetadata({
    title: lp.meta.title,
    description: lp.meta.description,
    path: `/branchen/${lp.slug}`,
    keywords: lp.keywords,
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!BRANCHEN_LP_BY_SLUG[slug]) notFound()
  return <BranchenLpPage slug={slug} />
}
