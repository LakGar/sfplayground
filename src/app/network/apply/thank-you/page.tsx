import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/nav";
import NetworkApplyThankYou from "@/components/intake/network-apply-thank-you";
import { NETWORK_PAGE_SHELL } from "@/data/network-page-data";

export const metadata: Metadata = {
  title: "Application Received | SFPLAYGROUND",
  robots: { index: false, follow: false },
};

function ThankYouFallback() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm text-black/45">Loading…</p>
    </div>
  );
}

export default function NetworkApplyThankYouPage() {
  return (
    <div className={NETWORK_PAGE_SHELL}>
      <Nav />
      <main>
        <Suspense fallback={<ThankYouFallback />}>
          <NetworkApplyThankYou />
        </Suspense>
      </main>
    </div>
  );
}
