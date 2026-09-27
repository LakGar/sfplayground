import { INSTAGRAM_PROFILE } from "@/data/social-links";
import { INTAKE_EVENT_OPTIONS } from "@/data/intake-event-options";

export const SPONSOR_HERO = {
  title: "SPONSORSHIP",
  subtitle:
    "Reach founders, investors, operators, and enterprise leaders through curated Bay Area events.",
  tagline:
    "Sponsorship and event partnerships built for brand visibility, product engagement, and qualified relationships.",
  ctaLabel: "Start Sponsorship inquiry",
  ctaHref: "/sponsors/apply",
} as const;

export const SPONSOR_HERO_LETTER_IMAGES = [
  "/images/ai-hospitality-summit/panel-wide.avif",
  "/images/salesforce-summit/group-overhead.jpg",
  "/images/ai-hospitality-summit/room-toast.avif",
  "/images/salesforce-summit/venture-network-panel.jpg",
  "/images/previous-events/harvard.jpg",
  "/images/immigrant-founders-night/founder-handshake.jpg",
  "/images/previous-events/aerospace-defense.png",
  "/images/hero1.JPG",
  "/images/salesforce-summit/step-repeat.jpg",
] as const;

export const SPONSOR_HERO_CAROUSEL = [
  {
    src: "/images/ai-hospitality-summit/panel-wide.avif",
    alt: "Panel discussion at the Finix-supported AI in Hospitality Summit",
  },
  {
    src: "/images/salesforce-summit/group-overhead.jpg",
    alt: "Group photo at a Salesforce Tower venture summit",
  },
  {
    src: "/images/immigrant-founders-night/lightning-pitch-room.jpg",
    alt: "Founder pitching to a full SFPLAYGROUND room",
  },
  {
    src: "/images/previous-events/capitalnight.avif",
    alt: "Capital Night event",
  },
  {
    src: "/images/ai-hospitality-summit/room-toast.avif",
    alt: "Partner moment during the AI in Hospitality Summit reception",
  },
  {
    src: "/images/salesforce-summit/venture-network-panel.jpg",
    alt: "Venture network panel at Salesforce Tower",
  },
  { src: "/images/immigrant-founders-night/demo-conversation.jpg", alt: "Founder demo showcase" },
  {
    src: "/images/previous-events/aerospace-defense.png",
    alt: "Aerospace and defense panel at SFPLAYGROUND",
  },
  { src: "/images/previous-events/capital.jpeg", alt: "Capital event" },
  {
    src: "/images/salesforce-summit/step-repeat.jpg",
    alt: "SFPLAYGROUND step and repeat sponsor moment",
  },
  {
    src: "/images/immigrant-founders-night/founder-handshake.jpg",
    alt: "Sponsor and founder handshake at an SFPLAYGROUND event",
  },
  { src: "/images/previous-events/stanford.png", alt: "Stanford event" },
  {
    src: "/images/salesforce-summit/audience-wide.jpg",
    alt: "Audience at a flagship SFPLAYGROUND summit",
  },
  { src: "/images/hero5.png", alt: "SFPLAYGROUND community" },
  {
    src: "/images/salesforce-summit/networking-conversation.jpg",
    alt: "SFPLAYGROUND community conversation",
  },
  {
    src: "/images/ai-hospitality-summit/network-conversation.avif",
    alt: "Hospitality leaders connecting after the panel",
  },
  {
    src: "/images/immigrant-founders-night/demo-conversation.jpg",
    alt: "Startup demo conversation during a sponsor-supported event",
  },
  { src: "/images/hero6.png", alt: "Networking event" },
  { src: "/images/previous-events/global.png", alt: "Global summit" },
  { src: "/images/hero7.jpeg", alt: "Founder event" },
  {
    src: "/images/salesforce-summit/panel-speaker-close.jpg",
    alt: "Panel speaker during an SFPLAYGROUND summit",
  },
  {
    src: "/images/ai-hospitality-summit/community-group.avif",
    alt: "AI in Hospitality Summit community at Finix",
  },
] as const;

