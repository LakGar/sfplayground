"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { SIGNUP_FORM_URL } from "@/data/constants";
import NewsletterModal from "@/component/ui/newsletter-modal";

const HEADLINE_LINE1 = "Discover The Next";
const HEADLINE_LINE2 = "Physical AI Leaders";

const headlineClass =
  "m-0 text-white text-4xl md:text-7xl font-oswald font-bold leading-tight";

function TypewriterHeadline({
  text,
  visibleCount,
  showCaret,
  headingLevel,
}: {
  text: string;
  visibleCount: number;
  showCaret: boolean;
  headingLevel: 1 | 2;
}) {
  const visible = text.slice(0, visibleCount);
  const HeadingTag = headingLevel === 1 ? "h1" : "h2";
  return (
    <div className="relative w-full text-left">
      {/* Invisible full line reserves size so layout / vertical alignment don't shift */}
      <div
        className={`${headlineClass} invisible select-none pointer-events-none`}
        aria-hidden
      >
        {text}
      </div>
      <HeadingTag
        className={`${headlineClass} absolute left-0 top-0 w-full`}
        aria-label={text}
      >
        {visible.split("").map((ch, i) => (
          <span key={`${i}-${ch}`} className="hero-char-reveal">
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
        {showCaret ? (
          <span className="ml-0.5 inline-block w-[0.08em] opacity-60">|</span>
        ) : null}
      </HeadingTag>
    </div>
  );
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);

  const [line1Len, setLine1Len] = useState(0);
  const [line2Len, setLine2Len] = useState(0);
  const [showCrowd, setShowCrowd] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  /** Scroll parallax: video moves slower than the page (avoids global html/body perspective + overflow hacks). */
  const updateParallax = useCallback(() => {
    const section = sectionRef.current;
    const layer = parallaxLayerRef.current;
    if (!section || !layer) return;

    // Parallax only on md+ — on mobile keeps the background aligned (no transform drift).
    if (!window.matchMedia("(min-width: 768px)").matches) {
      layer.style.transform = "";
      return;
    }

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < 0 || rect.top > vh) {
      layer.style.transform = "translate3d(0, 0, 0) scale(1.06)";
      return;
    }

    const scrollY = window.scrollY;
    const speed = 0.38;
    const y = scrollY * speed;
    layer.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
  }, []);

  useEffect(() => {
    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, [updateParallax]);

  /** Staggered intro: tagline slide -> typewriter headlines -> body -> CTA (< ~2s total). */
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setLine1Len(HEADLINE_LINE1.length);
      setLine2Len(HEADLINE_LINE2.length);
      setShowCrowd(true);
      setShowExperience(true);
      setShowCta(true);
      return;
    }

    let cancelled = false;
    const charMs = 11;
    const pauseAfterHeadline = 50;
    const afterCrowdRevealMs = 260;
    const afterBodyMs = 240;
    const afterExperienceMs = 200;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    (async () => {
      setShowCrowd(true);
      if (cancelled) return;
      await sleep(afterCrowdRevealMs);
      for (let i = 1; i <= HEADLINE_LINE1.length; i++) {
        if (cancelled) return;
        setLine1Len(i);
        await sleep(charMs);
      }
      for (let i = 1; i <= HEADLINE_LINE2.length; i++) {
        if (cancelled) return;
        setLine2Len(i);
        await sleep(charMs);
      }
      if (cancelled) return;
      await sleep(pauseAfterHeadline);
      await sleep(afterBodyMs);
      setShowExperience(true);
      if (cancelled) return;
      await sleep(afterExperienceMs);
      setShowCta(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-parallax relative h-screen w-screen overflow-hidden"
    >
      <div
        ref={parallaxLayerRef}
        className="hero-parallax__bg hero-parallax__bg--mobile-safe"
      >
        {/* Still image: always visible so mobile always shows a background (video is md-only). */}
        <Image
          src="/hero-3.avif"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          quality={70}
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-black/30" />
      {/* main content container */}
      <div className="relative z-20 h-full w-full flex items-center justify-center px-4 pt-20 pb-28 md:pt-[clamp(5.5rem,14vh,10rem)] md:pb-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Inner column: centered in viewport on mobile, left under shell on md+; copy stays left-aligned */}
          <div className="flex flex-col gap-4 md:gap-9 w-full max-w-xl text-left items-start mx-auto md:mx-0">
            {/* 1) Tagline — above title; slides in first */}
            <div
              className={`flex items-center justify-start gap-2 transition-all duration-300 ease-out w-full ${
                showCrowd
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-6 pointer-events-none"
              }`}
            >
              <div className="w-10 md:w-20 h-0.5 bg-white rounded-full shrink-0" />
              <p className="text-white text-lg font-bold text-left">
                Crowd <span className="font-light">Powered</span>. Investor{" "}
                <span className="font-light">Backed</span>.
              </p>
            </div>
            {/* 2) Headlines — reserved line height + smooth per-letter fade */}
            <div className="flex flex-col gap-1 md:gap-2 shrink-0 w-full items-start">
              <TypewriterHeadline
                text={HEADLINE_LINE1}
                visibleCount={line1Len}
                showCaret={line1Len > 0 && line1Len < HEADLINE_LINE1.length}
                headingLevel={1}
              />
              <TypewriterHeadline
                text={HEADLINE_LINE2}
                visibleCount={line2Len}
                showCaret={
                  line1Len >= HEADLINE_LINE1.length &&
                  line2Len > 0 &&
                  line2Len < HEADLINE_LINE2.length
                }
                headingLevel={2}
              />
            </div>

            {/* 3) Experience — slides up + fade */}
            <p
              className={`text-white/80 text-lg max-w-[min(100%,450px)] transition-all duration-300 ease-out ${
                showExperience
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              Experience live, crowd-filtered startup pitches where founders
              gain visibility and investors gain early signal.
            </p>
            {/* 4) Primary CTA */}
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 bg-white rounded-full p-2 w-fit hover:bg-white/80 transition-all duration-300 cursor-pointer group ${
                showCta
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              <p className="text-md pl-4">Register your Startup</p>
              <div className="flex items-center justify-center bg-black rounded-full p-2">
                <ArrowRight className="w-4 h-4 text-white -rotate-35 group-hover:rotate-0 transition-all duration-300" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute bottom-10 left-0 right-0 z-20">
        <div className="mx-auto max-w-7xl px-4 flex justify-end">
          <button
            type="button"
            onClick={() => setIsNewsletterOpen(true)}
            className="flex items-center gap-3 bg-white rounded-full p-2 w-fit hover:bg-white/80 transition-all duration-300 cursor-pointer group"
          >
            <p className="text-md pl-4">Sign up for our newsletter</p>
            <div className=" flex items-center justify-center bg-black  rounded-full p-2">
              <ArrowRight className="w-4 h-4 text-white transition-all duration-300" />
            </div>
          </button>
        </div>
      </div>
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </section>
  );
};

export default Hero;
