import { createDefaultSettingsHtml } from "../settings/DefaultSettingsHtml.js";

export default class SettingsRenderer {
  constructor(manager) {
    this.manager = manager;
  }

  render() {
    const container = document.getElementById("defaultTemplatesSettings");
    if (!container) return;

    const templates = this.manager.getTemplates();
    const defaultTemplates = this.manager.getDefaultTemplates();

    container.innerHTML = createDefaultSettingsHtml(
      templates,
      defaultTemplates,
    );
  }
}
