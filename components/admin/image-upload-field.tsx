"use client";

import { useState, type ChangeEvent } from "react";
import { Loader2, X } from "lucide-react";
import { uploadImage } from "@/app/actions/upload";

export function ImageUploadField({
  label,
  folder,
  value,
  onChange,
  id,
}: {
  label: string;
  folder: "team" | "blog" | "services";
  value: string;
  onChange: (url: string) => void;
  id: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const result = await uploadImage(formData);
    setUploading(false);

    if (result.success && result.url) {
      onChange(result.url);
    } else {
      setError(result.message);
    }
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        <span className="ml-1 font-normal text-slate-400">(optional)</span>
      </label>

      {value ? (
        <div className="mb-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-16 w-16 rounded-lg border border-slate-200 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Remove
          </button>
        </div>
      ) : null}

      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition-colors hover:file:bg-brand-blue-dark disabled:opacity-50"
      />

      {uploading ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          Uploading...
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
