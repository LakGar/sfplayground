import type { Metadata } from "next";
import Nav from "@/components/nav";
import { IntakeThankYouFromParam } from "@/components/intake/intake-thank-you";
import { POPUP_MARKET_PAGE_SHELL } from "@/data/popup-market-page-data";

export const metadata: Metadata = {
  title: "Application Received | SFPLAYGROUND",
  robots: { index: false, follow: false },
};

export default function PopUpMarketApplyThankYouPage() {
  return (
    <div className={POPUP_MARKET_PAGE_SHELL}>
      <Nav />
      <main>
        <IntakeThankYouFromParam
          typeParam="popup-market"
          backHref="/popup-market/apply"
          backLabel="Back to application"
        />
      </main>
    </div>
  );
}
