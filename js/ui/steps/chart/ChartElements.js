export function generateLinePath(
  chartHtml,
  filteredData,
  startDate,
  daysToShow,
  chartWidth,
  chartHeight,
  leftPadding,
  rightPadding,
  topPadding,
  bottomPadding,
  minSteps,
  range,
) {
  let html = chartHtml;
  if (filteredData.length > 1) {
    let pathData = "";
    filteredData.forEach((point, index) => {
      const dayDifference = Math.round(
        (point.timestamp - startDate) / 86400000,
      );
      const x =
        leftPadding +
        (chartWidth - leftPadding - rightPadding) *
          (dayDifference / (daysToShow - 1));
      const y =
        topPadding +
        (chartHeight - topPadding - bottomPadding) *
          (1 - (point.steps - minSteps) / range);
      pathData += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });
    html += `<path d="${pathData}" fill="none" stroke="#667eea" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  return html;
}

export function generateDataPoints(
  chartHtml,
  filteredData,
  stepsData,
  startDate,
  daysToShow,
  chartWidth,
  chartHeight,
  leftPadding,
  rightPadding,
  topPadding,
  bottomPadding,
  minSteps,
  range,
) {
  let html = chartHtml;
  filteredData.forEach((point, index) => {
    const dayDifference = Math.round((point.timestamp - startDate) / 86400000);
    const x =
      leftPadding +
      (chartWidth - leftPadding - rightPadding) *
        (dayDifference / (daysToShow - 1));
    const y =
      topPadding +
      (chartHeight - topPadding - bottomPadding) *
        (1 - (point.steps - minSteps) / range);

    const dataIndex = stepsData.indexOf(point);
    html += `
            <circle cx="${x}" cy="${y}" r="6" fill="#667eea" stroke="white" stroke-width="2" style="cursor:pointer;"
                onclick="App.stepsRenderer.showStepsDetails('${point.date}', ${point.steps}, ${dataIndex})"
                onmouseover="this.setAttribute('r','8')" onmouseout="this.setAttribute('r','6')">
                <title>${point.date}: ${point.steps.toLocaleString("de-DE")} Schritte</title>
            </circle>`;
  });
  return html;
}
