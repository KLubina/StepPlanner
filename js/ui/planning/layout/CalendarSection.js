export function createCalendarSectionHtml(
  planningRangeDays,
  rangeSelectorHtml,
  legendHtml,
) {
  return `
        <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                <h3 id="planningRangeLabel" style="margin: 0;">Kalender (nächste ${planningRangeDays} Tage):</h3>
                ${rangeSelectorHtml}
                <button onclick="App.stepPlanningManager.clearCalendar()"
                        style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">
                    🗑️ Kalender leeren
                </button>
            </div>
            ${legendHtml}
            <div id="dayPlanningList"></div>
        </div>
    `;
}
