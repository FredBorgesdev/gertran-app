import { Chart, ChartConfiguration, ChartOptions, Plugin, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Injectable } from '@angular/core';
import { MonthlyReport } from '../monthly_report.service';

// registra plugins
Chart.register(ChartDataLabels);

const pieLinesPlugin: Plugin<'pie'> = {
  id: 'pieLines',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      meta.data.forEach((arc, index) => {
        const value = dataset.data[index] as number;

        // ⚡ usa a mesma regra de display do datalabels
        if (value < 2) return; 

        const arcElem = arc as any; // força TS aceitar propriedades internas
        const pos = arcElem.tooltipPosition();
        const angle = (arcElem.startAngle + arcElem.endAngle) / 2;
        const radius = arcElem.outerRadius + 20;
        const x = arcElem.x + radius * Math.cos(angle);
        const y = arcElem.y + radius * Math.sin(angle);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });
    });
  }
};

Chart.register(pieLinesPlugin);

@Injectable({ providedIn: 'root' })
export class TotalNcPerIncidentPercentHelper {
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 55 },
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#000',
        formatter: (value: unknown, ctx) => {
          const numericValue = Number(value);
          const total = (ctx.chart.data.datasets[0].data as number[])
            .reduce((sum, val) => sum + Number(val), 0);
          return ((numericValue / total) * 100).toFixed(1) + '%';
        },
        anchor: 'end',
        align: 'end',
        clamp: true,
        offset: 20,
        display: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          return value >= 3;
        },
        textAlign: 'center',
        font: { weight: 'bold', size: 12 },
      },
    },
  };

  build(report: MonthlyReport): ChartConfiguration<'pie'>['data'] {
    try {
      const data = JSON.parse(report.totalNcPerIncidentPercent || '{}');

      // transforma em array [{ label, value }]
      const entries = Object.keys(data).map(label => ({
        label,
        value: Number(data[label]['Porcentagem (%)'])
      }));

      // pega os 5 primeiros e soma o resto
      const top5 = entries.slice(0, 5);
      const others = entries.slice(5);
      const othersValue = others.reduce((sum, item) => sum + item.value, 0);

      const finalData = [...top5];
      if (others.length > 0) {
        finalData.push({ label: 'Outros', value: othersValue });
      }

      const labels = finalData.map(item => item.label);
      const valores = finalData.map(item => item.value);
      const backgroundColors = finalData.map((_, i) => this.getColor(i));

      return {
        labels,
        datasets: [{
          label: 'Percentual de NC por Incidente',
          data: valores,
          backgroundColor: backgroundColors,
          hoverOffset: 30,
        }],
      };
    } catch {
      return { labels: [], datasets: [{ label: 'Percentual de NC por Incidente', data: [], backgroundColor: [] }] };
    }
  }

  private getColor(index: number): string {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#C9CBCF', '#B0E57C',
      '#F45B69', '#8E44AD', '#3498DB'
    ];
    return colors[index % colors.length];
  }
}
