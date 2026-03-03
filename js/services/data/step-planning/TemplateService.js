import {
  db,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "../../../../firebase-storages/firebase-storage-access.js";

let templates = [];
let editingTemplateId = null;

export function getTemplates() {
  return templates;
}
export function getEditingTemplateId() {
  return editingTemplateId;
}
export function setEditingTemplateId(id) {
  editingTemplateId = id;
}

export function reset() {
  templates = [];
  editingTemplateId = null;
}

/** Inject pre-built templates for demo / mock mode. */
export function injectMockTemplates(data) {
  templates = data;
}

export async function loadTemplates() {
  try {
    const templatesRef = collection(db, "stepTemplates");
    const snapshot = await getDocs(templatesRef);

    templates = [];
    snapshot.forEach((d) => {
      templates.push({
        id: d.id,
        ...d.data(),
      });
    });
    return templates;
  } catch (error) {
    console.error("Error loading step templates:", error);
    return [];
  }
}

export async function saveTemplate(templateData) {
  try {
    const templateRef = doc(
      db,
      "stepTemplates",
      templateData.id || Date.now().toString(),
    );
    await setDoc(templateRef, {
      name: templateData.name,
      targetSteps: templateData.targetSteps ?? 10000,
      color: templateData.color || "#667eea",
      notes: templateData.notes || "",
      weightChangePerDay: templateData.weightChangePerDay || 0,
      timestamp: serverTimestamp(),
    });

    await loadTemplates();
    return true;
  } catch (error) {
    console.error("Error saving step template:", error);
    return false;
  }
}

export async function deleteTemplate(templateId) {
  try {
    await deleteDoc(doc(db, "stepTemplates", templateId));
    await loadTemplates();
    return true;
  } catch (error) {
    console.error("Error deleting step template:", error);
    return false;
  }
}

export function findById(templateId) {
  return templates.find((t) => t.id === templateId);
}
