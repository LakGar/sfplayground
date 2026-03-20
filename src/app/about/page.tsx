import type { Metadata } from "next";
import AboutView from "./about-view";

export const metadata: Metadata = {
  title: "About Us | SF Playground",
  description:
    "Learn about SF Playground — live startup pitches in San Francisco, crowd signal, and real investor decisions.",
  alternates: {
    canonical: "https://sfplayground.com/about",
  },
  openGraph: {
    title: "About Us | SF Playground",
    description:
      "Live startup pitches and real investor decisions — built in San Francisco.",
    url: "https://sfplayground.com/about",
  },
};

export default function AboutPage() {
  return <AboutView />;
}
