"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { SIGNUP_FORM_URL } from "@/data/constants";
import siteData from "@/data/site-data.json";

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

    let rafId: number;
    const speed = 0.5; // Playback speed (adjust for smoother/faster)

    const animate = () => {
      if (!video || !video.duration) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (isReversing.current) {
        // Reverse playback
        video.currentTime = Math.max(0, video.currentTime - speed / 60);
        if (video.currentTime <= 0) {
          isReversing.current = false;
          video.play();
        }
      } else {
        // Forward playback
        if (video.currentTime >= video.duration - 0.1) {
          isReversing.current = true;
          video.pause();
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleLoadedMetadata = () => {
      video.play();
      rafId = requestAnimationFrame(animate);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="relative h-screen flex justify-center items-center px-6 py-8 sm:px-8 sm:py-10 md:p-8 lg:p-12 overflow-hidden">
      {/* background video */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        muted
        loop
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
            {!posterLoaded && (
              <div className="relative w-[200px] h-[260px] sm:w-[220px] sm:h-[286px] rounded-xl overflow-hidden border border-[#19f7ea]/30 shadow-[0_0_30px_-8px_rgba(25,247,234,0.25)]">
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              </div>
            )}
            <a
              href={nextEventCtaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative w-[200px] h-[260px] sm:w-[220px] sm:h-[286px] rounded-xl overflow-hidden group cursor-pointer border border-[#19f7ea]/30 shrink-0 animate-border-glow hover:shadow-[0_0_40px_-6px_rgba(25,247,234,0.4)] hover:border-[#19f7ea]/50 transition-all duration-300 ${
                posterLoaded
                  ? "animate-slide-in-left opacity-100"
                  : "invisible opacity-0"
              }`}
              style={{ animationDelay: posterLoaded ? "0.4s" : undefined }}
            >
              {/* Sliding "Upcoming Event" header */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm py-2 px-1 border-b border-white/10 overflow-hidden">
                <span className="animate-slide-across text-white/95 text-xs font-oswald font-bold uppercase tracking-widest">
                  Upcoming Event &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Upcoming Event &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </div>
              <Image
                src="/images/Pitchplayoffs002/PitchPlayoffs002-1_1.png"
                alt="Physical AI Pitch Playoffs #002 - Apply or attend at SF Playground"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onLoad={() => setPosterLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pt-10">
                <p className="text-white text-xs font-oswald mb-2 line-clamp-2">
                  Physical AI Pitch Playoffs #002 — Get your spot
                </p>
                <span className="inline-flex items-center gap-1 bg-[#19f7ea]/90 text-black px-2.5 py-1 rounded-md text-xs font-oswald font-bold self-end">
                  Get my spot →
                </span>
              </div>
            </a>
          </div>
          {/* Primary CTA */}
          <div
            className="hidden md:flex flex-col gap-4 max-w-xs animate-fade-in-down"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="text-white/70 text-sm lg:text-base font-oswald">
              Startups register for a free demo booth and a chance to pitch live to VCs.
            </p>
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm lg:text-base font-oswald font-bold hover:bg-gray-200 transition-all duration-300 w-fit"
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
