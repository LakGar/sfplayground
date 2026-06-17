import "server-only";

import { sql } from "@/lib/db";
import type { AdminId } from "@/lib/admin-auth";

export type AuditLogRow = {
  id: number;
  admin_id: AdminId | "system" | string;
  admin_name: string;
  action: string;
  target_type: string;
  target_id: string | null;
  details: Record<string, unknown>;
  created_at: Date;
};

const CREATE_AUDIT_TABLE = `
  CREATE TABLE IF NOT EXISTS admin_audit_log (
    id SERIAL PRIMARY KEY,
    admin_id TEXT NOT NULL,
    admin_name TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    details JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

async function ensureAuditTable(): Promise<void> {
  await sql.query(CREATE_AUDIT_TABLE);
  await sql.query(
    "CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created ON admin_audit_log (created_at DESC)",
  );
}

export async function recordAuditEvent(input: {
  adminId: AdminId | "system" | string;
  adminName: string;
  action: string;
  targetType: string;
  targetId?: string | number | null;
  details?: Record<string, unknown>;
}): Promise<void> {
  try {
    await ensureAuditTable();
    await sql`
      INSERT INTO admin_audit_log (admin_id, admin_name, action, target_type, target_id, details)
      VALUES (
        ${input.adminId},
        ${input.adminName},
        ${input.action},
        ${input.targetType},
        ${input.targetId == null ? null : String(input.targetId)},
        ${JSON.stringify(input.details ?? {})}::jsonb
      )
    `;
  } catch (error) {
    console.error("Audit log write failed:", error);
  }
}

export async function getAuditLog(limit = 80): Promise<AuditLogRow[]> {
  await ensureAuditTable();
  const { rows } = await sql`
    SELECT id, admin_id, admin_name, action, target_type, target_id, details, created_at
    FROM admin_audit_log
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows as AuditLogRow[];
}

