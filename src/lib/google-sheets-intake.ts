import type { IntakeKind } from "@/lib/intake-types";
import {
  INTAKE_FIELD_META,
  intakeFieldKeys,
} from "@/lib/intake-field-meta";

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
};

function parseServiceAccount(): ServiceAccountCredentials | null {
  const jsonRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (jsonRaw) {
    try {
      const parsed = JSON.parse(jsonRaw) as ServiceAccountCredentials;
      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: parsed.private_key.replace(/\\n/g, "\n"),
        };
      }
    } catch {
      console.error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON");
      return null;
    }
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.trim();
  if (email && privateKey) {
    return {
      client_email: email,
      private_key: privateKey.replace(/\\n/g, "\n"),
    };
  }

  return null;
}

function getWebhookUrl(): string | null {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  return url && url.startsWith("https://") ? url : null;
}

function isServiceAccountConfigured(): boolean {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  return Boolean(spreadsheetId && parseServiceAccount());
}

/** True when Apps Script webhook or service account mode is configured. */
export function isGoogleSheetsIntakeConfigured(): boolean {
  return Boolean(getWebhookUrl() || isServiceAccountConfigured());
}

function buildHeaderRow(kind: IntakeKind): string[] {
  const labels = INTAKE_FIELD_META[kind].fields;
  return [
    "Submitted at (UTC)",
    ...intakeFieldKeys(kind).map((key) => labels[key]),
    "IP address",
  ];
}

function buildDataRow(
  kind: IntakeKind,
  data: Record<string, string>,
  clientIp: string,
): string[] {
  const keys = intakeFieldKeys(kind);
  return [
    new Date().toISOString(),
    ...keys.map((key) => data[key] ?? ""),
    clientIp,
  ];
}

async function appendViaWebhook(
  kind: IntakeKind,
  data: Record<string, string>,
  clientIp: string,
): Promise<void> {
  const url = getWebhookUrl();
  if (!url) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
  }

  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();
  const payload = {
    secret: secret || undefined,
    kind,
    headers: buildHeaderRow(kind),
    row: buildDataRow(kind, data, clientIp),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });

  const text = await res.text();
  let parsed: { ok?: boolean; error?: string } = {};
  try {
    parsed = JSON.parse(text) as { ok?: boolean; error?: string };
  } catch {
    /* non-JSON response */
  }

  if (!res.ok || parsed.ok === false) {
    throw new Error(
      parsed.error || `Google Sheets webhook failed (${res.status})`,
    );
  }
}

async function appendViaServiceAccount(
  kind: IntakeKind,
  data: Record<string, string>,
  clientIp: string,
): Promise<void> {
  const { google } = await import("googleapis");
  const { INTAKE_SHEET_TABS } = await import("@/lib/intake-field-meta");

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not set");
  }

  const credentials = parseServiceAccount();
  if (!credentials) {
    throw new Error("Google service account credentials are not configured");
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const tabName = INTAKE_SHEET_TABS[kind];

  const sheetRange = (a1: string) => {
    const escaped = tabName.replace(/'/g, "''");
    return `'${escaped}'!${a1}`;
  };

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetRange("A1:1"),
  });

  const firstCell = existing.data.values?.[0]?.[0];
  if (!firstCell || String(firstCell).trim().length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: sheetRange("A1"),
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [buildHeaderRow(kind)] },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: sheetRange("A:A"),
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [buildDataRow(kind, data, clientIp)],
    },
  });
}

/**
 * Appends one intake row to Google Sheets.
 * Prefer GOOGLE_SHEETS_WEBHOOK_URL (Apps Script) when org policy blocks service account keys.
 */
export async function appendIntakeToGoogleSheet(
  kind: IntakeKind,
  data: Record<string, string>,
  clientIp: string,
): Promise<void> {
  if (!isGoogleSheetsIntakeConfigured()) {
    return;
  }

  if (getWebhookUrl()) {
    await appendViaWebhook(kind, data, clientIp);
    return;
  }

  if (isServiceAccountConfigured()) {
    await appendViaServiceAccount(kind, data, clientIp);
    return;
  }
}
