export function prepareChartData(stepsData) {
  if (stepsData.length === 0) {
    return {
      filteredData: [],
      maxSteps: 0,
      minSteps: 0,
      range: 1,
      startDate: null,
    };
  }

  const daysToShow = 90;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (daysToShow - 1));

  const filteredData = stepsData.filter((entry) => {
    return entry.timestamp >= startDate && entry.timestamp <= today;
  });

  const maxSteps = Math.max(...stepsData.map((entry) => entry.steps));
  const minSteps = 0;
  const range = maxSteps - minSteps || 1;

  return { filteredData, maxSteps, minSteps, range, startDate, daysToShow };
}
