import { Chart, ChartConfiguration, ChartOptions, Plugin, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Injectable } from '@angular/core';
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
export class TotalNcPerIncidentPercentHelper {
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    // 🔤 Fonte global
    font: {
      family: 'Arial',
      size: 12,
    },
    layout: { padding: 75 },
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
          const percentual = Number(value);
          const dataIndex = ctx.dataIndex;
          const dataset = ctx.dataset as any;
          const totalBruto = dataset.totaisBrutos ? dataset.totaisBrutos[dataIndex] : 0;
          // Quebra em duas linhas para reduzir largura e evitar corte
          return `${percentual.toFixed(1)}%\n(${totalBruto})`;
        },
        anchor: 'end',
        align: 'end',
        clamp: true,
        offset: 12,
        display: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          return value >= 3;
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

  build(totalNcPerIncidentPercent): ChartConfiguration<'pie'>['data'] {
    try {
      const data = JSON.parse(totalNcPerIncidentPercent || '{}');

      const entries = Object.keys(data).map(label => ({
        label,
        percentage: Number(data[label]['Porcentagem (%)'] || 0),
        total: Number(data[label]['Total'] || data[label]['total'] || data[label]['Quantidade'] || 0)
      }));

      // pega os 5 primeiros e soma o resto
      const top5 = entries.slice(0, 5);
      const others = entries.slice(5);

      const othersPercentage = others.reduce((sum, item) => sum + item.percentage, 0);
      const othersTotal = others.reduce((sum, item) => sum + item.total, 0);

      const finalData = [...top5];
      if (others.length > 0) {
        finalData.push({ label: 'Outros', percentage: othersPercentage, total: othersTotal });
      }

      const labels = finalData.map(item => item.label);
      const porcentagens = finalData.map(item => item.percentage);
      const totais = finalData.map(item => item.total);
      const backgroundColors = finalData.map((_, i) => this.getColor(i));

      return {
        labels,
        datasets: [{
          label: 'Percentual de NC por Incidente',
          data: porcentagens,
          totaisBrutos: totais,
          backgroundColor: backgroundColors,
          hoverOffset: 30,
        } as any],
      };
    } catch (e) {
      console.error('Erro ao montar gráfico totalNcPerIncidentPercent:', e);
      return { labels: [], datasets: [{ label: 'Percentual de NC por Incidente', data: [], backgroundColor: [] }] } as any;
    }
  }

  private getColor(index: number): string {
    const colors = [
    '#EF5350', '#66BB6A', '#FFA726', '#AB47BC',
    '#EC407A', '#26C6DA', '#FF7043', '#9CCC65',
    '#5C6BC0', '#D4E157', '#26A69A', '#FFCA28',
    '#8D6E63', '#78909C', '#42A5F5', '#1C5FC5',
    ];
    return colors[index % colors.length];
  }
}