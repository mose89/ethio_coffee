import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { CategoryNav, PostGrid } from "@/components/ResourcesList";
import { getActiveCategories, getPublishedPosts } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/resources",
  title: "Resources: buying guides for Ethiopian coffee",
  description:
    "Practical guides for business buyers sourcing Ethiopian coffee: what to ask suppliers, how to assess samples, and choosing between green and roasted supply.",
});

export default async function ResourcesPage() {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getActiveCategories()]);
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container narrow">
          <p className="eyebrow">Resources</p>
          <h1 id="page-title">Buying guides for Ethiopian coffee</h1>
          <p className="lead">
            Practical answers to the questions business buyers ask when sourcing Ethiopian coffee: what to request from suppliers, how
            to evaluate samples, and how to choose the right supply format.
          </p>
        </div>
      </section>
      <section className="section section-tight" aria-label="Articles">
        <div className="container">
          <CategoryNav categories={categories} />
          {posts.length ? (
            <PostGrid posts={posts} />
          ) : (
            <div className="empty-state">
              <h2>Guides are being prepared</h2>
              <p>
                Our first buying guides are being reviewed before publication. In the meantime, see{" "}
                <Link href="/how-it-works">how sourcing with us works</Link> or <Link href="/inquiry">ask us a question</Link>.
              </p>
            </div>
          )}
        </div>
      </section>
      <CtaBand title="Have a sourcing question?" />
    </>
  );
}
