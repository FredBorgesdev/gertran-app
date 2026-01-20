import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { PositionsService } from 'src/app/monitoring/positions.service';
import { MonitoringRequestsService } from 'src/app/monitoring-requests/monitoring-requests.service';
import { ReportsService } from '../../reports.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ControlTower4 implements OnInit, OnDestroy {
  @Input() customerId: string;

  isLoading = false;
  intervalId: any;
  isFullScreen = false;

  operationsPositionsData = {
    labels: [],
    totalOperationsPositionsData: 0
  };

  private charts: { [key: string]: Chart | null } = {
    terminals: null
  };

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private positionService: PositionsService,
    private service: MonitoringRequestsService,
    private reportsService: ReportsService,
  ) { }

  ngOnInit() {
    if (!this.authService.user?.isGertranStaff) {
      this.router.navigate(['/reports/dashboards/client']);
      return;
    }

    this.updateCharts();
    this.intervalId = setInterval(() => {
      this.updateCharts();
    }, 15 * 60 * 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
  }

  updateCharts() {
    this.isLoading = true;
    this.loadPositions();
    setTimeout(() => this.isLoading = false, 1000);
  }

  loadPositions(): void {
    const queryParams = new URLSearchParams(window.location.search);
    let customer = queryParams.get('customerId') || this.customerId;
    if (this.authService.user?.isGertranStaff) customer = undefined as any;
    if (!customer || customer === 'undefined' || customer === 'null') customer = undefined as any;

    const { fromDate, toDate } = this.returnRange7Days();
    const filters: any = { from: fromDate, to: toDate };
    if (customer) filters.customer = customer;

    this.reportsService.getTerminalsSummary(filters).subscribe({
      next: (items) => {
        const filtered = items.filter(i => !/gertran/i.test(i.label || ''));

        const chartColors = [
          '#1565C0', // Azul Escuro Forte
          '#E65100', // Laranja Escuro
          '#2E7D32', // Verde Floresta
          '#C62828', // Vermelho Intenso
          '#F9A825', // Amarelo Ouro
          '#6A1B9A', // Roxo Profundo
          '#455A64', // Cinza Azulado
          '#00838F'  // Ciano Escuro
        ];

        this.operationsPositionsData.labels = filtered.map((it, idx) => ({
          status: it.label || 'Sem terminal',
          count: it.count || 0,
          color: chartColors[idx % chartColors.length],
        }));
        this.operationsPositionsData.totalOperationsPositionsData = filtered.reduce((acc, it) => acc + (it.count || 0), 0);
        this.renderChart('operationsPositionsChart', this.operationsPositionsData, 'terminals');
      },
      error: (err) => console.warn(err)
    });
  }

  private renderChart(canvasId: string, dataObj: any, chartKey: string) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!ctx) return;

    if (this.charts[chartKey]) {
      this.charts[chartKey]?.destroy();
      this.charts[chartKey] = null;
    }

    const config: any = {
      type: 'pie',
      data: {
        labels: dataObj.labels.map(x => x.status),
        datasets: [{
          label: '',
          data: dataObj.labels.map(x => x.count),
          backgroundColor: dataObj.labels.map(x => x.color),
          borderWidth: 5,
          borderColor: '#ffffff',
          hoverOffset: 10,
          datalabels: { display: false }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 800, animateRotate: true, animateScale: true },
        layout: { padding: 20 },

        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.9)',
            titleFont: { size: 16, weight: 'bold' },
            bodyFont: { size: 14 },
            padding: 12,
            cornerRadius: 4,
            displayColors: true,
            borderColor: '#fff',
            borderWidth: 1
          },

          datalabels: { display: false },

          outlabels: { display: false },

          labels: {
            render: 'label',
            fontColor: 'transparent',
            fontSize: 0,
            arc: false, // Força não desenhar no arco
            position: 'outside', // Tira de dentro da fatia
            textMargin: 100 // Empurra pra longe se desenhar
          }
        },

        elements: {
          arc: {
            borderWidth: 5,
            borderColor: '#ffffff'
          }
        }
      }
    };

    this.charts[chartKey] = new Chart(ctx, config);
  }

  getPositionData(label: any): number { return label.count; }

  returnRange7Days() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    return {
      fromDate: this.formatDate(sevenDaysAgo),
      toDate: this.formatDate(currentDate)
    };
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toggleFullScreen(): void {
    if (!this.isFullScreen) this.openFullscreen();
    else this.closeFullscreen();
  }

  openFullscreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    this.isFullScreen = true;
  }

  closeFullscreen() {
    const doc = document as any;
    if (doc.exitFullscreen) doc.exitFullscreen();
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
    else if (doc.msExitFullscreen) doc.msExitFullscreen();
    this.isFullScreen = false;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  fullscreenModes(event: any) {
    this.isFullScreen = !!document.fullscreenElement;
  }
}