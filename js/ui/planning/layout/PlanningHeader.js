export function createHeaderHtml() {
  return `
        <div style="max-width: 1400px; margin: 0 auto;">
            <h2 style="text-align: center; margin-bottom: 20px;">🎯 Schritt-Ziele planen</h2>

            <div style="margin-bottom: 30px; display: flex; gap: 15px; flex-wrap: wrap;">
                <button onclick="App.templateEditor.startEdit(null)"
                        style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px;">
                    ➕ Neues Schritt-Template erstellen
                </button>
            </div>
        </div>
    `;
}
