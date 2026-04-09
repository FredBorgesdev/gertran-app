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
    radius: '90%',
    animation: {
      duration: 300,
      easing: 'easeOutQuart'
    },

    transitions: {
      active: {
        animation: {
          duration: 300
        }
      }
    },
    layout: { padding: 30 },
    // 🔤 Fonte global
    font: {
      family: 'Arial',
      size: 12,
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
        offset: 20,
        display: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          return value >= 2;
        },
        textAlign: 'center',
        font: {
          family: 'Arial',
          size: 12,
          weight: 'bold',
        },
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
          hoverBackgroundColor: (ctx) => {
              const index = ctx.dataIndex;
              const baseColor = this.getColor(index);
              return this.adjustColor(baseColor, 5);
            },
          hoverOffset: 10,
          hoverBorderWidth: 2,
          hoverBorderColor: '#00000022',
        } as any], // ⚡ Cast para any evita erro de propriedade desconhecida
      };
    } catch (err) {
      console.error('Erro ao montar gráfico totalSmPerLoadTypePercent:', err);
      return { labels: [], datasets: [{ label: 'Porcentagem (%)', data: [], backgroundColor: [] }] } as any;
    }
  }

  private getColor(index: number): string {
    const colors = [
    '#1C5FC5', '#66BB6A', '#FFA726', '#AB47BC',
    '#EC407A', '#26C6DA', '#FF7043', '#9CCC65',
    '#5C6BC0', '#D4E157', '#26A69A', '#FFCA28',
    '#8D6E63', '#78909C', '#42A5F5', '#EF5350',
    ];
    return colors[index % colors.length];
  }
   private adjustColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#',''), 16);
    const amt = Math.round(2.55 * percent);

    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;

    return "#" + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }
}