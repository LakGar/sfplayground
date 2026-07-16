import type { IntakeKind } from "@/lib/intake-types";

export const NETWORK_PAGE_SHELL =
  "min-h-screen bg-linear-to-b from-white from-0% via-[#f3f3f1] via-[38%] via-[#fafaf8] via-[72%] to-white to-100%";

export const NETWORK_HERO = {
  eyebrow: "Join the network",
  title: "NETWORK",
  tagline:
    "Live events, real intros, and high-signal rooms from San Francisco to Silicon Valley.",
  ctaLabel: "Apply to join",
  ctaHref: "/network/apply",
} as const;

export const NETWORK_HERO_LETTER_IMAGES = [
  "/images/network1.JPG",
  "/images/ID5A2804.JPG",
  "/images/ID5A2897.JPG",
  "/images/ID5A2913.png",
  "/images/IMG_0700.JPG",
  "/images/immigrant-founders-night/demo-conversation.jpg",
  "/images/salesforce-summit/group-overhead.jpg",
  "/images/previous-events/capitalnight.avif",
  "/images/salesforce-summit/networking-conversation.jpg",
] as const;

export const NETWORK_HERO_CAROUSEL = [
  { src: "/images/network1.JPG", alt: "SFPLAYGROUND community" },
  { src: "/images/network2.JPG", alt: "Networking at an event" },
  { src: "/images/network3.JPG", alt: "Founders and investors" },
  { src: "/images/ID5A2804.JPG", alt: "Crowd gathered at a SFPLAYGROUND event" },
  { src: "/images/ID5A2897.JPG", alt: "Founder speaking with event guests" },
  { src: "/images/ID5A2997.JPG", alt: "Audience watching a founder program" },
  { src: "/images/ID5A3105.JPG", alt: "Attendee portrait from a startup event" },
  {
    src: "/images/salesforce-summit/networking-conversation.jpg",
    alt: "Guests arriving for a founder gathering",
  },
  { src: "/images/IMG_0700.JPG", alt: "Event audience in conversation" },
  {
    src: "/images/immigrant-founders-night/lightning-pitch-room.jpg",
    alt: "Founder pitching at Immigrant Founders Pitch Night",
  },
  { src: "/images/IMG_0830.JPG", alt: "Panel moment at SFPLAYGROUND" },
  { src: "/images/previous-events/pitch.png", alt: "Pitch event" },
  { src: "/images/hero6.png", alt: "Live event" },
  { src: "/images/previous-events/capital.jpeg", alt: "Capital Night" },
  { src: "/images/hero7.jpeg", alt: "Summit" },
  { src: "/images/previous-events/stanford.png", alt: "Stanford program" },
  {
    src: "/images/salesforce-summit/venture-network-panel.jpg",
    alt: "Venture network panel at Salesforce Tower",
  },
  {
    src: "/images/salesforce-summit/audience-wide.jpg",
    alt: "Audience at a Salesforce Tower summit",
  },
  {
    src: "/images/salesforce-summit/roundtable-speaker.jpg",
    alt: "Founder speaking during a roundtable",
  },
  {
    src: "/images/immigrant-founders-night/demo-conversation.jpg",
    alt: "Founder demo conversation after a pitch session",
  },
  {
    src: "/images/salesforce-summit/group-overhead.jpg",
    alt: "SFPLAYGROUND summit group photo",
  },
] as const;

/** Extra pool for the network hero cursor trail (carousel + additional event photos). */
export const NETWORK_HERO_TRAIL_IMAGES = [
  ...NETWORK_HERO_CAROUSEL,
  { src: "/images/hero1.JPG", alt: "SFPLAYGROUND event" },
  {
    src: "/images/salesforce-summit/founder-skyline-portrait.jpg",
    alt: "Founders networking",
  },
  { src: "/images/hero3.png", alt: "Live pitch night" },
  { src: "/images/hero4.png", alt: "Community gathering" },
  { src: "/images/hero5.png", alt: "Bay Area startup event" },
  { src: "/images/hero8.JPG", alt: "Investors and founders" },
  { src: "/images/IMG_0632.JPG", alt: "Founder community discussion" },
  { src: "/images/IMG_0705.JPG", alt: "Networking moment at a live event" },
  { src: "/images/IMG_0715.JPG", alt: "Guests meeting between sessions" },
  { src: "/images/IMG_0848 (1).JPG", alt: "Founder speaking on stage" },
  { src: "/images/IMG_1098.JPG", alt: "Attendees connecting after an event" },
  { src: "/images/previous-events/capitalnight.avif", alt: "Capital Night" },
  { src: "/images/previous-events/harvard.jpg", alt: "Harvard x MIT event" },
  { src: "/images/previous-events/global.png", alt: "Global summit" },
  { src: "/images/previous-events/construction.jpeg", alt: "Deep tech summit" },
  {
    src: "/images/pitch-playoffs/booth-feedback.jpg",
    alt: "Guests giving feedback at Pitch Playoffs",
  },
  {
    src: "/images/pitch-playoffs/founder-conversation.jpg",
    alt: "Founder conversation at Pitch Playoffs",
  },
  {
    src: "/images/immigrant-founders-night/founder-handshake.jpg",
    alt: "Founders and partners connecting at a live event",
  },
  {
    src: "/images/pitch-playoffs/panel-presentation.jpg",
    alt: "Pitch Playoffs panel presentation",
  },
  {
    src: "/images/pitch-playoffs/presentation-room.jpg",
    alt: "Pitch Playoffs presentation room",
  },
] as const;

