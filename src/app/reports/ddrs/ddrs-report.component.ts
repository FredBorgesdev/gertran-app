import { Component, OnInit } from '@angular/core';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {BaseDdrFilter, BaseVehicleFilter, PositionEvent, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import { ClosingFilter } from '../filters/base-closing-filter/base-closing-filter.component';

@Component({
  selector: 'app-ddrs-report',
  templateUrl: './ddrs-report.component.html',
  styleUrls: ['./ddrs-report.component.css']
})
export class DdrReportComponent implements OnInit {
  isLoading = false;
//   monitoringRequests: MonitoringRequests[] = [];
  reportData: any;

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: BaseDdrFilter): void { 
    this.isLoading = true;
    this.reportsService.getDdrs(form).subscribe((x) => {
      console.log(x)
      this.reportData = x
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }



    changeValue(filters: any): void {
      // console.log(filters)
      // this.reportFormat = filters.reportFormat;
    }
  
}
