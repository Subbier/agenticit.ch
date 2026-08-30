import type { MetadataRoute } from "next"
import { INDEXABLE_ROUTES, SITE_URL } from "@/lib/seo"
import { getAllPosts } from "@/lib/blog"
import { BRANCHEN_LPS } from "@/lib/branchen-content"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core: MetadataRoute.Sitemap = INDEXABLE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: route === "/" || route === "/blog" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route === "/excellence"
          ? 0.9
          : 0.7,
  }))

  const blog: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "monthly",
    priority: post.pillar ? 0.8 : 0.6,
  }))

  const branchen: MetadataRoute.Sitemap = BRANCHEN_LPS.map((lp) => ({
    url: `${SITE_URL}/branchen/${lp.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...core, ...blog, ...branchen]
}
