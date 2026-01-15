import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://twinkle-tools.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://twinkle-tools.com/tools/image/compress",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://twinkle-tools.com/tools/image/convert",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://twinkle-tools.com/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
