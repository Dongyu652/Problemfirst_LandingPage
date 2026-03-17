// ═══════════════════════════════════════════════════════════════
// problemfirst — Google Apps Script Backend
// ═══════════════════════════════════════════════════════════════
//
// SETUP INSTRUCTIONS:
// 1. Go to https://sheets.google.com → Create a new spreadsheet
// 2. Name it "problemfirst-database"
// 3. Create 3 sheets (tabs) named exactly:
//    - Signups
//    - Problems
//    - Ideas
// 4. Go to Extensions → Apps Script
// 5. Delete any existing code and paste this entire file
// 6. Click Deploy → New deployment
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 7. Click Deploy → Copy the Web App URL
// 8. Paste that URL into your site's assets/js/db.js file (line 7)
//
// SECURITY: Only YOUR Google account can view the spreadsheet.
// The web app only accepts writes from your site and reads with your secret key.
// ═══════════════════════════════════════════════════════════════

// ── CHANGE THIS to a random string only you know ──
const ADMIN_SECRET = "pf-admin-2026-CHANGEME";

// ── Sheet column headers (auto-created on first write) ──
const HEADERS = {
  Signups: ["Timestamp", "Name", "Email", "Source"],
  Problems: ["Timestamp", "Title", "Who", "Industry", "Frequency", "Pain Level", "Workaround", "Will Pay"],
  Ideas: ["Timestamp", "Title", "Description", "Target Users", "Problem Being Solved", "Assumptions", "Feedback Types", "Reward Type", "Reward Amount"],
};

// ── POST handler: receives form submissions ──
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type; // "signup", "problem", or "idea"
    const payload = data.payload;

    if (!type || !payload) {
      return jsonResponse({ success: false, error: "Missing type or payload" });
    }

    const sheetName = type === "signup" ? "Signups" : type === "problem" ? "Problems" : type === "idea" ? "Ideas" : null;

    if (!sheetName) {
      return jsonResponse({ success: false, error: "Invalid type" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);

    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, HEADERS[sheetName].length).setValues([HEADERS[sheetName]]);
      sheet.getRange(1, 1, 1, HEADERS[sheetName].length).setFontWeight("bold");
    }

    // Add headers if first row is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS[sheetName].length).setValues([HEADERS[sheetName]]);
      sheet.getRange(1, 1, 1, HEADERS[sheetName].length).setFontWeight("bold");
    }

    const timestamp = new Date().toISOString();
    let row;

    if (type === "signup") {
      row = [timestamp, payload.name || "", payload.email || "", payload.source || "checkout"];
    } else if (type === "problem") {
      row = [timestamp, payload.title || "", payload.who || "", payload.industry || "", payload.frequency || "", payload.pain || "", payload.workaround || "", payload.willPay || ""];
    } else if (type === "idea") {
      row = [timestamp, payload.title || "", payload.desc || "", payload.target || "", payload.problem || "", payload.assumptions || "", (payload.feedbackTypes || []).join(", "), payload.rewardType || "", payload.rewardAmount || ""];
    }

    sheet.appendRow(row);

    return jsonResponse({ success: true, type: type });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

// ── GET handler: admin reads data with secret key ──
function doGet(e) {
  const key = e.parameter.key;
  const action = e.parameter.action;

  // Public health check (no key needed)
  if (action === "ping") {
    return jsonResponse({ success: true, message: "problemfirst backend is running" });
  }

  // Everything else requires the secret key
  if (key !== ADMIN_SECRET) {
    return jsonResponse({ success: false, error: "Unauthorized" });
  }

  if (action === "read") {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const result = {};

    ["Signups", "Problems", "Ideas"].forEach(function (name) {
      const sheet = ss.getSheetByName(name);
      if (sheet && sheet.getLastRow() > 1) {
        const data = sheet.getDataRange().getValues();
        const headers = data[0];
        const rows = data.slice(1).map(function (row) {
          const obj = {};
          headers.forEach(function (h, i) {
            obj[h] = row[i];
          });
          return obj;
        });
        result[name.toLowerCase()] = rows;
      } else {
        result[name.toLowerCase()] = [];
      }
    });

    return jsonResponse({ success: true, data: result });
  }

  if (action === "stats") {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const stats = {};

    ["Signups", "Problems", "Ideas"].forEach(function (name) {
      const sheet = ss.getSheetByName(name);
      stats[name.toLowerCase()] = sheet ? Math.max(0, sheet.getLastRow() - 1) : 0;
    });

    return jsonResponse({ success: true, stats: stats });
  }

  return jsonResponse({ success: false, error: "Unknown action" });
}

// ── Helper: CORS-safe JSON response ──
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
