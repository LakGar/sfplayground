import type { IntakeKind } from "@/lib/intake-types";

export const INTAKE_FIELD_META: Record<
  IntakeKind,
  { title: string; fields: Record<string, string> }
> = {
  sponsors: {
    title: "Sponsor intake",
    fields: {
      companyName: "Company name",
      logoUrl: "Company logo",
      contactName: "Contact name",
      email: "Email",
      phone: "Phone",
      website: "Website",
      companyType: "Company type",
      sponsorshipBudgetRange: "Sponsorship budget range",
      interestedIn: "Interested in",
      goals: "Goals / exposure",
      anythingElse: "Anything else we should know",
    },
  },
  startups: {
    title: "Startup intake",
    fields: {
      startupName: "Startup name",
      founderName: "Founder name",
      email: "Email",
      phone: "Phone",
      website: "Website",
      stage: "Stage",
      industry: "Industry / category",
      description: "One-sentence description",
      fundraising: "Fundraising",
      roundAndTarget: "Round + target amount",
      teamSize: "Team size",
      lookingFor: "What are you looking for from SFPLAYGROUND?",
      anythingElse: "Anything else we should know",
    },
  },
  vcs: {
    title: "VC intake",
    fields: {
      firmName: "Firm name",
      logoUrl: "Firm logo",
      investorName: "Investor name",
      email: "Email",
      phone: "Phone",
      website: "Website",
      checkSize: "Check size",
      stageFocus: "Stage focus",
      sectorFocus: "Sector focus",
      geographicFocus: "Geographic focus",
      openToJudging: "Open to judging / attending events",
      startupsToMeet: "Startups they want to meet",
      anythingElse: "Anything else we should know",
    },
  },
  speakers: {
    title: "Operator / expert intake",
    fields: {
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      logoUrl: "Organization logo",
      roleTitle: "Role / title",
      webOrLinkedin: "Website or LinkedIn",
      topicExpertise: "Topic expertise",
      speakingExperience: "Speaking experience",
      whySpeak: "Why speak at SFPLAYGROUND",
      preferredEventType: "Preferred event type",
      anythingElse: "Anything else we should know",
    },
  },
};

export const INTAKE_SHEET_TABS: Record<IntakeKind, string> = {
  startups: "Startups",
  vcs: "Investors",
  speakers: "Operators & Experts",
  sponsors: "Sponsors",
};

export function intakeFieldKeys(kind: IntakeKind): string[] {
  return Object.keys(INTAKE_FIELD_META[kind].fields);
}
