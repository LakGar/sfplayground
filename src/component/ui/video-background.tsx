"use client";
import React, { useRef, useEffect } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReversing = useRef(false);

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
    <>
      <video
        ref={videoRef}
        src="/hero.mp4"
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/10 to-black via-black/20" />
    </>
  );
};

export default VideoBackground;

