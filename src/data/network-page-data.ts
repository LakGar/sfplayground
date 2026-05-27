import type { IntakeKind } from "@/lib/intake-types";

export const NETWORK_PAGE_SHELL =
  "min-h-screen bg-linear-to-b from-white from-0% via-[#f3f3f1] via-[38%] via-[#fafaf8] via-[72%] to-white to-100%";

export const NETWORK_HERO = {
  eyebrow: "Join the network",
  title: "NETWORK",
  tagline:
    "Live events, real intros, and high-signal rooms across San Francisco and Silicon Valley.",
  ctaLabel: "Apply to join",
  ctaHref: "/network/apply",
} as const;

export const NETWORK_HERO_LETTER_IMAGES = [
  "/images/network1.JPG",
  "/images/hero1.JPG",
  "/images/hero2.png",
  "/images/hero3.png",
  "/images/hero4.png",
  "/images/previous-events/pitch.png",
  "/images/previous-events/capitalnight.avif",
  "/images/hero5.png",
] as const;

export const NETWORK_HERO_CAROUSEL = [
  { src: "/images/network1.JPG", alt: "SFPLAYGROUND community" },
  { src: "/images/network2.JPG", alt: "Networking at an event" },
  { src: "/images/network3.JPG", alt: "Founders and investors" },
  { src: "/images/previous-events/pitch.png", alt: "Pitch event" },
  { src: "/images/hero6.png", alt: "Live event" },
  { src: "/images/previous-events/capital.jpeg", alt: "Capital Night" },
  { src: "/images/hero7.jpeg", alt: "Summit" },
  { src: "/images/previous-events/stanford.png", alt: "Stanford program" },
] as const;

export const NETWORK_STATS = [
  { value: "15K+", label: "Founder, builder, and investor connections." },
  { value: "26", label: "Live events across SF and Silicon Valley." },
  { value: "3m+", label: "Capital raised by startups in our ecosystem." },
  { value: "97%", label: "Community satisfaction across programs." },
] as const;

export const NETWORK_PATHS = [
  {
    id: "startups" as const,
    title: "Founders & startups",
    description:
      "Pitch nights, investor intros, and programs built for teams raising and growing in the Bay Area.",
    tone: "dark" as const,
  },
  {
    id: "vcs" as const,
    title: "Investors & VCs",
    description:
      "Curated dealflow, judging panels, and rooms aligned to your thesis, stage, and sector focus.",
    tone: "cream" as const,
  },
  {
    id: "speakers" as const,
    title: "Speakers & experts",
    description:
      "Fireside slots, keynotes, and panels in front of founders, investors, and operators.",
    tone: "stone" as const,
  },
] as const;

export const NETWORK_WHY_MASONRY = {
  headline: "Built for people who show up.",
  subline:
    "Whether you're building, investing, or sharing expertise — SFPLAYGROUND is a curated room, not a mailing list.",
  tiles: {
    hero: {
      tag: "Live events",
      title: "Rooms that actually matter.",
      description:
        "Pitch Playoffs, Capital Night, summits, and founder dinners across San Francisco and Silicon Valley.",
      image: "/images/network2.JPG",
      alt: "SFPLAYGROUND live event",
    },
    pitch: {
      tag: "For founders",
      title: "Pitch. Connect. Raise.",
      image: "/images/previous-events/pitch.png",
      alt: "Founders pitching",
    },
    capital: {
      tag: "For investors",
      title: "Dealflow on demand.",
      image: "/images/previous-events/capitalnight.avif",
      alt: "Investors at Capital Night",
    },
    community: {
      tag: "Community",
      title: "15K+ in the network",
      image: "/images/network3.JPG",
      alt: "Community gathering",
    },
    cta: {
      title: "Ready to join? Tell us who you are — we'll route you to the right path.",
      description:
        "A short application. No spam, no mass outreach — we review every submission personally.",
      href: "/network/apply",
      label: "Start application",
    },
  },
} as const;

export const NETWORK_FAQ = [
  {
    question: "Who can join SFPLAYGROUND?",
    answer:
      "Founders and startups, active investors and VCs, and speakers or experts with relevant experience. We review each application for fit with upcoming programs and community quality.",
  },
  {
    question: "Is there a membership fee?",
    answer:
      "Joining the network is application-based. Some events and programs may have separate registration — we'll always be clear about costs upfront.",
  },
  {
    question: "How do founders get on stage?",
    answer:
      "Apply as a startup, share your stage and fundraising context, and our team will follow up if there's a fit for an upcoming pitch night or program like Pitch Playoffs.",
  },
  {
    question: "How quickly will I hear back?",
    answer:
      "We read every application personally. If there's alignment with an upcoming event or intro flow, expect a reply within a few business days.",
  },
] as const;

