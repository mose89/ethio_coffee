import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { CategoryNav, PostGrid } from "@/components/ResourcesList";
import { getActiveCategories, getCategory, getPublishedPosts } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return pageMetadata({
    path: `/resources/category/${slug}`,
    title: `${category.title}: Ethiopian coffee resources`,
    description: category.description || `Buying guides about ${category.title.toLowerCase()} for business buyers of Ethiopian coffee.`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, posts, categories] = await Promise.all([getCategory(slug), getPublishedPosts({ category: slug }), getActiveCategories()]);
  // No empty category pages: a category only exists publicly once it has a published article.
  if (!category || posts.length === 0) notFound();
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container narrow">
          <p className="eyebrow">Resources</p>
          <h1 id="page-title">{category.title}</h1>
          {category.description && <p className="lead">{category.description}</p>}
        </div>
      </section>
      <section className="section section-tight" aria-label="Articles">
        <div className="container">
          <CategoryNav categories={categories} active={slug} />
          <PostGrid posts={posts} />
        </div>
      </section>
      <CtaBand title="Have a sourcing question?" />
    </>
  );
}
