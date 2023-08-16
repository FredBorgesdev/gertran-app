import {Component, OnDestroy, OnInit} from '@angular/core';
import {Terminals, TerminalsService} from "../../../terminals/terminals.service";
import {DatePipe} from "@angular/common";
import {Alert, AlertsService, AlertTypes} from "../../../monitoring/alerts.service";
import {differenceInMinutes, subMinutes} from "date-fns";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [DatePipe]
})
export class AlertsComponent implements OnInit, OnDestroy {
  terminals: Terminals[] = [];
  currentTime = '';
  intervals: any[] = [];
  currentTerminal: Terminals;
  currentAlerts: Alert[] = [];
  isLoading = false;

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

    this.alertsService.getAlerts({limit: 999}, {
      terminal: nextTerminal.id,
      alertType: AlertTypes.terminal,
      alertsOnly: true,
    }).subscribe((data) => {
      this.currentAlerts = data.results.reverse();
      this.currentTerminal = nextTerminal;

      if (terminal) {
        this.isLoading = false;
      }
    });
  }

  getClass(alert: Alert): string {
    const diffInMinutes = differenceInMinutes(new Date(), new Date(alert.receivedAt));

    if (diffInMinutes >= 90) {
      return 'danger';
    }

    if (diffInMinutes >= 9) {
      return 'warning';
    }

    return '';
  }

  getRollingTimeInMinutes(alert: Alert): string {
    return `${differenceInMinutes(new Date(), new Date(alert.receivedAt))} minutos corridos`;
  }
}
