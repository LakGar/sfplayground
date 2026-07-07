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
    slug: "new-american-dream-venture-summit-salesforce-tower",
    title: "The New American Dream Venture Summit — Salesforce Tower",
    date: "July 2, 2026",
    imageUrl: "/images/salesforce-summit/group-overhead.jpg",
    href: "https://luma.com/3ltsdmt0",
  },
  {
    slug: "immigrant-founders-pitch-night-gallery-demos",
    title:
      "Immigrant Founders Pitch Night: Fireside Chat, Lightning Pitches & Gallery Demos",
    date: "June 29, 2026",
    imageUrl: "/images/salesforce-summit/networking-conversation.jpg",
    href: "https://luma.com/tuc7ugzt",
    linkedInHref:
      "https://www.linkedin.com/posts/arkadiybaltser_immigrant-founders-pitch-night-fireside-activity-7476818188907855872-aD8o",
  },
  {
    slug: "aerospace-defense-deep-tech-summit",
    title: "Aerospace & Defense — Deep Tech Summit",
    date: "June 25, 2026",
    imageUrl: "/images/previous-events/aerospace-defense.png",
    href: "https://luma.com/deep-ot9l",
  },
  {
    slug: "aexodus-deep-tech-physical-ai-summit",
    title: "Aexodus Deep Tech Physical AI Summit",
    date: "June 24, 2026",
    imageUrl: "/images/salesforce-summit/roundtable-speaker.jpg",
    href: "https://luma.com/fsi7q6dx",
  },
  {
    slug: "stanford-mit-ai-hardware-stack",
    title:
      "Stanford x MIT Summit: The AI Hardware Stack — From Chip to Chiller",
    date: "June 2026",
    imageUrl: "/images/previous-events/stanford.png",
    href: "https://luma.com/silicon",
    linkedInHref:
      "https://www.linkedin.com/feed/update/urn:li:activity:7464388250107875328/",
  },
  {
    slug: "global-wealth-forum-2026",
    title: "Global Wealth Forum 2026 — Salesforce Tower",
    date: "May 2026",
    imageUrl: "/images/previous-events/global.png",
    href: "https://luma.com/p2qa8jdq",
    linkedInHref:
      "https://www.linkedin.com/posts/innovateukbusinessconnect_invest-uk-professionalservices-activity-7459980773941534722-GIFJ",
  },
  {
    slug: "capital-night-funded-founders",
    title: "Capital Night for Funded Founders",
    date: "May 6, 2026",
    imageUrl: "/images/previous-events/capitalnight.avif",
    href: "https://luma.com/uecei56p",
    linkedInHref:
      "https://www.linkedin.com/posts/sfplayground_capitalnight-sfplayground-founders-activity-7460539880025137152-arQ9",
  },
  {
    slug: "harvard-mit-ai-construction",
    title:
      "Harvard x MIT Summit: AI in Construction & Real Estate — Open Registration",
    date: "Spring 2026",
    imageUrl: "/images/previous-events/construction.jpeg",
    href: "https://luma.com/harvardmitproperty",
    linkedInHref:
      "https://www.linkedin.com/posts/benjaminshlemis_hosted-and-moderated-the-massachusetts-institute-activity-7457157115615432704-HjLw",
  },
  {
    slug: "physical-ai-pitch-playoffs-gtc-2026",
    title: "Physical AI Pitch Playoffs — GTC 2026",
    date: "March 17, 2026",
    imageUrl: "/images/previous-events/pitch2.png",
    href: "https://luma.com/82fwu1tc",
    linkedInHref:
      "https://www.linkedin.com/feed/update/urn:li:activity:7440454266391003136/",
  },
  {
    slug: "harvard-mit-robotics-physical-ai",
    title: "Harvard + MIT Series (2nd of 3): Robotics & Physical AI",
    date: "Spring 2026",
    imageUrl: "/images/previous-events/harvard.jpg",
    href: INSTAGRAM_PROFILE,
    linkedInHref:
      "https://www.linkedin.com/posts/benjaminshlemis_inside-a-harvard-mit-robotics-event-three-activity-7440492204269318144-eQXW",
  },
  {
    slug: "ai-healthcare-silicon-valley-investing-summit",
    title: "AI x Healthcare — Silicon Valley Investing Summit",
    date: "January 2026",
    imageUrl: "/images/previous-events/ai-healthcare-silicon-valley.png",
    href: "https://luma.com/ai-x-healthcare",
  },
  {
    slug: "pitch-playoffs-001",
    title: "Pitch Playoffs 001",
    date: "Early 2026",
    imageUrl: "/images/previous-events/pitch.png",
    href: "https://www.linkedin.com/posts/benjaminshlemis_great-ideas-deserve-a-real-stage-more-to-activity-7407877272311042049-QSjq",
    linkedInHref:
      "https://www.linkedin.com/posts/benjaminshlemis_great-ideas-deserve-a-real-stage-more-to-activity-7407877272311042049-QSjq",
  },
];
