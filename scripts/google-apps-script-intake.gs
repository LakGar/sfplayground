/**
 * SFPLAYGROUND intake → Google Sheets (no service account key required)
 *
 * Setup:
 * 1. Open your intake spreadsheet in Google Sheets (staff@sfplaygroundai.com).
 * 2. Extensions → Apps Script → paste this file → save.
 * 3. Project Settings → Script properties → add INTAKE_SECRET (long random string).
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me (staff@sfplaygroundai.com)
 *    - Who has access: Anyone
 * 5. Copy the Web App URL → GOOGLE_SHEETS_WEBHOOK_URL in Vercel / .env.local
 * 6. Set GOOGLE_SHEETS_WEBHOOK_SECRET to the same value as INTAKE_SECRET
 */

var TAB_BY_KIND = {
  startups: "Startups",
  vcs: "Investors",
  speakers: "Operators & Experts",
  sponsors: "Sponsors",
};

function getExpectedSecret_() {
  return PropertiesService.getScriptProperties().getProperty("INTAKE_SECRET");
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/** Opening the web app URL in a browser uses GET — this is normal; forms use POST. */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      message: "SFPLAYGROUND intake webhook is running. Form submissions use POST.",
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var expected = getExpectedSecret_();

    if (expected && body.secret !== expected) {
      return jsonResponse_({ ok: false, error: "Unauthorized" });
    }

    var kind = body.kind;
    var sheetName = TAB_BY_KIND[kind];
    if (!sheetName) {
      return jsonResponse_({ ok: false, error: "Invalid intake kind" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    var headers = body.headers;
    var row = body.row;

    if (!row || !row.length) {
      return jsonResponse_({ ok: false, error: "Missing row data" });
    }

    if (sheet.getLastRow() === 0) {
      if (headers && headers.length) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    } else {
      var firstCell = sheet.getRange(1, 1).getValue();
      if (!firstCell && headers && headers.length) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }

    sheet.appendRow(row);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}
