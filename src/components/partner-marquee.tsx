import Image from "next/image";
import { PARTNER_BRANDS } from "@/data/partner-brands";

function PartnerLogo({
  name,
  logo,
  wide,
  tone = "light",
}: (typeof PARTNER_BRANDS)[number] & { tone?: "light" | "dark" }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-8 md:px-10">
      <div
        className={`relative h-9 opacity-70 grayscale transition-opacity duration-300 hover:opacity-100 hover:grayscale-0 md:h-10 ${
          tone === "dark" ? "brightness-0 invert" : ""
        } ${
          wide ? "w-[13rem] md:w-[17rem]" : "w-[7.5rem] md:w-[8.5rem]"
        }`}
      >
        <Image
          src={logo}
          alt={name}
          fill
          className="object-contain object-center"
          sizes={
            wide
              ? "(max-width: 768px) 208px, 272px"
              : "(max-width: 768px) 120px, 136px"
          }
        />
      </div>
    </div>
  );
}

function PartnerTrack({
  trackId,
  tone,
}: {
  trackId: string;
  tone: "light" | "dark";
}) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={trackId === "b" ? true : undefined}
    >
      {PARTNER_BRANDS.map((partner) => (
        <PartnerLogo key={`${trackId}-${partner.name}`} {...partner} tone={tone} />
      ))}
    </div>
  );
}

export default function PartnerMarquee({
  className = "bg-[#f3f3f1]",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const labelClass =
    tone === "dark" ? "text-white/45" : "text-black/35";

  return (
    <section
      className={`py-8 md:py-10 ${className}`}
      aria-label="Partner companies"
    >
      <p
        className={`mb-6 text-center text-[10px] font-medium tracking-[0.28em] uppercase md:mb-8 ${labelClass}`}
      >
        Partners &amp; friends
      </p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-scroll-partners">
          <PartnerTrack trackId="a" tone={tone} />
          <PartnerTrack trackId="b" tone={tone} />
        </div>
      </div>
    </section>
  );
}
