"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { blogPostSchema } from "@/lib/validation/blog-post";

export interface BlogActionResult {
  success: boolean;
  message: string;
}

/**
 * All three actions run as the signed-in admin's own session — RLS grants
 * authenticated users full access to blog_posts (see supabase/schema.sql) —
 * so none of them use the service-role client. Only reachable from
 * /admin/blog, which proxy.ts already requires a signed-in session for.
 */
export async function createBlogPost(values: unknown): Promise<BlogActionResult> {
  const parsed = blogPostSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("blog_posts").insert({
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    content: data.content,
    published_at: data.publishedAt,
    cover_image_url: data.coverImageUrl || null,
  });

  if (error) {
    if (error.code === "23505") return { success: false, message: "That slug is already in use." };
    return { success: false, message: `Couldn't publish post: ${error.message}` };
  }

  updateTag("blog-posts");
  return { success: true, message: "Post published." };
}

export async function updateBlogPost(id: string, values: unknown): Promise<BlogActionResult> {
  if (!id) return { success: false, message: "Missing post id." };

  const parsed = blogPostSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase
    .from("blog_posts")
    .update({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      content: data.content,
      published_at: data.publishedAt,
      cover_image_url: data.coverImageUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") return { success: false, message: "That slug is already in use." };
    return { success: false, message: `Couldn't update post: ${error.message}` };
  }

  updateTag("blog-posts");
  return { success: true, message: "Post updated." };
}

export async function deleteBlogPost(id: string): Promise<BlogActionResult> {
  if (!id) return { success: false, message: "Missing post id." };

  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Couldn't delete post: ${error.message}` };
  }

  updateTag("blog-posts");
  return { success: true, message: "Post deleted." };
}
