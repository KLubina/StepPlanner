export function createMainLayoutHtml(
  headerHtml,
  templatesSectionHtml,
  calendarSectionHtml,
) {
  return `
        ${headerHtml}
        <div style="display: grid; grid-template-columns: 350px 1fr; gap: 30px;">
            ${templatesSectionHtml}
            ${calendarSectionHtml}
        </div>
    `;
}
