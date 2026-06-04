import type { IntakeKind } from "@/lib/intake-types";
import { INTAKE_FIELD_META } from "@/lib/intake-field-meta";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const INTAKE_LABELS = INTAKE_FIELD_META;

export function buildIntakeEmailHtml(
  kind: IntakeKind,
  data: Record<string, string>,
  clientIp: string,
): string {
  const meta = INTAKE_LABELS[kind];
  const rows = Object.entries(meta.fields)
    .map(([key, label]) => {
      const raw = data[key];
      if (raw === undefined || raw === "") return "";
      return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(raw)}</p>`;
    })
    .join("\n");

  return `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
            <h2 style="color: #19f7ea;">${escapeHtml(meta.title)}</h2>
            <div style="background: #f5f5f5; padding: 18px 20px; border-radius: 8px; margin: 18px 0;">
              ${rows}
              <p><strong>IP:</strong> ${escapeHtml(clientIp)}</p>
            </div>
          </div>
        `;
}
