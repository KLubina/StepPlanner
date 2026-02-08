export function createMainHtml(statsHtml, chartHtml) {
  return `
        <h2 style="margin: 0;">Schrittverlauf</h2>
        ${statsHtml}
        <div class="chart-container">
            ${chartHtml}
        </div>
        <div style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: #666;">
            💡 Klicke auf einen Punkt im Graph, um Details zu sehen
        </div>
        <div id="stepsDetailsPanel" style="display:none; margin-top:20px; padding:20px; background:#f8f9fa; border-radius:10px; border:2px solid #667eea;">
            <div id="stepsDetailsContent"></div>
        </div>
        <div style="height:120px;"></div>
    `;
}
