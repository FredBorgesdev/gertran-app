import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyReport } from '../monthly_report.service';

@Injectable({ providedIn: 'root' })
export class TotalSmPerMonthLineHelper {
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: { top: 12, bottom: 12, left: 8, right: 8 }
    },
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
        title: { display: false, text: 'Total SM' },
        beginAtZero: true,
        ticks: { padding: 10 },
      },
    },
  };

  build(report: MonthlyReport): ChartConfiguration<'bar'>['data'] {
    try {
      const data = JSON.parse(report.totalSmPerMonth || '{}');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

      const keys = Object.keys(data); // ['2025-01', '2025-02', ...]
      const labels = keys.map(key => {
        const monthIndex = parseInt(key.split('-')[1], 10) - 1;
        return monthNames[monthIndex] || key;
      });
      const valores = keys.map(key => data[key]);

      // Soma total para exibir na legenda
      const total = valores.reduce((acc, val) => acc + val, 0);

      return {
        labels,
        datasets: [
          {
            label: `Total SM por Mês (${total.toLocaleString()})`,
            data: valores,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            borderWidth: 1,
          }
        ]
      };
    } catch {
      return {
        labels: [],
        datasets: [{
          label: 'Total SM por Mês (0)',
          data: [],
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          borderWidth: 1,
        }]
      };
    }
  }
}
