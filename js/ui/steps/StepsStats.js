export function createStatsHtml(currentSteps, averageSteps, totalSteps) {
  return `
        <div class="stats">
            <div class="stat-card">
                <div class="stat-value">${currentSteps.toLocaleString("de-DE")}</div>
                <div class="stat-label">Heutige Schritte</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${averageSteps.toLocaleString("de-DE")}</div>
                <div class="stat-label">Durchschnitt (90 Tage)</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${totalSteps.toLocaleString("de-DE")}</div>
                <div class="stat-label">Gesamt (90 Tage)</div>
            </div>
        </div>
    `;
}
