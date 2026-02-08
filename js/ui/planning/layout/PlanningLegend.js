export function createLegendHtml() {
  return `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; font-size: 13px;">
            <strong>Legende:</strong><br>
            <div style="display: flex; gap: 20px; margin-top: 10px; flex-wrap: wrap;">
                <div>📋 = Fest geplant</div>
                <div>✨ = Standard-Template (automatisch)</div>
                <div style="border: 2px dashed #666; padding: 2px 8px; border-radius: 4px;">Gestrichelt = Nicht fest geplant</div>
            </div>
        </div>
    `;
}
