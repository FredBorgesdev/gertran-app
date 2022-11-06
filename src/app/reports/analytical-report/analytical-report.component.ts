import { Component, OnInit } from '@angular/core';
import {BaseVehicleFilter, MacroVehicleReport, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-analytical-report',
  templateUrl: './analytical-report.component.html',
  styleUrls: ['./analytical-report.component.css']
})
export class AnalyticalReportComponent implements OnInit {
  macroVehicleHistories: MacroVehicleReport[] = [];
  isLoading = false;

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: BaseVehicleFilter): void {
    this.isLoading = true;
    this.reportsService.getAnalyticalReport(form).subscribe(
      (data) => {
        this.macroVehicleHistories = data;
        this.isLoading = false;
      },
      (error) => {
        this.message.error(error.message);
        this.isLoading = false;
      }
    );
  }
}
