"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeInView } from "@/components/ui/fade-in-view";
import {
  NETWORK_PATHS,
  NETWORK_PATHS_INTRO,
} from "@/data/network-page-data";

function MiniLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
      {children}
    </p>
  );
}

function PathImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative min-h-[280px] overflow-hidden rounded-[1.75rem] md:min-h-[320px] md:rounded-[2rem] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

function PathBlock({
  path,
  index,
}: {
  path: (typeof NETWORK_PATHS)[number];
  index: number;
}) {
  const isDark = path.tone === "dark";
  const reverse = index % 2 === 1;

  return (
    <article
      id={path.id}
      className={`scroll-mt-24 border-t border-black/8 py-16 md:py-24 lg:py-28 ${
        index % 2 === 1 ? "bg-white/40" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
        <FadeInView direction="up">
          <div
            className={`inline-flex rounded-full px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase ${
              isDark
                ? "bg-[#0c1222] text-white"
                : "bg-black/5 text-black/60"
            }`}
          >
            {path.tag}
          </div>
          <h2 className="mt-4 font-oswald text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-black">
            {path.title}
          </h2>
        </FadeInView>

        {/* Who */}
        <div
          className={`mt-10 grid grid-cols-1 items-center gap-4 md:mt-12 md:grid-cols-2 md:gap-8 ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <FadeInView direction="up" delay={0.05}>
            <PathImage src={path.who.image} alt={path.who.alt} />
          </FadeInView>
          <FadeInView direction="up" delay={0.1}>
            <div className="px-1 md:px-4">
              <MiniLabel>Who</MiniLabel>
              <h3 className="mt-3 font-oswald text-2xl font-bold leading-tight tracking-tight text-black md:text-3xl">
                {path.who.headline}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-black/55 md:text-base">
                {path.who.line}
              </p>
            </div>
          </FadeInView>
        </div>

        {/* Why */}
        <div
          className={`mt-10 grid grid-cols-1 items-center gap-4 md:mt-14 md:grid-cols-2 md:gap-8 ${
            reverse ? "" : "md:[&>*:first-child]:order-2"
          }`}
        >
          <FadeInView direction="up" delay={0.05}>
            <PathImage src={path.why.image} alt={path.why.alt} />
          </FadeInView>
          <FadeInView direction="up" delay={0.1}>
            <div className="px-1 md:px-4">
              <MiniLabel>Why</MiniLabel>
              <h3 className="mt-3 font-oswald text-2xl font-bold leading-tight tracking-tight text-black md:text-3xl">
                {path.why.headline}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-black/55 md:text-base">
                {path.why.line}
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {path.why.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-snug text-black/55"
                  >
                    <span className="text-black/25" aria-hidden>
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={`/network/apply?type=${path.id}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#0c1222] px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
                >
                  {path.applyLabel}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </Link>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </article>
  );
}

export default function NetworkPathSections() {
  return (
    <section className="pb-4 md:pb-8">
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-12 pt-16 md:px-8 md:pb-16 md:pt-20">
        <FadeInView direction="up">
          <p className="text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
            {NETWORK_PATHS_INTRO.label}
          </p>
          <h2 className="mt-4 max-w-3xl font-oswald text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.06] tracking-tight text-black">
            {NETWORK_PATHS_INTRO.headline}
          </h2>
        </FadeInView>
      </div>

      {NETWORK_PATHS.map((path, index) => (
        <PathBlock key={path.id} path={path} index={index} />
      ))}
    </section>
  );
}
