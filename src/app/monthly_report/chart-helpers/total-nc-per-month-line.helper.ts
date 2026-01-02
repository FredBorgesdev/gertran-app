import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class TotalNcPerMonthLineHelper {
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    layout: { padding: { top: 12, bottom: 12, left: 8, right: 8 } },
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'end',
        clamp: true,
        formatter: (value: any) => {
          const n = Number(value) || 0;
          return n.toLocaleString();
        },
        font: { weight: 'bold', size: 10 },
      },
    },
    scales: {
      x: {
        display: true,
        title: { display: true, text: 'Mês' },
      },
      y: {
        display: true,
        title: { display: false, text: 'Total NC' },
        beginAtZero: true,
        ticks: { padding: 10 },
      },
    },
  };

  build(report: any): ChartConfiguration<'bar'>['data'] {
    let dataParsed: Record<string, number> = {};
    try {
      dataParsed = JSON.parse(report.totalNcPerMonth || '{}');
    } catch {
      dataParsed = {};
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const keys = Object.keys(dataParsed).sort(); // ['2025-01', '2025-02', ...]
    const labels = keys.map(key => {
      const monthIndex = parseInt(key.split('-')[1], 10) - 1;
      return monthNames[monthIndex] || key;
    });

    const valores = keys.map(key => dataParsed[key] || 0);
    const total = valores.reduce((acc, val) => acc + val, 0);

    return {
      labels,
      datasets: [
        {
          label: `Total NC por Mês (${total.toLocaleString()})`,
          data: valores,
          backgroundColor: '#FF6384',
          borderColor: '#C62828',
          borderWidth: 1,
        },
      ],
    };
  }
}
