import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyReport } from '../monthly_report.service';

@Injectable({ providedIn: 'root' })
export class TotalNcPerIncidentPercentHelper {
chartOptions: ChartOptions<'pie'> = {
  // responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      // position: 'right',
      // align: 'start',
      labels: {
        boxWidth: 20,
        padding: 10,
        font: {
          weight: 'bold', // <-- deixa em negrito
          size: 12        // opcional, ajusta o tamanho
        }
      }
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          const value = context.parsed || 0;
          return `${label}`;
        }
      }
    },
  },
  layout: {
    // padding: {
    //   top: 100,
    //   right: 0,
    //   bottom: 0,
    //   left: 0
    // }
  }
};





build(report: MonthlyReport): ChartConfiguration<'pie'>['data'] {
  try {
    const data = JSON.parse(report.totalNcPerIncidentPercent || '{}');
    const labels = Object.keys(data);
    const valores = labels.map(label => data[label]['Porcentagem (%)']);
    const backgroundColors = labels.map((_, i) => this.getColor(i));

    // Labels com porcentagem
    const labelsWithPercent = labels.map((label, i) => `${label}: ${valores[i].toFixed(2)}%`);

    return {
      // labels: labelsWithPercent,
      datasets: [{
        label: 'Percentual de NC por Incidente',
        data: valores,
        backgroundColor: backgroundColors,
        hoverOffset: 30,
      }]
    };
  } catch {
    return {
      labels: [],
      datasets: [{
        label: 'Percentual de NC por Incidente',
        data: [],
        backgroundColor: [],
      }]
    };
  }
}


  private getColor(index: number): string {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#C9CBCF', '#B0E57C',
      '#F45B69', '#8E44AD', '#3498DB'
    ];
    return colors[index % colors.length];
  }
}
