import { INSTAGRAM_PROFILE } from "@/data/social-links";

export const SPONSOR_HERO = {
  title: "SPONSORSHIP",
  subtitle:
    "Connect with startups, investors, and customers through live experiences designed to surface stronger signal, meaningful relationships, and real dealflow.",
  tagline:
    "Bay Area's fastest growing venture network, built around high-signal rooms and real business relationships.",
  ctaLabel: "Start Sponsorship inquiry",
  ctaHref: "/sponsors/apply",
} as const;

export const SPONSOR_HERO_LETTER_IMAGES = [
  "/images/previous-events/capitalnight.avif",
  "/images/salesforce-summit/group-overhead.jpg",
  "/images/previous-events/capital.jpeg",
  "/images/salesforce-summit/venture-network-panel.jpg",
  "/images/previous-events/harvard.jpg",
  "/images/immigrant-founders-night/founder-handshake.jpg",
  "/images/previous-events/aerospace-defense.png",
  "/images/hero1.JPG",
  "/images/salesforce-summit/step-repeat.jpg",
] as const;

export const SPONSOR_HERO_CAROUSEL = [
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
    src: "/images/salesforce-summit/venture-network-panel.jpg",
    alt: "Venture network panel at Salesforce Tower",
  },
  { src: "/images/previous-events/pitch.png", alt: "Pitch Playoffs" },
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
] as const;

/** Shared page shell — one continuous gradient across the sponsors experience */
export const SPONSOR_PAGE_SHELL =
  "min-h-screen bg-linear-to-b from-white from-0% via-[#f3f3f1] via-[38%] via-white via-[72%] to-[#ececea] to-100% text-black";

