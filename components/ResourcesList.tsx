import Link from "next/link";
import type { Category, Post } from "@/payload-types";
import { ArticleCard } from "./ArticleCard";

export function CategoryNav({ categories, active }: { categories: (Category & { count: number })[]; active?: string }) {
  if (categories.length < 2) return null;
  return (
    <nav className="category-nav" aria-label="Resource categories">
      <ul>
        <li>
          <Link href="/resources" aria-current={!active ? "page" : undefined}>
            All
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={`/resources/category/${c.slug}`} aria-current={active === c.slug ? "page" : undefined}>
              {c.title} <span className="count">({c.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="card-grid">
      {posts.map((p) => (
        <ArticleCard key={p.id} post={p} />
      ))}
    </div>
  );
}
