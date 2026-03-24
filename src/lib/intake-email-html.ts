import type { IntakeKind } from "@/lib/intake-types";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const INTAKE_LABELS: Record<
  IntakeKind,
  { title: string; fields: Record<string, string> }
> = {
  sponsors: {
    title: "Sponsor intake",
    fields: {
      companyName: "Company name",
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
      lookingFor: "What are you looking for from SF Playground?",
      anythingElse: "Anything else we should know",
    },
  },
  vcs: {
    title: "VC intake",
    fields: {
      firmName: "Firm name",
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
    title: "Speaker intake",
    fields: {
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      roleTitle: "Role / title",
      webOrLinkedin: "Website or LinkedIn",
      topicExpertise: "Topic expertise",
      speakingExperience: "Speaking experience",
      whySpeak: "Why speak at SF Playground",
      preferredEventType: "Preferred event type",
      anythingElse: "Anything else we should know",
    },
  },
};

export function buildIntakeEmailHtml(
  kind: IntakeKind,
  data: Record<string, string>,
  clientIp: string,
): string {
  const meta = INTAKE_LABELS[kind];
  const rows = Object.entries(meta.fields)
    .map(([key, label]) => {
      const raw = data[key];
      if (raw === undefined || raw === "") return "";
      return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(raw)}</p>`;
    })
    .join("\n");

  return `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
            <h2 style="color: #19f7ea;">${escapeHtml(meta.title)}</h2>
            <div style="background: #f5f5f5; padding: 18px 20px; border-radius: 8px; margin: 18px 0;">
              ${rows}
              <p><strong>IP:</strong> ${escapeHtml(clientIp)}</p>
            </div>
          </div>
        `;
}
