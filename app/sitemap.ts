import type { MetadataRoute } from "next"
import { INDEXABLE_ROUTES, SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return INDEXABLE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route === "/revops" || route === "/ai-agents" || route === "/excellence"
          ? 0.9
          : 0.7,
  }))
}
