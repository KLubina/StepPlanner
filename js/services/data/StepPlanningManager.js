import * as LocalStorageService from "./step-planning/LocalStorageService.js";
import * as TemplateService from "./step-planning/TemplateService.js";
import * as GoalService from "./step-planning/GoalService.js";
import { toLocalDateString } from "../../ui/DateUtils.js";

let userId = null;

export function getTemplates() {
  return TemplateService.getTemplates();
}
export function getPlannedDays() {
  return GoalService.getPlannedDays();
}
export function getDefaultTemplates() {
  return LocalStorageService.getDefaultTemplates();
}
export function getPlanningRangeDays() {
  return LocalStorageService.getPlanningRangeDays();
}
export function getPlanningEndDate() {
  return LocalStorageService.getPlanningEndDate();
}
export function getEditingTemplateId() {
  return TemplateService.getEditingTemplateId();
}
export function setEditingTemplateId(value) {
  TemplateService.setEditingTemplateId(value);
}

export function setUser(user) {
  userId = user?.uid || null;
  TemplateService.reset();
  GoalService.reset();
  LocalStorageService.loadDefaultTemplates();
  LocalStorageService.loadPlanningRange();
}

export function reset() {
  userId = null;
  TemplateService.reset();
  GoalService.reset();
  LocalStorageService.reset();
}

export async function init() {
  await Promise.all([
    TemplateService.loadTemplates(),
    GoalService.loadPlannedDays(),
  ]);
}

export async function loadTemplates() {
  return TemplateService.loadTemplates();
}
export async function saveTemplate(data) {
  return TemplateService.saveTemplate(data);
}
export async function deleteTemplate(id) {
  return TemplateService.deleteTemplate(id);
}

export async function loadPlannedDays() {
  return GoalService.loadPlannedDays();
}
export async function loadArchivedGoals() {
  return GoalService.loadArchivedGoals();
}
export async function assignTemplateToDay(dateStr, templateId) {
  const template = templateId ? TemplateService.findById(templateId) : null;
  return GoalService.assignTemplateToDay(dateStr, templateId, template);
}
export async function setCustomGoalForDay(date, target, tId) {
  return GoalService.setCustomGoalForDay(date, target, tId);
}
export async function clearAllStepGoals() {
  return GoalService.clearAllStepGoals();
}

export function setPlanningRange(days) {
  LocalStorageService.setPlanningRange(days);
}
export function updateDefaultTemplate(day, tId) {
  LocalStorageService.updateDefaultTemplate(day, tId);
  if (window.App?.stepPlanningRenderer)
    window.App.stepPlanningRenderer.render();
}
export function resetAllDefaultTemplates() {
  LocalStorageService.resetAllDefaultTemplates();
}

export function getTemplateForDay(dateStr) {
  const planned = GoalService.getPlannedDays()[dateStr];
  if (!planned) {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    const defaultTemplateId =
      LocalStorageService.getDefaultTemplates()[dayOfWeek];
    if (defaultTemplateId) {
      return TemplateService.findById(defaultTemplateId);
    }
    return null;
  }
  return TemplateService.findById(planned.templateId);
}

export async function applyDefaultsToAllDays() {
  const hasDefaults = Object.values(
    LocalStorageService.getDefaultTemplates(),
  ).some((t) => t !== null);
  if (!hasDefaults) {
    alert(
      "Bitte lege zuerst Standard-Ziele für mindestens einen Wochentag fest!",
    );
    return 0;
  }

  if (
    !confirm(
      `Möchtest du die Standard-Ziele auf alle ungeplanten zukünftigen Tage (nächste ${LocalStorageService.getPlanningRangeDays()} Tage) anwenden?`,
    )
  ) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let appliedCount = 0;
  const promises = [];

  for (let i = 0; i < LocalStorageService.getPlanningRangeDays(); i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = toLocalDateString(date);

    if (GoalService.getPlannedDays()[dateStr]) continue;

    const dayOfWeek = date.getDay();
    const defaultTemplateId =
      LocalStorageService.getDefaultTemplates()[dayOfWeek];

    if (defaultTemplateId) {
      promises.push(assignTemplateToDay(dateStr, defaultTemplateId));
      appliedCount++;
    }
  }

  await Promise.all(promises);
  await GoalService.loadPlannedDays();

  if (window.App?.stepPlanningRenderer)
    window.App.stepPlanningRenderer.render();

  return appliedCount;
}

export async function deleteWithConfirm(templateId) {
  if (confirm("Möchtest du dieses Template wirklich löschen?")) {
    await deleteTemplate(templateId);
    if (window.App?.stepPlanningRenderer)
      window.App.stepPlanningRenderer.render();
  }
}

export function applyPlanningRangeInput() {
  const input = document.getElementById("planningRangeInput");
  if (input) {
    LocalStorageService.setPlanningRange(input.value);
    if (window.App?.stepPlanningRenderer)
      window.App.stepPlanningRenderer.render();
  }
}

export function applyPlanningEndDateInput() {
  const input = document.getElementById("planningEndDateInput");
  if (input) {
    LocalStorageService.setPlanningEndDate(input.value);
    if (window.App?.stepPlanningRenderer)
      window.App.stepPlanningRenderer.render();
  }
}

export function resetAllDefaults() {
  resetAllDefaultTemplates();
  if (window.App?.stepPlanningRenderer)
    window.App.stepPlanningRenderer.render();
}

export async function clearCalendar() {
  if (
    confirm(
      "Möchtest du wirklich alle geplanten Ziele aus dem Kalender löschen?",
    )
  ) {
    await clearAllStepGoals();
    if (window.App?.stepPlanningRenderer)
      window.App.stepPlanningRenderer.render();
  }
}

export async function selectTemplateForDay(dateStr, templateId) {
  await assignTemplateToDay(dateStr, templateId);

  const modal = document.getElementById("stepTemplateSelectorModal");
  if (modal) modal.remove();

  if (window.App?.stepPlanningRenderer)
    window.App.stepPlanningRenderer.render();
}
