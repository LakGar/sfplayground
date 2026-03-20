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
    return (
      <div className="relative min-h-screen overflow-x-clip bg-black text-white">
        <Nav />
        <InnerPageHero className="min-h-[420px]">
          <h1 className="mb-6 font-oswald text-4xl text-white md:text-5xl lg:text-6xl">
            Event <span className="text-white/80">Not Found</span>
          </h1>
          <Link
            href="/events"
            className="inline-flex text-lg text-white/90 underline-offset-4 hover:text-white hover:underline"
          >
            ← Back to Events
          </Link>
        </InnerPageHero>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <Nav />
      <InnerPageHero className="min-h-[420px] md:min-h-[480px]">
        <div className="mb-4">
          <span className="inline-block rounded bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            PAST EVENT
          </span>
        </div>
        <h1 className="mb-4 font-oswald text-4xl text-white md:text-5xl lg:text-7xl">
          {event.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-white/75 md:text-lg">
          <span>{event.date}</span>
          <span className="text-white/40">•</span>
          <span>{event.location}</span>
          <span className="text-white/40">•</span>
          <span>{event.attendees} attendees</span>
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
