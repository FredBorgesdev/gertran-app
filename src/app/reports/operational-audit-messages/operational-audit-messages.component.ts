import { Component, OnInit } from '@angular/core';
import {BaseUserFilter, CommandSentHistory, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-operational-audit-messages',
  templateUrl: './operational-audit-messages.component.html',
  styleUrls: ['./operational-audit-messages.component.css']
})
export class OperationalAuditMessagesComponent implements OnInit {
  isLoading = false;
  commandsSentHistory: CommandSentHistory[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: BaseUserFilter): void {
    this.isLoading = true;
    this.reportsService.getOperationalAuditMessages(form).subscribe((result) => {
      this.commandsSentHistory = result;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao gerar relatório');
    });
  }
}
