export function createTemplateCardHtml(template) {
  const color = template.color || "#667eea";
  const targetSteps = template.targetSteps || 0;
  const weightChangePerDay = template.weightChangePerDay || 0;
  const notesPreview = template.notes
    ? template.notes.substring(0, 80) +
      (template.notes.length > 80 ? "..." : "")
    : "Keine Notizen";

  return `
        <div style="background: white; border: 3px solid ${color}; border-radius: 12px; padding: 15px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 30px; height: 30px; background: ${color}; border-radius: 6px;"></div>
                    <h4 style="margin: 0;">${template.name}</h4>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button onclick="App.templateEditor.startEdit('${template.id}')"
                            style="padding: 6px 12px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer;">
                        ✏️
                    </button>
                    <button onclick="App.stepPlanningManager.deleteWithConfirm('${template.id}')"
                            style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer;">
                        🗑️
                    </button>
                </div>
            </div>
            <div style="font-size: 14px; color: #666;">
                <strong>🎯 ${targetSteps.toLocaleString("de-DE")} Schritte | ⚖️ ${weightChangePerDay > 0 ? "+" : ""}${weightChangePerDay} g/Tag</strong><br>
                <div style="margin-top: 8px; padding: 8px; background: #f8f9fa; border-radius: 6px; font-size: 13px;">
                    ${notesPreview}
                </div>
            </div>
        </div>
    `;
}
