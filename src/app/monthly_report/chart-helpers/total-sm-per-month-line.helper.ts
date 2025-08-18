import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyReport } from '../monthly_report.service';

@Injectable({ providedIn: 'root' })
export class TotalSmPerMonthLineHelper {
  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Ano/Mês',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Total SM',
        },
        beginAtZero: false,
      },
    },
  };

  build(report: MonthlyReport): ChartConfiguration<'line'>['data'] {
    try {
      const data = JSON.parse(report.totalSmPerMonth || '{}');
      const labels = Object.keys(data);
      const valores = labels.map(label => data[label]);

      // Soma total para exibir na legenda
      const total = valores.reduce((acc, val) => acc + val, 0);

      return {
        labels,
        datasets: [
          {
            label: `Total SM por Mês (${total.toLocaleString()})`,
            data: valores,
            fill: false,
            borderColor: '#42A5F5',
            backgroundColor: '#42A5F5',
            tension: 0.3,
          }
        ]
      };
    } catch {
      return {
        labels: [],
        datasets: [{
          label: 'Total SM por Mês (0)',
          data: [],
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: '#42A5F5',
          tension: 0.3,
        }]
      };
    }
  }
}
