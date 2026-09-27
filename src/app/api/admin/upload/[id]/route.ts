import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id || !/^[a-f0-9-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid upload id" }, { status: 400 });
  }

  const { rows } = await sql`
    SELECT mime_type, data_base64
    FROM admin_uploads
    WHERE id = ${id}
    LIMIT 1
  `;
  const upload = rows[0] as
    | { mime_type: string; data_base64: string }
    | undefined;
  if (!upload) {
    return NextResponse.json({ error: "Upload not found" }, { status: 404 });
  }

  const bytes = Buffer.from(upload.data_base64, "base64");
  return new NextResponse(bytes, {
    headers: {
      "Content-Type": upload.mime_type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": "inline",
    },
  });
}
