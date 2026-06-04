import type { IntakeKind } from "@/lib/intake-types";
import { INSTAGRAM_PROFILE } from "@/data/social-links";

export type IntakeThankYouPage = {
  eyebrow: string;
  headline: string;
  body: string;
  steps: { title: string; description: string }[];
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  accent: string;
};

const MAILTO = "mailto:staff@sfplaygroundai.com";

export const INTAKE_THANK_YOU_PAGES: Record<IntakeKind, IntakeThankYouPage> = {
  startups: {
    eyebrow: "Application received",
    headline: "Your startup is in the queue.",
    body: "We review every founder submission against upcoming pitch nights, demo days, and intro programs. If there’s a fit, you’ll get a personal note from our team — not a mass blast.",
    steps: [
      {
        title: "Review",
        description: "We read your deck and snapshot within a few business days.",
      },
      {
        title: "Match",
        description: "We align you with the right room — pitch slot, intros, or community.",
      },
      {
        title: "Follow-up",
        description: "Watch your inbox for a note from SFPLAYGROUND.",
      },
    ],
    primaryCta: { href: "/pitch-playoffs", label: "See Pitch Playoffs" },
    secondaryCta: { href: MAILTO, label: "Email the team" },
    accent: "#1a5c38",
  },
  vcs: {
    eyebrow: "Investor profile saved",
    headline: "Thanks — we’ll curate the right room for you.",
    body: "Your thesis and preferences are on file. When we’re building an investor table or deal-review evening that matches your focus, we’ll reach out with a direct invite.",
    steps: [
      {
        title: "Profile review",
        description: "We map your stage, sector, and geo focus to upcoming programs.",
      },
      {
        title: "Room invite",
        description: "You’ll hear from us when a curated evening fits your lens.",
      },
      {
        title: "On-site",
        description: "Show up ready — founders and operators who match your bar.",
      },
    ],
    primaryCta: { href: INSTAGRAM_PROFILE, label: "Past events on Instagram" },
    secondaryCta: { href: "/network", label: "Back to network" },
    accent: "#0c1222",
  },
  speakers: {
    eyebrow: "Speaker proposal received",
    headline: "We’ll review your program fit.",
    body: "Each proposal is weighed against upcoming themes, formats, and audience. If your expertise lines up with a panel, fireside, or keynote we’re planning, we’ll email you with timing and context.",
    steps: [
      {
        title: "Program fit",
        description: "We match your topics to live and upcoming SFPLAYGROUND formats.",
      },
      {
        title: "Scheduling",
        description: "If selected, we coordinate prep and audience with you directly.",
      },
      {
        title: "Stage",
        description: "Show up ready to share — founders, investors, and operators in the room.",
      },
    ],
    primaryCta: { href: INSTAGRAM_PROFILE, label: "See events on Instagram" },
    secondaryCta: { href: MAILTO, label: "Email the team" },
    accent: "#5c3d1a",
  },
  sponsors: {
    eyebrow: "Partnership inquiry received",
    headline: "You’re on our partnerships radar.",
    body: "We review every sponsor inquiry personally. When your goals align with an upcoming program, you’ll get a tailored note with options — logo placement, activations, and team passes.",
    steps: [
      {
        title: "Goals review",
        description: "We read your budget range, interests, and success metrics.",
      },
      {
        title: "Custom options",
        description: "We put together programs that match your brand and pipeline goals.",
      },
      {
        title: "Next steps",
        description: "Expect a personal reply within a few business days.",
      },
    ],
    primaryCta: { href: INSTAGRAM_PROFILE, label: "See events on Instagram" },
    secondaryCta: { href: "/sponsors", label: "Back to sponsors" },
    accent: "#1a3d5c",
  },
};

export function isIntakeKind(value: string | null): value is IntakeKind {
  return (
    value === "startups" ||
    value === "vcs" ||
    value === "speakers" ||
    value === "sponsors"
  );
}
