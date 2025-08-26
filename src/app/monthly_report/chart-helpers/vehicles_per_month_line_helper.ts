import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class VehiclesPerMonthLineHelper {
  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        display: true,
        title: { display: true, text: 'Mês' },
      },
      y: {
        display: true,
        title: { display: false, text: 'Quantidade de Veículos' },
        beginAtZero: false,
        ticks: { padding: 10 },
      },
    },
  };

  build(totalVehiclesPerMonth): ChartConfiguration<'line'>['data'] {
    let dataParsed: Record<string, number> = {};
    try {
      dataParsed = JSON.parse(totalVehiclesPerMonth || '{}');
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
          label: `Veículos por Mês (${total.toLocaleString()})`,
          data: valores,
          fill: false,
          borderColor: '#36A2EB',
          backgroundColor: '#36A2EB',
          tension: 0.3,
        },
      ],
    };
  }
}
