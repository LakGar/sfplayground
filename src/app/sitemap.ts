import { MetadataRoute } from "next";
import { getEventPublicUrl, PREVIOUS_EVENTS } from "@/data/previous-events";
import { INSTAGRAM_PROFILE } from "@/data/social-links";

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
      url: `${BASE_URL}/network`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/sponsors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pitch-playoffs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/previous-events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/silicon-valley`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: INSTAGRAM_PROFILE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  const eventSocialPages: MetadataRoute.Sitemap = PREVIOUS_EVENTS.map(
    (event) => ({
      url: getEventPublicUrl(event),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })
  );

  return [...staticPages, ...eventSocialPages];
}
