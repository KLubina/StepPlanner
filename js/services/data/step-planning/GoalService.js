import {
  db,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "../../../../firebase-storages/firebase-storage-access.js";
import { toLocalDateString } from "../../../ui/DateUtils.js";

let plannedDays = {};

export function getPlannedDays() {
  return plannedDays;
}

export function reset() {
  plannedDays = {};
}

export async function loadPlannedDays() {
  try {
    const plannedRef = collection(db, "stepGoals");
    const snapshot = await getDocs(plannedRef);

    plannedDays = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = toLocalDateString(today);

    const archivePromises = [];

    snapshot.forEach((d) => {
      const dateStr = d.id;
      const data = d.data();

      if (dateStr < todayStr) {
        archivePromises.push(archivePastGoal(dateStr, data));
      } else {
        plannedDays[dateStr] = data;
      }
    });

    if (archivePromises.length > 0) {
      await Promise.all(archivePromises);
    }
  } catch (error) {
    console.error("Error loading planned step goals:", error);
  }
}

async function archivePastGoal(dateStr, goalData) {
  try {
    const archiveRef = doc(db, "passedStepGoals", dateStr);
    await setDoc(archiveRef, {
      ...goalData,
      archivedAt: serverTimestamp(),
    });

    const activeRef = doc(db, "stepGoals", dateStr);
    await deleteDoc(activeRef);
  } catch (error) {
    console.error(`Error archiving step goal for ${dateStr}:`, error);
  }
}

export async function loadArchivedGoals() {
  try {
    const archivedRef = collection(db, "passedStepGoals");
    const snapshot = await getDocs(archivedRef);

    const archivedGoals = {};
    snapshot.forEach((d) => {
      archivedGoals[d.id] = d.data();
    });

    return archivedGoals;
  } catch (error) {
    console.error("Error loading archived step goals:", error);
    return {};
  }
}

export async function assignTemplateToDay(dateStr, templateId, template) {
  try {
    const plannedRef = doc(db, "stepGoals", dateStr);

    if (templateId === null) {
      await deleteDoc(plannedRef);
    } else {
      if (!template) {
        console.error("Template not found:", templateId);
        return false;
      }

      await setDoc(plannedRef, {
        targetSteps: template.targetSteps,
        templateId: templateId,
        date: new Date(dateStr),
        timestamp: serverTimestamp(),
      });
    }

    await loadPlannedDays();
    return true;
  } catch (error) {
    console.error("Error assigning step template:", error);
    return false;
  }
}

export async function setCustomGoalForDay(
  dateStr,
  targetSteps,
  templateId = null,
) {
  try {
    const plannedRef = doc(db, "stepGoals", dateStr);

    if (targetSteps === null || targetSteps === undefined) {
      await deleteDoc(plannedRef);
    } else {
      await setDoc(plannedRef, {
        targetSteps: parseInt(targetSteps),
        templateId: templateId,
        date: new Date(dateStr),
        timestamp: serverTimestamp(),
      });
    }

    await loadPlannedDays();
    return true;
  } catch (error) {
    console.error("Error setting custom step goal:", error);
    return false;
  }
}

export async function clearAllStepGoals() {
  try {
    const plannedRef = collection(db, "stepGoals");
    const snapshot = await getDocs(plannedRef);

    const deletePromises = [];
    snapshot.forEach((d) => {
      deletePromises.push(deleteDoc(doc(db, "stepGoals", d.id)));
    });

    await Promise.all(deletePromises);
    await loadPlannedDays();

    return deletePromises.length;
  } catch (error) {
    console.error("Error clearing step goals:", error);
    return 0;
  }
}
