export function generateYAxis(
  chartHtml,
  maxSteps,
  range,
  chartWidth,
  chartHeight,
  leftPadding,
  rightPadding,
  topPadding,
  bottomPadding,
) {
  let html = chartHtml;
  for (let i = 0; i <= 5; i++) {
    const y = topPadding + (chartHeight - topPadding - bottomPadding) * (i / 5);
    const steps = maxSteps - range * (i / 5);
    html += `
            <line x1="${leftPadding}" y1="${y}" x2="${chartWidth - rightPadding}" y2="${y}" stroke="#e9ecef" stroke-width="1"/>
            <text x="${leftPadding - 8}" y="${y + 4}" font-size="12" fill="#666" text-anchor="end">${Math.round(steps).toLocaleString("de-DE")}</text>`;
  }
  return html;
}

export function generateXAxis(
  chartHtml,
  startDate,
  daysToShow,
  chartWidth,
  chartHeight,
  leftPadding,
  rightPadding,
  topPadding,
  bottomPadding,
) {
  let html = chartHtml;
  for (let day = 0; day < daysToShow; day++) {
    if (day % 7 === 0 || day === daysToShow - 1) {
      const x =
        leftPadding +
        (chartWidth - leftPadding - rightPadding) * (day / (daysToShow - 1));
      html += `<line x1="${x}" y1="${topPadding}" x2="${x}" y2="${chartHeight - bottomPadding}" stroke="#f1f3f4" stroke-width="1"/>`;

      const tickDate = new Date(startDate);
      tickDate.setDate(startDate.getDate() + day);
      const label = tickDate.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
      });
      html += `<text x="${x}" y="${chartHeight - 10}" font-size="11" fill="#666" text-anchor="middle">${label}</text>`;
    }
  }
  return html;
}

export function addAxes(
  chartHtml,
  leftPadding,
  rightPadding,
  topPadding,
  bottomPadding,
  chartWidth,
  chartHeight,
) {
  let html = chartHtml;
  html += `<line x1="${leftPadding}" y1="${chartHeight - bottomPadding}" x2="${chartWidth - rightPadding}" y2="${chartHeight - bottomPadding}" stroke="#adb5bd" stroke-width="1.5"/>`;
  html += `<line x1="${leftPadding}" y1="${topPadding}" x2="${leftPadding}" y2="${chartHeight - bottomPadding}" stroke="#adb5bd" stroke-width="1.5"/>`;
  return html;
}
