"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import ApplyModal from "@/component/ui/apply-modal";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReversing = useRef(false);
  const [imagesLoaded, setImagesLoaded] = useState({
    image1: false,
    image2: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="relative h-screen flex justify-center items-center p-4 md:p-8 lg:p-12 overflow-hidden">
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
          <span className="text-[#00d5ff] font-bold">Crowd </span> Powered.
          <span className="text-[#00d5ff] font-bold"> Investor </span>
          Backed.
        </h1>
        {/* hero description */}
        <p
          className="text-white/50 text-md md:text-lg lg:text-xl font-oswald animate-fade-in-down"
          style={{ animationDelay: "0.2s" }}
        >
          Live demos. Pitch battles. Top founders. Active VCs. 
        </p>

        {/* hero buttons*/}
        <div
          className="flex gap-4 mt-4 md:hidden animate-fade-in-down"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-4 py-1 rounded-md text-sm md:text-base lg:text-lg"
          >
            Apply Now
          </button>
          <button className="text-white border border-white px-4 py-2 text-sm md:text-base lg:text-lg rounded-md">
            Request an Invite
          </button>
        </div>

        {/* hero highlights */}
        <div className="md:flex gap-6 mt-8 items-center justify-between">
          {/* Images */}
          <div className="flex gap-4">
            {/* Loading placeholders */}
            {(!imagesLoaded.image1 || !imagesLoaded.image2) && (
              <>
                <div className="hidden lg:block relative w-48 h-48 lg:w-56 lg:h-56 rounded-md overflow-hidden border border-white/20">
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                </div>
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-md overflow-hidden border border-white/20">
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                </div>
              </>
            )}
            {/* Image 1 */}
            <Link
              href="/events/ice-tank-challenge"
              className={`hidden lg:block relative w-48 h-48 lg:w-56 lg:h-56 rounded-md overflow-hidden group cursor-pointer border border-white/20 ${
                imagesLoaded.image1 && imagesLoaded.image2
                  ? "animate-slide-in-left opacity-100"
                  : "invisible opacity-0"
              }`}
              style={{
                animationDelay:
                  imagesLoaded.image1 && imagesLoaded.image2
                    ? "0.5s"
                    : undefined,
              }}
            >
              <Image
                src="/images/ice-tank-challenge/FFB98278-927E-47EC-B27A-BAC34261B9AF_1_102_o.jpeg"
                alt="Ice Tank Challenge Event"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onLoad={() =>
                  setImagesLoaded((prev) => ({ ...prev, image1: true }))
                }
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white text-sm font-oswald mb-2 line-clamp-2">
                  Ice Tank Challenge - Founders pitch to VCs in an ice tank...
                </p>
                <div className="cursor-pointer bg-white/30 text-white px-3 py-1 rounded-md text-xs self-end">
                  View Event
                </div>
              </div>
            </Link>
            {/* Image 2 */}
            <Link
              href="/success-stories/petpin-ai"
              className={`relative w-48 h-48 lg:w-56 lg:h-56 rounded-md overflow-hidden group cursor-pointer border border-white/20 ${
                imagesLoaded.image1 && imagesLoaded.image2
                  ? "animate-slide-in-left opacity-100"
                  : "invisible opacity-0"
              }`}
              style={{
                animationDelay:
                  imagesLoaded.image1 && imagesLoaded.image2
                    ? "0.6s"
                    : undefined,
              }}
            >
              <Image
                src="/images/startups/petpin.png"
                alt="Petpin AI Success Story"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onLoad={() =>
                  setImagesLoaded((prev) => ({ ...prev, image2: true }))
                }
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white text-sm font-oswald mb-2 line-clamp-2">
                  Petpin AI - Turning an AI Pet Startup Into a Crowd Favorite...
                </p>
                <div className="cursor-pointer bg-white/30 text-white px-3 py-1 rounded-md text-xs self-end">
                  View Story
                </div>
              </div>
            </Link>
          </div>
          {/* Apply section */}
          <div
            className="hidden md:flex flex-col gap-4 max-w-xs animate-fade-in-down"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="text-white/70 text-sm lg:text-base">
              Apply to pitch your startup live and receive real-time feedback
              from investors who deploy capital.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer bg-white text-black px-4 py-2 rounded-md text-sm lg:text-base flex items-center gap-2 hover:bg-gray-200 transition-all duration-300"
              >
                Apply to Pitch Now <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Hero;
