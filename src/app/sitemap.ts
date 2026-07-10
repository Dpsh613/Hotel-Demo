import { MetadataRoute } from "next";
import { getSiteConfig, getAllServices } from "@/lib/data/loaders";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteConfig = await getSiteConfig();
  const servicesData = await getAllServices();
  const siteUrl = siteConfig?.url || "https://groveside.be";
  const now = new Date();

  const services =
    servicesData?.services
      .filter((s) => s.status === "published")
      .map((s) => ({
        url: `${siteUrl}/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      })) || [];

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...services,
    {
      url: `${siteUrl}/our-story`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/practical-info`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
