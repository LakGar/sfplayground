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
    slug: "shift-vc-2026-rooftop-community",
    title: "Shift VC 2026: Rooftop Drinks, Bites & Community",
    date: "July 9, 2026",
    imageUrl:
      "https://images.lumacdn.com/event-social/a3/08b264df-5400-4a17-b3ac-0586002d7f70.png",
    href: "https://luma.com/mudmhvdh",
  },
  {
    slug: "250-years-usa-independence-pre-party",
    title: '"250 Years USA" Independence Pre-Party',
    date: "July 2, 2026",
    imageUrl:
      "https://images.lumacdn.com/event-social/9j/67ed4de1-e376-46be-aa5b-b70c2e2080bc.png",
    href: "https://luma.com/sf-independence",
  },
  {
    slug: "new-american-dream-venture-summit-salesforce-tower",
    title: "The New American Dream Venture Summit — Salesforce Tower",
    date: "July 2, 2026",
    imageUrl: "/images/salesforce-summit/group-overhead.jpg",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7479227797132029952/?actorCompanyId=110189215",
  },
  {
    slug: "immigrant-founders-pitch-night-gallery-demos",
    title:
      "Immigrant Founders Pitch Night: Fireside Chat, Lightning Pitches & Gallery Demos",
    date: "June 29, 2026",
    imageUrl: "/images/immigrant-founders-night/lightning-pitch-room.jpg",
    href: "https://luma.com/tuc7ugzt",
  },
  {
    slug: "aerospace-defense-deep-tech-summit",
    title: "Aerospace & Defense — Deep Tech Summit",
    date: "June 25, 2026",
    imageUrl: "/images/previous-events/aerospace-defense.png",
    href: "https://www.linkedin.com/posts/sfplayground_sfplayground-deeptechweek-aerospace-activity-7477898436961280000-bUmV",
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
    date: "May 21, 2026",
    imageUrl: "/images/previous-events/stanford.png",
    href: "https://luma.com/silicon",
  },
  {
    slug: "global-wealth-forum-2026",
    title: "Global Wealth Forum 2026 — Salesforce Tower",
    date: "May 12, 2026",
    imageUrl: "/images/previous-events/global.png",
    href: "https://luma.com/p2qa8jdq",
  },
  {
    slug: "capital-night-funded-founders",
    title: "Capital Night for Funded Founders",
    date: "May 6, 2026",
    imageUrl: "/images/previous-events/capitalnight.avif",
    href: "https://www.linkedin.com/posts/sfplayground_what-an-evening-on-wednesday-at-limis-los-activity-7458658325270872064-GBYv",
  },
  {
    slug: "harvard-mit-ai-construction",
    title:
      "Harvard x MIT Summit: AI in Construction & Real Estate — Open Registration",
    date: "April 28, 2026",
    imageUrl: "/images/previous-events/construction.jpeg",
    href: "https://luma.com/harvardmitproperty",
  },
  {
    slug: "physical-ai-pitch-playoffs-gtc-2026",
    title: "Physical AI Pitch Playoffs — GTC 2026",
    date: "March 17, 2026",
    imageUrl: "/images/previous-events/pitch2.png",
    href: "https://luma.com/82fwu1tc",
  },
  {
    slug: "harvard-mit-robotics-physical-ai",
    title: "Harvard + MIT Series (2nd of 3): Robotics & Physical AI",
    date: "Spring 2026",
    imageUrl: "/images/previous-events/harvard.jpg",
    href: INSTAGRAM_PROFILE,
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
    date: "December 11, 2025",
    imageUrl: "/images/previous-events/pitch.png",
    href: "https://luma.com/ai-x-physical-reality",
  },
  {
    slug: "pitch-playoffs-physical-ai",
    title: "Pitch Playoffs: Physical AI",
    date: "December 11, 2025",
    imageUrl: "/images/pitch-playoffs/panel-presentation.jpg",
    href: "https://luma.com/54kzxvy6",
  },
];
