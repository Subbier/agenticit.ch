import { getBlogVideo, formatVideoDuration } from "@/lib/blog-videos"
import { BlogVideoPlayer } from "./blog-video-player"
import styles from "./blog-videos.module.css"

export function BlogArticleVideo({
  slug,
  title,
}: {
  slug: string
  title: string
}) {
  const video = getBlogVideo(slug)
  if (!video) return null
  return (
    <section
      className={styles.article}
      id="video"
      aria-labelledby="article-video-title"
    >
      <div className={styles.articleHeading}>
        <div>
          <span className={styles.eyebrow}>Lieber anschauen?</span>
          <h2 id="article-video-title">Das Thema als Video.</h2>
        </div>
        <span className={styles.meta}>
          {formatVideoDuration(video.durationSeconds)} Min. · Mit Ton
        </span>
      </div>
      <BlogVideoPlayer video={video} title={title} />
      <a className={styles.readLink} href="#artikel">
        Lieber lesen? Direkt zum Artikel ↓
      </a>
    </section>
  )
}
