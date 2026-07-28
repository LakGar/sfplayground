import { PREVIOUS_EVENTS, getEventPublicUrl } from "@/data/previous-events";
import { UPCOMING_EVENTS } from "@/data/upcoming-events";
import { getEvents, type EventRow } from "@/lib/db";

export type PublicUpcomingEvent = {
  time: string;
  title: string;
  location: string;
  hostName: string;
  hostImageUrl: string;
  coverImageUrl: string;
  tags: string[];
  href: string;
};

export type PublicPreviousEvent = {
  slug: string;
  title: string;
  date: string;
  imageUrl: string;
  href: string;
  linkedInHref?: string;
};

function tagsFromDescription(description: string): string[] {
  return description
    .split(/[,|\n]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function eventImage(event: EventRow): string {
  return event.cover_image || event.images[0] || "/images/events/ai-healthtech-summit.png";
}

function toUpcomingEvent(event: EventRow): PublicUpcomingEvent {
  return {
    time: event.time || event.date,
    title: event.title,
    location: event.location,
    hostName: event.organizer || "SFPLAYGROUND",
    hostImageUrl: "/images/logo.png",
    coverImageUrl: eventImage(event),
    tags: tagsFromDescription(event.description),
    href: event.luma_url || "#upcoming-events-heading",
  };
}

function toPreviousEvent(event: EventRow): PublicPreviousEvent {
  return {
    slug: event.slug,
    title: event.title,
    date: event.date,
    imageUrl: eventImage(event),
    href: event.luma_url || "/previous-events",
  };
}

function parseEventDate(value: string | null | undefined): number {
  if (!value) return 0;

  const datePart = value.split("·")[0]?.trim() || value.trim();
  const exactDate = Date.parse(datePart);

  if (!Number.isNaN(exactDate)) {
    return exactDate;
  }

  const yearMatch = datePart.match(/\b(20\d{2})\b/);
  const year = yearMatch ? Number(yearMatch[1]) : 0;

  if (datePart.includes("Spring") && year) {
    return Date.UTC(year, 3, 15);
  }

  const monthMatch = datePart.match(
    /January|February|March|April|May|June|July|August|September|October|November|December/,
  );

  if (monthMatch && year) {
    return Date.parse(`${monthMatch[0]} 1, ${year}`);
  }

  return 0;
}

function isUpcomingByDate(event: EventRow): boolean {
  const eventDate = parseEventDate(event.time || event.date);

  if (!eventDate) {
    return event.status === "upcoming";
  }

  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();

  return eventDate >= todayStart;
}

function eventDedupeKey(item: { slug?: string; title: string; date?: string }): string {
  const normalizedTitle = item.title
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const dateKey = parseEventDate(item.date) || "undated";

  if (normalizedTitle.includes("new-american-dream")) {
    return `${dateKey}:new-american-dream`;
  }

  if (normalizedTitle.includes("immigrant-founders")) {
    return `${dateKey}:immigrant-founders`;
  }

  if (
    normalizedTitle.includes("aerospace") &&
    normalizedTitle.includes("defense")
  ) {
    return `${dateKey}:aerospace-defense`;
  }

  return normalizedTitle;
}

function dedupeEvents<T extends { slug?: string; title: string; date?: string }>(items: T[]): T[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = eventDedupeKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function getPublicEventLists(): Promise<{
  upcoming: PublicUpcomingEvent[];
  previous: PublicPreviousEvent[];
}> {
  try {
    const events = await getEvents();
    const upcoming = events
      .filter(isUpcomingByDate)
      .map(toUpcomingEvent)
      .sort((a, b) => parseEventDate(a.time) - parseEventDate(b.time));
    const previous = dedupeEvents([
      ...PREVIOUS_EVENTS.map((event) => ({
        ...event,
        href: getEventPublicUrl(event),
      })),
      ...events.filter((event) => !isUpcomingByDate(event)).map(toPreviousEvent),
    ]).sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date));

    return {
      upcoming: upcoming.length ? upcoming : UPCOMING_EVENTS,
      previous,
    };
  } catch (error) {
    console.error("Public events fetch error:", error);
    return {
      upcoming: UPCOMING_EVENTS,
      previous: PREVIOUS_EVENTS.map((event) => ({
        ...event,
        href: getEventPublicUrl(event),
      })),
    };
  }
}
