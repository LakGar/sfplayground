import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import PreviousEvents from "@/components/previous-events";

export const metadata: Metadata = {
  title: "Previous Events | SFPLAYGROUND",
  description:
    "Explore SFPLAYGROUND previous events, summits, pitch nights, and founder rooms across San Francisco and Silicon Valley.",
};

export default function PreviousEventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <main>
        <section className="relative flex min-h-[82vh] items-end overflow-hidden px-4 pb-12 pt-28 text-white md:px-8 md:pb-16 lg:min-h-screen">
          <Image
            src="/images/salesforce-summit/group-overhead.jpg"
            alt="SFPLAYGROUND previous event group photo"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/15"
            aria-hidden
          />

          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-white/75">
                Event archive
              </p>
              <h1 className="font-oswald text-6xl font-bold leading-none tracking-tight md:text-8xl lg:text-[8.5rem]">
                Previous Events
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/78 md:text-lg">
                A living record of the pitch nights, summits, founder rooms,
                investor panels, and high-signal gatherings that shaped the
                SFPLAYGROUND network.
              </p>
            </div>

            <Link
              href="/#upcoming-events-heading"
              className="w-fit rounded-full bg-white px-7 py-3 text-sm font-semibold tracking-wide text-black transition-opacity hover:opacity-85"
            >
              View upcoming events
            </Link>
          </div>
        </section>

        <PreviousEvents heading="All Previous Events" />
      </main>

      <Footer />
    </div>
  );
}
