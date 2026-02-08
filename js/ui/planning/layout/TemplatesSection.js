export function createTemplatesSectionHtml() {
  return `
        <div>
            <h3>Deine Schritt-Templates:</h3>
            <div id="templatesList"></div>

            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h3 style="margin: 0;">Standard-Schrittziele pro Wochentag:</h3>
                    <button onclick="App.stepPlanningManager.resetAllDefaults()"
                            style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">
                        🔄 Alle zurücksetzen
                    </button>
                </div>
                <p style="font-size: 14px; color: #666; margin-bottom: 15px;">
                    Lege fest, welches Schrittziel automatisch für neue Tage verwendet wird.
                </p>
                <div id="defaultTemplatesSettings"></div>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
                    <button onclick="App.stepPlanningManager.applyDefaultsToAllDays()"
                            style="width: 100%; padding: 10px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                        ✨ Standard-Ziele auf alle Tage anwenden
                    </button>
                    <p style="font-size: 12px; color: #666; margin-top: 8px; margin-bottom: 0;">
                        Wendet die Standard-Ziele auf alle ungeplanten zukünftigen Tage an.
                    </p>
                </div>
            </div>
        </div>
    `;
}
