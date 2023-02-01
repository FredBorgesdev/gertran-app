import {Component, OnInit} from '@angular/core';
import {BasePeriodFilter, ChecklistHistory, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';

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

  generateReport(form: BasePeriodFilter): void {
    this.isLoading = true;

    this.reportsService.getChecklistHistory(form).subscribe(response => {
      this.checklistHistory = response;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao gerar relatório');
    });
  }
}
