export type ExpertCategory =
  | "VC"
  | "Operator"
  | "Founder"
  | "AI Expert"
  | "Talent"
  | "Go-to-market";

export type IntroStatus =
  | "requested"
  | "contacted"
  | "accepted"
  | "intro_sent"
  | "declined"
  | "completed";

export type ClubExpert = {
  id: string;
  name: string;
  email: string;
  title: string;
  company: string;
  category: ExpertCategory;
  image: string;
  description: string;
  tags: string[];
  active: boolean;
  availability: string;
};

export type ClubMember = {
  id: string;
  name: string;
  email: string;
  title: string;
  company: string;
  website: string;
  stage: string;
  industry: string;
  image: string;
  description: string;
  lookingFor: string;
  linkedin: string;
};

export type IntroRequest = {
  id: string;
  memberId: string;
  expertId: string;
  status: IntroStatus;
  goal: string;
  notes: string;
  updatedAt: string;
};

export const demoMember: ClubMember = {
  id: "member-1",
  name: "Maya Chen",
  email: "founder@demo.com",
  title: "Founder and CEO",
  company: "NexusOps AI",
  website: "nexusops.ai",
  stage: "Seed",
  industry: "AI infrastructure",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  description:
    "Building workflow agents for mid-market operations teams that need reliable human-in-the-loop automation.",
  lookingFor:
    "Warm intros to AI infra investors, design partners in logistics, and operators who have scaled enterprise GTM.",
  linkedin: "linkedin.com/in/maya-chen-demo",
};

export const clubExperts: ClubExpert[] = [
  {
    id: "expert-1",
    name: "Daniel Roth",
    email: "daniel@northbay.vc",
    title: "Partner",
    company: "Northbay Ventures",
    category: "VC",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "Invests in applied AI, vertical SaaS, infrastructure, and founder-led B2B companies from pre-seed to Series A.",
    tags: ["Seed", "AI infra", "B2B SaaS"],
    active: true,
    availability: "2 intro slots this month",
  },
  {
    id: "expert-2",
    name: "Priya Nair",
    email: "priya@scaleops.co",
    title: "Former COO",
    company: "ScaleOps",
    category: "Operator",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    description:
      "Helped scale a devtools company from $3M to $80M ARR. Strong on hiring, operating cadence, and sales execution.",
    tags: ["Ops", "Hiring", "Enterprise"],
    active: true,
    availability: "Open to founder office hours",
  },
  {
    id: "expert-3",
    name: "Marcus Ellis",
    email: "marcus@frontierlabs.ai",
    title: "Founder",
    company: "Frontier Labs",
    category: "Founder",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    description:
      "Second-time AI founder. Best for product strategy, early customer discovery, pricing, and founder fundraising prep.",
    tags: ["Product", "Fundraising", "AI apps"],
    active: true,
    availability: "Fast response",
  },
  {
    id: "expert-4",
    name: "Elena Park",
    email: "elena@signalgtm.com",
    title: "GTM Advisor",
    company: "Signal GTM",
    category: "Go-to-market",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    description:
      "Designs founder-led sales systems for technical startups selling into regulated and enterprise markets.",
    tags: ["Sales", "ICP", "Pipeline"],
    active: true,
    availability: "Reviewing 4 requests",
  },
  {
    id: "expert-5",
    name: "Samir Kapoor",
    email: "samir@harborcapital.com",
    title: "Principal",
    company: "Harbor Capital",
    category: "VC",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    description:
      "Focuses on AI, data platforms, industrial software, and technical teams with clear distribution insight.",
    tags: ["Industrial AI", "Data", "Series A"],
    active: true,
    availability: "Warm intros only",
  },
  {
    id: "expert-6",
    name: "Rachel Kim",
    email: "rachel@talentbridge.com",
    title: "Talent Partner",
    company: "TalentBridge",
    category: "Talent",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    description:
      "Helps early teams close founding engineers, advisors, fractional leaders, and first sales hires.",
    tags: ["Talent", "Recruiting", "Advisors"],
    active: true,
    availability: "High fit intros only",
  },
];

export const clubMembers: ClubMember[] = [
  demoMember,
  {
    id: "member-2",
    name: "Ari Patel",
    email: "ari@fieldstack.ai",
    title: "Co-founder",
    company: "FieldStack AI",
    website: "fieldstack.ai",
    stage: "Pre-seed",
    industry: "Construction AI",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    description: "AI assistant for construction project managers.",
    lookingFor: "Design partners and seed investors.",
    linkedin: "linkedin.com/in/ari-patel-demo",
  },
  {
    id: "member-3",
    name: "Leah Morris",
    email: "leah@carepilot.health",
    title: "Founder",
    company: "CarePilot",
    website: "carepilot.health",
    stage: "Seed",
    industry: "Healthtech",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    description: "Patient workflow software for specialty clinics.",
    lookingFor: "Healthcare operators and payer advisors.",
    linkedin: "linkedin.com/in/leah-morris-demo",
  },
];

export const introRequests: IntroRequest[] = [
  {
    id: "req-1",
    memberId: "member-1",
    expertId: "expert-1",
    status: "requested",
    goal: "Fundraising feedback before opening the seed round.",
    notes: "SFPG needs to validate investor fit and send a tight context note.",
    updatedAt: "Today",
  },
  {
    id: "req-2",
    memberId: "member-1",
    expertId: "expert-2",
    status: "contacted",
    goal: "Build first operator hiring plan.",
    notes: "Priya has been contacted. Awaiting acceptance.",
    updatedAt: "Yesterday",
  },
  {
    id: "req-3",
    memberId: "member-1",
    expertId: "expert-4",
    status: "accepted",
    goal: "Sharpen ICP and founder-led outbound motion.",
    notes: "Expert accepted. Team drafting the warm intro.",
    updatedAt: "2 days ago",
  },
  {
    id: "req-4",
    memberId: "member-1",
    expertId: "expert-3",
    status: "completed",
    goal: "Product strategy review.",
    notes: "Intro completed. Follow-up recorded for next month.",
    updatedAt: "Last week",
  },
  {
    id: "req-5",
    memberId: "member-2",
    expertId: "expert-5",
    status: "intro_sent",
    goal: "Industrial AI fundraising conversation.",
    notes: "Intro email sent. Track reply in Superhuman.",
    updatedAt: "Today",
  },
];

export const introStatusLabels: Record<IntroStatus, string> = {
  requested: "Requested",
  contacted: "SFPG contacted expert",
  accepted: "Expert accepted",
  intro_sent: "Intro sent",
  declined: "Declined",
  completed: "Completed",
};
