"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import { InnerPageHero } from "@/component/landing-main/inner-page-hero";
import { ArrowUpRight } from "lucide-react";

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2400&auto=format&fit=crop",
  alt: "Dimly lit conference hall with stage lighting and audience seating",
} as const;

const sequence = [
  {
    n: "01",
    title: "Apply",
    body: "We review every team for fit and signal density. The room only works when the floor is curated—not flooded.",
  },
  {
    n: "02",
    title: "Demo live",
    body: "Founders show hardware and product in front of builders and investors. The audience votes before capital leans in.",
  },
  {
    n: "03",
    title: "Leave with traction",
    body: "Feedback is immediate. Intros are real. Some teams leave with term-sheet energy; everyone leaves with clarity.",
  },
] as const;

const principles = [
  {
    title: "Decisions over decks",
    body: "PDFs do not move the same way live demos do. We bias toward people who can show, not only tell.",
  },
  {
    title: "Rooms that compound trust",
    body: "A pitch is a moment; the network is the asset. We design evenings where reputations stack across events.",
  },
  {
    title: "Capital follows signal",
    body: "Investors here are active—not panel props. Questions are sharp because the floor already filtered curiosity.",
  },
  {
    title: "SF, physical-first",
    body: "We are rooted in Bay Area density—where robotics, AI, and hardware teams still want bodies in the room.",
  },
] as const;

const offerings = [
  {
    kicker: "Nights",
    title: "Pitch & playoff formats",
    body: "Structured run-of-show: demos, crowd voting, and finalist blocks where the stakes are obvious.",
  },
  {
    kicker: "Access",
    title: "Investor-grade intros",
    body: "Operators and VCs who deploy show up to discover—not to be pitched into a spam folder.",
  },
  {
    kicker: "Archive",
    title: "Winner spotlights",
    body: "Portfolio pages and recaps so the community can track who broke out from the floor.",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

function useAboutVariants() {
  const reduce = useReducedMotion();
  const dur = reduce ? 0 : 0.52;
  const y = reduce ? 0 : 18;

  const heroContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.18,
      },
    },
  };

  const heroItem: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease },
    },
  };

  const fadeUp = (delay = 0) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: dur, delay: reduce ? 0 : delay, ease },
    viewport: { once: true, margin: "-64px" as const, amount: 0.2 },
  });

  const fadeIn = (delay = 0) => ({
    initial: reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.985 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease },
    viewport: { once: true, margin: "-48px" as const, amount: 0.15 },
  });

  return { heroContainer, heroItem, fadeUp, fadeIn, reduce, dur };
}

