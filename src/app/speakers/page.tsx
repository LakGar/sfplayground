import type { Metadata } from "next";
import { IntakePageLayout } from "@/component/intake/intake-page-layout";
import { IntakeBodySection } from "@/component/intake/intake-body-section";
import { SpeakersIntakeForm } from "@/component/intake/speakers-intake-form";

export const metadata: Metadata = {
  title: "Speakers | SF Playground",
  description:
    "Propose a talk for SF Playground: operator- and investor-heavy audiences, thought leadership, and curated program fit.",
  alternates: { canonical: "https://sfplayground.com/speakers" },
};

export default function SpeakersIntakePage() {
  return (
    <IntakePageLayout
      heroImage={{ src: "/footer-bg.jpg", alt: "SF Playground — speakers" }}
      eyebrow="Program"
      title="Speak to a room of builders and people who deploy capital"
      subtitle="For leaders with earned perspective—founders, operators, and investors—who want visibility and sharp discourse through panels, fireside chats, or deep dives."
      outcomeLine="Share your topic and format preferences. We review each proposal and email you if there’s alignment with an upcoming theme or program."
    >
      <IntakeBodySection
        whyTitle="Why speak at SF Playground"
        whyBody="Programs are built for an audience that rewards technical depth and real experience. We match speakers to themes where you have credible authority—not generic slots that dilute your brand."
        valuePoints={[
          {
            title: "Audience quality",
            body: "Dense with founders and investors who stay for Q&A—questions stay grounded in execution.",
          },
          {
            title: "Thought leadership",
            body: "Room for frameworks, lessons learned, and debate worthy of your track record.",
          },
          {
            title: "Format fit",
            body: "We place you where your expertise shines—panel, fireside, workshop, or deep technical dive.",
          },
          {
            title: "Operator-first community",
            body: "Programmed for people who’ve shipped, invested, or run the full cycle—not passive spectators.",
          },
        ]}
        formMicrocopy="We review every speaker submission personally. If we move forward, you’ll hear directly from the SF Playground team by email."
      >
        <SpeakersIntakeForm />
      </IntakeBodySection>
    </IntakePageLayout>
  );
}
