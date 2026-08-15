import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

/**
 * Builds page metadata with consistent title templating, canonical URLs, and
 * Open Graph / Twitter defaults so every page only needs to supply its own
 * title, description, and path.
 */
export function buildMetadata({
  title,
  description,
  path,
  noIndex,
}: BuildMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
