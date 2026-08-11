export type IntakeKind =
  | "sponsors"
  | "startups"
  | "vcs"
  | "speakers"
  | "popup-market";

export const INTAKE_SUBJECT: Record<IntakeKind, string> = {
  sponsors: "New Sponsor Intake Submission",
  startups: "New Startup Intake Submission",
  vcs: "New VC Intake Submission",
  speakers: "New Speaker Intake Submission",
  "popup-market": "New Pop-up Market Application",
};
