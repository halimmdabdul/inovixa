import "server-only";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { BlogPostRow } from "@/types";

/**
 * Reads blog posts for the public /blog section. Returns an empty array
 * whenever Supabase isn't configured or the table has no rows yet, matching
 * lib/team.ts's pattern — the site degrades gracefully rather than crashing.
 */
async function fetchBlogPosts(): Promise<BlogPostRow[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false })
    .returns<BlogPostRow[]>();

  if (error) {
    console.info("[blog] Couldn't read blog_posts:", error.message);
    return [];
  }

  return data ?? [];
}

export const getBlogPosts = unstable_cache(fetchBlogPosts, ["blog-posts"], {
  tags: ["blog-posts"],
});

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
