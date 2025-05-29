import {Component} from '@angular/core';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {BaseClosingFilter, ReportsResults, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ClosingFilter, ReportFormat} from "../filters/base-closing-filter/base-closing-filter.component";
import {format} from "date-fns";
import { TrucksService } from 'src/app/trucks/trucks.service';
import { finalize, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-closing',
  templateUrl: './closing.component.html',
  styleUrls: ['./closing.component.css']
})
export class ClosingComponent {
  isLoading = false;
  monitoringRequests: ReportsResults = [];
  reportFormat: ReportFormat;
  syntheticReport: {
    customerName: string;
    monitoringRequestCount: number;
  }[] = [];
  filteredData = [];
  placasUnicasMonthly = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
    private truckService: TrucksService,
  ) {
  }


  generateReport(form: BaseClosingFilter): void {
    this.isLoading = true;

    this.reportsService.getClosure(form).pipe(
      switchMap(monitoringRequests => {
        this.monitoringRequests = monitoringRequests;
        this.calculateSyntheticReport();

        console.log(form)

        return this.truckService.getAllChargingMethod(
          { limit: 100000 },
          { customerId: form.customer }
        ).pipe(
          // usamos `map` aqui se precisar processar os dados
          // ou apenas continuar o fluxo para o `subscribe`
          finalize(() => {
            this.isLoading = false;
          })
        );
      }),
      finalize(() => {
        // Garante que o loading seja desativado mesmo se o primeiro observable falhar
        this.isLoading = false;
      })
    ).subscribe({
      next: (data) => {
        this.placasUnicasMonthly = data.results.filter(x => x.chargingMethod === 'monthly');
        console.log(this.placasUnicasMonthly)
        this.filteredData = this.monitoringRequests.filter(x => x.truck?.chargingMethod === 'single');
      },
      error: () => {
        this.message.error('Ocorreu um erro ao gerar o relatório');
      }
    });
  }

  getInitialTravelStep(data: MonitoringRequests): string {
    return data.travelSteps?.find(x => x.pointType === 'start')?.address.toUpperCase() || data.travelSteps[0]?.address.toUpperCase() || ''
  }

  getEndTravelStep(data: MonitoringRequests): string {
    return data.travelSteps?.find(x => x.pointType === 'end')?.address.toUpperCase() || data.travelSteps[data.travelSteps.length - 1]?.address.toUpperCase() || ''
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
  
  get xlsxValues1(): any[] {
    return this.placasUnicasMonthly .map(pl=>({
      'CLIENTE': pl.customerName.toUpperCase(),
      'TECNOLOGIA':pl.tracker.toUpperCase(),
      'PLACA': pl.vehicle?.plate.toUpperCase(),

    }))
  }


    get xlsxValues2(): any[] {
      return this.filteredData.map(fl=>({
        // 'SM':fl.id,
        'CLIENTE': fl.customer.tradingName?.toUpperCase(),
        'DATA': format(new Date(fl.createdAt), 'dd/MM/yyyy HH:mm:ss'),
        'PLACA': fl.truck?.vehicle?.plate.toUpperCase(),
        // 'Operação': fl.operation?.name.toUpperCase(),
        'ORIGEM': fl.travelSteps?.find(x => x.pointType === 'start')?.address.toUpperCase() || fl.travelSteps[0]?.address.toUpperCase() || '',
        'DESTINO': fl.travelSteps?.find(x => x.pointType === 'end')?.address.toUpperCase() || fl.travelSteps[fl.travelSteps.length - 1]?.address.toUpperCase() || '',
        // 'Transportadora': fl?.transporter?.tradingName.toUpperCase() || ''
      }))
  }

  
}
