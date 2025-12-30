import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyReport } from '../monthly_report.service';

@Injectable({ providedIn: 'root' })
export class TotalSmPerRouteDestinyPercentHelper {
  rawData: any;

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 55
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: '#000',
        formatter: (value: any, ctx: any) => {
          const numericValue = Number(value);
          const dataIndex = ctx.dataIndex;
          const dataset = ctx.dataset as any;

          const totalBruto = dataset.totaisBrutos ? dataset.totaisBrutos[dataIndex] : 0;

          return `${numericValue.toFixed(1)}% (${totalBruto})`;
        },
        anchor: 'end',
        align: 'end',
        offset: 10,
        font: {
          weight: 'bold',
          size: 11
        },
        display: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          return value >= 0.5;
        }
      }
    }
  };

  build(report: MonthlyReport): ChartConfiguration<'pie'>['data'] {
    try {
      const data = JSON.parse(report.totalSmPerRouteDestiny || '{}');
      this.rawData = Object.values(data);

      const entries = Object.entries(data)
        .filter(([_, value]: [string, any]) => value['Porcentagem (%)'] > 0.5)
        .map(([label, value]: [string, any]) => ({
          label,
          percentage: Number(value['Porcentagem (%)']),
          total: Number(value['Total'] || value['total'] || value['Quantidade'] || 0)
        }));

      const labels = entries.map(e => e.label);
      const porcentagens = entries.map(e => e.percentage);
      const quantidades = entries.map(e => e.total);
      const backgroundColors = labels.map((_, i) => this.getColor(i));

      return {
        labels,
        datasets: [{
          label: 'Porcentagem (%)',
          data: porcentagens,
          totaisBrutos: quantidades,
          backgroundColor: backgroundColors,
          hoverOffset: 30
        } as any]
      };
    } catch (err) {
      console.error('Erro ao montar gráfico totalSmPerRouteDestiny:', err);
      return {
        labels: [],
        datasets: [{
          label: 'Porcentagem (%)',
          data: [],
          backgroundColor: []
        }]
      } as any;
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