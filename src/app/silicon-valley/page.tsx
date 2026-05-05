import type { Metadata } from "next";
import React from "react";
import { SiliconValleyLanding } from "@/component/silicon-valley/silicon-valley-landing";

export const metadata: Metadata = {
  title: "Silicon Valley | SF Playground",
  description:
    "Silicon Valley — where Physical AI, capital, and builders meet. SF Playground.",
};

const SiliconValleyPage = () => {
  return <SiliconValleyLanding />;
};

export default SiliconValleyPage;
