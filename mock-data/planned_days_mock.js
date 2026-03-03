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
export const templateIdPerDay = [
  // === March 2026 – starts Tue 3 ===========================================
  //  3 Tue          4 Wed            5 Thu            6 Fri
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  //  7 Sat           8 Sun            9 Mon           10 Tue
  "tmpl_intensiv",
  "tmpl_leicht",
  "tmpl_aktiv",
  "tmpl_normal",
  // 11 Wed          12 Thu           13 Fri           14 Sat
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_intensiv",
  // 15 Sun          16 Mon           17 Tue           18 Wed
  "tmpl_leicht",
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  // 19 Thu          20 Fri           21 Sat           22 Sun (lazy)
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_intensiv",
  "tmpl_ruhe",
  // 23 Mon          24 Tue           25 Wed (sick)    26 Thu (still low)
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_leicht",
  "tmpl_leicht",
  // 27 Fri          28 Sat           29 Sun           30 Mon
  "tmpl_normal",
  "tmpl_intensiv",
  "tmpl_leicht",
  "tmpl_aktiv",
  // 31 Tue
  "tmpl_normal",

  // === April 2026 ===========================================================
  //  1 Wed           2 Thu            3 Fri            4 Sat
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_intensiv",
  //  5 Sun           6 Mon            7 Tue            8 Wed
  "tmpl_leicht",
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  //  9 Thu          10 Fri           11 Sat           12 Sun
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_intensiv",
  "tmpl_leicht",
  // 13 Mon          14 Tue           15 Wed           16 Thu
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_normal",
  // 17 Fri          18 Sat           19 Sun           20 Mon
  "tmpl_aktiv",
  "tmpl_intensiv",
  "tmpl_leicht",
  "tmpl_aktiv",
  // 21 Tue          22 Wed           23 Thu           24 Fri
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  // 25 Sat          26 Sun (rest)    27 Mon           28 Tue
  "tmpl_intensiv",
  "tmpl_ruhe",
  "tmpl_aktiv",
  "tmpl_normal",
  // 29 Wed          30 Thu
  "tmpl_aktiv",
  "tmpl_normal",

  // === May 2026 =============================================================
  //  1 Fri (Tag der Arbeit – holiday → rest!) 2 Sat   3 Sun
  "tmpl_ruhe",
  "tmpl_intensiv",
  "tmpl_leicht",
  //  4 Mon           5 Tue            6 Wed            7 Thu
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_normal",
  //  8 Fri           9 Sat           10 Sun           11 Mon
  "tmpl_aktiv",
  "tmpl_intensiv",
  "tmpl_leicht",
  "tmpl_aktiv",
  // 12 Tue          13 Wed           14 Thu           15 Fri
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  // 16 Sat          17 Sun           18 Mon           19 Tue
  "tmpl_intensiv",
  "tmpl_leicht",
  "tmpl_aktiv",
  "tmpl_normal",
  // 20 Wed          21 Thu           22 Fri           23 Sat
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_intensiv",
  // 24 Sun          25 Mon           26 Tue           27 Wed
  "tmpl_leicht",
  "tmpl_aktiv",
  "tmpl_normal",
  "tmpl_aktiv",
  // 28 Thu          29 Fri           30 Sat           31 Sun
  "tmpl_normal",
  "tmpl_aktiv",
  "tmpl_intensiv",
  "tmpl_leicht",
];
