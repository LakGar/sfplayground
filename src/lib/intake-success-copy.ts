import type { IntakeKind } from "@/lib/intake-types";

export const INTAKE_SUCCESS_COPY: Record<
  IntakeKind,
  { headline: string; body: string; links: { href: string; label: string }[] }
> = {
  sponsors: {
    headline: "You’re on our partnerships radar.",
    body: "We review every sponsor inquiry personally. If your goals align with an upcoming program or event, you’ll hear from us by email with a short path to next steps—no mass outreach.",
    links: [
      { href: "/events", label: "Browse past events" },
      { href: "/contact", label: "Email the team" },
    ],
  },
  startups: {
    headline: "Thanks — we have your snapshot.",
    body: "We’ll follow up if there’s a strong fit for an upcoming pitch night, intro, or program. Watch your inbox for a note from the SF Playground team.",
    links: [
      { href: "/events", label: "See the event format" },
      { href: "/contact", label: "Questions? Contact us" },
    ],
  },
  vcs: {
    headline: "Thanks for raising your hand.",
    body: "We read every investor submission. When your thesis lines up with a room we’re curating, we’ll reach out to invite you into the right evening or deal-review flow.",
    links: [
      { href: "/events", label: "Past events" },
      { href: "/contact", label: "Get in touch" },
    ],
  },
  speakers: {
    headline: "Received — we’ll review your program fit.",
    body: "Our team looks at each speaker proposal against upcoming themes and formats. If there’s a match, expect an email from us with timing and audience context.",
    links: [
      { href: "/events", label: "View events" },
      { href: "/blog", label: "Read the blog" },
    ],
  },
};
