import { Component, OnInit } from '@angular/core';
import {BaseUserFilter, BaseVehicleFilter, CommandSentHistory, ReportsService} from '../reports.service';

@Component({
  selector: 'app-operational-audit-commands',
  templateUrl: './operational-audit-commands.component.html',
  styleUrls: ['./operational-audit-commands.component.css']
})
export class OperationalAuditCommandsComponent implements OnInit {
  isLoading = false;
  commandsSentHistory: CommandSentHistory[] = [];

  constructor(
    private reportsService: ReportsService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: BaseUserFilter): void {
    this.isLoading = true;
    this.reportsService.getOperationalAuditCommands(form).subscribe((result) => {
      this.commandsSentHistory = result;
      this.isLoading = false;
    });
  }
}
