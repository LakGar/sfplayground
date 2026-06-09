import { NextRequest, NextResponse } from "next/server";
import { INTAKE_DUPLICATE_MESSAGE } from "@/lib/intake-duplicate-messages";
import { isIntakeDuplicate } from "@/lib/intake-duplicate-guard";
import type { IntakeKind } from "@/lib/intake-types";

export const dynamic = "force-dynamic";

const INTAKE_KINDS = new Set<IntakeKind>([
  "sponsors",
  "startups",
  "vcs",
  "speakers",
]);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { type?: string; email?: string };
    const type = typeof body.type === "string" ? body.type.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!INTAKE_KINDS.has(type as IntakeKind)) {
      return NextResponse.json({ error: "Invalid intake type" }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const duplicate = await isIntakeDuplicate(type as IntakeKind, email);

    return NextResponse.json({
      duplicate,
      message: duplicate ? INTAKE_DUPLICATE_MESSAGE : null,
    });
  } catch (error) {
    console.error("Intake duplicate check error:", error);
    return NextResponse.json(
      { error: "Could not check duplicate status" },
      { status: 500 },
    );
  }
}
