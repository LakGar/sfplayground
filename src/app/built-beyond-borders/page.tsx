import type { Metadata } from "next";
import Nav from "@/components/nav";
import BbbHero from "@/components/built-beyond-borders/bbb-hero";

const OG_IMAGE = "https://sfplayground.com/images/events/built-beyond-borders.png";

export const metadata: Metadata = {
  title: "Built Beyond Borders | SFPLAYGROUND",
  description:
    "Built Beyond Borders — Visa 2 Venture Week by SFPLAYGROUND. Spotlighting immigrant founders in San Francisco.",
  openGraph: {
    title: "Built Beyond Borders | SFPLAYGROUND",
    description:
      "Visa 2 Venture Week — immigrant founders, investors, and partners in San Francisco.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Built Beyond Borders by SFPLAYGROUND",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Built Beyond Borders | SFPLAYGROUND",
    description:
      "Visa 2 Venture Week — immigrant founders in San Francisco.",
    images: [OG_IMAGE],
  },
};

export default function BuiltBeyondBordersPage() {
  return (
    <>
      <Nav />
      <main>
        <BbbHero />
      </main>
    </>
  );
}
