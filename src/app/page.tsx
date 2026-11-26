import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Nav from "@/components/nav";
import HomepageSections from "@/components/homepage-sections";
import ImmersiveHero from "@/components/v1/immersive-hero";
import RevealTitle from "@/components/v1/reveal-title";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "SFPlayground — Step inside",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default async function HomePage() {
  const markup = await readFile(
    path.join(process.cwd(), "public/v1-experience/hero.html"),
    "utf8",
  );
  return (
    <div className="min-h-screen bg-white">
      <Nav transparentUntil="section[aria-labelledby='upcoming-events-heading']" />
      <main>
        <a
          className="sr-only focus:not-sr-only"
          href="#upcoming-events-heading"
        >
          Skip the visual tour
        </a>
        <ImmersiveHero markup={markup} />
        <RevealTitle />

        <HomepageSections />
      </main>
    </div>
  );
}
