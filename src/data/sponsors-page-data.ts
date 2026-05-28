export const SPONSOR_HERO = {
  eyebrow: "Partnerships",
  title: "SPONSORS",
  subtitle:
    "Put your brand in front of founders, investors, and operators across San Francisco and Silicon Valley.",
  tagline:
    "Live events, real rooms, and measurable brand impact — from pitch nights to summits.",
  ctaLabel: "Start partnership inquiry",
  ctaHref: "/sponsors/apply",
} as const;

export const SPONSOR_HERO_LETTER_IMAGES = [
  "/images/previous-events/capitalnight.avif",
  "/images/previous-events/pitch.png",
  "/images/previous-events/capital.jpeg",
  "/images/previous-events/harvard.jpg",
  "/images/hero1.JPG",
  "/images/hero2.png",
  "/images/hero3.png",
  "/images/hero4.png",
] as const;

export const SPONSOR_HERO_CAROUSEL = [
  { src: "/images/previous-events/capitalnight.avif", alt: "Capital Night event" },
  { src: "/images/previous-events/pitch.png", alt: "Pitch Playoffs" },
  { src: "/images/previous-events/capital.jpeg", alt: "Capital event" },
  { src: "/images/previous-events/stanford.png", alt: "Stanford event" },
  { src: "/images/hero5.png", alt: "SFPLAYGROUND community" },
  { src: "/images/hero6.png", alt: "Networking event" },
  { src: "/images/previous-events/global.png", alt: "Global summit" },
  { src: "/images/hero7.jpeg", alt: "Founder event" },
] as const;

/** Shared page shell — one continuous gradient across the sponsors experience */
export const SPONSOR_PAGE_SHELL =
  "min-h-screen bg-linear-to-b from-white from-0% via-[#f3f3f1] via-[38%] via-[#fafaf8] via-[72%] to-white to-100%";

export const SPONSOR_STATS = [
  {
    value: "15K+",
    label: "Founder, builder, and investor connections in our network.",
  },
  {
    value: "26",
    label: "Live events in 2026 across SF and Silicon Valley.",
  },
  {
    value: "#1",
    label: "Fastest growing network in San Francisco.",
  },
  {
    value: "3m+",
    label: "Capital raised by startups in our ecosystem.",
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
  headline: "Partnership built for rooms that matter.",
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
      tag: "Pitch Playoffs",
      title: "Live founder energy.",
      image: "/images/previous-events/pitch.png",
      alt: "Pitch Playoffs event",
    },
    capital: {
      tag: "Capital Night",
      title: "Investors in the room.",
      image: "/images/previous-events/capital.jpeg",
      alt: "Capital Night networking",
    },
    community: {
      tag: "Community",
      title: "15K+ connections",
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
    },
    {
      title: "VC partners",
      description:
        "Curated dealflow, judging panels, and rooms full of founders raising — aligned to your thesis and stage.",
      tone: "cream" as const,
    },
    {
      title: "Media partners",
      description:
        "Co-branded content, event coverage, and distribution across programs that reach the Bay Area startup ecosystem.",
      tone: "stone" as const,
    },
  ],
} as const;

export const SPONSORSHIP_TIERS = [
  {
    name: "Event Partner",
    description: "High-visibility presence at a single flagship program.",
    highlights: [
      "Logo on event materials & recap",
      "On-site brand presence",
      "2–4 team passes",
      "Social mention in event promotion",
    ],
    featured: false,
  },
  {
    name: "Series Partner",
    description: "Recurring visibility across multiple events in a season.",
    highlights: [
      "Priority logo placement",
      "Speaking or fireside slot",
      "Curated founder intros",
      "Newsletter & social features",
    ],
    featured: true,
  },
  {
    name: "Title Sponsor",
    description: "Lead partner for a flagship SFPLAYGROUND experience.",
    highlights: [
      "Naming rights on select programs",
      "Keynote or judging participation",
      "Custom activation on-site",
      "Dedicated partnership lead",
    ],
    featured: false,
  },
] as const;

export const SPONSOR_INTERESTS = [
  "Pitch Playoffs",
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
  "Under $5K",
  "$5K – $15K",
  "$15K – $50K",
  "$50K – $100K",
  "$100K+",
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
      "Yes. Many partners start with one flagship event like Pitch Playoffs or Capital Night, then expand into a series or title partnership once we align on format and audience.",
  },
  {
    question: "What deliverables are included?",
    answer:
      "Packages typically include logo placement, on-site presence, team passes, social promotion, and optional speaking or activation slots. We share a custom one-pager after intake based on your tier and goals.",
  },
  {
    question: "How quickly will we hear back?",
    answer:
      "We review every sponsor inquiry personally. If there is a fit with an upcoming program, expect a reply within a few business days with next steps — no mass outreach.",
  },
] as const;

export type SponsorFormData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  companyType: string;
  sponsorshipBudgetRange: string;
  interestedIn: string[];
  goals: string;
};

export const SPONSOR_QUESTIONNAIRE_STEPS = [
  {
    id: "companyName",
    title: "What's your company called?",
    subtitle: "We'll use this to personalize your partnership proposal.",
    field: "companyName" as const,
    inputType: "text" as const,
    placeholder: "Acme Ventures",
  },
  {
    id: "contactName",
    title: "Who should we reach out to?",
    subtitle: "Your name as the main point of contact.",
    field: "contactName" as const,
    inputType: "text" as const,
    placeholder: "First and last name",
  },
  {
    id: "email",
    title: "Best email for follow-up?",
    subtitle: "We reply personally — no automated sequences.",
    field: "email" as const,
    inputType: "email" as const,
    placeholder: "you@company.com",
  },
  {
    id: "companyType",
    title: "What type of company are you?",
    subtitle: "Helps us match you with the right programs.",
    field: "companyType" as const,
    inputType: "chips" as const,
    options: COMPANY_TYPES,
  },
  {
    id: "budget",
    title: "What's your sponsorship budget range?",
    subtitle: "A rough range is fine — we'll tailor options from here.",
    field: "sponsorshipBudgetRange" as const,
    inputType: "chips" as const,
    options: BUDGET_RANGES,
  },
  {
    id: "interests",
    title: "Which programs interest you?",
    subtitle: "Select all that apply.",
    field: "interestedIn" as const,
    inputType: "multi-chips" as const,
    options: SPONSOR_INTERESTS,
  },
  {
    id: "goals",
    title: "What does success look like?",
    subtitle: "Brand visibility, pipeline, community — tell us your goals.",
    field: "goals" as const,
    inputType: "textarea" as const,
    placeholder: "We're looking to reach early-stage founders and co-host a pitch night…",
  },
] as const;
