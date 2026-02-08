export function createDefaultSettingsHtml(templates, defaultTemplates) {
  const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';

  weekdays.forEach((day, index) => {
    const selectedTemplateId = defaultTemplates[index];
    const selectedTemplate = selectedTemplateId
      ? templates.find((t) => t.id === selectedTemplateId)
      : null;

    html += `
            <div style="display: flex; align-items: center; gap: 10px;">
                <label style="min-width: 40px; font-weight: 600; color: #495057;">${day}:</label>
                <select onchange="App.stepPlanningManager.updateDefaultTemplate(${index}, this.value)"
                        style="flex: 1; padding: 8px; border: 2px solid #e9ecef; border-radius: 6px; font-size: 14px; cursor: pointer;
                               ${selectedTemplate ? `background: ${selectedTemplate.color}; color: white; font-weight: 600;` : ""}">
                    <option value="">-- Kein Standard-Ziel --</option>
                    ${templates
                      .map(
                        (template) => `
                        <option value="${template.id}" ${selectedTemplateId === template.id ? "selected" : ""}>
                            ${template.name} (${template.targetSteps.toLocaleString("de-DE")} Schritte)
                        </option>
                    `,
                      )
                      .join("")}
                </select>
            </div>
        `;
  });

  html += "</div>";
  return html;
}
