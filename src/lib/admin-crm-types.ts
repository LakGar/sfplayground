export type CrmCategory = "Startup" | "Investor" | "Sponsor" | "Operator" | "Subscriber";

export type CrmStage =
  | "New"
  | "Review"
  | "Qualified"
  | "Intro ready"
  | "Follow-up"
  | "Closed";

export type CrmPriority = "High" | "Medium" | "Low";

export type CrmTier = "Tier 1" | "Tier 2" | "Tier 3" | "";

export type CrmFlag =
  | "Do not contact"
  | "Waiting to be contacted"
  | "Meeting"
  | "Coming to event"
  | "";

export type CrmLink = {
  label: string;
  url: string;
};

export type CrmRecord = {
  id: number;
  name: string;
  company: string;
  category: CrmCategory;
  email: string;
  phone: string;
  website: string;
  stage: CrmStage;
  priority: CrmPriority;
  tier: CrmTier;
  flag: CrmFlag;
  owner: string;
  industry: string;
  value: string;
  source: string;
  updated: string;
  nextStep: string;
  nextSteps: string[];
  priorityNotes: string;
  notes: string;
  tags: string[];
  links: CrmLink[];
};

export type CrmStat = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  title: string;
  note: string;
  href?: string;
};

export type CrmChartPoint = {
  month: string;
  startups: number;
  investors: number;
  sponsors: number;
};
