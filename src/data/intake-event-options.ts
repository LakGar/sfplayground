import { UPCOMING_EVENTS } from "@/data/upcoming-events";

export const GENERAL_EVENT_OPTION = "General / not sure yet";

export const INTAKE_EVENT_OPTIONS: readonly string[] = [
  GENERAL_EVENT_OPTION,
  ...UPCOMING_EVENTS.map((event) => event.title),
];
