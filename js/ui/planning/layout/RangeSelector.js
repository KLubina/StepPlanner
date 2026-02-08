export function createRangeSelectorHtml(planningRangeDays, planningEndDate) {
  return `
        <div class="range-selector">
            <div class="range-selector__row">
                <span class="range-selector__label">Planungszeitraum (Tage):</span>
                <div class="range-selector__controls">
                    <input id="planningRangeInput" type="number" min="1" max="365" value="${planningRangeDays}"
                           class="range-selector__input" />
                    <button onclick="App.stepPlanningManager.applyPlanningRangeInput()" class="btn-primary">
                        Übernehmen
                    </button>
                </div>
            </div>
            <div class="range-selector__row">
                <span class="range-selector__label">Oder Enddatum:</span>
                <div class="range-selector__controls">
                    <input id="planningEndDateInput" type="date" value="${planningEndDate || ""}"
                           class="range-selector__input" />
                    <button onclick="App.stepPlanningManager.applyPlanningEndDateInput()" class="btn-primary">
                        Übernehmen
                    </button>
                </div>
            </div>
        </div>
    `;
}
