"use client";
import React, { useRef, useEffect } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReversing = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
    <>
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/10 to-black via-black/20" />
    </>
  );
};

export default VideoBackground;

