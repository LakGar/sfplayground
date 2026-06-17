import { NextResponse } from "next/server";

import { getAuditLog } from "@/lib/admin-audit";
import { getSession } from "@/lib/admin-auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const audit = await getAuditLog();
  return NextResponse.json(audit);
}

