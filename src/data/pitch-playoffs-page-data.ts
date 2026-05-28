import { unsplashUrl } from "./pitch-playoffs-unsplash";

export const PP_EVENT = {
  edition: "003",
  contactEmail: "staff@sfplaygroundai.com",
  startupApplyHref: "/network/apply?type=startups",
  investorApplyHref: "/network/apply?type=vcs",
  eventsHref: "https://www.instagram.com/sfplayground/",
  location: "San Francisco",
} as const;

export const PP_HERO = {
  title: "Pitch Playoffs",
  tagline: "Demo booths. Real customers. The room votes. Top 3 pitch live.",
  meta: `Edition ${PP_EVENT.edition} · ${PP_EVENT.location}`,
  avatars: [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/women/17.jpg",
  ],
  avatarMoreLabel: "and 859 more",
  steps: ["Apply", "Booth", "Customers", "Vote", "VC panel", "Intros"],
} as const;

export const PP_APPLY_PATHS = {
  label: "Get involved",
  headline: "Founder or investor — pick your path",
  paths: [
    {
      id: "startups",
      eyebrow: "For founders",
      title: "Apply to demo",
      description:
        "Early-stage teams with a product to show. Tell us what you'll demo — we'll follow up if there's a booth fit.",
      cta: "Startup application",
      href: PP_EVENT.startupApplyHref,
    },
    {
      id: "vcs",
      eyebrow: "For investors",
      title: "Join the panel room",
      description:
        "See founders after demo booths and crowd voting. Top 3 pitch live — you give real feedback, we handle intros.",
      cta: "Investor application",
      href: PP_EVENT.investorApplyHref,
    },
  ],
} as const;

export const PP_SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sfplayground/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sfplayground",
  },
  {
    label: "X",
    href: "https://x.com/sf_playgro27142",
  },
] as const;

export const PP_ABOUT = {
  label: "The format",
  headline: "Customer signal first. Investor time second.",
  body: "Most pitch nights optimize for slides. Pitch Playoffs optimizes for what early-stage teams actually need — real buyers at your booth, an honest read from the room, and a short list that earns a live VC conversation.",
  images: [
    {
      src: "/images/network1.JPG",
      alt: "Founders and investors networking on an outdoor terrace",
      layout: "landscape",
    },
    {
      src: "/images/hero7.jpeg",
      alt: "Attendees in conversation at a SFPLAYGROUND event",
      layout: "portrait",
    },
  ],
} as const;

export const PP_PROCESS = [
  {
    step: "01",
    title: "Founders apply",
    body: "Share stage, product, and what you'll demo live.",
  },
  {
    step: "02",
    title: "Booth setup",
    body: "Accepted teams get a booth for the full evening.",
  },
  {
    step: "03",
    title: "Real customers",
    body: "We bring potential buyers and users to your booth.",
  },
  {
    step: "04",
    title: "Room vote",
    body: "The crowd picks who showed the most momentum.",
  },
  {
    step: "05",
    title: "Top 3 → VC panel",
    body: "Three startups pitch live for direct feedback.",
  },
  {
    step: "06",
    title: "Warm intros",
    body: "SFPLAYGROUND follows up with relevant connections.",
  },
] as const;

export const PP_INVESTORS = {
  label: "For investors",
  headline: "Dealflow after the room has already voted",
  body: "You don't sit through fifty decks. You watch demo booths, see how founders handle real customers, and only hear from the three the crowd chose.",
  perks: [
    "Panel seats for the live top-3 pitches",
    "Booth floor access before the vote",
    "Founders pre-filtered by customer pull, not cold outreach",
    "Warm follow-up intros coordinated by our team",
  ],
  cta: "Apply as investor",
  href: PP_EVENT.investorApplyHref,
  image: "/images/previous-events/construction.jpeg",
  imageAlt:
    "Speaker presenting to an engaged audience at a SFPLAYGROUND pitch event",
} as const;

export const PP_GLANCE = {
  stats: [
    { end: 200, suffix: "+", label: "In the room" },
    { prefix: "Top ", end: 3, label: "Pitch each night" },
    { end: 1, suffix: " night", label: "Booth to intro" },
  ],
} as const;

export const PP_FAQ = {
  founders: [
    {
      q: "Who should apply?",
      a: "Early-stage founders with a working product or strong prototype — especially teams that need customer feedback before investor conversations.",
    },
    {
      q: "What do I need for the booth?",
      a: "A demo that works live — laptop, hardware, or a tight walkthrough. No polished deck required.",
    },
    {
      q: "What does top 3 get?",
      a: "A live pitch in front of the VC panel, on-the-spot feedback, and warm investor intros from SFPLAYGROUND after the event.",
    },
  ],
  investors: [
    {
      q: "How do investors participate?",
      a: "Apply through the investor path. Selected VCs join the panel room, scout booths before the vote, and engage with the top three on stage.",
    },
    {
      q: "What's different from a typical demo day?",
      a: "Founders earn the panel slot through demo booths and a crowd vote — not a pre-selected lineup. You see signal before the pitch.",
    },
    {
      q: "Is there a fee to join as an investor?",
      a: "Panel and room access is curated and application-based. We'll confirm details when we follow up on your application.",
    },
  ],
} as const;

export const PP_BRAND = {
  title: "Pitch Playoffs",
  byline: "by SFPLAYGROUND",
} as const;

export const PP_FINAL_CTA = {
  eyebrow: "Pitch Playoffs",
  brandTitle: "Pitch Playoffs",
  brandByline: PP_BRAND.byline,
  image: unsplashUrl("conferenceStage", 2000),
} as const;

export const PP_FOOTER = {
  brand: "SFPLAYGROUND",
  contactHref: `mailto:${PP_EVENT.contactEmail}`,
  contactLabel: "Contacts",
  navGroups: [
    [
      { label: "Format", href: "#format" },
      { label: "Investors", href: "#investors" },
      { label: "FAQ", href: "#faq" },
    ],
    [
      { label: "Startup apply", href: PP_EVENT.startupApplyHref },
      { label: "Investor apply", href: PP_EVENT.investorApplyHref },
      { label: "Events", href: "https://www.instagram.com/sfplayground/", external: true },
    ],
    [
      {
        label: "Instagram",
        href: "https://www.instagram.com/sfplayground/",
        external: true,
      },
      { label: "Mail", href: `mailto:${PP_EVENT.contactEmail}` },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/sfplayground",
        external: true,
      },
    ],
  ],
} as const;
