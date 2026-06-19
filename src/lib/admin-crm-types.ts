export type CrmCategory = "Startup" | "Investor" | "Sponsor" | "Operator" | "Subscriber";

export type CrmStage =
  | "New"
  | "Review"
  | "Qualified"
  | "Intro ready"
  | "Follow-up"
  | "Closed";

export type CrmPriority = "High" | "Medium" | "Low";

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
  owner: string;
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
};

export type CrmChartPoint = {
  month: string;
  startups: number;
  investors: number;
  sponsors: number;
};
