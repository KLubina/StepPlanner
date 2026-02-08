import { toLocalDateString } from "../DateUtils.js";
import { createCalendarStyles } from "../calendar/CalendarStyles.js";
import { createCalendarHeaders } from "../calendar/CalendarHeader.js";
import {
  calculateEmptyCells,
  createEmptyCellsHtml,
  createCalendarDaysHtml,
  createFullCalendarHtml,
} from "../calendar/CalendarGrid.js";

export default class CalendarRenderer {
  constructor(manager) {
    this.manager = manager;
  }

  render() {
    const dayPlanningList = document.getElementById("dayPlanningList");
    if (!dayPlanningList) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    const emptyCells = calculateEmptyCells(today);

    const range = this.manager.getPlanningRangeDays() || 90;
    const plannedDays = this.manager.getPlannedDays();
    const templates = this.manager.getTemplates();
    const defaultTemplates = this.manager.getDefaultTemplates();

    const stylesHtml = createCalendarStyles();
    const headersHtml = createCalendarHeaders();
    const emptyCellsHtml = createEmptyCellsHtml(emptyCells);
    const daysHtml = createCalendarDaysHtml(
      startDate,
      range,
      plannedDays,
      templates,
      defaultTemplates,
    );
    const fullCalendarHtml = createFullCalendarHtml(
      stylesHtml,
      headersHtml,
      emptyCellsHtml,
      daysHtml,
    );

    dayPlanningList.innerHTML = fullCalendarHtml;
  }
}
