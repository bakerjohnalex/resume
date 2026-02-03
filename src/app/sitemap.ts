import type { MetadataRoute } from "next";
import { RESUME_DATA } from "@/data/resume-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = RESUME_DATA.personalWebsiteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects/ultralight-cams`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/carabiners`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/lamps`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/current`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/x4-quality`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/stinger`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
