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
        formatter: (value: any) => {
          const numericValue = Number(value) || 0;
          return numericValue.toLocaleString();
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

  private colors = [
    '#FFA726', '#AB47BC', '#FF7043', '#9CCC65',
    '#EC407A', '#26C6DA', '#26A69A', '#FFCA28',
    '#5C6BC0', '#D4E157', '#42A5F5', '#EF5350', 
    '#8D6E63', '#78909C', '#1C5FC5', '#66BB6A', 
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