// ═══════════════════════════════════════════════════════════════
// problemfirst — Data Collection Module
// ═══════════════════════════════════════════════════════════════
// Sends signup, problem, and idea submissions to Google Sheets.
// All data is only visible to the spreadsheet owner (you).

// ── PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ──
const SHEET_API_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

// ── Core submit function ──
async function submitToSheet(type, payload) {
  // Skip if URL not configured
  if (!SHEET_API_URL || SHEET_API_URL.includes("YOUR_GOOGLE")) {
    console.log(`[DB] Skipped (not configured): ${type}`, payload);
    return { success: false, reason: "not_configured" };
  }

  try {
    const response = await fetch(SHEET_API_URL, {
      method: "POST",
      mode: "no-cors", // Google Apps Script requires this
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ type, payload }),
    });

    // no-cors means we can't read the response, but the data is sent
    console.log(`[DB] Submitted: ${type}`);
    return { success: true };
  } catch (err) {
    console.error(`[DB] Error submitting ${type}:`, err);
    return { success: false, error: err.message };
  }
}

// ── Convenience wrappers ──

function dbSaveSignup(name, email, source) {
  return submitToSheet("signup", {
    name: name || "",
    email: email || "",
    source: source || "checkout",
  });
}

function dbSaveProblem(formData) {
  return submitToSheet("problem", {
    title: formData.title || "",
    who: formData.who || "",
    industry: formData.industry || "",
    frequency: formData.frequency || "",
    pain: formData.pain || "",
    workaround: formData.workaround || "",
    willPay: formData.willPay || "",
  });
}

function dbSaveIdea(formData) {
  return submitToSheet("idea", {
    title: formData.title || "",
    desc: formData.desc || "",
    target: formData.target || "",
    problem: formData.problem || "",
    assumptions: formData.assumptions || "",
    feedbackTypes: formData.feedbackTypes || [],
    rewardType: formData.rewardType || "",
    rewardAmount: formData.rewardAmount || "",
  });
}
