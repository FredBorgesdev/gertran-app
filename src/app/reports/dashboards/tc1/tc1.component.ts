import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { AuthenticationService } from "../../../authentication/authentication.service";
import { ReportsService } from "../../../reports/reports.service";

interface OperationData {
  date: string;
  total: number;
  inProgress: number;
  finished: number;
  waiting: number;
  totalValue: number;
}

@Component({
  selector: 'app-client',
  templateUrl: './tc1.component.html',
  styleUrls: ['./tc1.component.css']
})
export class ControlTower1 implements OnInit {
  operationsData: OperationData[] = [];

  isFullScreen = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private reportsService: ReportsService
  ) { }

  ngOnInit(): void {
    this.loadOperationsData();
  }

  loadOperationsData(): void {
    const { fromDate, toDate } = this.returnRange7Days();

    this.reportsService.getMonitoringDailySummary({ from: fromDate, to: toDate })
      .subscribe({
        next: (result) => {
          this.operationsData = result.map((item: any) => ({
            date: format(new Date(item.day), 'dd/MM/yyyy (EEE)', { locale: ptBR }).toUpperCase(),
            total: item.total,
            inProgress: item.inProgress || item.in_progress || 0,
            finished: item.finished,
            waiting: item.waiting,
            totalValue: Number(item.totalValue || item.total_value || 0)
          }));
        },
        error: (err) => {
          this.operationsData = [];
        }
      });
  }

  returnRange7Days() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    return {
      fromDate: this.formatDate(sevenDaysAgo),
      toDate: this.formatDate(currentDate)
    };
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value || 0);
  }

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
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }

  closeFullscreen() {
    const doc = document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
    this.isFullScreen = false;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenModes(event: any) {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }
}