export const NETWORK_STATS = [
  { value: "50K+", label: "Founder, builder, and investor connections." },
  { value: "26", label: "Live events in 2026 across SF and Silicon Valley." },
  { value: "3m+", label: "Capital raised by startups in our ecosystem." },
  { value: "#1", label: "Fastest growing network in San Francisco." },
] as const;

export const NETWORK_PATHS = [
  {
    id: "startups" as const,
    tag: "Founders",
    title: "Founders & startups",
    tone: "dark" as const,
    applyLabel: "Apply as founder",
    who: {
      headline: "Building and raising in the Bay Area.",
      line: "Early-stage teams looking for pitch slots, investor intros, and operator access.",
      image: "/images/IMG_0848 (1).JPG",
      alt: "Founders pitching at SFPLAYGROUND",
    },
    why: {
      headline: "Launch faster. Raise smarter.",
      line: "Everything you need to get in front of the right people — and prove traction while you're there.",
      highlights: [
        "Demo opportunities",
        "Early customers",
        "Social proof",
        "Warm intros to investors",
        "Media exposure",
      ],
      image: "/images/ID5A2997.JPG",
      alt: "Founders at a SFPLAYGROUND event",
    },
  },
  {
    id: "vcs" as const,
    tag: "Investors",
    title: "Investors & VCs",
    tone: "cream" as const,
    applyLabel: "Apply as investor",
    who: {
      headline: "Active investors looking for dealflow.",
      line: "VCs, angels, and family offices who want vetted founders — not conference foot traffic.",
      image: "/images/ID5A2804.JPG",
      alt: "Investors at Capital Night",
    },
    why: {
      headline: "Dealflow and relationships, in one room.",
      line: "First look at founders raising — plus the network that surrounds them.",
      highlights: [
        "Introductions to family offices and LPS",
        "Early access to curated founders & builders",
        "Co-investment opportunities",
        "Media exposure ",
      ],
      image: "/images/previous-events/aerospace-defense.png",
      alt: "Investors and operators in a SFPLAYGROUND panel conversation",
    },
  },
  {
    id: "speakers" as const,
    tag: "Operators & experts",
    title: "Operators & experts",
    tone: "stone" as const,
    applyLabel: "Apply as operator or expert",
    who: {
      headline: "Operators and experts with something to share.",
      line: "Leaders who want keynotes, fireside slots, and panels in front of builders and backers.",
      image: "/images/ID5A3105.JPG",
      alt: "Operator or expert at a SFPLAYGROUND summit",
    },
    why: {
      headline: "Your expertise. The right stage.",
      line: "Share what you know with founders, investors, and operators who actually build and back companies.",
      highlights: [
        "Media exposure",
        "Keynotes & fireside slots",
        "High-signal audiences",
        "Visibility across programs",
      ],
      image: "/images/IMG_1098.JPG",
      alt: "Operator or expert speaking at a summit",
    },
  },
] as const;

export const NETWORK_PATHS_INTRO = {
  label: "Join the network",
  headline: "Connect with the brightest minds in the heart of tech.",
} as const;

export const NETWORK_FAQ = [
  {
    question: "Who can join SFPLAYGROUND?",
    answer:
      "Founders and startups, active investors and VCs, and operators or experts with relevant experience. We review each application for fit with upcoming programs and community quality.",
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
    description:
      "I'm building a company and want access to investors and programs.",
  },
  {
    id: "vcs",
    label: "Investor / VC",
    description: "I'm investing and want curated dealflow and event access.",
  },
  {
    id: "speakers",
    label: "Operator / Expert",
    description: "I want to share expertise at SFPLAYGROUND events.",
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
  inputType:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "textarea"
    | "chips"
    | "role"
    | "logo"
    | "document";
  field: string;
  placeholder?: string;
  options?: readonly string[];
  minLength?: number;
  minWords?: number;
  maxWords?: number;
  optional?: boolean;
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
    minWords: 3,
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
    minWords: 4,
  },
  {
    id: "pitchDeckUrl",
    title: "Upload your pitch deck",
    subtitle: "PDF or PowerPoint — we review every submission against upcoming programs.",
    inputType: "document",
    field: "pitchDeckUrl",
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
    id: "logoUrl",
    title: "Upload your firm logo",
    subtitle: "Square or horizontal PNG/JPG works best — we use it in our partner materials.",
    inputType: "logo",
    field: "logoUrl",
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
    minWords: 4,
  },
  {
    id: "additionalInfoFileUrl",
    title: "Additional materials? (optional)",
    subtitle: "Fund overview, investment memo, or anything helpful for curation.",
    inputType: "document",
    field: "additionalInfoFileUrl",
    optional: true,
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
    id: "logoUrl",
    title: "Upload your organization logo",
    subtitle: "Used when we feature you on programs and recaps.",
    inputType: "logo",
    field: "logoUrl",
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
    minWords: 3,
  },
  {
    id: "whySpeak",
    title: "Why speak at SFPLAYGROUND?",
    subtitle: "What you want to share with this audience.",
    inputType: "textarea",
    field: "whySpeak",
    placeholder: "I'd love to…",
    minWords: 4,
  },
  {
    id: "preferredEventType",
    title: "Preferred event format?",
    subtitle: "Select what fits you best.",
    inputType: "chips",
    field: "preferredEventType",
    options: SPEAKER_EVENT_TYPES,
  },
  {
    id: "additionalInfoFileUrl",
    title: "Additional materials? (optional)",
    subtitle: "Speaker bio, talk outline, or past recording — helps us place you faster.",
    inputType: "document",
    field: "additionalInfoFileUrl",
    optional: true,
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

export function getActiveSteps(
  role: IntakeKind | "",
  values: Record<string, string>,
) {
  const steps = getQuestionnaireForRole(role);
  return steps.filter((s) => !s.skipIf?.(values));
}
