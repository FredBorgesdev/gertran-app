import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class TotalNcPerMonthLineHelper {

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false, position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: { title: { display: true, text: 'Mês' } },
      y: { title: { display: true, text: 'Total NC' }, beginAtZero: true },
    },
  };

  build(report: any) {
    let dataParsed;
    try {
      dataParsed = JSON.parse(report.totalNcPerMonth || '{}');
    } catch {
      dataParsed = {};
    }
    const labels = Object.keys(dataParsed).sort();
    const data = labels.map(label => dataParsed[label]);

    return {
      labels,
      datasets: [
        {
          label: 'NC por Mês',
          data,
          fill: false,
          borderColor: '#FF6384',
          backgroundColor: '#FF6384',
          tension: 0.1,
        },
      ],
    };
  }
}
