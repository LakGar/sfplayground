import type { Metadata } from "next";
import Nav from "@/components/nav";
import { IntakeThankYouFromParam } from "@/components/intake/intake-thank-you";
import { SPONSOR_PAGE_SHELL } from "@/data/sponsors-page-data";

export const metadata: Metadata = {
  title: "Inquiry Received | SFPLAYGROUND",
  robots: { index: false, follow: false },
};

export default function SponsorApplyThankYouPage() {
  return (
    <div className={SPONSOR_PAGE_SHELL}>
      <Nav />
      <main>
        <IntakeThankYouFromParam
          typeParam="sponsors"
          backHref="/sponsors/apply"
          backLabel="Back to inquiry"
        />
      </main>
    </div>
  );
}
