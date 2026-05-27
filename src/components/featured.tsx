"use client";

import { useCallback, useRef, useState } from "react";

/** Local file for dev; production should set NEXT_PUBLIC_FEATURED_VIDEO_URL (see public/videos/README.md). */
const LOCAL_VIDEO = encodeURI("/videos/LIMI AI x SF Playground.mp4");
const VIDEO_SRC =
  process.env.NEXT_PUBLIC_FEATURED_VIDEO_URL?.trim() || LOCAL_VIDEO;
const VIDEO_POSTER = "/images/previous-events/capitalnight.avif";

const STATS = [
  {
    value: "3m+",
    label: "Capital raised by startups in our network.",
  },
  {
    value: "15K+",
    label: "Founder, builder, and investor connections.",
  },
  {
    value: "26",
    label: "Live events hosted in Silicon Valley to San Francisco.",
  },
  {
    value: "97%",
    label: "Community satisfaction across programs we run.",
  },
] as const;

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="ml-1 h-5 w-5 text-black"
      aria-hidden
    >
      <path d="M8 5.14v14.72a1 1 0 001.5.86l11.04-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
    </svg>
  );
}

function FeaturedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return;
    void video.play();
  }, [videoReady]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[1.75rem] bg-neutral-900 md:rounded-[2.25rem]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={VIDEO_POSTER}
        playsInline
        preload="metadata"
        controls={playing}
        onLoadedData={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {!playing && videoReady ? (
        <button
          type="button"
          onClick={play}
          className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105 md:h-18 md:w-18"
          aria-label="Play LIMI AI x SFPLAYGROUND video"
        >
          <PlayIcon />
        </button>
      ) : null}
    </div>
  );
}

export default function Featured() {
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="max-w-4xl font-oswald text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-black">
          SFPlayground is a Silicon Valley network shaping bold founders and
          investor-backed startups.
        </h2>

        <div className="mt-10 md:mt-14">
          <FeaturedVideo />
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat) => (
            <li key={stat.value}>
              <p className="font-oswald text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tight text-black">
                {stat.value}
              </p>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-black/65 md:text-[0.9375rem]">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
