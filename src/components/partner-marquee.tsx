import Image from "next/image";
import { PARTNER_BRANDS } from "@/data/partner-brands";

function PartnerLogo({ name, logo }: (typeof PARTNER_BRANDS)[number]) {
  return (
    <div className="flex shrink-0 items-center justify-center px-8 md:px-10">
      <div className="relative h-9 w-[7.5rem] opacity-60 grayscale transition-opacity duration-300 hover:opacity-90 hover:grayscale-0 md:h-10 md:w-[8.5rem]">
        <Image
          src={logo}
          alt={name}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 120px, 136px"
        />
      </div>
    </div>
  );
}

function PartnerTrack({ trackId }: { trackId: string }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={trackId === "b" ? true : undefined}
    >
      {PARTNER_BRANDS.map((partner) => (
        <PartnerLogo key={`${trackId}-${partner.name}`} {...partner} />
      ))}
    </div>
  );
}

export default function PartnerMarquee({
  className = "bg-[#f3f3f1]",
}: {
  className?: string;
}) {
  return (
    <section
      className={`py-8 md:py-10 ${className}`}
      aria-label="Partner companies"
    >
      <p className="mb-6 text-center text-[10px] font-medium tracking-[0.28em] text-black/35 uppercase md:mb-8">
        Partners &amp; friends
      </p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-scroll-partners">
          <PartnerTrack trackId="a" />
          <PartnerTrack trackId="b" />
        </div>
      </div>
    </section>
  );
}
