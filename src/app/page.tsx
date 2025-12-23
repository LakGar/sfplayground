import Hero from "@/component/landing/hero";
import Nav from "@/component/landing/nav";
import About from "@/component/landing/about";
import Events from "@/component/landing/events";
import Sponsors from "@/component/landing/sponsors";
import Featured from "@/component/landing/featured";
import CTA from "@/component/landing/cta";
import Newsletter from "@/component/landing/newsletter";
import FAQ from "@/component/landing/faq";
import Footer from "@/component/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SF Playground | Live Startup Pitches & Real Investor Decisions",
  description: "Join SF Playground for live startup pitch events in San Francisco. Watch real-time investor decisions, discover success stories, and connect with VCs and founders.",
  alternates: {
    canonical: "https://sfplayground.com",
  },
};

const page = () => {
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <div id="about">
        <About />
      </div>
      <Sponsors />
      <div id="events">
        <Events />
      </div>
      <Featured />
      <div id="apply">
        <CTA />
      </div>
      <Newsletter />
      <div id="faq">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default page;
