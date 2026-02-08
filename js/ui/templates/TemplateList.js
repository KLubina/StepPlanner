import { createTemplateCardHtml } from "./TemplateCard.js";

export function createEmptyTemplatesHtml() {
  return '<p style="color: #666; font-style: italic;">Noch keine Templates erstellt</p>';
}

export function createTemplatesListHtml(templates) {
  return templates.map((template) => createTemplateCardHtml(template)).join("");
}
