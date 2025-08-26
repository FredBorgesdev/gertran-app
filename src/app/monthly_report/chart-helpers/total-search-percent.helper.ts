import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Injectable } from '@angular/core';

// registra plugins
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

  private colors = ['#42A5F5', '#66BB6A', '#FFA726'];

  build(item: any): ChartConfiguration<'pie'>['data'] {
    console.log(item)
    if (!item) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    // item =JSON.parse(item)[0]
    // array de valores para o gráfico
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
