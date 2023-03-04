import {Component, OnInit} from '@angular/core';
import {ChartData, ChartType} from 'chart.js';

@Component({
  selector: 'app-logistic-report',
  templateUrl: './logistic-report.component.html',
  styleUrls: ['./logistic-report.component.css']
})
export class LogisticReportComponent implements OnInit {
  doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {data: [350, 450, 100]},
    ]
  };

  mapCenter = {lat: -14.2400732, lng: -53.1805017};
  markers = [
    {lat: -19.879024, lng: -44.0103829},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
