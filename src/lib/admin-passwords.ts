import "server-only";

import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

import { sql } from "@/lib/db";
import type { AdminId } from "@/lib/admin-auth";

const PASSWORD_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS admin_user_passwords (
    admin_id TEXT PRIMARY KEY,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

async function ensurePasswordTable(): Promise<void> {
  await sql.query(PASSWORD_TABLE_SQL);
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("base64url");
  const hash = scryptSync(password, salt, 64).toString("base64url");
  return `scrypt:${salt}:${hash}`;
}

function verifyHash(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64url");
  const actual = scryptSync(password, salt, expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function hasStoredAdminPassword(adminId: AdminId): Promise<boolean> {
  await ensurePasswordTable();
  const { rows } = await sql`
    SELECT 1 FROM admin_user_passwords WHERE admin_id = ${adminId} LIMIT 1
  `;
  return Boolean(rows[0]);
}

export async function verifyStoredAdminPassword(
  adminId: AdminId,
  password: string,
): Promise<boolean> {
  await ensurePasswordTable();
  const { rows } = await sql`
    SELECT password_hash FROM admin_user_passwords WHERE admin_id = ${adminId} LIMIT 1
  `;
  const stored = rows[0]?.password_hash;
  return typeof stored === "string" ? verifyHash(password, stored) : false;
}

export async function setStoredAdminPassword(
  adminId: AdminId,
  password: string,
): Promise<void> {
  await ensurePasswordTable();
  const passwordHash = hashPassword(password.trim());
  await sql`
    INSERT INTO admin_user_passwords (admin_id, password_hash, updated_at)
    VALUES (${adminId}, ${passwordHash}, NOW())
    ON CONFLICT (admin_id) DO UPDATE
    SET password_hash = EXCLUDED.password_hash,
        updated_at = NOW()
  `;
}

export async function clearStoredAdminPassword(adminId: AdminId): Promise<void> {
  await ensurePasswordTable();
  await sql`
    DELETE FROM admin_user_passwords WHERE admin_id = ${adminId}
  `;
}
