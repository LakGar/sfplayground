import type { Metadata } from "next";
import { IntakePageLayout } from "@/component/intake/intake-page-layout";
import { IntakeBodySection } from "@/component/intake/intake-body-section";
import { SponsorsIntakeForm } from "@/component/intake/sponsors-intake-form";

export const metadata: Metadata = {
  title: "Sponsor SF Playground | Partnerships",
  description:
    "Partner with SF Playground: curated founders and investors, live events, and sponsorship packages built around your brand goals.",
  alternates: { canonical: "https://sfplayground.com/sponsors" },
};

export default function SponsorsIntakePage() {
  return (
    <IntakePageLayout
      heroImage={{ src: "/showcase.jpg", alt: "SF Playground — sponsor partnerships" }}
      eyebrow="Partnerships"
      title="Reach founders and investors in the room where deals take shape"
      subtitle="For brands and platforms that want live event presence, credible community alignment, and partnership structures tailored to your goals—not passive logo rows."
      outcomeLine="Submit the short form below. We read every inquiry personally and reply by email when timing, audience, and format are a strong match."
    >
      <IntakeBodySection
        whyTitle="Why sponsor SF Playground"
        whyBody="Our audience self-selects for builders and people who deploy capital around real demos and discourse. Sponsorship buys meaningful presence in those moments—and the option to co-design programming where it fits your roadmap, hiring, or GTM story."
        valuePoints={[
          {
            title: "Curated audience",
            body: "Founders, operators, and active investors in one room—aligned on substance, not spray-and-pray reach.",
          },
          {
            title: "Event-native visibility",
            body: "Stage, hospitality, and in-room moments where companies prove execution—not generic exhibitor rows.",
          },
          {
            title: "Tailored partnerships",
            body: "From a single flagship evening to multi-touch programs—we shape packages around what you need from the ecosystem.",
          },
          {
            title: "Community credibility",
            body: "Stand alongside an operator-first community that rewards proof over pitch—brand alignment that serious partners recognize.",
          },
        ]}
        formMicrocopy="We review every submission personally. If there isn’t a fit on the calendar, we’ll be direct—no obligation, no bulk outreach."
      >
        <SponsorsIntakeForm />
      </IntakeBodySection>
    </IntakePageLayout>
  );
}
