import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
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
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          publishedAt: post.publishedAt,
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
            <span className="text-xs text-slate-400">{post.readingTime}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {post.title}
          </h1>

          <div className="prose-content mt-8 space-y-5">
            {post.content.map((paragraph, index) => (
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
