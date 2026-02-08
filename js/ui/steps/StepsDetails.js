export function calculateStepsChange(steps, previousSteps) {
  const stepsChange = steps - previousSteps;

  let changeColor = "#666";
  let changeText = "Keine Veränderung";
  let changeIcon = "➡️";

  if (stepsChange > 0) {
    changeColor = "#28a745";
    changeText = `+${stepsChange.toLocaleString("de-DE")}`;
    changeIcon = "📈";
  } else if (stepsChange < 0) {
    changeColor = "#dc3545";
    changeText = `${stepsChange.toLocaleString("de-DE")}`;
    changeIcon = "📉";
  }

  return { changeColor, changeText, changeIcon };
}

export function createStepsDetailsHtml(
  dateString,
  steps,
  changeColor,
  changeText,
  changeIcon,
) {
  return `
        <div style="border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-bottom: 15px;">
            <h3>Schritte Details - ${dateString}</h3>
            <div style="display: flex; gap: 20px; align-items: center; margin-top: 10px;">
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;">
                        ${steps.toLocaleString("de-DE")}
                    </div>
                    <div style="font-size: 0.9rem; color: #666;">Schritte an diesem Tag</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: bold; color: ${changeColor};">
                        ${changeIcon} ${changeText}
                    </div>
                    <div style="font-size: 0.9rem; color: #666;">Veränderung zum Vortag</div>
                </div>
            </div>
        </div>
        <button
            onclick="App.stepsRenderer.hideStepsDetails()"
            style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Schließen
        </button>
    `;
}
