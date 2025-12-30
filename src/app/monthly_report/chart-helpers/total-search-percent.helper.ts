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
    layout: { padding: 55 },
    plugins: {
      legend: { display: false },
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
        offset: 20,
        display: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          return value > 0;
        },
        font: { weight: 'bold', size: 12 },
      },
    },
  };

  private colors = ['#42A5F5', '#66BB6A', '#FFA726'];

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
          hoverOffset: 20,
        }
      ]
    };
  }
}