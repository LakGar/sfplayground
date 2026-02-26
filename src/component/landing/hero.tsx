"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { SIGNUP_FORM_URL } from "@/data/constants";
import siteData from "@/data/site-data.json";
import { DestinationCard } from "@/components/ui/card-21";

const nextEventCtaUrl =
  (siteData.nextEvent as { ctaUrl?: string }).ctaUrl ??
  "https://luma.com/user/SFPlayground";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReversing = useRef(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const applyMobileStill = () => {
      video.pause();
      video.currentTime = 0;
    };

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

    const startAnimation = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animate);
    };

    const handleLoadedMetadata = () => {
      if (mobileQuery.matches) {
        applyMobileStill();
        return;
      }
      video.play().catch(() => {});
      startAnimation();
    };

    const handleMobileChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        applyMobileStill();
        return;
      }
      video.play().catch(() => {});
      startAnimation();
    };

    // On mobile: keep video still (no autoPlay), run as soon as we have metadata
    if (mobileQuery.matches) {
      applyMobileStill();
      video.addEventListener("loadedmetadata", applyMobileStill);
      video.addEventListener("loadeddata", applyMobileStill);
      mobileQuery.addEventListener("change", handleMobileChange);
      return () => {
        video.removeEventListener("loadedmetadata", applyMobileStill);
        video.removeEventListener("loadeddata", applyMobileStill);
        mobileQuery.removeEventListener("change", handleMobileChange);
      };
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    if (video.readyState >= 1) handleLoadedMetadata();
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  return (
    <div className="relative h-screen flex justify-center items-center px-6 py-8 sm:px-8 sm:py-10 md:p-8 lg:p-12 overflow-hidden">
      {/* background video */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        poster="/herohighlight1.jpeg"
        preload="metadata"
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {/* overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 via-black/20 to-black" />
      {/* content */}
      <div className="relative z-10">
        {/* hero heading */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl md:w-3/5 font-oswald text-white mb-4 animate-fade-in-down">
          <span className="text-[#19f7ea] font-bold">Crowd </span> Powered.
          <span className="text-[#19f7ea] font-bold"> Investor </span>
          Backed.
        </h1>
        {/* hero description */}
        <p
          className="text-white/50 text-md md:text-lg lg:text-xl font-oswald animate-fade-in-down"
          style={{ animationDelay: "0.2s" }}
        >
          Live demos. Pitch battles. Top founders. Active VCs.
        </p>

        {/* hero buttons */}
        <div
          className="flex flex-wrap gap-3 mt-4 md:hidden animate-fade-in-down"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href={SIGNUP_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-4 py-2 rounded-md text-sm md:text-base lg:text-lg font-oswald font-bold hover:bg-gray-200 transition-colors"
          >
            Get on the list
          </a>
          <a
            href="/#faq"
            className="text-white border border-white px-4 py-2 text-sm md:text-base lg:text-lg rounded-md font-oswald hover:bg-white/10 transition-colors"
          >
            Learn more
          </a>
        </div>

        {/* hero highlights */}
        <div className="md:flex gap-6 mt-8 items-center justify-between">
          {/* Upcoming event poster - clickable to Luma */}
          <div className="flex gap-4">
            <div className="w-[320px] md:w-[360px] h-[400px] md:h-[450px]">
              <DestinationCard
                imageUrl="/images/Pitchplayoffs002/PitchPlayoffs002.png"
                location="Pitch Playoffs #002"
                flag=""
                stats="15+ startups • 6 VCs"
                href={nextEventCtaUrl}
                // A deep, lush green HSL value
                themeColor="150 50% 25%"
              />
            </div>
          </div>
          {/* Primary CTA */}
          <div
            className="hidden md:flex flex-col gap-4 max-w-xs animate-fade-in-down"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="text-white/70 text-sm lg:text-base font-oswald">
              Startups register for a free demo booth and a chance to pitch live
              to VCs.
            </p>
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm lg:text-base font-oswald  hover:bg-gray-200 transition-all duration-300 w-fit"
            >
              Apply Here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