/** Shared page shell — one continuous gradient across the sponsors experience */
export const SPONSOR_PAGE_SHELL =
  "min-h-screen bg-linear-to-b from-white from-0% via-[#f3f3f1] via-[38%] via-white via-[72%] to-[#ececea] to-100% text-black";

export const SPONSOR_STATS = [
  {
    value: "20K+",
    label: "Community network.",
  },
  {
    value: "1,010",
    label: "Approved registrations from the last 10 events.",
  },
  {
    value: "872",
    label: "Unique approved guests across recent programs.",
  },
  {
    value: "101",
    label: "Average approved guests per event.",
  },
] as const;

export const SPONSOR_AUDIENCE = [
  {
    label: "44% Founders",
    detail:
      "Pre-seed to Series A builders raising capital, finding customers, and looking for credible partners.",
  },
  {
    label: "29% Investors + LPs",
    detail:
      "VCs, angels, family offices, and ecosystem operators looking for curated dealflow.",
  },
  {
    label: "20% Executives",
    detail:
      "Enterprise leaders, GTM builders, corporate innovation teams, and category experts.",
  },
  {
    label: "32% Technical Leaders",
    detail:
      "Technical operators and builders who evaluate products, partners, and category expertise.",
  },
] as const;

export const SPONSOR_DELIVERABLES = [
  {
    title: "Brand visibility + product engagement",
    description:
      "Show up on event pages, posters, speaker graphics, invitations, and onsite demo moments.",
  },
  {
    title: "Authority + stage visibility",
    description:
      "Add stage remarks, priority logo placement, and sponsor recognition around curated programs.",
  },
  {
    title: "Curated introductions",
    description:
      "Turn visibility into follow-up through mutual opt-in introductions and relevant attendee access.",
  },
  {
    title: "Post-event fulfillment",
    description:
      "Core sponsors receive a concise report on delivered benefits and available performance data.",
  },
] as const;

export const SPONSOR_BENEFITS = [
  {
    title: "Curated audience",
    description:
      "Reach founders raising capital, active VCs, family offices, and operators — not generic conference foot traffic.",
  },
  {
    title: "Brand visibility",
    description:
      "Logo placement, stage presence, and content moments across events, recaps, and partner channels.",
  },
  {
    title: "Relationship access",
    description:
      "Get in the room for intros, deal flow, and conversations that matter to your growth or investment goals.",
  },
  {
    title: "Flexible formats",
    description:
      "Title sponsors, pitch night partners, summits, dinners, and custom activations built around your objectives.",
  },
] as const;

/** Masonry bento tiles for “Why partner with us” */
export const SPONSOR_PARTNER_MASONRY = {
  headline: "Reach the right audience for your brand.",
  subline:
    "High-signal events across San Francisco and Silicon Valley — where founders, investors, and operators actually show up.",
  tiles: {
    hero: {
      tag: "Flagship events",
      title: "Brand visibility where it counts.",
      description:
        "Stage presence, logo placement, and content moments across live programs and recaps.",
      image: "/images/previous-events/capitalnight.avif",
      alt: "SFPLAYGROUND flagship event at night",
    },
    pitch: {
      tag: "Founder showcases",
      title: "Live founder energy.",
      image: "/images/immigrant-founders-night/demo-conversation.jpg",
      alt: "Founder demo showcase event",
    },
    capital: {
      tag: "Capital Night",
      title: "Investors in the room.",
      image: "/images/previous-events/capital.jpeg",
      alt: "Capital Night networking",
    },
    community: {
      tag: "Community",
      title: "50K+ people in our network",
      image: "/images/network1.JPG",
      alt: "SFPLAYGROUND community",
    },
    cta: {
      title: "Make every sponsorship intentional, visible, and high-impact.",
      description:
        "From single-event partnerships to title programs — we shape packages around your goals, audience, and calendar.",
      href: "/sponsors/apply",
      label: "Start inquiry",
    },
  },
  accentCards: [
    {
      title: "Startup partners",
      description:
        "Get in front of investors, customers, and operators through live pitch nights, demos, and founder programs.",
      tone: "dark" as const,
      href: "/sponsors/apply",
    },
    {
      title: "VC partners",
      description:
        "Curated dealflow, judging panels, and rooms full of founders raising — aligned to your thesis and stage.",
      tone: "cream" as const,
      href: "/network/apply?type=vcs",
    },
    {
      title: "Media partners",
      description:
        "Co-branded content, event coverage, and distribution across programs that reach the Bay Area startup ecosystem.",
      tone: "stone" as const,
      href: INSTAGRAM_PROFILE,
      external: true,
    },
  ],
} as const;

