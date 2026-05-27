import Image from "next/image";
import Link from "next/link";

const INLINE_IMAGES = [
  { src: "/images/network1.JPG", alt: "San Francisco skyline" },
  { src: "/images/network2.JPG", alt: "SFPLAYGROUND community" },
  { src: "/images/network3.JPG", alt: "Networking event" },
] as const;

const CONTACT_EMAIL = "staff@sfplaygroundai.com";

function InlinePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="  relative mx-1.5 inline-block h-[1.05em] w-[2.35em] min-h-[2.25rem] min-w-[3.75rem] translate-y-[0.06em] overflow-hidden rounded-xl align-middle md:mx-2 md:min-h-[3rem] md:min-w-[5rem] md:rounded-2xl lg:min-h-[3.5rem] lg:min-w-[5.75rem]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 60px, 92px"
      />
    </span>
  );
}

export default function AboutNetwork() {
  return (
    <section
      className="bg-gradient-to-b from-[#f3f3f1] to-[#fff] via-[#fff] px-4 py-20 md:px-8 md:py-28 lg:py-32"
      aria-labelledby="about-network-heading"
    >
      <div className="mx-auto w-full max-w-5xl text-center">
        <p
          id="about-network-heading"
          className="text-xs font-medium tracking-[0.2em] text-black/40 uppercase"
        >
          Our network
        </p>

        <p className="mt-10 font-oswald text-[clamp(1.75rem,5vw,3.75rem)] font-bold leading-[1.22] tracking-[-0.02em] text-[#0c1222] md:mt-12 md:leading-[1.2]">
          SFPlayground is a curated Silicon Valley network connecting
          <InlinePhoto {...INLINE_IMAGES[0]} />
          founders, investors, family offices, and operators through
          <InlinePhoto {...INLINE_IMAGES[1]} />
          high-signal events, trusted introductions, and
          <InlinePhoto {...INLINE_IMAGES[2]} />
          early-stage dealflow.
        </p>

        <Link
          href={`mailto:${CONTACT_EMAIL}?subject=Get%20involved%20with%20SF%20Playground`}
          className="mt-12 inline-flex items-center justify-center rounded-full bg-[#0c1222] px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85 md:mt-14 md:px-10 md:py-4 md:text-base"
        >
          Get Involved
        </Link>
      </div>
    </section>
  );
}
