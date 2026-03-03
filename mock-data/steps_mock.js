/**
 * Mock step data for demo mode.
 *
 * stepsPerDay: flat array of 90 values.
 *   - Index 0  = 89 days ago  (Dec 4, 2025 – Thursday)
 *   - Index 89 = today        (Mar 3, 2026 – Tuesday)
 *   - null = no entry recorded for that day (logged as gap in chart)
 *
 * Values were designed to look realistic:
 *   weekdays ~8 000–12 000, Saturdays sometimes higher (hikes),
 *   Sundays lower, holidays noticeably low.
 */
export const stepsPerDay = [
  // === December 2025 ========================================================
  //  4 Thu   5 Fri    6 Sat    7 Sun    8 Mon    9 Tue   10 Wed
  9200,
  10500,
  7800,
  5200,
  9800,
  11200,
  8600,
  // 11 Thu  12 Fri   13 Sat   14 Sun   15 Mon   16 Tue  17 Wed
  10100,
  9300,
  13800,
  6400,
  null,
  7500,
  11000,
  // 18 Thu  19 Fri   20 Sat   21 Sun   22 Mon   23 Tue  24 Wed  (Christmas Eve)
  9700,
  10200,
  14500,
  5900,
  8300,
  12500,
  6800,
  // 25 Thu  26 Fri   27 Sat   28 Sun   29 Mon   30 Tue  31 Wed  (New Year's Eve)
  4200,
  3800,
  7100,
  5600,
  8900,
  9400,
  4500,

  // === January 2026 =========================================================
  //  1 Thu   2 Fri    3 Sat    4 Sun    5 Mon    6 Tue   7 Wed
  3200,
  8600,
  10200,
  6700,
  9100,
  10800,
  9500,
  //  8 Thu   9 Fri   10 Sat   11 Sun   12 Mon   13 Tue  14 Wed
  8700,
  11300,
  12400,
  5800,
  10200,
  9600,
  null,
  // 15 Thu  16 Fri   17 Sat   18 Sun   19 Mon   20 Tue  21 Wed
  11500,
  8400,
  15200,
  7300,
  9800,
  10400,
  8900,
  // 22 Thu  23 Fri   24 Sat   25 Sun   26 Mon   27 Tue  28 Wed
  7600,
  12100,
  9500,
  4900,
  10700,
  9300,
  8100,
  // 29 Thu  30 Fri   31 Sat
  11600,
  10900,
  13700,

  // === February 2026 ========================================================
  //  1 Sun   2 Mon    3 Tue    4 Wed    5 Thu    6 Fri   7 Sat
  6200,
  9400,
  10800,
  9200,
  7800,
  11400,
  8600,
  //  8 Sun   9 Mon   10 Tue   11 Wed   12 Thu   13 Fri  14 Sat  (Valentine's)
  null,
  10500,
  9700,
  8300,
  11200,
  10600,
  7400,
  // 15 Sun  16 Mon   17 Tue   18 Wed   19 Thu   20 Fri  21 Sat  (winter hike)
  6800,
  9900,
  10300,
  8700,
  11800,
  9400,
  14800,
  // 22 Sun  23 Mon   24 Tue   25 Wed   26 Thu   27 Fri  28 Sat
  7200,
  9600,
  10100,
  8500,
  11900,
  10200,
  12300,

  // === March 2026 ===========================================================
  //  1 Sun   2 Mon    3 Tue (today, partial day)
  6900,
  9800,
  7500,
];
