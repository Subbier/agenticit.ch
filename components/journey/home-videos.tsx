import { getPost } from "@/lib/blog"
import { getBlogVideo, homeVideoSlugs } from "@/lib/blog-videos"
import {
  BlogVideoRail,
  type VideoCard,
} from "@/components/site/blog-video-rail"

export function HomeVideos() {
  const items: VideoCard[] = homeVideoSlugs.flatMap((slug) => {
    const post = getPost(slug)
    const video = getBlogVideo(slug)
    return post && video
      ? [{ slug, title: post.title, category: post.category, video }]
      : []
  })
  return items.length ? <BlogVideoRail items={items} /> : null
}
