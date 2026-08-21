import type { Metadata } from "next";
import ShowroomPage from "@/components/showroom/showroom-page";

export const metadata: Metadata = {
  title: "The Showroom | SFPLAYGROUND",
  description:
    "The Showroom by SFPLAYGROUND: a one-day luxury technology store at 800 Market Street in San Francisco.",
  alternates: {
    canonical: "/showroom",
  },
  openGraph: {
    title: "The Showroom | SFPLAYGROUND",
    description:
      "See it. Try it. Take it home. A one-day luxury technology store for robotics, wearables, AI devices, smart home, mobility and consumer hardware.",
    images: [
      {
        url: "/images/showroom-hero-generated.png",
        width: 1680,
        height: 920,
        alt: "The Showroom by SFPLAYGROUND",
      },
    ],
  },
};

export default function Page() {
  return <ShowroomPage />;
}
