import Link from "next/link";
import Image from "next/image";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import { InnerPageHero } from "@/component/landing-main/inner-page-hero";
import { getEvents } from "@/lib/db";
import siteData from "@/data/site-data.json";
import { convertGoogleDriveImageUrl } from "@/utils/convertDriveImageUrl";
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
    siteData.events as StaticEvent[]
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
        cover:
          r.cover_image ??
          (r.images?.length ? r.images[0] : null) ??
          null,
      }));
    }
  } catch {
    // fallback site-data
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <Nav />

      <InnerPageHero className="min-h-[500px] md:min-h-[520px]">
        <h1 className="mb-6 font-oswald text-5xl text-white md:text-6xl lg:text-7xl">
          Past <span className="text-white/85">Events</span>
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-white/75 md:text-2xl">
          Recaps, photos, and highlights from SF Playground pitch nights and
          summits.
        </p>
      </InnerPageHero>

      <section className="border-t border-white/10 bg-black px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {events.length === 0 ? (
            <p className="py-16 text-center text-lg text-white/55">
              No past events listed yet.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <li key={event.slug}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-white/35"
                  >
                    <div className="relative aspect-[16/10] w-full bg-white/5">
                      {event.cover ? (
                        <Image
                          src={convertGoogleDriveImageUrl(event.cover)}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized={event.cover.includes(
                            "drive.google.com"
                          )}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-4xl text-white/15">
                          SF
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/22 to-transparent" />
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
