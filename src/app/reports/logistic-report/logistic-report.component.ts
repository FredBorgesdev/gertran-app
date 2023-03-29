import {Component, OnInit} from '@angular/core';
import {ChartData} from 'chart.js';
import {LogisticReport, ReportsService} from '../reports.service';
import {format, subMonths} from 'date-fns';

@Component({
  selector: 'app-logistic-report',
  templateUrl: './logistic-report.component.html',
  styleUrls: ['./logistic-report.component.css']
})
export class LogisticReportComponent implements OnInit {
  countByStatusDoughnutChart: ChartData<'doughnut'> = {
    labels: [],
    datasets: [ {data: [] }, ]
  };
  countByTravelStatusDoughnutChart: ChartData<'doughnut'> = {
    labels: [],
    datasets: [ {data: [] }, ]
  };
  countByLoadTypeDoughnutChart: ChartData<'doughnut'> = {
    labels: [],
    datasets: [ {data: [] }, ]
  };
  mapCenter = {lat: -14.2400732, lng: -53.1805017};
  markers = [];
  data: LogisticReport;
  loading = false;

  constructor(private reportService: ReportsService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.reportService.getLogisticReport(this.dateFilters).subscribe((data) => {
      this.data = data;
      this.countByStatusDoughnutChart = {
        labels: Object.values(data.countByStatus).map(({ label }) => label),
        datasets: [
          {data: Object.values(data.countByStatus).map(({ value }) => value)}
        ]
      };
      this.countByTravelStatusDoughnutChart = {
        labels: Object.values(data.countByTravelStatus).map(({ label }) => label),
        datasets: [
          {data: Object.values(data.countByTravelStatus).map(({ value }) => value)},
        ]
      };
      this.countByLoadTypeDoughnutChart = {
        labels: Object.values(data.countByLoadType).map(({ label }) => label),
        datasets: [
          {data: Object.values(data.countByLoadType).map(({ value }) => value)},
        ]
      };
      this.markers = data.lastPositions.map((position) => ({
        lat: position.latitude,
        lng: position.longitude
      }));
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  get dateFilters(): {
    from: string,
    to: string
  } {
    return {
      // from: format(new Date(), 'yyyy-MM-dd'),
      // to: format(subMonths(new Date(), 1), 'yyyy-MM-dd')
      from: '2023-01-01',
      to: '2023-03-27'
    };
  }

}