export default function AboutView() {
  const { heroContainer, heroItem, fadeUp, fadeIn, reduce } =
    useAboutVariants();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.45, ease }}
      >
        <Nav />
      </motion.div>

      <InnerPageHero
        variant="fullscreen"
        background="image"
        image={{ ...HERO_IMAGE, priority: true }}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={heroItem}
            className="mb-6 text-[10px] font-semibold uppercase tracking-[0.38em] text-white/45"
          >
            San Francisco · Live demos
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mx-auto max-w-5xl font-oswald text-[2.75rem] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.75rem]"
          >
            We run rooms
            <br />
            <span className="text-white/55">where capital</span>
            <br />
            pays attention.
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mx-auto mt-10 max-w-xl text-pretty text-base leading-relaxed text-white/60 md:text-lg"
          >
            SF Playground is an event-native platform—crowd signal first, pitch
            second, intros third. Built for founders who ship in the physical
            world.
          </motion.p>
          <motion.div
            variants={heroItem}
            className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35"
          >
            <span>Frontier Tower</span>
            <span className="hidden sm:inline">·</span>
            <span>Bay Area builders</span>
            <span className="hidden sm:inline">·</span>
            <span>Est. community series</span>
          </motion.div>
        </motion.div>
      </InnerPageHero>

      {/* —— Editorial thesis + frame —— */}
      <section className="relative bg-neutral-950">
        <div className="landing-grain relative">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-12">
              <motion.div className="lg:col-span-6 lg:pt-6" {...fadeUp(0)}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                  Thesis
                </p>
                <p className="mt-8 font-oswald text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-white md:text-4xl lg:text-[2.65rem]">
                  Most pitch infrastructure optimizes for volume.
                  <span className="text-white/45">
                    {" "}
                    We optimize for density—of feedback, scrutiny, and
                    follow-up.
                  </span>
                </p>
                <blockquote className="mt-12 border-l border-white/20 pl-6">
                  <p className="text-sm italic leading-relaxed text-white/55 md:text-base">
                    &ldquo;A great meeting isn&apos;t someone liking your
                    deck—it&apos;s someone remembering your demo three weeks
                    later.&rdquo;
                  </p>
                </blockquote>
              </motion.div>
              <motion.div className="relative lg:col-span-6" {...fadeUp(0.08)}>
                <div className="absolute -inset-3 -z-10 border border-white/[0.06] bg-white/[0.02] md:-inset-4" />
                <motion.div
                  className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]"
                  {...fadeIn(0.05)}
                >
                  <Image
                    src="/about.JPG"
                    alt="Founders collaborating before a live event"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/18" />
                </motion.div>
                <p className="mt-4 text-right text-[10px] uppercase tracking-[0.28em] text-white/35">
                  Photo · pre-pitch floor
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* —— Sequence: vertical rail —— */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
          <motion.div
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            {...fadeUp(0)}
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                Sequence
              </p>
              <h2 className="mt-4 font-oswald text-4xl font-bold tracking-[-0.02em] md:text-5xl">
                How a night runs
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/50 md:text-right">
              Three beats—curate, show, compound. No filler keynotes. The event
              is the product.
            </p>
          </motion.div>

          <div className="relative mt-16 md:mt-20">
            <div
              className="absolute top-0 hidden h-full w-px bg-black md:block md:left-5 lg:left-6"
              aria-hidden
            />
            <ul className="flex flex-col gap-0">
              {sequence.map((step, i) => (
                <motion.li
                  key={step.n}
                  className="relative      border-white/[0.07] py-12 md:grid md:grid-cols-12 md:gap-8 md:py-14 lg:gap-10"
                  {...fadeUp(0.06 * i)}
                >
                  <div className="md:col-span-3 md:flex md:justify-start">
                    <span className="font-oswald text-5xl font-light tabular-nums leading-none text-white/15 md:text-6xl">
                      {step.n}
                    </span>
                  </div>
                  <div className="mt-6 md:col-span-9 md:mt-0">
                    <h3 className="font-oswald text-2xl font-semibold tracking-wide text-white md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-white/65">
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* —— Principles: table-like rows —— */}
      <section className="relative bg-[#e8e6e1] text-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24 lg:px-8">
          <motion.div className="max-w-2xl" {...fadeUp(0)}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
              Non-negotiables
            </p>
            <h2 className="mt-4 font-oswald text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl">
              What we refuse to compromise
            </h2>
          </motion.div>
          <div className="mt-14 divide-y divide-neutral-900/10     ">
            {principles.map((row, i) => (
              <motion.div
                key={row.title}
                className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12 lg:gap-12"
                {...fadeUp(0.05 * i)}
              >
                <div className="md:col-span-5">
                  <h3 className="font-oswald text-xl font-semibold tracking-wide text-neutral-900 md:text-2xl">
                    {row.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="max-w-xl text-pretty leading-relaxed text-neutral-600">
                    {row.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* —— In the room: alternating editorial strips —— */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
          <motion.div
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
            {...fadeUp(0)}
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                Capabilities
              </p>
              <h2 className="mt-4 max-w-[16ch] font-oswald text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:max-w-[20ch] md:text-5xl lg:text-[3.25rem]">
                What you get when you&apos;re in the room
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-white/50 lg:max-w-sm lg:text-right">
              Not a swag bag—structure, access, and receipts that only matter
              when the room is full and the demo is live.
            </p>
          </motion.div>

          <div className="mt-14 md:mt-20">
            {offerings.map((item, i) => {
              const flip = i % 2 === 1;
              return (
                <motion.article
                  key={item.title}
                  className="     py-12 md:py-16 lg:py-20"
                  {...fadeUp(0.07 * i)}
                >
                  <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
                    <div
                      className={
                        flip
                          ? "lg:order-2 lg:col-span-4 lg:col-start-9"
                          : "lg:col-span-4"
                      }
                    >
                      <p className="font-oswald text-5xl font-light leading-none tabular-nums text-white/12 md:text-6xl lg:text-7xl">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">
                        {item.kicker}
                      </p>
                    </div>
                    <div
                      className={
                        flip
                          ? "lg:order-1 lg:col-span-7 lg:col-start-1"
                          : "lg:col-span-7 lg:col-start-6"
                      }
                    >
                      <h3 className="font-oswald text-2xl font-semibold tracking-wide text-white md:text-[1.85rem]">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/58">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            className="mt-4 flex flex-col gap-8     pt-12 md:flex-row md:items-center md:justify-between md:gap-12 md:pt-14"
            {...fadeUp(0)}
          >
            <p className="max-w-lg text-pretty text-sm leading-relaxed text-white/48">
              Want to see format, crowd density, and photo floors from recent
              nights?
            </p>
            <Link
              href="/events"
              className="group inline-flex shrink-0 items-center gap-2 self-start border-b border-white/35 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-white md:self-auto"
            >
              Browse events
              <ArrowUpRight className="h-3.5 w-3.5 opacity-75 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <motion.div {...fadeUp(0)} className="will-change-auto">
        <Footer />
      </motion.div>
    </div>
  );
}
