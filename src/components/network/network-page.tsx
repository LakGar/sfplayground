"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import NetworkHero from "@/components/network/network-hero";
import NetworkWhyMasonry from "@/components/network/network-why-masonry";
import PartnerMarquee from "@/components/partner-marquee";
import { FadeInView } from "@/components/ui/fade-in-view";
import {
  NETWORK_FAQ,
  NETWORK_PAGE_SHELL,
  NETWORK_PATHS,
  NETWORK_STATS,
} from "@/data/network-page-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const PATH_TONE = {
  dark: "bg-[#0c1222] text-white",
  cream: "bg-[#f3f3f1] text-black",
  stone: "bg-[#e8e2d8] text-black",
} as const;

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

export function NetworkPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className={NETWORK_PAGE_SHELL}>
      <Nav />

      <NetworkHero />

      <PartnerMarquee className="bg-transparent" />

      <section className="px-4 py-16 md:px-8 md:py-24">
        <FadeInView direction="up">
          <div className="mx-auto w-full max-w-[1400px]">
            <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {NETWORK_STATS.map((stat) => (
                <li
                  key={stat.value}
                  className="rounded-[1.5rem] bg-white/50 px-6 py-8 backdrop-blur-sm md:px-7"
                >
                  <p className="font-oswald text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tight text-black">
                    {stat.value}
                  </p>
                  <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-black/65 md:text-[0.9375rem]">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </FadeInView>
      </section>

      <NetworkWhyMasonry />

      <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <FadeInView direction="up">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
                Choose your path
              </p>
              <h2 className="mt-4 font-oswald text-4xl font-bold tracking-tight text-black md:text-5xl">
                How do you want to join?
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {NETWORK_PATHS.map((path) => (
                <Link
                  key={path.id}
                  href={`/network/apply?type=${path.id}`}
                  className={`group flex flex-col justify-between rounded-[1.75rem] p-7 transition-transform duration-300 hover:scale-[1.01] md:p-8 ${PATH_TONE[path.tone]}`}
                >
                  <div>
                    <h3 className="font-oswald text-2xl font-bold tracking-tight">
                      {path.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        path.tone === "dark" ? "text-white/65" : "text-black/55"
                      }`}
                    >
                      {path.description}
                    </p>
                  </div>
                  <span
                    className={`mt-8 inline-flex w-fit text-sm font-medium tracking-[0.1em] uppercase ${
                      path.tone === "dark" ? "text-white/80" : "text-black/50"
                    }`}
                  >
                    Apply →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </FadeInView>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <FadeInView direction="up">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="overflow-hidden rounded-[2rem]  bg-white/60 p-8 backdrop-blur-md md:flex md:items-center md:justify-between md:gap-16 md:p-14">
              <div className="max-w-xl">
                <p className="text-sm text-black/45">2-minute application</p>
                <h2 className="mt-4 font-oswald text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-black">
                  Ready to join the network?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-black/60">
                  One question at a time. Pick your path — founder, investor, or
                  speaker — and we&apos;ll follow up if there&apos;s a fit.
                </p>
              </div>
              <div className="mt-10 shrink-0 md:mt-0">
                <Link
                  href="/network/apply"
                  className="inline-flex rounded-full bg-[#0c1222] px-10 py-4 text-sm font-medium tracking-widest text-white transition-opacity hover:opacity-85"
                >
                  Start application →
                </Link>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12 lg:gap-20">
          <FadeInView direction="up">
            <h2 className="font-oswald text-5xl font-bold tracking-tight text-black md:text-6xl lg:text-7xl">
              FAQ.
            </h2>
          </FadeInView>
          <div className="border-t border-black/8">
            {NETWORK_FAQ.map((item, index) => (
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

      <section className="px-4 py-16 md:px-8 md:py-20">
        <FadeInView direction="up">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-oswald text-3xl font-bold tracking-tight text-black md:text-4xl">
                Explore SFPLAYGROUND.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/60 md:text-base">
                Browse events, become a sponsor, or reach out to the team
                directly.
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
                href="/sponsors"
                className="inline-flex rounded-full border border-black/10 bg-white/70 px-8 py-3.5 text-sm font-medium text-black backdrop-blur-sm transition-opacity hover:opacity-85"
              >
                Become a sponsor
              </Link>
            </div>
          </div>
        </FadeInView>
      </section>

      <Footer />
    </div>
  );
}
