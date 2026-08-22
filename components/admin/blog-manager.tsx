"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import type { BlogPostRow } from "@/types";
import { blogCategories } from "@/lib/validation/blog-post";
import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/app/actions/blog";
import { estimateReadingTime } from "@/lib/blog-utils";
import { InputField, SelectField, TextareaField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  content: "",
  publishedAt: new Date().toISOString().slice(0, 10),
};

export function BlogManager({ posts }: { posts: BlogPostRow[] }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  function startEdit(post: BlogPostRow) {
    setEditingId(post.id);
    setSlugTouched(true);
    setStatus(null);
    setForm({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      content: post.content,
      publishedAt: post.published_at,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setSlugTouched(false);
    setStatus(null);
    setForm(emptyForm);
  }

  function onTitleChange(title: string) {
    setForm((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : slugify(title),
    }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);

    const result = editingId
      ? await updateBlogPost(editingId, form)
      : await createBlogPost(form);

    setStatus({ ok: result.success, message: result.message });
    setSaving(false);

    if (result.success) {
      cancelEdit();
      router.refresh();
    }
  }

  async function onDelete(id: string) {
    setDeletingId(id);
    const result = await deleteBlogPost(id);
    setDeletingId(null);
    if (result.success) {
      if (editingId === id) cancelEdit();
      router.refresh();
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-navy">
            {editingId ? "Edit Post" : "New Post"}
          </h2>
          {editingId ? (
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Cancel
            </button>
          ) : null}
        </div>

        <InputField
          label="Title"
          id="postTitle"
          value={form.title}
          onChange={(event) => onTitleChange(event.target.value)}
          required
        />

        <div>
          <InputField
            label="URL slug"
            id="postSlug"
            value={form.slug}
            onChange={(event) => {
              setSlugTouched(true);
              setForm((current) => ({ ...current, slug: event.target.value }));
            }}
            required
          />
          <p className="mt-1.5 text-xs text-slate-500">
            inovixadigital.com/blog/{form.slug || "your-post-slug"}
            {editingId ? " — changing this changes the post's URL." : ""}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Category"
            id="postCategory"
            options={blogCategories}
            value={form.category}
            onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            required
          />
          <InputField
            label="Publish date"
            id="postPublishedAt"
            type="date"
            value={form.publishedAt}
            onChange={(event) => setForm((current) => ({ ...current, publishedAt: event.target.value }))}
            required
          />
        </div>

        <TextareaField
          label="Excerpt"
          id="postExcerpt"
          rows={2}
          value={form.excerpt}
          onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
          required
        />

        <div>
          <TextareaField
            label="Article content"
            id="postContent"
            rows={14}
            value={form.content}
            onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
            required
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Separate paragraphs with a blank line. Reading time is calculated
            automatically ({estimateReadingTime(form.content)}).
          </p>
        </div>

        {status ? (
          <p role="alert" className={`text-sm ${status.ok ? "text-brand-teal" : "text-red-600"}`}>
            {status.message}
          </p>
        ) : null}

        <Button type="submit" disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {editingId ? "Saving..." : "Publishing..."}
            </>
          ) : (
            <>
              {editingId ? <Pencil className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
              {editingId ? "Save Changes" : "Publish Post"}
            </>
          )}
        </Button>
      </form>

      <div>
        <h2 className="text-base font-semibold text-navy">Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            No posts yet — the site&rsquo;s /blog page is empty until you publish one.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="blue">{post.category}</Badge>
                    <span className="text-xs text-slate-400">
                      {new Date(post.published_at).toLocaleDateString()} &middot;{" "}
                      {estimateReadingTime(post.content)}
                    </span>
                  </div>
                  <p className="mt-1.5 truncate font-semibold text-navy">{post.title}</p>
                  <p className="truncate text-sm text-slate-500">/blog/{post.slug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button type="button" variant="secondary" size="sm" onClick={() => startEdit(post)}>
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={deletingId === post.id}
                    onClick={() => onDelete(post.id)}
                  >
                    {deletingId === post.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    )}
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
