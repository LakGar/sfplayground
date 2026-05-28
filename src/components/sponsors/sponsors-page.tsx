"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
  SPONSOR_FAQ,
  SPONSOR_PAGE_SHELL,
  SPONSOR_STATS,
  SPONSORSHIP_TIERS,
} from "@/data/sponsors-page-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const CONTACT_EMAIL = "staff@sfplaygroundai.com";

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
      className="border-b border-black/8"
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
          <p className="max-w-2xl pb-5 text-sm leading-relaxed text-black/55 md:pb-6 md:text-[0.95rem] md:leading-7">
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function SponsorsPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className={SPONSOR_PAGE_SHELL}>
      <Nav />

      <SponsorHero />

      <PartnerMarquee className="bg-transparent" />

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-[1400px]">
          <StatsGrid
            stats={SPONSOR_STATS}
            itemClassName="rounded-[1.5rem] bg-white/50 px-6 py-8 backdrop-blur-sm md:px-7"
          />
        </div>
      </section>

      <SponsorPartnerMasonry />

      {/* Tiers */}
      <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <FadeInView direction="up">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
                  Packages
                </p>
                <h2 className="mt-4 font-oswald text-4xl font-bold tracking-tight text-black md:text-5xl">
                  Sponsorship formats
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-black/55 md:text-base">
                Every partnership is custom-built. These tiers are starting
                points — we&apos;ll shape deliverables around your goals.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
              {SPONSORSHIP_TIERS.map((tier) => (
                <article
                  key={tier.name}
                  className={`flex flex-col rounded-[1.75rem] border p-7 backdrop-blur-sm md:p-8 ${
                    tier.featured
                      ? "border-black bg-[#0c1222] text-white shadow-[0_20px_60px_-20px_rgba(12,18,34,0.45)]"
                      : "border-black/6 bg-white/60"
                  }`}
                >
                  <h3 className="font-oswald text-2xl font-bold tracking-tight md:text-3xl">
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed md:text-base ${
                      tier.featured ? "text-white/70" : "text-black/60"
                    }`}
                  >
                    {tier.description}
                  </p>
                  <ul className="mt-8 flex flex-1 flex-col gap-3">
                    {tier.highlights.map((item) => (
                      <li
                        key={item}
                        className={`flex gap-3 text-sm leading-relaxed md:text-[0.9375rem] ${
                          tier.featured ? "text-white/85" : "text-black/75"
                        }`}
                      >
                        <span
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                            tier.featured ? "bg-white" : "bg-black"
                          }`}
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sponsors/apply"
                    className={`mt-8 inline-flex w-fit rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85 ${
                      tier.featured
                        ? "bg-white text-black"
                        : "bg-[#0c1222] text-white"
                    }`}
                  >
                    Inquire
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </FadeInView>
      </section>

      {/* Apply CTA — replaces long inline form */}
      <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <FadeInView direction="up">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="overflow-hidden rounded-[2rem]  p-8 backdrop-blur-md md:p-12 lg:flex lg:items-center lg:justify-between lg:gap-16 lg:p-14">
              <div className="max-w-xl">
                <p className="text-sm text-black/45">2-minute inquiry</p>
                <h2 className="mt-4 font-oswald text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-black">
                  Ready to partner? Start the short questionnaire.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-black/60">
                  One question at a time — company details, budget, programs,
                  and goals. Our team follows up personally if there&apos;s a
                  fit.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship%20inquiry`}
                  className="mt-8 inline-block font-oswald text-lg font-bold tracking-tight text-black transition-opacity hover:opacity-60 md:text-xl"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="mt-10 shrink-0 lg:mt-0">
                <Link
                  href="/sponsors/apply"
                  className="inline-flex rounded-full bg-[#0c1222] px-10 py-4 text-sm font-medium tracking-[0.1em] text-white transition-opacity hover:opacity-85"
                >
                  Start inquiry →
                </Link>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12 lg:gap-20">
          <FadeInView direction="up">
            <h2 className="font-oswald text-5xl font-bold tracking-tight text-black md:text-6xl lg:text-7xl">
              FAQ.
            </h2>
          </FadeInView>

          <div className="border-t border-black/8">
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
      <section className=" px-4 py-16 md:px-8 md:py-20">
        <FadeInView direction="up">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-oswald text-3xl font-bold tracking-tight text-black md:text-4xl">
                See what our events feel like.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/60 md:text-base">
                Browse past programs, upcoming events, and the community we
                bring together across San Francisco and Silicon Valley.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.instagram.com/sfplayground/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[#0c1222] px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              >
                View events
              </Link>
              <Link
                href="/"
                className="inline-flex rounded-full border border-black/10 bg-white/70 px-8 py-3.5 text-sm font-medium text-black backdrop-blur-sm transition-opacity hover:opacity-85"
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
