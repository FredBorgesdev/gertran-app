function lineChart(chartInstance: any) {
  const yScale = chartInstance.scales['y'];
  const canvas = chartInstance.canvas;
  const ctx = chartInstance.ctx;
  let index: any;
  let line: any;
  let style: any;
  let yValue: any;

  if (!chartInstance.options.lineChart) return

  for (index = 0; index < chartInstance.options.lineChart.length; index++) {
    line = chartInstance.options.lineChart[index];
    style = line.style || 'rgba(169,169,169, .6)';

    ctx.beginPath();
    ctx.strokeStyle = style;
    let previousY: any

    line.data.forEach((data: any) => {
      if (data) {
        yValue = yScale.getPixelForValue(data);
      } else {
        yValue = 0;
      }

      ctx.lineWidth = 3;

      if (yValue) {
        ctx.moveTo(0, yValue);
        ctx.lineTo(previousY, yValue);
        previousY = yValue;
      }
    })

    ctx.stroke();

    if (line.text) {
      ctx.fillStyle = style;
      ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
    }
  }
}

export const lineChartPlugin = {
  id: 'customline',
  beforeDraw: lineChart
};

