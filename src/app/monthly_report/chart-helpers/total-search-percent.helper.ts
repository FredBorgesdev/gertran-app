import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Injectable } from '@angular/core';

Chart.register(ChartDataLabels);

export interface SearchTotalItem {
  label: string;
  value: number;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class TotalSearchPercentHelper {
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    radius: '90%',
    // 🔤 Fonte global
    font: {
      family: 'Arial',
      size: 12,
    },
    layout: { padding: {
        left: 60,
        right: 60
      }
     },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: 'Arial',
            size: 12,
          }
        }
      },
      datalabels: {
        color: '#000',
        formatter: (value: any, ctx: any) => {
          const numericValue = Number(value);
          const datasetData = ctx.chart.data.datasets[0].data as number[];
          const totalGeral = datasetData.reduce((sum, val) => sum + Number(val), 0);

          const percentage = totalGeral > 0 ? (numericValue / totalGeral * 100).toFixed(1) : '0.0';

          return `${percentage}% (${numericValue})`;
        },
        anchor: 'end',
        align: 'end',
        clamp: true,
        offset: 10,
        display: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          return value > 0;
        },
        font: {
          family: 'Arial',
          size: 12,
          weight: 'bold',
        },
      },
    },
  };

  private colors = [
    '#FFA726', '#AB47BC', '#FF7043', '#9CCC65',
    '#EC407A', '#26C6DA', '#26A69A', '#FFCA28',
    '#5C6BC0', '#D4E157', '#42A5F5', '#EF5350', 
    '#8D6E63', '#78909C', '#1C5FC5', '#66BB6A', 
  ];

  build(item: any): ChartConfiguration<'pie'>['data'] {
    if (!item) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

    const values: SearchTotalItem[] = [
      { label: 'Total Consultas', value: item.total_consultas || 0, color: this.colors[0] },
      { label: 'Total Pesquisas', value: item.total_pesquisas || 0, color: this.colors[1] },
      { label: 'Total Vitimologias', value: item.total_vitimologias || 0, color: this.colors[2] },
    ];

    return {
      labels: values.map(v => v.label),
      datasets: [
        {
          label: 'Totais',
          data: values.map(v => v.value),
          backgroundColor: values.map(v => v.color),
          hoverOffset: 10,
        }
      ]
    };
  }
}