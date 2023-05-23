import {Component, OnInit} from '@angular/core';
import {BasePeriodFilter, BaseVehicleFilter, ChecklistHistory, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {format} from "date-fns";

@Component({
  selector: 'app-checklist-history',
  templateUrl: './checklist-history.component.html',
  styleUrls: ['./checklist-history.component.css']
})
export class ChecklistHistoryComponent implements OnInit {
  isLoading = false;
  checklistHistory: ChecklistHistory[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
  }

  generateReport(form: BaseVehicleFilter): void {
    this.isLoading = true;

    this.reportsService.getChecklistHistory(form).subscribe(response => {
      this.checklistHistory = response;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao gerar relatório');
    });
  }

  getStatusChecklistLocalized(status: string): string {
    return {
      requested: 'Solicitado',
      approved: 'Aprovado',
      reproved: 'Reprovado',
    }[status?.toLowerCase()] || status;
  }

  get xlsxValues(): any[] {
    return this.checklistHistory.map((checklistHistory) => ({
      Empresa: checklistHistory.customer.tradingName,
      Placa: checklistHistory.vehicle.plate,
      Tipo: checklistHistory.workingSituation,
      Tecnologia: checklistHistory.vehicle.trackers?.[0]?.trackerModel.trackerTechnology.name,
      Solicitante: checklistHistory.requestedBy?.name,
      'Status Checklist': this.getStatusChecklistLocalized(checklistHistory.status),
      Justificativa: checklistHistory.justification,
      'Data Liberação': format(new Date(checklistHistory.reviewedAt), 'dd/MM/yyyy HH:mm:ss'),
      'Data Exp.': format(new Date(checklistHistory.expirationDate), 'dd/MM/yyyy HH:mm:ss'),
      Motorista: `${checklistHistory.driver?.name ?? ''} / ${checklistHistory.driver?.phoneNumber ?? ''}`,
      Origem: checklistHistory.origin,
      Destino: checklistHistory.destiny,
      Operador: checklistHistory.reviewedBy?.name,
    }));
  }
}
