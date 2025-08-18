import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyReport } from '../monthly_report.service';

@Injectable({ providedIn: 'root' })
export class TotalSmPerOperationsPercentHelper {
  rawData: any;

  chartOptions: ChartOptions<'pie'> = {
    // responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        // position: 'center',
        // align: 'center',
        labels: {
          // boxWidth: 20,
          padding: 0,
          font: {
            weight: 'bold',
            size: 12 // tamanho da letra
          }
        }
      },
      // tooltip: {
      //   callbacks: {
      //     label: (context) => {
      //       const label = context.label || '';
      //       return `${label}`; // não mostra valor nem porcentagem
      //     }
      //   }
      // }
    },
    layout: {
      // padding: {
      //   top: 0,
      //   right: 0,
      //   bottom: 0,
      //   left: 0
      // }
    }
  };

  build(report: MonthlyReport): ChartConfiguration<'pie'>['data'] {
    try {
      const data = JSON.parse(report.totalSmPerOperationsPercent || '{}');
      this.rawData = Object.values(data); // guarda para usar no tooltip se quiser

      const labels = Object.keys(data);
      const valores = labels.map(label => data[label]['Porcentagem (%)']);
      const backgroundColors = labels.map((_, i) => this.getColor(i));

      // Labels com porcentagem formatada
      const labelsWithPercent = labels.map((label, i) => `${label}: ${valores[i].toFixed(2)}%`);

      return {
        // labels: labelsWithPercent,
        datasets: [{
          label: 'Porcentagem (%)',
          data: valores,
          backgroundColor: backgroundColors,
          hoverOffset: 30
        }]
      };
    } catch {
      return {
        labels: [],
        datasets: [{
          label: 'Porcentagem (%)',
          data: [],
          backgroundColor: []
        }]
      };
    }
  }

  private getColor(index: number): string {
    const colors = [
      '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC',
      '#EC407A', '#26C6DA', '#FF7043', '#9CCC65',
      '#5C6BC0', '#D4E157', '#26A69A', '#FFCA28',
      '#8D6E63', '#78909C', '#EF5350'
    ];
    return colors[index % colors.length];
  }
}
