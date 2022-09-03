import {
  Component,
  OnInit
} from '@angular/core'
import { ThemeConstantService } from '../shared/services/theme-constant.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  isLoading = false

  expanded = false
  themeColors = this.colorConfig.get().colors

  constructor( private colorConfig:ThemeConstantService ) {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1200)
  }

  ngOnInit() {
  }

  // lineChart
  lineChartData: Array<any> = [
    { data: [0, 0, 0, 3, 0, 1, 2], label: 'Roubo' },
    { data: [2, 5, 4, 2, 3, 1, 2], label: 'Quebra' },
    { data: [10, 8, 12, 6, 9, 2, 15], label: 'Inicio de viagem' },
    { data: [8, 16, 7, 7, 0, 15, 8], label: 'Fim de viagem' }
  ]
  lineChartLabels:Array<any> = ["27", "28", "29", "30", "01", "02", "03"]
  lineChartOptions: any = {
    responsive: true,
    hover: {
      mode: 'nearest',
      intersect: true
    },
    tooltips: {
      mode: 'index'
    },
    scales: {
      xAxes: [{
        gridLines: [{
          display: false,
        }],
        ticks: {
          display: true,
          fontColor: this.themeColors.grayLight,
          fontSize: 13,
          padding: 10
        }
      }],
      yAxes: [{
        gridLines: {
          drawBorder: false,
          drawTicks: false,
          borderDash: [3, 4],
          zeroLineWidth: 1,
          zeroLineBorderDash: [3, 4]
        },
        ticks: {
          display: true,
          max: 18,
          stepSize: 3,
          fontColor: this.themeColors.grayLight,
          fontSize: 13,
          padding: 10
        }
      }],
    }
  }
  lineChartColors: Array<any> = [
    {
      backgroundColor: this.themeColors.transparent,
      borderColor: this.themeColors.red,
      pointBackgroundColor: this.themeColors.red,
      pointBorderColor: this.themeColors.white,
      pointHoverBackgroundColor: this.themeColors.blueLight,
      pointHoverBorderColor: this.themeColors.blueLight
    },
    {
      backgroundColor: this.themeColors.transparent,
      borderColor: this.themeColors.orange,
      pointBackgroundColor: this.themeColors.orange,
      pointBorderColor: this.themeColors.white,
      pointHoverBackgroundColor: this.themeColors.blueLight,
      pointHoverBorderColor: this.themeColors.blueLight
    },
    {
      backgroundColor: this.themeColors.transparent,
      borderColor: this.themeColors.blue,
      pointBackgroundColor: this.themeColors.blue,
      pointBorderColor: this.themeColors.white,
      pointHoverBackgroundColor: this.themeColors.blueLight,
      pointHoverBorderColor: this.themeColors.blueLight
    },
    {
      backgroundColor: this.themeColors.transparent,
      borderColor: this.themeColors.cyan,
      pointBackgroundColor: this.themeColors.cyan,
      pointBorderColor: this.themeColors.white,
      pointHoverBackgroundColor: this.themeColors.cyanLight,
      pointHoverBorderColor: this.themeColors.cyanLight
    }
  ]
  lineChartLegend = true
  lineChartType = 'line'

  // PolarArea Chart
  polarAreaChartLabels: string[] = ['Roubo', 'Quebra', 'Inicio de viagem', 'Fim de viagem']
  polarAreaChartData: number[] = [20, 42, 180, 165]
  polarAreaLegend = true
  polarAreaChartOptions: any = {
    responsive: true,
    scale: {
      ticks: {
        max: 200,
        stepSize: 25,
      },
      gridLines: {
        color: this.themeColors.border
      },
      angleLines: {
        color: this.themeColors.border
      }
    }
  }

  polarAreaChartColors: Array<any> = [{
    backgroundColor: [
      this.themeColors.redLight,
      this.themeColors.orangeLight,
      this.themeColors.blueLight,
      this.themeColors.cyanLight,
    ],
    borderColor : [
      this.themeColors.red,
      this.themeColors.orange,
      this.themeColors.blue,
      this.themeColors.cyan,
    ]
  }]
  polarAreaChartType = 'polarArea'
}
