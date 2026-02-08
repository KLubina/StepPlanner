import { toLocalDateString } from "../DateUtils.js";
import { createDayCellHtml } from "./CalendarDay.js";

export function calculateEmptyCells(today) {
  const todayDayOfWeek = today.getDay();
  return todayDayOfWeek === 0 ? 6 : todayDayOfWeek - 1;
}

export function createEmptyCellsHtml(emptyCells) {
  return "<div></div>".repeat(emptyCells);
}

export function createCalendarDaysHtml(
  startDate,
  range,
  plannedDays,
  templates,
  defaultTemplates,
) {
  let html = "";

  for (let i = 0; i < range; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = toLocalDateString(date);

    const planned = plannedDays[dateStr];
    const assignedTemplate = planned
      ? templates.find((t) => t.id === planned.templateId)
      : null;

    const dayOfWeek = date.getDay();
    const defaultTemplateId = defaultTemplates[dayOfWeek];
    const defaultTemplate =
      !assignedTemplate && defaultTemplateId
        ? templates.find((t) => t.id === defaultTemplateId)
        : null;

    const isToday = i === 0;

    html += createDayCellHtml(
      date,
      dateStr,
      planned,
      assignedTemplate,
      defaultTemplate,
      isToday,
    );
  }

  return html;
}

export function createFullCalendarHtml(
  stylesHtml,
  headersHtml,
  emptyCellsHtml,
  daysHtml,
) {
  return `
        ${stylesHtml}
        ${headersHtml}
        ${emptyCellsHtml}
        ${daysHtml}
        </div>
    `;
}