export const NETWORK_ROLES: {
  id: IntakeKind;
  label: string;
  description: string;
}[] = [
  {
    id: "startups",
    label: "Founder / Startup",
    description: "I'm building a company and want access to investors and programs.",
  },
  {
    id: "vcs",
    label: "Investor / VC",
    description: "I'm investing and want curated dealflow and event access.",
  },
  {
    id: "speakers",
    label: "Speaker / Expert",
    description: "I want to speak at SFPLAYGROUND events.",
  },
];

export const STARTUP_STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B+",
  "Bootstrapped",
] as const;

export const TEAM_SIZES = ["1–3", "4–10", "11–25", "26+"] as const;

export const VC_CHECK_SIZES = [
  "Under $250K",
  "$250K – $1M",
  "$1M – $5M",
  "$5M+",
] as const;

export const VC_STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Growth",
  "Multi-stage",
] as const;

export const VC_GEO = [
  "San Francisco",
  "Silicon Valley",
  "Bay Area",
  "US-wide",
  "Global",
] as const;

export const SPEAKER_EVENT_TYPES = [
  "Pitch night",
  "Fireside chat",
  "Panel",
  "Keynote",
  "Workshop",
  "Dinner / salon",
] as const;

export type QuestionnaireStep = {
  id: string;
  title: string;
  subtitle: string;
  inputType: "text" | "email" | "tel" | "url" | "textarea" | "chips" | "role";
  field: string;
  placeholder?: string;
  options?: readonly string[];
  minLength?: number;
  skipIf?: (values: Record<string, string>) => boolean;
};

export const ROLE_SELECT_STEP: QuestionnaireStep = {
  id: "role",
  title: "How do you want to join?",
  subtitle: "We'll tailor the next questions to your path.",
  inputType: "role",
  field: "role",
};

export const STARTUP_QUESTIONNAIRE: QuestionnaireStep[] = [
  {
    id: "startupName",
    title: "What's your startup called?",
    subtitle: "The company or project name you're building.",
    inputType: "text",
    field: "startupName",
    placeholder: "Acme AI",
  },
  {
    id: "founderName",
    title: "Founder name?",
    subtitle: "Primary point of contact for our team.",
    inputType: "text",
    field: "founderName",
    placeholder: "First and last name",
  },
  {
    id: "email",
    title: "Best email?",
    subtitle: "We reply personally — no automated sequences.",
    inputType: "email",
    field: "email",
    placeholder: "you@startup.com",
  },
  {
    id: "website",
    title: "Website or deck link?",
    subtitle: "Where we can learn more about what you're building.",
    inputType: "url",
    field: "website",
    placeholder: "https://",
  },
  {
    id: "phone",
    title: "Phone number?",
    subtitle: "Optional for faster follow-up on event days.",
    inputType: "tel",
    field: "phone",
    placeholder: "+1 (555) 000-0000",
  },
  {
    id: "stage",
    title: "What stage are you at?",
    subtitle: "Helps us match you with the right rooms.",
    inputType: "chips",
    field: "stage",
    options: STARTUP_STAGES,
  },
  {
    id: "industry",
    title: "Industry or category?",
    subtitle: "e.g. AI, fintech, climate, consumer.",
    inputType: "text",
    field: "industry",
    placeholder: "B2B SaaS / AI",
  },
  {
    id: "description",
    title: "Describe what you're building.",
    subtitle: "One sentence — clear and specific.",
    inputType: "textarea",
    field: "description",
    placeholder: "We help…",
    minLength: 15,
  },
  {
    id: "fundraising",
    title: "Are you fundraising now?",
    subtitle: "Select the option that fits today.",
    inputType: "chips",
    field: "fundraising",
    options: ["Yes", "No"] as const,
  },
  {
    id: "roundAndTarget",
    title: "Round and target amount?",
    subtitle: "e.g. Seed, raising $2M.",
    inputType: "text",
    field: "roundAndTarget",
    placeholder: "Seed — $1.5M target",
    skipIf: (v) => v.fundraising !== "Yes",
  },
  {
    id: "teamSize",
    title: "Team size?",
    subtitle: "Full-time equivalents on the core team.",
    inputType: "chips",
    field: "teamSize",
    options: TEAM_SIZES,
  },
  {
    id: "lookingFor",
    title: "What are you looking for from SFPLAYGROUND?",
    subtitle: "Intros, pitch slot, community, customers — tell us.",
    inputType: "textarea",
    field: "lookingFor",
    placeholder: "We're looking for…",
    minLength: 20,
  },
];

