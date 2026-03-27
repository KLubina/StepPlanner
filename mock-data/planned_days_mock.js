/**
 * Mock planned days for demo mode.
 *
 * templateIdPerDay: flat array of 90 template IDs (or null = unplanned).
 *   - Index 0  = today       (Mar 3, 2026 – Tuesday)
 *   - Index 89 = day +89     (May 31, 2026 – Sunday)
 *
 * Weekly pattern used as baseline:
 *   Sun → tmpl_leicht   Mon → tmpl_aktiv   Tue → tmpl_normal
 *   Wed → tmpl_aktiv    Thu → tmpl_normal   Fri → tmpl_aktiv
 *   Sat → tmpl_intensiv
 *
 * Some days deliberately break the pattern (rest days, sick days, holidays).
 * The MockLoader converts these into plannedDays keyed by "YYYY-MM-DD".
 */
// Dynamic generator for templateIdPerDay so demo always aligns to today
function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function defaultTemplateForWeekday(day) {
  // 0=Sun,1=Mon,...6=Sat
  switch (day) {
    case 0:
      return "tmpl_leicht";
    case 1:
      return "tmpl_aktiv";
    case 2:
      return "tmpl_normal";
    case 3:
      return "tmpl_aktiv";
    case 4:
      return "tmpl_normal";
    case 5:
      return "tmpl_aktiv";
    case 6:
      return "tmpl_intensiv";
    default:
      return "tmpl_normal";
  }
}

function generateTemplateIdPerDay(days = 90) {
  const arr = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i)); // fill from past → today

    const base = defaultTemplateForWeekday(d.getDay());

    // Small deterministic variation so some days look different but remain stable across reloads in one session
    const variationSeed =
      (d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()) % 7;
    let pick = base;
    if (variationSeed === 0) pick = "tmpl_ruhe"; // occasional rest day
    if (variationSeed === 1 && base !== "tmpl_ruhe") pick = "tmpl_leicht";

    arr.push(pick);
  }

  return arr;
}

export const templateIdPerDay = generateTemplateIdPerDay(90);
