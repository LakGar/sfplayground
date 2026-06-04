export const PP_EVENT = {
  edition: "003",
  contactEmail: "staff@sfplaygroundai.com",
  startupApplyHref: "/network/apply?type=startups",
  investorApplyHref: "/network/apply?type=vcs",
  calendlyHref: "https://calendly.com/sfplayground/30min",
  eventsHref: "https://www.instagram.com/sfplayground/",
  location: "San Francisco",
} as const;

export const PP_HERO = {
  title: "Pitch Playoffs",
  tagline: "Demo booths. Real customers. Crowd vote. Top 3 pitch live.",
  meta: `Edition ${PP_EVENT.edition} · ${PP_EVENT.location}`,
  avatars: [
    "/images/pitch-playoffs/founder-conversation.jpg",
    "/images/pitch-playoffs/demo-booth.jpg",
    "/images/pitch-playoffs/booth-feedback.jpg",
    "/images/pitch-playoffs/booth-floor.jpg",
    "/images/pitch-playoffs/presentation-room.jpg",
  ],
  avatarMoreLabel: "and 859 more",
  steps: ["Apply", "Booth", "Customers", "Vote", "VC panel", "Intros"],
  proofPoints: ["200+ in the room", "Customer signal first", "Top 3 earn the panel"],
  featureImages: [
    {
      src: "/images/pitch-playoffs/booth-floor.jpg",
      alt: "Crowd exploring demo booths at Pitch Playoffs",
    },
    {
      src: "/images/pitch-playoffs/demo-booth.jpg",
      alt: "Founder demo booth with product materials and visitors",
    },
    {
      src: "/images/pitch-playoffs/panel-presentation.jpg",
      alt: "Pitch Playoffs presenter speaking to attendees",
    },
  ],
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
  headline: "Startups Demo. \n The crowd votes. \n Finalists pitch Investors.",
  body: "Founders start with booth demos, real conversations, and direct audience feedback. Attendees vote for the teams they find most compelling, creating visible social proof before the top startups pitch investors.",
  images: [
    {
      src: "/images/pitch-playoffs/demo-booth.jpg",
      alt: "Founder demo booth with product screens and notes",
      layout: "landscape",
    },
    {
      src: "/images/pitch-playoffs/founder-conversation.jpg",
      alt: "Pitch Playoffs attendees talking with a founder",
      layout: "portrait",
    },
  ],
} as const;

export const PP_PROCESS = [
  {
    step: "01",
    title: "Founders apply",
    body: "Share your startup, product, and what you’ll demo live..",
  },
  {
    step: "02",
    title: "Booth setup",
    body: "Accepted teams get a booth to meet the room all evening.",
  },
  {
    step: "03",
    title: "Meet the room",
    body: "Founders connect with potential users, customers, operators, and investors.",
  },
  {
    step: "04",
    title: "Crowd filters",
    body: "Attendees vote for the teams they find most compelling.",
  },
  {
    step: "05",
    title: "Finalists pitch",
    body: "Top teams pitch investors with social proof already behind them.",
  },
  {
    step: "06",
    title: "Warm intros",
    body: "SFPLAYGROUND follows up with relevant connections.",
  },
] as const;

export const PP_INVESTORS = {
  label: "For investors",
  headline: "Dealflow with live customer signal",
  body: "Pitch Playoffs brings together founders from leading universities, accelerator programs, technical communities, and early startup ecosystems. Investors watch social proof form in real time through live demo booths and audience voting, then get a firsthand look as the crowd’s favorite founders pitch their product and receive direct feedback from the panel.",
  perks: [
    "See founder-market pull before the panel",
    "Watch how teams sell, demo, and handle real questions",
    "Use audience voting as an added diligence signal",
    "Hear the crowd’s favorite startups pitch live",
    "Give feedback directly to high-signal finalists",
    "Get curated follow-up intros to teams that fit your thesis"
  ],
  cta: "Apply as investor",
  href: PP_EVENT.investorApplyHref,
  image: "/images/pitch-playoffs/booth-feedback.jpg",
  imageAlt:
    "Investors and attendees reviewing a live Pitch Playoffs demo",
} as const;

export const PP_GLANCE = {
  stats: [
    { end: 15, suffix: "+", label: "Curated startup demos" },
    { end: 200, suffix: "+", label: "Audience votes as signal" },
    { end: 5, suffix: "+", label: "Active investors" },
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
  image: "/images/pitch-playoffs/booth-floor.jpg",
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
