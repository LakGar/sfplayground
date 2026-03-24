import type { Metadata } from "next";
import { IntakePageLayout } from "@/component/intake/intake-page-layout";
import { IntakeBodySection } from "@/component/intake/intake-body-section";
import { StartupsIntakeForm } from "@/component/intake/startups-intake-form";

export const metadata: Metadata = {
  title: "Startups | Apply to SF Playground",
  description:
    "Apply to SF Playground for founder visibility, investor exposure, and ecosystem access—intake for AI, robotics, and frontier-tech teams.",
  alternates: { canonical: "https://sfplayground.com/startups" },
};

export default function StartupsIntakePage() {
  return (
    <IntakePageLayout
      heroImage={{ src: "/blog-hero.jpg", alt: "SF Playground — startups" }}
      eyebrow="Founders"
      title="Get considered for the nights where capital and builders actually show up"
      subtitle="This page is for founding teams who want visibility, feedback, and intros through SF Playground events and programs—when stage, traction, and room dynamics align."
      outcomeLine="Complete the intake. We review applications personally and email you if there’s a credible next step for an event, intro, or program."
    >
      <IntakeBodySection
        whyTitle="How SF Playground works for startups"
        whyBody="We use your answers to route you to the right formats—not every applicant gets a slot, but this is the fastest path onto our radar with the context we need to advocate for you internally."
        valuePoints={[
          {
            title: "Investor exposure",
            body: "When you fit, you can be surfaced in rooms where investors engage around demos and live Q&A—not cold lists.",
          },
          {
            title: "Founder visibility",
            body: "Stand alongside other serious builders in curated evenings designed for signal, not volume.",
          },
          {
            title: "Ecosystem access",
            body: "Pathways into programs, relevant intros, and peer relationships when thesis and timing line up.",
          },
          {
            title: "Human review",
            body: "Submissions are read by our team—we only reach out when there’s a real fit to explore.",
          },
        ]}
        formMicrocopy="We’ll follow up by email from the SF Playground team if there’s a strong fit for an upcoming event or collaboration—no automated blasts."
      >
        <StartupsIntakeForm />
      </IntakeBodySection>
    </IntakePageLayout>
  );
}
