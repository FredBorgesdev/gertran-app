import { Component } from '@angular/core';
import { ThemeConstantService } from '../shared/services/theme-constant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent {
  themeColors = this.colorConfig.get().colors;
  blue = this.themeColors.blue;
  blueLight = this.themeColors.blueLight;
  cyan = this.themeColors.cyan;
  cyanLight = this.themeColors.cyanLight;
  gold = this.themeColors.gold;
  purple = this.themeColors.purple;
  purpleLight = this.themeColors.purpleLight;
  red = this.themeColors.red;

  taskListIndex = 0;

  constructor(private colorConfig: ThemeConstantService) {}

  monthlyChartOptions: any = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Mês'
        },
        gridLines: false,
        ticks: {
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Valor'
        },
        gridLines: {
          drawBorder: false,
          offsetGridLines: false,
          drawTicks: false,
          borderDash: [3, 4],
          zeroLineWidth: 1,
          zeroLineBorderDash: [3, 4]
        },
        ticks: {
          max: 80,
          stepSize: 20,
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }]
    }
  };
  monthlyChartLabels: string[] = ['Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'];
  monthlyChartType = 'bar';
  monthlyChartColors: Array<any> = [
    {
      backgroundColor: this.themeColors.blue,
      borderWidth: 0
    },
    {
      backgroundColor: this.themeColors.blueLight,
      borderWidth: 0
    }
  ];
  monthlyChartData: any[] = [
    {
      data: [20, 30, 35, 45, 55, 45],
      categoryPercentage: 0.70,
      barPercentage: 0.70,
    },
    {
      data: [25, 35, 40, 50, 60, 50],
      categoryPercentage: 0.70,
      barPercentage: 0.70,
    }
  ];

  operationChartOptions: any = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Mês'
        },
        gridLines: false,
        ticks: {
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Valor'
        },
        gridLines: {
          drawBorder: false,
          offsetGridLines: false,
          drawTicks: false,
          borderDash: [3, 4],
          zeroLineWidth: 1,
          zeroLineBorderDash: [3, 4]
        },
        ticks: {
          max: 80,
          stepSize: 20,
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }]
    }
  };
  operationChartLabels: string[] = ['Lactalis', 'Itambé'];
  operationChartType = 'bar';
  operationChartColors: Array<any> = [
    {
      backgroundColor: this.themeColors.blue,
      borderWidth: 0
    },
    {
      backgroundColor: this.themeColors.blueLight,
      borderWidth: 0
    }
  ];
  operationChartData: any[] = [
    {
      data: [20, 30],
      categoryPercentage: 0.70,
      barPercentage: 0.70,
    },
    {
      data: [25, 35],
      categoryPercentage: 0.70,
      barPercentage: 0.70,
    }
  ];

  originUnitsList = [
    {
      name: 'Unidade Uberlândia',
      total: 100,
    },
    {
      name: 'Unidade Uberaba',
      total: 200,
    },
    {
      name: 'Unidade Ituiutaba',
      total: 150,
    },
    {
      name: 'Unidade Simões Filho',
      total: 390,
    },
    {
      name: 'Unidade Itambé',
      total: 90,
    }
  ];

  operationsList = [
    {
      op: 'Lactalis',
      total: 100,
    },
    {
      op: 'Itambé',
      total: 200,
    }
  ];

  disagreementList = [
    {
      reason: 'Veiculo sem lacre',
      total: 100,
    },
    {
      reason: 'Veiculo suspeito',
      total: 200,
    },
    {
      reason: 'Veiculo em manutenção',
      total: 300,
    },
    {
      reason: 'Veiculo com escolta',
      total: 400,
    },
    {
      reason: 'Tombamento',
      total: 400,
    },
    {
      reason: 'Roubo',
      total: 400,
    }
  ];

  summaryFormat = () => `$3,531`;

}
