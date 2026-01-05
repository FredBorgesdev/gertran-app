import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TotalSmPerTechnologyPercentHelper {
  chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: false,
        text: 'Total SM por Tecnologia (Quantidade)',
      },
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'end',
        formatter: (value: number) => `${value}`,
        font: { weight: 'bold', size: 12 },
        clamp: true,
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Tecnologia' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Quantidade' },
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
          backgroundColor: '#42A5F5', // azul, pode trocar
          borderColor: '#1E88E5',
          borderWidth: 1,
        },
      ],
    };
  }
}
