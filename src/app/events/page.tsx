import Link from "next/link";
import Image from "next/image";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import { InnerPageHero } from "@/component/landing-main/inner-page-hero";
import { getEvents } from "@/lib/db";
import siteData from "@/data/site-data.json";
import { getProxiedImageUrl } from "@/utils/convertDriveImageUrl";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Past Events | SF Playground",
  description:
    "Browse past SF Playground events — live pitches, investor panels, and community highlights.",
  alternates: {
    canonical: "https://sfplayground.com/events",
  },
  openGraph: {
    title: "Past Events | SF Playground",
    description:
      "Browse past SF Playground events — live pitches, investor panels, and community highlights.",
    url: "https://sfplayground.com/events",
  },
};

type EventListItem = {
  slug: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  description: string;
  cover: string | null;
};

type StaticEvent = {
  slug: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  description: string;
  coverImage?: string;
  images?: string[];
};

const HERO_IMAGE = {
  src: "/events-bg.jpg",
  alt: "Dimly lit venue — events hero",
} as const;

function staticEventsToList(raw: StaticEvent[]): EventListItem[] {
  return raw.map((e) => {
    const cover =
      e.coverImage ?? (e.images && e.images[0] ? e.images[0] : null);
    return {
      slug: e.slug,
      title: e.title,
      date: e.date,
      location: e.location,
      attendees: e.attendees,
      description: e.description,
      cover,
    };
  });
}

export default async function EventsPage() {
  let events: EventListItem[] = staticEventsToList(
    siteData.events as StaticEvent[],
  );
  try {
    const rows = await getEvents();
    if (rows.length > 0) {
      events = rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        date: r.date,
        location: r.location,
        attendees: r.attendees,
        description: r.description,
        cover: r.cover_image ?? (r.images?.length ? r.images[0] : null) ?? null,
      }));
    }
  } catch {
    // fallback site-data
  }

  const parseEventDate = (dateStr: string) => {
    const ts = Date.parse(dateStr);
    return Number.isFinite(ts) ? ts : -Infinity;
  };

  const sortedEvents = events
    .map((e, idx) => ({ e, idx, ts: parseEventDate(e.date) }))
    .sort((a, b) => b.ts - a.ts || a.idx - b.idx)
    .map(({ e }) => e);

  const featuredEvent = sortedEvents[0] ?? null;
  const remainingEvents = featuredEvent ? sortedEvents.slice(1) : sortedEvents;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <Nav />

      <InnerPageHero
        variant="fullscreen"
        background="image"
        image={{ ...HERO_IMAGE, priority: true }}
      >
        <div className="flex flex-col items-center text-center">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.38em] text-white/45">
            San Francisco · Past Events
          </p>
          <h1 className="mx-auto max-w-5xl font-oswald text-[2.75rem] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.75rem]">
            Past
            <br />
            <span className="text-white/55">Events</span>
          </h1>
          <p className="mx-auto mt-10 max-w-xl text-pretty text-base leading-relaxed text-white/60 md:text-lg">
            Recaps, photos, and highlights from SF Playground pitch nights and
            summits.
          </p>
          <div className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
            <span>Live pitch alumni</span>
            <span className="hidden sm:inline">·</span>
            <span>Gallery recaps</span>
            <span className="hidden sm:inline">·</span>
            <span>Community highlights</span>
          </div>
        </div>
      </InnerPageHero>

      <section className="border-t border-white/10 bg-black px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {sortedEvents.length === 0 ? (
            <p className="py-16 text-center text-lg text-white/55">
              No past events listed yet.
            </p>
          ) : (
            <div className="space-y-12">
              {featuredEvent ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/2">
                  <Link
                    href={`/events/${featuredEvent.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-10/7 w-full">
                      <div className="absolute inset-0 bg-white/5" />
                      {featuredEvent.cover ? (
                        <Image
                          src={getProxiedImageUrl(featuredEvent.cover, {
                            w: 1200,
                          })}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 1200px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-5xl text-white/15">
                          SF
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

                      <div className="absolute inset-x-6 bottom-6">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1 backdrop-blur-sm">
                          <span className="text-xs font-semibold tracking-wide text-white">
                            FEATURED
                          </span>
                          <span className="text-xs text-white/65">
                            Past Event
                          </span>
                        </div>

                        <h2 className="mb-2 font-oswald text-3xl font-semibold tracking-tight text-white md:text-4xl">
                          {featuredEvent.title}
                        </h2>

                        <p className="mb-4 max-w-2xl text-sm text-white/75 md:text-base">
                          {featuredEvent.date}
                          <span className="text-white/40"> · </span>
                          {featuredEvent.location}
                          <span className="text-white/40"> · </span>
                          {featuredEvent.attendees} attendees
                        </p>

                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/70">
                            {featuredEvent.description}
                          </p>
                          <span className="inline-flex items-center text-sm text-white/90 transition-transform group-hover:translate-x-1">
                            View gallery →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : null}

              {remainingEvents.length > 0 ? (
                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {remainingEvents.map((event) => (
                    <li key={event.slug}>
                      <Link
                        href={`/events/${event.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition-colors hover:border-white/35"
                      >
                        <div className="relative aspect-16/10 w-full bg-white/5">
                          {event.cover ? (
                            <Image
                              src={getProxiedImageUrl(event.cover, { w: 800 })}
                              alt=""
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-4xl text-white/15">
                              SF
                            </div>
                          )}
                          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/22 to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <span className="inline-block rounded bg-white/15 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                              PAST EVENT
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-white/90 md:text-3xl">
                            {event.title}
                          </h2>

                          <p className="mb-3 text-sm text-white/70">
                            {event.date}
                            <span className="text-white/40"> · </span>
                            {event.location}
                            <span className="text-white/40"> · </span>
                            {event.attendees} attendees
                          </p>

                          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-white/65">
                            {event.description}
                          </p>

                          <span className="mt-4 inline-flex items-center text-sm text-white/80 transition-transform group-hover:translate-x-1">
                            View gallery →
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
