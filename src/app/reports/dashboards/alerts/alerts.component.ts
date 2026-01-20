import { Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core'; // 1. Adicionado HostListener
import { Terminals, TerminalsService } from "../../../terminals/terminals.service";
import { DatePipe } from "@angular/common";
import { Alert, AlertsService, AlertTypes } from "../../../monitoring/alerts.service";
import { differenceInMinutes } from "date-fns";

@Component({
  selector: 'app-alerts-page',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [DatePipe]
})
export class AlertsComponent implements OnInit, OnDestroy {
  @Input() showTitle = true;
  terminals: Terminals[] = [];
  currentTime = '';
  intervals: any[] = [];
  currentTerminal: Terminals;
  currentAlerts: Alert[] = [];
  isLoading = false;
  currentCount = 0;
  currentLimit = 0;

  // 2. Variável de controle da tela cheia
  isFullScreen = false;

  constructor(
    private terminalsService: TerminalsService,
    private alertsService: AlertsService,
    private datePipe: DatePipe,
  ) { }

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

    this.alertsService.getAlerts({ limit: 12 }, {
      terminal: nextTerminal.id,
      alertType: AlertTypes.terminal,
      alertsOnly: true,
    }).subscribe((data) => {
      this.currentAlerts = data.results.reverse();
      this.currentTerminal = nextTerminal;
      this.currentCount = data.count;
      this.currentLimit = data.limit;
      if (terminal) {
        this.isLoading = false;
      }
    });
  }

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

  /* ==========================================================================
     LÓGICA DE TELA CHEIA (FULLSCREEN)
     ========================================================================== */

  toggleFullScreen(): void {
    if (!this.isFullScreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  openFullscreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }

  closeFullscreen() {
    const doc = document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) { /* Firefox */
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) { /* IE/Edge */
      doc.msExitFullscreen();
    }
    this.isFullScreen = false;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenModes(event: any) {
    this.checkScreenMode();
  }

  checkScreenMode() {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }
}