import {Component} from '@angular/core';
import {ReportsResults, ReportsService} from '../reports.service';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CustomerFilter, ReportFormat} from '../filters/base-customer-filter/base-customer-filter.component';
import {format} from "date-fns";

@Component({
  selector: 'app-travel-requests',
  templateUrl: './travel-requests.component.html',
  styleUrls: ['./travel-requests.component.css']
})
export class TravelRequestsComponent {
  isLoading = false;
  monitoringRequests: MonitoringRequests[] = [];
  syntheticReport: { total: number; loadPriceTotal: number; };
  reportFormat: ReportFormat = ReportFormat.ANALYTIC;
  columnStyles = {
    5: {
      cellWidth: 70,
      fontSize: 8,
    }
  };

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) {
  }

  generateReport(form: CustomerFilter): void {
    this.isLoading = true;
    this.reportsService.getMonitoringRequests(form).subscribe((monitoringRequests) => {
      this.monitoringRequests = monitoringRequests;
      this.isLoading = false;
      this.calculateSyntheticReport(monitoringRequests);
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }

  getWagons(data: MonitoringRequests): string {
    return data.wagons.map((wagon) => wagon.vehicle.plate.toUpperCase()).join(', ');
  }

  getInitialTravelStep(data: MonitoringRequests): string {
    return data.travelSteps?.[0]?.address.toUpperCase();
  }

  getFinalTravelStep(data: MonitoringRequests): string {
    return data.travelSteps?.[data.travelSteps.length - 1]?.address.toUpperCase();
  }

  getInvoices(data: MonitoringRequests): string {
    return data.invoices?.map((invoice) => invoice.invoiceNumber.toUpperCase()).join(', ');
  }

  getLoadingOrders(data: MonitoringRequests): string {
    return data.loadingOrders?.map((invoice) => invoice.ocrNumber.toUpperCase()).join(', ');
  }

  getTechnology(data: MonitoringRequests): string {
    return data.truck?.vehicle.trackers?.[0]?.trackerModel?.trackerTechnology?.name.toUpperCase();
  }

  private calculateSyntheticReport(monitoringRequests: ReportsResults): void {
    const total = monitoringRequests.length;
    const loadPriceTotal = monitoringRequests.reduce((acc, curr) => acc + Number(curr.loadValue), 0);

    this.syntheticReport = {total, loadPriceTotal};
  }

  changeValue(filters: CustomerFilter): void {
    this.reportFormat = filters.reportFormat;
  }

  get xlsxValues(): any[] {
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return this.monitoringRequests.map((monitoringRequest) => {
      const formattedLoadValue = currencyFormatter.format(monitoringRequest.loadValue || 0);
      return {
        'DATA CRIAÇÃO': format(new Date(monitoringRequest.createdAt), 'dd/MM/yyyy'),
        FILIAL: monitoringRequest.branchOffice?.tradingName,
        CARGA: monitoringRequest.loadValue,
        CAVALO: monitoringRequest.truck?.vehicle.plate.toUpperCase(),
        CARRETAS: this.getWagons(monitoringRequest),
        ORIGEM: this.getInitialTravelStep(monitoringRequest),
        DESTINO: this.getFinalTravelStep(monitoringRequest),
        NF: this.getInvoices(monitoringRequest),
        'ORDENS DE CARREGAMENTO': this.getLoadingOrders(monitoringRequest),
        TECNOLOGIA: this.getTechnology(monitoringRequest),
        OPERAÇÃO: monitoringRequest.operation?.name.toUpperCase(),
        STATUS: monitoringRequest.status.toUpperCase(),
        VALOR: formattedLoadValue,
      };
    });
  }
}
