"use client";

import { RevealText } from "@/components/ui/reveal-text";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const reducedMotionRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = rm;
    setPrefersReducedMotion(rm);
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
  }, []);

  useEffect(() => {
    if (!slideCurtain) return;
    const ms = reducedMotionRef.current ? 400 : 1000;
    const t = window.setTimeout(() => setCurtainMounted(false), ms);
    return () => window.clearTimeout(t);
  }, [slideCurtain]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <section
        className="relative min-h-screen w-full"
        aria-label="Silicon Valley hero"
      >
        <Image
          src="/sv-hero1.png"
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
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center p-10"
        >
          <form
            action="/admin/signin"
            method="get"
            className="pointer-events-auto relative grid w-full h-full overflow-hidden rounded-[2rem] border  bg-white p-3 shadow-[0_20px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:grid-cols-[0.95fr_1.05fr] md:p-2"
          >
            <div className="relative hidden overflow-hidden rounded-[1.5rem] md:block">
              <Image
                src="/sv-hero1.png"
                alt="Silicon Valley Club visual"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 0px, 40vw"
              />
              <div
                className="absolute inset-0 bg-linear-to-b from-black/30 via-black/18 to-black/65"
                aria-hidden
              />
              <div className="absolute inset-x-6 top-6">
                <span
                  className={`inline-flex items-center ${REVEAL_FONT_CLASS} text-white`}
                ></span>
              </div>
              <div className="absolute inset-x-6 bottom-6 text-white">
                <p
                  className={`${REVEAL_FONT_CLASS} leading-[0.9] text-[80px] text-white`}
                >
                  Capital.
                  <br />
                  Culture.
                  <br />
                  Access.
                </p>
                <p className="mt-3 text-md text-white/78">
                  Private member network for founders, operators, and investors.
                </p>
              </div>
            </div>
            <div className="rounded-[1.5rem] p-6 text-[#1f1b14] md:px-10 w-full flex flex-col items-center justify-between">
              <div className="w-full max-w-md flex flex-col items-center justify-between   h-full">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <Image
                      src="/logo/svc-logo.png"
                      alt="Silicon Valley Club logo"
                      width={50}
                      height={50}
                    />
                  </div>
                  <span
                    className={`inline-flex items-center ${REVEAL_FONT_CLASS} text-[#000]`}
                  >
                    SILICONVALLEYCLUB
                  </span>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <h2 className="mt-8 text-4xl font-semibold leading-none tracking-tight text-[#17130e]">
                    Welcome Back
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#6d5e47]">
                    Sign in to continue to the private member portal.
                  </p>

                  <div className="mt-7 space-y-3 w-full">
                    <div className="w-full">
                      <label
                        htmlFor="sv-email"
                        className="mb-1.5 block text-xs tracking-wide text-[#6a5a43]"
                      >
                        Email
                      </label>
                      <input
                        id="sv-email"
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-[#dbcbb3] bg-white px-3.5 py-2.5 text-sm text-[#1f1b14] placeholder:text-[#a7967d] outline-none transition focus:border-[#b08b4f] "
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="sv-password"
                        className="mb-1.5 block text-xs tracking-wide text-[#6a5a43]"
                      >
                        Password
                      </label>
                      <input
                        id="sv-password"
                        type="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-[#dbcbb3] bg-white px-3.5 py-2.5 text-sm text-[#1f1b14] placeholder:text-[#a7967d] outline-none transition focus:border-[#b08b4f] "
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-5 w-full rounded-xl border border-[#13100a] bg-[#13100a] px-4 py-2.5 text-sm font-medium text-[#f7f4ef] transition hover:bg-[#252016]"
                  >
                    Sign In
                  </button>

                  <p className="mt-4 text-center text-xs text-[#7f725e]">
                    Member access only. Contact SF Playground for onboarding.
                  </p>
                </div>
                <div className="w-full flex items-center justify-center">
                  <Link
                    href="/admin/signup"
                    className="text-sm text-[#7f725e]"
                  ></Link>
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
