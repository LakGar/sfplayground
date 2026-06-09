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

const LUMA_COVER = (path: string) =>
  `https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=800,height=800${path}`;

export const UPCOMING_EVENTS: UpcomingEventItem[] = [
  {
    time: "Monday, June 29, 2026 · 5:30 PM – 9:00 PM",
    title: "Built Beyond Borders",
    location: "San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/built-beyond-borders.png",
    tags: ["Visa 2 Venture Week", "Immigrant founders", "Demo night"],
    href: "/built-beyond-borders",
  },
  {
    time: "Thursday, June 18, 2026 · 5:30 PM – 9:00 PM",
    title: "Applied AI Gallery Night",
    location: "2 Embarcadero Ctr, San Francisco, CA",
    hostName: "SF Playground",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/applied-ai-gallery-night.png",
    tags: ["Applied AI", "Live demos", "Gallery night"],
    href: "https://luma.com/user/SFPlayground",
  },
  {
    time: "Wednesday, June 24, 2026 · 5:30 PM – 9:30 PM",
    title: "Aexodus Deep Tech Physical AI Summit",
    location: "760 Market St, 4th floor, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: LUMA_COVER(
      "/uploads/ze/4834b085-1607-4b18-9cbf-da9813d45e81.jpg",
    ),
    tags: ["Private event", "Physical AI", "Deep Tech"],
    href: "https://luma.com/user/SFPlayground",
  },
  {
    time: "Thursday, June 25, 2026 · 6:00 PM – 9:00 PM",
    title: "Aerospace & Defense — Deep Tech Summit",
    location: "AngelList, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: LUMA_COVER(
      "/uploads/9d/75334b10-a203-4f6f-b424-08cbf97c9679.png",
    ),
    tags: ["Aerospace", "Defense", "Deep Tech"],
    href: "https://luma.com/user/SFPlayground",
  },
];
