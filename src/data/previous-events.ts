import { INSTAGRAM_PROFILE } from "@/data/social-links";

export type PreviousEventItem = {
  slug: string;
  title: string;
  /** Display date — update when ready */
  date: string;
  imageUrl: string;
  /**
   * Primary link when a card is clicked.
   * Replace with the matching @sfplayground Instagram post URL when you have it.
   */
  href: string;
  /** Recap or announcement on LinkedIn (used in sitemap when href is still the IG profile). */
  linkedInHref?: string;
};

/** Resolve the best public URL for sitemap + outbound links. */
export function getEventPublicUrl(event: PreviousEventItem): string {
  if (event.href !== INSTAGRAM_PROFILE) return event.href;
  return event.linkedInHref ?? event.href;
}

export const PREVIOUS_EVENTS: PreviousEventItem[] = [
  {
    slug: "stanford-mit-ai-hardware-stack",
    title:
      "Stanford x MIT Summit: The AI Hardware Stack — From Chip to Chiller",
    date: "",
    imageUrl: "/images/previous-events/stanford.png",
    href: INSTAGRAM_PROFILE,
    linkedInHref:
      "https://www.linkedin.com/feed/update/urn:li:activity:7464388250107875328/",
  },
  {
    slug: "global-wealth-forum-2026",
    title: "Global Wealth Forum 2026 — Salesforce Tower",
    date: "",
    imageUrl: "/images/previous-events/global.png",
    href: "https://www.instagram.com/p/DYdnk32G_I9/",
    linkedInHref:
      "https://www.linkedin.com/posts/innovateukbusinessconnect_invest-uk-professionalservices-activity-7459980773941534722-GIFJ",
  },
  {
    slug: "capital-night-funded-founders",
    title: "Capital Night for Funded Founders",
    date: "",
    imageUrl: "/images/previous-events/capitalnight.avif",
    href: "https://www.instagram.com/p/DYSSeEKPMtC/",
  },
  {
    slug: "harvard-mit-ai-construction",
    title:
      "Harvard x MIT Summit: AI in Construction & Real Estate — Open Registration",
    date: "",
    imageUrl: "/images/previous-events/construction.jpeg",
    href: "https://www.instagram.com/p/DX4uBlLmdS8/",
    linkedInHref:
      "https://www.linkedin.com/posts/benjaminshlemis_hosted-and-moderated-the-massachusetts-institute-activity-7457157115615432704-HjLw",
  },
  {
    slug: "physical-ai-pitch-playoffs-gtc-2026",
    title: "Physical AI Pitch Playoffs — GTC 2026",
    date: "",
    imageUrl: "/images/previous-events/pitch2.png",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7440454266391003136/",
    linkedInHref:
      "https://www.linkedin.com/feed/update/urn:li:activity:7440454266391003136/",
  },
  {
    slug: "harvard-mit-robotics-physical-ai",
    title: "Harvard + MIT Series (2nd of 3): Robotics & Physical AI",
    date: "",
    imageUrl: "/images/previous-events/harvard.jpg",
    href: INSTAGRAM_PROFILE,
    linkedInHref:
      "https://www.linkedin.com/posts/benjaminshlemis_inside-a-harvard-mit-robotics-event-three-activity-7440492204269318144-eQXW",
  },
];
