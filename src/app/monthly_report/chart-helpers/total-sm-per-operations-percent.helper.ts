import { Chart, ChartConfiguration, ChartOptions, Plugin } from 'chart.js';
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
        const value = dataset.data[index] as number;

        // ⚡ usa a mesma regra de display do datalabels
        if (value < 3) return;

        const arcElem = arc as any; // força TS aceitar propriedades internas
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
export class TotalSmPerOperationsPercentHelper {
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
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
    layout: { padding: 55 },
    // 🔤 Fonte global
    font: {
      family: 'Arial',
      size: 12,
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#000',
        formatter: (value: any, ctx) => {

          const numericValue = Number(value);
          const dataIndex = ctx.dataIndex;


          const dataset = ctx.dataset as any;
          const totalViagens = dataset.totaisBrutos ? dataset.totaisBrutos[dataIndex] : 0;

          return `${numericValue.toFixed(1)}% (${totalViagens})`;
        },
        anchor: 'end',
        align: 'end',
        clamp: true,
        offset: 20,
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

  build(totalSmPerOperationsPercent): ChartConfiguration<'pie'>['data'] {
    try {
      const data = JSON.parse(totalSmPerOperationsPercent || '{}');

      const entries = Object.keys(data).map(label => ({
        label,
        percentage: Number(data[label]['Porcentagem (%)'] || 0),
        total: Number(data[label]['Total'] || data[label]['total'] || data[label]['Quantidade'] || 0)
      }));

      const top5 = entries.slice(0, 5);
      const others = entries.slice(5);

      const finalData = [...top5];

      if (others.length > 0) {
        const othersPercentage = others.reduce((sum, item) => sum + item.percentage, 0);
        const othersTotal = others.reduce((sum, item) => sum + item.total, 0);
        finalData.push({ label: 'Outros', percentage: othersPercentage, total: othersTotal });
      }

      const labels = finalData.map(item => item.label);
      const porcentagens = finalData.map(item => item.percentage);
      const quantidades = finalData.map(item => item.total);
      const backgroundColors = finalData.map((_, i) => this.getColor(i));
     

      return {
        labels,
        datasets: [
          {
            label: 'Porcentagem (%)',
            data: porcentagens,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: (ctx) => {
              const index = ctx.dataIndex;
              const baseColor = this.getColor(index);
              return this.adjustColor(baseColor, 5);
            },
            hoverOffset: 10,
            hoverBorderWidth: 2,
            hoverBorderColor: '#00000022',
            totaisBrutos: quantidades, // Agora quantidades terá números reais, não NaN
          } as any
        ],
        
      };
    } catch (e) {
      console.error("Erro ao processar dados do gráfico:", e);
      return { labels: [], datasets: [{ label: 'Porcentagem (%)', data: [], backgroundColor: [] }] };
    }
  }

  // private getColor(index: number): string {
  //   const colors = [
  //      '#3ab54a', '#990074', '#4d0074', '#000072', '#0001be',
  //      '#25bfbf', '#28997b', '#2b8838', '#68952e', '#bfbf00',
  //      '#bf7401', '#be0000', '#cd0067', '#cc0098', '#670099',
  //      '#000098', '#0000fe', '#33fffe', '#36cca6', '#4A0A8A',
  //      '#8cc63e', '#ffff00', '#fe9900', '#fe0000',
  //   ];
  //   return colors[index % colors.length];
  // }
  
  
  // private getColor(index: number): string {
  //   const colors = [
  //     '#7A2E05', '#0A0A7A', '#238A08', '#2E5A1A', '#5A1A4F',
  //     '#8A0675', '#8A0A2E', '#6A0A8A', '#8A5A0A', '#7A8A0A',
  //     '#0A8A7A', '#0A5A8A', '#8A8A0A', '#8A3A0A', '#4A0A8A' 
  //   ];
  //   return colors[index % colors.length];
  // }
  
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

