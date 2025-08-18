// chart-helpers/total-sm-per-load-type-percent.helper.ts
import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyReport } from '../monthly_report.service';

@Injectable({ providedIn: 'root' })
export class TotalSmPerLoadTypePercentHelper {
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  build(report: MonthlyReport): ChartConfiguration<'pie'>['data'] {
    try {
      const data = JSON.parse(report.totalSmPerLoadTypePercent || '{}');

      const labels = Object.keys(data).map(label =>
        `${label} (${data[label]['Total']} / ${data[label]['Porcentagem (%)'].toFixed(2)}%)`
      );

      const valores = Object.keys(data).map(label => data[label]['Porcentagem (%)']);

      return {
        labels,
        datasets: [{
          label: 'Porcentagem (%)',
          data: valores,
          backgroundColor: [
            '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EC407A'
          ],
        }]
      };
    } catch (err) {
      console.error('Erro ao montar gráfico totalSmPerLoadTypePercent:', err);
      return { labels: [], datasets: [{ data: [], label: 'Porcentagem (%)', backgroundColor: [] }] };
    }
  }
}
