import {Component, OnInit} from '@angular/core';
import {ChartData} from 'chart.js';
import {LogisticReport, ReportsService} from '../reports.service';
import {format, subMonths} from 'date-fns';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MapModalComponent} from '../../monitoring-requests/map-modal/map-modal.component';
import {MapMarkersModalComponent} from '../extra/map-markers-modal/map-markers-modal.component';

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
  temperatureDoughnutChart: ChartData<'doughnut'> = {
    labels: [],
    datasets: [ { label: 'Velocidade', data: [] }, ]
  };
  speedLineChart: ChartData<'line'> = {
    labels: [],
    datasets: [ {data: [] }, ]
  };
  mapCenter = {lat: -14.2400732, lng: -53.1805017};
  markers = [];
  data: LogisticReport;
  loading = false;

  constructor(
    private reportService: ReportsService,
    private modalService: NzModalService,
  ) {
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
      this.temperatureDoughnutChart = this.getTemperatureChartData(data.lastPositions);
      this.speedLineChart = this.getSpeedChartData(data.lastPositions);
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

  getTemperatureChartData(positions: LogisticReport['lastPositions']): ChartData<'doughnut'> {
    const initialData = {
      upTo20: {
        label: 'De 0ºC até 20ºC',
        value: 0
      },
      upTo40: {
        label: 'De 21ºC até 40ºC',
        value: 0
      },
      upTo60: {
        label: 'De 41ºC até 60ºC',
        value: 0
      },
      upTo80: {
        label: 'De 61ºC até 80ºC',
        value: 0
      },
      upTo100: {
        label: 'De 81ºC até 100ºC',
        value: 0
      }
    };

    const data = positions.reduce((acc, position) => {
      if (position.temperature1 <= 20) {
        acc.upTo20.value++;
      } else if (position.temperature1 <= 40) {
        acc.upTo40.value++;
      } else if (position.temperature1 <= 60) {
        acc.upTo60.value++;
      } else if (position.temperature1 <= 80) {
        acc.upTo80.value++;
      } else if (position.temperature1 <= 100) {
        acc.upTo100.value++;
      }

      return acc;
    }, initialData);

    return {
      labels: Object.values(data).map(({ label }) => label),
      datasets: [
        {data: Object.values(data).map(({ value }) => value)},
      ]
    };
  }

  getSpeedChartData(positions: LogisticReport['lastPositions']): ChartData<'line'> {
    const initialData = {
      upTo20: {
        label: 'De 0km/h até 20km/h',
        value: 0,
        percentage: 0,
      },
      upTo40: {
        label: 'De 21km/h até 40km/h',
        value: 0,
        percentage: 0,
      },
      upTo60: {
        label: 'De 41km/h até 60km/h',
        value: 0,
        percentage: 0,
      },
      upTo80: {
        label: 'De 61km/h até 80km/h',
        value: 0,
        percentage: 0,
      },
      upTo100: {
        label: 'De 81km/h até 100km/h',
        value: 0,
        percentage: 0,
      }
    };

    const data = positions.reduce((acc, position) => {
      if (position.speed <= 20) {
        acc.upTo20.value++;
        acc.upTo20.percentage = (acc.upTo20.value / positions.length) * 100;
      } else if (position.speed <= 40) {
        acc.upTo40.value++;
        acc.upTo40.percentage = (acc.upTo40.value / positions.length) * 100;
      } else if (position.speed <= 60) {
        acc.upTo60.value++;
        acc.upTo60.percentage = (acc.upTo60.value / positions.length) * 100;
      } else if (position.speed <= 80) {
        acc.upTo80.value++;
        acc.upTo80.percentage = (acc.upTo80.value / positions.length) * 100;
      } else if (position.speed <= 100) {
        acc.upTo100.value++;
        acc.upTo100.percentage = (acc.upTo100.value / positions.length) * 100;
      }

      return acc;
    }, initialData);

    return {
      labels: Object.values(data).map(({ label }) => label),
      datasets: [
        {
          label: 'Velocidade',
          data: Object.values(data).map(({ percentage }) => percentage)
        },
      ]
    };
  }

  expandMap(): void {
    this.modalService.create({
      nzTitle: 'Mapa',
      nzContent: MapMarkersModalComponent,
      nzComponentParams: {
        markers: this.markers,
        mapCenter: this.mapCenter
      },
      nzWidth: '80%',
    });
  }
}
