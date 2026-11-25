import type { Metadata } from "next";
import { SiliconValleyLanding } from "@/components/silicon-valley/silicon-valley-landing";

export const metadata: Metadata = {
  title: "Silicon Valley Club | SFPLAYGROUND Membership",
  description: "A private community for founders, operators, and investors. Explore Silicon Valley Club and inquire about SFPLAYGROUND membership.",
  alternates: { canonical: "/silicon-valley" },
};

export default function Page() {
  return <SiliconValleyLanding />;
}
