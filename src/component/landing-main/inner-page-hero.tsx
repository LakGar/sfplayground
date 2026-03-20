"use client";

import Image from "next/image";
import VideoBackground from "@/component/ui/video-background";
import { cn } from "@/lib/utils";

const shell = {
  /** Min-height comes from each page via `className` to avoid conflicting rules. */
  default: "",
  fullscreen: "min-h-[100svh] min-h-[100dvh]",
} as const;

export type InnerPageHeroImage = {
  src: string;
  alt: string;
  priority?: boolean;
  /** Use when `src` cannot be optimized (rare). */
  unoptimized?: boolean;
};

type InnerPageHeroBase = {
  children: React.ReactNode;
  className?: string;
  /** `fullscreen` = first-screen hero (100svh / 100dvh). */
  variant?: keyof typeof shell;
  /** Extra classes on the inner content wrapper (layout, alignment, min-height). */
  contentWrapperClassName?: string;
  /** Replace default gradient scrim. */
  scrimClassName?: string;
  /** `stretch` = fill hero height for split layouts (blog). Default vertically centers. */
  alignContent?: "center" | "stretch";
};

type InnerPageHeroVideo = InnerPageHeroBase & {
  background?: "video";
  image?: undefined;
};

type InnerPageHeroImageBg = InnerPageHeroBase & {
  background: "image";
  image: InnerPageHeroImage;
};

export type InnerPageHeroProps = InnerPageHeroVideo | InnerPageHeroImageBg;

const defaultScrim =
  "absolute inset-0 z-[5] bg-gradient-to-b from-black/58 via-black/68 to-black/62";

/**
 * Inner pages — cinematic scrim, grain, aligned with main nav width.
 */
export function InnerPageHero({
  children,
  className = "",
  variant = "default",
  background = "video",
  image,
  contentWrapperClassName,
  scrimClassName,
  alignContent = "center",
}: InnerPageHeroProps) {
  const stretch = alignContent === "stretch";

  return (
    <div
      className={cn(
        "landing-grain relative flex justify-center overflow-hidden rounded-b-3xl bg-neutral-950 px-4 md:px-8 md:rounded-b-[2rem]",
        stretch ? "items-stretch" : "items-center",
        shell[variant],
        className,
      )}
    >
      {background === "image" && image ? (
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="inner-page-hero-bg absolute -inset-[12%]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={image.priority}
              unoptimized={image.unoptimized}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>
      ) : (
        <VideoBackground />
      )}
      <div className={scrimClassName ?? defaultScrim} aria-hidden />
      <div
        className="landing-vignette pointer-events-none absolute inset-0 z-[6]"
        aria-hidden
      />
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-6xl text-center",
          stretch &&
            "flex min-h-[100svh] min-h-[100dvh] flex-1 flex-col self-stretch",
          contentWrapperClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
