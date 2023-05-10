import {Component, OnInit} from '@angular/core';
import {BaseVehicleFilter, IncidentReport, ReportsService} from '../reports.service';
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

  generateReport(form: BaseVehicleFilter): void {
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
}
