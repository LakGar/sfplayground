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
  {
    time: "Monday, June 29, 2026 · 6:00 PM – 9:00 PM",
    title: "Immigrant Founders: Lightning Pitch & Fireside Night",
    location: "2 Embarcadero Ctr, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: LUMA_COVER(
      "/uploads/3t/fc3d98b6-8052-4c04-9cee-3cc21db44884.png",
    ),
    tags: ["Visa 2 Venture Week", "Immigrant founders", "Lightning pitches"],
    href: "https://luma.com/tuc7ugzt",
  },
  {
    time: "Thursday, July 2, 2026 · 6:00 PM – 9:00 PM",
    title: "The New American Dream: Immigrant Founder Forum at Salesforce Tower",
    location: "Salesforce Tower, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: LUMA_COVER(
      "/uploads/68/1fe26eb1-7d09-4f78-8a82-d5ef4539afda.png",
    ),
    tags: ["Visa 2 Venture Week", "Immigrant founders", "Founder forum"],
    href: "https://luma.com/3ltsdmt0",
  },
];
