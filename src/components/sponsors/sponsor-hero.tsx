"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";
import {
  SPONSOR_HERO,
  SPONSOR_HERO_LETTER_IMAGES,
} from "@/data/sponsors-page-data";

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

export default function SponsorHero() {
  return (
    <section
      id="sponsor-hero"
      className="relative flex min-h-[78vh] flex-col overflow-hidden bg-white text-black"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.04),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pb-20 pt-28 text-center md:px-8 md:pb-16 md:pt-32">
        <h1 className="flex w-full justify-center leading-[0.92]">
          <RevealText
            text={SPONSOR_HERO.title}
            textColor="text-black"
            letterImages={[...SPONSOR_HERO_LETTER_IMAGES]}
            overlayColor="text-black/90"
            fontSize="text-[clamp(2.65rem,9.6vw,8.75rem)]"
            fontClassName="font-oswald font-bold"
            trackingClass="tracking-[-0.02em]"
            letterDelay={0.07}
            overlayDelay={0.05}
            overlayDuration={0.4}
            springDuration={600}
          />
        </h1>

        <motion.p
          className="mt-5 max-w-3xl text-[clamp(1.25rem,2.8vw,2.25rem)] font-medium leading-[1.18] tracking-tight text-black md:mt-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.55)}
        >
          Connect with <strong>startups</strong>, <strong>investors</strong>,
          and <strong>customers</strong> through live experiences designed for
          stronger signal.
        </motion.p>

        <motion.p
          className="mt-5 max-w-2xl text-sm leading-relaxed text-black/62 md:text-lg"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.65)}
        >
          {SPONSOR_HERO.tagline}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.75)}
        >
          <Link
            href={SPONSOR_HERO.ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-85 md:text-base"
          >
            {SPONSOR_HERO.ctaLabel}
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship%20inquiry`}
            className="inline-flex items-center justify-center rounded-full border border-black/20 px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white md:text-base"
          >
            Email the team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
