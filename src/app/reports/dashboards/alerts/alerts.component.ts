import { Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Terminals, TerminalsService } from "../../../terminals/terminals.service";
import { DatePipe } from "@angular/common";
import { Alert, AlertsService, AlertTypes } from "../../../monitoring/alerts.service";

@Component({
  selector: 'app-alerts-page',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [DatePipe]
})
export class AlertsComponent implements OnInit, OnDestroy {
  @Input() showTitle = true;

  terminals: Terminals[] = [];
  currentTerminal: Terminals;

  allAlerts: Alert[] = [];
  displayedAlerts: Alert[] = [];

  currentPage = 1;
  totalPages = 1;
  pageSize = 10;

  rotationTimer: any;
  clockTimer: any;

  currentTime = '';
  isLoading = false;
  isFullScreen = false;

  constructor(
    private terminalsService: TerminalsService,
    private alertsService: AlertsService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.terminalsService.getAll({}).subscribe((data) => {
      this.terminals = data.results;
      this.loadNextTerminal();
    });

    this.clockTimer = setInterval(() => {
      this.currentTime = this.datePipe.transform(new Date(), 'HH:mm:ss');
    }, 1000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.rotationTimer);
    clearInterval(this.clockTimer);
  }

  loadNextTerminal(): void {
    if (this.rotationTimer) clearTimeout(this.rotationTimer);

    if (!this.currentTerminal) {
      this.currentTerminal = this.terminals[0];
    } else {
      const currentIndex = this.terminals.findIndex(t => t.id === this.currentTerminal.id);
      const nextIndex = (currentIndex + 1) % this.terminals.length;
      this.currentTerminal = this.terminals[nextIndex];
    }

    this.fetchAlertsAndStartRotation();
  }

  fetchAlertsAndStartRotation(): void {
    this.isLoading = true;

    this.alertsService.getAlerts({ limit: 100 }, {
      terminal: this.currentTerminal.id,
      alertType: AlertTypes.terminal,
      alertsOnly: true,
    }).subscribe({
      next: (data) => {
        this.allAlerts = data.results.reverse();

        this.currentPage = 1;
        this.totalPages = Math.ceil(this.allAlerts.length / this.pageSize);
        if (this.totalPages === 0) this.totalPages = 1;

        this.updateDisplayedPage();
        this.isLoading = false;

        this.scheduleNextStep();
      },
      error: () => {
        this.isLoading = false;
        this.rotationTimer = setTimeout(() => this.loadNextTerminal(), 5000);
      }
    });
  }

  updateDisplayedPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedAlerts = this.allAlerts.slice(startIndex, endIndex);
  }

  scheduleNextStep() {
    const displayTime = 30000;

    this.rotationTimer = setTimeout(() => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updateDisplayedPage();
        this.scheduleNextStep();
      } else {
        this.loadNextTerminal();
      }
    }, displayTime);
  }

  onTerminalChange(terminal: Terminals) {
    if (this.rotationTimer) clearTimeout(this.rotationTimer);
    this.currentTerminal = terminal;
    this.fetchAlertsAndStartRotation();
  }

  getClass(alert: Alert): string {
    const severity = (alert as any).severity;

    if (severity === 'danger') {
      return 'bg-danger-legend';
    }
    if (severity === 'warning') {
      return 'bg-warning-legend';
    }
    return '';
  }

  toggleFullScreen(): void {
    if (!this.isFullScreen) this.openFullscreen();
    else this.closeFullscreen();
  }

  openFullscreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  }

  closeFullscreen() {
    const doc = document as any;
    if (doc.exitFullscreen) doc.exitFullscreen();
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  fullscreenModes(event: any) {
    this.isFullScreen = !!document.fullscreenElement;
  }
}