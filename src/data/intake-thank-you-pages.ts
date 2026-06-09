import type { IntakeKind } from "@/lib/intake-types";
import { INSTAGRAM_PROFILE } from "@/data/social-links";

export type IntakeThankYouPage = {
  eyebrow: string;
  subheadline: string;
  body: string;
  steps: { title: string; description: string }[];
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  accent: string;
};

const MAILTO = "mailto:staff@sfplaygroundai.com";

/** Base templates; headline and body are personalized at runtime via personalizeThankYouPage. */
export const INTAKE_THANK_YOU_PAGES: Record<IntakeKind, IntakeThankYouPage> = {
  startups: {
    eyebrow: "Application received",
    subheadline: "Your startup is in our review queue.",
    body: "",
    steps: [],
    primaryCta: { href: "/pitch-playoffs", label: "See Pitch Playoffs" },
    secondaryCta: { href: MAILTO, label: "Email the team" },
    accent: "#1a5c38",
  },
  vcs: {
    eyebrow: "Investor profile saved",
    subheadline: "We’ll curate the right room for you.",
    body: "",
    steps: [],
    primaryCta: { href: INSTAGRAM_PROFILE, label: "Past events on Instagram" },
    secondaryCta: { href: "/network", label: "Back to network" },
    accent: "#0c1222",
  },
  speakers: {
    eyebrow: "Speaker proposal received",
    subheadline: "We’re reviewing your program fit.",
    body: "",
    steps: [],
    primaryCta: { href: INSTAGRAM_PROFILE, label: "See events on Instagram" },
    secondaryCta: { href: MAILTO, label: "Email the team" },
    accent: "#5c3d1a",
  },
  sponsors: {
    eyebrow: "Partnership inquiry received",
    subheadline: "You’re on our partnerships radar.",
    body: "",
    steps: [],
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
