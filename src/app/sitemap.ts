import { MetadataRoute } from "next";
import siteData from "@/data/site-data.json";

const BASE_URL = "https://sfplayground.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/success-stories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const eventPages: MetadataRoute.Sitemap = (siteData.events as { slug: string }[]).map(
    (event) => ({
      url: `${BASE_URL}/events/${event.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  const successStoryPages: MetadataRoute.Sitemap = (
    siteData.successStories as { slug: string }[]
  ).map((story) => ({
    url: `${BASE_URL}/success-stories/${story.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...eventPages, ...successStoryPages];
}
