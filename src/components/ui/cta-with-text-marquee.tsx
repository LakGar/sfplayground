"use client";

import { NETWORK_AUDIENCE_MARQUEE } from "@/data/partner-brands";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 24,
}: VerticalMarqueeProps) {
  return (
    <div
      className={cn("group relative h-full overflow-hidden", className)}
      style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        <div className="flex shrink-0 flex-col">{children}</div>
        <div className="flex shrink-0 flex-col" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function CTAWithVerticalMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll(".marquee-item");
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.72;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    let frame = 0;

    const tick = () => {
      updateOpacity();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="overflow-hidden bg-white px-4 py-20 text-black md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-7xl animate-fade-in-up">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl space-y-8">
            <h2 className="font-oswald text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl animate-fade-in-up [animation-delay:200ms]">
              Join the Network
            </h2>
            <p className="text-lg leading-relaxed text-black/60 md:text-xl animate-fade-in-up [animation-delay:400ms]">
              Join 25,000+ founders, investors, and customers in one of the
              fastest-growing startup networks in Silicon Valley and San
              Francisco.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up [animation-delay:600ms]">
              <a
                href="mailto:staff@sfplaygroundai.com?subject=Join%20the%20SF%20Playground%20network"
                className="inline-flex items-center justify-center rounded-full bg-[#0c1222] px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85 md:text-base"
              >
                Join
              </a>
              <a
                href="mailto:staff@sfplaygroundai.com?subject=Book%20a%2015%20minute%20call"
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-[#f3f3f1] px-8 py-3.5 text-sm font-medium text-black transition-opacity hover:opacity-85 md:text-base"
              >
                Book a 15 minute call
              </a>
            </div>
          </div>

          <div
            ref={marqueeRef}
            className="relative flex h-[520px] items-center justify-center md:h-[600px] lg:h-[680px] animate-fade-in-up [animation-delay:400ms]"
          >
            <VerticalMarquee speed={22} className="h-full w-full">
              {NETWORK_AUDIENCE_MARQUEE.map((item) => (
                <div
                  key={item}
                  className="marquee-item font-oswald py-6 text-4xl font-light tracking-tight text-black/85 transition-opacity md:py-8 md:text-5xl lg:text-6xl xl:text-7xl"
                >
                  {item}
                </div>
              ))}
            </VerticalMarquee>

            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-white via-white/70 to-transparent md:h-48"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-white via-white/70 to-transparent md:h-48"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
