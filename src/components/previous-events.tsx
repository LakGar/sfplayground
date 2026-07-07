"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getEventPublicUrl, PREVIOUS_EVENTS } from "@/data/previous-events";

function eventImageSrc(url: string) {
  if (url.startsWith("http")) {
    return `/api/image?url=${encodeURIComponent(url)}`;
  }
  return url;
}

function EventCard(event: (typeof PREVIOUS_EVENTS)[number]) {
  const { title, date, imageUrl } = event;
  const outboundUrl = getEventPublicUrl(event);
  const src = eventImageSrc(imageUrl);
  const isRemote = imageUrl.startsWith("http");

  return (
    <a
      href={outboundUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-[1.75rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:rounded-[2rem]"
    >
      <article className="relative aspect-[4/5] w-full overflow-hidden rounded-[inherit] bg-neutral-100 md:aspect-[3/4] md:min-h-[58vh] lg:min-h-[62vh]">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized={isRemote}
        />
        <div
          className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 via-black/20 to-transparent px-6 pb-6 pt-16 md:px-8 md:pb-8 md:pt-20">
          {date ? <p className="text-sm text-white/75">{date}</p> : null}
          <h3
            className={`font-oswald text-2xl font-bold leading-tight tracking-tight text-white md:text-[1.75rem] lg:text-3xl ${date ? "mt-1" : ""}`}
          >
            {title}
          </h3>
        </div>
      </article>
    </a>
  );
}

function AnimatedEventCard({
  index,
  ...event
}: (typeof PREVIOUS_EVENTS)[number] & { index: number }) {
  const reduceMotion = useReducedMotion();
  const isLeftColumn = index % 2 === 0;
  const hiddenY = isLeftColumn ? 40 : -40;

  if (reduceMotion) {
    return <EventCard {...event} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: hiddenY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <EventCard {...event} />
    </motion.div>
  );
}

function SectionHeader({ title }: { title: string }) {
  const reduceMotion = useReducedMotion();
  const heading = (
    <h2
      id="previous-events-heading"
      className="font-oswald text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-6xl"
    >
      {title}
    </h2>
  );

  if (reduceMotion) {
    return <div className="mb-10 md:mb-14">{heading}</div>;
  }

  return (
    <motion.div
      className="mb-10 md:mb-14"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {heading}
    </motion.div>
  );
}

type PreviousEventsProps = {
  heading?: string;
  limit?: number;
  showViewAll?: boolean;
};

export default function PreviousEvents({
  heading = "Previous Events",
  limit,
  showViewAll = false,
}: PreviousEventsProps) {
  const events =
    typeof limit === "number" ? PREVIOUS_EVENTS.slice(0, limit) : PREVIOUS_EVENTS;

  return (
    <section
      className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-28"
      aria-labelledby="previous-events-heading"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeader title={heading} />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-5 lg:gap-6">
          {events.map((event, index) => (
            <AnimatedEventCard key={event.slug} index={index} {...event} />
          ))}
        </div>

        {showViewAll ? (
          <div className="mt-10 flex justify-center md:mt-14">
            <Link
              href="/previous-events"
              className="rounded-full bg-black px-7 py-3 text-sm font-semibold tracking-wide text-white transition-opacity hover:opacity-80"
            >
              View all previous events
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
