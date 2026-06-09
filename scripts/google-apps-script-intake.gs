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
 * 7. (Recommended) Create a Drive folder "SFPLAYGROUND Intake Uploads" and add
 *    Script property INTAKE_DRIVE_FOLDER_ID = that folder's ID (from the URL).
 *
 * Redeploy after updates so duplicate prevention and file uploads run in production.
 */

var TAB_BY_KIND = {
  startups: "Startups",
  vcs: "Investors",
  speakers: "Operators & Experts",
  sponsors: "Sponsors",
};

var DUPLICATE_WINDOW_HOURS = 24;

function getExpectedSecret_() {
  return PropertiesService.getScriptProperties().getProperty("INTAKE_SECRET");
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function findEmailColumnIndex_(headers) {
  if (!headers || !headers.length) return -1;
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).trim().toLowerCase() === "email") {
      return i;
    }
  }
  return -1;
}

function normalizeEmail_(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

/**
 * True if the same email exists on this tab within DUPLICATE_WINDOW_HOURS.
 */
function sheetHasRecentDuplicate_(sheet, email, headers) {
  var normalized = normalizeEmail_(email);
  if (!normalized || normalized.indexOf("@") < 0) return false;

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var headerRow =
    headers && headers.length
      ? headers
      : sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  var emailCol = findEmailColumnIndex_(headerRow);
  if (emailCol < 0) return false;

  var cutoff = new Date(Date.now() - DUPLICATE_WINDOW_HOURS * 60 * 60 * 1000);
  var numCols = Math.max(sheet.getLastColumn(), headerRow.length);
  var data = sheet.getRange(2, 1, lastRow, numCols).getValues();

  for (var r = 0; r < data.length; r++) {
    var rowEmail = normalizeEmail_(data[r][emailCol]);
    if (rowEmail !== normalized) continue;

    var submittedRaw = data[r][0];
    var submitted =
      submittedRaw instanceof Date ? submittedRaw : new Date(submittedRaw);
    if (!isNaN(submitted.getTime()) && submitted >= cutoff) {
      return true;
    }
    if (isNaN(submitted.getTime())) {
      return true;
    }
  }

  return false;
}

function emailFromRow_(headers, row) {
  var emailCol = findEmailColumnIndex_(headers);
  if (emailCol < 0 || !row || !row.length) return "";
  return normalizeEmail_(row[emailCol]);
}

function getIntakeDriveFolder_() {
  var folderId = PropertiesService.getScriptProperties().getProperty(
    "INTAKE_DRIVE_FOLDER_ID",
  );
  if (folderId) {
    return DriveApp.getFolderById(folderId);
  }

  var folders = DriveApp.getFoldersByName("SFPLAYGROUND Intake Uploads");
  if (folders.hasNext()) {
    return folders.next();
  }

  return DriveApp.createFolder("SFPLAYGROUND Intake Uploads");
}

function sanitizeUploadFileName_(name) {
  var base = String(name || "upload")
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  return base || "upload";
}

function uploadIntakeFileToDrive_(base64Data, fileName, mimeType, category) {
  var folder = getIntakeDriveFolder_();
  var safeName = sanitizeUploadFileName_(fileName);
  var prefix = category === "logo" ? "logo" : "doc";
  var stampedName =
    prefix +
    "-" +
    Utilities.formatDate(new Date(), "GMT", "yyyyMMdd-HHmmss") +
    "-" +
    safeName;

  var blob = Utilities.newBlob(
    Utilities.base64Decode(base64Data),
    mimeType || "application/octet-stream",
    stampedName,
  );
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return "https://drive.google.com/file/d/" + file.getId() + "/view";
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

    if (body.action === "checkDuplicate") {
      var checkEmail = normalizeEmail_(body.email);
      var duplicate = sheetHasRecentDuplicate_(sheet, checkEmail, null);
      return jsonResponse_({ ok: true, duplicate: duplicate });
    }

    if (body.action === "uploadFile") {
      if (!body.data) {
        return jsonResponse_({ ok: false, error: "Missing file data" });
      }
      var driveUrl = uploadIntakeFileToDrive_(
        body.data,
        body.fileName,
        body.mimeType,
        body.category,
      );
      return jsonResponse_({ ok: true, url: driveUrl });
    }

    var headers = body.headers;
    var row = body.row;

    if (!row || !row.length) {
      return jsonResponse_({ ok: false, error: "Missing row data" });
    }

    var rowEmail = emailFromRow_(headers, row);
    if (rowEmail && sheetHasRecentDuplicate_(sheet, rowEmail, headers)) {
      return jsonResponse_({
        ok: false,
        error: "duplicate",
        duplicate: true,
      });
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
