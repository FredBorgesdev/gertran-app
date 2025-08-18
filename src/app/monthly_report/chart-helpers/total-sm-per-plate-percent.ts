import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyReport } from '../monthly_report.service';

@Injectable({ providedIn: 'root' })
export class TotalSmPerPlatePercentHelper {
  rawData: any;

  chartOptions: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0];
            return chart.data.labels.map((label, i) => {
              const total = this.rawData[i]['Total'];
              const perc = this.rawData[i]['Porcentagem (%)'].toFixed(2);
              return {
                text: `${label} (${total} / ${perc}%)`,
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: dataset.backgroundColor[i],
              };
            });
          },
        },
      },
    },
  };

  build(report: MonthlyReport): ChartConfiguration<'bar' | 'line'>['data'] {
    try {
      const data = JSON.parse(report.totalSmPerPlate || '{}');
      this.rawData = Object.values(data);

      const labels = Object.keys(data);
      const totals = labels.map(label => data[label].Total);
      const percentages = labels.map(label => data[label]['Porcentagem (%)']);
      const backgroundColors = labels.map((_, i) => this.getColor(i));

      return {
        labels,
        datasets: [
          {
            label: 'Total',
            data: totals,
            backgroundColor: backgroundColors,
            type: 'bar' as const,
          },
          {
            label: 'Porcentagem (%)',
            data: percentages,
            borderColor: '#FF5733',
            backgroundColor: '#FF5733',
            yAxisID: 'y1',
            tension: 0.3,
            type: 'line' as const, // ✅ agora TS aceita
          },
        ],
      };
    } catch {
      return { labels: [], datasets: [] };
    }
  }

  private getColor(index: number): string {
    const colors = [
      '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC',
      '#EC407A', '#26C6DA', '#FF7043', '#9CCC65',
      '#5C6BC0', '#D4E157', '#26A69A', '#FFCA28',
      '#8D6E63', '#78909C', '#EF5350'
    ];
    return colors[index % colors.length];
  }
}
