import {Component, OnInit} from '@angular/core';
import {ReportsResults, ReportsService} from '../reports.service';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CustomerFilter, ReportFormat} from '../filters/base-customer-filter/base-customer-filter.component';

@Component({
  selector: 'app-travel-requests',
  templateUrl: './travel-requests.component.html',
  styleUrls: ['./travel-requests.component.css']
})
export class TravelRequestsComponent implements OnInit {
  isLoading = false;
  monitoringRequests: MonitoringRequests[] = [];
  syntheticReport: { total: number; loadPriceTotal: number; };

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: CustomerFilter): void {
    this.isLoading = true;
    this.reportsService.getMonitoringRequests(form).subscribe((monitoringRequests) => {
      this.monitoringRequests = monitoringRequests;
      this.isLoading = false;

      if (form.reportFormat === ReportFormat.SYNTHETIC) {
        this.calculateSyntheticReport(monitoringRequests);
      }
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }

  getWagons(data: MonitoringRequests): string {
    return data.wagons.map((wagon) => wagon.vehicle.plate).join(', ');
  }

  getInitialTravelStep(data: MonitoringRequests): string {
    return data.travelSteps[0].address;
  }

  getFinalTravelStep(data: MonitoringRequests): string {
    return data.travelSteps[data.travelSteps.length - 1].address;
  }

  getInvoices(data: MonitoringRequests): string {
    return data.invoices?.map((invoice) => invoice.invoiceNumber).join(', ');
  }

  getTechnology(data: MonitoringRequests): string {
    return data.truck?.vehicle.trackers[0]?.trackerModel?.trackerTechnology?.name;
  }

  private calculateSyntheticReport(monitoringRequests: ReportsResults): void {
    const total = monitoringRequests.length;
    const loadPriceTotal = monitoringRequests.reduce((acc, curr) => acc + Number(curr.loadValue), 0);

    this.syntheticReport = { total, loadPriceTotal };
  }
}
