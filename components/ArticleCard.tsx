import Link from "next/link";
import type { Post } from "@/payload-types";
import { asMedia } from "@/lib/cms";
import { formatDate, isoDate } from "@/lib/format";
import { Visual } from "./Visual";

export function ArticleCard({ post, headingLevel = 2 }: { post: Post; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const categories = (post.categories ?? []).filter((c) => typeof c === "object");
  const fallback = categories.some((c) => typeof c === "object" && c.slug === "roasted-coffee") ? "roasted" : "green";
  return (
    <article className="article-card">
      <Visual media={asMedia(post.featuredImage)} fallback={fallback} sizes="(min-width: 1000px) 30vw, (min-width: 700px) 45vw, 100vw" className="card-visual" />
      <div className="article-card-body">
        {categories[0] && typeof categories[0] === "object" && <p className="card-category">{categories[0].title}</p>}
        <H className="card-title">
          <Link href={`/resources/${post.slug}`}>{post.title}</Link>
        </H>
        <p className="card-excerpt">{post.excerpt}</p>
        {post.publishedAt && (
          <p className="card-meta">
            <time dateTime={isoDate(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
          </p>
        )}
      </div>
    </article>
  );
}
