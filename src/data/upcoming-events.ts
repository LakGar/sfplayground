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
    time: "Thursday, July 30, 2026 · 5:30 PM – 9:00 PM",
    title: "The AI GTM Night",
    location: "2 Embarcadero Center, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/ai-gtm-night.png",
    tags: ["AI GTM", "Startup growth", "Demo booths"],
    href: "https://luma.com/sfplay-gd9n",
  },
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
];
