import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBlogPosts } from "@/lib/blog";
import { estimateReadingTime } from "@/lib/blog-utils";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { blogCategoryScenes } from "@/components/illustrations/blog-scenes";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical articles on website design, redesign, local SEO, and small business marketing.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">Blog</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          Practical, no-jargon articles on websites, SEO, and growing a local
          business online.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-14 text-center text-sm text-slate-500">
          No articles published yet — check back soon.
        </p>
      ) : (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const Scene = blogCategoryScenes[post.category];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden">{Scene ? <Scene /> : null}</div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <Badge tone="blue">{post.category}</Badge>
                    <span className="text-xs text-slate-400">{estimateReadingTime(post.content)}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-navy group-hover:text-brand-blue">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Section>
  );
}
