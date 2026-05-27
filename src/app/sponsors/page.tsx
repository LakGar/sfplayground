import type { Metadata } from "next";
import { SponsorsPage } from "@/components/sponsors/sponsors-page";

export const metadata: Metadata = {
  title: "Sponsors | SFPLAYGROUND",
  description:
    "Partner with SFPLAYGROUND to reach founders, investors, and operators through live pitch events, summits, and curated programs across San Francisco and Silicon Valley.",
  openGraph: {
    title: "Sponsors | SFPLAYGROUND",
    description:
      "Put your brand in front of founders, investors, and operators through SFPLAYGROUND events and partnerships.",
  },
};

export default function Page() {
  return <SponsorsPage />;
}
