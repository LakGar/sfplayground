"use client";

import { RevealText } from "@/components/ui/reveal-text";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const REVEAL_TEXT = "SILICON VALLEY CLUB";
const LETTER_DELAY = 0.02;
const SPRING_DURATION_MS = 100;

/** Same typography classes as each letter in `RevealText` (see reveal-text.tsx). */
const REVEAL_FONT_CLASS = "text-[25px] font-black tracking-tight";

/** One line of the pillar rail (px) — keep in sync with text-[25px] + leading. */
const PILLAR_LINE_PX = 34;

/** Time until RevealText’s per-letter spring pass is mostly settled (matches reveal-text.tsx). */
function revealSettleMs(): number {
  return (
    (REVEAL_TEXT.length - 1) * LETTER_DELAY * 1000 + SPRING_DURATION_MS + 350
  );
}

const PILLARS = ["Capital", "Culture", "Access"] as const;
/** Time each word stays readable before scrolling to the next. */
const WORD_DWELL_MS = 480;
/** Brief beat after landing on “Access” so the spring can finish, then the curtain goes up. */
const AFTER_LAST_SCROLL_MS = 90;

function PillarVerticalRail({
  activeIndex,
  reducedMotion,
}: {
  activeIndex: number;
  reducedMotion: boolean;
}) {
  const y = -Math.min(activeIndex, PILLARS.length - 1) * PILLAR_LINE_PX;

  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ height: PILLAR_LINE_PX }}
      aria-live="polite"
    >
      <motion.div
        className="flex flex-col items-start"
        animate={{ y }}
        transition={
          reducedMotion
            ? { duration: 0.1, ease: "easeOut" }
            : { type: "spring", stiffness: 520, damping: 28, mass: 0.55 }
        }
      >
        {PILLARS.map((w) => (
          <span
            key={w}
            className={`flex shrink-0 items-center ${REVEAL_FONT_CLASS} text-white/42`}
            style={{
              height: PILLAR_LINE_PX,
              lineHeight: `${PILLAR_LINE_PX}px`,
            }}
          >
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function SiliconValleyLanding() {
  const [pillarsReady, setPillarsReady] = useState(false);
  const [pillarIndex, setPillarIndex] = useState(0);
  const [slideCurtain, setSlideCurtain] = useState(false);
  const [curtainMounted, setCurtainMounted] = useState(true);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const rm = prefersReducedMotion;
    const timers = timersRef.current;
    const clearTimers = () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.length = 0;
    };

    const settled = revealSettleMs();
    const dwell = rm ? 200 : WORD_DWELL_MS;
    const afterLast = rm ? 120 : AFTER_LAST_SCROLL_MS;

    if (rm) {
      timers.push(
        window.setTimeout(() => {
          setPillarsReady(true);
          setPillarIndex(2);
        }, settled),
      );
      timers.push(
        window.setTimeout(() => setSlideCurtain(true), settled + afterLast),
      );
      return clearTimers;
    }

    timers.push(
      window.setTimeout(() => {
        setPillarsReady(true);
      }, settled),
    );

    timers.push(window.setTimeout(() => setPillarIndex(1), settled + dwell));
    timers.push(
      window.setTimeout(() => setPillarIndex(2), settled + dwell * 2),
    );
    timers.push(
      window.setTimeout(
        () => setSlideCurtain(true),
        settled + dwell * (PILLARS.length - 1) + afterLast,
      ),
    );

    return clearTimers;
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!slideCurtain) return;
    const ms = prefersReducedMotion ? 400 : 1000;
    const t = window.setTimeout(() => setCurtainMounted(false), ms);
    return () => window.clearTimeout(t);
  }, [slideCurtain, prefersReducedMotion]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <section
        className="relative min-h-screen w-full"
        aria-label="Silicon Valley hero"
      >
        <Image
          src="/images/sv-hero1.png"
          alt="Silicon Valley skyline and bay"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20"
          aria-hidden
        />
      </section>

      {!curtainMounted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center overflow-y-auto px-4 py-6 sm:p-8 lg:p-12"
        >
          <form
            action="/silicon-valley/dashboard"
            method="get"
            className="pointer-events-auto relative my-auto grid w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/30 bg-white p-2 shadow-[0_24px_90px_rgba(0,0,0,0.4)] md:min-h-[650px] md:grid-cols-[1fr_1fr]"
          >
            <div className="relative hidden overflow-hidden rounded-[1.25rem] md:block">
              <Image
                src="/images/sv-hero1.png"
                alt="Silicon Valley Club visual"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 0px, 40vw"
              />
              <div
                className="absolute inset-0 bg-linear-to-b from-black/30 via-black/18 to-black/65"
                aria-hidden
              />
              <div className="absolute inset-x-8 top-8 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
                San Francisco Bay Area
              </div>
              <div className="absolute inset-x-8 bottom-10 text-white">
                <p
                  className="text-[clamp(3.5rem,6vw,5.5rem)] font-black leading-[0.95] tracking-tight text-white"
                >
                  Capital.
                  <br />
                  Culture.
                  <br />
                  Access.
                </p>
                <p className="mt-6 max-w-xs text-base leading-7 text-white/78">
                  Private member network for founders, operators, and investors.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col justify-center px-5 py-9 text-[#1f1b14] sm:px-10 md:px-12 md:py-12">
              <div className="mx-auto flex w-full max-w-sm flex-col">
                <div className="mb-12 flex items-center gap-3">
                  <div>
                    <Image
                      src="/images/logo.png"
                      alt="Silicon Valley Club logo"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <span
                    className="text-sm font-bold tracking-[0.1em] text-[#17130e]"
                  >
                    SILICON VALLEY CLUB
                  </span>
                </div>
                <div className="flex w-full flex-col items-start">
                  <p className="mb-3 rounded-full bg-[#f3f0e9] px-3 py-1.5 text-xs font-medium tracking-wide text-[#6d5e47]">Coming January 11</p>
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#17130e] sm:text-4xl">
                    Private Member Access
                  </h1>
                  <p className="mt-3 max-w-xs text-xs leading-6 text-[#6d5e47]">
                    Join a private circle of founders, operators, and investors
                    building what comes next. Meaningful connections, shared
                    ambition, and new possibilities.
                  </p>

                  <div className="mt-8 w-full space-y-5 border-t border-[#eee9e0] pt-7">
                    <div className="w-full">
                      <label
                        htmlFor="sv-email"
                        className="mb-2 block text-sm font-medium text-[#514636]"
                      >
                        Email
                      </label>
                      <input
                        id="sv-email"
                        autoComplete="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-[#dbcbb3] bg-white px-3.5 py-2.5 text-sm text-[#1f1b14] placeholder:text-[#a7967d] outline-none transition focus:border-[#b08b4f] focus:ring-2 focus:ring-[#b08b4f]/15 "
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="sv-password"
                        className="mb-2 block text-sm font-medium text-[#514636]"
                      >
                        Password
                      </label>
                      <input
                        id="sv-password"
                        autoComplete="current-password"
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-[#dbcbb3] bg-white px-3.5 py-2.5 text-sm text-[#1f1b14] placeholder:text-[#a7967d] outline-none transition focus:border-[#b08b4f] focus:ring-2 focus:ring-[#b08b4f]/15 "
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-5 w-full rounded-xl border border-[#13100a] bg-[#13100a] px-4 py-3.5 text-sm font-medium text-[#f7f4ef] transition hover:bg-[#252016] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b08b4f]"
                  >
                    Sign In
                  </button>

                </div>
              </div>
            </div>
          </form>
        </motion.div>
      ) : null}

      {curtainMounted ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6"
          initial={{ y: 0 }}
          animate={{ y: slideCurtain ? "-100%" : 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.28 : 0.65,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{ willChange: "transform" }}
        >
          <div className="flex w-full max-w-6xl justify-center">
            <motion.div
              layout
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 420,
                  damping: 34,
                },
              }}
              className={`flex items-center ${pillarsReady ? "gap-6 md:gap-10" : ""} justify-center`}
            >
              <motion.div layout className="shrink-0">
                <RevealText
                  text={REVEAL_TEXT}
                  textColor="text-white"
                  overlayColor="text-red-500"
                  fontSize="text-[25px]"
                  letterDelay={LETTER_DELAY}
                  overlayDelay={0.02}
                  overlayDuration={0.4}
                  springDuration={SPRING_DURATION_MS}
                />
              </motion.div>

              {pillarsReady ? (
                <motion.div
                  initial={{ x: -96, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.2 : 0.58,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="shrink-0"
                >
                  <PillarVerticalRail
                    activeIndex={pillarIndex}
                    reducedMotion={prefersReducedMotion}
                  />
                </motion.div>
              ) : null}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
