"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isRateLimited } from "@/lib/rate-limit";

export interface UploadImageResult {
  success: boolean;
  url?: string;
  message: string;
}

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_FOLDERS = ["team", "blog", "services", "work"] as const;
type Folder = (typeof ALLOWED_FOLDERS)[number];

/**
 * Uploads an admin-picked image to the "media" Storage bucket and returns
 * its public URL. Runs as the signed-in admin's own session — RLS on
 * storage.objects grants authenticated users insert on that bucket (see
 * supabase/schema.sql) — so this deliberately does NOT use the service-role
 * client. Only reachable from /admin/*, which proxy.ts already requires a
 * signed-in session for. The extension is derived from the validated MIME
 * type rather than the original filename, so nothing from the upload is
 * trusted for the storage path beyond a random id.
 */
export async function uploadImage(formData: FormData): Promise<UploadImageResult> {
  const folder = formData.get("folder");
  if (typeof folder !== "string" || !ALLOWED_FOLDERS.includes(folder as Folder)) {
    return { success: false, message: "Invalid upload destination." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "No file selected." };
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return { success: false, message: "Please upload a JPEG, PNG, WebP, or GIF image." };
  }

  if (file.size > MAX_BYTES) {
    return { success: false, message: "Image must be under 5MB." };
  }

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`upload-image:${ip}`, 20, 60_000)) {
    return { success: false, message: "Too many uploads. Please try again in a minute." };
  }

  const supabase = await createClient();
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return { success: false, message: `Upload failed: ${error.message}` };
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);

  return { success: true, url: data.publicUrl, message: "Image uploaded." };
}
