import {Component, OnInit} from '@angular/core';
import {BaseVehicleFilter, CommandSentHistory, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute} from "@angular/router";
import {format, subWeeks} from "date-fns";

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
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const {customerId, vehiclePlate} = params || {};

      if (!customerId || !vehiclePlate) {
        return;
      }

      const oneWeekAgo = subWeeks(new Date(), 1);
      this.generateReport({
        customer: customerId,
        from: format(oneWeekAgo, 'yyyy-MM-dd'),
        to: format(new Date(), 'yyyy-MM-dd'),
        plate: vehiclePlate
      });
    });
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
