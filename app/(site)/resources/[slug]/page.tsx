import type { Metadata } from "next";
import { draftMode, headers } from "next/headers";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { DownloadList } from "@/components/Downloads";
import { Photo } from "@/components/Photo";
import { extractHeadings, RichContent } from "@/components/RichContent";
import { asMedia, findRedirect, getDownloads, getPayloadClient, getPost, getRelatedPosts } from "@/lib/cms";
import { formatDate, isoDate } from "@/lib/format";
import { site } from "@/lib/site";
import type { Author, Category, Post } from "@/payload-types";

type Props = { params: Promise<{ slug: string }> };

/** Returns the logged-in CMS user when preview (draft mode) is active; otherwise null. */
async function previewUser() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await headers() });
  return user ?? null;
}

async function load(slug: string): Promise<{ post: Post | null; preview: boolean }> {
  const user = await previewUser();
  const post = await getPost(slug, { draft: Boolean(user), user });
  return { post, preview: Boolean(user) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { post, preview } = await load(slug);
  if (!post) return {};
  const title = post.meta?.title || post.title;
  const description = post.meta?.description || post.excerpt;
  const image = asMedia(post.meta?.image) ?? asMedia(post.featuredImage);
  const path = `/resources/${post.slug}`;
  return {
    title: { absolute: `${title} | ${site.brand}` },
    description,
    ...(site.siteUrl ? { alternates: { canonical: path } } : {}),
    ...(preview || post._status !== "published" ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "article",
      siteName: site.brand,
      title,
      description,
      ...(site.siteUrl ? { url: path } : {}),
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.contentUpdatedAt ? { modifiedTime: post.contentUpdatedAt } : {}),
      ...(image?.url && site.siteUrl
        ? { images: [{ url: (image.sizes?.og?.url || image.url).split("?")[0], width: image.sizes?.og?.width || image.width || undefined, height: image.sizes?.og?.height || image.height || undefined, alt: image.alt }] }
        : {}),
    },
  };
}

const CTA = {
  green: { title: "Buying Ethiopian green coffee?", body: "Share your origin, process, volume and destination. We’ll propose suitable coffees from what’s available this season.", href: "/inquiry?product=green", label: "Request a quote", link: { href: "/green-coffee", label: "Explore green coffee" } },
  roasted: { title: "Looking for roasted Ethiopian coffee?", body: "Tell us your format, volume, market and timing. We’ll confirm what we can supply before anything is quoted.", href: "/inquiry?product=roasted", label: "Request a quote", link: { href: "/roasted-coffee", label: "Explore roasted coffee" } },
  general: { title: "Ready to buy Ethiopian coffee?", body: "Green or roasted, send us a short brief and we’ll reply with questions or suitable coffees to consider.", href: "/inquiry", label: "Request a quote", link: { href: "/how-it-works", label: "How buying from us works" } },
} as const;

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { post, preview } = await load(slug);

  if (!post) {
    const target = await findRedirect(`/resources/${slug}`);
    if (target) permanentRedirect(target);
    notFound();
  }

  const categories = (post.categories ?? []).filter((c): c is Category => typeof c === "object");
  const author = typeof post.author === "object" ? (post.author as Author | null) : null;
  const featured = asMedia(post.featuredImage);
  const [related, downloads] = await Promise.all([getRelatedPosts(post), getDownloads()]);
  const headings = extractHeadings(post.content);
  const cta = CTA[(post.cta as keyof typeof CTA) || "general"] ?? CTA.general;
  const updated = post.contentUpdatedAt && post.publishedAt && post.contentUpdatedAt > post.publishedAt ? post.contentUpdatedAt : null;
  const url = site.siteUrl ? `${site.siteUrl}/resources/${post.slug}` : "";

  const jsonLd =
    site.siteUrl && !preview && post._status === "published"
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.meta?.description || post.excerpt,
            mainEntityOfPage: url,
            url,
            ...(featured?.url ? { image: [`${site.siteUrl}${featured.url.split("?")[0]}`] } : {}),
            ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
            ...(updated || post.publishedAt ? { dateModified: updated || post.publishedAt } : {}),
            author: author
              ? { "@type": "Person", name: author.name, ...(author.linkedinUrl ? { sameAs: [author.linkedinUrl] } : {}) }
              : { "@type": "Organization", name: site.brandName, url: `${site.siteUrl}/` },
            publisher: { "@type": "Organization", name: site.brandName, url: `${site.siteUrl}/` },
            ...(categories.length ? { articleSection: categories.map((c) => c.title) } : {}),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${site.siteUrl}/` },
              { "@type": "ListItem", position: 2, name: "Resources", item: `${site.siteUrl}/resources` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ]
      : null;

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />}
      {preview && (
        <div className="preview-bar" role="status">
          <strong>Preview</strong> · {post._status === "published" ? "Showing the latest saved version, including unpublished changes." : "This draft is not published and is visible only to you."}{" "}
          <a href={`/exit-preview?slug=${encodeURIComponent(post.slug)}`}>Exit preview</a>
        </div>
      )}
      <article className="article">
        <header className="article-header">
          <div className="container narrow">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/resources">Resources</Link></li>
                {categories[0] && (
                  <li><Link href={`/resources/category/${categories[0].slug}`}>{categories[0].title}</Link></li>
                )}
              </ol>
            </nav>
            <h1>{post.title}</h1>
            <p className="article-dek">{post.excerpt}</p>
            <p className="article-meta">
              <span>{author ? <>By {author.name}{author.role ? `, ${author.role}` : ""}</> : <>Published by {site.brand}</>}</span>
              {post.publishedAt && (
                <span>
                  <time dateTime={isoDate(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
                </span>
              )}
              {updated && (
                <span>
                  Updated <time dateTime={isoDate(updated)}>{formatDate(updated)}</time>
                </span>
              )}
            </p>
          </div>
        </header>

        {featured && (
          <div className="container article-hero">
            <Photo media={featured} sizes="(min-width: 1100px) 1040px, 100vw" priority className="article-hero-visual" />
          </div>
        )}

        <div className={`container article-layout${headings.length >= 3 ? " has-toc" : ""}`}>
          {headings.length >= 3 && (
            <aside className="toc" aria-labelledby="toc-title">
              <p id="toc-title" className="toc-title">In this guide</p>
              <ol>
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
          <div className="article-body">
            <RichContent data={post.content} />
            <aside className="article-cta" aria-labelledby="article-cta-title">
              <h2 id="article-cta-title">{cta.title}</h2>
              <p>{cta.body}</p>
              <div className="button-row">
                <Link className="button button-green" href={cta.href}>
                  {cta.label}
                </Link>
                <Link className="text-link" href={cta.link.href}>
                  {cta.link.label} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
            {downloads.length > 0 && (
              <aside className="article-tool" aria-labelledby="article-tool-title">
                <p className="eyebrow" id="article-tool-title">Free buyer tool</p>
                <DownloadList downloads={downloads.slice(0, 1)} />
              </aside>
            )}
            {author?.bio && (
              <div className="author-box">
                <p className="author-name">About {author.name}</p>
                <p>{author.bio}</p>
              </div>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section-stone" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title">Related guides</h2>
            <div className="card-grid">
              {related.map((p) => (
                <ArticleCard key={p.id} post={p} headingLevel={3} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
