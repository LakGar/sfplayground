"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { SPONSOR_PARTNER_MASONRY } from "@/data/sponsors-page-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const TONE_STYLES = {
  dark: "bg-[#0c1222] text-white",
  cream: "bg-[#f3f3f1] text-black",
  stone: "bg-[#e8e2d8] text-black",
} as const;

function ArrowButton({
  href,
  label,
  dark = false,
}: {
  href?: string;
  label?: string;
  dark?: boolean;
}) {
  const className = `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${
    dark ? "bg-white text-black" : "bg-black text-white"
  }`;

  const icon = <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />;

  if (href) {
    return (
      <Link href={href} aria-label={label ?? "Learn more"} className={className}>
        {icon}
      </Link>
    );
  }

  return (
    <span className={className} aria-hidden>
      {icon}
    </span>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay, duration: 0.75, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ImageTile({
  tag,
  title,
  image,
  alt,
  className = "",
}: {
  tag: string;
  title: string;
  image: string;
  alt: string;
  className?: string;
}) {
  return (
    <article
      className={`group relative h-full min-h-[200px] overflow-hidden rounded-[1.75rem] md:rounded-[2rem] ${className}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 28vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-black/5" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
        <span className="inline-flex w-fit rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-white uppercase backdrop-blur-sm">
          {tag}
        </span>
        <div className="flex items-end justify-between gap-4">
          <h3 className="max-w-56 font-oswald text-2xl font-bold leading-tight tracking-tight text-white md:text-[1.65rem]">
            {title}
          </h3>
          <ArrowButton dark />
        </div>
      </div>
    </article>
  );
}

function AccentCard({
  title,
  description,
  tone,
  href,
}: {
  title: string;
  description: string;
  tone: keyof typeof TONE_STYLES;
  href?: string;
}) {
  const isDark = tone === "dark";

  return (
    <article
      className={`group flex h-full min-h-0 flex-col justify-between rounded-[1.75rem] p-6 md:rounded-[2rem] md:p-7 ${TONE_STYLES[tone]}`}
    >
      <div>
        <h3 className="font-oswald text-xl font-bold leading-tight tracking-tight md:text-2xl">
          {title}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed md:text-[0.9375rem] ${
            isDark ? "text-white/65" : "text-black/55"
          }`}
        >
          {description}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        {href ? (
          <Link
            href={href}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-opacity hover:opacity-80 ${
              isDark ? "bg-white/10 text-white" : "bg-black/5 text-black/70"
            }`}
          >
            Learn more
          </Link>
        ) : (
          <span />
        )}
        <ArrowButton href={href} dark={isDark} />
      </div>
    </article>
  );
}

export default function SponsorPartnerMasonry() {
  const { headline, subline, tiles, accentCards } = SPONSOR_PARTNER_MASONRY;

  return (
    <section className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
                Why partner with us
              </p>
              <h2 className="mt-4 font-oswald text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.06] tracking-tight text-black">
                {headline}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-black/55 md:text-base lg:pb-1">
              {subline}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 md:mt-14 lg:gap-5">
          {/* Top bento — equal column heights */}
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-12 md:gap-4 lg:min-h-[640px] lg:gap-5">
            {/* Left stack */}
            <div className="flex min-h-[520px] flex-col gap-4 md:col-span-4 lg:col-span-3 lg:min-h-0 lg:h-full">
              {accentCards.map((card, index) => (
                <Reveal
                  key={card.title}
                  delay={index * 0.06}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <AccentCard
                    {...card}
                    href={index === 0 ? "/sponsors/apply" : undefined}
                  />
                </Reveal>
              ))}
            </div>

            {/* Center hero */}
            <Reveal
              delay={0.08}
              className="min-h-[420px] md:col-span-5 lg:col-span-5 lg:min-h-0 lg:h-full"
            >
              <article className="group relative h-full min-h-[420px] overflow-hidden rounded-[1.75rem] md:rounded-[2rem]">
                <Image
                  src={tiles.hero.image}
                  alt={tiles.hero.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  <span className="inline-flex w-fit rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-white uppercase backdrop-blur-sm">
                    {tiles.hero.tag}
                  </span>
                  <div>
                    <h3 className="max-w-sm font-oswald text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                      {tiles.hero.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                      {tiles.hero.description}
                    </p>
                    <div className="mt-6">
                      <ArrowButton href="/sponsors/apply" label="Start inquiry" dark />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* Right stack — splits height evenly */}
            <div className="flex min-h-[360px] flex-col gap-4 md:col-span-3 lg:col-span-4 lg:min-h-0 lg:h-full">
              <Reveal delay={0.1} className="flex min-h-0 flex-1 flex-col">
                <ImageTile {...tiles.pitch} />
              </Reveal>
              <Reveal delay={0.14} className="flex min-h-0 flex-1 flex-col">
                <ImageTile {...tiles.capital} />
              </Reveal>
            </div>
          </div>

          {/* Bottom row — matched heights */}
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:min-h-[320px] lg:gap-5">
            <Reveal delay={0.12} className="flex min-h-[280px] flex-col lg:min-h-0 lg:h-full">
              <article className="group relative h-full min-h-[280px] overflow-hidden rounded-[1.75rem] md:rounded-[2rem]">
                <Image
                  src={tiles.community.image}
                  alt={tiles.community.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-end p-6 md:p-8">
                  <div>
                    <span className="text-[11px] font-medium tracking-[0.14em] text-white/80 uppercase">
                      {tiles.community.tag}
                    </span>
                    <p className="mt-2 font-oswald text-2xl font-bold text-white md:text-3xl">
                      {tiles.community.title}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.16} className="flex min-h-[280px] flex-col lg:min-h-0 lg:h-full">
              <article className="flex h-full min-h-[280px] flex-col justify-between rounded-[1.75rem] bg-[#0c1222] p-7 text-white md:rounded-[2rem] md:p-9">
                <div>
                  <h3 className="font-oswald text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-[2rem]">
                    {tiles.cta.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
                    {tiles.cta.description}
                  </p>
                </div>
                <Link
                  href={tiles.cta.href}
                  className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                  {tiles.cta.label}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
