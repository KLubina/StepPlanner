import {
  createTextInput,
  createNumberInput,
  createColorInput,
  createTextarea,
} from "./templates/editor/EditorInputs.js";
import {
  createFormField,
  createButtons,
} from "./templates/editor/EditorLayout.js";

export default class TemplateEditor {
  constructor(manager) {
    this.manager = manager;
    this.editingTemplateId = null;
  }

  startEdit(templateId = null) {
    this.editingTemplateId = templateId;
    this.render();
  }

  cancelEdit() {
    this.editingTemplateId = null;
  }

  async handleSave() {
    const success = await this.save();
    if (success) {
      App.stepPlanningRenderer.render();
    }
  }

  handleCancel() {
    this.cancelEdit();
    App.stepPlanningRenderer.render();
  }

  render() {
    const container = document.getElementById("stepPlanningContainer");
    if (!container) return;

    const templates = this.manager.getTemplates();
    const template = this.editingTemplateId
      ? templates.find((t) => t.id === this.editingTemplateId)
      : {
          id: Date.now().toString(),
          name: "",
          targetSteps: 10000,
          color: "#667eea",
          notes: "",
          weightChangePerDay: 0,
        };

    const html = `
            <div style="max-width: 800px; margin: 0 auto;">
                <h2>${this.editingTemplateId ? "Schritt-Template bearbeiten" : "Neues Schritt-Template erstellen"}</h2>

                ${this.createFormField(
                  "Template-Name:",
                  this.createTextInput(
                    "templateName",
                    template.name,
                    "z.B. Ruhetag, Normal, Aktiv-Tag...",
                  ),
                )}

                ${this.createFormField(
                  "Schrittziel:",
                  this.createNumberInput(
                    "templateSteps",
                    template.targetSteps || 10000,
                    500,
                    0,
                    "z.B. 10000",
                  ),
                  "Wie viele Schritte sollen an diesem Tag erreicht werden?",
                )}

                ${this.createFormField(
                  "Farbe:",
                  this.createColorInput(
                    "templateColor",
                    template.color || "#667eea",
                  ),
                )}

                ${this.createFormField(
                  "Gewichtsänderung pro Tag (g):",
                  this.createNumberInput(
                    "templateWeightChange",
                    template.weightChangePerDay || 0,
                    1,
                    "",
                    "z.B. -200 für Abnehmen, 0 für Halten, +100 für Zunehmen",
                  ),
                  "Negativ für Gewichtsverlust, Positiv für Gewichtszunahme (in Gramm)",
                )}

                ${this.createFormField(
                  "Notizen:",
                  this.createTextarea(
                    "templateNotes",
                    template.notes || "",
                    "Beschreibe dieses Schritt-Template... z.B. für welche Tage geeignet",
                  ),
                )}

                ${this.createButtons()}
            </div>
        `;

    container.innerHTML = html;
  }

  collectFormData() {
    const nameInput = document.getElementById("templateName");
    const stepsInput = document.getElementById("templateSteps");
    const colorInput = document.getElementById("templateColor");
    const weightChangeInput = document.getElementById("templateWeightChange");
    const notesInput = document.getElementById("templateNotes");

    return {
      name: nameInput?.value.trim() || "",
      targetSteps: parseInt(stepsInput?.value ?? "10000"),
      color: colorInput?.value || "#667eea",
      weightChangePerDay: parseFloat(weightChangeInput?.value || 0),
      notes: notesInput?.value.trim() || "",
    };
  }

  validateFormData(data) {
    if (!data.name) {
      alert("Bitte gib einen Namen für das Template ein!");
      return false;
    }

    if (data.targetSteps < 0) {
      alert("Schrittziel muss positiv sein!");
      return false;
    }

    return true;
  }

  async save() {
    const formData = this.collectFormData();
    if (!this.validateFormData(formData)) {
      return false;
    }

    const templateData = {
      id: this.editingTemplateId || Date.now().toString(),
      ...formData,
    };

    const success = await this.manager.saveTemplate(templateData);
    if (success) {
      this.editingTemplateId = null;
      return true;
    } else {
      alert("Fehler beim Speichern des Templates!");
      return false;
    }
  }
}
