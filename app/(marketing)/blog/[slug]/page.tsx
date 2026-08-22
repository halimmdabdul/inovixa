import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { estimateReadingTime, splitParagraphs } from "@/lib/blog-utils";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { blogCategoryScenes } from "@/components/illustrations/blog-scenes";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Blog", description: "Article", path: "/blog" });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const Scene = blogCategoryScenes[post.category];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          publishedAt: post.published_at,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to blog
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <Badge tone="blue">{post.category}</Badge>
            <span className="text-xs text-slate-400">{estimateReadingTime(post.content)}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            {Scene ? <Scene /> : null}
          </div>

          <div className="prose-content mt-8 space-y-5">
            {splitParagraphs(post.content).map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <CTASection title="Ready to improve your website?" />
    </>
  );
}
