import type { Metadata } from "next";
import { NetworkPage } from "@/components/network/network-page";

export const metadata: Metadata = {
  title: "Join the Network | SFPLAYGROUND",
  description:
    "Apply to join SFPLAYGROUND — a curated network of founders, investors, and speakers across San Francisco and Silicon Valley live events.",
  openGraph: {
    title: "Join the Network | SFPLAYGROUND",
    description:
      "Founders, investors, and experts — apply to join high-signal rooms across the Bay Area.",
  },
};

export default function Page() {
  return <NetworkPage />;
}
