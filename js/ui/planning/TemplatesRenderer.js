import {
  createEmptyTemplatesHtml,
  createTemplatesListHtml,
} from "../templates/TemplateList.js";

export default class TemplatesRenderer {
  constructor(manager) {
    this.manager = manager;
  }

  render() {
    const templatesList = document.getElementById("templatesList");
    if (!templatesList) return;

    const templates = this.manager.getTemplates();
    if (templates.length === 0) {
      templatesList.innerHTML = createEmptyTemplatesHtml();
      return;
    }

    templatesList.innerHTML = createTemplatesListHtml(templates);
  }
}
