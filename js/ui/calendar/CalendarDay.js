export function createDayCellHtml(
  date,
  dateStr,
  planned,
  assignedTemplate,
  defaultTemplate,
  isToday,
) {
  const displayTemplate = assignedTemplate || defaultTemplate;
  const color = displayTemplate?.color || "#e9ecef";
  const isDefaultTemplate = !assignedTemplate && defaultTemplate;
  const targetSteps = displayTemplate?.targetSteps || 0;

  return `
        <div class="step-calendar-day"
             style="background: ${displayTemplate ? (isDefaultTemplate ? color + "40" : color) : "white"};
                    border-color: ${displayTemplate ? color : isToday ? "#667eea" : "#e9ecef"};
                    ${isDefaultTemplate ? "border-style: dashed;" : ""}
                    ${isToday ? "border-width: 3px;" : ""}
                    ${displayTemplate && !isDefaultTemplate ? "color: white;" : ""}"
             onclick="App.stepPlanningRenderer.openDaySelector('${dateStr}')">
            <div class="step-day-number">${date.getDate()}</div>
            <div class="step-day-label">${date.toLocaleDateString("de-DE", { month: "short" })}</div>
            ${targetSteps > 0 ? `<div class="step-day-goal">${(targetSteps / 1000).toFixed(1)}k</div>` : ""}
            ${assignedTemplate ? `<div class="step-day-label" style="margin-top: 2px;">📋</div>` : ""}
            ${isDefaultTemplate ? `<div class="step-day-label" style="margin-top: 2px; font-size: 10px;">✨</div>` : ""}
        </div>
    `;
}
