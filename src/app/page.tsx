// import Hero from "@/component/landing/hero";
// import NextEvent from "@/component/landing/next-event";
// import Nav from "@/component/landing/nav";
// import About from "@/component/landing/about";
// import HowItWorks from "@/component/landing/how-it-works";
// import Events from "@/component/landing/events";
// import Sponsors from "@/component/landing/sponsors";
// import Featured from "@/component/landing/featured";
// import CTA from "@/component/landing/cta";
// import Newsletter from "@/component/landing/newsletter";
// import FAQ from "@/component/landing/faq";
// import Footer from "@/component/landing/footer";
import { getNextEvent, getEvents } from "@/lib/db";
import siteData from "@/data/site-data.json";
import type { Metadata } from "next";
import Hero from "@/component/landing-main/hero";
import Nav from "@/component/landing-main/nav";
import Stats from "@/component/landing-main/stats";
import Contact from "@/component/landing-main/contact";
import Footer from "@/component/landing-main/footer";
import FAQ from "@/component/landing/faq";
import Sponsors from "@/component/landing/sponsors";
import { Features } from "@/component/landing-main/features";
import { SuccessStories } from "@/component/landing-main/successStories";
import UpcomingEvent, {
  type UpcomingEventCard,
} from "@/component/landing-main/upcoming-event";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SF Playground | Live Startup Pitches & Real Investor Decisions",
  description:
    "Join SF Playground for live startup pitch events in San Francisco. Watch real-time investor decisions, discover success stories, and connect with VCs and founders.",
  alternates: {
    canonical: "https://sfplayground.com",
  },
  icons: {
    icon: "public/favicon.ico",
  },
};

const page = async () => {
  let nextEventData: {
    title: string;
    date: string;
    time: string;
    location: string;
    hook: string;
    ctaText: string;
    ctaUrl?: string;
    imageUrl?: string;
  } = {
    ...(siteData.nextEvent as typeof siteData.nextEvent),
    imageUrl: undefined,
  };
  try {
    const row = await getNextEvent();
    if (row) {
      nextEventData = {
        title: row.title,
        date: row.date,
        time: row.time ?? "",
        location: row.location,
        hook: row.hook,
        ctaText: row.cta_text,
        ctaUrl: nextEventData.ctaUrl,
        imageUrl: row.image_url ?? undefined,
      };
    }
  } catch {
    // keep site-data fallback
  }

  let eventsList: {
    slug: string;
    title: string;
    date: string;
    location: string;
    attendees: number;
    status: string;
    coverImage: string;
    description?: string;
    images?: string[];
  }[] = siteData.events as typeof siteData.events;
  try {
    const dbEvents = await getEvents();
    if (dbEvents.length > 0) {
      eventsList = dbEvents.map((e) => ({
        slug: e.slug,
        title: e.title,
        date: e.date,
        location: e.location,
        attendees: e.attendees,
        status: e.status,
        coverImage: e.cover_image ?? "",
        description: e.description,
        images: e.images ?? [],
      }));
    }
  } catch {
    // keep site-data fallback
  }

  const siteWithHomeEvents = siteData as typeof siteData & {
    homepageUpcomingEvents?: UpcomingEventCard[];
  };
  const fallbackLuma =
    nextEventData.ctaUrl ??
    (siteData.nextEvent as { ctaUrl?: string }).ctaUrl ??
    "/events";
  const upcomingCards: UpcomingEventCard[] = siteWithHomeEvents
    .homepageUpcomingEvents?.length
    ? siteWithHomeEvents.homepageUpcomingEvents
    : [
        {
          time: nextEventData.time,
          title: nextEventData.title,
          location: nextEventData.location,
          lumaUrl: fallbackLuma,
          coverImageUrl:
            nextEventData.imageUrl ?? "/logo/SFPlayground-Logo-256.png",
          hosts: [
            {
              name: "SF Playground",
              imageUrl: "/logo/SFPlayground-Logo-64.png",
            },
          ],
        },
      ];

  return (
    <div className="relative overflow-x-clip w-full">
      <Nav />

      <div className="w-screen h-screen flex flex-col items-center justify-center relative transform-style: preserve-3d;">
        <Hero />
      </div>
      <UpcomingEvent events={upcomingCards} />
      <Sponsors />

      <Stats />

      <SuccessStories />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
};

export default page;
