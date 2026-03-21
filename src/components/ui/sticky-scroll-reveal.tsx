"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  showTitle = true,
  showDescription = true,
  renderInlineContent = false,
  showRightContent = true,
  activeOnly = false,
}: {
  content: {
    textOne: string;
    textTwo: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  renderInlineContent?: boolean;
  showRightContent?: boolean;
  activeOnly?: boolean;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const [activeCardProgress, setActiveCardProgress] = React.useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const cardLength = content.length;

  // Document scroll + layout (Framer useScroll is unreliable here). Handles `display:none` parents
  // (e.g. `hidden md:block`): when the track has no layout yet, offsetHeight is 0 — ResizeObserver + rAF fixes it.
  useLayoutEffect(() => {
    if (!cardLength) return;

    const update = () => {
      const el = targetRef.current;
      if (!el) return;

      const vh = window.innerHeight;
      const trackPx = el.offsetHeight;
      const scrollable = trackPx - vh;

      if (scrollable <= 1) {
        setActiveCard(0);
        setActiveCardProgress(0);
        return;
      }

      // Document Y of element top (stable) vs window.scrollY — works even when sticky is quirky
      const elTopDoc = el.getBoundingClientRect().top + window.scrollY;
      const y = window.scrollY;
      const t = Math.min(1, Math.max(0, (y - elTopDoc) / scrollable));
      // Split the sticky track into equal segments: one full segment per card.
      // This ensures every text block gets full bottom->top travel time.
      const segmentFloat = t * cardLength;
      const idx = Math.min(cardLength - 1, Math.max(0, Math.floor(segmentFloat)));
      const progress = Math.min(1, Math.max(0, segmentFloat - idx));

      setActiveCard(idx);
      setActiveCardProgress(progress);
    };

    const scheduleUpdate = () => {
      requestAnimationFrame(() => requestAnimationFrame(update));
    };

    scheduleUpdate();

    window.addEventListener("scroll", update, { passive: true, capture: true });
    const onResize = () => scheduleUpdate();
    window.addEventListener("resize", onResize, { passive: true });

    const el = targetRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (el && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => scheduleUpdate());
      resizeObserver.observe(el);
    }

    const mql = window.matchMedia("(min-width: 768px)");
    const onBp = () => scheduleUpdate();
    mql.addEventListener("change", onBp);

    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", onResize);
      mql.removeEventListener("change", onBp);
      resizeObserver?.disconnect();
    };
  }, [cardLength, content.length]);

  const backgroundColors = [
    "rgb(15 23 42)", // slate-900
    "rgb(0 0 0)", // black
    "rgb(23 23 23)", // neutral-900
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, rgb(6 182 212), rgb(16 185 129))", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, rgb(236 72 153), rgb(99 102 241))", // pink-500 to indigo-500
    "linear-gradient(to bottom right, rgb(249 115 22), rgb(234 179 8))", // orange-500 to yellow-500
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  const scrollTrackHeightVh = Math.max(1, cardLength) * 100;

  const cardBlock = (item: (typeof content)[0], index: number) => (
    <div
      className={
        activeOnly ? "h-full w-full flex items-center justify-center" : "my-20"
      }
    >
      <div
        className={`flex flex-row items-center ${
          renderInlineContent ? "gap-6 md:gap-10" : "gap-4"
        } w-full`}
      >
        <div className="flex-1 min-w-0 basis-0 max-w-xl md:max-w-[520px]">
          <p className="text-white text-2xl md:text-3xl font-light text-left leading-snug md:leading-relaxed pb-10">
            {item.textOne} <span className="text-white/50">{item.textTwo}</span>
          </p>
        </div>

        {renderInlineContent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeCard === index ? 1 : activeOnly ? 0 : 0.3,
            }}
            className="shrink-0 w-[min(100%,420px)] flex justify-center"
          >
            {item.content ?? null}
          </motion.div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div
      ref={targetRef}
      className="relative w-full"
      style={{ height: `${scrollTrackHeightVh}vh` }}
    >
      <motion.div
        animate={{
          backgroundColor: "black",
        }}
        className="sticky top-0 h-screen flex flex-row justify-center items-center gap-6 md:gap-10 rounded-md p-6 md:p-10"
      >
        <div className="relative flex flex-1 min-w-0 items-center px-4 justify-center h-full min-h-0">
          <div className="w-full max-w-6xl h-full flex flex-col items-center justify-center min-h-0">
            {activeOnly ? (
              <div className="h-full w-full flex items-center justify-center min-h-0">
                <div
                  className={`flex flex-row items-center ${
                    renderInlineContent ? "gap-6 md:gap-10" : "gap-4"
                  } w-full`}
                >
                  <motion.div
                    key={`text-${activeCard}`}
                    initial={false}
                    animate={false}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex-1 min-w-0 basis-0 max-w-xl md:max-w-[520px]"
                    style={{
                      // Move text from bottom of viewport to top of viewport.
                      // `items-center` centers the block, so translate across +-maxTranslate.
                      opacity: 1,
                      // +45vh at progress=0 (bottom), -45vh at progress=1 (top)
                      transform: `translateY(${(0.5 - activeCardProgress) * 90}vh)`,
                    }}
                  >
                    <p className="text-white text-2xl md:text-3xl font-light text-left leading-snug md:leading-relaxed">
                      {content[activeCard].textOne}{" "}
                      <span className="text-white/50">
                        {content[activeCard].textTwo}
                      </span>
                    </p>
                  </motion.div>

                  {renderInlineContent ? (
                    <motion.div
                      key={`media-${activeCard}`}
                      initial={{ opacity: 0, y: 28, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="shrink-0 w-[min(100%,420px)] flex justify-center overflow-hidden rounded-2xl"
                    >
                      {content[activeCard].content ?? null}
                    </motion.div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full min-h-0">
                {content.map((item, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center px-0"
                    initial={false}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                  >
                    {cardBlock(item, index)}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        {showRightContent ? (
          <div
            style={{ background: backgroundGradient }}
            className={cn(
              "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
              contentClassName,
            )}
          >
            {content[activeCard]?.content ?? null}
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};
