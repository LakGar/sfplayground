import type { Metadata } from "next";
import { NetworkPage } from "@/components/network/network-page";

export const metadata: Metadata = {
  title: "Join the Network | SFPLAYGROUND",
  description:
    "Apply to join SFPLAYGROUND — 50K+ people in our network of founders, investors, and operators across San Francisco and Silicon Valley live events.",
  openGraph: {
    title: "Join the Network | SFPLAYGROUND",
    description:
      "Join 50K+ people in our network — founders, investors, and operators across the Bay Area.",
  },
};

export default function Page() {
  return <NetworkPage />;
}
