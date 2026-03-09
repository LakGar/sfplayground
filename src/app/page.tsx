import Hero from "@/component/landing/hero";
import NextEvent from "@/component/landing/next-event";
import Nav from "@/component/landing/nav";
import About from "@/component/landing/about";
import HowItWorks from "@/component/landing/how-it-works";
import Events from "@/component/landing/events";
import Sponsors from "@/component/landing/sponsors";
import Featured from "@/component/landing/featured";
import CTA from "@/component/landing/cta";
import Newsletter from "@/component/landing/newsletter";
import FAQ from "@/component/landing/faq";
import Footer from "@/component/landing/footer";
import { getNextEvent, getEvents, getBlogPosts } from "@/lib/db";
import siteData from "@/data/site-data.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SF Playground | Live Startup Pitches & Real Investor Decisions",
  description: "Join SF Playground for live startup pitch events in San Francisco. Watch real-time investor decisions, discover success stories, and connect with VCs and founders.",
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
  } = { ...(siteData.nextEvent as typeof siteData.nextEvent), imageUrl: undefined };
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
        ctaUrl: undefined,
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

  let latestPost: { title: string; slug: string; excerpt: string | null; created_at: Date; image_url: string | null } | null = null;
  try {
    const posts = await getBlogPosts(true);
    if (posts.length > 0) {
      const p = posts[0];
      latestPost = { title: p.title, slug: p.slug, excerpt: p.excerpt, created_at: p.created_at, image_url: p.image_url };
    }
  } catch {
    // no blog post to show
  }

  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <Hero latestPost={latestPost} />
      <NextEvent nextEvent={nextEventData} />
      <Sponsors />

      <div id="about">
        <About />
      </div>

      <HowItWorks />
      <div id="events">
        <Events events={eventsList} />
      </div>
      <Featured />
      <div id="apply">
        <CTA />
      </div>
      <Newsletter />
      <div id="faq">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default page;