export const VC_QUESTIONNAIRE: QuestionnaireStep[] = [
  {
    id: "firmName",
    title: "Firm or fund name?",
    subtitle: "How you show up in our investor community.",
    inputType: "text",
    field: "firmName",
    placeholder: "Acme Ventures",
  },
  {
    id: "investorName",
    title: "Your name?",
    subtitle: "Primary contact for invitations and follow-up.",
    inputType: "text",
    field: "investorName",
    placeholder: "First and last name",
  },
  {
    id: "email",
    title: "Best email?",
    subtitle: "For event invites and curated dealflow.",
    inputType: "email",
    field: "email",
    placeholder: "you@fund.com",
  },
  {
    id: "website",
    title: "Fund website?",
    subtitle: "Link to your firm or personal page.",
    inputType: "url",
    field: "website",
    placeholder: "https://",
  },
  {
    id: "phone",
    title: "Phone number?",
    subtitle: "Helpful for day-of event coordination.",
    inputType: "tel",
    field: "phone",
    placeholder: "+1 (555) 000-0000",
  },
  {
    id: "checkSize",
    title: "Typical check size?",
    subtitle: "Rough range is fine.",
    inputType: "chips",
    field: "checkSize",
    options: VC_CHECK_SIZES,
  },
  {
    id: "stageFocus",
    title: "Stage focus?",
    subtitle: "Where you most often invest.",
    inputType: "chips",
    field: "stageFocus",
    options: VC_STAGES,
  },
  {
    id: "sectorFocus",
    title: "Sector focus?",
    subtitle: "Themes, industries, or verticals you care about.",
    inputType: "text",
    field: "sectorFocus",
    placeholder: "AI, infra, fintech…",
  },
  {
    id: "geographicFocus",
    title: "Geographic focus?",
    subtitle: "Where you invest and attend events.",
    inputType: "chips",
    field: "geographicFocus",
    options: VC_GEO,
  },
  {
    id: "openToJudging",
    title: "Open to judging or on-stage feedback?",
    subtitle: "At pitch nights and live review formats.",
    inputType: "chips",
    field: "openToJudging",
    options: ["Yes", "No", "Sometimes"] as const,
  },
  {
    id: "startupsToMeet",
    title: "What kinds of startups do you want to meet?",
    subtitle: "Stage, sector, traction — be specific.",
    inputType: "textarea",
    field: "startupsToMeet",
    placeholder: "We're looking for…",
    minLength: 20,
  },
];

export const SPEAKER_QUESTIONNAIRE: QuestionnaireStep[] = [
  {
    id: "fullName",
    title: "Full name?",
    subtitle: "As you'd like to be introduced on stage.",
    inputType: "text",
    field: "fullName",
    placeholder: "First and last name",
  },
  {
    id: "email",
    title: "Best email?",
    subtitle: "For program coordination and scheduling.",
    inputType: "email",
    field: "email",
    placeholder: "you@email.com",
  },
  {
    id: "phone",
    title: "Phone number?",
    subtitle: "For day-of logistics if we host you.",
    inputType: "tel",
    field: "phone",
    placeholder: "+1 (555) 000-0000",
  },
  {
    id: "company",
    title: "Company or organization?",
    subtitle: "Where you're currently based professionally.",
    inputType: "text",
    field: "company",
    placeholder: "Company name",
  },
  {
    id: "roleTitle",
    title: "Role / title?",
    subtitle: "How you should be credited.",
    inputType: "text",
    field: "roleTitle",
    placeholder: "CEO, Partner, Professor…",
  },
  {
    id: "webOrLinkedin",
    title: "Website or LinkedIn?",
    subtitle: "So we can review your background.",
    inputType: "url",
    field: "webOrLinkedin",
    placeholder: "https://linkedin.com/in/…",
  },
  {
    id: "topicExpertise",
    title: "Topic expertise?",
    subtitle: "What you speak about best.",
    inputType: "text",
    field: "topicExpertise",
    placeholder: "Fundraising, GTM, AI infrastructure…",
  },
  {
    id: "speakingExperience",
    title: "Speaking experience?",
    subtitle: "Past stages, podcasts, or panels.",
    inputType: "textarea",
    field: "speakingExperience",
    placeholder: "I've spoken at…",
    minLength: 15,
  },
  {
    id: "whySpeak",
    title: "Why speak at SFPLAYGROUND?",
    subtitle: "What you want to share with this audience.",
    inputType: "textarea",
    field: "whySpeak",
    placeholder: "I'd love to…",
    minLength: 20,
  },
  {
    id: "preferredEventType",
    title: "Preferred event format?",
    subtitle: "Select what fits you best.",
    inputType: "chips",
    field: "preferredEventType",
    options: SPEAKER_EVENT_TYPES,
  },
];

export function getQuestionnaireForRole(
  role: IntakeKind | "",
): QuestionnaireStep[] {
  if (role === "startups") return STARTUP_QUESTIONNAIRE;
  if (role === "vcs") return VC_QUESTIONNAIRE;
  if (role === "speakers") return SPEAKER_QUESTIONNAIRE;
  return [];
}

export function getActiveSteps(role: IntakeKind | "", values: Record<string, string>) {
  const steps = getQuestionnaireForRole(role);
  return steps.filter((s) => !s.skipIf?.(values));
}
