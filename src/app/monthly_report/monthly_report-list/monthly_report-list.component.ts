import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MonthlyReportService, MonthlyReport } from '../monthly_report.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-monthly_report-list',
  templateUrl: './monthly_report-list.component.html',
  styleUrls: ['./monthly_report-list.component.css']
})
export class MonthlyReportListComponent extends BaseCrudListComponent<MonthlyReport> {

  columns = [
    { title: 'Razão social' },
    { title: 'CNPJ' },
    { title: 'INICIO' },
    { title: 'FIM' },
    { title: 'CORRETOR' },
    { title: 'AÇÕES' },
  ];

  searchInput = '';

  constructor(
    service: MonthlyReportService,
    router: Router,
    modal: NzModalService,
    message: NzMessageService
  ) {
    super(
      'monthly_report',
      router,
      service,
      message,
      modal,
    );
  }
}
