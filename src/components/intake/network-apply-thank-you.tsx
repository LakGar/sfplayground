"use client";

import { useSearchParams } from "next/navigation";
import { IntakeThankYouFromParam } from "@/components/intake/intake-thank-you";

export default function NetworkApplyThankYou() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const name = searchParams.get("name");

  return (
    <IntakeThankYouFromParam
      typeParam={type}
      nameParam={name}
      backHref="/network/apply"
      backLabel="Back to application"
    />
  );
}
