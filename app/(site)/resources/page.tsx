import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { DownloadList } from "@/components/Downloads";
import { NewsletterBand } from "@/components/NewsletterBand";
import { CategoryNav, PostGrid } from "@/components/ResourcesList";
import { getActiveCategories, getDownloads, getPublishedPosts } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/resources",
  title: "Resources: buying guides for Ethiopian coffee",
  description:
    "Practical guides for business buyers sourcing Ethiopian coffee: what to ask suppliers, how to assess samples, and choosing between green and roasted supply.",
});

export default async function ResourcesPage() {
  const [posts, categories, downloads] = await Promise.all([getPublishedPosts(), getActiveCategories(), getDownloads()]);
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container narrow">
          <p className="eyebrow">Resources</p>
          <h1 id="page-title">Buying guides for Ethiopian coffee</h1>
          <p className="lead">
            Practical guides for trade buyers sourcing from Ethiopia: what to ask exporters, how to judge samples, and how to choose
            between green and roasted supply.
          </p>
        </div>
      </section>
      {downloads.length > 0 && (
        <section className="section section-tight" aria-labelledby="tools-title">
          <div className="container">
            <h2 id="tools-title">Free buyer tools</h2>
            <p className="section-intro">Checklists and templates for buying Ethiopian coffee. Free in exchange for your email.</p>
            <DownloadList downloads={downloads} />
          </div>
        </section>
      )}
      <section className="section section-tight" aria-labelledby="guides-title">
        <div className="container">
          <h2 id="guides-title">Buying guides</h2>
          <CategoryNav categories={categories} />
          {posts.length ? (
            <PostGrid posts={posts} />
          ) : (
            <div className="empty-state">
              <h2>First guides coming soon</h2>
              <p>
                Our first buying guides are on their way. Meanwhile, see{" "}
                <Link href="/how-it-works">how sourcing with us works</Link> or <Link href="/inquiry">ask us a question</Link>.
              </p>
            </div>
          )}
        </div>
      </section>
      <NewsletterBand />
      <CtaBand title="Have a sourcing question? Ask us." />
    </>
  );
}
