import { Component, OnInit } from '@angular/core';
import {BaseVehicleFilter, CommandSentHistory, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-commands-history',
  templateUrl: './commands-history.component.html',
  styleUrls: ['./commands-history.component.css']
})
export class CommandsHistoryComponent implements OnInit {
  isLoading = false;
  commandSentHistory: CommandSentHistory[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: BaseVehicleFilter): void {
    this.isLoading = true;
    this.reportsService.getTrackingCommandsHistory(form).subscribe((commandsSentHistory) => {
      this.commandSentHistory = commandsSentHistory;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }
}
