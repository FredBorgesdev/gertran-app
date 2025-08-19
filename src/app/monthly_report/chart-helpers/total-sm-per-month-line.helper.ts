import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyReport } from '../monthly_report.service';

@Injectable({ providedIn: 'root' })
export class TotalSmPerMonthLineHelper {
chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: true, // permite o gráfico se ajustar ao container
  layout: {
    padding: {
      top: 10,
      bottom: 10, // diminui o espaço vertical
    }
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
      title: { display: false, text: 'Total SM' },
      beginAtZero: false,
          ticks: {
      padding: 10 // aumenta a distância entre os números do eixo Y e o gráfico
    }
    },
  },
  // define altura em pixels diretamente (quando maintainAspectRatio: false)
  // isso funciona se você estiver usando o Chart dentro de um componente Angular que respeite options
  // se o gráfico ainda não respeitar, pode-se limitar o container via CSS
  // ex: canvas { height: 200px !important; }
};

  build(report: MonthlyReport): ChartConfiguration<'line'>['data'] {
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
