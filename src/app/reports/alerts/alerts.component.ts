import {Component, OnInit} from '@angular/core';
import {AlertReport, BaseVehicleFilter, IncidentReport, IncidentsFilter, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Incident} from '../../monitoring/incidents.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {IncidentDetailsModalComponent} from '../../monitoring/incident-details-modal/incident-details-modal.component';
import {Severity} from "../../monitoring/alerts.service";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent {
  isLoading = false;
  alerts: AlertReport[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {
  }

  generateReport(form: IncidentsFilter): void {
    this.isLoading = true;

    this.reportsService.getAlerts(form).subscribe(response => {
      this.alerts = response;
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

  getSeverityTranslated(severity: Severity): string {
    return {
      [Severity.info]: 'Informativa',
      [Severity.danger]: 'Crítica',
      [Severity.warning]: 'Alerta',
    }[severity];
  }
}
