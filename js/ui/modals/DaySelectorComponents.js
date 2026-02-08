export function createCurrentGoalDisplay(
  planned,
  currentTemplate,
  currentTargetSteps,
  dateStr,
) {
  if (!planned) {
    return '<p style="color: #666;">Noch kein Ziel zugewiesen</p>';
  }

  return `
        <div style="background: ${currentTemplate?.color || "#667eea"}; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>Aktuell: ${currentTemplate?.name || "Individuell"}</strong><br>
                    <span style="font-size: 14px;">🎯 ${currentTargetSteps.toLocaleString("de-DE")} Schritte</span>
                </div>
                <button onclick="App.stepPlanningRenderer.openEditGoal('${dateStr}', ${currentTargetSteps}, '${currentTemplate?.id || ""}')"
                        style="
                            background: white;
                            color: #333;
                            border: none;
                            border-radius: 6px;
                            padding: 8px 16px;
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 14px;
                        ">
                    ✏️ Bearbeiten
                </button>
            </div>
        </div>
    `;
}

export function createTemplateButtons(templates, currentTemplate, dateStr) {
  return templates
    .map(
      (template) => `
        <button onclick="App.stepPlanningManager.selectTemplateForDay('${dateStr}', '${template.id}')"
                style="
                    background: ${template.color};
                    color: white;
                    border: ${currentTemplate?.id === template.id ? "3px solid #333" : "none"};
                    border-radius: 8px;
                    padding: 15px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                    transition: transform 0.2s;
                    text-align: left;
                "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">
            📋 ${template.name}<br>
            <span style="font-size: 14px; opacity: 0.9;">🎯 ${template.targetSteps.toLocaleString("de-DE")} Schritte</span>
        </button>
    `,
    )
    .join("");
}

export function createActionButtons(planned, dateStr) {
  let buttons = "";

  if (planned) {
    buttons += `
            <button onclick="App.stepPlanningManager.selectTemplateForDay('${dateStr}', null)"
                    style="
                        width: 100%;
                        background: #dc3545;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        padding: 12px;
                        cursor: pointer;
                        font-weight: 600;
                        margin-top: 10px;
                    ">
                Ziel entfernen
            </button>
        `;
  }

  buttons += `
        <button onclick="document.getElementById('stepTemplateSelectorModal').remove()"
                style="
                    width: 100%;
                    background: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    padding: 12px;
                    cursor: pointer;
                    margin-top: 10px;
                ">
            Abbrechen
        </button>
    `;

  return buttons;
}
