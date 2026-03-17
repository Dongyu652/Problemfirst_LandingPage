// ═══════════════════════════════════════════════════════════════
// problemfirst — Data Collection Module
// ═══════════════════════════════════════════════════════════════
// Sends signup, problem, and idea submissions to Google Sheets.
// All data is only visible to the spreadsheet owner (you).

// ── PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ──
const SHEET_API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AY5xjrSwIO_1GJMDF2jcYCJG8noODvXkvZx0mxEmpOYiG6FLkTQpRCig8DUf08t_ry12cjeIJXhNwhBM5rJsVCHmOE2rbz2UlD0dCy9ai98uhMeU37MFuFue-XjP7fS1V6YHuGxwxzFpEdmTHKzGhMZyDJhJmp5GINWXxX6ZQEC5CzE9OTcHAxH9VOibXlN6IjMfa7owFEUCL0knZkDo6q97RjjV2UZFjku_j30hromGbK5K_ckM0rS2BrsDX4NXKroAHXV2kBb6AAjDRVFc22AcTPff5oQKN6pwlfz6zYdI&lib=M1GL2ljt4vL-weB0Yny23Sxm2BIQBQev9";

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
