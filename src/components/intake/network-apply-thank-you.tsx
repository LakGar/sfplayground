"use client";

import { useSearchParams } from "next/navigation";
import { IntakeThankYouFromParam } from "@/components/intake/intake-thank-you";

export default function NetworkApplyThankYou() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <IntakeThankYouFromParam
      typeParam={type}
      backHref="/network/apply"
      backLabel="Back to application"
    />
  );
}
