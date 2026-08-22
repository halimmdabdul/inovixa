import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants/site";
import { getServices } from "@/lib/services";
import { getCaseStudies } from "@/lib/case-studies";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // No lastModified on static/service/work routes — their content doesn't
  // carry a tracked "last changed" date, and stamping every build with
  // new Date() would falsely signal to crawlers that these pages change
  // daily, which dilutes rather than helps crawl prioritization.
  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/pricing",
    "/about",
    "/contact",
    "/audit",
    "/get-started",
    "/blog",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
  }));

  const services = await getServices();
  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
  }));

  const caseStudies = await getCaseStudies();
  const workRoutes = caseStudies.map((project) => ({
    url: `${siteConfig.url}/work/${project.slug}`,
  }));

  const posts = await getBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...blogRoutes];
}
