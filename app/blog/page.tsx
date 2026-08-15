import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogPosts } from "@/lib/data/blog-posts";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical articles on website design, redesign, local SEO, and small business marketing.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">Blog</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          Practical, no-jargon articles on websites, SEO, and growing a local
          business online.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <div>
              <div className="flex items-center gap-3">
                <Badge tone="blue">{post.category}</Badge>
                <span className="text-xs text-slate-400">{post.readingTime}</span>
              </div>
              <h2 className="mt-2.5 text-lg font-semibold text-navy group-hover:text-brand-blue">
                {post.title}
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
