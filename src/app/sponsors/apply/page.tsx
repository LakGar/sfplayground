import type { Metadata } from "next";
import Nav from "@/components/nav";
import SponsorQuestionnaire from "@/components/sponsors/sponsor-questionnaire";
import { SPONSOR_PAGE_SHELL } from "@/data/sponsors-page-data";

export const metadata: Metadata = {
  title: "Sponsor Inquiry | SFPLAYGROUND",
  description:
    "Start your SFPLAYGROUND sponsorship inquiry — a short step-by-step form to connect with our partnerships team.",
  robots: { index: false, follow: true },
};

export default function SponsorApplyPage() {
  return (
    <div className={SPONSOR_PAGE_SHELL}>
      <Nav />
      <main>
        <SponsorQuestionnaire />
      </main>
    </div>
  );
}
