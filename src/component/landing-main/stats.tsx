"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

const Stats = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [hasInView, setHasInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setHasInView(true);
        observer.disconnect();
      },
      { threshold: 0.22 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = useMemo(
    () => [
      {
        id: "startups",
        label: "Startups demos",
        target: 35,
        decimals: 0,
        suffix: "+",
      },
      {
        id: "vcs",
        label: "Active investors",
        target: 20,
        decimals: 0,
        suffix: "+",
      },
      {
        id: "funding",
        label: "On-stage funding signal",
        target: 12.5,
        decimals: 1,
        suffix: "%",
      },
      {
        id: "audience",
        label: "Cumulative attendees",
        target: 10000,
        decimals: 0,
        suffix: "+",
      },
    ],
    [],
  );

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 md:px-8 lg:px-12 bg-[#f2f2f2]/10"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-neutral-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
              Reach
            </p>
            <h2 className="font-oswald text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-neutral-900 md:text-5xl lg:text-[3.25rem]">
              Built for founders who ship hardware in the real world.
            </h2>
            <p className="mt-8 max-w-md text-pretty text-lg font-light leading-relaxed text-neutral-600 md:text-xl">
              From first demos to repeat founders—one room, real reactions, and
              <span className="text-neutral-400">
                {" "}
                capital paying attention.
              </span>
            </p>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-900/8 bg-neutral-200/80 shadow-[12px_24px_48px_-12px_rgba(0,0,0,0.14)]">
              <Image
                src="/herohighlight1.jpeg"
                alt="SF Playground event floor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/10 to-transparent" />
            </div>
            <p className="mt-3 text-right text-[10px] uppercase tracking-[0.28em] text-neutral-400">
              Frontier Tower · Bay Area
            </p>
          </div>
        </div>

        {/* Bottom stats */}
        <div
          className={`mt-10 grid grid-cols-2 md:grid-cols-4 gap-20 transition-all duration-700 ${
            hasInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {stats.map((s) => (
            <AnimatedStat key={s.id} {...s} start={hasInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

function AnimatedStat(props: {
  id: string;
  label: string;
  target: number;
  decimals: number;
  suffix: string;
  start: boolean;
}) {
  const { label, target, decimals, suffix, start } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const durationMs = 1100;
    const startTs = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTs) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = target * eased;
      setValue(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  const formatted = useMemo(() => {
    if (decimals === 0) {
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }).format(Math.round(value));
    }
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(Number(value.toFixed(decimals)));
  }, [decimals, value]);

  return (
    <div className="relative border-l border-neutral-900/10 pl-4 md:pl-5">
      <div className="font-oswald text-4xl font-light tabular-nums leading-none tracking-[-0.03em] text-neutral-900 md:text-5xl">
        {formatted}
        <span className="text-2xl font-light text-neutral-500 md:text-3xl">
          {suffix === "%" ? "%" : suffix}
        </span>
      </div>
      <div className="mt-2 max-w-[9.5rem] text-[11px] font-medium uppercase leading-snug tracking-[0.12em] text-neutral-500">
        {label}
      </div>
    </div>
  );
}

export default Stats;
