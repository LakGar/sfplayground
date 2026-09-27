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
    time: "Thursday, September 10, 2026 · 6:00 PM – 9:00 PM",
    title: "AI in Hospitality Summit at Finix",
    location: "Finix, 760 Market St, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/ai-hospitality-summit.jpg",
    tags: ["AI Hospitality", "Guest experience", "Revenue"],
    href: "https://luma.com/aihospitality",
  },
  {
    time: "Thursday, September 17, 2026 · 6:00 PM – 9:00 PM",
    title: "The AI GTM Night",
    location: "2 Embarcadero Center, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/ai-gtm-night.jpg",
    tags: ["AI GTM", "Startup growth", "Demo booths"],
    href: "https://luma.com/sfplay-gd9n",
  },
  {
    time: "October 8, 2026 · 4:00 PM – 8:00 PM",
    title: "Founder Funder Rooftop Mixer",
    location: "795 Folsom St, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/founder-funder-rooftop-mixer.png",
    tags: ["Founders", "Investors", "Rooftop mixer"],
    href: "https://partiful.com/e/SqbI9qtANh5vj8Ceg3ab",
  },
  {
    time: "Thursday, October 8, 2026 · 6:00 PM – 9:00 PM",
    title: "AI Law, Compliance, & GovTech Summit",
    location: "AngelList, 90 Gold St, San Francisco, CA",
    hostName: "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: "/images/events/ai-law-govtech-summit.png",
    tags: ["AI Law", "Compliance", "GovTech"],
    href: "https://partiful.com/e/S91gvLPLTNrvsW7QSfcC",
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
