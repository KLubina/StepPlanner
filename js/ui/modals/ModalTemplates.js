export function createDaySelectorModalHtml(
  date,
  currentGoalDisplay,
  templateButtons,
  actionButtons,
) {
  return `
        <div id="stepTemplateSelectorModal" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        " onclick="if(event.target.id === 'stepTemplateSelectorModal') this.remove()">
            <div style="
                background: white;
                border-radius: 12px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            " onclick="event.stopPropagation()">
                <h3 style="margin-top: 0;">Schrittziel für ${date.toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })} auswählen</h3>

                ${currentGoalDisplay}

                <div style="display: grid; gap: 10px; margin: 20px 0;">
                    ${templateButtons}
                </div>

                ${actionButtons}
            </div>
        </div>
    `;
}

export function createEditGoalModalHtml(
  date,
  currentTargetSteps,
  dateStr,
  templateId,
) {
  return `
        <div id="stepGoalEditModal" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        " onclick="if(event.target.id === 'stepGoalEditModal') this.remove()">
            <div style="
                background: white;
                border-radius: 12px;
                padding: 30px;
                max-width: 400px;
                width: 90%;
            " onclick="event.stopPropagation()">
                <h3 style="margin-top: 0;">Schrittziel bearbeiten</h3>
                <p style="color: #666; margin-bottom: 20px;">
                    ${date.toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                </p>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">
                        Schrittziel:
                    </label>
                    <input type="number" id="editTargetStepsInput" value="${currentTargetSteps}"
                           style="
                               width: 100%;
                               padding: 12px;
                               border: 2px solid #e9ecef;
                               border-radius: 8px;
                               font-size: 16px;
                               box-sizing: border-box;
                           "
                           min="0"
                           step="1000">
                </div>

                <button onclick="App.stepPlanningRenderer.saveEditedGoal('${dateStr}', '${templateId || ""}')"
                        style="
                            width: 100%;
                            background: #28a745;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            padding: 12px;
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 16px;
                        ">
                    💾 Speichern
                </button>

                <button onclick="document.getElementById('stepGoalEditModal').remove(); App.stepPlanningRenderer.openDaySelector('${dateStr}')"
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
            </div>
        </div>
    `;
}
