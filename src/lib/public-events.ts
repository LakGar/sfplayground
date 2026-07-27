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

export async function getPublicEventLists(): Promise<{
  upcoming: PublicUpcomingEvent[];
  previous: PublicPreviousEvent[];
}> {
  try {
    const events = await getEvents();
    const upcoming = events
      .filter((event) => event.status === "upcoming")
      .map(toUpcomingEvent);
    const previous = events
      .filter((event) => event.status !== "upcoming")
      .map(toPreviousEvent);

    return {
      upcoming: upcoming.length ? upcoming : UPCOMING_EVENTS,
      previous: previous.length
        ? previous
        : PREVIOUS_EVENTS.map((event) => ({
            ...event,
            href: getEventPublicUrl(event),
          })),
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
