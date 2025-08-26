import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Injectable } from '@angular/core';

Chart.register(ChartDataLabels);

export interface WorkerTotalItem {
  label: string;
  value: number;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class SearchWorkerPercentHelper {
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
        font: { weight: 'bold', size: 12 },
      },
    },
  };

  private colors = [
    '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EC407A', '#26C6DA'
  ];

  build(item: any): ChartConfiguration<'pie'>['data'] {
    if (!item) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

    const values: WorkerTotalItem[] = [
      { label: 'Agregado', value: item.agregado || 0, color: this.colors[0] },
      { label: 'Ajudante', value: item.ajudante || 0, color: this.colors[1] },
      { label: 'Ajudante Empregado', value: item.ajudante_empregado || 0, color: this.colors[2] },
      { label: 'Ajudante Terceiro', value: item.ajudante_terceiro || 0, color: this.colors[3] },
      { label: 'Empregado', value: item.empregado || 0, color: this.colors[4] },
      { label: 'Terceiro', value: item.terceiro || 0, color: this.colors[5] },
    ];

    return {
      labels: values.map(v => v.label),
      datasets: [
        {
          label: 'Colaboradores',
          data: values.map(v => v.value),
          backgroundColor: values.map(v => v.color),
          hoverOffset: 20,
        }
      ]
    };
  }
}