export const SPONSORSHIP_TIERS = [
  {
    eyebrow: "Core package",
    name: "Event Sponsor",
    investment: "Shared after inquiry",
    description:
      "Brand visibility and product engagement for a single curated SFPLAYGROUND event.",
    highlights: [
      "Logo on event page, poster, speaker graphics, and invitations",
      "Turnkey demo booth with table, linen, and QR-code placard",
      "Closing-stage sponsor recognition",
      "At least one curated introduction",
      "Basic attendee roster: name, company, and title",
      "Team or client passes",
    ],
    featured: false,
  },
  {
    eyebrow: "Core package",
    name: "Premium Event Sponsor",
    investment: "Shared after inquiry",
    description:
      "Authority and stage visibility for sponsors who want a larger presence in the room.",
    highlights: [
      "All Event Sponsor benefits",
      "Priority logo placement",
      "Stage remarks, subject to approval",
      "At least two curated introductions total",
      "Additional team or client passes",
      "Limited premium availability per event",
    ],
    featured: true,
  },
] as const;

export const SPONSORSHIP_ADDONS = [
  {
    name: "Demo booth",
    price: "Shared after inquiry",
    description:
      "Turnkey demo space with table, QR placard, and team passes.",
  },
  {
    name: "4-minute spotlight",
    price: "Shared after inquiry",
    description:
      "Company remarks with content approval, limited by event format.",
  },
  {
    name: "Branded signage",
    price: "Shared after inquiry",
    description:
      "Co-branded banner or backdrop, including design and print support.",
  },
  {
    name: "Amplification",
    price: "Shared after inquiry",
    description:
      "Additional email or SMS campaign options scoped to the event audience.",
  },
  {
    name: "Opt-in leads",
    price: "Shared after inquiry",
    description:
      "Registration questions and lead fields for sponsors who need deeper follow-up.",
  },
  {
    name: "Planning + coordination",
    price: "Shared after inquiry",
    description:
      "Event strategy, budget, timeline, run of show, venue, vendor, registration, speaker, and guest coordination.",
  },
  {
    name: "Full-service production",
    price: "Shared after inquiry",
    description:
      "Planning support plus targeted guest sourcing, SFPLAYGROUND campaign distribution, onsite producing, staffing, and reporting.",
  },
] as const;

export const SPONSOR_INTERESTS = [
  "Founder showcases",
  "Capital Night",
  "Summits & keynotes",
  "Founder dinners",
  "Custom activations",
  "Media & content",
] as const;

export const COMPANY_TYPES = [
  "Venture fund",
  "Corporate / enterprise",
  "Service provider",
  "Media / platform",
  "Real estate / venue",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under $1,000",
  "$995 – $1,495",
  "$2,495 – $4,995",
  "$5,000 – $9,995",
  "$10,000 – $14,995",
  "$15,000+",
  "Custom sponsorship",
  "Not sure yet",
] as const;

