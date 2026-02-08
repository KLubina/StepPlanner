import TemplatesRenderer from "./planning/TemplatesRenderer.js";
import SettingsRenderer from "./planning/SettingsRenderer.js";
import CalendarRenderer from "./planning/CalendarRenderer.js";
import PlanningModals from "./planning/PlanningModals.js";
import { createHeaderHtml } from "./planning/layout/PlanningHeader.js";
import { createTemplatesSectionHtml } from "./planning/layout/TemplatesSection.js";
import { createRangeSelectorHtml } from "./planning/layout/RangeSelector.js";
import { createLegendHtml } from "./planning/layout/PlanningLegend.js";
import { createCalendarSectionHtml } from "./planning/layout/CalendarSection.js";
import { createMainLayoutHtml } from "./planning/layout/PlanningLayout.js";

export default class PlanningRenderer {
  constructor(manager) {
    this.manager = manager;
    this.templatesRenderer = new TemplatesRenderer(manager);
    this.settingsRenderer = new SettingsRenderer(manager);
    this.calendarRenderer = new CalendarRenderer(manager);
    this.modals = new PlanningModals(manager);
  }

  render() {
    const container = document.getElementById("stepPlanningContainer");
    if (!container) return;

    const planningRangeDays = this.manager.getPlanningRangeDays();
    const planningEndDate = this.manager.getPlanningEndDate();

    const headerHtml = createHeaderHtml();
    const templatesSectionHtml = createTemplatesSectionHtml();
    const rangeSelectorHtml = createRangeSelectorHtml(
      planningRangeDays,
      planningEndDate,
    );
    const legendHtml = createLegendHtml();
    const calendarSectionHtml = createCalendarSectionHtml(
      planningRangeDays,
      rangeSelectorHtml,
      legendHtml,
    );
    const mainLayoutHtml = createMainLayoutHtml(
      headerHtml,
      templatesSectionHtml,
      calendarSectionHtml,
    );

    container.innerHTML = mainLayoutHtml;
    this.templatesRenderer.render();
    this.settingsRenderer.render();
    this.calendarRenderer.render();
  }

  openDaySelector(dateStr) {
    this.modals.openDaySelector(dateStr);
  }

  openEditGoal(dateStr, currentTargetSteps, templateId) {
    this.modals.openEditGoal(dateStr, currentTargetSteps, templateId);
  }

  async saveEditedGoal(dateStr, templateId) {
    await this.modals.saveEditedGoal(dateStr, templateId);
  }
}
