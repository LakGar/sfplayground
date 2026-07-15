"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import PartnerMarquee from "@/components/partner-marquee";
import SponsorPartnerMasonry from "@/components/sponsors/sponsor-partner-masonry";
import SponsorHero from "@/components/sponsors/sponsor-hero";
import { FadeInView } from "@/components/ui/fade-in-view";
import { StatsGrid } from "@/components/ui/stats-grid";
import {
  SPONSOR_AUDIENCE,
  SPONSOR_DELIVERABLES,
  SPONSOR_FAQ,
  SPONSOR_PAGE_SHELL,
  SPONSOR_STATS,
  SPONSORSHIP_ADDONS,
  SPONSORSHIP_TIERS,
} from "@/data/sponsors-page-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const CONTACT_EMAIL = "staff@sfplaygroundai.com";
const MAIN_SPONSORSHIP_TIERS = SPONSORSHIP_TIERS.slice(0, 4);

function SponsorDeliverables() {
  const accentDots = [
    "bg-[#2457ff]",
    "bg-[#00a676]",
    "bg-[#ff7a1a]",
    "bg-[#8b5cf6]",
  ];

  return (
    <section className="px-4 py-16 text-black md:px-8 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px]">
        <FadeInView direction="up">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
                Sponsors Benefits
              </p>
              <h2 className="mt-6 max-w-4xl text-[clamp(2.25rem,5vw,4.65rem)] font-bold leading-[1.03] tracking-tight text-black">
                Sponsor Value Beyond Logo Placement
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-black/65 md:text-xl">
                SFPLAYGROUND gives sponsors relationship-driven access to
                founders, investors, family offices, attorneys, universities,
                and ecosystem leaders.
              </p>
            </div>

            <div className="grid gap-5">
              {SPONSOR_DELIVERABLES.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="grid gap-4 border-t border-black/10 py-5 sm:grid-cols-[220px_1fr] md:py-6"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.65,
                    ease: EASE,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-1 h-4 w-4 shrink-0 rounded-full ${accentDots[index % accentDots.length]}`}
                      aria-hidden
                    />
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-black/62 md:text-lg">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </FadeInView>

        <FadeInView direction="up">
          <div className="mt-10 grid gap-3 rounded-[28px] border-black/10 bg-white/70 p-4 text-black shadow-[0_28px_90px_-60px_rgba(0,0,0,0.18)] md:mt-14 md:grid-cols-3 md:gap-4 md:p-5">
            {SPONSOR_AUDIENCE.map((item) => (
              <article
                key={item.label}
                className="rounded-[22px] bg-neutral-100 p-5"
              >
                <p className="text-2xl font-bold tracking-tight">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

function SponsorPackageStack() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-5 lg:hidden">
        {MAIN_SPONSORSHIP_TIERS.map((tier) => (
          <PackageCard key={tier.name} tier={tier} />
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="relative pb-20">
          {MAIN_SPONSORSHIP_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              className="sticky mb-8"
              style={{
                top: `calc(6rem + ${index * 1.15}rem)`,
                zIndex: index + 1,
              }}
              initial={reduceMotion ? false : { opacity: 0.96, y: 44 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <PackageCard tier={tier} index={index} large />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackageCard({
  tier,
  index = 0,
  large = false,
  total = MAIN_SPONSORSHIP_TIERS.length,
}: {
  tier: (typeof SPONSORSHIP_TIERS)[number];
  index?: number;
  large?: boolean;
  total?: number;
}) {
  const isFeatured = tier.featured;
  const hasShadow = index === total - 1;

  return (
    <article
      className={`relative min-h-[560px] overflow-hidden rounded-[28px] border p-6 md:p-8 ${
        hasShadow ? "shadow-[0_18px_54px_-36px_rgba(0,0,0,0.42)]" : ""
      } ${
        large ? "h-[calc(100vh-7.5rem)] min-h-[560px] max-h-[720px]" : ""
      } ${
        isFeatured
          ? "border-black bg-black text-white"
          : "border-black/10 bg-white text-black"
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full blur-3xl ${
          isFeatured ? "bg-white/6" : "bg-neutral-100"
        }`}
        aria-hidden
      />

      <div className="relative grid h-full gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="flex justify-end">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isFeatured
                    ? "bg-white/12 text-white"
                    : "bg-black/8 text-black"
                }`}
              >
                {tier.investment}
              </span>
            </div>

            <h3 className="mt-4 font-oswald text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[0.98] tracking-tight">
              {tier.name}
            </h3>
            <p
              className={`mt-4 max-w-md text-sm leading-relaxed md:text-base ${
                isFeatured ? "text-white/70" : "text-black/62"
              }`}
            >
              {tier.description}
            </p>
          </div>

          <Link
            href="/sponsors/apply"
            className={`inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85 ${
              isFeatured ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Start inquiry
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        <div
          className={`rounded-[1.35rem] p-4 md:p-5 ${
            isFeatured ? "bg-white/8" : "bg-black/5"
          }`}
        >
          <p
            className={`text-sm font-medium ${
              isFeatured ? "text-white/52" : "text-black/45"
            }`}
          >
            What&apos;s included
          </p>

          <ul className="mt-4 grid gap-2 lg:grid-cols-2">
            {tier.highlights.map((item, highlightIndex) => (
              <li
                key={item}
                className={`flex gap-2.5 rounded-2xl p-3 text-[0.78rem] leading-snug md:text-[0.82rem] ${
                  isFeatured
                    ? "bg-white/8 text-white/82"
                    : "bg-white text-black/72"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    isFeatured
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {highlightIndex + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {large ? (
        <div
          className={`absolute bottom-6 right-7 font-oswald text-7xl font-bold leading-none ${
            isFeatured ? "text-white/6" : "text-black/5"
          }`}
          aria-hidden
        >
          0{index + 1}
        </div>
      ) : null}
    </article>
  );
}

function SponsorAddons() {
  return (
    <div className="mt-16 border-t border-black/10 pt-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
            Add-ons
          </p>
          <h3 className="mt-3 font-oswald text-3xl font-bold tracking-tight text-black md:text-4xl">
            Additional options
          </h3>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-black/60 md:text-base">
          Layer on attendee access, signage, amplification, and custom
          sponsorships. Contact us with a specific budget and we&apos;ll shape
          a package.
        </p>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {SPONSORSHIP_ADDONS.map((addon) => (
          <li
            key={addon.name}
            className="rounded-[22px] border border-black/10 bg-white/70 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h4 className="font-oswald text-xl font-bold tracking-tight text-black">
                {addon.name}
              </h4>
              <span className="rounded-full bg-black/8 px-3 py-1 text-xs font-semibold text-black">
                {addon.price}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-black/62">
              {addon.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="border-b border-black/10"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.05, duration: 0.65, ease: EASE }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="group flex w-full items-start justify-between gap-6 py-5 text-left md:py-6"
      >
        <span className="text-base font-medium leading-snug text-black/90 transition-colors group-hover:text-black md:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-0.5 shrink-0 text-black/35"
          aria-hidden
        >
          <ChevronDown className="h-5 w-5 stroke-[1.75]" />
        </motion.span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-5 text-sm leading-relaxed text-black/60 md:pb-6 md:text-[0.95rem] md:leading-7">
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function SponsorsPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className={SPONSOR_PAGE_SHELL}>
      <Nav />

      <SponsorHero />

      <PartnerMarquee className="bg-transparent" />

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-[1400px]">
          <StatsGrid
            stats={SPONSOR_STATS}
            itemClassName="px-1 py-6 md:py-8"
            valueClassName="font-oswald text-[clamp(4rem,10vw,7.5rem)] font-bold leading-none tracking-tight text-black"
            labelClassName="mt-3 max-w-[18rem] text-sm leading-relaxed text-black/62 md:text-base"
          />
        </div>
      </section>

      <SponsorDeliverables />

      <SponsorPartnerMasonry />

      {/* Tiers */}
      <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <FadeInView direction="up">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
                  Visa 2 Venture
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-6xl">
                  Sponsorship tiers
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-black/60 md:text-base">
                Official Visa 2 Venture packages from our sponsorship brief.
                Every partnership can be customized — reach out to shape
                deliverables around your goals.
              </p>
            </div>

            <SponsorPackageStack />
            <SponsorAddons />
          </div>
        </FadeInView>
      </section>

      {/* Apply CTA — replaces long inline form */}
      <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <FadeInView direction="up">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="relative isolate min-h-[520px] overflow-hidden rounded-[28px] border border-white/20 bg-black shadow-[0_34px_120px_-70px_rgba(0,0,0,0.65)] md:min-h-[570px]">
              <Image
                src="/images/skyline.png"
                alt=""
                fill
                sizes="(min-width: 768px) 1400px, 100vw"
                className="object-cover opacity-88"
                priority={false}
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,18,0.32),rgba(12,12,18,0.74)),radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.16),transparent_38%),linear-gradient(90deg,rgba(24,93,255,0.22),transparent_24%,transparent_76%,rgba(24,93,255,0.22))]"
                aria-hidden
              />
              <motion.div
                className="absolute top-1/2 right-5 hidden h-px w-24 bg-cyan-300/80 md:block"
                aria-hidden
                animate={
                  reduceMotion
                    ? undefined
                    : { x: [0, -18, 0], opacity: [0.55, 1, 0.55] }
                }
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-[58%] left-5 hidden h-px w-20 bg-cyan-300/70 md:block"
                aria-hidden
                animate={
                  reduceMotion
                    ? undefined
                    : { x: [0, 16, 0], opacity: [0.45, 0.9, 0.45] }
                }
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10 flex min-h-[520px] items-center justify-center px-6 py-16 text-center text-white md:min-h-[570px] md:px-12">
                <div className="mx-auto max-w-3xl">
                  <p className="text-xs font-semibold tracking-[0.24em] text-white/62 uppercase">
                    2-minute inquiry
                  </p>
                  <h2 className="mt-5 text-[clamp(2.45rem,5.2vw,5.75rem)] font-light leading-[0.98] tracking-[-0.02em] text-white">
                    Ready to Partner with SFPLAYGROUND?
                  </h2>
                  <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/78 md:text-xl">
                    Tell us your goals, budget, and ideal audience. Our team
                    follows up personally to shape a sponsorship that fits.
                  </p>
                  <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                      href="/sponsors/apply"
                      className="inline-flex rounded-full bg-white px-9 py-4 text-sm font-semibold text-[#1573ff] shadow-[0_18px_50px_-24px_rgba(255,255,255,0.9)] transition-transform hover:-translate-y-0.5 hover:bg-white/92"
                    >
                      Start inquiry
                    </Link>
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship%20inquiry`}
                      className="inline-flex rounded-full border border-white/24 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/14"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12 lg:gap-20">
          <FadeInView direction="up">
            <h2 className="text-5xl font-bold tracking-tight text-black md:text-6xl lg:text-7xl">
              FAQ.
            </h2>
          </FadeInView>

          <div className="border-t border-black/10">
            {SPONSOR_FAQ.map((item, index) => (
              <FaqItem
                key={item.question}
                index={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFaq === index}
                onToggle={() =>
                  setOpenFaq((current) => (current === index ? -1 : index))
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-16 md:px-8 md:py-20">
        <FadeInView direction="up">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
                See what our events feel like.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/62 md:text-base">
                Browse past programs, upcoming events, and the community we
                bring together across San Francisco and Silicon Valley.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.instagram.com/sfplayground/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              >
                View events
              </Link>
              <Link
                href="/"
                className="inline-flex rounded-full border border-black/15 bg-white/70 px-8 py-3.5 text-sm font-semibold text-black backdrop-blur-sm transition-opacity hover:opacity-85"
              >
                Back to home
              </Link>
            </div>
          </div>
        </FadeInView>
      </section>

      <Footer />
    </div>
  );
}
