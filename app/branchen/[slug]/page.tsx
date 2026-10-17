import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createPageMetadata } from "@/lib/seo"
import { IndustryFocusPage } from "@/components/journey/industry-focus-page"
import { allIndustryFocus } from "@/lib/industry-sectors"
import { industryFocus } from "@/lib/industry-focus"

export const dynamicParams = false

export function generateStaticParams() {
  return allIndustryFocus.map((focus) => ({ slug: focus.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const focus = allIndustryFocus.find((item) => item.slug === slug)
  if (!focus) return {}
  return createPageMetadata({
    title: focus.title,
    description: focus.description,
    path: `/branchen/${focus.slug}`,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const focus = allIndustryFocus.find((item) => item.slug === slug)
  if (!focus) notFound()
  return (
    <IndustryFocusPage
      focus={focus}
      showCallback={!industryFocus.some((item) => item.slug === slug)}
    />
  )
}
