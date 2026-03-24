import type { ReactNode } from "react";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import { InnerPageHero } from "@/component/landing-main/inner-page-hero";

type HeroImage = { src: string; alt: string };

export function IntakePageLayout({
  heroImage,
  eyebrow,
  title,
  subtitle,
  /** One line under the subtitle: what happens after they submit (reduces scroll anxiety). */
  outcomeLine,
  children,
}: {
  heroImage: HeroImage;
  eyebrow: string;
  title: string;
  subtitle: string;
  outcomeLine?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-black">
      <Nav />
      <InnerPageHero
        variant="fullscreen"
        background="image"
        image={{ ...heroImage, priority: true }}
        contentWrapperClassName="flex min-h-[100svh] min-h-[100dvh] flex-col justify-center px-4 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">
          {eyebrow}
        </p>
        <h1 className="mt-5 font-oswald text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white md:text-6xl lg:text-[4rem]">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60 md:text-lg">
          {subtitle}
        </p>
        {outcomeLine ? (
          <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-relaxed text-white/45 md:text-base">
            {outcomeLine}
          </p>
        ) : null}
      </InnerPageHero>
      {children}
      <Footer />
    </div>
  );
}
