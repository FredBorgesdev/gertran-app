import {Component, OnInit} from '@angular/core';
import {BaseVehicleFilter, IncidentReport, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';

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
}
