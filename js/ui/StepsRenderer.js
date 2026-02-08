import {
  calculateStepsChange,
  createStepsDetailsHtml,
} from "./steps/StepsDetails.js";
import { createStatsHtml } from "./steps/StepsStats.js";
import { createMainHtml } from "./steps/StepsLayout.js";
import { prepareChartData } from "./steps/chart/ChartDataPreparer.js";
import {
  generateYAxis,
  generateXAxis,
  addAxes,
} from "./steps/chart/ChartAxes.js";
import {
  generateLinePath,
  generateDataPoints,
} from "./steps/chart/ChartElements.js";

export default class StepsRenderer {
  constructor(stepsManager) {
    this.stepsManager = stepsManager;
  }

  showStepsDetails(dateString, steps, index) {
    const panel = document.getElementById("stepsDetailsPanel");
    const content = document.getElementById("stepsDetailsContent");

    const stepsData = this.stepsManager.getData();
    const previousSteps = index > 0 ? stepsData[index - 1].steps : steps;
    const { changeColor, changeText, changeIcon } = calculateStepsChange(
      steps,
      previousSteps,
    );

    content.innerHTML = createStepsDetailsHtml(
      dateString,
      steps,
      changeColor,
      changeText,
      changeIcon,
    );
    panel.style.display = "block";
  }

  hideStepsDetails() {
    const panel = document.getElementById("stepsDetailsPanel");
    panel.style.display = "none";
  }

  render() {
    const container = document.getElementById("stepsContainer");
    const currentSteps = this.stepsManager.getCurrentSteps();
    const averageSteps = this.stepsManager.getAverageSteps();
    const totalSteps = this.stepsManager.getTotalSteps();

    let chartHtml = "";
    const stepsData = this.stepsManager.getData();
    if (stepsData.length > 0) {
      chartHtml = this.createChart();
    } else {
      chartHtml =
        '<div class="chart-container"><p style="text-align: center; padding: 50px;">Keine Schrittdaten verfügbar</p></div>';
    }

    const statsHtml = createStatsHtml(currentSteps, averageSteps, totalSteps);
    container.innerHTML = createMainHtml(statsHtml, chartHtml);
  }

  createChart() {
    const stepsData = this.stepsManager.getData();
    if (stepsData.length === 0) {
      return "<p>Keine Daten verfügbar</p>";
    }

    const { filteredData, maxSteps, minSteps, range, startDate, daysToShow } =
      prepareChartData(stepsData);

    if (filteredData.length === 0) {
      return "<p>Keine Daten in den letzten 90 Tagen</p>";
    }

    const chartWidth = 1200;
    const chartHeight = 320;
    const leftPadding = 60;
    const rightPadding = 40;
    const topPadding = 30;
    const bottomPadding = 40;

    let chartHtml = `<svg width="100%" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" preserveAspectRatio="none" style="background:#f8f9fa; border-radius:10px;">`;

    chartHtml = generateYAxis(
      chartHtml,
      maxSteps,
      range,
      chartWidth,
      chartHeight,
      leftPadding,
      rightPadding,
      topPadding,
      bottomPadding,
    );
    chartHtml = generateXAxis(
      chartHtml,
      startDate,
      daysToShow,
      chartWidth,
      chartHeight,
      leftPadding,
      rightPadding,
      topPadding,
      bottomPadding,
    );
    chartHtml = generateLinePath(
      chartHtml,
      filteredData,
      startDate,
      daysToShow,
      chartWidth,
      chartHeight,
      leftPadding,
      rightPadding,
      topPadding,
      bottomPadding,
      minSteps,
      range,
    );
    chartHtml = generateDataPoints(
      chartHtml,
      filteredData,
      stepsData,
      startDate,
      daysToShow,
      chartWidth,
      chartHeight,
      leftPadding,
      rightPadding,
      topPadding,
      bottomPadding,
      minSteps,
      range,
    );
    chartHtml = addAxes(
      chartHtml,
      leftPadding,
      rightPadding,
      topPadding,
      bottomPadding,
      chartWidth,
      chartHeight,
    );

    chartHtml += "</svg>";
    return chartHtml;
  }
}
