import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Terminals, TerminalsService} from "../../../terminals/terminals.service";
import {DatePipe} from "@angular/common";
import {Alert, AlertsService, AlertTypes} from "../../../monitoring/alerts.service";
import {differenceInMinutes, subMinutes} from "date-fns";
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-alerts-page',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [DatePipe]
})
export class AlertsComponent implements OnInit, OnDestroy {
  @Input() showTitle = true
  terminals: Terminals[] = [];
  currentTime = '';
  intervals: any[] = [];
  currentTerminal: Terminals;
  currentAlerts: Alert[] = [];
  isLoading = false;
  currentCount = 0
  currentLimit = 0

  constructor(
    private terminalsService: TerminalsService,
    private alertsService: AlertsService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.terminalsService.getAll({}).subscribe((data) => {
      this.terminals = data.results;

      this.setTerminalAndLoadAlerts();

      const getRandomTerminalInterval = setInterval(() => {
        this.setTerminalAndLoadAlerts();
      }, 1000 * 60 * 3);

      this.intervals.push(getRandomTerminalInterval);
    });

    const timeInterval = setInterval(() => {
      this.currentTime = this.datePipe.transform(new Date(), 'HH:mm:ss');
    }, 1000);

    this.intervals.push(timeInterval);
  }

  ngOnDestroy(): void {
    this.intervals.forEach(interval => clearInterval(interval));
  }

  getNextTerminal(): Terminals {
    const currentTerminalIndex = this.terminals.findIndex(terminal => terminal === this.currentTerminal);

    if (currentTerminalIndex === this.terminals.length - 1) {
      return this.terminals[0];
    }

    return this.terminals[currentTerminalIndex + 1];
  }

  setTerminalAndLoadAlerts(terminal?: Terminals): void {
    const nextTerminal = terminal || this.getNextTerminal();

    if (terminal) {
      this.isLoading = true;
    }

    this.alertsService.getAlerts({limit: 15}, {
      terminal: nextTerminal.id,
      alertType: AlertTypes.terminal,
      alertsOnly: true,
    }).subscribe((data) => {
      this.currentAlerts = data.results.reverse();
      this.currentTerminal = nextTerminal;
      this.currentCount = data.count
      this.currentLimit = data.limit
      if (terminal) {
        this.isLoading = false;
      }
    });
  }


  handleQueryParamsChange(params: NzTableQueryParams): void {
    // if (params.pageIndex < this.page) {
    //   const url = this.replaceOffsetWithPage(this.resources.previous, params.pageIndex);
    //   this.loadResources(url);
    // } else if (params.pageIndex > this.page) {
    //   const url = this.replaceOffsetWithPage(this.resources.next, params.pageIndex);
    //   this.loadResources(url);
    // }
  }

  // replaceOffsetWithPage(url: string, page: number): string {
  //   const limit = +url.match(/limit=\d+/)[0].split('=')[1];

  //   return url.replace(/offset=\d+/, `offset=${(limit * page) - limit}`);
  // }

  getClass(alert: Alert): string {
    const diffInMinutes = differenceInMinutes(new Date(), new Date(alert.receivedAt));

    if (diffInMinutes >= 15) {
      return 'danger';
    }

    if (diffInMinutes >= 10) {
      return 'warning';
    }

    return '';
  }

  getRollingTimeInMinutes(alert: Alert): string {
    return `${differenceInMinutes(new Date(), new Date(alert.receivedAt))} minutos`;
  }
}
