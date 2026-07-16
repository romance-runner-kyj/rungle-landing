/**
 * app/sitemap.ts — sitemap.xml (v2 SEO 세트 계승, hreflang alternates 포함)
 */
import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    "ko-KR": `${SITE_URL}/`,
    "en-US": `${SITE_URL}/en`,
    "x-default": `${SITE_URL}/`,
  };

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages },
    },
  ];
}
