import Image from "next/image";
import Link from "next/link";
import { UPCOMING_EVENTS } from "@/data/upcoming-events";

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function EventCard({
  time,
  title,
  location,
  hostName,
  hostImageUrl,
  coverImageUrl,
  tags,
  href,
}: (typeof UPCOMING_EVENTS)[number]) {
  const isExternal = href.startsWith("http");

  const card = (
    <article className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_6px_28px_-10px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_10px_36px_-10px_rgba(0,0,0,0.12)] md:gap-5 md:p-5">
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="text-xs text-black/45 md:text-sm">{time}</p>
        <h3 className="mt-1 font-oswald text-lg font-bold leading-snug tracking-tight text-black md:text-xl">
          {title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/55 md:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-black/5">
              <Image
                src={hostImageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="24px"
              />
            </span>
            By {hostName}
          </span>
          <span className="hidden text-black/25 sm:inline" aria-hidden>
            ·
          </span>
          <span className="inline-flex min-w-0 items-start gap-1">
            <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black/40" />
            <span className="leading-snug">{location}</span>
          </span>
        </div>

        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded-full bg-[#e8f5ec] px-2.5 py-0.5 text-[10px] font-medium text-[#1a5c38] md:text-xs">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-neutral-100 md:h-[100px] md:w-[100px]">
        <Image
          src={coverImageUrl}
          alt={`${title} event poster`}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        {card}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      {card}
    </Link>
  );
}

export default function UpcomingEvents() {
  return (
    <section
      className="bg-gradient-to-b from-[#fff] to-[#f3f3f1] px-4 py-16 md:px-8 md:py-24"
      aria-labelledby="upcoming-events-heading"
    >
      <div className="mx-auto w-full max-w-3xl">
        <h2
          id="upcoming-events-heading"
          className="text-center font-oswald text-4xl font-bold tracking-tight text-black md:text-5xl"
        >
          Upcoming Events
        </h2>

        <div className="mt-10 flex flex-col gap-4 md:mt-12 md:gap-5">
          {UPCOMING_EVENTS.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
