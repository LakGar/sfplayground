import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/nav";
import NetworkQuestionnaire from "@/components/network/network-questionnaire";
import { NETWORK_PAGE_SHELL } from "@/data/network-page-data";

export const metadata: Metadata = {
  title: "Apply to Join | SFPLAYGROUND",
  description:
    "Apply to join SFPLAYGROUND as a founder, investor, or speaker — a short step-by-step application.",
  robots: { index: false, follow: true },
};

function ApplyFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 pt-28">
      <p className="text-sm text-black/45">Loading application…</p>
    </div>
  );
}

export default function NetworkApplyPage() {
  return (
    <div className={NETWORK_PAGE_SHELL}>
      <Nav />
      <main>
        <Suspense fallback={<ApplyFallback />}>
          <NetworkQuestionnaire />
        </Suspense>
      </main>
    </div>
  );
}
