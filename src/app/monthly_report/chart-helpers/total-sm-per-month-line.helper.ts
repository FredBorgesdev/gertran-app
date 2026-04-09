import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyReport } from '../monthly_report.service';

@Injectable({ providedIn: 'root' })
export class TotalSmPerMonthLineHelper {
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    // 🔤 Fonte global
    font: {
      family: 'Arial',
      size: 12,
    },
    layout: {
      padding: { top: 12, bottom: 12, left: 8, right: 8 }
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
      tooltip: {
        mode: 'index',
        intersect: false,
        titleFont: {
          family: 'Arial',
          size: 12,
        },
        bodyFont: {
          family: 'Arial',
          size: 12,
        },
        footerFont: {
          family: 'Arial',
          size: 12,
        }
      },
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'end',
        clamp: true,
        clip: false,
        formatter: (value: any) => {
          const n = Number(value) || 0;
          return n.toLocaleString();
        },
        font: {
          family: 'Arial',
          size: 12,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Mês',
          font: {
            family: 'Arial',
            size: 12,
          }
        },
        ticks: {
          font: {
            family: 'Arial',
            size: 12,
          }
        }
      },
      y: {
        display: true,
        title: {
          display: false,
          text: 'Total SM',
          font: {
            family: 'Arial',
            size: 12,
          }
        },
        beginAtZero: true,
        grace: '20%',
        ticks: {
          padding: 10,
          font: {
            family: 'Arial',
            size: 12,
          }
        },
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
            backgroundColor: '#1C5FC5',
            borderColor: '#0f4596',
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
          backgroundColor: '#1C5FC5',
          borderColor: '#0f4596',
          borderWidth: 1,
        }]
      };
    }
  }
}
