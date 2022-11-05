import { Component, OnInit } from '@angular/core';
import {BaseVehicleFilter, ReportsService} from '../reports.service';
import {CustomerFilter} from '../filters/base-customer-filter/base-customer-filter.component';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-travel-start',
  templateUrl: './travel-start.component.html',
  styleUrls: ['./travel-start.component.css']
})
export class TravelStartComponent implements OnInit {
  isLoading = false;
  monitoringRequests: MonitoringRequests[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: BaseVehicleFilter): void {
    console.log(form)
    this.isLoading = true;
    this.reportsService.getMonitoringRequests(form).subscribe((monitoringRequests) => {
      this.monitoringRequests = monitoringRequests;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }
}
