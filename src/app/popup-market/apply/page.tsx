import type { Metadata } from "next";
import Nav from "@/components/nav";
import PopUpMarketQuestionnaire from "@/components/popup-market/popup-market-questionnaire";
import { POPUP_MARKET_PAGE_SHELL } from "@/data/popup-market-page-data";

export const metadata: Metadata = {
  title: "Pop-up Market Application | SFPLAYGROUND",
  description:
    "Apply for a SFPLAYGROUND pop-up market booth for physical product startups in consumer electronics, robotics, healthtech, and pet tech.",
  robots: { index: false, follow: true },
};

export default function PopUpMarketApplyPage() {
  return (
    <div className={POPUP_MARKET_PAGE_SHELL}>
      <Nav />
      <main>
        <PopUpMarketQuestionnaire />
      </main>
    </div>
  );
}
