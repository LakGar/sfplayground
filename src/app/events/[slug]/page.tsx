import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import { InnerPageHero } from "@/component/landing-main/inner-page-hero";
import Image from "next/image";
import type { Metadata } from "next";
import siteData from "@/data/site-data.json";
import { getEventBySlug } from "@/lib/db";
import { getProxiedImageUrl } from "@/utils/convertDriveImageUrl";

type StaticEvent = {
  slug: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  images: string[];
};
const eventsBySlug = Object.fromEntries(
  (siteData.events as StaticEvent[]).map((e) => [e.slug, e])
);

const HERO_IMAGE = {
  src: "/showcase.jpg",
  alt: "Dimly lit venue — event hero",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const normalizedSlug = resolvedParams.slug.toLowerCase().trim();
  const dbEvent = await getEventBySlug(normalizedSlug);
  const event = dbEvent ?? eventsBySlug[normalizedSlug];

  if (!event) {
    return {
      title: "Event Not Found | SF Playground",
    };
  }

  return {
    title: `${event.title} | SF Playground Events`,
    description: `${event.description} Join us at ${event.location} on ${event.date}.`,
    alternates: {
      canonical: `https://sfplayground.com/events/${normalizedSlug}`,
    },
    openGraph: {
      title: `${event.title} | SF Playground Events`,
      description: event.description,
      url: `https://sfplayground.com/events/${normalizedSlug}`,
      type: "website",
    },
  };
}

export default async function EventGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const normalizedSlug = resolvedParams.slug.toLowerCase().trim();
  const dbEvent = await getEventBySlug(normalizedSlug);
  const staticEvent = (siteData.events as StaticEvent[]).find(
    (e) => e.slug.toLowerCase() === normalizedSlug
  );
  const event = dbEvent
    ? {
        title: dbEvent.title,
        date: dbEvent.date,
        location: dbEvent.location,
        attendees: dbEvent.attendees,
        description: dbEvent.description,
        images: dbEvent.images ?? [],
      }
    : staticEvent
      ? {
          title: staticEvent.title,
          date: staticEvent.date,
          location: staticEvent.location,
          attendees: staticEvent.attendees,
          description: staticEvent.description,
          images: staticEvent.images ?? [],
        }
      : null;

  if (!event) {
    const heroImage = HERO_IMAGE;
    return (
      <div className="relative min-h-screen overflow-x-clip bg-black text-white">
        <Nav />
        <InnerPageHero
          variant="fullscreen"
          background="image"
          image={{ ...heroImage, priority: true }}
        >
          <div className="flex flex-col items-center text-center">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.38em] text-white/45">
              San Francisco · Past Event
            </p>
            <h1 className="mx-auto max-w-5xl font-oswald text-[2.75rem] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.75rem]">
              Event <span className="text-white/80">Not Found</span>
            </h1>
            <Link
              href="/events"
              className="mt-10 inline-flex text-lg text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              ← Back to Events
            </Link>
          </div>
        </InnerPageHero>
        <Footer />
      </div>
    );
  }

  const heroBgSrc = event.images?.[0] ? getProxiedImageUrl(event.images[0], { w: 1200 }) : HERO_IMAGE.src;
  const heroAlt = event.title ? `${event.title} — Event hero` : HERO_IMAGE.alt;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <Nav />
      <InnerPageHero
        variant="fullscreen"
        background="image"
        image={{ src: heroBgSrc, alt: heroAlt, priority: true }}
      >
        <div className="flex flex-col items-center text-center">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.38em] text-white/45">
            San Francisco · Past Event
          </p>
          <h1 className="mx-auto max-w-5xl font-oswald text-[2.75rem] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.75rem]">
            {event.title}
          </h1>
          <p className="mx-auto mt-10 max-w-xl text-pretty text-base leading-relaxed text-white/60 md:text-lg line-clamp-2">
            {event.description}
          </p>
          <div className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
            <span>{event.date}</span>
            <span className="hidden sm:inline">·</span>
            <span>{event.location}</span>
            <span className="hidden sm:inline">·</span>
            <span>{event.attendees} attendees</span>
          </div>
        </div>
      </InnerPageHero>

      <div className="border-t border-white/10 bg-black px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/events"
            className="mb-10 inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>

          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-white/80">
            {event.description}
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {event.images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-white/35"
              >
                <Image
                  src={getProxiedImageUrl(image, { w: 800 })}
                  alt={`${event.title} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
