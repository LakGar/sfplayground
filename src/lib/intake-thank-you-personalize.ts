import type { IntakeKind } from "@/lib/intake-types";
import type { IntakeThankYouPage } from "@/data/intake-thank-you-pages";
import { INTAKE_THANK_YOU_PAGES } from "@/data/intake-thank-you-pages";

export const INTAKE_THANK_YOU_STORAGE_KEY = "sfpg-intake-thank-you";

export type IntakeThankYouStored = {
  kind: IntakeKind;
  name: string;
};

export function formatFirstName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0] ?? trimmed;
}

export function storeIntakeThankYou(kind: IntakeKind, name: string): void {
  if (typeof window === "undefined") return;
  const payload: IntakeThankYouStored = {
    kind,
    name: name.trim(),
  };
  sessionStorage.setItem(INTAKE_THANK_YOU_STORAGE_KEY, JSON.stringify(payload));
}

export function readIntakeThankYou(): IntakeThankYouStored | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(INTAKE_THANK_YOU_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as IntakeThankYouStored;
    if (!parsed.kind || typeof parsed.name !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearIntakeThankYou(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(INTAKE_THANK_YOU_STORAGE_KEY);
}

export function getNetworkIntakeDisplayName(
  kind: IntakeKind,
  values: Record<string, string>,
): string {
  if (kind === "startups") return values.founderName ?? "";
  if (kind === "vcs") return values.investorName ?? "";
  if (kind === "speakers") return values.fullName ?? "";
  return "";
}

export type PersonalizedThankYou = IntakeThankYouPage & {
  headline: string;
  body: string;
  steps: { title: string; description: string }[];
};

export function personalizeThankYouPage(
  kind: IntakeKind,
  fullName: string,
): PersonalizedThankYou {
  const page = INTAKE_THANK_YOU_PAGES[kind];
  const first = formatFirstName(fullName);
  const you = first || "you";

  const copy = PERSONALIZED_COPY[kind](you, first);
  return {
    ...page,
    headline: first ? `Thank you, ${first}.` : "Thank you.",
    body: copy.body,
    steps: copy.steps,
  };
}

const PERSONALIZED_COPY: Record<
  IntakeKind,
  (you: string, first: string) => {
    body: string;
    steps: { title: string; description: string }[];
  }
> = {
  startups: (you, first) => ({
    body: first
      ? `${first}, we’ve got your deck and application. Our team reads every founder submission by hand — when there’s a fit for an upcoming pitch night, demo day, or intro program, you’ll hear from us directly at the email you provided.`
      : "We’ve got your deck and application. Our team reads every founder submission by hand — when there’s a fit for an upcoming program, you’ll hear from us directly.",
    steps: [
      {
        title: "We review your materials",
        description: first
          ? `${first}, we’ll read your deck and snapshot within a few business days.`
          : "We’ll read your deck and snapshot within a few business days.",
      },
      {
        title: "We find the right room",
        description:
          "If it’s a match, we’ll line you up with the right pitch slot, intros, or community touchpoints.",
      },
      {
        title: "You hear from us personally",
        description: first
          ? `Watch your inbox — we’ll email ${you} directly, not through a blast list.`
          : "Watch your inbox for a personal note from the SFPLAYGROUND team.",
      },
    ],
  }),
  vcs: (you, first) => ({
    body: first
      ? `${first}, your investor profile is saved. We’ll use your thesis, stage focus, and geography to invite you into curated evenings and deal-review rooms when they align with how you invest.`
      : "Your investor profile is saved. We’ll invite you into curated evenings when they align with your focus.",
    steps: [
      {
        title: "We map your lens",
        description: first
          ? `${first}, we’ll match your preferences to upcoming investor programs.`
          : "We’ll match your preferences to upcoming investor programs.",
      },
      {
        title: "We send a direct invite",
        description: first
          ? `When the room fits, ${you}’ll get a personal invite — no mass calendar spam.`
          : "When the room fits, you’ll get a personal invite.",
      },
      {
        title: "You meet the right founders",
        description:
          "Show up ready — we curate founders and operators who match your bar.",
      },
    ],
  }),
  speakers: (you, first) => ({
    body: first
      ? `${first}, thank you for raising your hand to speak. We weigh every proposal against upcoming themes and formats — if your expertise fits a panel, fireside, or keynote we’re building, we’ll reach out with timing and audience context.`
      : "Thank you for raising your hand to speak. We’ll reach out if your expertise fits an upcoming program.",
    steps: [
      {
        title: "We check program fit",
        description: first
          ? `${first}, we’ll line up your topics with live and upcoming SFPLAYGROUND formats.`
          : "We’ll line up your topics with live and upcoming formats.",
      },
      {
        title: "We coordinate with you",
        description: first
          ? `If selected, we’ll work with ${you} on prep, format, and audience.`
          : "If selected, we’ll work with you on prep, format, and audience.",
      },
      {
        title: "You take the stage",
        description:
          "Founders, investors, and operators — the room you want is the one we build.",
      },
    ],
  }),
  sponsors: (you, first) => ({
    body: first
      ? `${first}, your partnership inquiry is with our team. We read every sponsor submission personally — when your goals line up with an upcoming program, we’ll reply with tailored options for brand visibility, activations, and team passes.`
      : "Your partnership inquiry is with our team. We’ll reply personally when there’s a strong program fit.",
    steps: [
      {
        title: "We review your goals",
        description: first
          ? `${first}, we’ll read your budget range, interests, and what success looks like for your brand.`
          : "We’ll read your budget range, interests, and success metrics.",
      },
      {
        title: "We tailor options",
        description: first
          ? `We’ll put together partnership ideas built around what ${you} shared.`
          : "We’ll put together partnership ideas built around what you shared.",
      },
      {
        title: "We follow up by email",
        description: first
          ? `Expect a personal note for ${you} within a few business days.`
          : "Expect a personal reply within a few business days.",
      },
    ],
  }),
};
