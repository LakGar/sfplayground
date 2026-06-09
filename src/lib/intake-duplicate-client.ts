import type { IntakeKind } from "@/lib/intake-types";
import { INTAKE_DUPLICATE_WINDOW_MS } from "@/lib/intake-duplicate-messages";

const STORAGE_KEY = "sfpg-intake-duplicates";

type ClientDuplicateMap = Record<string, number>;

function storageKey(kind: IntakeKind, email: string): string {
  return `${kind}:${email.trim().toLowerCase()}`;
}

function readMap(): ClientDuplicateMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ClientDuplicateMap;
  } catch {
    return {};
  }
}

function writeMap(map: ClientDuplicateMap): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  const pruned: ClientDuplicateMap = {};
  for (const [key, at] of Object.entries(map)) {
    if (now - at < INTAKE_DUPLICATE_WINDOW_MS) pruned[key] = at;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
}

export function hasClientIntakeDuplicate(
  kind: IntakeKind,
  email: string,
): boolean {
  const key = storageKey(kind, email);
  if (!key.endsWith("@") && !key.includes("@")) return false;
  const at = readMap()[key];
  if (!at) return false;
  return Date.now() - at < INTAKE_DUPLICATE_WINDOW_MS;
}

export function markClientIntakeDuplicate(
  kind: IntakeKind,
  email: string,
): void {
  const map = readMap();
  map[storageKey(kind, email)] = Date.now();
  writeMap(map);
}
