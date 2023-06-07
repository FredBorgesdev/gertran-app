import {Component, OnInit} from '@angular/core';
import {BaseVehicleFilter, IncidentReport, IncidentsFilter, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Incident} from "../../monitoring/incidents.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {IncidentDetailsModalComponent} from "../../monitoring/incident-details-modal/incident-details-modal.component";

@Component({
  selector: 'app-panic-history',
  templateUrl: './panic-history.component.html',
  styleUrls: ['./panic-history.component.css']
})
export class PanicHistoryComponent {
  isLoading = false;
  incidents: IncidentReport[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {
  }

  generateReport(form: IncidentsFilter): void {
    this.isLoading = true;

    this.reportsService.getPanicHistory(form).subscribe(response => {
      this.incidents = response;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao gerar relatório');
    });
  }

  openIncidentDetailModal(incident: Incident): void {
    this.modal.create({
      nzTitle: 'Detalhes da ocorrência',
      nzContent: IncidentDetailsModalComponent,
      nzComponentParams: {
        incident
      },
      nzFooter: null,
      nzWidth: '80%',
    });
  }

  getCreatedBy(data: IncidentReport): string {
    if (data.wasAddedByAutomation) {
      return 'Automação';
    }

    return data.createdBy?.name ?? 'Não disponível';
  }
}
