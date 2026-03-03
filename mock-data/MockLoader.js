/**
 * MockLoader – injects pre-built demo data into the app's data managers
 * so that the app shows realistic charts and calendars without a Firebase
 * connection.
 *
 * Usage (called once after a demo login, instead of loadUserData()):
 *
 *   import { setupMockData } from "../../mock-data/MockLoader.js";
 *   await setupMockData();
 */

import { stepsPerDay } from "./steps_mock.js";
import { mockTemplates } from "./step_templates_mock.js";
import { templateIdPerDay } from "./planned_days_mock.js";

import * as StepsManager from "../js/services/data/StepsManager.js";
import * as TemplateService from "../js/services/data/step-planning/TemplateService.js";
import * as GoalService from "../js/services/data/step-planning/GoalService.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Formats a Date as "YYYY-MM-DD" (same as DateUtils.toLocalDateString).
 */
function toISODateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Returns a Date set to midnight local time for "today – offsetDays".
 */
function dayOffset(offsetDays) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d;
}

// ---------------------------------------------------------------------------
// Build steps records
// ---------------------------------------------------------------------------

/**
 * Converts the raw stepsPerDay array into the shape StepsManager expects:
 *   { id, date (de-DE string), steps, timestamp (Date) }
 *
 * stepsPerDay[0] = 89 days ago, stepsPerDay[89] = today.
 * null entries are skipped (simulate days without tracking).
 */
function buildStepsRecords() {
  const totalDays = stepsPerDay.length; // 90
  const records = [];

  stepsPerDay.forEach((steps, idx) => {
    if (steps === null) return; // skipped day

    const daysAgo = totalDays - 1 - idx; // idx 0 → 89 days ago
    const date = dayOffset(-daysAgo);

    records.push({
      id: `mock_step_${idx}`,
      date: date.toLocaleDateString("de-DE"),
      steps,
      timestamp: date,
    });
  });

  return records;
}

// ---------------------------------------------------------------------------
// Build planned-days object
// ---------------------------------------------------------------------------

/**
 * Converts templateIdPerDay into the shape GoalService expects:
 *   { "YYYY-MM-DD": { targetSteps, templateId, date } }
 *
 * templateIdPerDay[0] = today, templateIdPerDay[N] = today + N days.
 * null entries are skipped (unplanned day).
 */
function buildPlannedDays(templateMap) {
  const plannedDays = {};

  templateIdPerDay.forEach((templateId, idx) => {
    if (!templateId) return;

    const date = dayOffset(idx);
    const dateStr = toISODateStr(date);
    const template = templateMap[templateId];

    if (!template) {
      console.warn(
        `MockLoader: unknown templateId "${templateId}" at index ${idx}`,
      );
      return;
    }

    plannedDays[dateStr] = {
      targetSteps: template.targetSteps,
      templateId,
      date,
    };
  });

  return plannedDays;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Call this after setUser() in demo mode to populate all data managers with
 * consistent mock data.  This replaces the Firebase loadSteps / init calls.
 */
export async function setupMockData() {
  // 1. Build a quick lookup map: id → template
  const templateMap = {};
  mockTemplates.forEach((t) => (templateMap[t.id] = t));

  // 2. Inject templates
  TemplateService.injectMockTemplates([...mockTemplates]);

  // 3. Inject step history
  StepsManager.injectMockData(buildStepsRecords());

  // 4. Inject planned days (includes today and next ~90 days)
  GoalService.injectMockPlannedDays(buildPlannedDays(templateMap));

  console.info(
    "[MockLoader] Demo data loaded – " +
      `${stepsPerDay.filter(Boolean).length} step entries, ` +
      `${mockTemplates.length} templates, ` +
      `${templateIdPerDay.filter(Boolean).length} planned days.`,
  );
}
