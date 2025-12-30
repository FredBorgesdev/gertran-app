import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, Plugin } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MonthlyReport } from '../monthly_report.service';

Chart.register(ChartDataLabels);

const pieLinesPlugin: Plugin<'pie'> = {
  id: 'pieLines',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((arc, index) => {
        const datasetData = dataset.data as number[];
        const value = datasetData[index];
        if (value < 2) return;

        const arcElem = arc as any;
        const pos = arcElem.tooltipPosition();
        const angle = (arcElem.startAngle + arcElem.endAngle) / 2;
        const radius = arcElem.outerRadius + 20;
        const x = arcElem.x + radius * Math.cos(angle);
        const y = arcElem.y + radius * Math.sin(angle);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });
    });
  }
};

Chart.register(pieLinesPlugin);

@Injectable({ providedIn: 'root' })
export class TotalSmPerLoadTypePercentHelper {
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 55 },
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#000',
        formatter: (value: any, ctx: any) => {
          const numericValue = Number(value);
          const dataIndex = ctx.dataIndex;
          const dataset = ctx.dataset as any;

          // Busca o valor bruto injetado no build
          const totalBruto = dataset.totaisBrutos ? dataset.totaisBrutos[dataIndex] : 0;

          return `${numericValue.toFixed(1)}% (${totalBruto})`;
        },
        anchor: 'end',
        align: 'end',
        clamp: true,
        offset: 30,
        display: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          return value >= 2;
        },
        textAlign: 'center',
        font: { weight: 'bold', size: 12 },
      },
    },
  };

  build(report: MonthlyReport): ChartConfiguration<'pie'>['data'] {
    try {
      const data = JSON.parse(report.totalSmPerLoadTypePercent || '{}');

      const entries = Object.keys(data).map(label => ({
        label,
        value: Number(data[label]['Porcentagem (%)'] || 0),
        total: Number(data[label]['Total'] || data[label]['total'] || data[label]['Quantidade'] || 0)
      }));

      const top5 = entries.slice(0, 5);
      const others = entries.slice(5);

      const othersValue = others.reduce((sum, item) => sum + item.value, 0);
      const othersTotal = others.reduce((sum, item) => sum + item.total, 0);

      const finalData = [...top5];
      if (others.length > 0) {
        finalData.push({ label: 'Outros', value: othersValue, total: othersTotal });
      }

      const labels = finalData.map(item => item.label);
      const valores = finalData.map(item => item.value);
      const totais = finalData.map(item => item.total);
      const backgroundColors = finalData.map((_, i) => this.getColor(i));

      return {
        labels,
        datasets: [{
          label: 'Porcentagem (%)',
          data: valores,
          totaisBrutos: totais, // ⚡ Injetando os valores brutos para o formatter usar
          backgroundColor: backgroundColors,
          hoverOffset: 30,
        } as any], // ⚡ Cast para any evita erro de propriedade desconhecida
      };
    } catch (err) {
      console.error('Erro ao montar gráfico totalSmPerLoadTypePercent:', err);
      return { labels: [], datasets: [{ label: 'Porcentagem (%)', data: [], backgroundColor: [] }] } as any;
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