export const SPONSOR_STATS = [
  {
    value: "50K+",
    label: "Members across founders, investors, executives, and operators.",
  },
  {
    value: "20",
    label: "Events in the last 4 months across SF and Silicon Valley.",
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

export const SPONSOR_AUDIENCE = [
  {
    label: "Founders",
    detail:
      "Pre-seed to Series A builders raising capital, finding customers, and looking for credible partners.",
  },
  {
    label: "Investors",
    detail:
      "VCs, angels, family offices, and ecosystem operators looking for curated dealflow.",
  },
  {
    label: "Operators",
    detail:
      "Technical leaders, GTM builders, corporate innovation teams, and category experts.",
  },
] as const;

export const SPONSOR_DELIVERABLES = [
  {
    title: "Build trust early",
    description:
      "Reach founders before they choose legal, immigration, banking, recruiting, or advisory partners.",
  },
  {
    title: "Own thought leadership",
    description:
      "Lead conversations on visas, company formation, IP, fundraising, market entry, or founder support.",
  },
  {
    title: "Create qualified relationships",
    description:
      "Use curated introductions, opt-in attendee access, and private networking to turn visibility into follow-up.",
  },
  {
    title: "Stand with the mission",
    description:
      "Align your brand with immigrant entrepreneurship and the next generation of American companies.",
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
      title: "25K+ connections",
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
    eyebrow: "Visa 2 Venture",
    name: "Presenting Title Partner",
    investment: "$14,995",
    description:
      "Category exclusivity — the lead partner designation for Visa 2 Venture.",
    highlights: [
      "Remarks on stage for 15 minutes",
      "Event host thanks your company in opening and closing remarks",
      "Category exclusivity at this level (e.g. only one law firm or VC firm)",
      "Curated 1:1 introductions with up to eight attendees you select",
      '"Title Partner" designation',
      "Premium logo placement across website, emails, and materials",
      "Pre- and post-event attendee list (opt-in) with contact info",
      "Moderate or speak on two sessions, subject to approval",
      "Opportunities to raffle a prize and collect business cards at event",
      "7 tickets for staff or clients",
      "Facilitate 2 roundtable sessions aligned with your expertise",
      "Up to three banners or signage on stage, in meal areas, and demo showcase",
      "Demo table in demo showcase during reception",
    ],
    featured: true,
  },
  {
    eyebrow: "Visa 2 Venture",
    name: "Flagship Event Partner",
    investment: "$9,995",
    description:
      "High-visibility partner with stage time, introductions, and roundtable leadership.",
    highlights: [
      "Remarks on stage for 10 minutes",
      "Event host thanks your company in opening and closing remarks",
      "Curated 1:1 introductions with up to six investor attendees you select",
      "Logo on website, invites, and materials",
      "Moderate or speak on one session, subject to approval",
      "Post-event attendee list (opt-in) with contact info",
      "5 tickets for staff or clients",
      "Facilitate 2 roundtable sessions aligned with your expertise",
      "One banner or signage on stage",
      "Demo table in demo showcase during cocktail party",
    ],
    featured: false,
  },
  {
    eyebrow: "Visa 2 Venture",
    name: "Founder Access Partner",
    investment: "$4,995",
    description:
      "Stage presence and curated investor access for founder-facing brands.",
    highlights: [
      "Remarks on stage for 4 minutes",
      "Event host thanks your company in opening and closing remarks",
      "Logo on event slideshow or screen loop",
      "Logo on website, invites, and materials",
      "Curated 1:1 introductions with up to three investor attendees you select",
      "Post-event attendee list (opt-in)",
      "4 tickets for staff or clients",
      "Facilitate 1 roundtable session aligned with your expertise",
      "Demo table in demo showcase during reception",
    ],
    featured: false,
  },
  {
    eyebrow: "Visa 2 Venture",
    name: "Roundtable Partner",
    investment: "$2,495",
    description:
      "Lead a roundtable session with full event access and brand visibility.",
    highlights: [
      "Remarks on stage for 1 minute",
      "Logo on website, invites, and materials",
      "Full event access",
      "Company name mentioned in closing remarks",
      "Facilitate one roundtable session aligned with your expertise",
      "3 tickets for staff or clients",
      "Advance attendee list (names, companies, titles — no contacts)",
      "Demo table in demo showcase during reception",
    ],
    featured: false,
  },
  {
    eyebrow: "Visa 2 Venture",
    name: "Event Sponsor",
    investment: "$1,495",
    description:
      "Logo visibility, curated introductions, and a demo table at reception.",
    highlights: [
      "Logo on website, event poster, speaker posters, and invitations",
      "At least 1 curated introduction to relevant founders, investors, or partners",
      "Company name mentioned in closing remarks",
      "Demo table during reception (table, linen, custom flyer with QR code)",
      "Advance attendee list (names, companies, titles — no contacts)",
      "3 tickets for staff or clients",
    ],
    featured: false,
  },
  {
    eyebrow: "Visa 2 Venture",
    name: "Basic Community Partner",
    investment: "$995",
    description:
      "Entry-level visibility with demo showcase presence and team passes.",
    highlights: [
      "2 tickets for staff or clients",
      "Company name and link listed on website",
      "Logo placement on marketing materials",
      "Demo table in demo showcase during reception",
    ],
    featured: false,
  },
] as const;

export const SPONSORSHIP_ADDONS = [
  {
    name: "Full attendee list with contacts",
    price: "$5.00 per contact",
    description:
      "Attendee contact list with name, company, role, LinkedIn, email, and phone number. Add $250 for up to two custom registration questions to identify relevant attendee needs and follow-up opportunities.",
  },
  {
    name: "Print or create your signage",
    price: "$695 – $1,195",
    description:
      "We create and print a co-branded 33\" × 77\" banner or 8' × 10' backdrop featuring both SFPlayground and your logos.",
  },
  {
    name: "Post-event resource amplification",
    price: "~$0.25/person ($500 minimum)",
    description:
      "Email and SMS blast your materials to 15,000+ recipients in our network.",
  },
  {
    name: "Meal or cocktail party sponsor",
    price: "$2,995 – $4,995",
    description:
      "Branded materials and signage during breaks, lunch, or cocktail party. May include additional food fees. Host at your nearby office or restaurant; higher rate includes additional benefits.",
  },
  {
    name: "Badge or lanyard sponsor",
    price: "$995 each · both for $1,495",
    description:
      "Your logo on badges or lanyards, subject to approval, with 2 tickets included.",
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
      "Yes. Many partners start with one flagship event like Pitch Playoffs or Capital Night, then expand into a series or title partnership once we align on format and audience.",
  },
  {
    question: "What deliverables are included?",
    answer:
      "Packages include logo placement, stage or roundtable opportunities, curated introductions, team passes, and demo showcase access depending on tier. See Visa 2 Venture tiers above or share your goals — we will send a custom one-pager after intake.",
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
