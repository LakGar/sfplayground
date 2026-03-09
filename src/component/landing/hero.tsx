"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SIGNUP_FORM_URL } from "@/data/constants";
import siteData from "@/data/site-data.json";
import { DestinationCard } from "@/components/ui/card-21";
import { useWebsiteContent } from "@/context/WebsiteContentContext";
import { convertGoogleDriveImageUrl } from "@/utils/convertDriveImageUrl";

const nextEventCtaUrl =
  (siteData.nextEvent as { ctaUrl?: string }).ctaUrl ??
  "https://luma.com/user/SFPlayground";

type LatestPost = {
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: Date;
  image_url: string | null;
};

const Hero = ({ latestPost }: { latestPost?: LatestPost | null }) => {
  const { getContent } = useWebsiteContent();
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

    const handleLoadedMetadata = () => {
      if (!desktopQuery.matches) return;
      video.play().catch(() => {});
      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (desktopQuery.matches) {
        video.play().catch(() => {});
        rafId = requestAnimationFrame(animate);
      } else {
        if (rafId) cancelAnimationFrame(rafId);
        video.pause();
        video.currentTime = 0;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    desktopQuery.addEventListener("change", handleResize);
    if (video.readyState >= 1) handleLoadedMetadata();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      desktopQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen w-full flex justify-center items-center px-6 py-8 sm:px-8 sm:py-10 md:p-8 lg:p-12 overflow-hidden">
      {/* Mobile: hero image */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url('${convertGoogleDriveImageUrl(getContent("hero.backgroundImage") || "/hero.jpg")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-editable="hero.backgroundImage"
        data-editable-type="image"
      />
      {/* md: video */}
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
      {/* overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 via-black/20 to-black" />
      {/* content */}
      <div className="relative z-10 w-full">
        {/* hero heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl md:w-3/5 font-oswald text-white mb-4 animate-fade-in-down">
          <span className="text-[#19f7ea] font-bold" data-editable="hero.headline1" data-editable-type="text">{getContent("hero.headline1")}</span>
          <span data-editable="hero.headline2" data-editable-type="text">{getContent("hero.headline2")}</span>
          <span className="text-[#19f7ea] font-bold" data-editable="hero.headline3" data-editable-type="text">{getContent("hero.headline3")}</span>
          <span data-editable="hero.headline4" data-editable-type="text">{getContent("hero.headline4")}</span>
        </h1>
        {/* hero description */}
        <p
          className="text-white/50 text-md md:text-lg lg:text-xl font-oswald animate-fade-in-down"
          style={{ animationDelay: "0.2s" }}
          data-editable="hero.subline"
          data-editable-type="text"
        >
          {getContent("hero.subline")}
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
            className="bg-white text-black px-4 py-2 rounded-md text-sm md:text-base lg:text-lg font-oswald  hover:bg-gray-200 transition-colors"
          >
            <span data-editable="hero.ctaPrimary" data-editable-type="text">{getContent("hero.ctaPrimary")}</span>
          </a>
          <a
            href="/#faq"
            className="text-white border border-white px-4 py-2 text-sm md:text-base lg:text-lg rounded-md font-oswald hover:bg-white/10 transition-colors"
          >
            <span data-editable="hero.ctaSecondary" data-editable-type="text">{getContent("hero.ctaSecondary")}</span>
          </a>
        </div>

        {/* hero highlights */}
        <div className="md:flex gap-6 mt-8 items-center justify-between">
          {/* Upcoming event poster - clickable to Luma */}
          <div className="flex gap-4">
            <div className="w-[320px] md:w-[360px] h-[400px] md:h-[450px] border-2 border-white/50 rounded-2xl overflow-hidden">
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
          {/* Latest blog card (same style as blog list) + Primary CTA */}
          <div
            className="hidden md:flex flex-col gap-5 max-w-sm animate-fade-in-down"
            style={{ animationDelay: "0.7s" }}
          >
            {latestPost && (
              <Link
                href={`/blog/${latestPost.slug}`}
                className="group relative flex w-full rounded-2xl border border-white/15 overflow-hidden hover:border-[#19f7ea]/40 transition-all duration-300 min-h-[280px]"
              >
                {/* Image as background */}
                <div className="absolute inset-0 bg-white/5">
                  {latestPost.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={convertGoogleDriveImageUrl(latestPost.image_url)}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-white/20 font-oswald text-4xl">SF</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                {/* Text on top */}
                <div className="relative z-10 flex flex-col justify-end p-6 min-h-full">
                  <span className="text-[#19f7ea] text-xs font-oswald font-bold uppercase tracking-wider mb-2">
                    Latest
                  </span>
                  <h3 className="text-xl font-oswald font-bold text-white mb-2 group-hover:text-[#19f7ea] transition-colors line-clamp-2 leading-tight">
                    {latestPost.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-white/80 text-sm font-oswald">
                    Read post
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </span>
                </div>
              </Link>
            )}
            <p className="text-white/70 text-base lg:text-lg font-oswald" data-editable="hero.desktopCopy" data-editable-type="text">
              {getContent("hero.desktopCopy")}
            </p>
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-md text-base font-oswald hover:bg-gray-200 transition-all duration-300 w-fit"
            >
              <span data-editable="hero.ctaPrimary" data-editable-type="text">{getContent("hero.ctaPrimary")}</span>
            </a>
          </div>
        </div>

        {/* Mobile: latest blog card (image bg + text on top) */}
        {latestPost && (
          <Link
            href={`/blog/${latestPost.slug}`}
            className="md:hidden mt-6 relative flex w-full rounded-2xl border border-white/15 overflow-hidden min-h-[220px] animate-fade-in-down"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="absolute inset-0 bg-white/5">
              {latestPost.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={convertGoogleDriveImageUrl(latestPost.image_url)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 bg-black/40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col justify-end p-5 min-h-full">
              <span className="text-[#19f7ea] text-xs font-oswald font-bold uppercase tracking-wider mb-1">
                Latest
              </span>
              <p className="text-white font-oswald font-bold text-lg line-clamp-2">
                {latestPost.title}
              </p>
              <span className="text-white/80 text-sm font-oswald mt-1">Read post →</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
