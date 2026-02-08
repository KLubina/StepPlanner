import {
  createCurrentGoalDisplay,
  createTemplateButtons,
  createActionButtons,
} from "../modals/DaySelectorComponents.js";
import {
  createDaySelectorModalHtml,
  createEditGoalModalHtml,
} from "../modals/ModalTemplates.js";
import { validateTargetSteps } from "../modals/ModalValidation.js";

export default class PlanningModals {
  constructor(manager) {
    this.manager = manager;
  }

  openDaySelector(dateStr) {
    const date = new Date(dateStr);
    const planned = this.manager.getPlannedDays()[dateStr];
    const templates = this.manager.getTemplates();
    const currentTemplate = planned
      ? templates.find((t) => t.id === planned.templateId)
      : null;
    const currentTargetSteps = planned ? planned.targetSteps : 0;

    const currentGoalDisplay = createCurrentGoalDisplay(
      planned,
      currentTemplate,
      currentTargetSteps,
      dateStr,
    );
    const templateButtons = createTemplateButtons(
      templates,
      currentTemplate,
      dateStr,
    );
    const actionButtons = createActionButtons(planned, dateStr);
    const modalHtml = createDaySelectorModalHtml(
      date,
      currentGoalDisplay,
      templateButtons,
      actionButtons,
    );

    document.body.insertAdjacentHTML("beforeend", modalHtml);
  }

  openEditGoal(dateStr, currentTargetSteps, templateId) {
    const date = new Date(dateStr);

    const selectorModal = document.getElementById("stepTemplateSelectorModal");
    if (selectorModal) selectorModal.remove();

    const modalHtml = createEditGoalModalHtml(
      date,
      currentTargetSteps,
      dateStr,
      templateId,
    );
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    setTimeout(() => {
      const input = document.getElementById("editTargetStepsInput");
      if (input) {
        input.focus();
        input.select();
      }
    }, 100);
  }

  async saveEditedGoal(dateStr, templateId) {
    const input = document.getElementById("editTargetStepsInput");
    const targetSteps = parseInt(input.value);

    if (!validateTargetSteps(targetSteps)) {
      return;
    }

    await this.manager.setCustomGoalForDay(
      dateStr,
      targetSteps,
      templateId || null,
    );

    const modal = document.getElementById("stepGoalEditModal");
    if (modal) modal.remove();

    if (window.App && window.App.stepPlanningRenderer) {
      window.App.stepPlanningRenderer.render();
    }
  }
}
