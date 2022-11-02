import { Component, OnInit } from '@angular/core';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {ReportsResults, ReportsService} from '../reports.service';
import {CustomerFilter} from '../filters/base-customer-filter/base-customer-filter.component';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-closing',
  templateUrl: './closing.component.html',
  styleUrls: ['./closing.component.css']
})
export class ClosingComponent implements OnInit {
  isLoading = false;
  monitoringRequests: ReportsResults;

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: CustomerFilter): void {
    this.isLoading = true;
    this.reportsService.getClosure(form).subscribe((monitoringRequests) => {
      this.monitoringRequests = monitoringRequests;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }

  getInitialTravelStep(data: MonitoringRequests): string {
    return data.travelSteps[0].address;
  }
}
