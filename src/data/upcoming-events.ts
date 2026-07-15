export type UpcomingEventItem = {
  time: string;
  title: string;
  location: string;
  hostName: string;
  hostImageUrl: string;
  coverImageUrl: string;
  tags: string[];
  href: string;
};

export const UPCOMING_EVENTS: UpcomingEventItem[] = [
  {
    time: "Thursday, August 13, 2026 · 6:00 PM – 9:00 PM",
    title: "AI Healthtech Summit at AngelList",
    location: "AngelList, 90 Gold St, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/ai-healthtech-summit.png",
    tags: ["AI Healthtech", "Clinical workflows", "Regulated care"],
    href: "https://luma.com/aihealthtechsf",
  },
  {
    time: "Tuesday, August 25, 2026 · 6:00 PM – 9:00 PM",
    title: "AI Data Center Night",
    location: "AngelList, 90 Gold St, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/ai-data-center-night.png",
    tags: ["AI Infrastructure", "Data centers", "Energy"],
    href: "https://luma.com/datacenterai",
  },
  {
    time: "Thursday, September 17, 2026 · 6:00 PM – 9:00 PM",
    title: "The AI GTM Night",
    location: "2 Embarcadero Center, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/ai-gtm-night.png",
    tags: ["AI GTM", "Startup growth", "Demo booths"],
    href: "https://luma.com/sfplay-gd9n",
  },
  {
    time: "Thursday, October 8, 2026 · 6:00 PM – 9:00 PM",
    title: "AI Law, Compliance, & GovTech Summit",
    location: "AngelList, 90 Gold St, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/ai-law-govtech-summit.png",
    tags: ["AI Law", "Compliance", "GovTech"],
    href: "https://luma.com/ailaw",
  },
  {
    time: "Thursday, October 15, 2026 · 6:00 PM – 9:00 PM",
    title: "Industrial AI Summit: The Future of Manufacturing",
    location: "AngelList, 90 Gold St, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/industrial-ai-summit.png",
    tags: ["Industrial AI", "Manufacturing", "Automation"],
    href: "https://luma.com/industrialai",
  },
];
