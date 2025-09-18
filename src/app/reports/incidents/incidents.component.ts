import {Component, OnInit} from '@angular/core';
import {BaseVehicleFilter, IncidentReport, IncidentsFilter, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Incident} from "../../monitoring/incidents.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {IncidentDetailsModalComponent} from "../../monitoring/incident-details-modal/incident-details-modal.component";

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent {
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

    this.reportsService.getIncidentsReport(form).subscribe(response => {
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



  get xlsxValues(): any[] {
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return this.incidents.map((incident) => {
      return {
        'ID': incident.id,
        'TIPO': incident.incidentType?.type?.toUpperCase() ?? '-',
        'SOLVED BY': incident.solvedBy ?? '-',
        'CRIADO POR': this.getCreatedBy(incident),
        'AUTOMAÇÃO': incident.wasAddedByAutomation ? 'SIM' : 'NÃO',
        'DATA CRIAÇÃO': new Date(incident.datetime).toLocaleString('pt-BR'),
        'DATA INCIDENTE': new Date(incident.incidentDatetime).toLocaleString('pt-BR'),
        'LOCAL': incident.incidentLocation ?? '-',
        'LATITUDE': incident.incidentLatitude ?? '-',
        'LONGITUDE': incident.incidentLongitude ?? '-',
        'MOTORISTA': incident.driverName ?? '-',
        'TEL MOTORISTA': incident.driverPhone ?? '-',
        'CONTATO MOTORISTA': incident.driverContactedAt
          ? new Date(incident.driverContactedAt).toLocaleString('pt-BR')
          : '-',
        'EMBARCADOR': incident.shipperName ?? '-',
        'CONTATO EMBARCADOR': incident.shipperContactedAt
          ? new Date(incident.shipperContactedAt).toLocaleString('pt-BR')
          : '-',
        'AÇÃO IMEDIATA APROVADA': incident.wasImmediateActionApproved ? 'SIM' : 'NÃO',
        'RESPONSÁVEL AÇÃO IMEDIATA': incident.immediateActionResponsibleName ?? '-',
        'DATA AÇÃO IMEDIATA': incident.immediateActionTakenAt
          ? new Date(incident.immediateActionTakenAt).toLocaleString('pt-BR')
          : '-',
        'NECESSÁRIO POLÍCIA FEDERAL': incident.wasFederalPoliceActionNeeded ? 'SIM' : 'NÃO',
        'RESPONSÁVEL PF': incident.federalPoliceActionResponsibleName ?? '-',
        'DATA AÇÃO PF': incident.federalPoliceActionTakenAt
          ? new Date(incident.federalPoliceActionTakenAt).toLocaleString('pt-BR')
          : '-',
        'INFORMAÇÕES ADICIONAIS': incident.additionalInformation ?? '-',
        'EMAIL OPCIONAL': incident.optionalEmail ?? '-',
        'RESOLVIDO': incident.wasSolved ? 'SIM' : 'NÃO',
        'PROCEDIMENTO 1': (incident as any).procedure1 ?? '-',
        'PROCEDIMENTO 2': (incident as any).procedure2 ?? '-',
        'PROCEDIMENTO 3': (incident as any).procedure3 ?? '-',
        'PROCEDIMENTO 4': (incident as any).procedure4 ?? '-',
        'PROCEDIMENTO 5': (incident as any).procedure5 ?? '-',
        'PROCEDIMENTO 6': (incident as any).procedure6 ?? '-',
        'PROCEDIMENTO 7': (incident as any).procedure7 ?? '-',
        'PK ID': (incident as any).pkId ?? '-',
      };
    });
  }

}
