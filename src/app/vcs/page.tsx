import type { Metadata } from "next";
import { IntakePageLayout } from "@/component/intake/intake-page-layout";
import { IntakeBodySection } from "@/component/intake/intake-body-section";
import { VcsIntakeForm } from "@/component/intake/vcs-intake-form";

export const metadata: Metadata = {
  title: "VCs & Investors | SF Playground",
  description:
    "SF Playground investor intake: curated founders, live diligence, and deal flow matched to your thesis and how you like to engage.",
  alternates: { canonical: "https://sfplayground.com/vcs" },
};

export default function VcsIntakePage() {
  return (
    <IntakePageLayout
      heroImage={{ src: "/events-bg.jpg", alt: "SF Playground — investors" }}
      eyebrow="Investors"
      title="Meet founders where conviction starts—in the room, on the record"
      subtitle="For funds and active angels who want curated introductions, live diligence, and early signal from how teams perform under real questions—not deck tours alone."
      outcomeLine="Tell us how you invest and how you like to participate. We email when your thesis overlaps a founder set or format we’re building."
    >
      <IntakeBodySection
        whyTitle="Built for investors who want signal, not noise"
        whyBody="We bias toward physical demos, fast feedback loops, and rooms where substance wins. This intake helps us match you to the right evenings, formats, and founders—whether you want to judge, attend, or simply meet companies ready for a serious conversation."
        valuePoints={[
          {
            title: "Early access",
            body: "Introduction paths to strong founders curated for stage, sector, and technical bar—not an unfiltered pipeline.",
          },
          {
            title: "Live signal",
            body: "See how teams handle Q&A and demos alongside peers—context you can’t replicate from a PDF alone.",
          },
          {
            title: "Curated flow",
            body: "We align founder profiles and event themes with how you actually deploy capital and spend time.",
          },
          {
            title: "Personal follow-up",
            body: "Every submission is reviewed; we reach out when there’s a meaningful match, not a mass invite.",
          },
        ]}
        formMicrocopy="We read every investor intake personally. Watch your inbox for a note from our team when there’s a fit."
      >
        <VcsIntakeForm />
      </IntakeBodySection>
    </IntakePageLayout>
  );
}
