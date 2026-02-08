export function createFormField(label, inputHtml, helpText = "") {
  return `
        <div style="margin: 20px 0;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">${label}</label>
            ${inputHtml}
            ${helpText ? `<small style="color: #666; font-size: 14px;">${helpText}</small>` : ""}
        </div>
    `;
}

export function createButtons() {
  return `
        <div style="margin-top: 30px; display: flex; gap: 10px;">
            <button onclick="App.templateEditor.handleSave()" style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                Template speichern
            </button>
            <button onclick="App.templateEditor.handleCancel()" style="padding: 12px 24px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer;">
                Abbrechen
            </button>
        </div>
    `;
}
