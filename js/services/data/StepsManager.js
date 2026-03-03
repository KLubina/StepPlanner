import {
  db,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "../../../firebase-storages/firebase-storage-access.js";

let stepsData = [];
let userId = null;

export function setUser(user) {
  userId = user?.uid || null;
  stepsData = [];
}

export function reset() {
  userId = null;
  stepsData = [];
}

/** Inject pre-built records for demo / mock mode. */
export function injectMockData(data) {
  stepsData = data;
}

export async function loadSteps() {
  try {
    const cutoffDate = new Date();
    cutoffDate.setHours(0, 0, 0, 0);
    cutoffDate.setDate(cutoffDate.getDate() - 89);

    const stepsCollection = collection(db, "steps");
    let stepsQuery;

    try {
      stepsQuery = query(stepsCollection, orderBy("date", "asc"));
    } catch (error) {
      console.warn(
        "Firestore query with where+order failed, using fallback:",
        error?.message,
      );
      stepsQuery = stepsCollection;
    }

    const snapshot = await getDocs(stepsQuery);
    stepsData = [];

    snapshot.forEach((document) => {
      const data = document.data();
      let dateValue = data.date;

      if (dateValue && typeof dateValue.toDate === "function") {
        dateValue = dateValue.toDate();
      } else if (typeof dateValue === "string") {
        dateValue = new Date(dateValue);
      } else {
        return;
      }

      if (dateValue >= cutoffDate) {
        stepsData.push({
          id: document.id,
          date: dateValue.toLocaleDateString("de-DE"),
          steps: parseInt(data.steps) || 0,
          timestamp: dateValue,
        });
      }
    });

    return stepsData;
  } catch (error) {
    console.error("Error loading steps:", error);
    return [];
  }
}

export function getCurrentSteps() {
  return stepsData.length > 0 ? stepsData[stepsData.length - 1].steps : 0;
}

export function getAverageSteps() {
  if (stepsData.length === 0) return 0;

  const totalSteps = stepsData.reduce((sum, entry) => sum + entry.steps, 0);
  return Math.round(totalSteps / stepsData.length);
}

export function getTotalSteps() {
  return stepsData.reduce((sum, entry) => sum + entry.steps, 0);
}

export function getData() {
  return stepsData;
}
