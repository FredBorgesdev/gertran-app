import { Component, OnInit } from '@angular/core';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {BaseVehicleFilter, PositionEvent, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-travel-end',
  templateUrl: './travel-end.component.html',
  styleUrls: ['./travel-end.component.css']
})
export class TravelEndComponent implements OnInit {
  isLoading = false;
  monitoringRequests: MonitoringRequests[] = [];
  positionEvents: PositionEvent[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: BaseVehicleFilter): void {
    this.isLoading = true;
    this.reportsService.getTravelEnd(form).subscribe((positionEvents) => {
      this.positionEvents = positionEvents;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }
}
