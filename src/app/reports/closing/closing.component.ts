import {Component} from '@angular/core';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {BaseClosingFilter, ReportsResults, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ClosingFilter, ReportFormat} from "../filters/base-closing-filter/base-closing-filter.component";

@Component({
  selector: 'app-closing',
  templateUrl: './closing.component.html',
  styleUrls: ['./closing.component.css']
})
export class ClosingComponent {
  isLoading = false;
  monitoringRequests: ReportsResults;
  reportFormat: ReportFormat;
  syntheticReport: {
    customerName: string;
    monitoringRequestCount: number;
  }[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) {
  }

  generateReport(form: BaseClosingFilter): void {
    this.isLoading = true;
    this.reportsService.getClosure(form).subscribe((monitoringRequests) => {
      this.monitoringRequests = monitoringRequests;
      this.calculateSyntheticReport()
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }

  getInitialTravelStep(data: MonitoringRequests): string {
    return data.travelSteps[0]?.address;
  }

  changeValue(filters: ClosingFilter): void {
    this.reportFormat = filters.reportFormat;
  }

  calculateSyntheticReport(): void {
    const groupedMonitoringRequests = this.monitoringRequests.reduce((acc, monitoringRequest) => {
      const customerName = monitoringRequest.customer.tradingName;
      if (!acc[customerName]) {
        acc[customerName] = 0;
      }
      acc[customerName] += 1;
      return acc;
    }, {});

    this.syntheticReport = Object.entries<number>(groupedMonitoringRequests).map(([customerName, monitoringRequestCount]) => {
      return {
        customerName,
        monitoringRequestCount,
      };
    });
  };
}
