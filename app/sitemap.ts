import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...solutions.map((s) => ({ url: `${site.url}/solutions/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/quote`, changeFrequency: "yearly", priority: 0.6 },
  ];
}