export const SPONSOR_FAQ = [
  {
    question: "What kinds of companies sponsor SFPLAYGROUND?",
    answer:
      "Funds, corporates, service providers, media platforms, and growth-stage brands that want access to founders and investors in the Bay Area. We tailor packages to your goals — brand, pipeline, or community.",
  },
  {
    question: "Can we sponsor a single event?",
    answer:
      "Yes. Many partners start with one flagship event like a founder showcase or Capital Night, then expand into a series or title partnership once we align on format and audience.",
  },
  {
    question: "What deliverables are included?",
    answer:
      "Packages include logo placement, demo booth options, stage visibility, curated introductions, team passes, attendee roster access, and post-event reporting depending on fit and tier. We share exact package details after sponsor intake.",
  },
  {
    question: "How quickly will we hear back?",
    answer:
      "We review every sponsor inquiry personally. If there is a fit with an upcoming program, expect a reply within a few business days with next steps — no mass outreach.",
  },
] as const;

export type SponsorFormData = {
  companyName: string;
  logoUrl: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  companyType: string;
  eventInterest: string;
  sponsorshipBudgetRange: string;
  interestedIn: string[];
  goals: string;
  additionalInfoFileUrl: string;
};

export type SponsorQuestionnaireStep = {
  id: string;
  title: string;
  subtitle?: string;
  field: keyof SponsorFormData;
  inputType:
    | "text"
    | "email"
    | "textarea"
    | "chips"
    | "multi-chips"
    | "logo"
    | "document";
  placeholder?: string;
  options?: readonly string[];
  minWords?: number;
  optional?: boolean;
};

export const SPONSOR_QUESTIONNAIRE_STEPS: SponsorQuestionnaireStep[] = [
  {
    id: "companyName",
    title: "What's your company called?",
    subtitle: "We'll use this to personalize your partnership proposal.",
    field: "companyName",
    inputType: "text",
    placeholder: "Acme Ventures",
  },
  {
    id: "logoUrl",
    title: "Upload your company logo",
    subtitle: "We use this in sponsor materials and on-site branding.",
    field: "logoUrl",
    inputType: "logo",
  },
  {
    id: "contactName",
    title: "Who should we reach out to?",
    subtitle: "Your name as the main point of contact.",
    field: "contactName",
    inputType: "text",
    placeholder: "First and last name",
  },
  {
    id: "email",
    title: "Best email for follow-up?",
    subtitle: "We reply personally — no automated sequences.",
    field: "email",
    inputType: "email",
    placeholder: "you@company.com",
  },
  {
    id: "companyType",
    title: "What type of company are you?",
    subtitle: "Helps us match you with the right programs.",
    field: "companyType",
    inputType: "chips",
    options: COMPANY_TYPES,
  },
  {
    id: "eventInterest",
    title: "Which event should we talk about?",
    subtitle: "Pick an upcoming event, or choose General if the partnership is open-ended.",
    field: "eventInterest",
    inputType: "chips",
    options: INTAKE_EVENT_OPTIONS,
  },
  {
    id: "budget",
    title: "What's your sponsorship budget range?",
    subtitle: "A rough range is fine — we'll tailor options from here.",
    field: "sponsorshipBudgetRange",
    inputType: "chips",
    options: BUDGET_RANGES,
  },
  {
    id: "interests",
    title: "Which programs interest you?",
    subtitle: "Select all that apply.",
    field: "interestedIn",
    inputType: "multi-chips",
    options: SPONSOR_INTERESTS,
  },
  {
    id: "goals",
    title: "What does success look like?",
    subtitle: "Brand visibility, pipeline, community — tell us your goals.",
    field: "goals",
    inputType: "textarea",
    placeholder:
      "We're looking to reach early-stage founders and co-host a pitch night…",
    minWords: 4,
  },
  {
    id: "additionalInfoFileUrl",
    title: "Partnership deck or one-pager? (optional)",
    subtitle: "Helps us tailor options before we reply.",
    field: "additionalInfoFileUrl",
    inputType: "document",
    optional: true,
  },
];
