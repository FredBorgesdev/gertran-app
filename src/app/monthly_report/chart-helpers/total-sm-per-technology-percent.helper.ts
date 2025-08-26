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
        text: 'Total SM por Tecnologia (%)',
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Tecnologia' },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Porcentagem (%)' },
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
    const percentages = dataParsed.map((item: any) => item['Porcentagem (%)']);

    return {
      labels,
      datasets: [
        {
          label: 'Porcentagem (%)',
          data: percentages,
          backgroundColor: '#42A5F5', // azul, pode trocar
          borderColor: '#1E88E5',
          borderWidth: 1,
        },
      ],
    };
  }
}
