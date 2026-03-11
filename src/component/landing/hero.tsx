"use client";

import React, { useRef, useEffect } from "react";
import { SIGNUP_FORM_URL } from "@/data/constants";
import siteData from "@/data/site-data.json";
import { DestinationCard } from "@/components/ui/card-21";
import { useWebsiteContent } from "@/context/WebsiteContentContext";
import { convertGoogleDriveImageUrl } from "@/utils/convertDriveImageUrl";

const nextEventCtaUrl =
  (siteData.nextEvent as { ctaUrl?: string }).ctaUrl ??
  "https://luma.com/user/SFPlayground";

function useHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReversing = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    let rafId: number;
    const speed = 0.5;

    const animate = () => {
      if (!video || !video.duration) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      if (isReversing.current) {
        video.currentTime = Math.max(0, video.currentTime - speed / 60);
        if (video.currentTime <= 0) {
          isReversing.current = false;
          video.play();
        }
      } else {
        if (video.currentTime >= video.duration - 0.1) {
          isReversing.current = true;
          video.pause();
        }
      }
      rafId = requestAnimationFrame(animate);
    };

    const onLoadedMetadata = () => {
      if (!desktopQuery.matches) return;
      video.play().catch(() => {});
      rafId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      if (desktopQuery.matches) {
        video.play().catch(() => {});
        rafId = requestAnimationFrame(animate);
      } else {
        if (rafId) cancelAnimationFrame(rafId);
        video.pause();
        video.currentTime = 0;
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    desktopQuery.addEventListener("change", onResize);
    if (video.readyState >= 1) onLoadedMetadata();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      desktopQuery.removeEventListener("change", onResize);
    };
  }, []);

  return videoRef;
}

const Hero = () => {
  const { getContent } = useWebsiteContent();
  const videoRef = useHeroVideo();

  return (
    <section
      className="relative z-0 min-h-screen w-full overflow-hidden flex flex-col px-4 pt-[4.5rem] pb-8 sm:px-6 sm:pt-24 sm:pb-10 md:px-8 md:pt-24 md:pb-12 lg:px-12 lg:pt-28"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 md:hidden"
          data-editable="hero.backgroundImage"
          data-editable-type="image"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={convertGoogleDriveImageUrl(
              getContent("hero.backgroundImage") || "/hero.jpg"
            )}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
        <video
          ref={videoRef}
          src={getContent("hero.backgroundVideo") || "/hero.mp4"}
          muted
          loop
          playsInline
          className="absolute inset-0 hidden w-full h-full object-cover md:block"
          data-editable="hero.backgroundVideo"
          data-editable-type="video"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black"
        aria-hidden
      />

      {/* Content: centered in viewport on mobile; row on desktop */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center md:flex-row md:justify-center md:items-center md:text-left w-full max-w-6xl mx-auto md:gap-10 lg:gap-12">
        {/* Copy + CTAs */}
        <header className="flex-shrink-0 w-full md:max-w-[52%] lg:max-w-[50%] animate-fade-in-down flex flex-col items-center md:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-oswald text-white mb-2 sm:mb-3 leading-[1.15]">
            <span
              className="text-[#19f7ea] font-bold"
              data-editable="hero.headline1"
              data-editable-type="text"
            >
              {getContent("hero.headline1")}
            </span>
            <span data-editable="hero.headline2" data-editable-type="text">
              {getContent("hero.headline2")}
            </span>
            <span
              className="text-[#19f7ea] font-bold"
              data-editable="hero.headline3"
              data-editable-type="text"
            >
              {getContent("hero.headline3")}
            </span>
            <span data-editable="hero.headline4" data-editable-type="text">
              {getContent("hero.headline4")}
            </span>
          </h1>
          <p
            className="text-white/60 text-sm sm:text-base md:text-lg font-oswald max-w-xl mt-1.5 sm:mt-2 animate-fade-in-down"
            style={{ animationDelay: "0.1s" }}
            data-editable="hero.subline"
            data-editable-type="text"
          >
            {getContent("hero.subline")}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-5 animate-fade-in-down justify-center md:justify-start"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-3.5 py-2 rounded-md text-sm font-oswald font-medium hover:bg-gray-200 transition-colors"
            >
              <span data-editable="hero.ctaPrimary" data-editable-type="text">
                {getContent("hero.ctaPrimary")}
              </span>
            </a>
            <a
              href="/#faq"
              className="text-white border border-white/60 px-3.5 py-2 text-sm rounded-md font-oswald hover:bg-white/10 transition-colors"
            >
              <span data-editable="hero.ctaSecondary" data-editable-type="text">
                {getContent("hero.ctaSecondary")}
              </span>
            </a>
          </div>

          {/* Desktop-only supporting copy below CTAs */}
          <p
            className="hidden md:block text-white/50 text-sm mt-4 max-w-md font-oswald"
            data-editable="hero.desktopCopy"
            data-editable-type="text"
          >
            {getContent("hero.desktopCopy")}
          </p>
        </header>

        {/* Event poster — centered on all breakpoints */}
        <div className="mt-6 sm:mt-8 md:mt-0 flex justify-center flex-shrink-0 w-full md:w-auto">
          <div className="w-full max-w-[260px] h-[340px] sm:max-w-[280px] sm:h-[360px] md:w-[280px] md:h-[360px] md:max-w-none lg:w-[300px] lg:h-[380px] border border-white/30 rounded-xl overflow-hidden shrink-0">
            <DestinationCard
              imageUrl="/images/Pitchplayoffs002/PitchPlayoffs002.png"
              location="Pitch Playoffs #002"
              flag=""
              stats="15+ startups • 6 VCs"
              href={nextEventCtaUrl}
              themeColor="150 50% 25%"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
