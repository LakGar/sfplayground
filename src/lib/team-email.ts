/**
 * Central place for team notification recipients (contact, intake, etc.).
 * Override with SFPLAYGROUND_TEAM_EMAIL (single address) if you want one inbox only.
 */
export const SFPLAYGROUND_FROM = "SF Playground <hello@sfplayground.com>";

export function getTeamRecipients(): string[] {
  const single = process.env.SFPLAYGROUND_TEAM_EMAIL?.trim();
  if (single) return [single];
  return ["hello@sfplayground.com", "staff@sfplaygroundai.com"];
}
