import { Component, OnInit } from '@angular/core';
import {BaseVehicleFilter, FatigueReport, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-fatigue-report',
  templateUrl: './fatigue-report.component.html',
  styleUrls: ['./fatigue-report.component.css']
})
export class FatigueReportComponent implements OnInit {
  isLoading = false;
  fatigueReport: FatigueReport[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: BaseVehicleFilter): void {
    this.isLoading = true;
    this.reportsService.getFatigueReport(form).subscribe((fatigueReport) => {
      this.fatigueReport = fatigueReport;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }
}
