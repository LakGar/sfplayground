import Image from "next/image";
import { MapPin } from "lucide-react";
import React from "react";

export type UpcomingEventHost = {
  name: string;
  /** Profile photo or square org logo */
  imageUrl?: string;
};

export type UpcomingEventCard = {
  time: string;
  title: string;
  location: string;
  /** Full URL to the Luma event listing */
  lumaUrl: string;
  coverImageUrl: string;
  coverImageAlt?: string;
  hosts: UpcomingEventHost[];
  tags?: string[];
  /** Shown as a small badge (e.g. Waitlist) */
  statusLabel?: string;
};

function HostStack({ hosts }: { hosts: UpcomingEventHost[] }) {
  const visible = hosts.slice(0, 4);
  return (
    <div className="flex shrink-0 items-center">
      {visible.map((h, i) => (
        <div
          key={`${h.name}-${i}`}
          className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-zinc-100 shadow-sm"
          style={{ marginLeft: i === 0 ? 0 : -10, zIndex: visible.length - i }}
        >
          {h.imageUrl ? (
            <Image
              src={h.imageUrl}
              alt=""
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-zinc-700">
              {h.name.slice(0, 1).toUpperCase()}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function EventCard(event: UpcomingEventCard) {
  const byLine = `By ${event.hosts.map((h) => h.name).join(", ")}`;
  const tags = event.tags ?? [];

  return (
    <a
      href={event.lumaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full max-w-3xl flex-col gap-5 rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-md shadow-zinc-200/50 transition hover:border-zinc-300 hover:shadow-lg md:flex-row md:items-stretch md:gap-6 md:p-6"
    >
      <div className="order-2 flex min-w-0 flex-1 flex-col gap-3 md:order-1">
        <p className="text-base text-zinc-500">{event.time}</p>
        <h3 className="text-balance text-2xl font-semibold leading-tight text-zinc-900 md:text-3xl">
          {event.title}
        </h3>

        <div className="flex min-w-0 items-center gap-2">
          <HostStack hosts={event.hosts} />
          <p className="min-w-0 truncate text-sm text-zinc-600" title={byLine}>
            {byLine}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-zinc-600">
          <MapPin className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
          <span>{event.location}</span>
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200/80"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {event.statusLabel ? (
          <div>
            <span className="inline-block rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-sky-800 ring-1 ring-sky-200/90">
              {event.statusLabel}
            </span>
          </div>
        ) : null}
      </div>

      <div className="relative order-1 aspect-square w-full shrink-0 overflow-hidden rounded-xl ring-1 ring-zinc-200 md:order-2 md:w-44 lg:w-52">
        <Image
          src={event.coverImageUrl}
          alt={event.coverImageAlt ?? event.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 208px"
        />
      </div>
    </a>
  );
}

type UpcomingEventProps = {
  events: UpcomingEventCard[];
};

const UpcomingEvent = ({ events }: UpcomingEventProps) => {
  if (!events.length) return null;

  return (
    <section className="my-20 flex flex-col items-center gap-6 bg-zinc-50/80 px-4 py-10">
      <h2 className="mb-2 text-center text-5xl font-semibold text-zinc-900 transition-all duration-700">
        {events.length > 1 ? "Upcoming Events" : "Upcoming Event"}
      </h2>
      <div className="flex w-full flex-col items-center gap-6">
        {events.map((event, i) => (
          <EventCard key={`${event.title}-${i}`} {...event} />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvent;
