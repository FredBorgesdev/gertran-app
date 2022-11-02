import {Component, OnInit} from '@angular/core';
import {BaseFilter, ReportsResults, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {TravelStep} from '../../monitoring-requests/travel-step.service';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';

type TravelStepWithMonitoringRequest = TravelStep & {
  monitoringRequest: MonitoringRequests;
}

@Component({
  selector: 'app-load-unload-by-point',
  templateUrl: './load-unload-by-point.component.html',
  styleUrls: ['./load-unload-by-point.component.css']
})
export class LoadUnloadByPointComponent implements OnInit {
  isLoading = false;
  travelSteps: TravelStepWithMonitoringRequest[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  generateReport(form: BaseFilter): void {
    this.isLoading = true;

    this.reportsService.getLoadUnloadByPoint(form).subscribe(response => {
      response.forEach((item) => {
        const travelSteps = item.travelSteps.map((step) => ({
          ...step,
          monitoringRequest: item,
        }));

        this.travelSteps = [
          ...this.travelSteps,
          ...travelSteps
        ];
      });

      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao gerar relatório');
    });
  }

  getRowSpan(data: any, i: number): number {
    const isFirstOccurrenceOfMonitoringRequest =
      this.travelSteps.findIndex((step) => step.monitoringRequest.id === data.monitoringRequest.id) === i;

    if (isFirstOccurrenceOfMonitoringRequest) {
      return data.monitoringRequest.travelSteps.length;
    }

    return 1;
  }

  showCol(data: any, i: number): boolean {
    const isFirstOccurrenceOfMonitoringRequest =
      this.travelSteps.findIndex((step) => step.monitoringRequest.id === data.monitoringRequest.id) === i;

    if (data.monitoringRequest.travelSteps.length === 0) {
      return true;
    }

    return data.monitoringRequest.travelSteps.length > 0 && isFirstOccurrenceOfMonitoringRequest;
  }
}
