/**
 * Verified Unsplash photo IDs (HTTP 200 on images.unsplash.com).
 * @see scripts — curl -I "https://images.unsplash.com/photo-{id}?w=800&q=80"
 */
const VERIFIED = {
  eventCrowd: "1540575467063-178a50c2df87",
  presentation: "1552664730-d307ca884978",
  robotics: "1485827404703-89b55fcc595e",
  teamCollab: "1522071820081-009f0129c71c",
  workspace: "1517245386807-bb43f82c33c4",
  meetingRoom: "1556761175-b413da4baf72",
  whiteboard: "1553877522-43269d4ea984",
  office: "1542744173-8e7e53415bb0",
  strategy: "1454165804606-c3d57bc86b40",
  startupTeam: "1551434678-e076c223a692",
  conferenceHall: "1492684223066-81342ee5ff30",
  conferenceStage: "1515187029135-18ee286d815b",
  groupPhoto: "1529156069898-49953e39b3ac",
  keynote: "1591115765373-5207764f72e7",
  aiTech: "1677442136019-21780ecad995",
  openOffice: "1504384308090-c894fdcc538d",
  businessMeeting: "1557804506-669a67965ba0",
  handshake: "1563986768609-322da13575f3",
  professional: "1587825140708-dfaf72ae4b04",
  remotePitch: "1600880292089-90a7e086ee0c",
  founderPortrait: "1611224923853-80b023f02d71",
} as const;

export type UnsplashKey = keyof typeof VERIFIED;

export function unsplashUrl(key: UnsplashKey, width = 1200): string {
  return `https://images.unsplash.com/photo-${VERIFIED[key]}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Default OG / hero width */
export const PP_OG_IMAGE = unsplashUrl("eventCrowd", 1200);
