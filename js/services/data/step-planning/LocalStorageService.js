let defaultTemplates = loadDefaultTemplates();
let planningRangeDays = loadPlanningRange();
let planningEndDate = loadPlanningEndDate();

export function getDefaultTemplates() {
  return defaultTemplates;
}
export function getPlanningRangeDays() {
  return planningRangeDays;
}
export function getPlanningEndDate() {
  return planningEndDate;
}

export function reset() {
  defaultTemplates = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  };
  planningRangeDays = 90;
  planningEndDate = null;
}

function getStorageKey(baseKey) {
  return baseKey;
}

function loadDefaultTemplates() {
  try {
    const stored = localStorage.getItem(getStorageKey("defaultStepTemplates"));
    return stored
      ? JSON.parse(stored)
      : {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null,
          5: null,
          6: null,
        };
  } catch (error) {
    console.error("Error loading default step templates:", error);
    return { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };
  }
}

function saveDefaultTemplates() {
  try {
    localStorage.setItem(
      getStorageKey("defaultStepTemplates"),
      JSON.stringify(defaultTemplates),
    );
  } catch (error) {
    console.error("Error saving default step templates:", error);
  }
}

function loadPlanningRange() {
  try {
    const stored = localStorage.getItem(getStorageKey("planningRangeDays"));
    let value = stored ? parseInt(stored, 10) : 90;
    if (isNaN(value) || value < 1) value = 30;
    if (value > 365) value = 365;
    return value;
  } catch (error) {
    console.error("Error loading planning range:", error);
    return 90;
  }
}

function loadPlanningEndDate() {
  try {
    const stored = localStorage.getItem(getStorageKey("planningEndDate"));
    return stored || null;
  } catch (error) {
    console.error("Error loading planning end date:", error);
    return null;
  }
}

function savePlanningRange() {
  try {
    localStorage.setItem(
      getStorageKey("planningRangeDays"),
      String(planningRangeDays),
    );
  } catch (error) {
    console.error("Error saving planning range:", error);
  }
}

function savePlanningEndDate() {
  try {
    if (planningEndDate) {
      localStorage.setItem(getStorageKey("planningEndDate"), planningEndDate);
    } else {
      localStorage.removeItem(getStorageKey("planningEndDate"));
    }
  } catch (error) {
    console.error("Error saving planning end date:", error);
  }
}

export function setPlanningRange(days) {
  const parsed = parseInt(days, 10);
  if (!isNaN(parsed)) {
    planningRangeDays = Math.max(1, Math.min(365, parsed));
    planningEndDate = null;
    savePlanningRange();
    savePlanningEndDate();
  }
}

export function setPlanningEndDate(dateStr) {
  if (dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0 && diffDays <= 365) {
      planningEndDate = dateStr;
      planningRangeDays = diffDays;
      savePlanningEndDate();
      savePlanningRange();
    }
  } else {
    planningEndDate = null;
    savePlanningEndDate();
  }
}

export function updateDefaultTemplate(dayOfWeek, templateId) {
  defaultTemplates[dayOfWeek] = templateId || null;
  saveDefaultTemplates();
}

export function resetAllDefaultTemplates() {
  defaultTemplates = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  };
  saveDefaultTemplates();
}

export { loadDefaultTemplates, loadPlanningRange, loadPlanningEndDate };
