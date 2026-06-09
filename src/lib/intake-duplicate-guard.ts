import { sql } from "@vercel/postgres";
import type { IntakeKind } from "@/lib/intake-types";
import { INTAKE_DUPLICATE_WINDOW_MS } from "@/lib/intake-duplicate-messages";
import { checkIntakeDuplicateInGoogleSheet } from "@/lib/google-sheets-intake";

export { INTAKE_DUPLICATE_MESSAGE } from "@/lib/intake-duplicate-messages";

type DuplicateEntry = { at: number };

const memoryStore: Map<string, DuplicateEntry> =
  (globalThis as { __intakeDuplicateStore?: Map<string, DuplicateEntry> })
    .__intakeDuplicateStore ?? new Map();

if (!(globalThis as { __intakeDuplicateStore?: Map<string, DuplicateEntry> })
  .__intakeDuplicateStore) {
  (globalThis as { __intakeDuplicateStore?: Map<string, DuplicateEntry> })
    .__intakeDuplicateStore = memoryStore;
}

export function duplicateKey(kind: IntakeKind, email: string): string {
  return `${kind}:${email.trim().toLowerCase()}`;
}

function checkMemoryDuplicate(kind: IntakeKind, email: string): boolean {
  const key = duplicateKey(kind, email);
  const existing = memoryStore.get(key);
  if (!existing) return false;
  return Date.now() - existing.at < INTAKE_DUPLICATE_WINDOW_MS;
}

function recordMemoryDuplicate(kind: IntakeKind, email: string): void {
  memoryStore.set(duplicateKey(kind, email), { at: Date.now() });
  if (memoryStore.size > 5000) {
    const cutoff = Date.now() - INTAKE_DUPLICATE_WINDOW_MS;
    for (const [key, entry] of memoryStore) {
      if (entry.at < cutoff) memoryStore.delete(key);
    }
  }
}

async function checkDatabaseDuplicate(
  kind: IntakeKind,
  email: string,
): Promise<boolean> {
  try {
    const { rows } = await sql`
      SELECT 1
      FROM intake_submissions
      WHERE kind = ${kind}
        AND LOWER(email) = LOWER(${email.trim()})
        AND created_at > NOW() - INTERVAL '24 hours'
      LIMIT 1
    `;
    return rows.length > 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      message.includes("intake_submissions") ||
      message.includes("does not exist")
    ) {
      return false;
    }
    console.warn("Intake duplicate DB check failed:", message);
    return false;
  }
}

async function recordDatabaseDuplicate(
  kind: IntakeKind,
  email: string,
  ip: string,
): Promise<void> {
  try {
    await sql`
      INSERT INTO intake_submissions (kind, email, ip_address)
      VALUES (${kind}, ${email.trim().toLowerCase()}, ${ip})
    `;
  } catch (error) {
    console.warn("Intake duplicate DB record failed:", error);
  }
}

/**
 * Returns true if this email already submitted this intake type within 24 hours.
 * Checks in-memory cache, Postgres (if available), and Google Sheets (if configured).
 */
export async function isIntakeDuplicate(
  kind: IntakeKind,
  email: string,
): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !normalized.includes("@")) return false;

  if (checkMemoryDuplicate(kind, normalized)) return true;

  const [dbDuplicate, sheetDuplicate] = await Promise.all([
    checkDatabaseDuplicate(kind, normalized),
    checkIntakeDuplicateInGoogleSheet(kind, normalized),
  ]);

  return dbDuplicate || sheetDuplicate;
}

export async function recordIntakeSubmission(
  kind: IntakeKind,
  email: string,
  ip: string,
): Promise<void> {
  const normalized = email.trim().toLowerCase();
  recordMemoryDuplicate(kind, normalized);
  await recordDatabaseDuplicate(kind, normalized, ip);
}

/** @deprecated Use isIntakeDuplicate */
export function checkIntakeDuplicate(
  kind: IntakeKind,
  email: string,
): { duplicate: boolean } {
  return { duplicate: checkMemoryDuplicate(kind, email) };
}
