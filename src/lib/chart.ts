export const getGradient = (
  ctx: CanvasRenderingContext2D,
  chartArea: { left: number; right: number; top: number; bottom: number }
) => {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "#c8d4ff00");
  }

  return gradient;
};
