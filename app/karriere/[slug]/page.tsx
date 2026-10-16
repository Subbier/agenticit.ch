import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CareerJob } from "@/components/journey/career-job"
import { JsonLd } from "@/components/site/json-ld"
import { KARRIERE_JOBS } from "@/lib/karriere-content"
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return KARRIERE_JOBS.map((job) => ({ slug: job.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const job = KARRIERE_JOBS.find((entry) => entry.slug === slug)
  if (!job) notFound()
  return createPageMetadata({
    title: job.title,
    description: job.teaser,
    path: `/karriere/${job.slug}`,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const job = KARRIERE_JOBS.find((entry) => entry.slug === slug)
  if (!job) notFound()
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Karriere", path: "/karriere" },
            { name: job.title, path: `/karriere/${job.slug}` },
          ]),
        ]}
      />
      <CareerJob job={job} />
    </>
  )
}
