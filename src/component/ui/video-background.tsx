"use client";
import React, { useRef, useEffect } from "react";

const VideoBackground = () => {
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
    <>
      {/* Mobile: hero image */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: "url(/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* md: video */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        muted
        loop
        playsInline
        className="absolute inset-0 hidden w-full h-full object-cover md:block"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/10 to-black via-black/20" />
    </>
  );
};

export default VideoBackground;
