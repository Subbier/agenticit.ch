import type { MetadataRoute } from "next"
import { INDEXABLE_ROUTES, SITE_URL } from "@/lib/seo"
import { getAllPosts } from "@/lib/blog"
import { BRANCHEN_LPS } from "@/lib/branchen-content"
import { KARRIERE_JOBS } from "@/lib/karriere-content"
import { SITEMAP_CONTENT_DATES } from "@/lib/sitemap-content-dates"

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = INDEXABLE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: SITEMAP_CONTENT_DATES[route],
    changeFrequency: route === "/" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/excellence" ? 0.9 : 0.7,
  }))

  const blog: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: SITEMAP_CONTENT_DATES[`/blog/${post.slug}`],
    changeFrequency: "monthly",
    priority: post.pillar ? 0.8 : 0.6,
  }))

  const branchen: MetadataRoute.Sitemap = BRANCHEN_LPS.map((lp) => ({
    url: `${SITE_URL}/branchen/${lp.slug}`,
    lastModified: SITEMAP_CONTENT_DATES[`/branchen/${lp.slug}`],
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const jobs: MetadataRoute.Sitemap = KARRIERE_JOBS.map((job) => ({
    url: `${SITE_URL}/karriere/${job.slug}`,
    lastModified: SITEMAP_CONTENT_DATES[`/karriere/${job.slug}`],
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...core, ...blog, ...branchen, ...jobs]
}
