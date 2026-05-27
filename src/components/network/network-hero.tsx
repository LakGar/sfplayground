"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";
import {
  NETWORK_HERO,
  NETWORK_HERO_CAROUSEL,
  NETWORK_HERO_LETTER_IMAGES,
} from "@/data/network-page-data";

const CONTACT_EMAIL = "staff@sfplaygroundai.com";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpTransition = (delay: number) => ({
  delay,
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
});

const CAROUSEL_FRAME =
  "relative h-[42vh] min-h-[240px] w-[160px] shrink-0 overflow-hidden rounded-b-none md:h-[50vh] md:min-h-[300px] md:w-[200px] lg:h-[52vh] lg:min-h-[340px] lg:w-[240px]";

function CarouselHalf({
  src,
  alt,
  side,
}: {
  src: string;
  alt: string;
  side: "left" | "right";
}) {
  const radius = "rounded-tl-[56px] md:rounded-tl-[72px] lg:rounded-tl-[100px]";
  const radiusRight =
    "rounded-tr-[56px] md:rounded-tr-[72px] lg:rounded-tr-[100px]";

  return (
    <div
      className={`${CAROUSEL_FRAME} ${side === "left" ? radius : radiusRight}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 160px, 240px"
        unoptimized
      />
    </div>
  );
}

function CarouselTrack({ trackId }: { trackId: string }) {
  return (
    <div
      className="flex shrink-0 items-end gap-3 px-1 md:gap-4"
      aria-hidden={trackId === "b" ? true : undefined}
    >
      {NETWORK_HERO_CAROUSEL.map((image, i) => (
        <CarouselHalf
          key={`${trackId}-${i}`}
          src={image.src}
          alt={trackId === "a" ? image.alt : ""}
          side={i % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
}

export default function NetworkHero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col overflow-hidden">
      <p
        className="pointer-events-none absolute left-4 top-[28%] z-10 hidden -translate-y-1/2 text-[10px] tracking-[0.35em] text-black/70 [writing-mode:vertical-rl] md:left-8 md:block lg:left-12"
        aria-hidden
      >
        ( NETWORK / SF )
      </p>

      <p
        className="pointer-events-none absolute right-4 top-[32%] z-10 hidden -translate-y-1/2 text-[10px] tracking-[0.35em] text-black/45 [writing-mode:vertical-rl] md:right-8 md:block lg:right-12"
        aria-hidden
      >
        ( JOIN US )
      </p>

      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-20 pt-28 text-center md:px-8 md:pb-12 md:pt-32">
        <motion.p
          className="text-xs font-medium tracking-[0.2em] text-black/40 uppercase"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.2)}
        >
          {NETWORK_HERO.eyebrow}
        </motion.p>

        <h1 className="mt-5 leading-[0.92] md:mt-6">
          <RevealText
            text={NETWORK_HERO.title}
            textColor="text-black"
            letterImages={[...NETWORK_HERO_LETTER_IMAGES]}
            overlayColor="text-red-500"
            fontSize="text-[clamp(3rem,13vw,11rem)]"
            fontClassName="font-oswald font-bold"
            trackingClass="tracking-[-0.04em]"
            letterDelay={0.07}
            overlayDelay={0.05}
            overlayDuration={0.4}
            springDuration={600}
          />
        </h1>

        <motion.p
          className="mt-5 max-w-3xl font-oswald text-[clamp(1rem,2.5vw,1.65rem)] font-medium leading-snug tracking-wide text-black/80 md:mt-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.85)}
        >
          Join a curated room of{" "}
          <i className="text-red-500/60">founders, investors, and operators</i>{" "}
          across San Francisco and Silicon Valley.
        </motion.p>

        <motion.p
          className="mt-3 max-w-2xl text-sm leading-relaxed text-black/55 md:text-base"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.95)}
        >
          {NETWORK_HERO.tagline}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(1.05)}
        >
          <Link
            href={NETWORK_HERO.ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-[#0c1222] px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85 md:text-base"
          >
            {NETWORK_HERO.ctaLabel}
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship%20inquiry`}
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/60 px-8 py-3.5 text-sm font-medium text-black backdrop-blur-sm transition-opacity hover:opacity-85 md:text-base"
          >
            Email the team
          </a>
        </motion.div>
      </div>

      <motion.div
        className="relative w-full"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition(1.15)}
      >
        <div className="overflow-hidden">
          <div className="flex w-max animate-scroll">
            <CarouselTrack trackId="a" />
            <CarouselTrack trackId="b" />
          </div>
        </div>

        <div
          className="absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-[#f3f3f1] via-[#f3f3f1]/80 to-transparent sm:w-24 md:w-32 lg:w-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-[#f3f3f1] via-[#f3f3f1]/80 to-transparent sm:w-24 md:w-32 lg:w-40"
          aria-hidden
        />
      </motion.div>
    </section>
  );
}
