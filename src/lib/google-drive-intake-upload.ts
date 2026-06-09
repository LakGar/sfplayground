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

function getDriveFolderId(): string | null {
  const id = process.env.GOOGLE_DRIVE_INTAKE_FOLDER_ID?.trim();
  return id || null;
}

/** True when Apps Script webhook or service account + folder is configured. */
export function isIntakeDriveUploadConfigured(): boolean {
  return Boolean(getWebhookUrl() || (parseServiceAccount() && getDriveFolderId()));
}

export function buildDriveFileViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

async function uploadViaWebhook(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
  category: string,
): Promise<string> {
  const url = getWebhookUrl();
  if (!url) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
  }

  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "uploadFile",
      secret: secret || undefined,
      fileName,
      mimeType,
      category,
      data: buffer.toString("base64"),
    }),
    signal: AbortSignal.timeout(90_000),
  });

  const text = await res.text();
  let parsed: { ok?: boolean; error?: string; url?: string } = {};
  try {
    parsed = JSON.parse(text) as { ok?: boolean; error?: string; url?: string };
  } catch {
    /* non-JSON */
  }

  if (!res.ok || parsed.ok === false || !parsed.url) {
    throw new Error(
      parsed.error || `Google Drive upload failed (${res.status})`,
    );
  }

  return parsed.url;
}

async function uploadViaServiceAccount(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
): Promise<string> {
  const { google } = await import("googleapis");

  const folderId = getDriveFolderId();
  if (!folderId) {
    throw new Error("GOOGLE_DRIVE_INTAKE_FOLDER_ID is not set");
  }

  const credentials = parseServiceAccount();
  if (!credentials) {
    throw new Error("Google service account credentials are not configured");
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });
  const created = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: buffer,
    },
    fields: "id",
  });

  const fileId = created.data.id;
  if (!fileId) {
    throw new Error("Google Drive upload did not return a file id");
  }

  return buildDriveFileViewUrl(fileId);
}

/**
 * Uploads an intake file to Google Drive.
 * Prefers Apps Script webhook (no service account key) when configured.
 */
export async function uploadIntakeFileToGoogleDrive(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
  category: string,
): Promise<string> {
  if (getWebhookUrl()) {
    return uploadViaWebhook(buffer, fileName, mimeType, category);
  }

  if (parseServiceAccount() && getDriveFolderId()) {
    return uploadViaServiceAccount(buffer, fileName, mimeType);
  }

  throw new Error(
    "Google Drive upload is not configured. Set GOOGLE_SHEETS_WEBHOOK_URL or service account + GOOGLE_DRIVE_INTAKE_FOLDER_ID.",
  );
}
