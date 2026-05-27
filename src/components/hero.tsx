"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_TITLE_LETTER_IMAGES } from "@/data/hero-title-letter-images";
import { RevealText } from "./ui/reveal-text";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpTransition = (delay: number) => ({
  delay,
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
});

/** Replace `src` values with your own images under /public when ready */
const CAROUSEL_IMAGES = [
  {
    src: "/images/hero1.JPG",
    alt: "Placeholder 1",
  },
  {
    src: "/images/hero2.png",
    alt: "Placeholder 2",
  },
  {
    src: "/images/hero3.png",
    alt: "Placeholder 3",
  },
  {
    src: "/images/hero4.png",
    alt: "Placeholder 4",
  },
  {
    src: "/images/hero5.png",
    alt: "Placeholder 5",
  },
  {
    src: "/images/hero6.png",
    alt: "Placeholder 6",
  },
  {
    src: "/images/hero7.jpeg",
    alt: "Placeholder 7",
  },
  {
    src: "/images/hero8.JPG",
    alt: "Placeholder 8",
  },
] as const;

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sfplayground",
    Icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sfplayground/",
    Icon: InstagramIcon,
  },
  {
    label: "X",
    href: "https://x.com/sfplayground",
    Icon: XIcon,
  },
] as const;

const CAROUSEL_FRAME =
  "relative h-[48vh] min-h-[280px] w-[180px] shrink-0 overflow-hidden rounded-b-none md:h-[56vh] md:min-h-[340px] md:w-[220px] lg:h-[58vh] lg:min-h-[380px] lg:w-[260px]";

function CarouselHalf({
  src,
  alt,
  side,
}: {
  src: string;
  alt: string;
  side: "left" | "right";
}) {
  const radius = "rounded-tl-[60px] md:rounded-tl-[80px] lg:rounded-tl-[120px]";
  const radiusRight =
    "rounded-tr-[60px] md:rounded-tr-[80px] lg:rounded-tr-[120px]";

  return (
    <div
      className={`${CAROUSEL_FRAME} ${side === "left" ? radius : radiusRight}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 180px, 260px"
        unoptimized
      />
    </div>
  );
}

function CarouselTrack({ trackId }: { trackId: string }) {
  return (
    <div
      className="flex shrink-0 items-end gap-3 px-1 md:gap-4"
      aria-hidden={trackId === "b" ? true : undefined}
    >
      {CAROUSEL_IMAGES.map((image, i) => (
        <CarouselHalf
          key={`${trackId}-${i}`}
          src={image.src}
          alt={trackId === "a" ? image.alt : ""}
          side={i % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col bg-white">
      {/* Left vertical label */}
      <p
        className="pointer-events-none absolute left-4 top-[30%] z-10 hidden -translate-y-1/2 text-[10px] tracking-[0.35em] text-black/70 [writing-mode:vertical-rl] md:left-8 md:block lg:left-12"
        aria-hidden
      >
        ( SF / CA )
      </p>

      {/* Right social icons */}
      <nav
        className="pointer-events-none absolute right-4 top-[40%] z-10 hidden -translate-y-1/2 md:right-8 md:block lg:right-12"
        aria-label="Social links"
      >
        <ul className="flex  items-center gap-5">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="pointer-events-auto text-black/35 transition-opacity hover:text-black/70"
              >
                <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Title block */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-26 pt-28 text-center md:px-8 md:pb-10 md:pt-32">
        <h1 className="leading-[0.92]">
          <RevealText
            text="SFPLAYGROUND"
            textColor="text-black"
            letterImages={[...HERO_TITLE_LETTER_IMAGES]}
            overlayColor="text-red-500"
            fontSize="text-[clamp(2.75rem,14vw,12.5rem)]"
            fontClassName="font-oswald font-bold"
            trackingClass="tracking-[-0.04em]"
            letterDelay={0.08}
            overlayDelay={0.05}
            overlayDuration={0.4}
            springDuration={600}
          />
        </h1>
        <motion.p
          className="mt-4 max-w-4xl font-oswald text-[clamp(0.875rem,2.5vw,1.75rem)] font-medium leading-snug tracking-wide text-black/80 md:mt-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.85)}
        >
          Live <i className="text-red-500/60">experiences</i> built for{" "}
          <b>Founders</b>, <b>Investors</b>, and <b>Customers</b>.
        </motion.p>
      </div>

      {/* Infinite image carousel with edge fades */}
      <motion.div
        className="relative w-full"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition(1.05)}
      >
        <div className="overflow-hidden">
          <div className="flex w-max animate-scroll">
            <CarouselTrack trackId="a" />
            <CarouselTrack trackId="b" />
          </div>
        </div>

        <div
          className=" absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white via-white/80 to-transparent sm:w-24 md:w-32 lg:w-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white via-white/80 to-transparent sm:w-24 md:w-32 lg:w-40"
          aria-hidden
        />
      </motion.div>
    </section>
  );
}
