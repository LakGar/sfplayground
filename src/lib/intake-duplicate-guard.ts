import type { IntakeKind } from "@/lib/intake-types";

const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;

type DuplicateEntry = { at: number };

const duplicateStore: Map<string, DuplicateEntry> =
  (globalThis as { __intakeDuplicateStore?: Map<string, DuplicateEntry> })
    .__intakeDuplicateStore ?? new Map();

if (!(globalThis as { __intakeDuplicateStore?: Map<string, DuplicateEntry> })
  .__intakeDuplicateStore) {
  (globalThis as { __intakeDuplicateStore?: Map<string, DuplicateEntry> })
    .__intakeDuplicateStore = duplicateStore;
}

function duplicateKey(kind: IntakeKind, email: string): string {
  return `${kind}:${email.trim().toLowerCase()}`;
}

export function checkIntakeDuplicate(
  kind: IntakeKind,
  email: string,
): { duplicate: boolean } {
  const key = duplicateKey(kind, email);
  const existing = duplicateStore.get(key);
  const now = Date.now();

  if (existing && now - existing.at < DUPLICATE_WINDOW_MS) {
    return { duplicate: true };
  }

  return { duplicate: false };
}

export function recordIntakeSubmission(kind: IntakeKind, email: string): void {
  duplicateStore.set(duplicateKey(kind, email), { at: Date.now() });

  if (duplicateStore.size > 5000) {
    const cutoff = Date.now() - DUPLICATE_WINDOW_MS;
    for (const [key, entry] of duplicateStore) {
      if (entry.at < cutoff) duplicateStore.delete(key);
    }
  }
}
