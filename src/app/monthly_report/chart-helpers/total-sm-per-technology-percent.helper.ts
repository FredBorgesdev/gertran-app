import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TotalSmPerTechnologyPercentHelper {
  chartOptions = {
    responsive: true,
    // 🔤 Fonte global
    font: {
      family: 'Arial',
      size: 12,
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            family: 'Arial',
            size: 12,
          }
        }
      },
      title: {
        display: false,
        text: 'Total SM por Tecnologia (Quantidade)',
      },
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'end',
        formatter: (value: number) => `${value}`,
        font: {
          family: 'Arial',
          size: 12,
          weight: 'bold',
        },
        clamp: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tecnologia',
          font: {
            family: 'Arial',
            size: 12,
          }
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantidade',
          font: {
            family: 'Arial',
            size: 12,
          }
        },
      },
    },
  };

  build(totalSmPerTechnologyPercent) {
    let dataParsed;
    try {
      dataParsed = JSON.parse(totalSmPerTechnologyPercent || '[]');
    } catch {
      dataParsed = [];
    }

    const labels = dataParsed.map((item: any) => item.Tecnologia);
    const quantities = dataParsed.map((item: any) => {
      const total = item['Total'] ?? item['Quantidade'] ?? item['total'];
      return typeof total === 'number' ? total : 0;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Quantidade',
          data: quantities,
          backgroundColor: '#1C5FC5', // azul, pode trocar
          borderColor: '#0f4596',
          borderWidth: 1,
        },
      ],
    };
  }
}

