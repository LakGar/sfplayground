# Google Sheets intake setup (SFPLAYGROUND)

Network and sponsor applications (`/api/intake`) append each submission to a Google Sheet. Email to **staff@sfplaygroundai.com** still works via Resend when `RESEND_API_KEY` is set.

## What gets saved

One spreadsheet with **four tabs** (exact names):

| Tab name              | Form type               |
| --------------------- | ----------------------- |
| `Startups`            | Founder / startup apply |
| `Investors`           | VC / investor apply     |
| `Operators & Experts` | Operator / expert apply |
| `Sponsors`            | Sponsor apply           |

Each row: **Submitted at (UTC)**, all form fields, **IP address**. Headers are added automatically on first submission per tab.

---

## Recommended: Apps Script webhook (no service account key)

Use this if your Google Workspace shows:

> _Organization Policy … `iam.disableServiceAccountKeyCreation`_

You do **not** need a JSON key or `sfplayground-intake@drive-488410.iam.gserviceaccount.com` sheet sharing. The script runs as **you** (staff@sfplaygroundai.com) when someone submits a form.

### 1. Create the spreadsheet

1. Log in to Google Drive as **staff@sfplaygroundai.com**.
2. Create **SFPLAYGROUND Intake** (or any name).
3. Optionally add empty tabs: `Startups`, `Investors`, `Operators & Experts`, `Sponsors` (the script can create them if missing).

### 2. Install the script

1. Open the spreadsheet → **Extensions** → **Apps Script**.
2. Delete any sample code and paste the contents of **`scripts/google-apps-script-intake.gs`** from this repo.
3. **Save** the project (e.g. name it `SFPLAYGROUND Intake`).

### 3. Set script properties (recommended)

1. In Google Drive, create a folder **SFPLAYGROUND Intake Uploads** (or any name).
2. Copy the folder ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
3. In Apps Script: **Project Settings** (gear) → **Script properties**.
4. Add properties:
   - **Property:** `INTAKE_SECRET` — **Value:** a long random string (e.g. from a password generator)
   - **Property:** `INTAKE_DRIVE_FOLDER_ID` — **Value:** the Drive folder ID from step 2

If `INTAKE_DRIVE_FOLDER_ID` is omitted, the script creates **SFPLAYGROUND Intake Uploads** in the account that runs the web app.

### 4. Deploy as web app

1. **Deploy** → **New deployment**.
2. Type: **Web app**.
3. **Execute as:** Me (`staff@sfplaygroundai.com`).
4. **Who has access:** Anyone.
5. **Deploy** → copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

### 5. Environment variables

**Local (`.env.local`):**

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbwwEhPWom3F0fRVgesI0gfWX-DhKpWH_8iUZg3qFGXY93UmYlZ37Rrg04Zt1spdHyhj/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=same_value_as_INTAKE_SECRET
RESEND_API_KEY=re_...
```

**Apps Script script properties (current intake folder):**

| Property | Value |
| -------- | ----- |
| `INTAKE_DRIVE_FOLDER_ID` | `1hI67qJcXZ-L1I1Z8IIsDp5OwExungA71` |
| `INTAKE_SECRET` | Same as `GOOGLE_SHEETS_WEBHOOK_SECRET` |

**Vercel (`sfplayground`):** `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_WEBHOOK_SECRET` on Production + Preview → **Redeploy** after changes.

Optional:

```bash
SFPLAYGROUND_TEAM_EMAIL=staff@sfplaygroundai.com
```

### 6. Test

1. Opening the web app URL in a browser may show `doGet` / “Script function not found” until you add `doGet` in the script (see repo `scripts/google-apps-script-intake.gs`) or redeploy the latest version. That is OK — the **website uses POST**, not the browser.
2. Restart dev server (local) or redeploy (Vercel).
3. Submit a test form on `/network/apply` or `/sponsors/apply`.
4. Confirm a new row on the correct tab.

**After changing Apps Script code:** Deploy → **Manage deployments** → edit → **New version** → Deploy (URL usually stays the same).

---

## Alternative: Service account + JSON key (if your org allows keys)

Only use this if you **can** download a service account JSON key.

1. Google Cloud → enable **Google Sheets API** → create service account → download JSON.
2. Share the spreadsheet with the service account email as **Editor**, e.g.  
   `sfplayground-intake@drive-488410.iam.gserviceaccount.com`
3. Env vars:

```bash
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_JSON={...full json...}
```

If both webhook URL and service account are set, the **webhook is used first**.

---

## File uploads (logos, pitch decks, documents)

Intake forms upload files via `/api/intake/upload`. When the Apps Script webhook is configured, each file is stored in Google Drive and the form saves a real link like `https://drive.google.com/file/d/…/view` in the spreadsheet (not a local `/uploads/…` path).

1. Complete the script properties above (`INTAKE_DRIVE_FOLDER_ID`).
2. **Redeploy** the web app after updating `scripts/google-apps-script-intake.gs`.
3. Submit a test form with a logo or document and confirm the sheet cell contains a Drive URL.

**Local dev without webhook:** files save under `public/uploads/intake/` for testing only. On Vercel, uploads require the webhook or service account + `GOOGLE_DRIVE_INTAKE_FOLDER_ID`.

### Service account file uploads (optional)

If you use a service account instead of Apps Script for sheets, you can also upload files with:

```bash
GOOGLE_DRIVE_INTAKE_FOLDER_ID=your_drive_folder_id
GOOGLE_SERVICE_ACCOUNT_JSON={...}
```

Share the Drive folder with the service account email as **Editor**.

---

## Behavior

- Env vars **missing** → forms still work; email only (if Resend is set).
- Webhook or service account **configured** → each submission must save to the sheet; on failure the API returns an error.
- File uploads on Vercel **require** Drive configuration; local-only `/uploads/` paths are not persisted in production.

---

## Duplicate prevention

The intake API blocks the same **email + form type** from submitting again within **24 hours**. Checks run against:

1. Google Sheet rows (Apps Script — redeploy the script after updates)
2. Postgres `intake_submissions` table (if `POSTGRES_URL` is set — run `scripts/init-db.sql`)
3. In-memory cache (fallback on serverless)

Redeploy Apps Script after pulling the latest `scripts/google-apps-script-intake.gs`.

## Troubleshooting

| Issue                                                        | Fix                                                                          |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `Unauthorized`                                               | `GOOGLE_SHEETS_WEBHOOK_SECRET` must match Apps Script `INTAKE_SECRET`.       |
| `Invalid intake kind`                                        | Check form type; tab names must match the table above.                       |
| Row not appearing                                            | Redeploy web app as **Me**; run a new deployment version after script edits. |
| Still asked for service account key                          | Use **Apps Script** method above; ignore service account steps.              |
| `The caller does not have permission` (service account only) | Share sheet with the service account email as Editor.                        |
| Upload works locally but fails on Vercel                     | Set `GOOGLE_SHEETS_WEBHOOK_URL` and redeploy Apps Script with `uploadFile`.  |
| Sheet shows `/uploads/intake/…` instead of Drive URL       | Redeploy Apps Script; confirm webhook env vars are set on Vercel.            |

---

## Security

- Do not commit `GOOGLE_SHEETS_WEBHOOK_SECRET` or JSON keys to git.
- Use a strong `INTAKE_SECRET` / webhook secret.
- Rotate secrets if exposed.
