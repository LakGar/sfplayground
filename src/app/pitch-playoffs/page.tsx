import type { Metadata } from "next";
import PitchPlayoffsPage from "@/components/pitch-playoffs/pitch-playoffs-page";
import { PP_OG_IMAGE } from "@/data/pitch-playoffs-unsplash";

export const metadata: Metadata = {
  title: "Pitch Playoffs | SFPLAYGROUND",
  description:
    "Founders apply and demo in booths. Real customers vote. Top 3 pitch to a live VC panel. Apply as a startup or investor.",
  openGraph: {
    title: "Pitch Playoffs | SFPLAYGROUND",
    description:
      "Booth demos, crowd voting, and a live VC panel. Apply as a founder or investor.",
    images: [
      {
        url: PP_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Pitch Playoffs by SFPLAYGROUND",
      },
    ],
  },
};

export default function Page() {
  return <PitchPlayoffsPage />;
}
